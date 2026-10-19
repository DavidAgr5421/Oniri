import type {
  AntiAliasingLevel,
  ShapeFillMode,
  ShapeType,
  TipShape,
  ToolId,
  ToolState,
} from './toolState';
import {
  getToolState,
  getSubToolsForTool,
  createCustomSubTool,
  deleteSubTool,
  duplicateSubTool,
  resetSubTool,
  selectSubTool,
  setActiveColorSlot,
  setBrushSettings,
  setPrimaryColor,
  setSecondaryColor,
  setTool,
  subscribeTools,
  swapColors,
  toggleProperties,
  toggleTransparentColor,
} from './toolState';
import { brushDiameterAt, brushStampAlpha } from '../brush/brushEngine';
import { getStampTexture } from '../brush/stampTexture';

interface ToolDef {
  id: ToolId;
  label: string;
  shortcut: string;
  icon: string;
}

const TOOLS: ToolDef[] = [
  {
    id: 'pen',
    label: 'Pluma',
    shortcut: 'P',
    icon: '<path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/>',
  },
  {
    id: 'brush',
    label: 'Pincel',
    shortcut: 'B',
    icon: '<path d="M4 20l3-1 11-11a2 2 0 0 0-3-3L4 16z" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>',
  },
  {
    id: 'eraser',
    label: 'Goma de Borrar',
    shortcut: 'E',
    icon: '<path d="M16 3l5 5-9 9h-5l-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
  {
    id: 'eyedropper',
    label: 'Cuentagotas',
    shortcut: 'I',
    icon: '<path d="M13 3l4 4 6-2-2 6-4 4-8-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 11l-6 6a1 1 0 0 0 0 2l3 3a1 1 0 0 0 2 0l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  },
  {
    id: 'bucket',
    label: 'Relleno',
    shortcut: 'G',
    icon: '<path d="M19 11l-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3l5 5a2.12 2.12 0 0 0 3 0L19 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 2l5 5" stroke="currentColor" stroke-width="1.8"/><path d="M2 13l7.5 7.5" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="19" r="2" fill="currentColor"/>',
  },
  {
    id: 'shape',
    label: 'Figura',
    shortcut: 'U',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  },
  {
    id: 'hand',
    label: 'Mover Lienzo',
    shortcut: 'H',
    icon: '<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M6 14v1a7 7 0 0 0 14 0v-5a2 2 0 0 0-4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
];

const QUICK_SIZES = [3, 5, 8, 12, 18, 28, 45, 70];

const TIP_SHAPES: { id: TipShape; label: string }[] = [
  { id: 'circle', label: 'Círculo' },
  { id: 'square', label: 'Plano' },
  { id: 'calligraphic', label: 'Caligráfico' },
];

const AA_LEVELS: { id: AntiAliasingLevel; label: string }[] = [
  { id: 'none', label: 'Ninguno' },
  { id: 'weak', label: 'Débil' },
  { id: 'medium', label: 'Medio' },
  { id: 'strong', label: 'Fuerte' },
];

export interface ToolsViewOptions {
  onUndo?: () => void;
  onRedo?: () => void;
}

export function mountToolsView(container: HTMLElement, options?: ToolsViewOptions): void {
  container.innerHTML = '';
  container.className = 'tools-root';

  // --- 1. Column 1: Lateral Tools Strip (CSP Style) ---
  const lateralBar = document.createElement('aside');
  lateralBar.className = 'lateral-toolbar';

  const toolButtons = new Map<ToolId, HTMLButtonElement>();

  for (const tool of TOOLS) {
    const button = document.createElement('button');
    button.className = 'lateral-btn tool-btn';
    button.dataset.tool = tool.id;
    button.title = `${tool.label} (${tool.shortcut})`;
    button.setAttribute('aria-label', tool.label);
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        ${tool.icon}
      </svg>
      <span class="btn-shortcut">${tool.shortcut}</span>
    `;
    button.addEventListener('click', () => {
      setTool(tool.id);
      // Auto-open property dock if closed
      if (!getToolState().propertiesOpen) {
        toggleProperties(true);
      }
    });
    lateralBar.appendChild(button);
    toolButtons.set(tool.id, button);
  }

  const divider1 = document.createElement('div');
  divider1.className = 'toolbar-divider';
  lateralBar.appendChild(divider1);

  // Undo / Redo Buttons
  const undoBtn = document.createElement('button');
  undoBtn.className = 'lateral-btn action-btn';
  undoBtn.title = 'Deshacer (Ctrl+Z)';
  undoBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `;
  undoBtn.addEventListener('click', () => options?.onUndo?.());
  lateralBar.appendChild(undoBtn);

  const redoBtn = document.createElement('button');
  redoBtn.className = 'lateral-btn action-btn';
  redoBtn.title = 'Rehacer (Ctrl+Y)';
  redoBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `;
  redoBtn.addEventListener('click', () => options?.onRedo?.());
  lateralBar.appendChild(redoBtn);

  const spacer = document.createElement('div');
  spacer.style.flex = '1';
  lateralBar.appendChild(spacer);

  // --- CSP Color Widget at Bottom of Column 1 ---
  const colorWidget = document.createElement('div');
  colorWidget.className = 'csp-color-widget';
  colorWidget.title = 'Colores (X: Alternar principal/secundario, C: Color transparente)';

  // Overlapping Primary & Secondary swatches container
  const swatchesOverlap = document.createElement('div');
  swatchesOverlap.className = 'csp-swatches-overlap';

  const secondarySwatch = document.createElement('div');
  secondarySwatch.className = 'csp-swatch secondary';
  secondarySwatch.title = 'Color Secundario (Clic para seleccionar)';
  secondarySwatch.addEventListener('click', () => setActiveColorSlot('secondary'));

  const primarySwatch = document.createElement('div');
  primarySwatch.className = 'csp-swatch primary';
  primarySwatch.title = 'Color Principal (Clic para seleccionar)';
  primarySwatch.addEventListener('click', () => setActiveColorSlot('primary'));

  const swapBtn = document.createElement('button');
  swapBtn.className = 'csp-swap-btn';
  swapBtn.title = 'Alternar color principal y secundario (Atajo: X)';
  swapBtn.innerHTML = `
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="7 10 12 15 17 10"/>
      <path d="M12 15V3"/>
    </svg>
  `;
  swapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    swapColors();
  });

  swatchesOverlap.append(secondarySwatch, primarySwatch, swapBtn);
  colorWidget.appendChild(swatchesOverlap);

  // Transparent Color Tile (Signature Clip Studio Paint feature)
  const transparentTile = document.createElement('div');
  transparentTile.className = 'csp-transparent-tile';
  transparentTile.title = 'Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura';
  transparentTile.innerHTML = `
    <div class="csp-checkerboard"></div>
  `;
  transparentTile.addEventListener('click', () => toggleTransparentColor());
  colorWidget.appendChild(transparentTile);

  lateralBar.appendChild(colorWidget);

  // Toggle Column 2 Drawer button
  const drawerToggleBtn = document.createElement('button');
  drawerToggleBtn.className = 'lateral-btn drawer-toggle-btn';
  drawerToggleBtn.title = 'Ocultar / Mostrar Panel de Propiedades y Subherramientas';
  drawerToggleBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  `;
  drawerToggleBtn.addEventListener('click', () => toggleProperties());
  lateralBar.appendChild(drawerToggleBtn);

  container.appendChild(lateralBar);

  // --- 2. Column 2: Docked Palettes Panel (CSP Style) ---
  const dock = document.createElement('div');
  dock.className = 'csp-sidebar-dock';

  // --- Section 1: Sub Tool Palette ---
  const subtoolSection = document.createElement('div');
  subtoolSection.className = 'dock-section subtool-section';

  const subtoolHeader = document.createElement('div');
  subtoolHeader.className = 'dock-section-header';
  subtoolHeader.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
    <span class="subtool-section-title">Subherramientas</span>
  `;

  // Sub Tool CRUD actions (CSP "Sub Tool Detail" style)
  function actionBtn(text: string, title: string, danger = false): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = `csp-subtool-action-btn${danger ? ' danger' : ''}`;
    btn.textContent = text;
    btn.title = title;
    return btn;
  }

  const createBtn = actionBtn('+', 'Crear un pincel nuevo a partir del actual (duplicar)');
  const resetBtn = actionBtn('↺', 'Restaurar los ajustes de fábrica de este pincel');
  const deleteBtn = actionBtn('🗑', 'Eliminar este pincel personalizado', true);

  createBtn.addEventListener('click', () => {
    const activeId = getToolState().activeSubToolId;
    const created = duplicateSubTool(activeId) ?? createCustomSubTool('Pincel nuevo');
    selectSubTool(created.id);
  });
  resetBtn.addEventListener('click', () => {
    resetSubTool(getToolState().activeSubToolId);
  });
  deleteBtn.addEventListener('click', () => {
    deleteSubTool(getToolState().activeSubToolId);
  });

  const subtoolActions = document.createElement('div');
  subtoolActions.className = 'subtool-header-actions';
  subtoolActions.append(createBtn, resetBtn, deleteBtn);
  subtoolHeader.appendChild(subtoolActions);
  subtoolSection.appendChild(subtoolHeader);

  const subtoolList = document.createElement('div');
  subtoolList.className = 'csp-subtool-list';
  subtoolSection.appendChild(subtoolList);
  dock.appendChild(subtoolSection);

  // --- Section 2: Tool Property Palette ---
  const propSection = document.createElement('div');
  propSection.className = 'dock-section prop-section';

  const propHeaderEl = document.createElement('div');
  propHeaderEl.className = 'dock-section-header';
  propHeaderEl.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span class="prop-section-title">Propiedad de herramienta</span>
  `;
  propSection.appendChild(propHeaderEl);

  const propBody = document.createElement('div');
  propBody.className = 'dock-section-body';

  // Helpers for the ink-specific (pen / brush / eraser) controls
  const inkOnlyEls: HTMLElement[] = [];

  function inkBox(): HTMLDivElement {
    const box = document.createElement('div');
    box.className = 'prop-row-box ink-only';
    box.style.display = 'none';
    inkOnlyEls.push(box);
    return box;
  }

  function makePropHeader(label: string, valueText: string): { header: HTMLDivElement; value: HTMLSpanElement } {
    const header = document.createElement('div');
    header.className = 'prop-row-header';
    const labelEl = document.createElement('span');
    labelEl.className = 'prop-label';
    labelEl.textContent = label;
    const value = document.createElement('span');
    value.className = 'prop-value';
    value.textContent = valueText;
    header.append(labelEl, value);
    return { header, value };
  }

  function makeSlider(min: string, max: string, step?: string): HTMLInputElement {
    const el = document.createElement('input');
    el.type = 'range';
    el.className = 'csp-slider';
    el.min = min;
    el.max = max;
    if (step) el.step = step;
    return el;
  }

  function makeCheckbox(id: string, labelText: string): { box: HTMLInputElement; label: HTMLLabelElement } {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'csp-checkbox';
    box.id = id;
    const label = document.createElement('label');
    label.className = 'csp-check-label';
    label.htmlFor = id;
    label.textContent = labelText;
    return { box, label };
  }

  function makeSegGroup<T extends string>(
    entries: { id: T; label: string }[],
    onPick: (id: T) => void,
  ): { group: HTMLDivElement; buttons: Map<T, HTMLButtonElement> } {
    const group = document.createElement('div');
    group.className = 'csp-seg-group';
    const buttons = new Map<T, HTMLButtonElement>();
    for (const entry of entries) {
      const btn = document.createElement('button');
      btn.className = 'csp-seg-btn';
      btn.textContent = entry.label;
      btn.addEventListener('click', () => onPick(entry.id));
      group.appendChild(btn);
      buttons.set(entry.id, btn);
    }
    return { group, buttons };
  }

  // 0. Stroke Preview (live S-curve of the current brush)
  const PREVIEW_W = 210;
  const PREVIEW_H = 64;
  const previewDpr = Math.min(2, window.devicePixelRatio || 1);
  const previewBox = inkBox();
  const previewCanvas = document.createElement('canvas');
  previewCanvas.className = 'csp-preview-canvas';
  previewCanvas.width = Math.round(PREVIEW_W * previewDpr);
  previewCanvas.height = Math.round(PREVIEW_H * previewDpr);
  previewCanvas.title = 'Vista previa del trazo con el pincel actual';
  previewBox.appendChild(previewCanvas);
  propBody.appendChild(previewBox);

  const drawStrokePreview = (): void => {
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;
    const b = getToolState().brush;
    ctx.setTransform(previewDpr, 0, 0, previewDpr, 0, 0);
    ctx.clearRect(0, 0, PREVIEW_W, PREVIEW_H);

    const color = !b.color || b.color === 'transparent' ? '#111111' : b.color;
    const pad = 12;
    const midY = PREVIEW_H / 2;
    const amp = PREVIEW_H / 2 - pad;
    const pathWidth = PREVIEW_W - pad * 2;
    // Large brushes are scaled down so the whole stroke still fits the box.
    const fit = Math.min(1, 30 / Math.max(1, b.size));
    const spacing = Math.min(0.5, Math.max(0.03, b.spacing));

    // Sample an S curve and accumulate its arc length.
    const N = 120;
    const pathX: number[] = [];
    const pathY: number[] = [];
    const pathArc: number[] = [0];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = pad + t * pathWidth;
      const y = midY + Math.sin(t * Math.PI * 2) * amp;
      if (i > 0) {
        const prev = i - 1;
        pathArc.push(pathArc[prev] + Math.hypot(x - pathX[prev], y - pathY[prev]));
      }
      pathX.push(x);
      pathY.push(y);
    }
    const totalLen = pathArc[N];

    const sampleAt = (arc: number): { x: number; y: number; dx: number; dy: number } => {
      let i = 1;
      while (i < N && pathArc[i] < arc) i++;
      const a0 = pathArc[i - 1];
      const a1 = pathArc[i];
      const u = a1 > a0 ? (arc - a0) / (a1 - a0) : 0;
      return {
        x: pathX[i - 1] + (pathX[i] - pathX[i - 1]) * u,
        y: pathY[i - 1] + (pathY[i] - pathY[i - 1]) * u,
        dx: pathX[i] - pathX[i - 1],
        dy: pathY[i] - pathY[i - 1],
      };
    };

    let pos = 0;
    let guard = 0;
    while (pos <= totalLen && guard++ < 3000) {
      const t = pos / totalLen;
      const pt = sampleAt(pos);
      // Simulated pressure: light at both ends, firm in the middle.
      const pressure = 0.25 + 0.75 * Math.pow(Math.sin(Math.PI * t), 0.7);
      const realDiameter = brushDiameterAt(b, pressure, pos / Math.max(fit, 0.001));
      const diameter = Math.max(0.4, realDiameter * fit);
      const alpha = brushStampAlpha(b, pressure);
      const stamp = getStampTexture({
        diameter,
        hardness: b.hardness,
        color,
        antiAliasing: b.antiAliasing,
        tipShape: b.tipShape,
        tipRoundness: b.tipRoundness,
      });
      const follows = b.followDirection && b.tipShape !== 'calligraphic';
      const angleDeg = (follows ? (Math.atan2(pt.dy, pt.dx) * 180) / Math.PI : 0) + b.tipAngle;
      const symmetric = b.tipShape !== 'square' && b.tipRoundness >= 0.999;

      ctx.globalAlpha = alpha;
      if (!symmetric && angleDeg !== 0) {
        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate((angleDeg * Math.PI) / 180);
        ctx.drawImage(stamp, -stamp.width / 2, -stamp.height / 2);
        ctx.restore();
      } else {
        ctx.drawImage(stamp, pt.x - stamp.width / 2, pt.y - stamp.height / 2);
      }
      pos += Math.max(0.3, diameter * spacing);
    }
    ctx.globalAlpha = 1;
  };

  let previewQueued = false;
  const queuePreview = (): void => {
    if (previewQueued) return;
    previewQueued = true;
    requestAnimationFrame(() => {
      previewQueued = false;
      drawStrokePreview();
    });
  };

  // 1. Brush Size with Quick Presets
  const sizeBox = document.createElement('div');
  sizeBox.className = 'prop-row-box';

  const sizeHeader = document.createElement('div');
  sizeHeader.className = 'prop-row-header';
  sizeHeader.innerHTML = `
    <span class="prop-label">Tamaño del pincel</span>
    <span class="prop-value" id="size-val">6.0 px</span>
  `;

  const sizeSlider = document.createElement('input');
  sizeSlider.type = 'range';
  sizeSlider.className = 'csp-slider';
  sizeSlider.min = '1';
  sizeSlider.max = '200';
  sizeSlider.step = '1';
  sizeSlider.addEventListener('input', () => {
    setBrushSettings({ size: Number(sizeSlider.value) });
  });

  const quickSizeRow = document.createElement('div');
  quickSizeRow.className = 'csp-quick-size-row';
  for (const s of QUICK_SIZES) {
    const qbtn = document.createElement('button');
    qbtn.className = 'csp-quick-size-btn';
    qbtn.textContent = String(s);
    qbtn.addEventListener('click', () => {
      setBrushSettings({ size: s });
    });
    quickSizeRow.appendChild(qbtn);
  }

  sizeBox.append(sizeHeader, sizeSlider, quickSizeRow);
  propBody.appendChild(sizeBox);

  // 2. Opacity
  const opacityBox = document.createElement('div');
  opacityBox.className = 'prop-row-box';
  const opacityHeader = document.createElement('div');
  opacityHeader.className = 'prop-row-header';
  opacityHeader.innerHTML = `
    <span class="prop-label">Opacidad</span>
    <span class="prop-value" id="opacity-val">100%</span>
  `;
  const opacitySlider = document.createElement('input');
  opacitySlider.type = 'range';
  opacitySlider.className = 'csp-slider';
  opacitySlider.min = '1';
  opacitySlider.max = '100';
  opacitySlider.addEventListener('input', () => {
    setBrushSettings({ opacity: Number(opacitySlider.value) / 100 });
  });
  opacityBox.append(opacityHeader, opacitySlider);
  propBody.appendChild(opacityBox);

  // 3. Flow / Density (+ pressure toggle)
  const flowBox = document.createElement('div');
  flowBox.className = 'prop-row-box';
  const flowHeader = document.createElement('div');
  flowHeader.className = 'prop-row-header';
  flowHeader.innerHTML = `
    <span class="prop-label">Densidad del pincel</span>
    <span class="prop-value" id="flow-val">100%</span>
  `;
  const flowSlider = document.createElement('input');
  flowSlider.type = 'range';
  flowSlider.className = 'csp-slider';
  flowSlider.min = '1';
  flowSlider.max = '100';
  flowSlider.addEventListener('input', () => {
    setBrushSettings({ flow: Number(flowSlider.value) / 100 });
  });
  const flowPressure = makeCheckbox('flow-pressure-check', 'Densidad por presión');
  const flowPressureRow = document.createElement('div');
  flowPressureRow.className = 'csp-toggle-row';
  flowPressureRow.append(flowPressure.box, flowPressure.label);
  flowPressure.box.addEventListener('change', () => {
    setBrushSettings({ pressureFlow: flowPressure.box.checked });
  });
  flowBox.append(flowHeader, flowSlider, flowPressureRow);
  propBody.appendChild(flowBox);

  // 4. Hardness (Dureza: 5 tactile dots)
  const hardnessBox = document.createElement('div');
  hardnessBox.className = 'prop-row-box';
  const hardnessHeader = document.createElement('div');
  hardnessHeader.className = 'prop-row-header';
  hardnessHeader.innerHTML = `
    <span class="prop-label">Dureza</span>
    <span class="prop-value" id="hardness-val">100%</span>
  `;
  const hardnessDotsContainer = document.createElement('div');
  hardnessDotsContainer.className = 'csp-hardness-dots-container';
  const hardnessSteps = [
    { val: 0.1, label: 'Muy suave' },
    { val: 0.35, label: 'Suave' },
    { val: 0.6, label: 'Medio' },
    { val: 0.8, label: 'Firme' },
    { val: 1.0, label: 'Duro' },
  ];
  const hardnessButtons = hardnessSteps.map((step, idx) => {
    const dbtn = document.createElement('button');
    dbtn.className = 'csp-hardness-dot-btn';
    dbtn.title = step.label;
    dbtn.innerHTML = `<span class="dot-preview" style="transform: scale(${0.4 + idx * 0.15});"></span>`;
    dbtn.addEventListener('click', () => {
      setBrushSettings({ hardness: step.val });
    });
    hardnessDotsContainer.appendChild(dbtn);
    return dbtn;
  });
  hardnessBox.append(hardnessHeader, hardnessDotsContainer);
  propBody.appendChild(hardnessBox);

  // 5. Stabilization (Estabilización: 0 to 10)
  const stabBox = document.createElement('div');
  stabBox.className = 'prop-row-box';
  const stabHeader = document.createElement('div');
  stabHeader.className = 'prop-row-header';
  stabHeader.innerHTML = `
    <span class="prop-label">Estabilización</span>
    <span class="prop-value" id="stab-val">5</span>
  `;
  const stabSlider = document.createElement('input');
  stabSlider.type = 'range';
  stabSlider.className = 'csp-slider';
  stabSlider.min = '0';
  stabSlider.max = '10';
  stabSlider.step = '1';
  stabSlider.addEventListener('input', () => {
    setBrushSettings({ stabilization: Number(stabSlider.value) });
  });
  stabBox.append(stabHeader, stabSlider);
  propBody.appendChild(stabBox);

  // 6. Pressure-driven size: toggle + minimum size (%)
  const psizeBox = inkBox();
  const psizeHeader = makePropHeader('Tamaño mínimo por presión', '15%');
  const psize = makeCheckbox('psize-check', 'Tamaño por presión');
  const psizeRow = document.createElement('div');
  psizeRow.className = 'csp-toggle-row';
  psizeRow.append(psize.box, psize.label);
  const psizeSlider = makeSlider('0', '100', '1');
  psize.box.addEventListener('change', () => setBrushSettings({ pressureSize: psize.box.checked }));
  psizeSlider.addEventListener('input', () => {
    setBrushSettings({ minSizeRatio: Number(psizeSlider.value) / 100 });
  });
  psizeBox.append(psizeHeader.header, psizeRow, psizeSlider);
  propBody.appendChild(psizeBox);

  // 7. Starting & Ending taper (afinado de puntas)
  const taperBox = inkBox();
  const taperStartHeader = makePropHeader('Afinado de inicio', '0 px');
  const taperStartSlider = makeSlider('0', '60', '1');
  taperStartSlider.addEventListener('input', () => {
    setBrushSettings({ taperStart: Number(taperStartSlider.value) });
  });
  const taperEndHeader = makePropHeader('Afinado de fin', '0 px');
  const taperEndSlider = makeSlider('0', '80', '1');
  taperEndSlider.addEventListener('input', () => {
    setBrushSettings({ taperEnd: Number(taperEndSlider.value) });
  });
  taperBox.append(taperStartHeader.header, taperStartSlider, taperEndHeader.header, taperEndSlider);
  propBody.appendChild(taperBox);

  // 8. Tip shape
  const tipBox = inkBox();
  const tipLabel = document.createElement('span');
  tipLabel.className = 'prop-label';
  tipLabel.textContent = 'Forma de punta';
  const tipSeg = makeSegGroup<TipShape>(TIP_SHAPES, (id) => setBrushSettings({ tipShape: id }));
  tipBox.append(tipLabel, tipSeg.group);
  propBody.appendChild(tipBox);

  // 9. Anti-aliasing (suavizado de bordes)
  const aaBox = inkBox();
  const aaLabel = document.createElement('span');
  aaLabel.className = 'prop-label';
  aaLabel.textContent = 'Suavizado (anti-aliasing)';
  const aaSeg = makeSegGroup<AntiAliasingLevel>(AA_LEVELS, (id) => setBrushSettings({ antiAliasing: id }));
  aaBox.append(aaLabel, aaSeg.group);
  propBody.appendChild(aaBox);

  // 10. Tip roundness & angle
  const roundBox = inkBox();
  const roundHeader = makePropHeader('Achatamiento de punta', '100%');
  const roundSlider = makeSlider('10', '100', '1');
  roundSlider.addEventListener('input', () => {
    setBrushSettings({ tipRoundness: Number(roundSlider.value) / 100 });
  });
  roundBox.append(roundHeader.header, roundSlider);
  propBody.appendChild(roundBox);

  const angleBox = inkBox();
  const angleHeader = makePropHeader('Ángulo de punta', '0°');
  const angleSlider = makeSlider('0', '180', '1');
  angleSlider.addEventListener('input', () => {
    setBrushSettings({ tipAngle: Number(angleSlider.value) });
  });
  angleBox.append(angleHeader.header, angleSlider);
  propBody.appendChild(angleBox);

  // 11. Tolerance (Bucket only)
  const tolBox = document.createElement('div');
  tolBox.className = 'prop-row-box bucket-only';
  const tolHeader = document.createElement('div');
  tolHeader.className = 'prop-row-header';
  tolHeader.innerHTML = `
    <span class="prop-label">Tolerancia de color</span>
    <span class="prop-value" id="tol-val">20%</span>
  `;
  const tolSlider = document.createElement('input');
  tolSlider.type = 'range';
  tolSlider.className = 'csp-slider';
  tolSlider.min = '0';
  tolSlider.max = '100';
  tolSlider.addEventListener('input', () => {
    setBrushSettings({ tolerance: Number(tolSlider.value) });
  });
  tolBox.append(tolHeader, tolSlider);
  propBody.appendChild(tolBox);

  // 12. Shape Controls (Shape tool only)
  const shapeBox = document.createElement('div');
  shapeBox.className = 'prop-row-box shape-only';

  const shapeTypeLabel = document.createElement('span');
  shapeTypeLabel.className = 'prop-label';
  shapeTypeLabel.textContent = 'Tipo de figura';
  shapeBox.appendChild(shapeTypeLabel);

  const shapeTypeGroup = document.createElement('div');
  shapeTypeGroup.className = 'csp-seg-group';
  const shapeTypes: { id: ShapeType; label: string }[] = [
    { id: 'line', label: 'Línea' },
    { id: 'rectangle', label: 'Rect' },
    { id: 'ellipse', label: 'Elipse' },
  ];
  const shapeBtns = new Map<ShapeType, HTMLButtonElement>();
  for (const st of shapeTypes) {
    const sbtn = document.createElement('button');
    sbtn.className = 'csp-seg-btn';
    sbtn.textContent = st.label;
    sbtn.addEventListener('click', () => setBrushSettings({ shapeType: st.id }));
    shapeTypeGroup.appendChild(sbtn);
    shapeBtns.set(st.id, sbtn);
  }
  shapeBox.appendChild(shapeTypeGroup);

  const shapeFillLabel = document.createElement('span');
  shapeFillLabel.className = 'prop-label';
  shapeFillLabel.style.marginTop = '6px';
  shapeFillLabel.textContent = 'Modo de relleno';
  shapeBox.appendChild(shapeFillLabel);

  const shapeFillGroup = document.createElement('div');
  shapeFillGroup.className = 'csp-seg-group';
  const fillModes: { id: ShapeFillMode; label: string }[] = [
    { id: 'stroke', label: 'Contorno' },
    { id: 'fill', label: 'Relleno' },
  ];
  const fillBtns = new Map<ShapeFillMode, HTMLButtonElement>();
  for (const fm of fillModes) {
    const fbtn = document.createElement('button');
    fbtn.className = 'csp-seg-btn';
    fbtn.textContent = fm.label;
    fbtn.addEventListener('click', () => setBrushSettings({ shapeFill: fm.id }));
    shapeFillGroup.appendChild(fbtn);
    fillBtns.set(fm.id, fbtn);
  }
  shapeBox.appendChild(shapeFillGroup);

  propBody.appendChild(shapeBox);

  propSection.appendChild(propBody);
  dock.appendChild(propSection);

  // --- Section 3: Color Palette (Círculo de Colores / Muestras) ---
  const colorSection = document.createElement('div');
  colorSection.className = 'dock-section color-section';

  const colorHeader = document.createElement('div');
  colorHeader.className = 'dock-section-header';
  colorHeader.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 0 0 20v-4a6 6 0 0 1 0-12V2z" fill="currentColor"/>
    </svg>
    <span class="color-section-title">Color y Muestras</span>
  `;
  colorSection.appendChild(colorHeader);

  const colorBody = document.createElement('div');
  colorBody.className = 'dock-section-body';

  // Active color preview & Hex picker row
  const colorPickerRow = document.createElement('div');
  colorPickerRow.className = 'csp-color-picker-row';

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.className = 'csp-color-input';
  colorInput.title = 'Abrir selector de color nativo';
  colorInput.addEventListener('input', () => {
    const st = getToolState();
    if (st.activeColorSlot === 'primary') {
      setPrimaryColor(colorInput.value);
    } else {
      setSecondaryColor(colorInput.value);
    }
  });

  const hexInput = document.createElement('input');
  hexInput.type = 'text';
  hexInput.className = 'csp-hex-input';
  hexInput.maxLength = 7;
  hexInput.placeholder = '#000000';
  hexInput.addEventListener('change', () => {
    let val = hexInput.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      const st = getToolState();
      if (st.activeColorSlot === 'primary') {
        setPrimaryColor(val);
      } else {
        setSecondaryColor(val);
      }
    }
  });

  const slotBadge = document.createElement('span');
  slotBadge.className = 'csp-slot-badge';
  slotBadge.textContent = 'Principal';

  colorPickerRow.append(colorInput, hexInput, slotBadge);
  colorBody.appendChild(colorPickerRow);

  // Recent History Swatches Grid
  const historyGrid = document.createElement('div');
  historyGrid.className = 'csp-history-grid';
  colorBody.appendChild(historyGrid);

  colorSection.appendChild(colorBody);
  dock.appendChild(colorSection);

  container.appendChild(dock);

  // --- 3. Synchronize View with State ---
  const sync = (state: ToolState): void => {
    // 1. Tool buttons active state
    for (const [id, button] of toolButtons) {
      button.classList.toggle('active', state.tool === id);
    }

    // 2. Column 2 Drawer open/close state
    dock.classList.toggle('open', state.propertiesOpen);
    drawerToggleBtn.classList.toggle('active', state.propertiesOpen);
    drawerToggleBtn.innerHTML = state.propertiesOpen
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

    // 3. Update CSS variable on document for timeline docking offset
    document.documentElement.style.setProperty(
      '--left-dock-width',
      state.propertiesOpen ? '278px' : '48px'
    );

    // 4. Color widgets in Column 1
    primarySwatch.style.background = state.primaryColor;
    secondarySwatch.style.background = state.secondaryColor;
    primarySwatch.classList.toggle('active-slot', state.activeColorSlot === 'primary' && !state.isTransparentColor);
    secondarySwatch.classList.toggle('active-slot', state.activeColorSlot === 'secondary' && !state.isTransparentColor);
    transparentTile.classList.toggle('active', state.isTransparentColor);

    // 5. Render Subtools for active tool
    const subtools = getSubToolsForTool(state.tool);
    const activeSub = subtools.find((s) => s.id === state.activeSubToolId);
    subtoolList.innerHTML = '';
    for (const sub of subtools) {
      const item = document.createElement('div');
      item.className = 'csp-subtool-item';
      item.classList.toggle('active', sub.id === state.activeSubToolId);
      item.classList.toggle('custom', !!sub.custom);

      const dot = document.createElement('span');
      dot.className = 'csp-subtool-dot';
      item.appendChild(dot);

      const name = document.createElement('span');
      name.className = 'csp-subtool-name';
      name.textContent = sub.name;
      item.appendChild(name);

      item.title = sub.description;
      item.addEventListener('click', () => {
        selectSubTool(sub.id);
      });
      subtoolList.appendChild(item);
    }

    // Sub Tool CRUD availability
    resetBtn.disabled = !activeSub;
    deleteBtn.disabled = !activeSub || !activeSub.custom;

    // 6. Tool Properties values
    const currentActiveColor = state.activeColorSlot === 'primary' ? state.primaryColor : state.secondaryColor;
    colorInput.value = currentActiveColor;
    hexInput.value = currentActiveColor.toUpperCase();
    slotBadge.textContent = state.activeColorSlot === 'primary' ? 'Principal' : 'Secundario';
    if (state.isTransparentColor) {
      slotBadge.textContent = 'Transparente';
    }

    sizeSlider.value = String(Math.round(state.brush.size));
    const sizeValNode = propBody.querySelector('#size-val');
    if (sizeValNode) sizeValNode.textContent = `${Math.round(state.brush.size)} px`;

    quickSizeRow.querySelectorAll('.csp-quick-size-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.textContent) === Math.round(state.brush.size));
    });

    opacitySlider.value = String(Math.round(state.brush.opacity * 100));
    const opacValNode = propBody.querySelector('#opacity-val');
    if (opacValNode) opacValNode.textContent = `${Math.round(state.brush.opacity * 100)}%`;

    flowSlider.value = String(Math.round(state.brush.flow * 100));
    const flowValNode = propBody.querySelector('#flow-val');
    if (flowValNode) flowValNode.textContent = `${Math.round(state.brush.flow * 100)}%`;
    flowPressure.box.checked = state.brush.pressureFlow;

    const hardValNode = propBody.querySelector('#hardness-val');
    if (hardValNode) hardValNode.textContent = `${Math.round(state.brush.hardness * 100)}%`;
    hardnessButtons.forEach((btn, idx) => {
      const step = hardnessSteps[idx];
      btn.classList.toggle('active', Math.abs(state.brush.hardness - step.val) < 0.12);
    });

    stabSlider.value = String(Math.round(state.brush.stabilization));
    const stabValNode = propBody.querySelector('#stab-val');
    if (stabValNode) stabValNode.textContent = String(Math.round(state.brush.stabilization));

    // Pressure size controls
    psize.box.checked = state.brush.pressureSize;
    psizeSlider.value = String(Math.round(state.brush.minSizeRatio * 100));
    psizeSlider.disabled = !state.brush.pressureSize;
    psizeHeader.value.textContent = `${Math.round(state.brush.minSizeRatio * 100)}%`;

    // Taper controls
    taperStartSlider.value = String(Math.round(state.brush.taperStart));
    taperStartHeader.value.textContent = `${Math.round(state.brush.taperStart)} px`;
    taperEndSlider.value = String(Math.round(state.brush.taperEnd));
    taperEndHeader.value.textContent = `${Math.round(state.brush.taperEnd)} px`;

    // Tip shape & anti-aliasing
    for (const [id, btn] of tipSeg.buttons) {
      btn.classList.toggle('active', state.brush.tipShape === id);
    }
    for (const [id, btn] of aaSeg.buttons) {
      btn.classList.toggle('active', state.brush.antiAliasing === id);
    }
    roundSlider.value = String(Math.round(state.brush.tipRoundness * 100));
    roundHeader.value.textContent = `${Math.round(state.brush.tipRoundness * 100)}%`;
    angleSlider.value = String(Math.round(state.brush.tipAngle));
    angleHeader.value.textContent = `${Math.round(state.brush.tipAngle)}°`;

    // Show/hide tool specific property boxes
    const isInkTool = state.tool === 'pen' || state.tool === 'brush' || state.tool === 'eraser';
    for (const el of inkOnlyEls) {
      el.style.display = isInkTool ? 'flex' : 'none';
    }
    if (isInkTool) queuePreview();

    tolBox.style.display = state.tool === 'bucket' ? 'block' : 'none';
    tolSlider.value = String(Math.round(state.brush.tolerance));
    const tolValNode = propBody.querySelector('#tol-val');
    if (tolValNode) tolValNode.textContent = `${Math.round(state.brush.tolerance)}%`;

    shapeBox.style.display = state.tool === 'shape' ? 'block' : 'none';
    for (const [id, btn] of shapeBtns) {
      btn.classList.toggle('active', state.brush.shapeType === id);
    }
    for (const [id, btn] of fillBtns) {
      btn.classList.toggle('active', state.brush.shapeFill === id);
    }

    // 7. Render Color History Swatches
    historyGrid.innerHTML = '';
    for (const c of state.colorHistory) {
      const chip = document.createElement('div');
      chip.className = 'csp-history-chip';
      chip.style.backgroundColor = c;
      chip.title = c.toUpperCase();
      chip.classList.toggle('active', c.toLowerCase() === currentActiveColor.toLowerCase());
      chip.addEventListener('click', () => {
        if (state.activeColorSlot === 'primary') {
          setPrimaryColor(c);
        } else {
          setSecondaryColor(c);
        }
      });
      historyGrid.appendChild(chip);
    }
  };

  sync(getToolState());
  subscribeTools(sync);
}
