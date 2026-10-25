export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface HistoryRecord {
  layerId: string;
  rect: Rect;
  data: Uint8ClampedArray;
}

export interface HistoryMemoryStats {
  stepsCount: number;
  rawBytes: number;
  compressedBytes: number;
  savingsRatio: number;
}

export interface HistoryManager {
  push(layerId: string, rect: Rect, data: ImageData | Uint8ClampedArray): void;
  undo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null;
  redo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null;
  canUndo(): boolean;
  canRedo(): boolean;
  clear(): void;
  getMemoryStats(): HistoryMemoryStats;
}

interface CompressedHistoryEntry {
  layerId: string;
  rect: Rect;
  rawSize: number;
  compressed: Uint8Array;
}

// QOI Fast Codec Constants
const QOI_OP_INDEX = 0x00;
const QOI_OP_DIFF = 0x40;
const QOI_OP_LUMA = 0x80;
const QOI_OP_RUN = 0xc0;
const QOI_OP_RGB = 0xfe;
const QOI_OP_RGBA = 0xff;
const QOI_MASK_2 = 0xc0;

function colorHash(r: number, g: number, b: number, a: number): number {
  return ((r * 3 + g * 5 + b * 7 + a * 11) >>> 0) % 64;
}

/**
 * Codificador nativo QOI ultrarrápido para fotogramas y parches RGBA
 */
export function encodeQOI(data: Uint8Array | Uint8ClampedArray, width: number, height: number): Uint8Array {
  const totalPixels = width * height;
  const maxOutputSize = 14 + totalPixels * 5 + 8;
  const out = new Uint8Array(maxOutputSize);

  // Cabecera: 'qoif'
  out[0] = 0x71;
  out[1] = 0x6f;
  out[2] = 0x69;
  out[3] = 0x66;
  out[4] = (width >>> 24) & 0xff;
  out[5] = (width >>> 16) & 0xff;
  out[6] = (width >>> 8) & 0xff;
  out[7] = width & 0xff;
  out[8] = (height >>> 24) & 0xff;
  out[9] = (height >>> 16) & 0xff;
  out[10] = (height >>> 8) & 0xff;
  out[11] = height & 0xff;
  out[12] = 4; // Canales RGBA
  out[13] = 0; // Espacio sRGB

  let p = 14;
  const index = new Uint8Array(64 * 4);
  let pr = 0, pg = 0, pb = 0, pa = 255;
  let run = 0;

  for (let i = 0; i < totalPixels; i++) {
    const off = i * 4;
    const r = data[off];
    const g = data[off + 1];
    const b = data[off + 2];
    const a = data[off + 3];

    if (r === pr && g === pg && b === pb && a === pa) {
      run++;
      if (run === 62) {
        out[p++] = QOI_OP_RUN | (run - 1);
        run = 0;
      }
    } else {
      if (run > 0) {
        out[p++] = QOI_OP_RUN | (run - 1);
        run = 0;
      }

      const h = colorHash(r, g, b, a);
      const hOff = h * 4;
      if (index[hOff] === r && index[hOff + 1] === g && index[hOff + 2] === b && index[hOff + 3] === a) {
        out[p++] = QOI_OP_INDEX | h;
      } else {
        index[hOff] = r;
        index[hOff + 1] = g;
        index[hOff + 2] = b;
        index[hOff + 3] = a;

        if (a === pa) {
          const vr = (r - pr);
          const vg = (g - pg);
          const vb = (b - pb);
          const vg_r = vr - vg;
          const vg_b = vb - vg;

          if (vr >= -2 && vr <= 1 && vg >= -2 && vg <= 1 && vb >= -2 && vb <= 1) {
            out[p++] = QOI_OP_DIFF | ((vr + 2) << 4) | ((vg + 2) << 2) | (vb + 2);
          } else if (vg_r >= -8 && vg_r <= 7 && vg >= -32 && vg <= 31 && vg_b >= -8 && vg_b <= 7) {
            out[p++] = QOI_OP_LUMA | (vg + 32);
            out[p++] = ((vg_r + 8) << 4) | (vg_b + 8);
          } else {
            out[p++] = QOI_OP_RGB;
            out[p++] = r;
            out[p++] = g;
            out[p++] = b;
          }
        } else {
          out[p++] = QOI_OP_RGBA;
          out[p++] = r;
          out[p++] = g;
          out[p++] = b;
          out[p++] = a;
        }
      }
    }

    pr = r;
    pg = g;
    pb = b;
    pa = a;
  }

  if (run > 0) {
    out[p++] = QOI_OP_RUN | (run - 1);
  }

  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 0;
  out[p++] = 1;

  return out.subarray(0, p);
}

/**
 * Decodificador nativo QOI ultrarrápido a búfer crudo RGBA
 */
export function decodeQOI(bytes: Uint8Array, width: number, height: number): Uint8ClampedArray {
  const totalPixels = width * height;
  const out = new Uint8ClampedArray(totalPixels * 4);
  const totalBytes = totalPixels * 4;

  if (bytes.length < 14 + 8) return out;

  const index = new Uint8Array(64 * 4);
  let r = 0, g = 0, b = 0, a = 255;
  let pxIdx = 0;
  let p = 14;
  const end = bytes.length - 8;

  while (p < end && pxIdx < totalBytes) {
    const b1 = bytes[p++];

    if (b1 === QOI_OP_RGB) {
      r = bytes[p++];
      g = bytes[p++];
      b = bytes[p++];
    } else if (b1 === QOI_OP_RGBA) {
      r = bytes[p++];
      g = bytes[p++];
      b = bytes[p++];
      a = bytes[p++];
    } else if ((b1 & QOI_MASK_2) === QOI_OP_INDEX) {
      const hOff = (b1 & 0x3f) * 4;
      r = index[hOff];
      g = index[hOff + 1];
      b = index[hOff + 2];
      a = index[hOff + 3];
    } else if ((b1 & QOI_MASK_2) === QOI_OP_DIFF) {
      r = (r + ((b1 >> 4) & 0x03) - 2) & 0xff;
      g = (g + ((b1 >> 2) & 0x03) - 2) & 0xff;
      b = (b + (b1 & 0x03) - 2) & 0xff;
    } else if ((b1 & QOI_MASK_2) === QOI_OP_LUMA) {
      const b2 = bytes[p++];
      const vg = (b1 & 0x3f) - 32;
      r = (r + vg - 8 + ((b2 >> 4) & 0x0f)) & 0xff;
      g = (g + vg) & 0xff;
      b = (b + vg - 8 + (b2 & 0x0f)) & 0xff;
    } else if ((b1 & QOI_MASK_2) === QOI_OP_RUN) {
      const run = (b1 & 0x3f) + 1;
      for (let k = 0; k < run; k++) {
        out[pxIdx] = r;
        out[pxIdx + 1] = g;
        out[pxIdx + 2] = b;
        out[pxIdx + 3] = a;
        pxIdx += 4;
      }
      continue;
    }

    const hOff = colorHash(r, g, b, a) * 4;
    index[hOff] = r;
    index[hOff + 1] = g;
    index[hOff + 2] = b;
    index[hOff + 3] = a;

    out[pxIdx] = r;
    out[pxIdx + 1] = g;
    out[pxIdx + 2] = b;
    out[pxIdx + 3] = a;
    pxIdx += 4;
  }

  return out;
}

export function createHistoryManager(maxSteps = 30): HistoryManager {
  const undoStack: CompressedHistoryEntry[] = [];
  const redoStack: CompressedHistoryEntry[] = [];

  const manager: HistoryManager = {
    push(layerId: string, rect: Rect, rawData: ImageData | Uint8ClampedArray) {
      if (rect.w <= 0 || rect.h <= 0) return;
      const buffer = rawData instanceof Uint8ClampedArray ? rawData : rawData.data;
      const rawSize = buffer.byteLength;

      const compressed = encodeQOI(buffer, rect.w, rect.h);
      undoStack.push({
        layerId,
        rect: { x: rect.x, y: rect.y, w: rect.w, h: rect.h },
        rawSize,
        compressed,
      });

      if (undoStack.length > maxSteps) {
        undoStack.shift();
      }
      redoStack.length = 0;
    },

    undo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null {
      if (undoStack.length === 0) return null;
      const target = undoStack.pop()!;
      // Capturar estado actual antes de revertir para poder rehacerlo
      const currentSnap = getCurrentSnapshot(target.rect);
      const rawSize = currentSnap.data.byteLength;
      redoStack.push({
        layerId: currentLayerId,
        rect: { ...target.rect },
        rawSize,
        compressed: encodeQOI(currentSnap.data, target.rect.w, target.rect.h),
      });

      // Descomprimir el paso restaurado
      const decompressed = decodeQOI(target.compressed, target.rect.w, target.rect.h);
      return {
        layerId: target.layerId,
        rect: target.rect,
        data: decompressed,
      };
    },

    redo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null {
      if (redoStack.length === 0) return null;
      const target = redoStack.pop()!;
      // Capturar estado actual antes de rehacer para permitir deshacerlo nuevamente
      const currentSnap = getCurrentSnapshot(target.rect);
      const rawSize = currentSnap.data.byteLength;
      undoStack.push({
        layerId: currentLayerId,
        rect: { ...target.rect },
        rawSize,
        compressed: encodeQOI(currentSnap.data, target.rect.w, target.rect.h),
      });

      // Descomprimir el paso aplicado
      const decompressed = decodeQOI(target.compressed, target.rect.w, target.rect.h);
      return {
        layerId: target.layerId,
        rect: target.rect,
        data: decompressed,
      };
    },

    canUndo(): boolean {
      return undoStack.length > 0;
    },

    canRedo(): boolean {
      return redoStack.length > 0;
    },

    clear() {
      undoStack.length = 0;
      redoStack.length = 0;
    },

    getMemoryStats(): HistoryMemoryStats {
      let rawBytes = 0;
      let compressedBytes = 0;
      for (const entry of undoStack) {
        rawBytes += entry.rawSize;
        compressedBytes += entry.compressed.byteLength;
      }
      for (const entry of redoStack) {
        rawBytes += entry.rawSize;
        compressedBytes += entry.compressed.byteLength;
      }
      const savingsRatio = rawBytes > 0 ? (1 - compressedBytes / rawBytes) * 100 : 0;
      return {
        stepsCount: undoStack.length + redoStack.length,
        rawBytes,
        compressedBytes,
        savingsRatio,
      };
    },
  };

  // Exponer inspección rápida en ventana para consola de desarrollador
  if (typeof window !== 'undefined') {
    (window as any).oniriHistoryStats = () => {
      const stats = manager.getMemoryStats();
      console.log(
        `%c[Oniri Historial RAM]%c Pasos: ${stats.stepsCount} | Sin compresión: ${(stats.rawBytes / (1024 * 1024)).toFixed(2)} MB | Con QOI: ${(stats.compressedBytes / (1024 * 1024)).toFixed(2)} MB | Ahorro: %c${stats.savingsRatio.toFixed(1)}%%`,
        'background: #7c3aed; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
        'color: inherit;',
        'color: #10b981; font-weight: bold;'
      );
      return stats;
    };
  }

  return manager;
}
