import type {
  AntiAliasingLevel,
  BoneToolMode,
  BrushPropKey,
  ColorTabId,
  PreviewBgMode,
  ShapeFillMode,
  ShapeType,
  SubTool,
  TipShape,
  ToolId,
  ToolState,
} from './toolState';
import {
  getToolState,
  getSubToolsForTool,
  getActiveSubTool,
  createCustomSubTool,
  deleteSubTool,
  duplicateSubTool,
  resetSubTool,
  selectSubTool,
  setActiveColorSlot,
  setAutoKeyBones,
  setBoneToolMode,
  setBrushSettings,
  setPrimaryColor,
  setSecondaryColor,
  setShowBonesOverlay,
  setTool,
  subscribeTools,
  swapColors,
  toggleProperties,
  toggleTransparentColor,
  toggleVisibleProperty,
  setPreviewBgMode,
  setColorTab,
  setActiveColorSet,
  addColorToActiveSet,
  removeColorFromActiveSet,
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToHex,
  computeColorHarmonies,
} from './toolState';
import type { TimelineManager } from '../animation/timelineManager';
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
    id: 'bone',
    label: 'Huesos 2D (Rig & Pose)',
    shortcut: 'J',
    icon: '<circle cx="6" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="18" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="8,8 13,9.5 9.5,13" fill="currentColor"/>',
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
  timeline?: TimelineManager;
}

// ---------------------------------------------------------------------------
// Reusable Custom Draggable Scrollbar Container (Clip Studio Paint Style)
// ---------------------------------------------------------------------------
interface CustomScrollContainer {
  wrap: HTMLDivElement;
  list: HTMLDivElement;
  scrollbar: HTMLDivElement;
  thumb: HTMLDivElement;
  update: () => void;
}

function createCustomScrollContainer(extraWrapClass = ''): CustomScrollContainer {
  const wrap = document.createElement('div');
  wrap.className = `csp-scroll-wrap ${extraWrapClass}`;

  const list = document.createElement('div');
  list.className = 'csp-scroll-list';

  const scrollbar = document.createElement('div');
  scrollbar.className = 'csp-custom-scrollbar';

  const thumb = document.createElement('div');
  thumb.className = 'csp-custom-scroll-thumb';
  scrollbar.appendChild(thumb);

  wrap.append(list, scrollbar);

  const update = (): void => {
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const scrollT = list.scrollTop;

    if (scrollH <= clientH + 2) {
      scrollbar.classList.add('hidden');
      return;
    }
    scrollbar.classList.remove('hidden');

    const thumbH = Math.max(20, (clientH / scrollH) * clientH);
    const maxScroll = scrollH - clientH;
    const maxTop = clientH - thumbH;
    const top = maxScroll > 0 ? (scrollT / maxScroll) * maxTop : 0;

    thumb.style.height = `${Math.round(thumbH)}px`;
    thumb.style.transform = `translateY(${Math.round(top)}px)`;
  };

  list.addEventListener('scroll', update, { passive: true });

  let isDragging = false;
  let dragStartY = 0;
  let dragStartScrollTop = 0;

  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    dragStartY = e.clientY;
    dragStartScrollTop = list.scrollTop;
    thumb.classList.add('dragging');
    thumb.setPointerCapture(e.pointerId);
  });

  thumb.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dy = e.clientY - dragStartY;
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const thumbH = Math.max(20, (clientH / scrollH) * clientH);
    const maxScroll = scrollH - clientH;
    const maxTop = clientH - thumbH;
    if (maxTop > 0) {
      list.scrollTop = dragStartScrollTop + (dy / maxTop) * maxScroll;
    }
  });

  const stopDrag = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    thumb.classList.remove('dragging');
    try {
      thumb.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  thumb.addEventListener('pointerup', stopDrag);
  thumb.addEventListener('pointercancel', stopDrag);

  scrollbar.addEventListener('pointerdown', (e) => {
    if (e.target === thumb) return;
    const rect = scrollbar.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const targetRatio = Math.max(0, Math.min(1, clickY / clientH));
    list.scrollTop = targetRatio * (scrollH - clientH);
  });

  return { wrap, list, scrollbar, thumb, update };
}

// ---------------------------------------------------------------------------
// Sub Tool Detail Modal (Clip Studio Paint Wrench Window)
// ---------------------------------------------------------------------------
let activeDetailModal: HTMLElement | null = null;

function closeSubToolDetailModal(): void {
  if (activeDetailModal) {
    activeDetailModal.remove();
    activeDetailModal = null;
  }
}

function openSubToolDetailModal(subTool: SubTool): void {
  closeSubToolDetailModal();

  const backdrop = document.createElement('div');
  backdrop.className = 'csp-modal-backdrop';
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSubToolDetailModal();
  });

  const win = document.createElement('div');
  win.className = 'csp-subtool-detail-window';

  // Window Header
  const header = document.createElement('div');
  header.className = 'csp-subtool-detail-header';
  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="color:#38bdf8;">🔧</span>
      <span>Detalle de subherramienta — <strong>${subTool.name}</strong></span>
    </div>
    <button class="csp-subtool-action-btn" id="csp-detail-close" title="Cerrar (Esc)">✕</button>
  `;
  header.querySelector('#csp-detail-close')?.addEventListener('click', closeSubToolDetailModal);
  win.appendChild(header);

  // Window Body
  const body = document.createElement('div');
  body.className = 'csp-subtool-detail-body';

  const catsCol = document.createElement('div');
  catsCol.className = 'csp-subtool-detail-cats';

  const contentCol = document.createElement('div');
  contentCol.className = 'csp-subtool-detail-content';

  type CatId = 'size' | 'ink' | 'smooth' | 'tip' | 'stroke' | 'taper' | 'correction';
  const categories: { id: CatId; label: string }[] = [
    { id: 'size', label: 'Tamaño del pincel' },
    { id: 'ink', label: 'Tinta' },
    { id: 'smooth', label: 'Suavizado' },
    { id: 'tip', label: 'Punta del pincel' },
    { id: 'stroke', label: 'Trazo' },
    { id: 'taper', label: 'Inicio y fin' },
    { id: 'correction', label: 'Corrección' },
  ];

  let activeCat: CatId = 'size';
  const catButtons = new Map<CatId, HTMLButtonElement>();

  function makeEyeButton(propKey: BrushPropKey): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'csp-eye-pin-btn';
    const isPinned = getToolState().visibleProperties.includes(propKey);
    btn.classList.toggle('pinned', isPinned);
    btn.title = isPinned
      ? 'Visible en la barra lateral. Haz clic para ocultar.'
      : 'Oculto de la barra lateral. Haz clic para fijar (👁).';
    btn.innerHTML = `<span style="font-size:12px;">${isPinned ? '👁' : '◦'}</span>`;
    btn.addEventListener('click', () => {
      toggleVisibleProperty(propKey);
      const nextPinned = getToolState().visibleProperties.includes(propKey);
      btn.classList.toggle('pinned', nextPinned);
      btn.title = nextPinned
        ? 'Visible en la barra lateral. Haz clic para ocultar.'
        : 'Oculto de la barra lateral. Haz clic para fijar (👁).';
      btn.innerHTML = `<span style="font-size:12px;">${nextPinned ? '👁' : '◦'}</span>`;
    });
    return btn;
  }

  function renderCategory(cat: CatId): void {
    contentCol.innerHTML = '';
    const st = getToolState();
    const b = st.brush;

    if (cat === 'size') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('size');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Tamaño del pincel</span>
          <span class="prop-value" id="dt-size-val">${Math.round(b.size)} px</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '1';
      slider1.max = '200';
      slider1.value = String(Math.round(b.size));
      slider1.addEventListener('input', () => {
        setBrushSettings({ size: Number(slider1.value) });
        const valNode = main1.querySelector('#dt-size-val');
        if (valNode) valNode.textContent = `${slider1.value} px`;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('pressureSize');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Tamaño mínimo por presión</span>
          <span class="prop-value" id="dt-psize-val">${Math.round(b.minSizeRatio * 100)}%</span>
        </div>
      `;
      const chkWrap = document.createElement('div');
      chkWrap.className = 'csp-toggle-row';
      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.className = 'csp-checkbox';
      chk.id = 'dt-psize-chk';
      chk.checked = b.pressureSize;
      const chkLbl = document.createElement('label');
      chkLbl.className = 'csp-check-label';
      chkLbl.htmlFor = 'dt-psize-chk';
      chkLbl.textContent = 'Activar variación de tamaño por presión';
      chkWrap.append(chk, chkLbl);

      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '0';
      slider2.max = '100';
      slider2.value = String(Math.round(b.minSizeRatio * 100));
      slider2.disabled = !b.pressureSize;

      chk.addEventListener('change', () => {
        setBrushSettings({ pressureSize: chk.checked });
        slider2.disabled = !chk.checked;
      });
      slider2.addEventListener('input', () => {
        setBrushSettings({ minSizeRatio: Number(slider2.value) / 100 });
        const valNode = main2.querySelector('#dt-psize-val');
        if (valNode) valNode.textContent = `${slider2.value}%`;
      });
      main2.append(chkWrap, slider2);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);
    } else if (cat === 'ink') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('opacity');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Opacidad general</span>
          <span class="prop-value" id="dt-op-val">${Math.round(b.opacity * 100)}%</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '1';
      slider1.max = '100';
      slider1.value = String(Math.round(b.opacity * 100));
      slider1.addEventListener('input', () => {
        setBrushSettings({ opacity: Number(slider1.value) / 100 });
        const val = main1.querySelector('#dt-op-val');
        if (val) val.textContent = `${slider1.value}%`;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('flow');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Densidad de pintura / Flujo</span>
          <span class="prop-value" id="dt-fl-val">${Math.round(b.flow * 100)}%</span>
        </div>
      `;
      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '1';
      slider2.max = '100';
      slider2.value = String(Math.round(b.flow * 100));
      slider2.addEventListener('input', () => {
        setBrushSettings({ flow: Number(slider2.value) / 100 });
        const val = main2.querySelector('#dt-fl-val');
        if (val) val.textContent = `${slider2.value}%`;
      });

      const chkWrap2 = document.createElement('div');
      chkWrap2.className = 'csp-toggle-row';
      const chk2 = document.createElement('input');
      chk2.type = 'checkbox';
      chk2.className = 'csp-checkbox';
      chk2.id = 'dt-fl-chk';
      chk2.checked = b.pressureFlow;
      const chkLbl2 = document.createElement('label');
      chkLbl2.className = 'csp-check-label';
      chkLbl2.htmlFor = 'dt-fl-chk';
      chkLbl2.textContent = 'Densidad según presión de pluma';
      chkWrap2.append(chk2, chkLbl2);
      chk2.addEventListener('change', () => {
        setBrushSettings({ pressureFlow: chk2.checked });
      });

      main2.append(slider2, chkWrap2);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);
    } else if (cat === 'smooth') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('stabilization');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Estabilización de trazo</span>
          <span class="prop-value" id="dt-st-val">${Math.round(b.stabilization)}</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '0';
      slider1.max = '10';
      slider1.value = String(Math.round(b.stabilization));
      slider1.addEventListener('input', () => {
        setBrushSettings({ stabilization: Number(slider1.value) });
        const val = main1.querySelector('#dt-st-val');
        if (val) val.textContent = slider1.value;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('antiAliasing');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `<span class="prop-label">Suavizado (Anti-Aliasing)</span>`;
      const aaGroup = document.createElement('div');
      aaGroup.className = 'csp-seg-group';
      for (const aa of AA_LEVELS) {
        const btn = document.createElement('button');
        btn.className = `csp-seg-btn${b.antiAliasing === aa.id ? ' active' : ''}`;
        btn.textContent = aa.label;
        btn.addEventListener('click', () => {
          setBrushSettings({ antiAliasing: aa.id });
          renderCategory('smooth');
        });
        aaGroup.appendChild(btn);
      }
      main2.appendChild(aaGroup);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);
    } else if (cat === 'tip') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('tipShape');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `<span class="prop-label">Forma de la punta</span>`;
      const tipGroup = document.createElement('div');
      tipGroup.className = 'csp-seg-group';
      for (const ts of TIP_SHAPES) {
        const btn = document.createElement('button');
        btn.className = `csp-seg-btn${b.tipShape === ts.id ? ' active' : ''}`;
        btn.textContent = ts.label;
        btn.addEventListener('click', () => {
          setBrushSettings({ tipShape: ts.id });
          renderCategory('tip');
        });
        tipGroup.appendChild(btn);
      }
      main1.appendChild(tipGroup);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('roundness');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Achatamiento / Redondez</span>
          <span class="prop-value" id="dt-rn-val">${Math.round(b.tipRoundness * 100)}%</span>
        </div>
      `;
      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '10';
      slider2.max = '100';
      slider2.value = String(Math.round(b.tipRoundness * 100));
      slider2.addEventListener('input', () => {
        setBrushSettings({ tipRoundness: Number(slider2.value) / 100 });
        const val = main2.querySelector('#dt-rn-val');
        if (val) val.textContent = `${slider2.value}%`;
      });
      main2.appendChild(slider2);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);

      const row3 = document.createElement('div');
      row3.className = 'csp-detail-prop-row';
      const eye3 = makeEyeButton('angle');
      const main3 = document.createElement('div');
      main3.className = 'csp-detail-prop-main';
      main3.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Ángulo de inclinación</span>
          <span class="prop-value" id="dt-an-val">${Math.round(b.tipAngle)}°</span>
        </div>
      `;
      const slider3 = document.createElement('input');
      slider3.type = 'range';
      slider3.className = 'csp-slider';
      slider3.min = '0';
      slider3.max = '180';
      slider3.value = String(Math.round(b.tipAngle));
      slider3.addEventListener('input', () => {
        setBrushSettings({ tipAngle: Number(slider3.value) });
        const val = main3.querySelector('#dt-an-val');
        if (val) val.textContent = `${slider3.value}°`;
      });
      main3.appendChild(slider3);
      row3.append(eye3, main3);
      contentCol.appendChild(row3);
    } else if (cat === 'stroke') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('spacing');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Intervalo entre estampas (Espaciado)</span>
          <span class="prop-value" id="dt-sp-val">${Math.round(b.spacing * 100)}%</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '3';
      slider1.max = '50';
      slider1.value = String(Math.round(b.spacing * 100));
      slider1.addEventListener('input', () => {
        setBrushSettings({ spacing: Number(slider1.value) / 100 });
        const val = main1.querySelector('#dt-sp-val');
        if (val) val.textContent = `${slider1.value}%`;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);
    } else if (cat === 'taper') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('taper');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Afinado de inicio (Entrada)</span>
          <span class="prop-value" id="dt-tps-val">${Math.round(b.taperStart)} px</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '0';
      slider1.max = '60';
      slider1.value = String(Math.round(b.taperStart));
      slider1.addEventListener('input', () => {
        setBrushSettings({ taperStart: Number(slider1.value) });
        const val = main1.querySelector('#dt-tps-val');
        if (val) val.textContent = `${slider1.value} px`;
      });

      const header2 = document.createElement('div');
      header2.className = 'prop-row-header';
      header2.style.marginTop = '6px';
      header2.innerHTML = `
        <span class="prop-label">Afinado de fin (Salida)</span>
        <span class="prop-value" id="dt-tpe-val">${Math.round(b.taperEnd)} px</span>
      `;
      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '0';
      slider2.max = '80';
      slider2.value = String(Math.round(b.taperEnd));
      slider2.addEventListener('input', () => {
        setBrushSettings({ taperEnd: Number(slider2.value) });
        const val = header2.querySelector('#dt-tpe-val');
        if (val) val.textContent = `${slider2.value} px`;
      });

      main1.append(slider1, header2, slider2);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);
    } else {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('hardness');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Dureza de punta</span>
          <span class="prop-value" id="dt-hd-val">${Math.round(b.hardness * 100)}%</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '10';
      slider1.max = '100';
      slider1.value = String(Math.round(b.hardness * 100));
      slider1.addEventListener('input', () => {
        setBrushSettings({ hardness: Number(slider1.value) / 100 });
        const val = main1.querySelector('#dt-hd-val');
        if (val) val.textContent = `${slider1.value}%`;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);
    }
  }

  for (const c of categories) {
    const btn = document.createElement('button');
    btn.className = `csp-detail-cat-btn${c.id === activeCat ? ' active' : ''}`;
    btn.textContent = c.label;
    btn.addEventListener('click', () => {
      activeCat = c.id;
      for (const [id, b] of catButtons) {
        b.classList.toggle('active', id === activeCat);
      }
      renderCategory(activeCat);
    });
    catsCol.appendChild(btn);
    catButtons.set(c.id, btn);
  }

  body.append(catsCol, contentCol);
  win.appendChild(body);

  const footer = document.createElement('div');
  footer.className = 'csp-subtool-detail-footer';
  footer.innerHTML = `
    <button class="csp-seg-btn" id="dt-reset-btn" style="padding:4px 8px;">↺ Ajustes de fábrica</button>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:10px;color:#8c95a4;">👁 Haz clic en el ojo para fijar al panel lateral</span>
      <button class="csp-seg-btn active" id="dt-ok-btn" style="padding:4px 12px;font-weight:600;">Cerrar</button>
    </div>
  `;
  footer.querySelector('#dt-reset-btn')?.addEventListener('click', () => {
    resetSubTool(subTool.id);
    renderCategory(activeCat);
  });
  footer.querySelector('#dt-ok-btn')?.addEventListener('click', closeSubToolDetailModal);
  win.appendChild(footer);

  backdrop.appendChild(win);
  document.body.appendChild(backdrop);
  activeDetailModal = backdrop;

  renderCategory('size');

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSubToolDetailModal();
      window.removeEventListener('keydown', onKey);
    }
  };
  window.addEventListener('keydown', onKey);
}

// ---------------------------------------------------------------------------
// Main Tools View Mount
// ---------------------------------------------------------------------------
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

  // CSP Color Widget at Bottom of Column 1
  const colorWidget = document.createElement('div');
  colorWidget.className = 'csp-color-widget';
  colorWidget.title = 'Colores (X: Alternar principal/secundario, C: Color transparente)';

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

  const transparentTile = document.createElement('div');
  transparentTile.className = 'csp-transparent-tile';
  transparentTile.title = 'Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura';
  transparentTile.innerHTML = `<div class="csp-checkerboard"></div>`;
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

  // Load saved dock inner width (default 240px)
  const savedDockWidth = localStorage.getItem('oniri.dock.width');
  let currentDockInnerW = savedDockWidth ? Math.max(220, Math.min(480, Number(savedDockWidth))) : 240;
  document.documentElement.style.setProperty('--left-dock-inner-width', `${currentDockInnerW}px`);

  // Dock Width Resizer Handle on right border
  const dockWidthResizer = document.createElement('div');
  dockWidthResizer.className = 'csp-dock-width-resizer';
  dockWidthResizer.title = 'Arrastrar para cambiar el ancho de la barra lateral';

  let isDraggingDockW = false;
  let startDockX = 0;
  let startDockW = 240;

  dockWidthResizer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingDockW = true;
    startDockX = e.clientX;
    startDockW = dock.offsetWidth;
    dockWidthResizer.classList.add('dragging');
    dockWidthResizer.setPointerCapture(e.pointerId);
  });

  dockWidthResizer.addEventListener('pointermove', (e) => {
    if (!isDraggingDockW) return;
    const dx = e.clientX - startDockX;
    currentDockInnerW = Math.max(220, Math.min(480, startDockW + dx));
    document.documentElement.style.setProperty('--left-dock-inner-width', `${currentDockInnerW}px`);
    document.documentElement.style.setProperty('--left-dock-width', `${currentDockInnerW + 48}px`);
    localStorage.setItem('oniri.dock.width', String(currentDockInnerW));
    subtoolScroll.update();
    propScroll.update();
    colorScroll.update();
  });

  const stopDockWDrag = (e: PointerEvent) => {
    if (!isDraggingDockW) return;
    isDraggingDockW = false;
    dockWidthResizer.classList.remove('dragging');
    try {
      dockWidthResizer.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  dockWidthResizer.addEventListener('pointerup', stopDockWDrag);
  dockWidthResizer.addEventListener('pointercancel', stopDockWDrag);
  dock.appendChild(dockWidthResizer);

  // =========================================================================
  // Section 1: Sub Tool Palette (with bounded height & custom draggable scrollbar)
  // =========================================================================
  const subtoolSection = document.createElement('div');
  subtoolSection.className = 'dock-section subtool-section';

  const savedSubtoolH = localStorage.getItem('oniri.subtool.height');
  let currentSubtoolH = savedSubtoolH ? Math.max(70, Math.min(400, Number(savedSubtoolH))) : 140;
  subtoolSection.style.height = `${currentSubtoolH}px`;

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

  // Section 1 custom scroll container
  const subtoolScroll = createCustomScrollContainer('csp-subtool-scroll-wrap');
  subtoolSection.appendChild(subtoolScroll.wrap);
  dock.appendChild(subtoolSection);

  // --- Splitter 1: Between Subtools & Tool Properties ---
  const splitterSubProp = document.createElement('div');
  splitterSubProp.className = 'csp-dock-splitter';
  splitterSubProp.title = 'Arrastrar para cambiar el tamaño de Subherramientas y Propiedades';

  let isDraggingSplitter1 = false;
  let startSplitter1Y = 0;
  let startSubH = 140;

  splitterSubProp.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingSplitter1 = true;
    startSplitter1Y = e.clientY;
    startSubH = subtoolSection.offsetHeight;
    splitterSubProp.classList.add('dragging');
    splitterSubProp.setPointerCapture(e.pointerId);
  });

  splitterSubProp.addEventListener('pointermove', (e) => {
    if (!isDraggingSplitter1) return;
    const dy = e.clientY - startSplitter1Y;
    currentSubtoolH = Math.max(70, Math.min(400, startSubH + dy));
    subtoolSection.style.height = `${currentSubtoolH}px`;
    localStorage.setItem('oniri.subtool.height', String(currentSubtoolH));
    subtoolScroll.update();
    propScroll.update();
  });

  const stopSplitter1 = (e: PointerEvent) => {
    if (!isDraggingSplitter1) return;
    isDraggingSplitter1 = false;
    splitterSubProp.classList.remove('dragging');
    try {
      splitterSubProp.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  splitterSubProp.addEventListener('pointerup', stopSplitter1);
  splitterSubProp.addEventListener('pointercancel', stopSplitter1);
  dock.appendChild(splitterSubProp);

  // =========================================================================
  // Section 2: Tool Property Palette (with its own custom scrollbar & eye visibility)
  // =========================================================================
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

  // Section 2 custom scroll container (no overall sidebar scrollbar!)
  const propScroll = createCustomScrollContainer('csp-prop-scroll-wrap');
  const propBody = propScroll.list;

  const inkPropertyBoxes = new Map<BrushPropKey, HTMLElement>();

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

  // 0. Stroke Preview with distinct high-contrast background modes
  const PREVIEW_W = 210;
  const PREVIEW_H = 62;
  const previewDpr = Math.min(2, window.devicePixelRatio || 1);

  const previewBox = document.createElement('div');
  previewBox.className = 'prop-row-box ink-only';
  previewBox.style.display = 'none';

  const previewWrap = document.createElement('div');
  previewWrap.className = 'csp-preview-wrap';

  const previewCanvas = document.createElement('canvas');
  previewCanvas.className = 'csp-preview-canvas bg-paper';
  previewCanvas.width = Math.round(PREVIEW_W * previewDpr);
  previewCanvas.height = Math.round(PREVIEW_H * previewDpr);
  previewCanvas.title = 'Visión del pincel (Trazo dinámico con respuesta a presión)';
  previewWrap.appendChild(previewCanvas);

  const previewOverlayBar = document.createElement('div');
  previewOverlayBar.className = 'csp-preview-overlay-bar';

  const previewBgBtn = document.createElement('button');
  previewBgBtn.className = 'csp-preview-mini-btn';
  previewBgBtn.innerHTML = `<span>◐</span><span id="preview-bg-name">Papel</span>`;
  previewBgBtn.title = 'Cambiar fondo de vista previa (Papel / Damero / Oscuro)';
  previewBgBtn.addEventListener('click', () => {
    const cur = getToolState().previewBgMode;
    const next: PreviewBgMode = cur === 'paper' ? 'checker' : cur === 'checker' ? 'dark' : 'paper';
    setPreviewBgMode(next);
  });
  previewOverlayBar.appendChild(previewBgBtn);
  previewWrap.appendChild(previewOverlayBar);
  previewBox.appendChild(previewWrap);
  propBody.appendChild(previewBox);

  const drawStrokePreview = (): void => {
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;
    const st = getToolState();
    const b = st.brush;
    const mode = st.previewBgMode;

    previewCanvas.className = `csp-preview-canvas bg-${mode}`;
    const bgName = previewBox.querySelector('#preview-bg-name');
    if (bgName) {
      bgName.textContent = mode === 'paper' ? 'Papel' : mode === 'checker' ? 'Damero' : 'Oscuro';
    }

    ctx.setTransform(previewDpr, 0, 0, previewDpr, 0, 0);
    ctx.clearRect(0, 0, PREVIEW_W, PREVIEW_H);

    let renderColor = !b.color || b.color === 'transparent' ? '#111111' : b.color;
    if (mode === 'dark') {
      const rgb = hexToRgb(renderColor);
      const luminance = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      if (luminance < 65) {
        renderColor = '#f3f4f6';
      }
    }

    const pad = 12;
    const midY = PREVIEW_H / 2;
    const amp = PREVIEW_H / 2 - pad;
    const pathWidth = PREVIEW_W - pad * 2;
    const fit = Math.min(1, 30 / Math.max(1, b.size));
    const spacing = Math.min(0.5, Math.max(0.03, b.spacing));

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
      const pressure = 0.25 + 0.75 * Math.pow(Math.sin(Math.PI * t), 0.7);
      const realDiameter = brushDiameterAt(b, pressure, pos / Math.max(fit, 0.001));
      const diameter = Math.max(0.4, realDiameter * fit);
      const alpha = brushStampAlpha(b, pressure);
      const stamp = getStampTexture({
        diameter,
        hardness: b.hardness,
        color: renderColor,
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

  // 1. Brush Size Box
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
  inkPropertyBoxes.set('size', sizeBox);

  // 2. Opacity Box
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
  inkPropertyBoxes.set('opacity', opacityBox);

  // 3. Flow Box
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
  inkPropertyBoxes.set('flow', flowBox);

  // 4. Hardness Box
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
  inkPropertyBoxes.set('hardness', hardnessBox);

  // 5. Stabilization Box
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
  inkPropertyBoxes.set('stabilization', stabBox);

  // 6. Pressure Size Box
  const psizeBox = document.createElement('div');
  psizeBox.className = 'prop-row-box';
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
  inkPropertyBoxes.set('pressureSize', psizeBox);

  // 7. Taper Box
  const taperBox = document.createElement('div');
  taperBox.className = 'prop-row-box';
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
  inkPropertyBoxes.set('taper', taperBox);

  // 8. Tip Shape Box
  const tipBox = document.createElement('div');
  tipBox.className = 'prop-row-box';
  const tipLabel = document.createElement('span');
  tipLabel.className = 'prop-label';
  tipLabel.textContent = 'Forma de punta';
  const tipSeg = makeSegGroup<TipShape>(TIP_SHAPES, (id) => setBrushSettings({ tipShape: id }));
  tipBox.append(tipLabel, tipSeg.group);
  propBody.appendChild(tipBox);
  inkPropertyBoxes.set('tipShape', tipBox);

  // 9. Anti-aliasing Box
  const aaBox = document.createElement('div');
  aaBox.className = 'prop-row-box';
  const aaLabel = document.createElement('span');
  aaLabel.className = 'prop-label';
  aaLabel.textContent = 'Suavizado (anti-aliasing)';
  const aaSeg = makeSegGroup<AntiAliasingLevel>(AA_LEVELS, (id) => setBrushSettings({ antiAliasing: id }));
  aaBox.append(aaLabel, aaSeg.group);
  propBody.appendChild(aaBox);
  inkPropertyBoxes.set('antiAliasing', aaBox);

  // 10. Roundness & Angle Boxes
  const roundBox = document.createElement('div');
  roundBox.className = 'prop-row-box';
  const roundHeader = makePropHeader('Achatamiento de punta', '100%');
  const roundSlider = makeSlider('10', '100', '1');
  roundSlider.addEventListener('input', () => {
    setBrushSettings({ tipRoundness: Number(roundSlider.value) / 100 });
  });
  roundBox.append(roundHeader.header, roundSlider);
  propBody.appendChild(roundBox);
  inkPropertyBoxes.set('roundness', roundBox);

  const angleBox = document.createElement('div');
  angleBox.className = 'prop-row-box';
  const angleHeader = makePropHeader('Ángulo de punta', '0°');
  const angleSlider = makeSlider('0', '180', '1');
  angleSlider.addEventListener('input', () => {
    setBrushSettings({ tipAngle: Number(angleSlider.value) });
  });
  angleBox.append(angleHeader.header, angleSlider);
  propBody.appendChild(angleBox);
  inkPropertyBoxes.set('angle', angleBox);

  // Non-ink tools: Bucket tolerance
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

  // Non-ink tools: Shape controls
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

  // Non-ink tools: Bone Rigging & Animation
  const boneBox = document.createElement('div');
  boneBox.className = 'prop-row-box bone-only';
  boneBox.style.display = 'none';
  boneBox.style.flexDirection = 'column';
  boneBox.style.gap = '6px';

  const boneModeLabel = document.createElement('span');
  boneModeLabel.className = 'prop-label';
  boneModeLabel.textContent = 'Modo de Esqueleto 2D';
  boneBox.appendChild(boneModeLabel);

  const boneModes: { id: BoneToolMode; label: string }[] = [
    { id: 'rig', label: 'Rig / Crear' },
    { id: 'pose_fk', label: 'Posar FK' },
    { id: 'pose_ik', label: 'Posar IK' },
  ];
  const boneModeSeg = makeSegGroup<BoneToolMode>(boneModes, (id) => setBoneToolMode(id));
  boneBox.appendChild(boneModeSeg.group);

  const showBonesChk = makeCheckbox('show-bones-check', 'Mostrar huesos en el lienzo');
  const showBonesRow = document.createElement('div');
  showBonesRow.className = 'csp-toggle-row';
  showBonesRow.append(showBonesChk.box, showBonesChk.label);
  showBonesChk.box.addEventListener('change', () => {
    setShowBonesOverlay(showBonesChk.box.checked);
  });
  boneBox.appendChild(showBonesRow);

  const autoKeyChk = makeCheckbox('autokey-bones-check', 'Auto-Keyframe al posar');
  const autoKeyRow = document.createElement('div');
  autoKeyRow.className = 'csp-toggle-row';
  autoKeyRow.append(autoKeyChk.box, autoKeyChk.label);
  autoKeyChk.box.addEventListener('change', () => {
    setAutoKeyBones(autoKeyChk.box.checked);
  });
  boneBox.appendChild(autoKeyRow);

  const boneActionsGrid = document.createElement('div');
  boneActionsGrid.style.display = 'grid';
  boneActionsGrid.style.gridTemplateColumns = '1fr 1fr';
  boneActionsGrid.style.gap = '4px';
  boneActionsGrid.style.marginTop = '2px';

  const presetBtn = document.createElement('button');
  presetBtn.className = 'csp-seg-btn';
  presetBtn.style.gridColumn = '1 / -1';
  presetBtn.style.padding = '5px 6px';
  presetBtn.style.color = '#fbbf24';
  presetBtn.style.borderColor = 'rgba(251, 191, 36, 0.35)';
  presetBtn.textContent = '🧍 + Esqueleto Humanoide (Preset)';
  presetBtn.title = 'Generar un rig humanoide completo en el centro del lienzo';
  presetBtn.addEventListener('click', () => {
    options?.timeline?.createHumanoidPreset(800, 450);
  });

  const keyPoseBtn = document.createElement('button');
  keyPoseBtn.className = 'csp-seg-btn';
  keyPoseBtn.style.padding = '4px 6px';
  keyPoseBtn.textContent = '✦ Fijar Pose';
  keyPoseBtn.title = 'Registrar Keyframe de pose de esqueleto en el fotograma actual';
  keyPoseBtn.addEventListener('click', () => {
    const tm = options?.timeline;
    if (tm) tm.addOrUpdateBoneKeyframe(tm.settings.currentFrame, 'smooth');
  });

  const resetPoseBtn = document.createElement('button');
  resetPoseBtn.className = 'csp-seg-btn';
  resetPoseBtn.style.padding = '4px 6px';
  resetPoseBtn.textContent = '↺ Restablecer';
  resetPoseBtn.title = 'Restablecer la pose a la postura base (Bind Pose) en este fotograma';
  resetPoseBtn.addEventListener('click', () => {
    const tm = options?.timeline;
    if (tm) tm.resetBonePoseAtFrame(tm.settings.currentFrame);
  });

  boneActionsGrid.append(presetBtn, keyPoseBtn, resetPoseBtn);
  boneBox.appendChild(boneActionsGrid);

  const boneInspector = document.createElement('div');
  boneInspector.style.display = 'flex';
  boneInspector.style.flexDirection = 'column';
  boneInspector.style.gap = '5px';
  boneInspector.style.marginTop = '4px';
  boneInspector.style.paddingTop = '6px';
  boneInspector.style.borderTop = '1px solid rgba(255,255,255,0.08)';
  boneBox.appendChild(boneInspector);

  const boneHint = document.createElement('div');
  boneHint.style.fontSize = '10px';
  boneHint.style.lineHeight = '1.35';
  boneHint.style.color = '#9aa0a6';
  boneHint.style.marginTop = '2px';
  boneBox.appendChild(boneHint);
  propBody.appendChild(boneBox);

  // Tool Property Footer with Wrench Button (Detalle de subherramienta)
  const propFooter = document.createElement('div');
  propFooter.className = 'csp-prop-footer';

  const visibleCountLabel = document.createElement('span');
  visibleCountLabel.className = 'csp-prop-visible-count';
  visibleCountLabel.textContent = 'Propiedades fijadas';

  const wrenchBtn = document.createElement('button');
  wrenchBtn.className = 'csp-wrench-btn';
  wrenchBtn.innerHTML = `<span>🔧</span><span>Ajustes técnicos...</span>`;
  wrenchBtn.title = 'Abrir Detalle de Subherramienta (Configuración avanzada y fijar propiedades con 👁)';
  wrenchBtn.addEventListener('click', () => {
    const activeSub = getActiveSubTool();
    if (activeSub) openSubToolDetailModal(activeSub);
  });

  propFooter.append(visibleCountLabel, wrenchBtn);
  propBody.appendChild(propFooter);

  propSection.appendChild(propScroll.wrap);
  dock.appendChild(propSection);

  // --- Splitter 2: Between Tool Properties & Color ---
  const splitterPropColor = document.createElement('div');
  splitterPropColor.className = 'csp-dock-splitter';
  splitterPropColor.title = 'Arrastrar para cambiar el tamaño de Propiedades y Color';

  let isDraggingSplitter2 = false;
  let startSplitter2Y = 0;
  let startColorH = 270;

  splitterPropColor.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingSplitter2 = true;
    startSplitter2Y = e.clientY;
    startColorH = colorSection.offsetHeight;
    splitterPropColor.classList.add('dragging');
    splitterPropColor.setPointerCapture(e.pointerId);
  });

  splitterPropColor.addEventListener('pointermove', (e) => {
    if (!isDraggingSplitter2) return;
    const dy = e.clientY - startSplitter2Y;
    currentColorH = Math.max(120, Math.min(500, startColorH - dy));
    colorSection.style.height = `${currentColorH}px`;
    localStorage.setItem('oniri.color.height', String(currentColorH));
    colorScroll.update();
    propScroll.update();
  });

  const stopSplitter2 = (e: PointerEvent) => {
    if (!isDraggingSplitter2) return;
    isDraggingSplitter2 = false;
    splitterPropColor.classList.remove('dragging');
    try {
      splitterPropColor.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  splitterPropColor.addEventListener('pointerup', stopSplitter2);
  splitterPropColor.addEventListener('pointercancel', stopSplitter2);
  dock.appendChild(splitterPropColor);

  // =========================================================================
  // Section 3: Color Palette (4 Modes: Selector, RGB/HSV, Conjunto, Contraste)
  // =========================================================================
  const colorSection = document.createElement('div');
  colorSection.className = 'dock-section color-section';

  const savedColorH = localStorage.getItem('oniri.color.height');
  let currentColorH = savedColorH ? Math.max(120, Math.min(500, Number(savedColorH))) : 270;
  colorSection.style.height = `${currentColorH}px`;

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

  // Section 3 custom scroll container (no overall sidebar scrollbar!)
  const colorScroll = createCustomScrollContainer('csp-color-scroll-wrap');
  const colorBody = colorScroll.list;

  // 4 Mode Tabs
  const colorTabsBar = document.createElement('div');
  colorTabsBar.className = 'csp-color-tabs';

  const tabsDef: { id: ColorTabId; label: string }[] = [
    { id: 'picker', label: 'Círculo' },
    { id: 'rgb', label: 'RGB' },
    { id: 'set', label: 'Conjunto' },
    { id: 'harmony', label: 'Armonía' },
  ];
  const tabButtons = new Map<ColorTabId, HTMLButtonElement>();

  for (const t of tabsDef) {
    const btn = document.createElement('button');
    btn.className = 'csp-color-tab-btn';
    btn.textContent = t.label;
    btn.addEventListener('click', () => setColorTab(t.id));
    colorTabsBar.appendChild(btn);
    tabButtons.set(t.id, btn);
  }
  colorBody.appendChild(colorTabsBar);

  // Container for dynamic tab content
  const tabPanelsContainer = document.createElement('div');
  tabPanelsContainer.style.display = 'flex';
  tabPanelsContainer.style.flexDirection = 'column';
  tabPanelsContainer.style.gap = '8px';
  colorBody.appendChild(tabPanelsContainer);

  // Common quick row (Native color input, Hex input, Slot badge)
  const colorPickerRow = document.createElement('div');
  colorPickerRow.className = 'csp-color-picker-row';

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.className = 'csp-color-input';
  colorInput.title = 'Selector nativo del sistema';
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

  // Recent History Swatches Grid (always accessible at the bottom)
  const historyGrid = document.createElement('div');
  historyGrid.className = 'csp-history-grid';
  colorBody.appendChild(historyGrid);

  colorSection.appendChild(colorScroll.wrap);
  dock.appendChild(colorSection);

  container.appendChild(dock);

  // -------------------------------------------------------------------------
  // Interactive HSV Color Wheel Canvas (Tab 1: 'picker')
  // -------------------------------------------------------------------------
  const wheelWrap = document.createElement('div');
  wheelWrap.className = 'csp-color-wheel-wrap';

  const wheelCanvas = document.createElement('canvas');
  wheelCanvas.className = 'csp-color-wheel-canvas';
  const WHEEL_SIZE = 176;
  const wheelDpr = Math.min(2, window.devicePixelRatio || 1);
  wheelCanvas.width = Math.round(WHEEL_SIZE * wheelDpr);
  wheelCanvas.height = Math.round(WHEEL_SIZE * wheelDpr);
  wheelWrap.appendChild(wheelCanvas);

  let isDraggingWheelHue = false;
  let isDraggingWheelSV = false;

  const drawColorWheel = (curHex: string): void => {
    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(wheelDpr, 0, 0, wheelDpr, 0, 0);
    ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);

    const cx = WHEEL_SIZE / 2;
    const cy = WHEEL_SIZE / 2;
    const rOuter = WHEEL_SIZE / 2 - 4;
    const rInner = rOuter - 18;

    for (let angle = 0; angle < 360; angle += 1) {
      const rad0 = ((angle - 0.5) * Math.PI) / 180;
      const rad1 = ((angle + 1.5) * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, rad0, rad1);
      ctx.arc(cx, cy, rInner, rad1, rad0, true);
      ctx.closePath();
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    const { r, g, b } = hexToRgb(curHex);
    const { h, s, v } = rgbToHsv(r, g, b);

    const sqHalf = (rInner - 8) / Math.SQRT2;
    const sqX0 = cx - sqHalf;
    const sqY0 = cy - sqHalf;
    const sqSide = sqHalf * 2;

    const gradH = ctx.createLinearGradient(sqX0, 0, sqX0 + sqSide, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, `hsl(${Math.round(h)}, 100%, 50%)`);
    ctx.fillStyle = gradH;
    ctx.fillRect(sqX0, sqY0, sqSide, sqSide);

    const gradV = ctx.createLinearGradient(0, sqY0, 0, sqY0 + sqSide);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, '#000000');
    ctx.fillStyle = gradV;
    ctx.fillRect(sqX0, sqY0, sqSide, sqSide);

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(sqX0, sqY0, sqSide, sqSide);

    const hRad = (h * Math.PI) / 180;
    const hMarkerR = (rOuter + rInner) / 2;
    const hmx = cx + Math.cos(hRad) * hMarkerR;
    const hmy = cy + Math.sin(hRad) * hMarkerR;
    ctx.beginPath();
    ctx.arc(hmx, hmy, 4.5, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hmx, hmy, 5.5, 0, Math.PI * 2);
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1;
    ctx.stroke();

    const smx = sqX0 + s * sqSide;
    const smy = sqY0 + (1 - v) * sqSide;
    ctx.beginPath();
    ctx.arc(smx, smy, 4, 0, Math.PI * 2);
    ctx.strokeStyle = v > 0.5 ? '#111111' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(smx, smy, 5, 0, Math.PI * 2);
    ctx.strokeStyle = v > 0.5 ? '#ffffff' : '#111111';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleWheelPointer = (e: PointerEvent): void => {
    const rect = wheelCanvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const cx = WHEEL_SIZE / 2;
    const cy = WHEEL_SIZE / 2;
    const dist = Math.hypot(px - cx, py - cy);

    const rOuter = WHEEL_SIZE / 2 - 4;
    const rInner = rOuter - 18;
    const sqHalf = (rInner - 8) / Math.SQRT2;
    const sqX0 = cx - sqHalf;
    const sqY0 = cy - sqHalf;
    const sqSide = sqHalf * 2;

    const st = getToolState();
    const curHex = st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor;
    const { r, g, b } = hexToRgb(curHex);
    let { h, s, v } = rgbToHsv(r, g, b);

    if (isDraggingWheelHue || (!isDraggingWheelSV && dist >= rInner - 4 && dist <= rOuter + 6)) {
      isDraggingWheelHue = true;
      const angle = (Math.atan2(py - cy, px - cx) * 180) / Math.PI;
      h = (angle + 360) % 360;
    } else if (
      isDraggingWheelSV ||
      (!isDraggingWheelHue && px >= sqX0 - 4 && px <= sqX0 + sqSide + 4 && py >= sqY0 - 4 && py <= sqY0 + sqSide + 4)
    ) {
      isDraggingWheelSV = true;
      s = Math.max(0, Math.min(1, (px - sqX0) / sqSide));
      v = Math.max(0, Math.min(1, 1 - (py - sqY0) / sqSide));
    }

    const nextHex = hsvToHex(h, s, v);
    if (st.activeColorSlot === 'primary') {
      setPrimaryColor(nextHex);
    } else {
      setSecondaryColor(nextHex);
    }
  };

  wheelCanvas.addEventListener('pointerdown', (e) => {
    wheelCanvas.setPointerCapture(e.pointerId);
    handleWheelPointer(e);
  });
  wheelCanvas.addEventListener('pointermove', (e) => {
    if (isDraggingWheelHue || isDraggingWheelSV) {
      handleWheelPointer(e);
    }
  });
  const stopWheelDrag = (e: PointerEvent) => {
    isDraggingWheelHue = false;
    isDraggingWheelSV = false;
    try {
      wheelCanvas.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  wheelCanvas.addEventListener('pointerup', stopWheelDrag);
  wheelCanvas.addEventListener('pointercancel', stopWheelDrag);

  // -------------------------------------------------------------------------
  // RGB / HSV Sliders Panel (Tab 2: 'rgb')
  // -------------------------------------------------------------------------
  const rgbSlidersPanel = document.createElement('div');
  rgbSlidersPanel.className = 'csp-rgb-sliders-wrap';

  function createChannelSliderRow(
    tag: string,
    min: number,
    max: number,
    onChange: (val: number) => void,
  ): { row: HTMLDivElement; slider: HTMLInputElement; numInput: HTMLInputElement } {
    const row = document.createElement('div');
    row.className = 'csp-channel-row';

    const tagEl = document.createElement('span');
    tagEl.className = 'csp-channel-tag';
    tagEl.textContent = tag;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'csp-channel-slider';
    slider.min = String(min);
    slider.max = String(max);

    const numInput = document.createElement('input');
    numInput.type = 'number';
    numInput.className = 'csp-channel-num';
    numInput.min = String(min);
    numInput.max = String(max);

    slider.addEventListener('input', () => {
      const v = Number(slider.value);
      numInput.value = String(v);
      onChange(v);
    });

    numInput.addEventListener('change', () => {
      let v = Number(numInput.value);
      v = Math.max(min, Math.min(max, v));
      slider.value = String(v);
      onChange(v);
    });

    row.append(tagEl, slider, numInput);
    return { row, slider, numInput };
  }

  const redRow = createChannelSliderRow('R', 0, 255, (rVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(rVal, cur.g, cur.b);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });
  const greenRow = createChannelSliderRow('G', 0, 255, (gVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(cur.r, gVal, cur.b);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });
  const blueRow = createChannelSliderRow('B', 0, 255, (bVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(cur.r, cur.g, bVal);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });

  const hueRow = createChannelSliderRow('H', 0, 360, (hVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const { s, v } = rgbToHsv(cur.r, cur.g, cur.b);
    const hex = hsvToHex(hVal, s, v);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });
  const satRow = createChannelSliderRow('S', 0, 100, (sVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const { h, v } = rgbToHsv(cur.r, cur.g, cur.b);
    const hex = hsvToHex(h, sVal / 100, v);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });
  const valRow = createChannelSliderRow('V', 0, 100, (vVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const { h, s } = rgbToHsv(cur.r, cur.g, cur.b);
    const hex = hsvToHex(h, s, vVal / 100);
    if (st.activeColorSlot === 'primary') setPrimaryColor(hex);
    else setSecondaryColor(hex);
  });

  hueRow.slider.style.background =
    'linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)';

  rgbSlidersPanel.append(
    redRow.row,
    greenRow.row,
    blueRow.row,
    document.createElement('div'),
    hueRow.row,
    satRow.row,
    valRow.row,
  );

  // -------------------------------------------------------------------------
  // Color Set Palette Panel (Tab 3: 'set')
  // -------------------------------------------------------------------------
  const colorSetPanel = document.createElement('div');
  colorSetPanel.style.display = 'flex';
  colorSetPanel.style.flexDirection = 'column';
  colorSetPanel.style.gap = '6px';

  const setToolbar = document.createElement('div');
  setToolbar.className = 'csp-colorset-toolbar';

  const setSelect = document.createElement('select');
  setSelect.className = 'csp-colorset-select';
  setSelect.addEventListener('change', () => {
    setActiveColorSet(setSelect.value);
  });

  const addColorBtn = document.createElement('button');
  addColorBtn.className = 'csp-subtool-action-btn';
  addColorBtn.textContent = '+ Guardar';
  addColorBtn.title = 'Añadir color actual a este conjunto';
  addColorBtn.addEventListener('click', () => {
    const st = getToolState();
    const cur = st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor;
    addColorToActiveSet(cur);
  });

  setToolbar.append(setSelect, addColorBtn);
  colorSetPanel.appendChild(setToolbar);

  const setGrid = document.createElement('div');
  setGrid.className = 'csp-history-grid';
  setGrid.style.gridTemplateColumns = 'repeat(8, 1fr)';
  colorSetPanel.appendChild(setGrid);

  // -------------------------------------------------------------------------
  // Color Harmonies Panel (Tab 4: 'harmony')
  // -------------------------------------------------------------------------
  const harmonyPanel = document.createElement('div');
  harmonyPanel.className = 'csp-harmony-list';

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
      state.propertiesOpen ? `${currentDockInnerW + 48}px` : '48px',
    );

    // 4. Color widgets in Column 1
    primarySwatch.style.background = state.primaryColor;
    secondarySwatch.style.background = state.secondaryColor;
    primarySwatch.classList.toggle(
      'active-slot',
      state.activeColorSlot === 'primary' && !state.isTransparentColor,
    );
    secondarySwatch.classList.toggle(
      'active-slot',
      state.activeColorSlot === 'secondary' && !state.isTransparentColor,
    );
    transparentTile.classList.toggle('active', state.isTransparentColor);

    // 5. Render Subtools for active tool with custom scrollbar
    const subtools = getSubToolsForTool(state.tool);
    const activeSub = subtools.find((s) => s.id === state.activeSubToolId);
    subtoolScroll.list.innerHTML = '';

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

      if (sub.settings.size !== undefined) {
        const badge = document.createElement('span');
        badge.className = 'csp-subtool-size-badge';
        badge.textContent = `${Math.round(sub.settings.size)}`;
        item.appendChild(badge);
      }

      const gearBtn = document.createElement('button');
      gearBtn.className = 'csp-subtool-gear-btn';
      gearBtn.title = `Detalle de subherramienta (${sub.name})`;
      gearBtn.textContent = '🔧';
      gearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSubToolDetailModal(sub);
      });
      item.appendChild(gearBtn);

      item.title = sub.description;
      item.addEventListener('click', () => {
        selectSubTool(sub.id);
      });
      subtoolScroll.list.appendChild(item);
    }

    requestAnimationFrame(() => {
      subtoolScroll.update();
      propScroll.update();
      colorScroll.update();
    });

    resetBtn.disabled = !activeSub;
    deleteBtn.disabled = !activeSub || !activeSub.custom;

    // 6. Tool Properties values & visibility filtering
    const isBoneTool = state.tool === 'bone';
    const isInkTool = state.tool === 'pen' || state.tool === 'brush' || state.tool === 'eraser';

    previewBox.style.display = isInkTool ? 'block' : 'none';

    for (const [propKey, boxEl] of inkPropertyBoxes) {
      if (isInkTool) {
        const isPinned = state.visibleProperties.includes(propKey);
        boxEl.style.display = isPinned ? 'block' : 'none';
      } else {
        boxEl.style.display = 'none';
      }
    }

    visibleCountLabel.textContent = isInkTool
      ? `👁 ${state.visibleProperties.length} propiedades fijadas`
      : `${subtools.length} subherramientas`;

    if (isInkTool) queuePreview();

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

    psize.box.checked = state.brush.pressureSize;
    psizeSlider.value = String(Math.round(state.brush.minSizeRatio * 100));
    psizeSlider.disabled = !state.brush.pressureSize;
    psizeHeader.value.textContent = `${Math.round(state.brush.minSizeRatio * 100)}%`;

    taperStartSlider.value = String(Math.round(state.brush.taperStart));
    taperStartHeader.value.textContent = `${Math.round(state.brush.taperStart)} px`;
    taperEndSlider.value = String(Math.round(state.brush.taperEnd));
    taperEndHeader.value.textContent = `${Math.round(state.brush.taperEnd)} px`;

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

    boneBox.style.display = isBoneTool ? 'flex' : 'none';
    if (isBoneTool) {
      for (const [id, btn] of boneModeSeg.buttons) {
        btn.classList.toggle('active', state.boneMode === id);
      }
      showBonesChk.box.checked = state.showBonesOverlay;
      autoKeyChk.box.checked = state.autoKeyBones;

      if (state.boneMode === 'rig') {
        boneHint.textContent =
          'Rig: Clic y arrastra en vacío para crear hueso. Arrastra la punta/base para editar. Shift+clic en punta encadena hijo; Alt+clic crea raíz.';
      } else if (state.boneMode === 'pose_fk') {
        boneHint.textContent =
          'Posar FK: Arrastra el cuerpo de un hueso para rotarlo. Arrastra la base raíz (o Shift+arrastrar) para trasladar.';
      } else {
        boneHint.textContent =
          'Posar IK: Haz clic y arrastra el hueso extremo (mano, antebrazo, pie) para doblar la cadena de 2 huesos automáticamente.';
      }

      boneInspector.innerHTML = '';
      const tm = options?.timeline;
      if (tm) {
        const selectedBone = tm.bones.find((b) => b.id === tm.selectedBoneId) ?? null;
        if (selectedBone) {
          const titleRow = document.createElement('div');
          titleRow.className = 'prop-row-header';
          titleRow.innerHTML = `<span class="prop-label">Hueso activo</span><span class="prop-value" style="color:${selectedBone.color}">${selectedBone.name}</span>`;
          boneInspector.appendChild(titleRow);

          const nameInput = document.createElement('input');
          nameInput.type = 'text';
          nameInput.className = 'csp-hex-input';
          nameInput.style.width = '100%';
          nameInput.value = selectedBone.name;
          nameInput.title = 'Nombre del hueso';
          nameInput.addEventListener('change', () => {
            if (nameInput.value.trim()) {
              tm.renameBone(selectedBone.id, nameInput.value.trim());
            }
          });
          boneInspector.appendChild(nameInput);

          const parentRow = document.createElement('div');
          parentRow.style.display = 'flex';
          parentRow.style.alignItems = 'center';
          parentRow.style.gap = '4px';
          const parentLbl = document.createElement('span');
          parentLbl.className = 'prop-label';
          parentLbl.textContent = 'Padre:';
          const parentSel = document.createElement('select');
          parentSel.style.flex = '1';
          parentSel.style.background = '#1e1e1e';
          parentSel.style.color = '#e0e0e0';
          parentSel.style.border = '1px solid #3c3c3c';
          parentSel.style.borderRadius = '3px';
          parentSel.style.fontSize = '11px';
          parentSel.style.padding = '2px 4px';

          const rootOpt = document.createElement('option');
          rootOpt.value = '';
          rootOpt.textContent = '(Raíz / Ninguno)';
          parentSel.appendChild(rootOpt);
          for (const b of tm.bones) {
            if (b.id === selectedBone.id) continue;
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.name;
            if (b.id === selectedBone.parentId) opt.selected = true;
            parentSel.appendChild(opt);
          }
          parentSel.addEventListener('change', () => {
            tm.setBoneParent(selectedBone.id, parentSel.value || null);
          });
          parentRow.append(parentLbl, parentSel);
          boneInspector.appendChild(parentRow);

          const bBtns = document.createElement('div');
          bBtns.style.display = 'flex';
          bBtns.style.gap = '4px';

          const bendBtn = document.createElement('button');
          bendBtn.className = 'csp-seg-btn';
          bendBtn.style.flex = '1';
          bendBtn.textContent = `⇄ Codo IK (${selectedBone.ikBendPositive ? '+' : '-'})`;
          bendBtn.title = 'Invertir la dirección de flexión del codo/rodilla en Cinemática Inversa';
          bendBtn.addEventListener('click', () => {
            tm.toggleBoneIKBend(selectedBone.id);
          });

          const delBoneBtn = document.createElement('button');
          delBoneBtn.className = 'csp-seg-btn';
          delBoneBtn.style.color = '#f87171';
          delBoneBtn.textContent = '🗑 Eliminar';
          delBoneBtn.title = 'Eliminar este hueso';
          delBoneBtn.addEventListener('click', () => {
            tm.deleteBone(selectedBone.id);
          });

          bBtns.append(bendBtn, delBoneBtn);
          boneInspector.appendChild(bBtns);
        } else {
          const emptyMsg = document.createElement('span');
          emptyMsg.className = 'prop-label';
          emptyMsg.style.color = '#80868b';
          emptyMsg.textContent = `Huesos en escena: ${tm.bones.length} (Haz clic en un hueso para inspeccionarlo)`;
          boneInspector.appendChild(emptyMsg);
        }
      }
    }

    // 7. Color Section & 4 Modes
    const currentActiveColor =
      state.activeColorSlot === 'primary' ? state.primaryColor : state.secondaryColor;
    colorInput.value = currentActiveColor;
    hexInput.value = currentActiveColor.toUpperCase();
    slotBadge.textContent = state.activeColorSlot === 'primary' ? 'Principal' : 'Secundario';
    if (state.isTransparentColor) {
      slotBadge.textContent = 'Transparente';
    }

    for (const [id, btn] of tabButtons) {
      btn.classList.toggle('active', state.colorTab === id);
    }

    tabPanelsContainer.innerHTML = '';

    if (state.colorTab === 'picker') {
      tabPanelsContainer.appendChild(wheelWrap);
      drawColorWheel(currentActiveColor);
    } else if (state.colorTab === 'rgb') {
      tabPanelsContainer.appendChild(rgbSlidersPanel);
      const { r, g, b } = hexToRgb(currentActiveColor);
      const { h, s, v } = rgbToHsv(r, g, b);

      redRow.slider.value = String(r);
      redRow.numInput.value = String(r);
      redRow.slider.style.background = `linear-gradient(90deg, rgb(0,${g},${b}), rgb(255,${g},${b}))`;

      greenRow.slider.value = String(g);
      greenRow.numInput.value = String(g);
      greenRow.slider.style.background = `linear-gradient(90deg, rgb(${r},0,${b}), rgb(${r},255,${b}))`;

      blueRow.slider.value = String(b);
      blueRow.numInput.value = String(b);
      blueRow.slider.style.background = `linear-gradient(90deg, rgb(${r},${g},0), rgb(${r},${g},255))`;

      hueRow.slider.value = String(Math.round(h));
      hueRow.numInput.value = String(Math.round(h));

      satRow.slider.value = String(Math.round(s * 100));
      satRow.numInput.value = String(Math.round(s * 100));
      satRow.slider.style.background = `linear-gradient(90deg, ${hsvToHex(h, 0, v)}, ${hsvToHex(h, 1, v)})`;

      valRow.slider.value = String(Math.round(v * 100));
      valRow.numInput.value = String(Math.round(v * 100));
      valRow.slider.style.background = `linear-gradient(90deg, #000000, ${hsvToHex(h, s, 1)})`;
    } else if (state.colorTab === 'set') {
      tabPanelsContainer.appendChild(colorSetPanel);

      setSelect.innerHTML = '';
      for (const cs of state.colorSets) {
        const opt = document.createElement('option');
        opt.value = cs.id;
        opt.textContent = `${cs.name} (${cs.colors.length})`;
        if (cs.id === state.activeColorSetId) opt.selected = true;
        setSelect.appendChild(opt);
      }

      const curSet =
        state.colorSets.find((s) => s.id === state.activeColorSetId) ?? state.colorSets[0];
      setGrid.innerHTML = '';
      if (curSet) {
        curSet.colors.forEach((c, idx) => {
          const chip = document.createElement('div');
          chip.className = 'csp-history-chip';
          chip.style.backgroundColor = c;
          chip.title = `${c.toUpperCase()} (Clic para elegir, Shift+clic para borrar)`;
          chip.classList.toggle('active', c.toLowerCase() === currentActiveColor.toLowerCase());
          chip.addEventListener('click', (e) => {
            if (e.shiftKey) {
              removeColorFromActiveSet(idx);
            } else {
              if (state.activeColorSlot === 'primary') setPrimaryColor(c);
              else setSecondaryColor(c);
            }
          });
          setGrid.appendChild(chip);
        });
      }
    } else if (state.colorTab === 'harmony') {
      tabPanelsContainer.appendChild(harmonyPanel);
      harmonyPanel.innerHTML = '';

      const harmonies = computeColorHarmonies(currentActiveColor);
      for (const group of harmonies) {
        const grpEl = document.createElement('div');
        grpEl.className = 'csp-harmony-group';

        const grpTitle = document.createElement('span');
        grpTitle.className = 'csp-harmony-title';
        grpTitle.textContent = group.label;
        grpEl.appendChild(grpTitle);

        const swatchesRow = document.createElement('div');
        swatchesRow.className = 'csp-harmony-swatches';

        for (const item of group.colors) {
          const sbtn = document.createElement('button');
          sbtn.className = 'csp-harmony-swatch-btn';
          sbtn.style.backgroundColor = item.hex;
          sbtn.title = `${item.tag}: ${item.hex.toUpperCase()}`;
          sbtn.innerHTML = `<span class="csp-harmony-swatch-tag">${item.tag}</span>`;
          sbtn.addEventListener('click', () => {
            if (state.activeColorSlot === 'primary') setPrimaryColor(item.hex);
            else setSecondaryColor(item.hex);
          });
          swatchesRow.appendChild(sbtn);
        }

        grpEl.appendChild(swatchesRow);
        harmonyPanel.appendChild(grpEl);
      }
    }

    // 8. Render Color History Swatches
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

    // Update scrollbars after content changes
    requestAnimationFrame(() => {
      subtoolScroll.update();
      propScroll.update();
      colorScroll.update();
    });
  };

  sync(getToolState());
  subscribeTools(sync);
  options?.timeline?.subscribe(() => {
    if (getToolState().tool === 'bone') {
      sync(getToolState());
    }
  });
}
