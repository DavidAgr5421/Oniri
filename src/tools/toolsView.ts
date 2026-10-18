import type { BrushSettings, ShapeFillMode, ShapeType, ToolId, ToolState } from './toolState';
import {
  getToolState,
  setBrushSettings,
  setTool,
  subscribeTools,
  toggleProperties,
} from './toolState';

interface ToolDef {
  id: ToolId;
  label: string;
  shortcut: string;
  icon: string;
}

const TOOLS: ToolDef[] = [
  {
    id: 'brush',
    label: 'Brush',
    shortcut: 'B',
    icon: '<path d="M4 20l3-1 11-11a2 2 0 0 0-3-3L4 16z" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>',
  },
  {
    id: 'eraser',
    label: 'Eraser',
    shortcut: 'E',
    icon: '<path d="M16 3l5 5-9 9h-5l-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
  {
    id: 'eyedropper',
    label: 'Eyedropper',
    shortcut: 'I',
    icon: '<path d="M13 3l4 4 6-2-2 6-4 4-8-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 11l-6 6a1 1 0 0 0 0 2l3 3a1 1 0 0 0 2 0l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  },
  {
    id: 'bucket',
    label: 'Bucket',
    shortcut: 'G',
    icon: '<path d="M19 11l-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3l5 5a2.12 2.12 0 0 0 3 0L19 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 2l5 5" stroke="currentColor" stroke-width="1.8"/><path d="M2 13l7.5 7.5" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="19" r="2" fill="currentColor"/>',
  },
  {
    id: 'shape',
    label: 'Figure',
    shortcut: 'U',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  },
  {
    id: 'hand',
    label: 'Hand',
    shortcut: 'H',
    icon: '<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M6 14v1a7 7 0 0 0 14 0v-5a2 2 0 0 0-4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
];

interface SliderDef {
  key: keyof Omit<BrushSettings, 'color' | 'shapeType' | 'shapeFill'>;
  label: string;
  min: number;
  max: number;
  scale: number;
  unit: string;
}

const SLIDERS: SliderDef[] = [
  { key: 'size', label: 'Size / Width', min: 1, max: 200, scale: 1, unit: 'px' },
  { key: 'opacity', label: 'Opacity', min: 1, max: 100, scale: 100, unit: '%' },
  { key: 'flow', label: 'Flow', min: 1, max: 100, scale: 100, unit: '%' },
  { key: 'hardness', label: 'Hardness', min: 0, max: 100, scale: 100, unit: '%' },
  { key: 'stabilization', label: 'Stabilization', min: 0, max: 10, scale: 1, unit: '' },
  { key: 'tolerance', label: 'Tolerance', min: 0, max: 100, scale: 1, unit: '%' },
];

export interface ToolsViewOptions {
  onUndo?: () => void;
  onRedo?: () => void;
}

export function mountToolsView(container: HTMLElement, options?: ToolsViewOptions): void {
  container.innerHTML = '';
  container.className = 'tools-root';

  // --- 1. Lateral Tools Bar ---
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        ${tool.icon}
      </svg>
      <span class="btn-shortcut">${tool.shortcut}</span>
    `;
    button.addEventListener('click', () => {
      setTool(tool.id);
    });
    lateralBar.appendChild(button);
    toolButtons.set(tool.id, button);
  }

  const divider1 = document.createElement('div');
  divider1.className = 'toolbar-divider';
  lateralBar.appendChild(divider1);

  // Property Popup Toggle Button
  const propsToggleBtn = document.createElement('button');
  propsToggleBtn.className = 'lateral-btn props-btn';
  propsToggleBtn.title = 'Tool Properties (P)';
  propsToggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="6" cy="8" r="3"/><circle cx="18" cy="16" r="3"/>
      <path d="M9 8h11M4 16h8"/>
    </svg>
  `;
  propsToggleBtn.addEventListener('click', () => toggleProperties());
  lateralBar.appendChild(propsToggleBtn);

  const divider2 = document.createElement('div');
  divider2.className = 'toolbar-divider';
  lateralBar.appendChild(divider2);

  // Undo / Redo Buttons
  const undoBtn = document.createElement('button');
  undoBtn.className = 'lateral-btn action-btn';
  undoBtn.title = 'Undo (Ctrl+Z)';
  undoBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `;
  undoBtn.addEventListener('click', () => options?.onUndo?.());
  lateralBar.appendChild(undoBtn);

  const redoBtn = document.createElement('button');
  redoBtn.className = 'lateral-btn action-btn';
  redoBtn.title = 'Redo (Ctrl+Y)';
  redoBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `;
  redoBtn.addEventListener('click', () => options?.onRedo?.());
  lateralBar.appendChild(redoBtn);

  container.appendChild(lateralBar);

  // --- 2. Parameters Popup Panel ---
  const popup = document.createElement('div');
  popup.className = 'tool-property-popup';

  const popupHeader = document.createElement('div');
  popupHeader.className = 'popup-header';

  const popupTitle = document.createElement('span');
  popupTitle.className = 'popup-title';
  popupTitle.textContent = 'Tool Property';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'popup-close-btn';
  closeBtn.title = 'Close Panel';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => toggleProperties(false));

  popupHeader.append(popupTitle, closeBtn);
  popup.appendChild(popupHeader);

  // Shape subtool selector
  const shapeRow = document.createElement('div');
  shapeRow.className = 'shape-selector-row';

  const shapeTypeContainer = document.createElement('div');
  shapeTypeContainer.className = 'seg-button-group';
  const shapeTypes: { id: ShapeType; label: string }[] = [
    { id: 'line', label: 'Line' },
    { id: 'rectangle', label: 'Rect' },
    { id: 'ellipse', label: 'Ellipse' },
  ];
  const shapeButtons = new Map<ShapeType, HTMLButtonElement>();
  for (const st of shapeTypes) {
    const btn = document.createElement('button');
    btn.className = 'seg-btn';
    btn.textContent = st.label;
    btn.addEventListener('click', () => setBrushSettings({ shapeType: st.id }));
    shapeTypeContainer.appendChild(btn);
    shapeButtons.set(st.id, btn);
  }

  const fillModeContainer = document.createElement('div');
  fillModeContainer.className = 'seg-button-group';
  const fillModes: { id: ShapeFillMode; label: string }[] = [
    { id: 'stroke', label: 'Stroke' },
    { id: 'fill', label: 'Fill' },
  ];
  const fillButtons = new Map<ShapeFillMode, HTMLButtonElement>();
  for (const fm of fillModes) {
    const btn = document.createElement('button');
    btn.className = 'seg-btn';
    btn.textContent = fm.label;
    btn.addEventListener('click', () => setBrushSettings({ shapeFill: fm.id }));
    fillModeContainer.appendChild(btn);
    fillButtons.set(fm.id, btn);
  }

  shapeRow.append(shapeTypeContainer, fillModeContainer);
  popup.appendChild(shapeRow);

  const colorRow = document.createElement('div');
  colorRow.className = 'color-row';
  const colorLabel = document.createElement('span');
  colorLabel.className = 'prop-label';
  colorLabel.textContent = 'Color';
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.className = 'color-picker';
  colorInput.addEventListener('input', () => setBrushSettings({ color: colorInput.value }));
  colorRow.append(colorLabel, colorInput);
  popup.appendChild(colorRow);

  const rangeInputs = new Map<SliderDef['key'], HTMLInputElement>();
  const valueNodes = new Map<SliderDef['key'], HTMLSpanElement>();

  for (const slider of SLIDERS) {
    const row = document.createElement('div');
    row.className = 'slider-row';

    const header = document.createElement('div');
    header.className = 'slider-header';

    const label = document.createElement('span');
    label.className = 'prop-label';
    label.textContent = slider.label;

    const value = document.createElement('span');
    value.className = 'slider-value';

    header.append(label, value);

    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'prop-slider';
    input.min = String(slider.min);
    input.max = String(slider.max);
    input.step = '1';

    input.addEventListener('input', () => {
      const val = Number(input.value) / slider.scale;
      setBrushSettings({ [slider.key]: val });
    });

    row.append(header, input);
    popup.appendChild(row);

    rangeInputs.set(slider.key, input);
    valueNodes.set(slider.key, value);
  }

  container.appendChild(popup);

  // --- 3. Synchronize View with State ---
  const sync = (state: ToolState): void => {
    for (const [id, button] of toolButtons) {
      button.classList.toggle('active', state.tool === id);
    }

    propsToggleBtn.classList.toggle('active', state.propertiesOpen);
    popup.classList.toggle('open', state.propertiesOpen);

    // Show/hide shape options
    shapeRow.style.display = state.tool === 'shape' ? 'flex' : 'none';
    for (const [id, btn] of shapeButtons) {
      btn.classList.toggle('active', state.brush.shapeType === id);
    }
    for (const [id, btn] of fillButtons) {
      btn.classList.toggle('active', state.brush.shapeFill === id);
    }

    popupTitle.textContent = `${state.tool.charAt(0).toUpperCase() + state.tool.slice(1)} Property`;
    colorInput.value = state.brush.color;

    for (const slider of SLIDERS) {
      const input = rangeInputs.get(slider.key);
      const node = valueNodes.get(slider.key);
      const val = state.brush[slider.key];
      if (input) {
        input.value = String(Math.round(val * slider.scale));
      }
      if (node) {
        if (slider.key === 'size') {
          node.textContent = `${Math.round(val)}px`;
        } else if (slider.key === 'stabilization') {
          node.textContent = `${Math.round(val)}`;
        } else {
          node.textContent = `${Math.round(val * 100)}%`;
        }
      }
    }
  };

  sync(getToolState());
  subscribeTools(sync);
}
