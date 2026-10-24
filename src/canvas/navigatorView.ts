import type { BrushEngine } from '../brush/brushEngine';
import { DOC_H, DOC_W } from '../brush/docConstants';
import { viewportNav, type ViewportState } from './viewportNavigation';

export interface NavigatorViewOptions {
  engine: BrushEngine;
  onClose?: () => void;
}

export class NavigatorPalette {
  public readonly element: HTMLElement;
  private previewCanvas: HTMLCanvasElement;
  private previewCtx: CanvasRenderingContext2D;
  private engine: BrushEngine;

  private zoomSlider!: HTMLInputElement;
  private zoomInput!: HTMLInputElement;
  private rotSlider!: HTMLInputElement;
  private rotInput!: HTMLInputElement;
  private flipHBtn!: HTMLButtonElement;
  private flipVBtn!: HTMLButtonElement;

  private isDraggingViewfinder = false;
  private animFrameId: number | null = null;
  private unsubNav: (() => void) | null = null;

  constructor(options: NavigatorViewOptions) {
    this.engine = options.engine;
    this.element = document.createElement('div');
    this.element.className = 'csp-navigator-palette';

    // Panel Header
    const header = document.createElement('div');
    header.className = 'csp-navigator-header';
    header.innerHTML = `
      <div class="csp-nav-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span>Navegador</span>
      </div>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'csp-nav-close-btn';
    closeBtn.title = 'Cerrar panel de navegador';
    closeBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `;
    closeBtn.addEventListener('click', () => {
      this.element.style.display = 'none';
      options.onClose?.();
    });
    header.appendChild(closeBtn);
    this.element.appendChild(header);

    // Thumbnail Preview Container
    const previewContainer = document.createElement('div');
    previewContainer.className = 'csp-nav-preview-container';

    this.previewCanvas = document.createElement('canvas');
    this.previewCanvas.className = 'csp-nav-preview-canvas';
    this.previewCanvas.width = 240;
    this.previewCanvas.height = 135; // 16:9 ratio
    this.previewCtx = this.previewCanvas.getContext('2d')!;

    // Dragging viewfinder inside preview
    const handleThumbPointer = (e: PointerEvent) => {
      const rect = this.previewCanvas.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const clickY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const docX = (clickX / rect.width) * DOC_W;
      const docY = (clickY / rect.height) * DOC_H;

      viewportNav.panToDoc(docX, docY);
    };

    this.previewCanvas.addEventListener('pointerdown', (e) => {
      this.isDraggingViewfinder = true;
      this.previewCanvas.setPointerCapture(e.pointerId);
      handleThumbPointer(e);
    });

    this.previewCanvas.addEventListener('pointermove', (e) => {
      if (this.isDraggingViewfinder) {
        handleThumbPointer(e);
      }
    });

    const stopDragging = (e: PointerEvent) => {
      if (this.isDraggingViewfinder) {
        this.isDraggingViewfinder = false;
        try {
          this.previewCanvas.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };
    this.previewCanvas.addEventListener('pointerup', stopDragging);
    this.previewCanvas.addEventListener('pointercancel', stopDragging);

    previewContainer.appendChild(this.previewCanvas);
    this.element.appendChild(previewContainer);

    // Controls Section
    const controls = document.createElement('div');
    controls.className = 'csp-nav-controls';

    // 1. Zoom Control Row
    const zoomRow = document.createElement('div');
    zoomRow.className = 'csp-nav-row';

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'csp-nav-icon-btn';
    zoomOutBtn.title = 'Reducir zoom';
    zoomOutBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    `;
    zoomOutBtn.addEventListener('click', () => viewportNav.zoomOut());

    this.zoomSlider = document.createElement('input');
    this.zoomSlider.type = 'range';
    this.zoomSlider.className = 'csp-slider csp-nav-slider';
    this.zoomSlider.min = '10';
    this.zoomSlider.max = '600';
    this.zoomSlider.value = '100';
    this.zoomSlider.addEventListener('input', () => {
      const pct = Number(this.zoomSlider.value);
      viewportNav.setZoom(pct / 100);
    });

    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'csp-nav-icon-btn';
    zoomInBtn.title = 'Aumentar zoom';
    zoomInBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    `;
    zoomInBtn.addEventListener('click', () => viewportNav.zoomIn());

    this.zoomInput = document.createElement('input');
    this.zoomInput.type = 'text';
    this.zoomInput.className = 'csp-nav-input';
    this.zoomInput.value = '100%';
    this.zoomInput.addEventListener('change', () => {
      const val = parseFloat(this.zoomInput.value);
      if (!isNaN(val) && val > 0) {
        viewportNav.setZoom(val / 100);
      }
    });

    const zoom100Btn = document.createElement('button');
    zoom100Btn.className = 'csp-nav-text-btn';
    zoom100Btn.title = 'Zoom al 100% (1:1)';
    zoom100Btn.textContent = '100%';
    zoom100Btn.addEventListener('click', () => viewportNav.zoom100());

    const fitBtn = document.createElement('button');
    fitBtn.className = 'csp-nav-icon-btn';
    fitBtn.title = 'Ajustar lienzo a ventana (Ctrl+0)';
    fitBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <polyline points="9 3 9 9 3 9"/>
        <polyline points="15 3 15 9 21 9"/>
        <polyline points="9 21 9 15 3 15"/>
        <polyline points="15 21 15 15 21 15"/>
      </svg>
    `;
    fitBtn.addEventListener('click', () => viewportNav.resetView());

    zoomRow.append(zoomOutBtn, this.zoomSlider, zoomInBtn, this.zoomInput, zoom100Btn, fitBtn);
    controls.appendChild(zoomRow);

    // 2. Rotation Control Row
    const rotRow = document.createElement('div');
    rotRow.className = 'csp-nav-row';

    const rotCCWBtn = document.createElement('button');
    rotCCWBtn.className = 'csp-nav-icon-btn';
    rotCCWBtn.title = 'Rotar 90° a la izquierda';
    rotCCWBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    `;
    rotCCWBtn.addEventListener('click', () => viewportNav.rotate90CCW());

    this.rotSlider = document.createElement('input');
    this.rotSlider.type = 'range';
    this.rotSlider.className = 'csp-slider csp-nav-slider';
    this.rotSlider.min = '-180';
    this.rotSlider.max = '180';
    this.rotSlider.value = '0';
    this.rotSlider.addEventListener('input', () => {
      const deg = Number(this.rotSlider.value);
      viewportNav.setRotation((deg * Math.PI) / 180);
    });

    const rotCWBtn = document.createElement('button');
    rotCWBtn.className = 'csp-nav-icon-btn';
    rotCWBtn.title = 'Rotar 90° a la derecha';
    rotCWBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>
    `;
    rotCWBtn.addEventListener('click', () => viewportNav.rotate90CW());

    this.rotInput = document.createElement('input');
    this.rotInput.type = 'text';
    this.rotInput.className = 'csp-nav-input';
    this.rotInput.value = '0.0°';
    this.rotInput.addEventListener('change', () => {
      const val = parseFloat(this.rotInput.value);
      if (!isNaN(val)) {
        viewportNav.setRotation((val * Math.PI) / 180);
      }
    });

    const resetRotBtn = document.createElement('button');
    resetRotBtn.className = 'csp-nav-text-btn';
    resetRotBtn.title = 'Restablecer rotación a 0°';
    resetRotBtn.textContent = '0°';
    resetRotBtn.addEventListener('click', () => viewportNav.resetRotation());

    rotRow.append(rotCCWBtn, this.rotSlider, rotCWBtn, this.rotInput, resetRotBtn);
    controls.appendChild(rotRow);

    // 3. Mirror View Row (Voltear Horizontalmente / Verticalmente)
    const flipRow = document.createElement('div');
    flipRow.className = 'csp-nav-row flip-row';

    this.flipHBtn = document.createElement('button');
    this.flipHBtn.className = 'csp-nav-toggle-btn';
    this.flipHBtn.title = 'Voltear vista horizontalmente (Comprobar simetría y dibujo)';
    this.flipHBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/>
        <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
        <line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2"/>
      </svg>
      <span>Voltear horizontal</span>
    `;
    this.flipHBtn.addEventListener('click', () => viewportNav.toggleFlipHorizontal());

    this.flipVBtn = document.createElement('button');
    this.flipVBtn.className = 'csp-nav-toggle-btn';
    this.flipVBtn.title = 'Voltear vista verticalmente';
    this.flipVBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke-dasharray="2 2"/>
      </svg>
      <span>Voltear vertical</span>
    `;
    this.flipVBtn.addEventListener('click', () => viewportNav.toggleFlipVertical());

    flipRow.append(this.flipHBtn, this.flipVBtn);
    controls.appendChild(flipRow);

    this.element.appendChild(controls);

    // Subscribe to viewport navigation updates
    this.unsubNav = viewportNav.subscribe((state) => this.updateUI(state));

    // Live Render Loop for thumbnail & viewfinder
    this.startRenderLoop();
  }

  private updateUI(state: ViewportState): void {
    const pct = Math.round(state.zoom * 100);
    this.zoomSlider.value = String(pct);
    this.zoomInput.value = `${pct}%`;

    const deg = state.rotationDeg;
    this.rotSlider.value = String(Math.round(deg));
    this.rotInput.value = `${deg.toFixed(1)}°`;

    this.flipHBtn.classList.toggle('active', state.flippedH);
    this.flipVBtn.classList.toggle('active', state.flippedV);
  }

  private render(): void {
    const ctx = this.previewCtx;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;

    // 1. Draw Checkerboard background
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw composite canvas content
    const sourceCanvas = this.engine.compositeCanvas;
    ctx.drawImage(sourceCanvas, 0, 0, DOC_W, DOC_H, 0, 0, w, h);

    // 3. Draw Document border outline
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    // 4. Draw Viewfinder Polygon (visible camera area)
    const corners = viewportNav.getVisibleDocCorners();
    if (corners.length === 4) {
      const scaleX = w / DOC_W;
      const scaleY = h / DOC_H;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(corners[0].x * scaleX, corners[0].y * scaleY);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(corners[i].x * scaleX, corners[i].y * scaleY);
      }
      ctx.closePath();

      // Semi-transparent red fill & crisp red outline
      ctx.fillStyle = 'rgba(235, 60, 60, 0.12)';
      ctx.fill();

      ctx.strokeStyle = '#ff3b30';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Small corner handles
      ctx.fillStyle = '#ff3b30';
      for (let i = 0; i < 4; i++) {
        const px = corners[i].x * scaleX;
        const py = corners[i].y * scaleY;
        ctx.fillRect(px - 2, py - 2, 4, 4);
      }
      ctx.restore();
    }
  }

  private startRenderLoop(): void {
    const loop = () => {
      this.render();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public toggle(): void {
    const isHidden = this.element.style.display === 'none';
    this.element.style.display = isHidden ? 'flex' : 'none';
  }

  public show(): void {
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.element.style.display = 'none';
  }

  public dispose(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.unsubNav) {
      this.unsubNav();
    }
    this.element.remove();
  }
}

let activeNavigatorInstance: NavigatorPalette | null = null;

export function mountNavigatorPalette(
  container: HTMLElement,
  options: NavigatorViewOptions,
): NavigatorPalette {
  if (activeNavigatorInstance) {
    activeNavigatorInstance.dispose();
  }
  const palette = new NavigatorPalette(options);
  container.appendChild(palette.element);
  activeNavigatorInstance = palette;
  return palette;
}

export function getNavigatorPalette(): NavigatorPalette | null {
  return activeNavigatorInstance;
}
