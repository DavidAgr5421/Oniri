import { createCustomScrollContainer, type CustomScrollContainer } from './customScrollbar';
import type { ColorTabId, ToolState } from './toolState';
import {
  addColorToActiveSet,
  computeColorHarmonies,
  getToolState,
  hexToRgb,
  hsvToHex,
  removeColorFromActiveSet,
  rgbToHex,
  rgbToHsv,
  setActiveColorSet,
  setColorTab,
  setPrimaryColor,
  setSecondaryColor,
} from './toolState';

export interface ColorPickerComponent {
  section: HTMLDivElement;
  scroll: CustomScrollContainer;
  sync: (state: ToolState) => void;
}

export function createColorPickerSection(): ColorPickerComponent {
  const colorSection = document.createElement('div');
  colorSection.className = 'dock-section color-section';

  const savedColorH = localStorage.getItem('oniri.color.height');
  const currentColorH = savedColorH ? Math.max(120, Math.min(500, Number(savedColorH))) : 270;
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

  // Section 3 custom scroll container
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

  // Recent History Swatches Grid
  const historyGrid = document.createElement('div');
  historyGrid.className = 'csp-history-grid';
  colorBody.appendChild(historyGrid);

  colorSection.appendChild(colorScroll.wrap);

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

  // Synchronize Color Picker Component
  const sync = (state: ToolState): void => {
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

    // Render Color History Swatches
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

  return {
    section: colorSection,
    scroll: colorScroll,
    sync,
  };
}
