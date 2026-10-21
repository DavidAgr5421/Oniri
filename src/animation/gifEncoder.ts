/**
 * Pure TypeScript GIF89a Animation Encoder
 * Zero external dependencies, fast in-memory LZW compression and color quantization.
 */

export interface GifFrameInput {
  canvas: HTMLCanvasElement;
  delayMs: number;
}

export interface GifEncodeOptions {
  width: number;
  height: number;
  loopCount?: number; // 0 = infinite loop
  onProgress?: (frameIdx: number, totalFrames: number) => void;
}

/**
 * Builds an animated GIF Uint8Array from a series of canvas frames.
 */
export function encodeGif(frames: GifFrameInput[], options: GifEncodeOptions): Uint8Array {
  const { width, height, loopCount = 0, onProgress } = options;
  const out: number[] = [];

  function writeByte(b: number): void {
    out.push(b & 0xff);
  }

  function writeWord(w: number): void {
    out.push(w & 0xff);
    out.push((w >> 8) & 0xff);
  }

  function writeBytes(bytes: number[] | Uint8Array): void {
    for (let i = 0; i < bytes.length; i++) {
      out.push(bytes[i]);
    }
  }

  // 1. GIF89a Header
  // 'G', 'I', 'F', '8', '9', 'a'
  writeBytes([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);

  // 2. Logical Screen Descriptor
  writeWord(width);
  writeWord(height);
  // Packed field: no global color table (0), color resolution 7 (8 bits), not sorted (0), GCT size 0
  writeByte(0x70);
  writeByte(0); // Background color index
  writeByte(0); // Pixel aspect ratio

  // 3. Netscape 2.0 Loop Extension (for looping)
  writeBytes([0x21, 0xff, 0x0b]); // Extension Introducer, App Extension, block size 11
  writeBytes([0x4e, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2e, 0x30]); // "NETSCAPE2.0"
  writeByte(0x03); // Sub-block length
  writeByte(0x01); // Sub-block ID
  writeWord(loopCount); // Loop count (0 = infinite)
  writeByte(0x00); // Block Terminator

  // 4. Encode each frame
  for (let f = 0; f < frames.length; f++) {
    onProgress?.(f + 1, frames.length);
    const { canvas, delayMs } = frames[f];
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.getImageData(0, 0, width, height);
    const rgba = imgData.data;

    // Quantize 32-bit RGBA pixels into <= 256 colors
    const { palette, indexedPixels, transparentIndex } = quantizeRgba(rgba, width, height);

    // Graphic Control Extension (delay & transparency)
    const delayHundredths = Math.max(1, Math.round(delayMs / 10));
    writeBytes([0x21, 0xf9, 0x04]); // GCE, block size 4
    const hasTransparency = transparentIndex !== -1;
    // Packed field: disposal method 2 (restore to background), user input 0, transparent color flag
    const gcePacked = (2 << 2) | (hasTransparency ? 1 : 0);
    writeByte(gcePacked);
    writeWord(delayHundredths);
    writeByte(hasTransparency ? transparentIndex : 0);
    writeByte(0x00); // Block Terminator

    // Image Descriptor
    writeByte(0x2c); // ','
    writeWord(0); // Image Left
    writeWord(0); // Image Top
    writeWord(width);
    writeWord(height);

    // Local Color Table flag: 1, interlace: 0, sort: 0, size of table: palette.length
    // Palette size must be power of 2 between 2 and 256 (1 to 8 bits)
    const colorDepth = Math.max(2, Math.ceil(Math.log2(Math.max(4, palette.length))));
    const lctSize = 1 << colorDepth;
    const idPacked = 0x80 | (colorDepth - 1);
    writeByte(idPacked);

    // Write Local Color Table (RGB triplets)
    for (let i = 0; i < lctSize; i++) {
      if (i < palette.length) {
        writeByte(palette[i][0]);
        writeByte(palette[i][1]);
        writeByte(palette[i][2]);
      } else {
        writeByte(0);
        writeByte(0);
        writeByte(0);
      }
    }

    // LZW Raster Data
    encodeLzw(indexedPixels, colorDepth, writeByte);
  }

  // 5. GIF Trailer
  writeByte(0x3b); // ';'

  return new Uint8Array(out);
}

/**
 * Fast octree / popularity color quantizer for RGBA frames.
 */
function quantizeRgba(
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
