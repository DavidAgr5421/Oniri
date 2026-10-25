import initSqlJs, { type Database } from 'sql.js';
import * as fflate from 'fflate';
import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import type { LayerNode } from '../brush/layers';
import { DOC_H, DOC_W } from '../brush/docConstants';
import { cameraFrameManager } from '../canvas/cameraFrameManager';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';

export interface CelDescriptor {
  mainId: number;
  offset: number;
  length: number;
  sizes: number[];
  docW: number;
  docH: number;
  colorType?: number;
  originX?: number;
  originY?: number;
}

export interface ClipMetadata {
  width: number;
  height: number;
  resolution: number;
  fps: number;
  totalFrames: number;
  startFrame: number;
  endFrame: number;
  currentFrame: number;
  timelineName: string;
  rootFolderId: number;
  cropWidth?: number;
  cropHeight?: number;
  cropOffsetX?: number;
  cropOffsetY?: number;
  showCropFrame?: boolean;
  showSafeFrame?: boolean;
  layers: ClipLayerInfo[];
  tracks: ClipTrackInfo[];
  celDescriptors: Map<number, CelDescriptor>;
  previewPngBytes?: Uint8Array;
}

export interface ClipLayerInfo {
  mainId: number;
  name: string;
  type: number;
  isFolder: boolean;
  isAnimationFolder: boolean;
  opacity: number;
  visibility: boolean;
  blendMode: GlobalCompositeOperation;
  firstChild: number;
  nextIdx: number;
  uuid: string;
  clipped: boolean;
  locked: boolean;
}

export interface ClipTrackInfo {
  mainId: number;
  mixerId?: string;
  layerUuid?: string;
  exposures: Map<string, number>; // celName -> frame
}

export interface ClipImportResult {
  title: string;
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  layersCount: number;
  tracksCount: number;
  previewUrl?: string;
}

let sqlInstancePromise: Promise<any> | null = null;
let lastImportedClipBuffer: Uint8Array | null = null;
let lastImportedClipTitle: string = 'Animacion.clip';

function toHexUuid(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (val instanceof Uint8Array || Array.isArray(val)) {
    return Array.from(val).map((b) => Number(b).toString(16).padStart(2, '0')).join('').toLowerCase();
  }
  return String(val).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function toChunkKey(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val.trim();
  if (val instanceof Uint8Array) return new TextDecoder('latin1').decode(val).trim();
  return String(val).trim();
}

function getSqlJs(): Promise<any> {
  if (!sqlInstancePromise) {
    sqlInstancePromise = (async () => {
      // 1. In Node.js testing environment: load directly from node_modules
      if (typeof window === 'undefined') {
        try {
          const fsMod = 'fs';
          const pathMod = 'path';
          const fs = await import(/* @vite-ignore */ fsMod);
          const path = await import(/* @vite-ignore */ pathMod);
          const localPath = path.resolve(process.cwd(), 'node_modules/sql.js/dist/sql-wasm.wasm');
          if (fs.existsSync(localPath)) {
            const buf = fs.readFileSync(localPath);
            return await initSqlJs({ wasmBinary: new Uint8Array(buf).buffer });
          }
        } catch (e) {
          console.warn('Node wasm loading failed:', e);
        }
      }

      // 2. In Browser: direct binary fetch of wasm to verify magic bytes and bypass MIME streaming compile errors
      const wasmUrls = [
        '/sql-wasm.wasm',
        './sql-wasm.wasm',
        'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.15.1/sql-wasm.wasm',
        'https://cdn.jsdelivr.net/npm/sql.js@1.15.1/dist/sql-wasm.wasm',
      ];

      for (const url of wasmUrls) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const buf = await resp.arrayBuffer();
            const magic = new Uint8Array(buf, 0, 4);
            // Verify WebAssembly binary magic: 0x00, 0x61, 0x73, 0x6d (\0asm)
            if (magic[0] === 0x00 && magic[1] === 0x61 && magic[2] === 0x73 && magic[3] === 0x6d) {
              return await initSqlJs({ wasmBinary: buf });
            }
          }
        } catch {
          // Continue to next URL candidate
        }
      }

      // 3. Fallback: locateFile
      return await initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.15.1/${file}`,
      });
    })();
  }
  return sqlInstancePromise;
}

/**
 * Checks if a binary buffer is a .clip container file.
 */
export function isClipBuffer(buffer: Uint8Array): boolean {
  if (!buffer || buffer.length < 16) return false;
  // CSFCHUNK magic
  return (
    buffer[0] === 0x43 &&
    buffer[1] === 0x53 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x43 &&
    buffer[4] === 0x48 &&
    buffer[5] === 0x55 &&
    buffer[6] === 0x4e &&
    buffer[7] === 0x4b
  );
}

/**
 * Fast helper to find byte sequence in a Uint8Array.
 */
function findByteSequence(buffer: Uint8Array, pattern: Uint8Array, startOffset = 0, endOffset = buffer.length): number {
  const end = Math.min(buffer.length, endOffset) - pattern.length;
  for (let i = startOffset; i <= end; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (buffer[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }
  return -1;
}

/**
 * Parses tile compressed block sizes from an Offscreen Attribute UTF-16BE payload.
 */
function parseBlockSizes(attrBuf: Uint8Array): number[] {
  const pattern = [0x00, 0x42, 0x00, 0x6c, 0x00, 0x6f, 0x00, 0x63, 0x00, 0x6b, 0x00, 0x53, 0x00, 0x69, 0x00, 0x7a, 0x00, 0x65];
  let bsIdx = -1;
  for (let i = 0; i <= attrBuf.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (attrBuf[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      bsIdx = i;
      break;
    }
  }
  if (bsIdx === -1 || bsIdx + 26 > attrBuf.length) return [];

  const view = new DataView(attrBuf.buffer, attrBuf.byteOffset + bsIdx + 18);
  const count = view.getUint32(4, false);
  const sizes: number[] = [];
  for (let i = 0; i < count; i++) {
    sizes.push(view.getUint32(12 + i * 4, false));
  }
  return sizes;
}

/**
 * Decompresses tile raster data from CHNKExta and paints it onto the cel's canvas.
 */
export function decodeCelToCanvas(
  layer: LayerNode,
  desc: CelDescriptor,
  clipBuffer: Uint8Array
): boolean {
  if (!layer.canvas || (layer as any)._hasDecodedPixels) return true;
  if (desc.offset + desc.length > clipBuffer.length) return false;

  const chunkData = clipBuffer.subarray(desc.offset, desc.offset + desc.length);
  let curr = 130; // Standard tile payload start
  const cols = Math.ceil(desc.docW / 256);
  const rows = Math.ceil(desc.docH / 256);
  const tileW = 256;
  const tileH = 256;
  const originX = desc.originX ?? 0;
  const originY = desc.originY ?? 0;

  // Fast path: direct buffer creation on layer context, avoiding intermediate DOM canvases
  const isDirect = layer.canvas.width === desc.docW && layer.canvas.height === desc.docH;
  const ctx = layer.context || layer.canvas.getContext('2d', { willReadFrequently: true })!;
  if (!ctx) return false;

  const imgData = ctx.createImageData(desc.docW, desc.docH);
  const rgba = imgData.data;
  let tilesDrawn = 0;

  for (let i = 0; i < Math.min(cols * rows, desc.sizes.length); i++) {
    const sz = desc.sizes[i];
    if (curr + sz > chunkData.length) break;

    // Tokens of size <= 104 represent empty transparent tiles
    if (sz > 104) {
      const tileCompressed = chunkData.subarray(curr, curr + sz);
      try {
        const decomp = fflate.unzlibSync(tileCompressed);
        if (decomp.length === 327680) { // 256 * 256 * 5 channels
          tilesDrawn++;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const startX = originX + col * tileW;
          const startY = originY + row * tileH;

          const c0 = decomp.subarray(0, 65536);       // Alpha / Density
          const c1 = decomp.subarray(65536, 131072);  // Red or Black mask
          const c2 = decomp.subarray(131072, 196608); // Green or White mask
          const c3 = decomp.subarray(196608, 262144); // Blue

          const isMonochrome = desc.colorType === 0 || desc.colorType === 1 || desc.colorType === undefined;

          const rawRgba = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
          const rustOk = rustStrokeEngine.blitPlanarTile(
            rawRgba,
            desc.docW,
            desc.docH,
            decomp,
            startX,
            startY,
            isMonochrome
          );

          if (!rustOk) {
            for (let ty = 0; ty < tileH; ty++) {
              const py = startY + ty;
              if (py < 0 || py >= desc.docH) continue;
              const rowOffset = py * desc.docW;
              const tileRowOffset = ty * tileW;

              for (let tx = 0; tx < tileW; tx++) {
                const px = startX + tx;
                if (px < 0 || px >= desc.docW) continue;
                const tidx = tileRowOffset + tx;
                const a = c0[tidx];
                if (a === 0) continue;

                const pidx = (rowOffset + px) * 4;
                if (isMonochrome) {
                  rgba[pidx] = 0;
                  rgba[pidx + 1] = 0;
                  rgba[pidx + 2] = 0;
                } else {
                  rgba[pidx] = c1[tidx];     // R
                  rgba[pidx + 1] = c2[tidx]; // G
                  rgba[pidx + 2] = c3[tidx]; // B
                }
                rgba[pidx + 3] = a;        // A
              }
            }
          }
        }
      } catch {
        // Continue to next tile
      }
    }
    curr += sz;
  }

  if (tilesDrawn > 0) {
    ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    if (isDirect) {
      ctx.putImageData(imgData, 0, 0);
    } else {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = desc.docW;
      tempCanvas.height = desc.docH;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(tempCanvas, 0, 0, layer.canvas.width, layer.canvas.height);
    }
  }

  (layer as any)._hasDecodedPixels = true;
  return true;
}

/**
 * Ultra-fast extractor of SQLite database from a .clip CSFCHUNK container.
 */
export function extractSqliteFromClipBuffer(clipBuffer: Uint8Array): Uint8Array {
  if (!clipBuffer || clipBuffer.length < 64) {
    throw new Error('El archivo es demasiado pequeño para ser un archivo .clip válido.');
  }

  // 1. Direct header lookup (CSFCHUNK)
  try {
    const view = new DataView(clipBuffer.buffer, clipBuffer.byteOffset, clipBuffer.byteLength);
    const sqliOffset = Number(view.getBigUint64(48, false));
    if (sqliOffset > 0 && sqliOffset + 16 <= clipBuffer.length) {
      const isSqliTag =
        clipBuffer[sqliOffset] === 0x43 &&
        clipBuffer[sqliOffset + 1] === 0x48 &&
        clipBuffer[sqliOffset + 2] === 0x4e &&
        clipBuffer[sqliOffset + 3] === 0x4b &&
        clipBuffer[sqliOffset + 4] === 0x53 &&
        clipBuffer[sqliOffset + 5] === 0x51 &&
        clipBuffer[sqliOffset + 6] === 0x4c &&
        clipBuffer[sqliOffset + 7] === 0x69;

      if (isSqliTag) {
        const dbLength = Number(view.getBigUint64(sqliOffset + 8, false));
        if (dbLength > 0 && sqliOffset + 16 + dbLength <= clipBuffer.length + 1024) {
          return clipBuffer.subarray(sqliOffset + 16, Math.min(clipBuffer.length, sqliOffset + 16 + dbLength));
        }
      }
    }
  } catch {}

  // 2. Fallback: Search backwards from end of file
  const sqliteMagic = new TextEncoder().encode('SQLite format 3\0');
  const searchChunkSize = Math.min(clipBuffer.length, 32 * 1024 * 1024);
  const backwardStart = clipBuffer.length - searchChunkSize;
  let foundOffset = findByteSequence(clipBuffer, sqliteMagic, backwardStart);

  if (foundOffset === -1) {
    foundOffset = findByteSequence(clipBuffer, sqliteMagic, 0);
  }

  if (foundOffset === -1) {
    throw new Error('El archivo .clip no contiene una base de datos SQLite válida.');
  }

  return clipBuffer.subarray(foundOffset);
}

/**
 * Pure binary scanner fallback to extract embedded PNG preview without SQLite engine.
 */
export function extractPngFromBinaryFallback(buffer: Uint8Array): Uint8Array | null {
  const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const pngIend = new Uint8Array([0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);

  let searchPos = 0;
  while (searchPos < buffer.length - 16) {
    const start = findByteSequence(buffer, pngHeader, searchPos);
    if (start === -1) break;

    const end = findByteSequence(buffer, pngIend, start + 8);
    if (end !== -1) {
      const fullEnd = end + pngIend.length;
      return buffer.slice(start, fullEnd);
    }
    searchPos = start + 8;
  }
  return null;
}

/**
 * Extracts the full canvas preview PNG from a .clip file.
 */
export async function extractClipPreview(clipBuffer: Uint8Array): Promise<Uint8Array | null> {
  try {
    const sqliteBuffer = extractSqliteFromClipBuffer(clipBuffer);
    const SQL = await getSqlJs();
    const db: Database = new SQL.Database(sqliteBuffer);

    const results = db.exec('SELECT ImageData FROM CanvasPreview LIMIT 1');
    if (results.length > 0 && results[0].values.length > 0) {
      const row = results[0].values[0];
      if (row[0] instanceof Uint8Array) {
        db.close();
        return row[0];
      }
    }
    db.close();
  } catch (err) {
    console.warn('SQL.js CanvasPreview query failed, using binary PNG extraction fallback:', err);
  }

  return extractPngFromBinaryFallback(clipBuffer);
}

/**
 * Parses layers, hierarchy, timeline tracks, and metadata from the SQLite database of a .clip file.
 */
export async function parseClipMetadata(clipBuffer: Uint8Array): Promise<ClipMetadata> {
  const meta: ClipMetadata = {
    width: DOC_W,
    height: DOC_H,
    resolution: 300,
    fps: 24,
    totalFrames: 24,
    startFrame: 1,
    endFrame: 24,
    currentFrame: 1,
    timelineName: 'Escena 1',
    rootFolderId: 2,
    layers: [],
    tracks: [],
    celDescriptors: new Map(),
  };

  try {
    const sqliteBuffer = extractSqliteFromClipBuffer(clipBuffer);
    const SQL = await getSqlJs();
    const db: Database = new SQL.Database(sqliteBuffer);

    // 1. Canvas dimensions & Root folder
    try {
      const cRes = db.exec(`
        SELECT CanvasWidth, CanvasHeight, CanvasResolution, CanvasRootFolder,
               CropFrameWidth, CropFrameHeight, CropFrameCropOffsetX, CropFrameCropOffsetY,
               CropFrameShow, SafeFrameShow
        FROM Canvas LIMIT 1
      `);
      if (cRes.length > 0 && cRes[0].values.length > 0) {
        const [w, h, res, root, cfW, cfH, cfOffX, cfOffY, cfShow, sfShow] = cRes[0].values[0];
        if (typeof w === 'number' && w > 0) meta.width = Math.round(w);
        if (typeof h === 'number' && h > 0) meta.height = Math.round(h);
        if (typeof res === 'number' && res > 0) meta.resolution = Math.round(res);
        if (typeof root === 'number') meta.rootFolderId = root;
        if (typeof cfW === 'number' && cfW > 0) meta.cropWidth = Math.round(cfW);
        if (typeof cfH === 'number' && cfH > 0) meta.cropHeight = Math.round(cfH);
        if (typeof cfOffX === 'number') meta.cropOffsetX = Math.round(cfOffX);
        if (typeof cfOffY === 'number') meta.cropOffsetY = Math.round(cfOffY);
        if (typeof cfShow === 'number') meta.showCropFrame = cfShow !== 0;
        if (typeof sfShow === 'number') meta.showSafeFrame = sfShow !== 0;
      }
    } catch (e) {
      console.warn('Clip Canvas query warning:', e);
    }

    // 2. TimeLine settings
    try {
      const tlRes = db.exec('SELECT TimeLineName, FrameRate, StartFrame, EndFrame, CurrentFrame FROM TimeLine LIMIT 1');
      if (tlRes.length > 0 && tlRes[0].values.length > 0) {
        const [name, rate, sF, eF, curF] = tlRes[0].values[0];
        meta.timelineName = String(name || 'Escena 1');
        meta.fps = Math.round(Number(rate) || 24);
        meta.startFrame = Math.max(1, Math.round(Number(sF) || 0) + 1);
        meta.endFrame = Math.round(Number(eF) || 24);
        meta.totalFrames = Math.max(meta.endFrame, meta.endFrame - meta.startFrame + 1);
        meta.currentFrame = Math.max(1, Math.round(Number(curF) || 1));
      }
    } catch (e) {
      console.warn('Clip TimeLine query warning:', e);
    }

    // 3. CanvasPreview PNG
    try {
      const pRes = db.exec('SELECT ImageData FROM CanvasPreview LIMIT 1');
      if (pRes.length > 0 && pRes[0].values.length > 0 && pRes[0].values[0][0] instanceof Uint8Array) {
        meta.previewPngBytes = pRes[0].values[0][0] as Uint8Array;
      }
    } catch (e) {
      console.warn('Clip CanvasPreview query warning:', e);
    }

    // 4. ExternalChunk map
    const extMap = new Map<string, number>();
    try {
      const extRes = db.exec('SELECT ExternalID, Offset FROM ExternalChunk');
      if (extRes.length > 0) {
        for (const [id, off] of extRes[0].values) {
          extMap.set(toChunkKey(id), Number(off));
        }
      }
    } catch {}

    // 5. Track Table & Cel Keyframe Exposures
    try {
      const trackRes = db.exec('SELECT MainId, TrackActionMixer, TrackValueMap, LayerUuidWithTrack FROM Track');
      if (trackRes.length > 0) {
        for (const [tId, mixer, _valMap, lUuid] of trackRes[0].values) {
          const trackInfo: ClipTrackInfo = {
            mainId: Number(tId),
            mixerId: toChunkKey(mixer),
            layerUuid: toHexUuid(lUuid),
            exposures: new Map(),
          };

          if (trackInfo.mixerId && extMap.has(trackInfo.mixerId)) {
            const off = extMap.get(trackInfo.mixerId)!;
            parseTrackMixerExposures(clipBuffer, off, trackInfo.exposures);
          }

          meta.tracks.push(trackInfo);
        }
      }
    } catch (e) {
      console.warn('Clip Track query warning:', e);
    }

    // 6. Layer Table
    try {
      const layerRes = db.exec(`
        SELECT MainId, LayerName, LayerType, LayerFolder, LayerVisibility, LayerOpacity, 
               LayerFirstChildIndex, LayerNextIndex, AnimationFolder, LayerUuid, LayerClip, LayerLock
        FROM Layer
      `);
      if (layerRes.length > 0) {
        for (const row of layerRes[0].values) {
          const [mainId, name, lType, isFolder, vis, op, firstChild, nextIdx, animFolder, uuid, clip, lock] = row;
          meta.layers.push({
            mainId: Number(mainId),
            name: String(name || 'Capa'),
            type: Number(lType ?? 1),
            isFolder: Boolean(isFolder || animFolder === 1 || lType === 0),
            isAnimationFolder: Boolean(animFolder === 1),
            opacity: typeof op === 'number' ? Math.max(0, Math.min(1, op / 256)) : 1,
            visibility: vis !== 0,
            blendMode: 'source-over',
            firstChild: Number(firstChild || 0),
            nextIdx: Number(nextIdx || 0),
            uuid: toHexUuid(uuid),
            clipped: Boolean(clip),
            locked: Boolean(lock),
          });
        }
      }
    } catch (e) {
      console.warn('Clip Layer query warning:', e);
    }

    // 7. Cel Tile Descriptors (Offscreen, Mipmap, MipmapInfo)
    try {
      const offRes = db.exec(`
        SELECT l.MainId, o.Attribute, o.BlockData, l.LayerColorTypeIndex,
               l.LayerOffsetX, l.LayerOffsetY, l.LayerRenderOffscrOffsetX, l.LayerRenderOffscrOffsetY
        FROM Layer l
        JOIN Mipmap m ON m.LayerId = l.MainId
        JOIN MipmapInfo mi ON mi.MainId = m.BaseMipmapInfo
        JOIN Offscreen o ON o.MainId = mi.Offscreen
        WHERE l.LayerType != 0 AND l.LayerType != 256
      `);
      if (offRes.length > 0) {
        for (const [mainId, attr, blockData, colType, ox, oy, rox, roy] of offRes[0].values) {
          const chunkKey = typeof blockData === 'string' ? blockData : new TextDecoder('latin1').decode(blockData as Uint8Array);
          const off = extMap.get(chunkKey);
          if (!off) continue;
          const attrBuf = attr instanceof Uint8Array ? attr : new Uint8Array(attr as any);
          const sizes = parseBlockSizes(attrBuf);
          if (sizes.length > 0 && off + 16 <= clipBuffer.length) {
            const view = new DataView(clipBuffer.buffer, clipBuffer.byteOffset + off);
            const chunkLen = Number(view.getBigUint64(8, false));
            const originX = (Number(ox) || 0) + (Number(rox) || 0);
            const originY = (Number(oy) || 0) + (Number(roy) || 0);
            meta.celDescriptors.set(Number(mainId), {
              mainId: Number(mainId),
              offset: off + 16,
              length: chunkLen,
              sizes,
              docW: meta.width,
              docH: meta.height,
              colorType: typeof colType === 'number' ? colType : 0,
              originX,
              originY,
            });
          }
        }
      }
    } catch (e) {
      console.warn('Clip Offscreen descriptors query warning:', e);
    }

    db.close();
  } catch (err) {
    console.warn('Clip metadata query encountered error, falling back to basic preview:', err);
  }

  if (!meta.previewPngBytes) {
    const fallback = extractPngFromBinaryFallback(clipBuffer);
    if (fallback) meta.previewPngBytes = fallback;
  }

  return meta;
}

/**
 * Parses FCurve cel exposures from a TrackActionMixer external chunk.
 */
function parseTrackMixerExposures(
  clipBuffer: Uint8Array,
  chunkOffset: number,
  outExposures: Map<string, number>
): void {
  try {
    if (chunkOffset + 16 > clipBuffer.length) return;
    const view = new DataView(clipBuffer.buffer, clipBuffer.byteOffset + chunkOffset);
    const chunkLen = Number(view.getBigUint64(8, false));
    if (chunkLen <= 0 || chunkOffset + 16 + chunkLen > clipBuffer.length) return;

    const chunkData = clipBuffer.subarray(chunkOffset + 16, chunkOffset + 16 + chunkLen);

    let zstart = -1;
    for (let i = 0; i < Math.min(120, chunkData.length - 2); i++) {
      if (chunkData[i] === 0x78 && (chunkData[i + 1] === 0x01 || chunkData[i + 1] === 0x9c || chunkData[i + 1] === 0xda)) {
        zstart = i;
        break;
      }
    }
    if (zstart === -1) return;

    const decomp = fflate.unzlibSync(chunkData.subarray(zstart));

    const fcurveIdx = findByteSequence(decomp, new TextEncoder().encode('FCurve'));
    if (fcurveIdx === -1) return;

    const constIdx = findByteSequence(decomp, new TextEncoder().encode('Constant'), fcurveIdx);
    if (constIdx === -1) return;

    let p = constIdx + 8;
    const celNames: string[] = [];
    while (p < decomp.length) {
      const slen = decomp[p];
      if (slen === 0 || slen > 30) break;
      let isAscii = true;
      for (let j = 0; j < slen; j++) {
        const b = decomp[p + 1 + j];
        if (b < 32 || b > 126) {
          isAscii = false;
          break;
        }
      }
      if (!isAscii) break;
      const celName = new TextDecoder('latin1').decode(decomp.subarray(p + 1, p + 1 + slen));
      celNames.push(celName);
      p += 1 + slen;
    }

    const f1Pattern = new Uint8Array([0x00, 0x00, 0x80, 0x3f]);
    const f1Pos = findByteSequence(decomp, f1Pattern, p);
    if (f1Pos !== -1) {
      let celIdx = 0;
      for (let fp = f1Pos; fp < f1Pos + celNames.length * 8 && fp + 4 <= decomp.length; fp += 4) {
        const fView = new DataView(decomp.buffer, decomp.byteOffset + fp, 4);
        const val = fView.getFloat32(0, true);
        if (Number.isFinite(val) && val >= -1000 && val <= 5000 && celIdx < celNames.length) {
          outExposures.set(celNames[celIdx], Math.round(val));
          celIdx++;
        }
      }
    }
  } catch (e) {
    console.warn('Failed parsing track mixer exposures:', e);
  }
}

/**
 * Imports a .clip container file into Oniri's engine and timeline manager.
 */
export async function importClipProject(
  clipBuffer: Uint8Array,
  engine: BrushEngine,
  timeline: TimelineManager,
  title = 'Ilustración importada'
): Promise<ClipImportResult> {
  if (!isClipBuffer(clipBuffer)) {
    throw new Error('El archivo seleccionado no es un archivo .clip válido.');
  }

  lastImportedClipBuffer = clipBuffer;
  lastImportedClipTitle = title;

  const meta = await parseClipMetadata(clipBuffer);

  // Resize engine & viewport to imported clip dimensions
  engine.setDocumentSize(meta.width, meta.height);

  // Configure Output Camera Frame & Overscan
  if (meta.cropWidth && meta.cropHeight && (meta.cropWidth < meta.width || meta.cropHeight < meta.height)) {
    cameraFrameManager.configure({
      enabled: true,
      outputWidth: meta.cropWidth,
      outputHeight: meta.cropHeight,
      offsetX: meta.cropOffsetX ?? 0,
      offsetY: meta.cropOffsetY ?? 0,
      showFrame: meta.showCropFrame !== false,
      showMask: true,
      showSafeMargin: meta.showSafeFrame ?? false,
    });
  } else {
    cameraFrameManager.configure({ enabled: false });
  }

  const layers: LayerNode[] = [];
  const layerMap = new Map<number, ClipLayerInfo>();
  for (const l of meta.layers) {
    layerMap.set(l.mainId, l);
  }

  // 1. Paper Layer (Bottom background)
  const paperCanvas = document.createElement('canvas');
  paperCanvas.width = meta.width;
  paperCanvas.height = meta.height;
  const paperCtx = paperCanvas.getContext('2d', { willReadFrequently: true })!;
  paperCtx.fillStyle = '#ffffff';
  paperCtx.fillRect(0, 0, meta.width, meta.height);

  layers.push({
    id: 'layer-paper',
    type: 'raster',
    name: 'Papel',
    canvas: paperCanvas,
    context: paperCtx,
    visible: true,
    opacity: 1,
    blendMode: 'source-over',
    isPaper: true,
    parentId: null,
    collapsed: false,
    clipped: false,
    locked: true,
  });

  // 2. Optional composite reference layer (HIDDEN by default so it never masks separate animation folders)
  let previewUrl: string | undefined = undefined;
  if (meta.previewPngBytes && meta.previewPngBytes.length > 8) {
    try {
      const artCanvas = document.createElement('canvas');
      artCanvas.width = DOC_W;
      artCanvas.height = DOC_H;
      const artCtx = artCanvas.getContext('2d', { willReadFrequently: true })!;

      const blob = new Blob([meta.previewPngBytes as any], { type: 'image/png' });
      previewUrl = URL.createObjectURL(blob);
      const img = new Image();
      const loaded = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = previewUrl!;
      });

      if (loaded && img.width > 0 && img.height > 0) {
        const scale = Math.min(DOC_W / img.width, DOC_H / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = (DOC_W - dw) / 2;
        const dy = (DOC_H - dh) / 2;
        artCtx.drawImage(img, dx, dy, dw, dh);

        layers.push({
          id: `layer-clip-composite-ref`,
          type: 'raster',
          name: '[Referencia Compuesta]',
          canvas: artCanvas,
          context: artCtx,
          visible: false, // Inactive so real animation cels show
          opacity: 1,
          blendMode: 'source-over',
          isPaper: false,
          parentId: null,
          collapsed: false,
          clipped: false,
          locked: true,
          lockAlpha: false,
        });
      }
    } catch (e) {
      console.warn('Optional preview reference skipped:', e);
    }
  }

  // 3. Reconstruct Layer Hierarchy
  const animFolders: { node: LayerNode; info: ClipLayerInfo; trackId: string }[] = [];

  function buildSubtree(startId: number, parentId: string | null) {
    let curr = startId;
    while (curr !== 0 && layerMap.has(curr)) {
      const info = layerMap.get(curr)!;
      if (info.mainId === meta.rootFolderId || info.name.toLowerCase() === 'paper' || info.name.toLowerCase() === 'papel') {
        curr = info.nextIdx;
        continue;
      }

      const isFolder = info.isFolder || info.isAnimationFolder;
      const nodeId = `layer-clip-${info.mainId}`;

      let canvas: HTMLCanvasElement | undefined = undefined;
      let context: CanvasRenderingContext2D | undefined = undefined;

      if (!isFolder) {
        canvas = document.createElement('canvas');
        canvas.width = meta.width;
        canvas.height = meta.height;
        context = canvas.getContext('2d', { willReadFrequently: true })!;
      }

      const node: LayerNode = {
        id: nodeId,
        type: isFolder ? 'folder' : 'raster',
        name: info.name,
        canvas,
        context,
        visible: info.visibility,
        opacity: info.opacity,
        blendMode: info.blendMode,
        isPaper: false,
        isAnimationFolder: info.isAnimationFolder,
        parentId,
        collapsed: isFolder,
        clipped: info.clipped,
        locked: info.locked,
        lockAlpha: false,
      };

      layers.push(node);

      if (info.isAnimationFolder) {
        animFolders.push({ node, info, trackId: nodeId });
      }

      if (info.firstChild !== 0) {
        buildSubtree(info.firstChild, nodeId);
      }

      curr = info.nextIdx;
    }
  }

  const rootInfo = layerMap.get(meta.rootFolderId);
  if (rootInfo && rootInfo.firstChild !== 0) {
    buildSubtree(rootInfo.firstChild, null);
  }

  // Load layers into engine
  engine.layerManager.loadLayers(layers);

  // 4. Configure Timeline & Animation Tracks
  try {
    const sFrame = meta.startFrame !== undefined ? meta.startFrame : 1;
    timeline.setFps(meta.fps || 24);
    timeline.setTotalFrames(meta.totalFrames || 24);
    timeline.setRange(sFrame, meta.endFrame || 24);

    for (const af of animFolders) {
      const childCels = layers.filter((l) => l.parentId === af.node.id);
      let track = timeline.tracks.find((t) => t.folderId === af.node.id);
      if (!track) {
        track = timeline.createTrack(af.node.name);
      }

      const matchedTrack = meta.tracks.find(
        (t) =>
          t.layerUuid &&
          af.info.uuid &&
          (t.layerUuid === af.info.uuid ||
            t.layerUuid.includes(af.info.uuid) ||
            af.info.uuid.includes(t.layerUuid))
      );

      if (matchedTrack && matchedTrack.exposures.size > 0) {
        let minExpFrame = sFrame;
        for (const f of matchedTrack.exposures.values()) {
          if (f < minExpFrame) minExpFrame = f;
        }
        if (track.clips.length > 0) {
          track.clips[0].startFrame = minExpFrame;
        }

        for (const [celName, frame] of matchedTrack.exposures.entries()) {
          const celLayer = childCels.find((c) => c.name === celName);
          if (celLayer && track.clips.length > 0) {
            track.clips[0].exposures.set(frame, celLayer.id);
          }
        }
      } else if (childCels.length > 0 && track.clips.length > 0) {
        let frame = sFrame;
        for (const cel of childCels) {
          track.clips[0].exposures.set(frame++, cel.id);
        }
      }
    }

    timeline.goToFrame(meta.currentFrame || 1);
  } catch (tlErr) {
    console.warn('Error setting up timeline tracks from .clip file:', tlErr);
  }

  // 5. Decode Initial Frame Cels Immediately for High Fidelity Display
  const initFrame = meta.currentFrame || 1;
  for (const track of timeline.tracks) {
    const activeCel = timeline.getActiveCelForFrame(track.id, initFrame);
    if (activeCel) {
      const matchId = Number(activeCel.id.replace('layer-clip-', ''));
      const desc = meta.celDescriptors.get(matchId);
      if (desc) {
        decodeCelToCanvas(activeCel, desc, clipBuffer);
      }
    }
  }

  // Also decode frame 1 cels if currentFrame was different
  if (initFrame !== 1) {
    for (const track of timeline.tracks) {
      const cel1 = timeline.getActiveCelForFrame(track.id, 1);
      if (cel1) {
        const matchId = Number(cel1.id.replace('layer-clip-', ''));
        const desc = meta.celDescriptors.get(matchId);
        if (desc) {
          decodeCelToCanvas(cel1, desc, clipBuffer);
        }
      }
    }
  }

  // 6. Hook Timeline Scrubbing to On-Demand Decode Any Unrendered Cels
  timeline.subscribe(() => {
    const curFrame = timeline.settings.currentFrame;
    let needsUpdate = false;
    for (const track of timeline.tracks) {
      const activeCel = timeline.getActiveCelForFrame(track.id, curFrame);
      if (activeCel && !(activeCel as any)._hasDecodedPixels) {
        const matchId = Number(activeCel.id.replace('layer-clip-', ''));
        const desc = meta.celDescriptors.get(matchId);
        if (desc) {
          decodeCelToCanvas(activeCel, desc, clipBuffer);
          needsUpdate = true;
        }
      }
    }
    if (needsUpdate) {
      engine.compositeDirty = true;
      engine.updateComposite();
    }
  });

  // 7. Background Progressive Decoder for remaining cels (non-blocking idle queue)
  startProgressiveCelDecoder(engine, timeline, clipBuffer, meta.celDescriptors, layers);

  engine.compositeDirty = true;
  engine.updateComposite();

  return {
    title,
    width: meta.width,
    height: meta.height,
    fps: meta.fps,
    totalFrames: meta.totalFrames,
    layersCount: layers.length,
    tracksCount: animFolders.length,
    previewUrl,
  };
}

/**
 * Non-blocking idle queue that decodes remaining animation cels in the background.
 */
function startProgressiveCelDecoder(
  engine: BrushEngine,
  timeline: TimelineManager,
  clipBuffer: Uint8Array,
  celDescMap: Map<number, CelDescriptor>,
  layers: LayerNode[]
): void {
  const rasterCels = layers.filter((l) => l.type === 'raster' && !l.isPaper && !(l as any)._hasDecodedPixels);
  let idx = 0;

  function decodeStep() {
    if (idx >= rasterCels.length) return;
    const cel = rasterCels[idx++];
    if (!(cel as any)._hasDecodedPixels) {
      const matchId = Number(cel.id.replace('layer-clip-', ''));
      const desc = celDescMap.get(matchId);
      if (desc) {
        decodeCelToCanvas(cel, desc, clipBuffer);
        if (timeline.isLayerVisibleAtFrame(cel, timeline.settings.currentFrame)) {
          engine.compositeDirty = true;
          engine.updateComposite();
        }
      }
    }
    // Relaxed background interval (100ms) with requestIdleCallback so CPU remains buttery smooth
    if (typeof (window as any).requestIdleCallback === 'function') {
      (window as any).requestIdleCallback(() => decodeStep(), { timeout: 1000 });
    } else {
      setTimeout(decodeStep, 100);
    }
  }

  if (typeof (window as any).requestIdleCallback === 'function') {
    (window as any).requestIdleCallback(() => decodeStep(), { timeout: 1000 });
  } else {
    setTimeout(decodeStep, 200);
  }
}

/**
 * Packs a SQLite database buffer into a CSFCHUNK container.
 */
export function createClipContainer(sqliteBytes: Uint8Array): Uint8Array {
  const headerSize = 24;
  const headChunkSize = 16 + 40;
  const sqliOffset = headerSize + headChunkSize;
  const sqliChunkSize = 16 + sqliteBytes.length;
  const footChunkSize = 16;
  const totalLength = sqliOffset + sqliChunkSize + footChunkSize;

  const clipBuf = new Uint8Array(totalLength);
  const view = new DataView(clipBuf.buffer);

  // 1. CSFCHUNK Header
  clipBuf.set(new TextEncoder().encode('CSFCHUNK'), 0);
  view.setBigUint64(8, BigInt(totalLength), false);
  view.setBigUint64(16, BigInt(24), false);

  // 2. CHNKHead
  clipBuf.set(new TextEncoder().encode('CHNKHead'), 24);
  view.setBigUint64(32, BigInt(40), false);
  view.setBigUint64(40, BigInt(0x100), false);
  view.setBigUint64(48, BigInt(sqliOffset), false);
  view.setBigUint64(56, BigInt(0x10), false);

  // 3. CHNKSQLi
  clipBuf.set(new TextEncoder().encode('CHNKSQLi'), sqliOffset);
  view.setBigUint64(sqliOffset + 8, BigInt(sqliteBytes.length), false);
  clipBuf.set(sqliteBytes, sqliOffset + 16);

  // 4. CHNKFoot
  clipBuf.set(new TextEncoder().encode('CHNKFoot'), sqliOffset + sqliChunkSize);
  view.setBigUint64(sqliOffset + sqliChunkSize + 8, BigInt(0), false);

  return clipBuf;
}

/**
 * Exports the active project as a .clip container file.
 */
export async function exportClipPackage(
  engine: BrushEngine,
  timeline: TimelineManager
): Promise<Uint8Array> {
  const SQL = await getSqlJs();

  let db: Database;
  if (lastImportedClipBuffer) {
    try {
      const sqliBytes = extractSqliteFromClipBuffer(lastImportedClipBuffer);
      db = new SQL.Database(sqliBytes);
    } catch {
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS Canvas (
      _PW_ID INTEGER PRIMARY KEY,
      CanvasWidth REAL,
      CanvasHeight REAL,
      CanvasResolution REAL,
      CanvasRootFolder INTEGER
    );
    CREATE TABLE IF NOT EXISTS CanvasPreview (
      _PW_ID INTEGER PRIMARY KEY,
      MainId INTEGER,
      CanvasId INTEGER,
      ImageType INTEGER,
      ImageWidth INTEGER,
      ImageHeight INTEGER,
      ImageData BLOB
    );
    CREATE TABLE IF NOT EXISTS TimeLine (
      _PW_ID INTEGER PRIMARY KEY,
      TimeLineName TEXT,
      FrameRate REAL,
      StartFrame REAL,
      EndFrame REAL,
      CurrentFrame REAL
    );
  `);

  engine.updateComposite();
  const previewBlob = await new Promise<Blob | null>((resolve) => {
    engine.compositeCanvas.toBlob(resolve, 'image/png');
  });

  let previewBytes: Uint8Array | null = null;
  if (previewBlob) {
    previewBytes = new Uint8Array(await previewBlob.arrayBuffer());
  }

  if (previewBytes) {
    db.run('DELETE FROM CanvasPreview');
    db.run(
      'INSERT INTO CanvasPreview (_PW_ID, MainId, CanvasId, ImageType, ImageWidth, ImageHeight, ImageData) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [1, 1, 1, 1, DOC_W, DOC_H, previewBytes]
    );
  }

  db.run('DELETE FROM TimeLine');
  db.run(
    'INSERT INTO TimeLine (_PW_ID, TimeLineName, FrameRate, StartFrame, EndFrame, CurrentFrame) VALUES (?, ?, ?, ?, ?, ?)',
    [
      1,
      timeline.activeScene?.name || 'Escena 1',
      timeline.settings.fps,
      timeline.settings.startFrame,
      timeline.settings.endFrame,
      timeline.settings.currentFrame,
    ]
  );

  const exportedSqlite = db.export();
  db.close();

  return createClipContainer(exportedSqlite);
}

/**
 * Triggers browser download of current project as .clip file.
 */
export async function saveClipToFile(engine: BrushEngine, timeline: TimelineManager): Promise<void> {
  const clipBytes = await exportClipPackage(engine, timeline);
  const blob = new Blob([clipBytes as any], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = lastImportedClipTitle.endsWith('.clip')
    ? lastImportedClipTitle
    : `${lastImportedClipTitle}.clip`;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
