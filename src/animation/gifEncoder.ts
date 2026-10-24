/**
 * Pure TypeScript GIF89a Animation Encoder
 * Zero external dependencies, fast in-memory LZW compression and color quantization.
 */

export class ByteArrayWriter {
  private buffer: Uint8Array;
  private len = 0;

  constructor(initialCapacity = 512 * 1024) {
    this.buffer = new Uint8Array(initialCapacity);
  }

  private ensure(additional: number): void {
    if (this.len + additional > this.buffer.length) {
      const newCap = Math.max(this.buffer.length * 2, this.len + additional + 65536);
      const next = new Uint8Array(newCap);
      next.set(this.buffer.subarray(0, this.len));
      this.buffer = next;
    }
  }

  writeByte(b: number): void {
    this.ensure(1);
    this.buffer[this.len++] = b & 0xff;
  }

  writeWord(w: number): void {
    this.ensure(2);
    this.buffer[this.len++] = w & 0xff;
    this.buffer[this.len++] = (w >> 8) & 0xff;
  }

  writeBytes(bytes: number[] | Uint8Array): void {
    this.ensure(bytes.length);
    if (bytes instanceof Uint8Array) {
      this.buffer.set(bytes, this.len);
      this.len += bytes.length;
    } else {
      for (let i = 0; i < bytes.length; i++) {
        this.buffer[this.len++] = bytes[i] & 0xff;
      }
    }
  }

  toUint8Array(): Uint8Array {
    return this.buffer.subarray(0, this.len);
  }
}

export interface IndexedGifFrame {
  palette: [number, number, number][];
  indexedPixels: Uint8Array;
  transparentIndex: number;
  delayMs: number;
}

export interface GifFrameInput {
  canvas?: HTMLCanvasElement;
  indexed?: IndexedGifFrame;
  delayMs: number;
}

export interface GifEncodeOptions {
  width: number;
  height: number;
  loopCount?: number; // 0 = infinite loop
  onProgress?: (frameIdx: number, totalFrames: number) => void;
}

/**
 * Builds an animated GIF Uint8Array from a series of canvas frames or indexed frames.
 */
export function encodeGif(frames: GifFrameInput[], options: GifEncodeOptions): Uint8Array {
  const { width, height, loopCount = 0, onProgress } = options;
  const writer = new ByteArrayWriter();

  // 1. GIF89a Header
  writer.writeBytes([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);

  // 2. Logical Screen Descriptor
  writer.writeWord(width);
  writer.writeWord(height);
  writer.writeByte(0x70);
  writer.writeByte(0);
  writer.writeByte(0);

  // 3. Netscape 2.0 Loop Extension
  writer.writeBytes([0x21, 0xff, 0x0b]);
  writer.writeBytes([0x4e, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2e, 0x30]);
  writer.writeByte(0x03);
  writer.writeByte(0x01);
  writer.writeWord(loopCount);
  writer.writeByte(0x00);

  // 4. Encode each frame
  for (let f = 0; f < frames.length; f++) {
    onProgress?.(f + 1, frames.length);
    const frame = frames[f];

    let palette: [number, number, number][];
    let indexedPixels: Uint8Array;
    let transparentIndex: number;

    if (frame.indexed) {
      palette = frame.indexed.palette;
      indexedPixels = frame.indexed.indexedPixels;
      transparentIndex = frame.indexed.transparentIndex;
    } else if (frame.canvas) {
      const ctx = frame.canvas.getContext('2d')!;
      const imgData = ctx.getImageData(0, 0, width, height);
      const q = quantizeRgba(imgData.data, width, height);
      palette = q.palette;
      indexedPixels = q.indexedPixels;
      transparentIndex = q.transparentIndex;
    } else {
      continue;
    }

    const delayMs = frame.delayMs;
    const delayHundredths = Math.max(1, Math.round(delayMs / 10));
    writer.writeBytes([0x21, 0xf9, 0x04]);
    const hasTransparency = transparentIndex !== -1;
    const gcePacked = (2 << 2) | (hasTransparency ? 1 : 0);
    writer.writeByte(gcePacked);
    writer.writeWord(delayHundredths);
    writer.writeByte(hasTransparency ? transparentIndex : 0);
    writer.writeByte(0x00);

    writer.writeByte(0x2c);
    writer.writeWord(0);
    writer.writeWord(0);
    writer.writeWord(width);
    writer.writeWord(height);

    const colorDepth = Math.max(2, Math.ceil(Math.log2(Math.max(4, palette.length))));
    const lctSize = 1 << colorDepth;
    const idPacked = 0x80 | (colorDepth - 1);
    writer.writeByte(idPacked);

    for (let i = 0; i < lctSize; i++) {
      if (i < palette.length) {
        writer.writeByte(palette[i][0]);
        writer.writeByte(palette[i][1]);
        writer.writeByte(palette[i][2]);
      } else {
        writer.writeByte(0);
        writer.writeByte(0);
        writer.writeByte(0);
      }
    }

    encodeLzw(indexedPixels, colorDepth, (b) => writer.writeByte(b));
  }

  // 5. GIF Trailer
  writer.writeByte(0x3b);
  return writer.toUint8Array();
}

/**
 * Fast octree / popularity color quantizer for RGBA frames.
 */
export function quantizeRgba(
  rgba: Uint8ClampedArray,
  width: number,
  height: number
): { palette: [number, number, number][]; indexedPixels: Uint8Array; transparentIndex: number } {
  const totalPixels = width * height;
  const indexedPixels = new Uint8Array(totalPixels);
  const colorMap = new Map<number, number>();
  const palette: [number, number, number][] = [];

  let transparentIndex = -1;

  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const a = rgba[idx + 3];

    if (a < 64) {
      // Transparent pixel
      if (transparentIndex === -1) {
        transparentIndex = palette.length;
        palette.push([0, 0, 0]);
      }
      indexedPixels[i] = transparentIndex;
      continue;
    }

    // Quantize 8-bit channels to 5-bit to limit colors to a compact space
    const r = rgba[idx] & 0xf8;
    const g = rgba[idx + 1] & 0xf8;
    const b = rgba[idx + 2] & 0xf8;
    const key = (r << 16) | (g << 8) | b;

    let paletteIdx = colorMap.get(key);
    if (paletteIdx === undefined) {
      if (palette.length < 255) {
        paletteIdx = palette.length;
        palette.push([rgba[idx], rgba[idx + 1], rgba[idx + 2]]);
        colorMap.set(key, paletteIdx);
      } else {
        // Nearest color match when palette is full
        paletteIdx = findClosestColor(rgba[idx], rgba[idx + 1], rgba[idx + 2], palette, transparentIndex);
      }
    }
    indexedPixels[i] = paletteIdx;
  }

  if (palette.length === 0) {
    palette.push([0, 0, 0]);
  }

  return { palette, indexedPixels, transparentIndex };
}

function findClosestColor(
  r: number,
  g: number,
  b: number,
  palette: [number, number, number][],
  transparentIndex: number
): number {
  let bestDist = Infinity;
  let bestIdx = 0;
  for (let i = 0; i < palette.length; i++) {
    if (i === transparentIndex) continue;
    const dr = r - palette[i][0];
    const dg = g - palette[i][1];
    const db = b - palette[i][2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
      if (dist === 0) break;
    }
  }
  return bestIdx;
}

/**
 * Standard variable-length LZW encoder for GIF89a.
 */
function encodeLzw(pixels: Uint8Array, colorDepth: number, writeByte: (b: number) => void): void {
  const initCodeSize = Math.max(2, colorDepth);
  writeByte(initCodeSize);

  const clearCode = 1 << initCodeSize;
  const eofCode = clearCode + 1;

  let codeSize = initCodeSize + 1;
  let codeMask = (1 << codeSize) - 1;
  let nextCode = eofCode + 1;

  const dict = new Map<number, number>();

  function resetDict(): void {
    dict.clear();
    codeSize = initCodeSize + 1;
    codeMask = (1 << codeSize) - 1;
    nextCode = eofCode + 1;
  }

  let accumulator = 0;
  let bitsAccumulated = 0;
  const subBlock: number[] = [];

  function flushSubBlock(): void {
    if (subBlock.length > 0) {
      writeByte(subBlock.length);
      for (let i = 0; i < subBlock.length; i++) {
        writeByte(subBlock[i]);
      }
      subBlock.length = 0;
    }
  }

  function emitCode(code: number): void {
    accumulator |= (code & codeMask) << bitsAccumulated;
    bitsAccumulated += codeSize;

    while (bitsAccumulated >= 8) {
      subBlock.push(accumulator & 0xff);
      accumulator >>= 8;
      bitsAccumulated -= 8;
      if (subBlock.length >= 254) {
        flushSubBlock();
      }
    }

    if (code === clearCode) {
      resetDict();
    } else if (nextCode < 4096) {
      if (nextCode > codeMask && codeSize < 12) {
        codeSize++;
        codeMask = (1 << codeSize) - 1;
      }
      nextCode++;
    }
  }

  // Initial Clear Code
  emitCode(clearCode);

  let prefix = pixels[0];

  for (let i = 1; i < pixels.length; i++) {
    const k = pixels[i];
    const key = (prefix << 8) | k;

    const entry = dict.get(key);
    if (entry !== undefined) {
      prefix = entry;
    } else {
      emitCode(prefix);
      if (nextCode >= 4096) {
        emitCode(clearCode);
      } else {
        dict.set(key, nextCode);
      }
      prefix = k;
    }
  }

  emitCode(prefix);
  emitCode(eofCode);

  // Flush remaining bits
  if (bitsAccumulated > 0) {
    subBlock.push(accumulator & 0xff);
  }
  flushSubBlock();
  writeByte(0x00); // Block terminator
}
