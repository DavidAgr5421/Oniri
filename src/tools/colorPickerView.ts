import { createCustomScrollContainer, type CustomScrollContainer } from './customScrollbar';
import type { ColorTabId, ToolState } from './toolState';
import {
  addColorToActiveSet,
  commitActiveColorToHistory,
  computeColorHarmonies,
  getToolState,
  hexToRgb,
  hsvToHex,
  removeColorFromActiveSet,
  rgbToHex,
  rgbToHsv,
  setActiveColor,
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
  const currentColorH = savedColorH ? Math.max(150, Math.min(500, Number(savedColorH))) : 295;
  colorSection.style.height = `${currentColorH}px`;

  // Persistent HSV state so Hue and Saturation never collapse to 0 on black (#000000), white (#ffffff), or grays
  let curH = 0;
  let curS = 0;
  let curV = 0;
  let lastSyncedHex = '';
  let isDraggingWheelHue = false;
  let isDraggingWheelSV = false;
  let isDraggingSlider = false;
  let renderedTab: ColorTabId | null = null;

  const syncHsvFromHex = (hex: string): void => {
    const norm = hex.toLowerCase();
    if (norm === lastSyncedHex && (isDraggingWheelHue || isDraggingWheelSV || isDraggingSlider)) {
      return;
    }
    const { r, g, b } = hexToRgb(norm);
    const { h, s, v } = rgbToHsv(r, g, b);
    if (s > 0.004 && v > 0.004) {
      curH = h;
    }
    if (v > 0.004) {
      curS = s;
    } else if (!isDraggingWheelHue && !isDraggingSlider && norm !== lastSyncedHex) {
      curS = s;
    }
    curV = v;
    lastSyncedHex = norm;
  };

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
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      setColorTab(t.id);
    });
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
    syncHsvFromHex(colorInput.value);
    setActiveColor(colorInput.value, false);
  });
  colorInput.addEventListener('change', () => {
    commitActiveColorToHistory();
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
      syncHsvFromHex(val);
      setActiveColor(val, true);
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
  const WHEEL_SIZE = 168;
  const wheelDpr = Math.min(2, window.devicePixelRatio || 1);
  wheelCanvas.width = Math.round(WHEEL_SIZE * wheelDpr);
  wheelCanvas.height = Math.round(WHEEL_SIZE * wheelDpr);
  wheelWrap.appendChild(wheelCanvas);

  const drawColorWheel = (): void => {
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

    const sqHalf = (rInner - 7) / Math.SQRT2;
    const sqX0 = cx - sqHalf;
    const sqY0 = cy - sqHalf;
    const sqSide = sqHalf * 2;

    const gradH = ctx.createLinearGradient(sqX0, 0, sqX0 + sqSide, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, `hsl(${Math.round(curH)}, 100%, 50%)`);
    ctx.fillStyle = gradH;
    ctx.fillRect(sqX0, sqY0, sqSide, sqSide);

    const gradV = ctx.createLinearGradient(0, sqY0, 0, sqY0 + sqSide);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, '#000000');
    ctx.fillStyle = gradV;
    ctx.fillRect(sqX0, sqY0, sqSide, sqSide);

    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1;
    ctx.strokeRect(sqX0, sqY0, sqSide, sqSide);

    const hRad = (curH * Math.PI) / 180;
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

    const smx = sqX0 + curS * sqSide;
    const smy = sqY0 + (1 - curV) * sqSide;
    ctx.beginPath();
    ctx.arc(smx, smy, 4, 0, Math.PI * 2);
    ctx.strokeStyle = curV > 0.5 && curS < 0.5 ? '#111111' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(smx, smy, 5, 0, Math.PI * 2);
    ctx.strokeStyle = curV > 0.5 && curS < 0.5 ? '#ffffff' : '#111111';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleWheelPointer = (e: PointerEvent, isInitialDown = false): void => {
    const rect = wheelCanvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? WHEEL_SIZE / rect.width : 1;
    const scaleY = rect.height > 0 ? WHEEL_SIZE / rect.height : 1;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const cx = WHEEL_SIZE / 2;
    const cy = WHEEL_SIZE / 2;
    const dist = Math.hypot(px - cx, py - cy);

    const rOuter = WHEEL_SIZE / 2 - 4;
    const rInner = rOuter - 18;
    const sqHalf = (rInner - 7) / Math.SQRT2;
    const sqX0 = cx - sqHalf;
    const sqY0 = cy - sqHalf;
    const sqSide = sqHalf * 2;

    if (isInitialDown) {
      if (dist >= rInner - 3 && dist <= rOuter + 10) {
        isDraggingWheelHue = true;
        isDraggingWheelSV = false;
      } else if (dist < rInner - 3) {
        isDraggingWheelSV = true;
        isDraggingWheelHue = false;
      } else {
        return;
      }
    }

    if (isDraggingWheelHue) {
      const angle = (Math.atan2(py - cy, px - cx) * 180) / Math.PI;
      curH = (angle + 360) % 360;
    } else if (isDraggingWheelSV) {
      curS = Math.max(0, Math.min(1, (px - sqX0) / sqSide));
      curV = Math.max(0, Math.min(1, 1 - (py - sqY0) / sqSide));
    } else {
      return;
    }

    const nextHex = hsvToHex(curH, curS, curV);
    lastSyncedHex = nextHex.toLowerCase();
    // Always redraw wheel immediately so Hue Ring rotation is visible even when curS=0 or curV=0
    drawColorWheel();
    setActiveColor(nextHex, false);
  };

  wheelCanvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      wheelCanvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handleWheelPointer(e, true);
  });
  wheelCanvas.addEventListener('pointermove', (e) => {
    if (isDraggingWheelHue || isDraggingWheelSV) {
      e.preventDefault();
      e.stopPropagation();
      handleWheelPointer(e, false);
    }
  });
  const stopWheelDrag = (e: PointerEvent) => {
    const wasDragging = isDraggingWheelHue || isDraggingWheelSV;
    isDraggingWheelHue = false;
    isDraggingWheelSV = false;
    try {
      if (wheelCanvas.hasPointerCapture(e.pointerId)) {
        wheelCanvas.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    if (wasDragging) {
      commitActiveColorToHistory();
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

    slider.addEventListener('pointerdown', () => {
      isDraggingSlider = true;
    });
    const endSliderDrag = () => {
      if (isDraggingSlider) {
        isDraggingSlider = false;
        commitActiveColorToHistory();
      }
    };
    slider.addEventListener('pointerup', endSliderDrag);
    slider.addEventListener('pointercancel', endSliderDrag);
    slider.addEventListener('change', endSliderDrag);

    slider.addEventListener('input', () => {
      isDraggingSlider = true;
      const v = Number(slider.value);
      numInput.value = String(v);
      onChange(v);
    });

    numInput.addEventListener('change', () => {
      let v = Number(numInput.value);
      v = Math.max(min, Math.min(max, v));
      slider.value = String(v);
      onChange(v);
      commitActiveColorToHistory();
    });

    row.append(tagEl, slider, numInput);
    return { row, slider, numInput };
  }

  const redRow = createChannelSliderRow('R', 0, 255, (rVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(rVal, cur.g, cur.b);
    lastSyncedHex = '';
    syncHsvFromHex(hex);
    setActiveColor(hex, false);
  });
  const greenRow = createChannelSliderRow('G', 0, 255, (gVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(cur.r, gVal, cur.b);
    lastSyncedHex = '';
    syncHsvFromHex(hex);
    setActiveColor(hex, false);
  });
  const blueRow = createChannelSliderRow('B', 0, 255, (bVal) => {
    const st = getToolState();
    const cur = hexToRgb(st.activeColorSlot === 'primary' ? st.primaryColor : st.secondaryColor);
    const hex = rgbToHex(cur.r, cur.g, bVal);
    lastSyncedHex = '';
    syncHsvFromHex(hex);
    setActiveColor(hex, false);
  });

  const hueRow = createChannelSliderRow('H', 0, 360, (hVal) => {
    curH = hVal;
    const hex = hsvToHex(curH, curS, curV);
    lastSyncedHex = hex.toLowerCase();
    setActiveColor(hex, false);
  });
  const satRow = createChannelSliderRow('S', 0, 100, (sVal) => {
    curS = sVal / 100;
    const hex = hsvToHex(curH, curS, curV);
    lastSyncedHex = hex.toLowerCase();
    setActiveColor(hex, false);
  });
  const valRow = createChannelSliderRow('V', 0, 100, (vVal) => {
    curV = vVal / 100;
    const hex = hsvToHex(curH, curS, curV);
    lastSyncedHex = hex.toLowerCase();
    setActiveColor(hex, false);
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
    syncHsvFromHex(currentActiveColor);

    colorInput.value = currentActiveColor;
    if (document.activeElement !== hexInput) {
      hexInput.value = currentActiveColor.toUpperCase();
    }
    slotBadge.textContent = state.activeColorSlot === 'primary' ? 'Principal' : 'Secundario';
    if (state.isTransparentColor) {
      slotBadge.textContent = 'Transparente';
    }

    for (const [id, btn] of tabButtons) {
      btn.classList.toggle('active', state.colorTab === id);
    }

    // Only swap child DOM nodes when the active tab actually changes so pointer capture and active sliders are never broken
    if (renderedTab !== state.colorTab) {
      renderedTab = state.colorTab;
      tabPanelsContainer.replaceChildren();
      if (state.colorTab === 'picker') {
        tabPanelsContainer.appendChild(wheelWrap);
      } else if (state.colorTab === 'rgb') {
        tabPanelsContainer.appendChild(rgbSlidersPanel);
      } else if (state.colorTab === 'set') {
        tabPanelsContainer.appendChild(colorSetPanel);
      } else if (state.colorTab === 'harmony') {
        tabPanelsContainer.appendChild(harmonyPanel);
      }
    }

    if (state.colorTab === 'picker') {
      drawColorWheel();
    } else if (state.colorTab === 'rgb') {
      const { r, g, b } = hexToRgb(currentActiveColor);

      redRow.slider.value = String(r);
      if (document.activeElement !== redRow.numInput) redRow.numInput.value = String(r);
      redRow.slider.style.background = `linear-gradient(90deg, rgb(0,${g},${b}), rgb(255,${g},${b}))`;

      greenRow.slider.value = String(g);
      if (document.activeElement !== greenRow.numInput) greenRow.numInput.value = String(g);
      greenRow.slider.style.background = `linear-gradient(90deg, rgb(${r},0,${b}), rgb(${r},255,${b}))`;

      blueRow.slider.value = String(b);
      if (document.activeElement !== blueRow.numInput) blueRow.numInput.value = String(b);
      blueRow.slider.style.background = `linear-gradient(90deg, rgb(${r},${g},0), rgb(${r},${g},255))`;

      hueRow.slider.value = String(Math.round(curH));
      if (document.activeElement !== hueRow.numInput) hueRow.numInput.value = String(Math.round(curH));

      satRow.slider.value = String(Math.round(curS * 100));
      if (document.activeElement !== satRow.numInput) satRow.numInput.value = String(Math.round(curS * 100));
      satRow.slider.style.background = `linear-gradient(90deg, ${hsvToHex(curH, 0, Math.max(0.25, curV))}, ${hsvToHex(curH, 1, Math.max(0.5, curV))})`;

      valRow.slider.value = String(Math.round(curV * 100));
      if (document.activeElement !== valRow.numInput) valRow.numInput.value = String(Math.round(curV * 100));
      valRow.slider.style.background = `linear-gradient(90deg, #000000, ${hsvToHex(curH, curS, 1)})`;
    } else if (state.colorTab === 'set') {
      if (document.activeElement !== setSelect) {
        setSelect.innerHTML = '';
        for (const cs of state.colorSets) {
          const opt = document.createElement('option');
          opt.value = cs.id;
          opt.textContent = `${cs.name} (${cs.colors.length})`;
          if (cs.id === state.activeColorSetId) opt.selected = true;
          setSelect.appendChild(opt);
        }
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
          chip.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.shiftKey) {
              removeColorFromActiveSet(idx);
            } else {
              lastSyncedHex = '';
              syncHsvFromHex(c);
              if (state.activeColorSlot === 'primary') setPrimaryColor(c);
              else setSecondaryColor(c);
            }
          });
          setGrid.appendChild(chip);
        });
      }
    } else if (state.colorTab === 'harmony') {
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
          sbtn.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            lastSyncedHex = '';
            syncHsvFromHex(item.hex);
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
      chip.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        lastSyncedHex = '';
        syncHsvFromHex(c);
        if (state.activeColorSlot === 'primary') {
          setPrimaryColor(c);
        } else {
          setSecondaryColor(c);
        }
      });
      historyGrid.appendChild(chip);
    }

    requestAnimationFrame(() => {
      colorScroll.update();
    });
  };

  return {
    section: colorSection,
    scroll: colorScroll,
    sync,
  };
}
