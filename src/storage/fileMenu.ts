import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import { importOniriPackage } from './oniriPackage';
import { importClipProject, isClipBuffer } from './clipImporter';
import { openPressureCalibrationModal } from '../tools/pressureCalibrationModal';
import { buildTopMenuCategories } from '../ui/defaultMenuConfig';
import { TopMenuBar } from '../ui/topMenuBar';
import { commandDispatcher } from '../ui/commandDispatcher';

export interface FileMenuOptions {
  engine: BrushEngine;
  timeline: TimelineManager;
  onUndo?: () => void;
  onRedo?: () => void;
  onToggleNavigator?: () => void;
  isNavigatorVisible?: () => boolean;
  onFlipView?: () => void;
}

let activeProjectName = 'Sin título.oniri';

/**
 * Creates and mounts the CSP-style 2-tier Top Command Bar & Menu System.
 */
export function mountFileMenu(container: HTMLElement, options: FileMenuOptions): void {
  const { engine, timeline, onToggleNavigator, isNavigatorVisible } = options;

  container.innerHTML = '';

  // Hidden File Input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.oniri,.clip,.png,.jpg,.jpeg';
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    await processIncomingFile(file, engine, timeline);
    fileInput.value = '';
  });
  document.body.appendChild(fileInput);

  // =========================================================================
  // LEVEL 1: Main Menu Bar (Archivo, Edición, Animación, Capa, Selección, Ver, Filtro, Ventana, Ayuda)
  // =========================================================================
  const topMenuRow = document.createElement('div');
  topMenuRow.className = 'csp-top-menubar-row';

  const brandBrand = document.createElement('div');
  brandBrand.className = 'csp-cmd-brand';
  brandBrand.innerHTML = `<span class="csp-app-logo">ONIRI</span>`;
  topMenuRow.appendChild(brandBrand);

  // Build Menus and register commands
  const menuCategories = buildTopMenuCategories({
    engine,
    timeline,
    onOpenFileInput: () => fileInput.click(),
    onNewCanvas: () => {
      if (confirm('¿Deseas iniciar un nuevo lienzo en blanco? Se reiniciarán las capas actuales.')) {
        resetToDefaultCanvas(engine, timeline);
        setProjectTitle('Sin título.oniri');
      }
    },
    onToggleNavigator: () => onToggleNavigator?.(),
    isNavigatorVisible: () => isNavigatorVisible ? isNavigatorVisible() : false,
    onShowFormatInfo: () => showFormatInfoModal(),
    onShowShortcuts: () => showShortcutsModal(),
    onShowAbout: () => showAboutModal(),
  });

  const menuBar = new TopMenuBar(menuCategories);
  topMenuRow.appendChild(menuBar.element);

  const titleSpacer = document.createElement('div');
  titleSpacer.className = 'csp-top-spacer';
  topMenuRow.appendChild(titleSpacer);

  const projectTitleBadge = document.createElement('div');
  projectTitleBadge.className = 'csp-project-title-badge';
  projectTitleBadge.id = 'csp-active-project-title';
  projectTitleBadge.textContent = activeProjectName;
  topMenuRow.appendChild(projectTitleBadge);

  container.appendChild(topMenuRow);

  // =========================================================================
  // LEVEL 2: Canvas Command Bar / Quick Access Strip (CSP workspacetoolbaritem)
  // Docked directly above the canvas, bounded between left and right docks
  // =========================================================================
  const commandBarRow = document.createElement('div');
  commandBarRow.className = 'csp-top-commandbar-row';

  const actionsGroup = document.createElement('div');
  actionsGroup.className = 'csp-cmd-actions';

  // 1. History Group (Deshacer / Rehacer)
  const undoBtn = createCmdBtn('undo', 'Deshacer (Ctrl+Z)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `, () => commandDispatcher.execute('edit.undo'), false, true);

  const redoBtn = createCmdBtn('redo', 'Rehacer (Ctrl+Y)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `, () => commandDispatcher.execute('edit.redo'), false, true);

  // 2. Edit & Selection Operations (CSP workspacetoolbaritem items 10-13)
  const clearBtn = createCmdBtn('clear', 'Borrar contenido (Delete)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `, () => commandDispatcher.execute('edit.clear'), false, true);

  const clearOutBtn = createCmdBtn('clearout', 'Borrar fuera de la selección (Alt+Delete)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="2 2"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
    </svg>
  `, () => commandDispatcher.execute('edit.clearOutside'), false, true);

  const fillBtn = createCmdBtn('fill', 'Rellenar selección con color activo (Shift+Delete)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l7 7-8.5 8.5a2 2 0 0 1-3 0L3 12.5a2 2 0 0 1 0-3L12 2z"/>
      <path d="M7 11l4 4"/>
    </svg>
  `, () => commandDispatcher.execute('edit.fill'), false, true);

  const transformBtn = createCmdBtn('transform', 'Escalar / Rotar (Ctrl+T)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 9 4 4 9 4"/>
      <polyline points="15 4 20 4 20 9"/>
      <polyline points="20 15 20 20 15 20"/>
      <polyline points="9 20 4 20 4 15"/>
      <line x1="4" y1="4" x2="9" y2="9"/>
      <line x1="20" y1="4" x2="15" y2="9"/>
      <line x1="20" y1="20" x2="15" y2="15"/>
      <line x1="4" y1="20" x2="9" y2="15"/>
    </svg>
  `, () => commandDispatcher.execute('edit.transform'), false, true);

  // 3. Selection Group (CSP workspacetoolbaritem items 14-16)
  const deselectBtn = createCmdBtn('deselect', 'Deseleccionar (Ctrl+D)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 2"/>
      <line x1="8" y1="8" x2="16" y2="16"/>
      <line x1="16" y1="8" x2="8" y2="16"/>
    </svg>
  `, () => commandDispatcher.execute('select.deselect'), false, true);

  const invertBtn = createCmdBtn('invert', 'Invertir selección (Ctrl+Shift+I)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="12" height="12"/>
      <path d="M9 21h10a2 2 0 0 0 2-2V9"/>
    </svg>
  `, () => commandDispatcher.execute('select.invert'), false, true);

  // 4. View Controls
  const flipBtn = createCmdBtn('flipview', 'Voltear vista horizontalmente (Comprobar simetría)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/>
      <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
      <line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2"/>
    </svg>
  `, () => commandDispatcher.execute('view.flipHorizontal'), false, true);

  const resetRotBtn = createCmdBtn('resetrot', 'Restablecer rotación (0°)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  `, () => commandDispatcher.execute('view.resetRotation'), false, true);

  const fitBtn = createCmdBtn('fitview', 'Ajustar lienzo a la ventana (Ctrl+0)', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <polyline points="9 3 9 9 3 9"/>
      <polyline points="15 3 15 9 21 9"/>
      <polyline points="9 21 9 15 3 15"/>
      <polyline points="15 21 15 15 21 15"/>
    </svg>
  `, () => commandDispatcher.execute('view.fit'), false, true);

  const navBtn = createCmdBtn('navigator', 'Abrir / Ocultar paleta Navegador', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  `, () => commandDispatcher.execute('view.navigator'), false, true);

  // 5. Tools & Info
  const calibBtn = createCmdBtn('calib', 'Calibración dinámica de presión y lápiz', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  `, () => openPressureCalibrationModal(), false, true);

  const infoBtn = createCmdBtn('info', 'Compatibilidad de formatos y arquitectura', `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  `, () => showFormatInfoModal(), false, true);

  const makeSep = () => {
    const s = document.createElement('div');
    s.className = 'csp-cmd-sep';
    return s;
  };

  actionsGroup.append(
    undoBtn, redoBtn,
    makeSep(),
    clearBtn, clearOutBtn, fillBtn, transformBtn,
    makeSep(),
    deselectBtn, invertBtn,
    makeSep(),
    flipBtn, resetRotBtn, fitBtn, navBtn,
    makeSep(),
    calibBtn, infoBtn
  );

  commandBarRow.appendChild(actionsGroup);
  container.appendChild(commandBarRow);

  // Setup Drag & Drop for .oniri and .clip files
  setupDragAndDrop(engine, timeline);
}

function createCmdBtn(
  _id: string,
  title: string,
  html: string,
  onClick: () => void,
  highlight = false,
  iconOnly = false
): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = `csp-cmd-btn ${highlight ? 'highlight' : ''} ${iconOnly ? 'icon-only' : ''}`;
  btn.title = title;
  btn.innerHTML = html;
  btn.addEventListener('click', () => onClick());
  return btn;
}

/**
 * Updates active document name in UI.
 */
function setProjectTitle(name: string): void {
  activeProjectName = name;
  const label = document.getElementById('csp-active-project-title');
  if (label) {
    label.textContent = name;
  }
}

/**
 * Processes an incoming File (.oniri, .clip, or image).
 */
async function processIncomingFile(file: File, engine: BrushEngine, timeline: TimelineManager): Promise<void> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const buffer = new Uint8Array(await file.arrayBuffer());

  try {
    if (ext === 'oniri' || (!ext && buffer[0] === 0x50 && buffer[1] === 0x4b)) {
      const res = await importOniriPackage(buffer, engine, timeline);
      setProjectTitle(file.name);
      showNotification('Proyecto Oniri cargado', `Cargado "${res.title}" con ${res.layersCount} capas.`);
    } else if (ext === 'clip' || isClipBuffer(buffer)) {
      const res = await importClipProject(buffer, engine, timeline, file.name);
      setProjectTitle(file.name.replace(/\.clip$/i, '.oniri'));
      showNotification(
        'Archivo .clip de Clip Studio importado',
        `Lienzo ${res.width}×${res.height} px, ${res.layersCount} capas reconstruidas exitosamente.`
      );
    } else if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
      const activeLayer = engine.layerManager.getActiveDrawableLayer();
      if (activeLayer.context && activeLayer.canvas) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          activeLayer.context!.drawImage(img, 0, 0, activeLayer.canvas!.width, activeLayer.canvas!.height);
          engine.compositeDirty = true;
          engine.updateComposite();
          URL.revokeObjectURL(url);
          showNotification('Imagen importada', `Dibujada sobre "${activeLayer.name}".`);
        };
        img.src = url;
      }
    } else {
      alert(`Formato de archivo no reconocido: .${ext}`);
    }
  } catch (err: any) {
    console.error('Error importing file:', err);
    alert(`Error al abrir archivo: ${err?.message || err}`);
  }
}

/**
 * Sets up global drag-and-drop listener for the application.
 */
function setupDragAndDrop(engine: BrushEngine, timeline: TimelineManager): void {
  const overlay = document.createElement('div');
  overlay.className = 'csp-drop-overlay';
  overlay.innerHTML = `
    <div class="csp-drop-card">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <h3>Soltar archivo en Oniri</h3>
      <p>Compatible con proyectos nativos <strong>.oniri</strong> y archivos de Clip Studio Paint <strong>.clip</strong></p>
    </div>
  `;
  document.body.appendChild(overlay);

  let dragCounter = 0;

  window.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    overlay.classList.add('visible');
  });

  window.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      overlay.classList.remove('visible');
    }
  });

  window.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  window.addEventListener('drop', async (e) => {
    e.preventDefault();
    dragCounter = 0;
    overlay.classList.remove('visible');

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      await processIncomingFile(file, engine, timeline);
    }
  });
}

/**
 * Resets canvas to default initial state.
 */
function resetToDefaultCanvas(engine: BrushEngine, timeline: TimelineManager): void {
  const paper = document.createElement('canvas');
  paper.width = 1920;
  paper.height = 1080;
  const pctx = paper.getContext('2d')!;
  pctx.fillStyle = '#ffffff';
  pctx.fillRect(0, 0, 1920, 1080);

  const draw = document.createElement('canvas');
  draw.width = 1920;
  draw.height = 1080;

  engine.layerManager.loadLayers([
    {
      id: 'layer-paper',
      type: 'raster',
      name: 'Papel',
      canvas: paper,
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
      canvas: draw,
      context: draw.getContext('2d')!,
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
      isPaper: false,
      parentId: null,
      collapsed: false,
      clipped: false,
      locked: false,
      lockAlpha: false,
    },
  ]);

  if (timeline.tracks.length === 0) {
    timeline.createTrack('Animation 1');
  }

  engine.compositeDirty = true;
  engine.updateComposite();
}

/**
 * Displays floating notification banner.
 */
function showNotification(title: string, message: string): void {
  let toast = document.querySelector('.csp-notification-toast') as HTMLElement;
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'csp-notification-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <strong>${title}</strong>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}

/**
 * Displays modal with system architecture information.
 */
function showFormatInfoModal(): void {
  const modal = document.createElement('div');
  modal.className = 'csp-modal-backdrop';
  modal.innerHTML = `
    <div class="csp-detail-window" style="width: 580px; max-width: 90vw;">
      <div class="csp-detail-header">
        <span class="detail-title">Formatos Oniri (.oniri) y Clip Studio Paint (.clip)</span>
        <button class="csp-detail-close-btn" id="close-info-btn">✕</button>
      </div>
      <div style="padding: 16px 20px; font-size: 13px; line-height: 1.6; color: #d0d0d0; max-height: 70vh; overflow-y: auto;">
        <h4 style="color: #60a5fa; margin: 0 0 8px;">1. Formato Nativo de Oniri (.oniri)</h4>
        <p>Contenedor de paquete ZIP de alta velocidad con fflate. Almacena capas individuales PNG, cels de animación, armaduras de huesos 2D y metadatos JSON completos.</p>
        
        <h4 style="color: #4ade80; margin: 16px 0 8px;">2. Compatibilidad Clip Studio Paint (.clip)</h4>
        <p>Decodificador del formato binario CSFCHUNK de Celsys. Extrae la base de datos relacional SQLite 3 (CHNKSQLi), la miniatura aplanada CanvasPreview y reconstruye la jerarquía de capas de CSP.</p>
        
        <div style="margin-top: 18px; text-align: right;">
          <button class="csp-calib-preset-btn active" id="modal-ok-btn" style="padding: 6px 18px;">Entendido</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => document.body.removeChild(modal);
  modal.querySelector('#close-info-btn')?.addEventListener('click', close);
  modal.querySelector('#modal-ok-btn')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

/**
 * Displays modal with primary keyboard shortcuts.
 */
function showShortcutsModal(): void {
  const modal = document.createElement('div');
  modal.className = 'csp-modal-backdrop';
  modal.innerHTML = `
    <div class="csp-detail-window" style="width: 540px; max-width: 90vw;">
      <div class="csp-detail-header">
        <span class="detail-title">Atajos de Teclado (Estándar Clip Studio Paint)</span>
        <button class="csp-detail-close-btn" id="close-sc-btn">✕</button>
      </div>
      <div style="padding: 16px 20px; font-size: 12px; line-height: 1.7; color: #d0d0d0; max-height: 70vh; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #333; color: #60a5fa;"><th style="text-align: left; padding: 4px;">Acción</th><th style="text-align: right; padding: 4px;">Atajo</th></tr>
          <tr><td>Nuevo / Abrir / Guardar</td><td style="text-align: right; color: #38bdf8;">Ctrl+N / Ctrl+O / Ctrl+S</td></tr>
          <tr><td>Deshacer / Rehacer</td><td style="text-align: right; color: #38bdf8;">Ctrl+Z / Ctrl+Y</td></tr>
          <tr><td>Escalar / Rotar (Transformar)</td><td style="text-align: right; color: #38bdf8;">Ctrl+T</td></tr>
          <tr><td>Confirmar / Cancelar Transformación</td><td style="text-align: right; color: #38bdf8;">Enter / Esc</td></tr>
          <tr><td>Mover vista (Lienzo)</td><td style="text-align: right; color: #38bdf8;">Espacio + Arrastrar / H</td></tr>
          <tr><td>Rotar lienzo libre</td><td style="text-align: right; color: #38bdf8;">R / Espacio+Shift / Rueda</td></tr>
          <tr><td>Restablecer rotación (0°)</td><td style="text-align: right; color: #38bdf8;">Doble clic R / Ctrl+Alt+R</td></tr>
          <tr><td>Ajustar a ventana / Zoom 100%</td><td style="text-align: right; color: #38bdf8;">Ctrl+0 / Ctrl+Alt+0</td></tr>
          <tr><td>Seleccionar todo / Deseleccionar</td><td style="text-align: right; color: #38bdf8;">Ctrl+A / Ctrl+D</td></tr>
          <tr><td>Invertir selección</td><td style="text-align: right; color: #38bdf8;">Ctrl+Shift+I</td></tr>
          <tr><td>Duplicar capa / Combinar inferior</td><td style="text-align: right; color: #38bdf8;">Ctrl+J / Ctrl+E</td></tr>
          <tr><td>Alternar color principal / secundario</td><td style="text-align: right; color: #38bdf8;">X</td></tr>
          <tr><td>Color transparente (Pincel borrador)</td><td style="text-align: right; color: #38bdf8;">C</td></tr>
          <tr><td>Pluma / Pincel / Borrador / Relleno</td><td style="text-align: right; color: #38bdf8;">P / B / E / G</td></tr>
        </table>
        <div style="margin-top: 18px; text-align: right;">
          <button class="csp-calib-preset-btn active" id="sc-ok-btn" style="padding: 6px 18px;">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => document.body.removeChild(modal);
  modal.querySelector('#close-sc-btn')?.addEventListener('click', close);
  modal.querySelector('#sc-ok-btn')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

/**
 * Displays About Oniri modal.
 */
function showAboutModal(): void {
  const modal = document.createElement('div');
  modal.className = 'csp-modal-backdrop';
  modal.innerHTML = `
    <div class="csp-detail-window" style="width: 480px; max-width: 90vw; text-align: center;">
      <div class="csp-detail-header">
        <span class="detail-title">Acerca de Oniri</span>
        <button class="csp-detail-close-btn" id="close-about-btn">✕</button>
      </div>
      <div style="padding: 24px 20px; font-size: 13px; line-height: 1.6; color: #d0d0d0;">
        <h2 style="margin: 0 0 4px 0; background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 26px;">ONIRI STUDIO PAINT</h2>
        <div style="color: #94a3b8; font-size: 12px; margin-bottom: 16px;">Versión 0.2.0 Beta · Open Source 2D Animation & Illustration</div>
        <p style="color: #cbd5e1; margin: 0 0 16px;">Diseñado para replicar fielmente el rendimiento, la sensibilidad del lápiz, el sistema de capas y el flujo de trabajo profesional de Clip Studio Paint.</p>
        <div style="font-size: 11px; color: #64748b; border-top: 1px solid #333; padding-top: 12px;">Construido con Tauri v2, Vite, TypeScript, Three.js y WebGL.</div>
        <div style="margin-top: 20px;">
          <button class="csp-calib-preset-btn active" id="about-ok-btn" style="padding: 6px 24px;">Aceptar</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => document.body.removeChild(modal);
  modal.querySelector('#close-about-btn')?.addEventListener('click', close);
  modal.querySelector('#about-ok-btn')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
