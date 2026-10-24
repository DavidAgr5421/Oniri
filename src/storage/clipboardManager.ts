import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import type { LayerNode } from '../brush/layers';
import { selectionModel } from '../selection/selectionModel';
import { transformManager } from '../selection/transformGizmo';
import { cameraFrameManager } from '../canvas/cameraFrameManager';
import { viewportNav } from '../canvas/viewportNavigation';
import { setActiveProjectName, showNotification } from './fileMenu';

export interface ClipboardImageData {
  img: HTMLImageElement;
  width: number;
  height: number;
  blob: Blob;
  name?: string;
}

// Global state for clipboard handling and fallback synchronization
let hiddenClipHelper: HTMLTextAreaElement | null = null;
let lastPasteTimestamp = 0;
let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
let activeEngine: BrushEngine | null = null;
let activeTimeline: TimelineManager | null = null;

/**
 * Creates and maintains a permanent, hidden `<textarea>` that receives keyboard paste focus.
 * In Chromium (Chrome/Edge), an editable element MUST be focused to guarantee dispatch of the
 * native DOM ClipboardEvent ('paste') which provides full access to OS Explorer files (CF_HDROP)
 * and screenshots without browser permission prompts.
 */
export function ensureClipboardHelper(): HTMLTextAreaElement {
  if (!hiddenClipHelper || !document.body.contains(hiddenClipHelper)) {
    hiddenClipHelper = document.createElement('textarea');
    hiddenClipHelper.id = 'oniri-clipboard-helper';
    hiddenClipHelper.tabIndex = -1;
    hiddenClipHelper.readOnly = true;
    hiddenClipHelper.setAttribute('inputmode', 'none');
    hiddenClipHelper.setAttribute('aria-hidden', 'true');
    hiddenClipHelper.setAttribute('autocomplete', 'off');
    hiddenClipHelper.style.cssText = `
      position: fixed;
      left: -9999px;
      top: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -9999;
    `;
    document.body.appendChild(hiddenClipHelper);
  }
  return hiddenClipHelper;
}

/**
 * Blurs the clipboard helper so keyboard shortcuts (Space, P, B, E, V, etc.)
 * and stylus input never get trapped in a focused textarea or summon the OS virtual keyboard.
 */
export function focusClipboardHelper(): void {
  if (hiddenClipHelper && document.activeElement === hiddenClipHelper) {
    hiddenClipHelper.blur();
  }
}

/**
 * Schedules a fallback to the Async Clipboard API if the browser's native DOM paste event
 * does not fire within 80ms of pressing Ctrl+V.
 */
export function schedulePasteFallback(): void {
  if (fallbackTimer) clearTimeout(fallbackTimer);
  const triggerTime = Date.now();

  fallbackTimer = setTimeout(async () => {
    // If the native paste event already handled this after triggerTime, do nothing
    if (lastPasteTimestamp >= triggerTime) {
      return;
    }
    if (activeEngine) {
      const modal = document.getElementById('csp-clipboard-paste-modal');
      if (modal && activeTimeline) {
        const clipData = await getClipboardImage();
        if (clipData) {
          modal.remove();
          await openImageAsDocument(
            clipData.blob,
            clipData.name || 'Sin título [Portapapeles].oniri',
            activeEngine,
            activeTimeline
          );
        }
      } else {
        await pasteClipboardImage(activeEngine);
      }
    }
  }, 80);
}

/**
 * Loads a Blob or File into an HTMLImageElement.
 */
export function loadBlobToImage(blob: Blob): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Loads an image from a URL or Base64 Data URI.
 */
export function loadUrlToImage(srcUrl: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = srcUrl;
  });
}

/**
 * Extracts graphic image data from a DOM ClipboardEvent.
 * Supports:
 *  1. Files copied from Windows Explorer (JPG, PNG, WebP, BMP, GIF, SVG)
 *  2. Raw image items (e.g. Snipping Tool, image editors, web browser "Copy Image")
 *  3. HTML <img> tags (Discord, web pages)
 *  4. Data URIs (data:image/...)
 */
export async function extractImageFromClipboardEvent(
  e: ClipboardEvent
): Promise<ClipboardImageData | null> {
  const cData = e.clipboardData;
  if (!cData) return null;

  // 1. Check e.clipboardData.files (files copied in Windows Explorer)
  const files = Array.from(cData.files || []);
  for (const file of files) {
    if (
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|webp|bmp|gif|svg)$/i.test(file.name)
    ) {
      const img = await loadBlobToImage(file);
      if (img && (img.naturalWidth || img.width) > 0) {
        return {
          img,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          blob: file,
          name: file.name,
        };
      }
    }
  }

  // 2. Check e.clipboardData.items
  const items = Array.from(cData.items || []);
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        const img = await loadBlobToImage(file);
        if (img && (img.naturalWidth || img.width) > 0) {
          return {
            img,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
            blob: file,
            name: file.name || 'Capa pegada',
          };
        }
      }
    }
  }

  // 3. HTML content check (e.g. Discord or browser <img>)
  for (const item of items) {
    if (item.type === 'text/html') {
      try {
        const htmlText = await new Promise<string>((res) => item.getAsString(res));
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        const imgEl = doc.querySelector('img');
        if (imgEl && imgEl.src) {
          const img = await loadUrlToImage(imgEl.src);
          if (img && (img.naturalWidth || img.width) > 0) {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
            if (blob) {
              return { img, width: canvas.width, height: canvas.height, blob };
            }
          }
        }
      } catch (err) {
        console.warn('Error reading clipboard html:', err);
      }
    }
  }

  // 4. Plain text / Data URI
  for (const item of items) {
    if (item.type === 'text/plain') {
      try {
        const text = (await new Promise<string>((res) => item.getAsString(res))).trim();
        if (text.startsWith('data:image/')) {
          const img = await loadUrlToImage(text);
          if (img && (img.naturalWidth || img.width) > 0) {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
            if (blob) {
              return { img, width: canvas.width, height: canvas.height, blob };
            }
          }
        }
      } catch (err) {
        console.warn('Error reading clipboard text:', err);
      }
    }
  }

  return null;
}

/**
 * Reads graphic image data from the system clipboard using the Asynchronous Clipboard API.
 * Used for Menu Clicks (Edit -> Paste, File -> New from Clipboard) or fallback scenarios.
 */
export async function getClipboardImage(): Promise<ClipboardImageData | null> {
  if (!navigator.clipboard) {
    console.warn('Clipboard API is not supported in this environment.');
    return null;
  }

  // Ensure window is focused before requesting clipboard access
  try {
    window.focus();
  } catch {
    // ignore
  }

  // 1. Direct Async Clipboard API read()
  if (typeof navigator.clipboard.read === 'function') {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((t) => t.startsWith('image/'));
        if (imageType) {
          try {
            const blob = await item.getType(imageType);
            const img = await loadBlobToImage(blob);
            if (img && (img.naturalWidth || img.width) > 0) {
              const width = img.naturalWidth || img.width;
              const height = img.naturalHeight || img.height;
              return { img, width, height, blob };
            }
          } catch (e) {
            console.warn(`Error reading type ${imageType}:`, e);
          }
        }

        // HTML check
        if (item.types.includes('text/html')) {
          try {
            const htmlBlob = await item.getType('text/html');
            const htmlText = await htmlBlob.text();
            const doc = new DOMParser().parseFromString(htmlText, 'text/html');
            const imgEl = doc.querySelector('img');
            if (imgEl && imgEl.src) {
              const img = await loadUrlToImage(imgEl.src);
              if (img && (img.naturalWidth || img.width) > 0) {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0);
                const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
                if (blob) {
                  return { img, width: canvas.width, height: canvas.height, blob };
                }
              }
            }
          } catch (e) {
            console.warn('Error extracting image from clipboard HTML:', e);
          }
        }
      }
    } catch (err: any) {
      console.warn('navigator.clipboard.read() warning:', err?.message || err);
    }
  }

  // 2. Data URI fallback via readText()
  if (typeof navigator.clipboard.readText === 'function') {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text.startsWith('data:image/')) {
        const img = await loadUrlToImage(text);
        if (img && (img.naturalWidth || img.width) > 0) {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
          if (blob) {
            return { img, width: canvas.width, height: canvas.height, blob };
          }
        }
      }
    } catch (err: any) {
      console.warn('navigator.clipboard.readText() warning:', err?.message || err);
    }
  }

  return null;
}

/**
 * Opens any image file or blob as a new document matching its exact native resolution.
 */
export async function openImageAsDocument(
  fileOrBlob: Blob | File,
  fileName: string,
  engine: BrushEngine,
  timeline: TimelineManager
): Promise<boolean> {
  const img = await loadBlobToImage(fileOrBlob);
  if (!img) {
    throw new Error('No se pudo decodificar el archivo de imagen. Formato incompatible o dañado.');
  }

  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;

  if (!w || !h || w <= 0 || h <= 0) {
    throw new Error('Dimensiones inválidas en la imagen.');
  }

  // 1. Resize engine and render buffers
  engine.setDocumentSize(w, h);
  engine.clearHistory();

  // 2. Disable camera frame overscan for raw image
  cameraFrameManager.configure({
    enabled: false,
    outputWidth: w,
    outputHeight: h,
  });

  // 3. Create Paper layer (white background) + Capa 1 with the image
  const paperCanvas = document.createElement('canvas');
  paperCanvas.width = w;
  paperCanvas.height = h;
  const pctx = paperCanvas.getContext('2d', { willReadFrequently: true })!;
  pctx.fillStyle = '#ffffff';
  pctx.fillRect(0, 0, w, h);

  const drawCanvas = document.createElement('canvas');
  drawCanvas.width = w;
  drawCanvas.height = h;
  const dctx = drawCanvas.getContext('2d', { willReadFrequently: true })!;
  dctx.drawImage(img, 0, 0, w, h);

  const layers: LayerNode[] = [
    {
      id: 'layer-paper',
      type: 'raster',
      name: 'Papel',
      canvas: paperCanvas,
      context: pctx,
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
      isPaper: true,
      parentId: null,
      collapsed: false,
      clipped: false,
      locked: true,
    },
    {
      id: 'layer-1',
      type: 'raster',
      name: 'Capa 1',
      canvas: drawCanvas,
      context: dctx,
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
      isPaper: false,
      parentId: null,
      collapsed: false,
      clipped: false,
      locked: false,
    },
  ];

  engine.layerManager.loadLayers(layers, 'layer-1');

  if (timeline.tracks.length === 0) {
    timeline.createTrack('Animación 1');
  }

  viewportNav.resetView();
  setActiveProjectName(fileName);
  engine.compositeDirty = true;
  engine.updateComposite();

  showNotification('Imagen abierta', `Lienzo ${w} × ${h} px para "${fileName}".`);
  return true;
}

/**
 * Creates a brand new document whose canvas dimensions match the clipboard image.
 */
export async function createNewFromClipboard(
  engine: BrushEngine,
  timeline: TimelineManager
): Promise<boolean> {
  const clipData = await getClipboardImage();

  if (clipData) {
    return openImageAsDocument(
      clipData.blob,
      clipData.name || 'Sin título [Portapapeles].oniri',
      engine,
      timeline
    );
  }

  // If navigator.clipboard.read() could not access the image directly (e.g. file copied in Windows Explorer
  // where the browser restricts reading without a DOM paste event, or permissions), show interactive modal.
  showClipboardPasteModal(engine, timeline);
  return false;
}

/**
 * Shows an interactive modal allowing the user to paste (Ctrl+V), drag-and-drop, or browse any image
 * directly into a new document.
 */
export function showClipboardPasteModal(engine: BrushEngine, timeline: TimelineManager): void {
  const existing = document.getElementById('csp-clipboard-paste-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'csp-clipboard-paste-modal';
  modal.className = 'csp-modal-backdrop';
  modal.innerHTML = `
    <div class="csp-detail-window" style="width: 500px; max-width: 92vw; text-align: center;">
      <div class="csp-detail-header">
        <span class="detail-title">Crear nuevo desde portapapeles</span>
        <button class="csp-detail-close-btn" id="close-clip-modal">✕</button>
      </div>
      <!-- Hidden auto-focused input to capture native Ctrl+V keystrokes instantaneously -->
      <input type="text" id="modal-paste-catcher" style="position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px;" autofocus />
      <div style="padding: 24px 20px;">
        <div id="clip-paste-dropzone" style="border: 2px dashed #38bdf8; border-radius: 12px; padding: 28px 16px; background: rgba(56, 189, 248, 0.05); cursor: pointer; transition: all 0.2s ease;">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8" style="margin-bottom: 10px;">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <h3 style="margin: 0 0 8px; color: #f8fafc; font-size: 15px;">Presiona Ctrl+V aquí</h3>
          <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
            Pega cualquier imagen o archivo <strong>JPG / PNG / WebP</strong> copiado en el portapapeles.<br>
            También puedes <strong>arrastrar y soltar</strong> el archivo aquí.
          </p>
        </div>
        <div style="margin-top: 16px; display: flex; justify-content: center; gap: 10px;">
          <button id="modal-browse-file-btn" class="csp-detail-btn" style="padding: 8px 18px; font-size: 12px; background: #1e293b; color: #38bdf8; border: 1px solid #38bdf8; border-radius: 6px; cursor: pointer; font-weight: 500;">
            📁 Seleccionar archivo de imagen...
          </button>
        </div>
        <input type="file" id="modal-file-picker" accept=".png,.jpg,.jpeg,.webp,.bmp,.gif,.svg" style="display: none;" />
        <div style="margin-top: 14px; font-size: 11px; color: #64748b;">
          Compatible con capturas de pantalla, imágenes web y archivos de Windows Explorer.
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => {
    modal.remove();
    focusClipboardHelper();
  };

  modal.querySelector('#close-clip-modal')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  const catcher = modal.querySelector('#modal-paste-catcher') as HTMLInputElement;
  if (catcher) {
    setTimeout(() => catcher.focus(), 20);
  }

  const filePicker = modal.querySelector('#modal-file-picker') as HTMLInputElement;
  const browseBtn = modal.querySelector('#modal-browse-file-btn') as HTMLElement;
  browseBtn?.addEventListener('click', () => filePicker?.click());

  const handleFile = async (file: Blob | File, name?: string) => {
    try {
      await openImageAsDocument(
        file,
        name || (file as File).name || 'Sin título [Portapapeles].oniri',
        engine,
        timeline
      );
      close();
    } catch (err: any) {
      alert(`Error al abrir imagen: ${err?.message || err}`);
    }
  };

  filePicker?.addEventListener('change', async () => {
    const f = filePicker.files?.[0];
    if (f) await handleFile(f, f.name);
  });

  const dropzone = modal.querySelector('#clip-paste-dropzone') as HTMLElement;
  dropzone?.addEventListener('click', () => catcher?.focus());
  dropzone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.background = 'rgba(56, 189, 248, 0.12)';
  });
  dropzone?.addEventListener('dragleave', () => {
    dropzone.style.background = 'rgba(56, 189, 248, 0.05)';
  });
  dropzone?.addEventListener('drop', async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      await handleFile(file, file.name);
    }
  });
}

/**
 * Pastes an image onto a new Raster Layer in the current document,
 * launching the Transform Gizmo immediately so it can be moved, scaled, and rotated
 * without any destructive canvas clipping.
 */
export function pasteImageElement(
  img: CanvasImageSource,
  width: number,
  height: number,
  engine: BrushEngine,
  layerName = 'Capa pegada'
): boolean {
  const ok = transformManager.startTransformWithPastedImage(engine, img, width, height, layerName);
  if (!ok) return false;

  showNotification(
    'Imagen pegada',
    `Arrastra para mover la imagen o tira de las esquinas para escalarla. Pulsa Enter para confirmar.`
  );

  return true;
}

/**
 * Handles pasting clipboard image into the current canvas (Edit -> Paste).
 */
export async function pasteClipboardImage(engine: BrushEngine): Promise<boolean> {
  const clipData = await getClipboardImage();
  if (!clipData) {
    showNotification(
      'Portapapeles sin imagen',
      'No se detectó ninguna imagen en el portapapeles. Copia una imagen o presiona Ctrl+V sobre el lienzo.'
    );
    return false;
  }

  return pasteImageElement(clipData.img, clipData.width, clipData.height, engine, clipData.name);
}

/**
 * Copies the current selection (or active layer) to the system clipboard as PNG.
 */
export async function copyToClipboard(engine: BrushEngine): Promise<boolean> {
  const activeLayer = engine.layerManager.getActiveDrawableLayer();
  if (!activeLayer || !activeLayer.canvas || !activeLayer.context) {
    showNotification('Copiar', 'No hay ninguna capa activa para copiar.');
    return false;
  }

  try {
    let sourceCanvas = activeLayer.canvas;

    if (selectionModel.hasSelection()) {
      const bounds = selectionModel.getBounds();
      if (bounds && bounds.width > 0 && bounds.height > 0) {
        const crop = document.createElement('canvas');
        crop.width = bounds.width;
        crop.height = bounds.height;
        const cctx = crop.getContext('2d')!;

        // Draw cropped portion
        cctx.drawImage(activeLayer.canvas, -bounds.minX, -bounds.minY);

        // Mask out everything outside selection
        cctx.globalCompositeOperation = 'destination-in';
        cctx.drawImage(selectionModel.maskCanvas, -bounds.minX, -bounds.minY);

        sourceCanvas = crop;
      }
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      sourceCanvas.toBlob((b) => resolve(b), 'image/png')
    );

    if (!blob) {
      showNotification('Error al copiar', 'No se pudo generar la imagen para el portapapeles.');
      return false;
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ]);

    showNotification('Copiado al portapapeles', 'La imagen ha sido copiada con éxito.');
    return true;
  } catch (err: any) {
    console.error('Error copying to clipboard:', err);
    showNotification('Error al copiar', `No se pudo escribir en el portapapeles: ${err?.message || err}`);
    return false;
  }
}

/**
 * Cuts the current selection (or active layer) to the system clipboard.
 */
export async function cutToClipboard(engine: BrushEngine): Promise<boolean> {
  const copied = await copyToClipboard(engine);
  if (copied) {
    engine.clearActiveLayer();
    showNotification('Cortado al portapapeles', 'Contenido cortado y borrado del lienzo.');
    return true;
  }
  return false;
}

/**
 * Sets up global DOM paste event listeners and hidden clipboard helper
 * to guarantee 100% reliable pasting across all browsers, including files copied from Windows Explorer.
 */
export function setupGlobalClipboardHandlers(
  engine: BrushEngine,
  timeline: TimelineManager
): void {
  activeEngine = engine;
  activeTimeline = timeline;

  // Ensure the hidden clipboard helper exists in document (only focused transiently during Ctrl+V)
  ensureClipboardHelper();

  // Global DOM paste event listener
  window.addEventListener('paste', async (e: ClipboardEvent) => {
    const target = e.target as HTMLElement;
    const isNormalInput =
      (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) &&
      target.id !== 'oniri-clipboard-helper' &&
      target.id !== 'modal-paste-catcher';

    if (isNormalInput) {
      // Allow default text pasting in layer names, modals, etc.
      return;
    }

    if (hiddenClipHelper && document.activeElement === hiddenClipHelper) {
      hiddenClipHelper.blur();
    }

    const modal = document.getElementById('csp-clipboard-paste-modal');
    const data = await extractImageFromClipboardEvent(e);
    if (!data) return;

    e.preventDefault();
    e.stopPropagation();
    lastPasteTimestamp = Date.now();

    if (modal) {
      modal.remove();
      await openImageAsDocument(
        data.blob,
        data.name || 'Sin título [Portapapeles].oniri',
        engine,
        timeline
      );
    } else {
      pasteImageElement(data.img, data.width, data.height, engine, data.name || 'Capa pegada');
    }
  });
}
