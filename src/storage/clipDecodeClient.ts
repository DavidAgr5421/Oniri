/**
 * Cliente del Web Worker de decodificación de cels .clip.
 * Envía cada chunk de cel al worker (copia pequeña, ~0.4 MB) y aplica en el hilo principal
 * solo las teselas con contenido sobre el SparseTileGrid de Rust (coste en ms, no en cientos de ms).
 */
import type { LayerNode } from '../brush/layers';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';
import type { CelDescriptor } from './clipImporter';
import type { CelDecodeRequest, CelDecodeResponse } from './clipDecodeWorker';
import { clipDiagnostics } from './clipDiagnostics';

type Pending = {
  resolve: (res: CelDecodeResponse | null) => void;
};

class ClipDecodeClient {
  private worker: Worker | null = null;
  private failed = false;
  private nextId = 1;
  private pending = new Map<number, Pending>();

  /** true si el worker puede usarse (Worker soportado y sin errores fatales). */
  get available(): boolean {
    return !this.failed && typeof Worker !== 'undefined';
  }

  private ensureWorker(): Worker | null {
    if (this.failed || typeof Worker === 'undefined') return null;
    if (this.worker) return this.worker;
    try {
      const w = new Worker(new URL('./clipDecodeWorker.ts', import.meta.url), { type: 'module' });
      w.onmessage = (e: MessageEvent<CelDecodeResponse>) => {
        const p = this.pending.get(e.data.id);
        if (p) {
          this.pending.delete(e.data.id);
          p.resolve(e.data);
        }
      };
      w.onerror = () => this.fail();
      this.worker = w;
      return w;
    } catch {
      this.fail();
      return null;
    }
  }

  private fail(): void {
    this.failed = true;
    this.worker?.terminate();
    this.worker = null;
    for (const p of this.pending.values()) p.resolve(null);
    this.pending.clear();
  }

  /**
   * Decodifica un cel en el worker y lo vuelca en layer.tileGrid.
   * Retorna true si se aplicó; false si el llamador debe usar la ruta síncrona de respaldo.
   */
  async decodeCel(layer: LayerNode, desc: CelDescriptor, clipBuffer: Uint8Array): Promise<boolean> {
    const worker = this.ensureWorker();
    if (!worker || !rustStrokeEngine.available) return false;
    if (desc.offset + desc.length > clipBuffer.length) return false;

    // Copia compacta del chunk (transferible); evita clonar el archivo completo
    const chunk = clipBuffer.slice(desc.offset, desc.offset + desc.length).buffer as ArrayBuffer;
    const id = this.nextId++;
    const req: CelDecodeRequest = {
      id,
      docW: desc.docW,
      docH: desc.docH,
      originX: desc.originX ?? 0,
      originY: desc.originY ?? 0,
      isMonochrome: desc.colorType === 0 || desc.colorType === 1 || desc.colorType === undefined,
      sizes: desc.sizes,
      chunk,
    };

    const res = await new Promise<CelDecodeResponse | null>((resolve) => {
      this.pending.set(id, { resolve });
      worker.postMessage(req, [chunk]);
    });
    if (!res || !res.ok) return false;

    const t0 = performance.now();
    if (res.tiles.length > 0) {
      if (!layer.tileGrid) {
        layer.tileGrid = rustStrokeEngine.createSparseTileGrid(desc.docW, desc.docH) || undefined;
      }
      const grid = layer.tileGrid;
      if (!grid) return false;
      for (const t of res.tiles) {
        grid.set_tile_data(t.col, t.row, new Uint8Array(t.data));
      }
      // Si el cel ya tiene canvas materializado (p. ej. cel activo), reflejar los píxeles
      if (layer.canvas) {
        const ctx = layer.context || layer.canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          const img = ctx.createImageData(desc.docW, desc.docH);
          grid.render_to_full_buffer(new Uint8Array(img.data.buffer, img.data.byteOffset, img.data.byteLength));
          ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
          ctx.putImageData(img, 0, 0);
        }
      }
    }
    (layer as unknown as { _hasDecodedPixels?: boolean })._hasDecodedPixels = true;
    clipDiagnostics.recordCelDecode(true, res.tilesDrawn, res.emptyTiles, performance.now() - t0);
    clipDiagnostics.recordWorkerDecode(res.workerMs);
    return true;
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
    this.pending.clear();
  }
}

export const clipDecodeClient = new ClipDecodeClient();
