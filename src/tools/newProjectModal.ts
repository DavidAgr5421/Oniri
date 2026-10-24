import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import type { LayerNode } from '../brush/layers';
import { setActiveProjectName } from '../storage/fileMenu';
import { cameraFrameManager } from '../canvas/cameraFrameManager';
import { getClipboardImage } from '../storage/clipboardManager';

let activeNewProjectModal: HTMLElement | null = null;

export function closeNewProjectModal(): void {
  if (activeNewProjectModal) {
    activeNewProjectModal.remove();
    activeNewProjectModal = null;
  }
}

export type ProjectCategory = 'animation' | 'illustration' | 'comic' | 'webtoon';

export interface PresetConfig {
  name: string;
  category: ProjectCategory;
  width: number;
  height: number;
  dpi: number;
  fps?: number;
  frames?: number;
  hasOverscan?: boolean;
}

export const CANVAS_PRESETS: PresetConfig[] = [
  // --- Animación ---
  {
    name: 'Animación Full HD (1920 × 1080) [Lienzo +20%]',
    category: 'animation',
    width: 1920,
    height: 1080,
    dpi: 192,
    fps: 24,
    frames: 72,
    hasOverscan: true,
  },
  {
    name: 'Animación 4K UHD (3840 × 2160) [Lienzo +20%]',
    category: 'animation',
    width: 3840,
    height: 2160,
    dpi: 300,
    fps: 24,
    frames: 72,
    hasOverscan: true,
  },
  {
    name: 'Animación HD (1280 × 720) [Lienzo +20%]',
    category: 'animation',
    width: 1280,
    height: 720,
    dpi: 144,
    fps: 24,
    frames: 48,
    hasOverscan: true,
  },
  {
    name: 'Animación Full HD Estándar (1920 × 1080)',
    category: 'animation',
    width: 1920,
    height: 1080,
    dpi: 192,
    fps: 24,
    frames: 72,
    hasOverscan: false,
  },
  {
    name: 'Animación Vertical / Redes (1080 × 1920)',
    category: 'animation',
    width: 1080,
    height: 1920,
    dpi: 150,
    fps: 30,
    frames: 90,
    hasOverscan: false,
  },

  // --- Ilustración ---
  {
    name: 'Ilustración Full HD (1920 × 1080)',
    category: 'illustration',
    width: 1920,
    height: 1080,
    dpi: 300,
  },
  {
    name: 'Ilustración 4K UHD (3840 × 2160)',
    category: 'illustration',
    width: 3840,
    height: 2160,
    dpi: 300,
  },
  {
    name: 'Ilustración Cuadrada (2048 × 2048)',
    category: 'illustration',
    width: 2048,
    height: 2048,
    dpi: 300,
  },
  {
    name: 'Ilustración A4 Vertical (2480 × 3508)',
    category: 'illustration',
    width: 2480,
    height: 3508,
    dpi: 300,
  },
  {
    name: 'Concept Art Panorámico (3840 × 1600)',
    category: 'illustration',
    width: 3840,
    height: 1600,
    dpi: 300,
  },

  // --- Cómic / Manga ---
  {
    name: 'Manga B5 Impresión (2570 × 3640 @ 350dpi)',
    category: 'comic',
    width: 2570,
    height: 3640,
    dpi: 350,
  },
  {
    name: 'Cómic A4 Profesional (2894 × 4093 @ 350dpi)',
    category: 'comic',
    width: 2894,
    height: 4093,
    dpi: 350,
  },
  {
    name: 'Manga B4 Shōnen Revista (3035 × 4299 @ 600dpi)',
    category: 'comic',
    width: 3035,
    height: 4299,
    dpi: 600,
  },
  {
    name: 'Novela Gráfica US Cómic (1988 × 3056 @ 300dpi)',
    category: 'comic',
    width: 1988,
    height: 3056,
    dpi: 300,
  },

  // --- Webtoon ---
  {
    name: 'Webtoon Estándar (800 × 12800 @ 300dpi)',
    category: 'webtoon',
    width: 800,
    height: 12800,
    dpi: 300,
  },
  {
    name: 'Webtoon Episodio Medio (800 × 6400 @ 300dpi)',
    category: 'webtoon',
    width: 800,
    height: 6400,
    dpi: 300,
  },
  {
    name: 'Webtoon Corto (800 × 4000 @ 300dpi)',
    category: 'webtoon',
    width: 800,
    height: 4000,
    dpi: 300,
  },
  {
    name: 'Webtoon HD (1080 × 16000 @ 300dpi)',
    category: 'webtoon',
    width: 1080,
    height: 16000,
    dpi: 300,
  },
];

/**
 * Opens the "Nuevo Documento / Nuevo Lienzo" modal dialog
 * featuring Animation, Illustration, Comic/Manga, and Webtoon presets,
 * alongside Extended Animation Canvas (20% overscan margin & safe guides).
 */
export function openNewProjectModal(
  engine: BrushEngine,
  timeline: TimelineManager,
  onCreated?: () => void
): void {
  closeNewProjectModal();

  // Initial State
  let currentCategory: ProjectCategory = 'animation';
  let targetWidth = 1920;
  let targetHeight = 1080;
  const paperColor = '#ffffff';
  let paperTransparent = false;
  let useExtendedCanvas = true;
  let showSafeMargins = true;

  const timelineName = 'Escena 1';
  const totalFrames = 72; // 3 seconds @ 24fps

  const overlay = document.createElement('div');
  overlay.className = 'csp-modal-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.78);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #e2e8f0;
    user-select: none;
    animation: cspModalFadeIn 0.18s ease-out;
  `;

  const modal = document.createElement('div');
  modal.className = 'csp-new-project-modal';
  modal.style.cssText = `
    width: 720px;
    max-width: 95vw;
    background: #18191c;
    border: 1px solid #2d3139;
    border-radius: 10px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  modal.innerHTML = `
    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #1f2228; border-bottom: 1px solid #2d3139;">
      <div style="display: flex; align-items: center; gap: 9px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
        <span style="font-weight: 600; font-size: 14px; letter-spacing: 0.3px;">Nuevo proyecto</span>
      </div>
      <button id="csp-new-close-btn" style="background: transparent; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">✕</button>
    </div>

    <!-- Body -->
    <div style="padding: 18px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; max-height: 82vh;">
      
      <!-- Work Type Selector Tabs -->
      <div>
        <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Tipo de obra</label>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
          
          <!-- Animación -->
          <button type="button" id="tab-cat-animation" class="csp-cat-tab active" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; background: #222630; border: 2px solid #8b5cf6; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.15s ease;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(139, 92, 246, 0.2); display: flex; align-items: center; justify-content: center; color: #a78bfa;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                <line x1="7" y1="2" x2="7" y2="22"/>
                <line x1="17" y1="2" x2="17" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <line x1="2" y1="7" x2="7" y2="7"/>
                <line x1="2" y1="17" x2="7" y2="17"/>
                <line x1="17" y1="17" x2="22" y2="17"/>
                <line x1="17" y1="7" x2="22" y2="7"/>
              </svg>
            </div>
            <span style="font-weight: 600; font-size: 12px; color: #f8fafc;">Animación</span>
          </button>

          <!-- Ilustración -->
          <button type="button" id="tab-cat-illustration" class="csp-cat-tab" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; background: #1c1f26; border: 2px solid transparent; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.15s ease;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; color: #fbbf24;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
            </div>
            <span style="font-weight: 600; font-size: 12px; color: #f8fafc;">Ilustración</span>
          </button>

          <!-- Cómic / Manga -->
          <button type="button" id="tab-cat-comic" class="csp-cat-tab" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; background: #1c1f26; border: 2px solid transparent; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.15s ease;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: #34d399;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
              </svg>
            </div>
            <span style="font-weight: 600; font-size: 12px; color: #f8fafc;">Cómic / Manga</span>
          </button>

          <!-- Webtoon -->
          <button type="button" id="tab-cat-webtoon" class="csp-cat-tab" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; background: #1c1f26; border: 2px solid transparent; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.15s ease;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(6, 182, 212, 0.15); display: flex; align-items: center; justify-content: center; color: #22d3ee;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="7" y="2" width="10" height="20" rx="2"/>
                <line x1="10" y1="6" x2="14" y2="6"/>
                <line x1="10" y1="10" x2="14" y2="10"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <span style="font-weight: 600; font-size: 12px; color: #f8fafc;">Webtoon</span>
          </button>

        </div>
      </div>

      <!-- Presets Dropdown for Selected Category -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; font-weight: 600; margin: 0;">Ajustes preestablecidos</label>
          <button type="button" id="clipboard-size-btn" title="Detectar dimensiones de imagen en el portapapeles" style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 4px; padding: 2px 8px; font-size: 11px; color: #38bdf8; cursor: pointer; transition: all 0.15s ease;">📋 Tamaño del portapapeles</button>
        </div>
        <select id="csp-preset-select" style="width: 100%; padding: 8px 10px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f1f5f9; font-size: 12px; outline: none; cursor: pointer;">
        </select>
      </div>

      <!-- Dimensions & Resolution Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr auto 1fr; gap: 10px; align-items: flex-end;">
        <div>
          <label id="width-label" style="display: block; font-size: 11px; color: #94a3b8; margin-bottom: 5px;">Ancho (px)</label>
          <input type="number" id="canvas-width-input" value="${targetWidth}" min="64" max="16384" style="width: 100%; box-sizing: border-box; padding: 7px 9px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 13px; font-weight: 600; outline: none;">
        </div>

        <div>
          <label id="height-label" style="display: block; font-size: 11px; color: #94a3b8; margin-bottom: 5px;">Alto (px)</label>
          <input type="number" id="canvas-height-input" value="${targetHeight}" min="64" max="16384" style="width: 100%; box-sizing: border-box; padding: 7px 9px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 13px; font-weight: 600; outline: none;">
        </div>

        <button type="button" id="swap-orientation-btn" title="Intercambiar orientación (Horizontal / Vertical)" style="height: 33px; padding: 0 10px; background: #222630; border: 1px solid #2d3139; border-radius: 6px; color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>

        <div>
          <label style="display: block; font-size: 11px; color: #94a3b8; margin-bottom: 5px;">Resolución (DPI)</label>
          <select id="canvas-dpi-select" style="width: 100%; box-sizing: border-box; padding: 7px 9px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 13px; outline: none; cursor: pointer;">
            <option value="72">72 dpi (Pantalla)</option>
            <option value="144">144 dpi</option>
            <option value="150">150 dpi</option>
            <option value="192" selected>192 dpi (Animación estándar)</option>
            <option value="300">300 dpi (Impresión alta)</option>
            <option value="350">350 dpi (Manga)</option>
            <option value="600">600 dpi (Monocromo comercial)</option>
          </select>
        </div>
      </div>

      <!-- Extended Canvas Options for Animation (Overscan Frame) -->
      <div id="extended-canvas-box" style="padding: 12px 14px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; display: flex; flex-direction: column; gap: 8px;">
        <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #38bdf8; cursor: pointer;">
          <input type="checkbox" id="extended-canvas-chk" checked style="cursor: pointer; accent-color: #38bdf8;">
          Lienzo ampliado de animación (Margen de sobreescaneo +20%)
        </label>
        <div id="extended-canvas-hint" style="font-size: 11px; color: #94a3b8; line-height: 1.4; padding-left: 22px;">
          Crea un área de dibujo de <strong>2304 × 1296 px</strong> con cuadro de cámara de <strong>1920 × 1080 px</strong>, permitiendo animar entradas/salidas de personajes y movimientos de cámara fuera del encuadre final.
        </div>
        <div style="display: flex; align-items: center; gap: 16px; padding-left: 22px; margin-top: 2px;">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #cbd5e1; cursor: pointer;">
            <input type="checkbox" id="safe-margins-chk" checked style="cursor: pointer; accent-color: #facc15;">
            Guías de seguridad TV/Broadcast (90% Acción / 80% Título)
          </label>
        </div>
      </div>

      <!-- Paper Color & Background -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #1c1f26; border: 1px solid #2d3139; border-radius: 6px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 12px; color: #cbd5e1; font-weight: 500;">Color de papel:</span>
          <input type="color" id="paper-color-input" value="${paperColor}" style="width: 32px; height: 26px; border: none; border-radius: 4px; cursor: pointer; background: transparent;">
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; cursor: pointer;">
          <input type="checkbox" id="paper-transparent-chk" style="cursor: pointer;">
          Sin fondo (Transparente)
        </label>
      </div>

      <!-- Animation Settings Box -->
      <div id="animation-settings-section" style="padding: 12px 14px; background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
        <div style="font-size: 12px; font-weight: 600; color: #c4b5fd; display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Ajustes de Línea de Tiempo (Animación)
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
          <div>
            <label style="display: block; font-size: 11px; color: #cbd5e1; margin-bottom: 4px;">Velocidad (FPS)</label>
            <select id="anim-fps-select" style="width: 100%; box-sizing: border-box; padding: 6px 8px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 12px; outline: none;">
              <option value="8">8 fps (Anime retro)</option>
              <option value="12">12 fps (A doses)</option>
              <option value="24" selected>24 fps (Cine / Anime)</option>
              <option value="30">30 fps (TV / Web)</option>
              <option value="60">60 fps (Fluido)</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 11px; color: #cbd5e1; margin-bottom: 4px;">Total fotogramas</label>
            <input type="number" id="anim-frames-input" value="${totalFrames}" min="1" max="10000" style="width: 100%; box-sizing: border-box; padding: 6px 8px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 12px; font-weight: 600; outline: none;">
          </div>

          <div>
            <label style="display: block; font-size: 11px; color: #cbd5e1; margin-bottom: 4px;">Nombre escena</label>
            <input type="text" id="anim-name-input" value="${timelineName}" style="width: 100%; box-sizing: border-box; padding: 6px 8px; background: #131417; border: 1px solid #2d3139; border-radius: 6px; color: #f8fafc; font-size: 12px; outline: none;">
          </div>
        </div>

        <div id="anim-duration-hint" style="font-size: 11px; color: #a78bfa;">
          Duración: <strong>3.0 segundos</strong> (72 fotogramas a 24 fps)
        </div>
      </div>

    </div>

    <!-- Footer Actions -->
    <div style="padding: 12px 18px; background: #1f2228; border-top: 1px solid #2d3139; display: flex; align-items: center; justify-content: flex-end; gap: 10px;">
      <button type="button" id="csp-new-cancel-btn" style="padding: 8px 18px; background: #262930; border: 1px solid #3b404d; border-radius: 6px; color: #cbd5e1; font-size: 13px; font-weight: 500; cursor: pointer;">Cancelar</button>
      <button type="button" id="csp-new-confirm-btn" style="padding: 8px 24px; background: #2563eb; border: 1px solid #3b82f6; border-radius: 6px; color: #ffffff; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Crear lienzo
      </button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  activeNewProjectModal = overlay;

  // DOM Elements
  const tabAnim = modal.querySelector<HTMLButtonElement>('#tab-cat-animation')!;
  const tabIllus = modal.querySelector<HTMLButtonElement>('#tab-cat-illustration')!;
  const tabComic = modal.querySelector<HTMLButtonElement>('#tab-cat-comic')!;
  const tabWebtoon = modal.querySelector<HTMLButtonElement>('#tab-cat-webtoon')!;
  const tabs = [
    { cat: 'animation' as ProjectCategory, el: tabAnim, color: '#8b5cf6' },
    { cat: 'illustration' as ProjectCategory, el: tabIllus, color: '#f59e0b' },
    { cat: 'comic' as ProjectCategory, el: tabComic, color: '#10b981' },
    { cat: 'webtoon' as ProjectCategory, el: tabWebtoon, color: '#06b6d4' },
  ];

  const extendedCanvasBox = modal.querySelector<HTMLElement>('#extended-canvas-box')!;
  const extendedCanvasChk = modal.querySelector<HTMLInputElement>('#extended-canvas-chk')!;
  const extendedCanvasHint = modal.querySelector<HTMLElement>('#extended-canvas-hint')!;
  const safeMarginsChk = modal.querySelector<HTMLInputElement>('#safe-margins-chk')!;
  const animSection = modal.querySelector<HTMLElement>('#animation-settings-section')!;
  const presetSelect = modal.querySelector<HTMLSelectElement>('#csp-preset-select')!;
  const widthInput = modal.querySelector<HTMLInputElement>('#canvas-width-input')!;
  const heightInput = modal.querySelector<HTMLInputElement>('#canvas-height-input')!;
  const widthLabel = modal.querySelector<HTMLElement>('#width-label')!;
  const heightLabel = modal.querySelector<HTMLElement>('#height-label')!;
  const swapBtn = modal.querySelector<HTMLButtonElement>('#swap-orientation-btn')!;
  const dpiSelect = modal.querySelector<HTMLSelectElement>('#canvas-dpi-select')!;
  const paperColorInput = modal.querySelector<HTMLInputElement>('#paper-color-input')!;
  const paperTransparentChk = modal.querySelector<HTMLInputElement>('#paper-transparent-chk')!;
  const fpsSelect = modal.querySelector<HTMLSelectElement>('#anim-fps-select')!;
  const framesInput = modal.querySelector<HTMLInputElement>('#anim-frames-input')!;
  const nameInput = modal.querySelector<HTMLInputElement>('#anim-name-input')!;
  const durationHint = modal.querySelector<HTMLElement>('#anim-duration-hint')!;
  const closeBtn = modal.querySelector<HTMLButtonElement>('#csp-new-close-btn')!;
  const cancelBtn = modal.querySelector<HTMLButtonElement>('#csp-new-cancel-btn')!;
  const confirmBtn = modal.querySelector<HTMLButtonElement>('#csp-new-confirm-btn')!;

  function populatePresetsForCategory(cat: ProjectCategory): void {
    const list = CANVAS_PRESETS.filter((p) => p.category === cat);
    presetSelect.innerHTML =
      list.map((p, idx) => `<option value="${idx}">${p.name}</option>`).join('') +
      '<option value="custom">Personalizado...</option>';
    presetSelect.value = '0';
    loadPreset(list[0]);
  }

  function loadPreset(p?: PresetConfig): void {
    if (!p) return;
    targetWidth = p.width;
    targetHeight = p.height;
    widthInput.value = String(targetWidth);
    heightInput.value = String(targetHeight);
    dpiSelect.value = String(p.dpi);

    if (p.hasOverscan !== undefined) {
      useExtendedCanvas = p.hasOverscan;
      extendedCanvasChk.checked = p.hasOverscan;
    }

    if (p.fps) fpsSelect.value = String(p.fps);
    if (p.frames) framesInput.value = String(p.frames);

    updateExtendedCanvasHint();
    updateDurationHint();
  }

  function updateTypeVisuals(): void {
    tabs.forEach(({ cat, el, color }) => {
      const active = cat === currentCategory;
      el.style.border = active ? `2px solid ${color}` : '2px solid transparent';
      el.style.background = active ? '#222630' : '#1c1f26';
    });

    const isAnim = currentCategory === 'animation';
    animSection.style.display = isAnim ? 'flex' : 'none';
    extendedCanvasBox.style.display = isAnim ? 'flex' : 'none';

    if (isAnim && useExtendedCanvas) {
      widthLabel.textContent = 'Ancho cámara (px)';
      heightLabel.textContent = 'Alto cámara (px)';
    } else {
      widthLabel.textContent = 'Ancho lienzo (px)';
      heightLabel.textContent = 'Alto lienzo (px)';
    }

    populatePresetsForCategory(currentCategory);
  }

  function updateExtendedCanvasHint(): void {
    const w = Number(widthInput.value) || 1920;
    const h = Number(heightInput.value) || 1080;
    const drawW = Math.round(w * 1.2);
    const drawH = Math.round(h * 1.2);

    if (useExtendedCanvas) {
      extendedCanvasHint.innerHTML = `Lienzo de dibujo ampliado: <strong>${drawW} × ${drawH} px</strong> (+20% sobreescaneo).<br>El marco de cámara delimitará la salida final en <strong>${w} × ${h} px</strong> con viñeta exterior.`;
      widthLabel.textContent = 'Ancho cámara (px)';
      heightLabel.textContent = 'Alto cámara (px)';
    } else {
      extendedCanvasHint.innerHTML = `Lienzo 1:1 sin sobreescaneo: <strong>${w} × ${h} px</strong>.<br>El encuadre de la animación coincidirá exactamente con las dimensiones del lienzo.`;
      widthLabel.textContent = 'Ancho lienzo (px)';
      heightLabel.textContent = 'Alto lienzo (px)';
    }
  }

  function updateDurationHint(): void {
    const fps = Number(fpsSelect.value) || 24;
    const f = Number(framesInput.value) || 24;
    const secs = (f / fps).toFixed(1);
    durationHint.innerHTML = `Duración: <strong>${secs} segundos</strong> (${f} fotogramas a ${fps} fps)`;
  }

  tabs.forEach(({ cat, el }) => {
    el.addEventListener('click', () => {
      currentCategory = cat;
      updateTypeVisuals();
    });
  });

  presetSelect.addEventListener('change', () => {
    const val = presetSelect.value;
    if (val !== 'custom') {
      const list = CANVAS_PRESETS.filter((p) => p.category === currentCategory);
      const p = list[Number(val)];
      if (p) loadPreset(p);
    }
  });

  const clipBtn = overlay.querySelector('#clipboard-size-btn') as HTMLButtonElement | null;
  clipBtn?.addEventListener('click', async () => {
    clipBtn.textContent = '⏳ Leyendo portapapeles...';
    try {
      const data = await getClipboardImage();
      if (data) {
        widthInput.value = String(data.width);
        heightInput.value = String(data.height);
        presetSelect.value = 'custom';
        updateExtendedCanvasHint();
        clipBtn.textContent = `✓ ${data.width} × ${data.height} px`;
        setTimeout(() => { clipBtn.textContent = '📋 Tamaño del portapapeles'; }, 2500);
      } else {
        clipBtn.textContent = '⚠ Sin imagen';
        setTimeout(() => { clipBtn.textContent = '📋 Tamaño del portapapeles'; }, 2000);
      }
    } catch {
      clipBtn.textContent = '⚠ Sin acceso';
      setTimeout(() => { clipBtn.textContent = '📋 Tamaño del portapapeles'; }, 2000);
    }
  });

  swapBtn.addEventListener('click', () => {
    const temp = widthInput.value;
    widthInput.value = heightInput.value;
    heightInput.value = temp;
    presetSelect.value = 'custom';
    updateExtendedCanvasHint();
  });

  widthInput.addEventListener('input', () => {
    presetSelect.value = 'custom';
    updateExtendedCanvasHint();
  });

  heightInput.addEventListener('input', () => {
    presetSelect.value = 'custom';
    updateExtendedCanvasHint();
  });

  extendedCanvasChk.addEventListener('change', () => {
    useExtendedCanvas = extendedCanvasChk.checked;
    updateExtendedCanvasHint();
  });

  safeMarginsChk.addEventListener('change', () => {
    showSafeMargins = safeMarginsChk.checked;
  });

  fpsSelect.addEventListener('change', updateDurationHint);
  framesInput.addEventListener('input', updateDurationHint);

  paperTransparentChk.addEventListener('change', () => {
    paperTransparent = paperTransparentChk.checked;
    paperColorInput.disabled = paperTransparent;
    paperColorInput.style.opacity = paperTransparent ? '0.3' : '1';
  });

  closeBtn.addEventListener('click', closeNewProjectModal);
  cancelBtn.addEventListener('click', closeNewProjectModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeNewProjectModal();
  });

  window.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeNewProjectModal();
      window.removeEventListener('keydown', escHandler);
    } else if (e.key === 'Enter' && activeNewProjectModal) {
      applyNewProject();
      window.removeEventListener('keydown', escHandler);
    }
  });

  function applyNewProject(): void {
    const rawW = Math.max(64, Math.min(16384, Number(widthInput.value) || 1920));
    const rawH = Math.max(64, Math.min(16384, Number(heightInput.value) || 1080));
    const isAnim = currentCategory === 'animation';
    const fps = Number(fpsSelect.value) || 24;
    const fCount = Math.max(1, Number(framesInput.value) || 24);
    const sceneName = (nameInput.value || '').trim() || 'Escena 1';
    const paperBg = paperTransparent ? null : paperColorInput.value;

    closeNewProjectModal();

    // Determine Canvas Drawing dimensions vs Camera Output Frame
    let docW = rawW;
    let docH = rawH;

    if (isAnim && useExtendedCanvas) {
      // Extended animation canvas (+20% margin around output frame)
      docW = Math.round(rawW * 1.2);
      docH = Math.round(rawH * 1.2);

      cameraFrameManager.configure({
        enabled: true,
        outputWidth: rawW,
        outputHeight: rawH,
        offsetX: 0,
        offsetY: 0,
        showFrame: true,
        showMask: true,
        showSafeMargin: showSafeMargins,
      });
    } else {
      cameraFrameManager.configure({
        enabled: false,
        outputWidth: docW,
        outputHeight: docH,
      });
    }

    // Resize engine, three.js canvas plane, and tools to new project dimensions
    engine.setDocumentSize(docW, docH);
    engine.clearHistory();

    // Reset layers in engine
    const layers: LayerNode[] = [];

    // 1. Paper Layer (Bottom background)
    if (paperBg) {
      const paperCanvas = document.createElement('canvas');
      paperCanvas.width = docW;
      paperCanvas.height = docH;
      const paperCtx = paperCanvas.getContext('2d', { willReadFrequently: true })!;
      paperCtx.fillStyle = paperBg;
      paperCtx.fillRect(0, 0, docW, docH);

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
    }

    if (isAnim) {
      // 2. Animation Project: Create Animation Folder + Cel 1
      const folderId = 'layer-anim-1';
      const celCanvas = document.createElement('canvas');
      celCanvas.width = docW;
      celCanvas.height = docH;
      const celCtx = celCanvas.getContext('2d', { willReadFrequently: true })!;

      layers.push({
        id: folderId,
        type: 'folder',
        name: 'Animación 1',
        visible: true,
        opacity: 1,
        blendMode: 'source-over',
        isPaper: false,
        isAnimationFolder: true,
        parentId: null,
        collapsed: false,
        clipped: false,
        locked: false,
      });

      const celId = 'layer-cel-1';
      layers.push({
        id: celId,
        type: 'raster',
        name: '1',
        canvas: celCanvas,
        context: celCtx,
        visible: true,
        opacity: 1,
        blendMode: 'source-over',
        isPaper: false,
        isAnimationFolder: false,
        parentId: folderId,
        collapsed: false,
        clipped: false,
        locked: false,
      });

      engine.layerManager.loadLayers(layers, celId);

      // Configure timeline
      timeline.setFps(fps);
      timeline.setTotalFrames(fCount);
      timeline.setRange(1, fCount);
      timeline.renameScene(timeline.activeSceneId, sceneName);

      // Setup track
      const existingTrack = timeline.tracks.find((t) => t.folderId === folderId);
      if (existingTrack) {
        if (existingTrack.clips.length > 0) {
          existingTrack.clips[0].exposures.set(1, celId);
        }
      } else {
        const track = timeline.createTrack('Animación 1');
        if (track && track.clips.length > 0) {
          track.clips[0].exposures.set(1, celId);
        }
      }

      timeline.goToFrame(1);
      setActiveProjectName('Animación 1.oniri');
    } else {
      // 3. Static Illustration / Cómic / Webtoon: Paper + Capa 1
      const drawCanvas = document.createElement('canvas');
      drawCanvas.width = docW;
      drawCanvas.height = docH;
      const drawCtx = drawCanvas.getContext('2d', { willReadFrequently: true })!;

      const layerId = 'layer-1';
      layers.push({
        id: layerId,
        type: 'raster',
        name: 'Capa 1',
        canvas: drawCanvas,
        context: drawCtx,
        visible: true,
        opacity: 1,
        blendMode: 'source-over',
        isPaper: false,
        isAnimationFolder: false,
        parentId: null,
        collapsed: false,
        clipped: false,
        locked: false,
      });

      engine.layerManager.loadLayers(layers, layerId);

      const titleMap: Record<ProjectCategory, string> = {
        animation: 'Animación 1.oniri',
        illustration: 'Ilustración 1.oniri',
        comic: 'Cómic 1.oniri',
        webtoon: 'Webtoon 1.oniri',
      };
      setActiveProjectName(titleMap[currentCategory]);
    }

    engine.compositeDirty = true;
    engine.updateComposite();

    if (onCreated) onCreated();
  }

  confirmBtn.addEventListener('click', applyNewProject);

  // Initialize
  updateTypeVisuals();
}
