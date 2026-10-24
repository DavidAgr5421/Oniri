import type {
  AntiAliasingLevel,
  BrushPropKey,
  PaperTextureId,
  SubTool,
  TipShape,
  TipTextureId,
  TipCycleMode,
} from './toolState';
import {
  getToolState,
  resetSubTool,
  setBrushSettings,
  toggleVisibleProperty,
} from './toolState';
import { openPressureCalibrationModal } from './pressureCalibrationModal';
import { openMaterialPickerModal } from './materialPickerModal';
import { PAPER_MATERIAL_CATALOG, TIP_MATERIAL_CATALOG } from '../brush/brushTextureAssets';

export const TIP_SHAPES: { id: TipShape; label: string }[] = [
  { id: 'circle', label: 'Círculo' },
  { id: 'square', label: 'Plano' },
  { id: 'calligraphic', label: 'Caligráfico' },
];

export const AA_LEVELS: { id: AntiAliasingLevel; label: string }[] = [
  { id: 'none', label: 'Ninguno' },
  { id: 'weak', label: 'Débil' },
  { id: 'medium', label: 'Medio' },
  { id: 'strong', label: 'Fuerte' },
];

export const PAPER_TEXTURES: { id: PaperTextureId; label: string }[] = [
  { id: 'none', label: 'Ninguno' },
  { id: 'oil-paint', label: 'Óleo' },
  { id: 'pencil-paper', label: 'Lápiz' },
];

export const AVAILABLE_TIP_TEXTURES: { id: TipTextureId; label: string }[] = [
  { id: 'gasagasa', label: 'Gasa-Gasa (Áspero)' },
  { id: 'brush02', label: 'Pincel (Cerdas)' },
  { id: 'flat-square', label: 'Plana (Espátula)' },
  { id: 'star02', label: 'Estrella 02' },
  { id: 'star04', label: 'Estrella 04' },
];

let activeDetailModal: HTMLElement | null = null;

export function closeSubToolDetailModal(): void {
  if (activeDetailModal) {
    activeDetailModal.remove();
    activeDetailModal = null;
  }
}

export function openSubToolDetailModal(subTool: SubTool): void {
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
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

  type CatId =
    | 'size'
    | 'ink'
    | 'smooth'
    | 'tip'
    | 'texture'
    | 'spray'
    | 'stroke'
    | 'taper'
    | 'correction'
    | 'fill_ref'
    | 'fill_gap'
    | 'fill_scale';

  const isBucket = subTool.tool === 'bucket';
  const categories: { id: CatId; label: string }[] = isBucket
    ? [
        ...(subTool.id === 'bucket-unfilled' ? [{ id: 'size' as CatId, label: 'Tamaño del pincel' }] : []),
        { id: 'fill_ref', label: 'Referencia y Tolerancia' },
        { id: 'fill_gap', label: 'Cerrar hueco (Close Gap)' },
        { id: 'fill_scale', label: 'Escalado de área (Area Scaling)' },
      ]
    : [
        { id: 'size', label: 'Tamaño del pincel' },
        { id: 'ink', label: 'Tinta' },
        { id: 'smooth', label: 'Suavizado' },
        { id: 'tip', label: 'Punta del pincel' },
        { id: 'texture', label: 'Textura del papel' },
        { id: 'spray', label: 'Dispersión y Efecto (Spray)' },
        { id: 'stroke', label: 'Trazo' },
        { id: 'taper', label: 'Inicio y fin' },
        { id: 'correction', label: 'Corrección' },
      ];

  let activeCat: CatId = isBucket ? (subTool.id === 'bucket-unfilled' ? 'size' : 'fill_ref') : 'size';
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
      const calibBtn = document.createElement('button');
      calibBtn.className = 'csp-calib-btn-subtle';
      calibBtn.style.marginTop = '4px';
      calibBtn.style.alignSelf = 'flex-start';
      calibBtn.innerHTML = `🖋 Ajustar nivel de detección de presión del lápiz...`;
      calibBtn.addEventListener('click', () => {
        openPressureCalibrationModal();
      });

      main2.append(chkWrap, slider2, calibBtn);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);

      // 3. Velocity Dynamics Box
      const row3 = document.createElement('div');
      row3.className = 'csp-detail-prop-row';
      const eye3 = makeEyeButton('velocitySize');
      const main3 = document.createElement('div');
      main3.className = 'csp-detail-prop-main';
      main3.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Dinámica por velocidad (Trazos rápidos finos)</span>
          <span class="prop-value" id="dt-vsize-val">${Math.round((b.velocityMinRatio ?? 0.35) * 100)}%</span>
        </div>
      `;
      const chkVWrap = document.createElement('div');
      chkVWrap.className = 'csp-toggle-row';
      const chkV = document.createElement('input');
      chkV.type = 'checkbox';
      chkV.className = 'csp-checkbox';
      chkV.id = 'dt-vsize-chk';
      chkV.checked = !!b.velocitySize;
      const chkVLbl = document.createElement('label');
      chkVLbl.className = 'csp-check-label';
      chkVLbl.htmlFor = 'dt-vsize-chk';
      chkVLbl.textContent = 'Afinar línea con la rapidez del trazo';
      chkVWrap.append(chkV, chkVLbl);

      const sliderV = document.createElement('input');
      sliderV.type = 'range';
      sliderV.className = 'csp-slider';
      sliderV.min = '5';
      sliderV.max = '100';
      sliderV.value = String(Math.round((b.velocityMinRatio ?? 0.35) * 100));
      sliderV.disabled = !b.velocitySize;

      chkV.addEventListener('change', () => {
        setBrushSettings({ velocitySize: chkV.checked });
        sliderV.disabled = !chkV.checked;
      });
      sliderV.addEventListener('input', () => {
        setBrushSettings({ velocityMinRatio: Number(sliderV.value) / 100 });
        const valNode = main3.querySelector('#dt-vsize-val');
        if (valNode) valNode.textContent = `${sliderV.value}%`;
      });
      main3.append(chkVWrap, sliderV);
      row3.append(eye3, main3);
      contentCol.appendChild(row3);

      // 4. Random Size Dynamics
      const row4 = document.createElement('div');
      row4.className = 'csp-detail-prop-row';
      const eye4 = makeEyeButton('size');
      const main4 = document.createElement('div');
      main4.className = 'csp-detail-prop-main';
      const curRandPct = Math.round((b.randomSizeRatio ?? 1.0) * 100);
      main4.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Tamaño mínimo aleatorio (Random)</span>
          <span class="prop-value" id="dt-rsize-val">${curRandPct === 100 ? 'Desact. (100%)' : `${curRandPct}%`}</span>
        </div>
      `;
      const sliderR = document.createElement('input');
      sliderR.type = 'range';
      sliderR.className = 'csp-slider';
      sliderR.min = '10';
      sliderR.max = '100';
      sliderR.value = String(curRandPct);
      sliderR.addEventListener('input', () => {
        const valNum = Number(sliderR.value);
        setBrushSettings({ randomSizeRatio: valNum / 100 });
        const valNode = main4.querySelector('#dt-rsize-val');
        if (valNode) valNode.textContent = valNum === 100 ? 'Desact. (100%)' : `${valNum}%`;
      });
      main4.appendChild(sliderR);
      row4.append(eye4, main4);
      contentCol.appendChild(row4);
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

      const chkVWrapFlow = document.createElement('div');
      chkVWrapFlow.className = 'csp-toggle-row';
      const chkVFlow = document.createElement('input');
      chkVFlow.type = 'checkbox';
      chkVFlow.className = 'csp-checkbox';
      chkVFlow.id = 'dt-vflow-chk';
      chkVFlow.checked = !!b.velocityFlow;
      const chkVFlowLbl = document.createElement('label');
      chkVFlowLbl.className = 'csp-check-label';
      chkVFlowLbl.htmlFor = 'dt-vflow-chk';
      chkVFlowLbl.textContent = 'Aclarar densidad en trazos rápidos';
      chkVWrapFlow.append(chkVFlow, chkVFlowLbl);
      chkVFlow.addEventListener('change', () => {
        setBrushSettings({ velocityFlow: chkVFlow.checked });
      });

      main2.append(slider2, chkWrap2, chkVWrapFlow);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);

      const row3 = document.createElement('div');
      row3.className = 'csp-detail-prop-row';
      const eye3 = makeEyeButton('colorMix');
      const main3 = document.createElement('div');
      main3.className = 'csp-detail-prop-main';
      main3.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Mezcla de color / Acuarela</span>
          <span class="prop-value" id="dt-cm-val">${Math.round((b.colorMix ?? 0) * 100)}%</span>
        </div>
      `;
      const slider3 = document.createElement('input');
      slider3.type = 'range';
      slider3.className = 'csp-slider';
      slider3.min = '0';
      slider3.max = '100';
      slider3.value = String(Math.round((b.colorMix ?? 0) * 100));
      slider3.addEventListener('input', () => {
        setBrushSettings({ colorMix: Number(slider3.value) / 100 });
        const val = main3.querySelector('#dt-cm-val');
        if (val) val.textContent = `${slider3.value}%`;
      });
      main3.appendChild(slider3);
      row3.append(eye3, main3);
      contentCol.appendChild(row3);
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

      // Puntas múltiples combinadas (Materiales)
      const rowMaterials = document.createElement('div');
      rowMaterials.className = 'csp-detail-prop-row';
      const eyeMat = makeEyeButton('tipShape');
      const mainMat = document.createElement('div');
      mainMat.className = 'csp-detail-prop-main';
      mainMat.innerHTML = `<span class="prop-label">Puntas múltiples combinadas (Materiales de punta)</span>`;
      const matGroup = document.createElement('div');
      matGroup.className = 'csp-seg-group';
      matGroup.style.flexWrap = 'wrap';
      matGroup.style.gap = '4px';

      const currentList = (b.tipTextures && b.tipTextures.length > 0)
        ? [...b.tipTextures]
        : (b.tipTexture && b.tipTexture !== 'default' ? [b.tipTexture] : []);

      for (const tex of AVAILABLE_TIP_TEXTURES) {
        const btn = document.createElement('button');
        const isActive = currentList.includes(tex.id);
        btn.className = `csp-seg-btn${isActive ? ' active' : ''}`;
        btn.textContent = tex.label;
        btn.addEventListener('click', () => {
          let updated: TipTextureId[];
          if (isActive) {
            updated = currentList.filter((id) => id !== tex.id);
          } else {
            updated = [...currentList, tex.id];
          }
          setBrushSettings({
            tipTextures: updated,
            tipTexture: updated.length > 0 ? updated[0] : 'default',
          });
          renderCategory('tip');
        });
        matGroup.appendChild(btn);
      }
      mainMat.appendChild(matGroup);

      // Visual Material Picker Trigger Button
      const curTipItem = TIP_MATERIAL_CATALOG.find((c) => c.id === (b.tipTexture || 'default'));
      const pickTipBtn = document.createElement('button');
      pickTipBtn.className = 'csp-seg-btn';
      pickTipBtn.style.marginTop = '6px';
      pickTipBtn.style.display = 'flex';
      pickTipBtn.style.alignItems = 'center';
      pickTipBtn.style.gap = '8px';
      pickTipBtn.style.padding = '5px 10px';
      pickTipBtn.innerHTML = `
        <span style="width:24px;height:24px;background:#e5e7eb;border:1px solid #555;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;">
          ${curTipItem?.dataUrl ? `<img src="${curTipItem.dataUrl}" style="max-width:100%;max-height:100%;filter:invert(0.85) contrast(1.4);"/>` : '<b style="color:#222">●</b>'}
        </span>
        <span>📂 Seleccionar material de punta (${curTipItem?.name ?? 'Círculo'})...</span>
      `;
      pickTipBtn.addEventListener('click', () => {
        openMaterialPickerModal({
          category: 'tip',
          currentId: b.tipTexture || 'default',
          onSelect: (id) => {
            const typedId = id as TipTextureId;
            setBrushSettings({
              tipTexture: typedId,
              tipTextures: typedId === 'default' ? [] : [typedId],
            });
            renderCategory('tip');
          },
        });
      });
      mainMat.appendChild(pickTipBtn);

      rowMaterials.append(eyeMat, mainMat);
      contentCol.appendChild(rowMaterials);

      if (currentList.length > 1) {
        const rowCycle = document.createElement('div');
        rowCycle.className = 'csp-detail-prop-row';
        const eyeCyc = makeEyeButton('tipShape');
        const mainCyc = document.createElement('div');
        mainCyc.className = 'csp-detail-prop-main';
        mainCyc.innerHTML = `<span class="prop-label">Método de alternancia de puntas</span>`;
        const cycGroup = document.createElement('div');
        cycGroup.className = 'csp-seg-group';

        const modes: { id: TipCycleMode; label: string }[] = [
          { id: 'random', label: 'Aleatorio (Random)' },
          { id: 'sequential', label: 'Secuencial (En orden)' },
        ];
        for (const m of modes) {
          const btn = document.createElement('button');
          btn.className = `csp-seg-btn${(b.tipCycleMode ?? 'random') === m.id ? ' active' : ''}`;
          btn.textContent = m.label;
          btn.addEventListener('click', () => {
            setBrushSettings({ tipCycleMode: m.id });
            renderCategory('tip');
          });
          cycGroup.appendChild(btn);
        }
        mainCyc.appendChild(cycGroup);
        rowCycle.append(eyeCyc, mainCyc);
        contentCol.appendChild(rowCycle);
      }

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
    } else if (cat === 'texture') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('paperTexture');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `<span class="prop-label">Textura (Material de papel)</span>`;

      const curPaperItem = PAPER_MATERIAL_CATALOG.find((c) => c.id === (b.paperTexture ?? 'none'));
      const pickPaperCard = document.createElement('div');
      Object.assign(pickPaperCard.style, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        padding: '6px 10px',
        backgroundColor: '#222222',
        border: '1px solid #454545',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '4px',
      });
      pickPaperCard.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:38px;height:38px;background:#e5e7eb;border:1px solid #666;border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            ${curPaperItem?.dataUrl ? `<img src="${curPaperItem.dataUrl}" style="width:100%;height:100%;object-fit:cover;"/>` : '<span style="color:#444;font-weight:bold;">∅</span>'}
          </div>
          <div>
            <div style="font-weight:600;color:#f3f4f6;font-size:12px;">${curPaperItem?.name ?? 'Ninguna'}</div>
            <div style="font-size:10.5px;color:#9ca3af;">Haz clic para abrir el catálogo de materiales</div>
          </div>
        </div>
        <button class="csp-seg-btn" style="padding:4px 8px;">Cambiar...</button>
      `;
      pickPaperCard.addEventListener('click', () => {
        openMaterialPickerModal({
          category: 'paper',
          currentId: b.paperTexture ?? 'none',
          onSelect: (id) => {
            const nextId = id as PaperTextureId;
            setBrushSettings({
              paperTexture: nextId,
              ...(nextId !== 'none' && (b.textureDensity ?? 0) === 0 ? { textureDensity: 0.75 } : {}),
            });
            renderCategory('texture');
          },
        });
      });
      main1.appendChild(pickPaperCard);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('textureDensity');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Densidad de textura (Texture density)</span>
          <span class="prop-value" id="dt-td-val">${Math.round((b.textureDensity ?? 0) * 100)}%</span>
        </div>
      `;
      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '0';
      slider2.max = '100';
      slider2.value = String(Math.round((b.textureDensity ?? 0) * 100));
      slider2.addEventListener('input', () => {
        setBrushSettings({ textureDensity: Number(slider2.value) / 100 });
        const val = main2.querySelector('#dt-td-val');
        if (val) val.textContent = `${slider2.value}%`;
      });

      const scaleHeader = document.createElement('div');
      scaleHeader.className = 'prop-row-header';
      scaleHeader.style.marginTop = '6px';
      const curScalePct = Math.round((b.textureScale ?? 0.35) * 100);
      scaleHeader.innerHTML = `
        <span class="prop-label">Escala de textura (Scale ratio)</span>
        <span class="prop-value" id="dt-ts-val">${curScalePct}%</span>
      `;
      const sliderScale = document.createElement('input');
      sliderScale.type = 'range';
      sliderScale.className = 'csp-slider';
      sliderScale.min = '10';
      sliderScale.max = '200';
      sliderScale.step = '5';
      sliderScale.value = String(curScalePct);
      sliderScale.addEventListener('input', () => {
        setBrushSettings({ textureScale: Number(sliderScale.value) / 100 });
        const val = scaleHeader.querySelector('#dt-ts-val');
        if (val) val.textContent = `${sliderScale.value}%`;
      });

      main2.append(slider2, scaleHeader, sliderScale);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);
    } else if (cat === 'spray') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('spray');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      const chkWrap1 = document.createElement('div');
      chkWrap1.className = 'csp-toggle-row';
      const chk1 = document.createElement('input');
      chk1.type = 'checkbox';
      chk1.className = 'csp-checkbox';
      chk1.id = 'dt-spray-chk';
      chk1.checked = !!b.spray;
      const chkLbl1 = document.createElement('label');
      chkLbl1.className = 'csp-check-label';
      chkLbl1.htmlFor = 'dt-spray-chk';
      chkLbl1.textContent = 'Activar efecto de dispersión (Spray)';
      chkWrap1.append(chk1, chkLbl1);
      chk1.addEventListener('change', () => {
        setBrushSettings({ spray: chk1.checked });
        renderCategory('spray');
      });
      main1.appendChild(chkWrap1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('sprayRadius');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Radio de dispersión</span>
          <span class="prop-value" id="dt-sr-val">${Math.round(b.sprayRadius ?? 25)} px</span>
        </div>
      `;
      const slider2 = document.createElement('input');
      slider2.type = 'range';
      slider2.className = 'csp-slider';
      slider2.min = '5';
      slider2.max = '120';
      slider2.value = String(Math.round(b.sprayRadius ?? 25));
      slider2.addEventListener('input', () => {
        setBrushSettings({ sprayRadius: Number(slider2.value) });
        const val = main2.querySelector('#dt-sr-val');
        if (val) val.textContent = `${slider2.value} px`;
      });
      main2.appendChild(slider2);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);

      const row3 = document.createElement('div');
      row3.className = 'csp-detail-prop-row';
      const eye3 = makeEyeButton('sprayDensity');
      const main3 = document.createElement('div');
      main3.className = 'csp-detail-prop-main';
      main3.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Cantidad de partículas</span>
          <span class="prop-value" id="dt-sd-val">${Math.round(b.sprayDensity ?? 5)}</span>
        </div>
      `;
      const slider3 = document.createElement('input');
      slider3.type = 'range';
      slider3.className = 'csp-slider';
      slider3.min = '1';
      slider3.max = '20';
      slider3.value = String(Math.round(b.sprayDensity ?? 5));
      slider3.addEventListener('input', () => {
        setBrushSettings({ sprayDensity: Number(slider3.value) });
        const val = main3.querySelector('#dt-sd-val');
        if (val) val.textContent = slider3.value;
      });
      main3.appendChild(slider3);
      row3.append(eye3, main3);
      contentCol.appendChild(row3);

      const row4 = document.createElement('div');
      row4.className = 'csp-detail-prop-row';
      const eye4 = makeEyeButton('compositeMode');
      const main4 = document.createElement('div');
      main4.className = 'csp-detail-prop-main';
      main4.innerHTML = `<span class="prop-label">Modo de combinación</span>`;
      const compGroup = document.createElement('div');
      compGroup.className = 'csp-seg-group';
      const modes: { id: 'source-over' | 'lighter'; label: string }[] = [
        { id: 'source-over', label: 'Normal' },
        { id: 'lighter', label: 'Añadir (Brillo)' },
      ];
      for (const m of modes) {
        const btn = document.createElement('button');
        btn.className = `csp-seg-btn${(b.compositeMode ?? 'source-over') === m.id ? ' active' : ''}`;
        btn.textContent = m.label;
        btn.addEventListener('click', () => {
          setBrushSettings({ compositeMode: m.id });
          renderCategory('spray');
        });
        compGroup.appendChild(btn);
      }
      main4.appendChild(compGroup);
      row4.append(eye4, main4);
      contentCol.appendChild(row4);
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
    } else if (cat === 'fill_ref') {
      // Row 1: Color Tolerance
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('tolerance');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Tolerancia de color</span>
          <span class="prop-value" id="dt-tol-val">${Math.round(b.tolerance)}%</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '0';
      slider1.max = '100';
      slider1.value = String(Math.round(b.tolerance));
      slider1.addEventListener('input', () => {
        setBrushSettings({ tolerance: Number(slider1.value) });
        const val = main1.querySelector('#dt-tol-val');
        if (val) val.textContent = `${slider1.value}%`;
      });
      main1.appendChild(slider1);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);

      // Row 2: Refer Mode
      const row2 = document.createElement('div');
      row2.className = 'csp-detail-prop-row';
      const eye2 = makeEyeButton('referMode');
      const main2 = document.createElement('div');
      main2.className = 'csp-detail-prop-main';
      main2.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Referencia múltiple (Capas)</span>
        </div>
      `;
      const segGroup = document.createElement('div');
      segGroup.className = 'csp-seg-group';
      const modes: { id: 'reference' | 'all' | 'editing' | 'below'; label: string }[] = [
        { id: 'reference', label: 'Faro (Ref)' },
        { id: 'all', label: 'Todas' },
        { id: 'editing', label: 'Editada' },
        { id: 'below', label: 'Inferior' },
      ];
      const curMode = b.referMode ?? 'reference';
      for (const m of modes) {
        const btn = document.createElement('button');
        btn.className = `csp-seg-btn${curMode === m.id ? ' active' : ''}`;
        btn.textContent = m.label;
        btn.addEventListener('click', () => {
          setBrushSettings({ referMode: m.id });
          segGroup.querySelectorAll('.csp-seg-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        });
        segGroup.appendChild(btn);
      }
      main2.appendChild(segGroup);
      row2.append(eye2, main2);
      contentCol.appendChild(row2);
    } else if (cat === 'fill_gap') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('closeGap');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      const curGap = b.closeGap ?? 0;
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Cerrar hueco (Close Gap)</span>
          <span class="prop-value" id="dt-gap-val">${curGap === 0 ? 'Desactivado' : `${curGap} px`}</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '0';
      slider1.max = '20';
      slider1.value = String(curGap);

      const gapSteps = [
        { val: 0, label: 'Off' },
        { val: 1, label: '1' },
        { val: 3, label: '3' },
        { val: 5, label: '5' },
        { val: 10, label: '10' },
        { val: 20, label: '20' },
      ];
      const btnRow = document.createElement('div');
      btnRow.className = 'csp-quick-size-row';
      for (const step of gapSteps) {
        const qbtn = document.createElement('button');
        qbtn.className = `csp-quick-size-btn${curGap === step.val ? ' active' : ''}`;
        qbtn.textContent = step.label;
        qbtn.addEventListener('click', () => {
          setBrushSettings({ closeGap: step.val });
          slider1.value = String(step.val);
          const val = main1.querySelector('#dt-gap-val');
          if (val) val.textContent = step.val === 0 ? 'Desactivado' : `${step.val} px`;
          btnRow.querySelectorAll('.csp-quick-size-btn').forEach((b) => b.classList.remove('active'));
          qbtn.classList.add('active');
        });
        btnRow.appendChild(qbtn);
      }

      slider1.addEventListener('input', () => {
        const num = Number(slider1.value);
        setBrushSettings({ closeGap: num });
        const val = main1.querySelector('#dt-gap-val');
        if (val) val.textContent = num === 0 ? 'Desactivado' : `${num} px`;
        btnRow.querySelectorAll('.csp-quick-size-btn').forEach((b, i) => {
          b.classList.toggle('active', gapSteps[i].val === num);
        });
      });

      main1.append(slider1, btnRow);
      row1.append(eye1, main1);
      contentCol.appendChild(row1);
    } else if (cat === 'fill_scale') {
      const row1 = document.createElement('div');
      row1.className = 'csp-detail-prop-row';
      const eye1 = makeEyeButton('areaScaling');
      const main1 = document.createElement('div');
      main1.className = 'csp-detail-prop-main';
      const curScale = b.areaScaling ?? 0;
      main1.innerHTML = `
        <div class="prop-row-header">
          <span class="prop-label">Escalado de área (Expandir / Contraer)</span>
          <span class="prop-value" id="dt-scale-val">${curScale > 0 ? `+${curScale} px` : `${curScale} px`}</span>
        </div>
      `;
      const slider1 = document.createElement('input');
      slider1.type = 'range';
      slider1.className = 'csp-slider';
      slider1.min = '-10';
      slider1.max = '10';
      slider1.value = String(curScale);
      slider1.addEventListener('input', () => {
        const num = Number(slider1.value);
        setBrushSettings({ areaScaling: num });
        const val = main1.querySelector('#dt-scale-val');
        if (val) val.textContent = num > 0 ? `+${num} px` : `${num} px`;
      });
      main1.appendChild(slider1);
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

  renderCategory(activeCat);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSubToolDetailModal();
      window.removeEventListener('keydown', onKey);
    }
  };
  window.addEventListener('keydown', onKey);
}
