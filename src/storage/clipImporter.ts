import initSqlJs, { type Database } from 'sql.js';
import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import type { LayerNode } from '../brush/layers';
import { DOC_H, DOC_W } from '../brush/docConstants';

export interface ClipMetadata {
  width: number;
  height: number;
  resolution: number;
  layers: {
    name: string;
    opacity: number;
    type: number;
    visibility: boolean;
    blendMode: string;
  }[];
  previewPngBytes?: Uint8Array;
}

export interface ClipImportResult {
  title: string;
  width: number;
  height: number;
  layersCount: number;
  previewUrl?: string;
}

let sqlInstancePromise: Promise<any> | null = null;

function getSqlJs(): Promise<any> {
  if (!sqlInstancePromise) {
    sqlInstancePromise = initSqlJs({
      locateFile: (file) => `/${file}`,
    }).catch(() => {
      // Fallback to CDN if local wasm cannot be reached
      return initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.15.1/${file}`,
      });
    });
  }
  return sqlInstancePromise;
}

/**
 * Checks if a binary buffer is a Clip Studio Paint .clip file.
 */
export function isClipBuffer(buffer: Uint8Array): boolean {
  if (buffer.length < 16) return false;
  // CSFCHUNK magic
  const magic = [0x43, 0x53, 0x46, 0x43, 0x48, 0x55, 0x4e, 0x4b];
  let isCsf = true;
  for (let i = 0; i < 8; i++) {
    if (buffer[i] !== magic[i]) {
      isCsf = false;
      break;
    }
  }
  if (isCsf) return true;

  // Secondary check: contains "SQLite format 3\0"
  return findByteSequence(buffer, new TextEncoder().encode('SQLite format 3\0')) !== -1;
}

/**
 * Helper to find byte sequence in a Uint8Array.
 */
function findByteSequence(buffer: Uint8Array, pattern: Uint8Array, startOffset = 0): number {
  const end = buffer.length - pattern.length;
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
 * Extracts the SQLite database chunk from a Clip Studio Paint .clip container.
 */
export function extractSqliteFromClipBuffer(clipBuffer: Uint8Array): Uint8Array {
  const sqliteMagic = new TextEncoder().encode('SQLite format 3\0');
  const foundOffset = findByteSequence(clipBuffer, sqliteMagic);

  if (foundOffset === -1) {
    throw new Error('El archivo no es un documento .clip válido (no contiene CHNKSQLi).');
  }

  // Look for CHNKSQLi tag before the SQLite database
  const chnkTag = new TextEncoder().encode('CHNKSQLi');
  let chnkOffset = -1;
  const searchStart = Math.max(0, foundOffset - 64);
  chnkOffset = findByteSequence(clipBuffer, chnkTag, searchStart);

  if (chnkOffset !== -1 && chnkOffset + 16 <= foundOffset) {
    const view = new DataView(clipBuffer.buffer, clipBuffer.byteOffset, clipBuffer.byteLength);
    const dbLength = Number(view.getBigUint64(chnkOffset + 8, false));
    if (dbLength > 0 && foundOffset + dbLength <= clipBuffer.length + 1024) {
      return clipBuffer.subarray(foundOffset, Math.min(clipBuffer.length, foundOffset + dbLength));
    }
  }

  // Fallback: return from SQLite header to end of file
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

    // Try reading CanvasPreview table
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
 * Parses layers and metadata from the SQLite database of a .clip file.
 */
export async function parseClipMetadata(clipBuffer: Uint8Array): Promise<ClipMetadata> {
  const meta: ClipMetadata = {
    width: DOC_W,
    height: DOC_H,
    resolution: 300,
    layers: [],
  };

  try {
    const sqliteBuffer = extractSqliteFromClipBuffer(clipBuffer);
    const SQL = await getSqlJs();
    const db: Database = new SQL.Database(sqliteBuffer);

    // Read Canvas dimensions
    try {
      const cRes = db.exec('SELECT CanvasWidth, CanvasHeight, CanvasResolution FROM Canvas LIMIT 1');
      if (cRes.length > 0 && cRes[0].values.length > 0) {
        const [w, h, res] = cRes[0].values[0];
        if (typeof w === 'number' && w > 0) meta.width = Math.round(w);
        if (typeof h === 'number' && h > 0) meta.height = Math.round(h);
        if (typeof res === 'number' && res > 0) meta.resolution = Math.round(res);
      }
    } catch {
      // ignore
    }

    // Read Layer table
    try {
      const lRes = db.exec(
        'SELECT LayerName, LayerType, LayerOpacity, LayerVisibility, LayerBlendMode FROM Layer ORDER BY LayerId ASC'
      );
      if (lRes.length > 0) {
        for (const row of lRes[0].values) {
          const name = String(row[0] || 'Capa');
          const type = Number(row[1] ?? 1);
          const opacity = typeof row[2] === 'number' ? Math.max(0, Math.min(1, row[2] / 256)) : 1;
          const visibility = row[3] !== 0;
          const blendMode = String(row[4] || 'source-over');
          meta.layers.push({
            name,
            type,
            opacity,
            visibility,
            blendMode: mapClipBlendMode(blendMode),
          });
        }
      }
    } catch {
      // ignore
    }

    // Read CanvasPreview PNG
    try {
      const pRes = db.exec('SELECT ImageData FROM CanvasPreview LIMIT 1');
      if (pRes.length > 0 && pRes[0].values.length > 0 && pRes[0].values[0][0] instanceof Uint8Array) {
        meta.previewPngBytes = pRes[0].values[0][0] as Uint8Array;
      }
    } catch {
      // ignore
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
 * Maps Clip Studio Paint blend mode strings/integers to HTML5 canvas GlobalCompositeOperation.
 */
function mapClipBlendMode(mode: string): GlobalCompositeOperation {
  const m = mode.toLowerCase();
  if (m.includes('multiply')) return 'multiply';
  if (m.includes('screen')) return 'screen';
  if (m.includes('overlay')) return 'overlay';
  if (m.includes('darken')) return 'darken';
  if (m.includes('lighten')) return 'lighten';
  if (m.includes('color_dodge') || m.includes('dodge')) return 'color-dodge';
  if (m.includes('color_burn') || m.includes('burn')) return 'color-burn';
  if (m.includes('hard_light')) return 'hard-light';
  if (m.includes('soft_light')) return 'soft-light';
  if (m.includes('difference')) return 'difference';
  return 'source-over';
}

/**
 * Imports a Clip Studio Paint .clip file into Oniri's engine and layer manager.
 */
export async function importClipProject(
  clipBuffer: Uint8Array,
  engine: BrushEngine,
  _timeline: TimelineManager,
  title = 'Ilustración Clip Studio Paint'
): Promise<ClipImportResult> {
  if (!isClipBuffer(clipBuffer)) {
    throw new Error('El archivo seleccionado no es un archivo .clip válido de Clip Studio Paint.');
  }

  const meta = await parseClipMetadata(clipBuffer);
  const layers: LayerNode[] = [];

  // 1. Paper Layer
  const paperCanvas = document.createElement('canvas');
  paperCanvas.width = DOC_W;
  paperCanvas.height = DOC_H;
  const paperCtx = paperCanvas.getContext('2d')!;
  paperCtx.fillStyle = '#ffffff';
  paperCtx.fillRect(0, 0, DOC_W, DOC_H);

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

  // 2. High-res Composite artwork layer
  let previewUrl: string | undefined = undefined;
  if (meta.previewPngBytes) {
    const artCanvas = document.createElement('canvas');
    artCanvas.width = DOC_W;
    artCanvas.height = DOC_H;
    const artCtx = artCanvas.getContext('2d')!;

    const blob = new Blob([meta.previewPngBytes as any], { type: 'image/png' });
    previewUrl = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Error cargando la vista previa del archivo .clip'));
      img.src = previewUrl!;
    });

    // Draw preview scaled to fit Oniri document canvas
    const scale = Math.min(DOC_W / img.width, DOC_H / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = (DOC_W - dw) / 2;
    const dy = (DOC_H - dh) / 2;

    artCtx.drawImage(img, dx, dy, dw, dh);

    layers.push({
      id: `layer-clip-composite`,
      type: 'raster',
      name: 'Arte Compuesto (Clip Studio)',
      canvas: artCanvas,
      context: artCtx,
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
      isPaper: false,
      parentId: null,
      collapsed: false,
      clipped: false,
      locked: false,
      lockAlpha: false,
    });
  }

  // 3. Reconstruct Layer Structure from Clip Studio Paint
  if (meta.layers.length > 0) {
    let layerIdx = 1;
    for (const cl of meta.layers) {
      if (cl.name.toLowerCase() === 'paper' || cl.name === 'Papel') continue;
      const isFolder = cl.type === 0;

      let canvas: HTMLCanvasElement | undefined = undefined;
      let context: CanvasRenderingContext2D | undefined = undefined;

      if (!isFolder) {
        canvas = document.createElement('canvas');
        canvas.width = DOC_W;
        canvas.height = DOC_H;
        context = canvas.getContext('2d')!;
      }

      layers.push({
        id: `layer-clip-${layerIdx++}`,
        type: isFolder ? 'folder' : 'raster',
        name: cl.name,
        canvas,
        context,
        visible: cl.visibility,
        opacity: cl.opacity,
        blendMode: cl.blendMode as GlobalCompositeOperation,
        isPaper: false,
        parentId: null,
        collapsed: false,
        clipped: false,
        locked: false,
        lockAlpha: false,
      });
    }
  }

  // If no layers were in the table, create an active working drawing layer
  if (layers.filter((l) => !l.isPaper && l.type === 'raster').length === 0) {
    const drawCanvas = document.createElement('canvas');
    drawCanvas.width = DOC_W;
    drawCanvas.height = DOC_H;
    layers.push({
      id: 'layer-1',
      type: 'raster',
      name: 'Capa 1',
      canvas: drawCanvas,
      context: drawCanvas.getContext('2d')!,
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
      isPaper: false,
      parentId: null,
      collapsed: false,
      clipped: false,
      locked: false,
      lockAlpha: false,
    });
  }

  // Load layers into engine
  engine.layerManager.loadLayers(layers);
  engine.compositeDirty = true;
  engine.updateComposite();

  return {
    title,
    width: meta.width,
    height: meta.height,
    layersCount: layers.length,
    previewUrl,
  };
}
