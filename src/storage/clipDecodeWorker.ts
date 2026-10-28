/**
 * Web Worker de decodificación de cels .clip.
 * Descomprime las teselas con Rust (miniz_oxide + SIMD) fuera del hilo principal y devuelve
 * únicamente las teselas de 128x128 con contenido, listas para insertarse en un SparseTileGrid.
 */
import initWasm, { ClipTileCore } from '../wasm/oniri-brush-core/oniri_brush_core';

const TILE = 128;
const SRC_TILE = 256;

export interface CelDecodeRequest {
  id: number;
  docW: number;
  docH: number;
  originX: number;
  originY: number;
  isMonochrome: boolean;
  sizes: number[];
  /** Bytes del chunk del cel (misma base que desc.offset en el archivo). */
  chunk: ArrayBuffer;
}

export interface CelDecodedTile {
  col: number;
  row: number;
  data: ArrayBuffer;
}

export interface CelDecodeResponse {
  id: number;
  ok: boolean;
  tiles: CelDecodedTile[];
  tilesDrawn: number;
  emptyTiles: number;
  workerMs: number;
}

interface WorkerScope {
  postMessage(message: unknown, transfer?: Transferable[]): void;
  onmessage: ((e: MessageEvent) => void) | null;
}
const scope = self as unknown as WorkerScope;

let ready: Promise<boolean> | null = null;
let fullBuffer: Uint8Array | null = null;

function ensureReady(): Promise<boolean> {
  if (!ready) {
    ready = initWasm()
      .then(() => true)
      .catch(() => false);
  }
  return ready;
}

function decode(req: CelDecodeRequest): CelDecodeResponse {
  const t0 = performance.now();
  const { docW, docH, originX, originY, isMonochrome, sizes } = req;
  const bytes = docW * docH * 4;
  if (!fullBuffer || fullBuffer.length < bytes) {
    fullBuffer = new Uint8Array(bytes);
  } else {
    fullBuffer.fill(0, 0, bytes);
  }
  const rgba = fullBuffer;

  const chunk = new Uint8Array(req.chunk);
  const cols = Math.ceil(docW / SRC_TILE);
  const rows = Math.ceil(docH / SRC_TILE);
  let curr = 130; // inicio estándar del payload de teselas
  let tilesDrawn = 0;
  let emptyTiles = 0;
  let allOk = true;

  for (let i = 0; i < Math.min(cols * rows, sizes.length); i++) {
    const sz = sizes[i];
    if (curr + sz > chunk.length) break;
    if (sz <= 104) {
      emptyTiles++;
    } else {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const ok = ClipTileCore.decompress_and_blit_tile(
        rgba,
        docW,
        docH,
        chunk.subarray(curr, curr + sz),
        originX + col * SRC_TILE,
        originY + row * SRC_TILE,
        isMonochrome,
      );
      if (ok) tilesDrawn++;
      else allOk = false; // el hilo principal reintentará con la ruta JS de respaldo
    }
    curr += sz;
  }

  if (!allOk) {
    return { id: req.id, ok: false, tiles: [], tilesDrawn: 0, emptyTiles: 0, workerMs: performance.now() - t0 };
  }

  // Extraer solo teselas 128x128 con algún píxel no transparente
  const tiles: CelDecodedTile[] = [];
  const tCols = Math.ceil(docW / TILE);
  const tRows = Math.ceil(docH / TILE);
  for (let r = 0; r < tRows; r++) {
    const startY = r * TILE;
    const validH = Math.min(TILE, docH - startY);
    for (let c = 0; c < tCols; c++) {
      const startX = c * TILE;
      const validW = Math.min(TILE, docW - startX);

      let hasContent = false;
      for (let ty = 0; ty < validH && !hasContent; ty++) {
        const rowStart = ((startY + ty) * docW + startX) * 4;
        for (let tx = 0; tx < validW; tx++) {
          if (rgba[rowStart + tx * 4 + 3] !== 0) {
            hasContent = true;
            break;
          }
        }
      }
      if (!hasContent) continue;

      const tile = new Uint8Array(TILE * TILE * 4);
      for (let ty = 0; ty < validH; ty++) {
        const src = ((startY + ty) * docW + startX) * 4;
        tile.set(rgba.subarray(src, src + validW * 4), ty * TILE * 4);
      }
      tiles.push({ col: c, row: r, data: tile.buffer });
    }
  }

  return { id: req.id, ok: true, tiles, tilesDrawn, emptyTiles, workerMs: performance.now() - t0 };
}

scope.onmessage = async (e: MessageEvent<CelDecodeRequest | { type: 'ping'; id: number }>) => {
  const msg = e.data;
  const wasmOk = await ensureReady();
  if ('type' in msg && msg.type === 'ping') {
    scope.postMessage({ id: msg.id, ready: wasmOk });
    return;
  }
  const req = msg as CelDecodeRequest;
  if (!wasmOk) {
    scope.postMessage({ id: req.id, ok: false, tiles: [], tilesDrawn: 0, emptyTiles: 0, workerMs: 0 });
    return;
  }
  try {
    const res = decode(req);
    scope.postMessage(res, res.tiles.map((t) => t.data));
  } catch {
    scope.postMessage({ id: req.id, ok: false, tiles: [], tilesDrawn: 0, emptyTiles: 0, workerMs: 0 });
  }
};
