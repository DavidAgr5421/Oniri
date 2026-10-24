import type {
  AntiAliasingLevel,
  BoneToolMode,
  BrushPropKey,
  DualBlendMode,
  PaperTextureId,
  PressureCurveMode,
  SelectionCombineMode,
  ShapeFillMode,
  ShapeType,
  TextureMode,
  ThicknessDirection,
  TipCycleMode,
  TipShape,
  TipTextureId,
  ToolId,
  ToolState,
} from './toolState';
import {
  getTabletSettings,
  getToolState,
  getSubToolsForTool,
  getActiveSubTool,
  createCustomSubTool,
  deleteSubTool,
  duplicateSubTool,
  moveSubToolToTool,
  resetSubTool,
  selectSubTool,
  setActiveColorSlot,
  setAutoKeyBones,
  setBoneToolMode,
  setBrushSettings,
  setSelectionCombineMode,
  setShowBonesOverlay,
  setTabletSettings,
  setTool,
  subscribeTools,
  swapColors,
  toggleProperties,
  toggleTransparentColor,
  setActiveSubToolGroup,
  getSubToolGroupsForTool,
  reorderSubTools,
  renameSubTool,
  toggleVisibleProperty,
  getSubToolGroup,
} from './toolState';
import { GAMMA_MAX, GAMMA_MIN, gammaForMode } from '../brush/pressureResponse';
import type { TimelineManager } from '../animation/timelineManager';
import { selectionModel } from '../selection/selectionModel';
import { createBrushPreview } from './brushPreview';
import { createColorPickerSection } from './colorPickerView';
import { createCustomScrollContainer } from './customScrollbar';

interface ToolDef {
  id: ToolId;
  label: string;
  shortcut: string;
  icon: string;
}

const TOOLS: ToolDef[] = [
  {
    id: 'move',
    label: 'Mover Capa (Atajo: V / K)',
    shortcut: 'V',
    icon: '<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'select',
    label: 'Área de Selección',
    shortcut: 'M',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 3"/>',
  },
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
    id: 'effect',
    label: 'Decoración / Efectos',
    shortcut: 'D',
    icon: '<path d="M12 2l2.4 5.6L20 10l-4.2 4.1 1 5.9-4.8-3-4.8 3 1-5.9L4 10l5.6-2.4z" fill="currentColor"/><path d="M19 2l.9 2.1L22 5l-1.6 1.5.4 2.2-1.8-1.1-1.8 1.1.4-2.2L16 5l2.1-.9z" fill="currentColor"/>',
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
  {
    id: 'rotate',
    label: 'Rotar Lienzo',
    shortcut: 'R',
    icon: '<path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="21 3 21 8 16 8" fill="currentColor"/>',
  },
];

import {
  openSubToolDetailModal,
  TIP_SHAPES,
  AA_LEVELS,
  PAPER_TEXTURES,
} from './subToolDetailModal';
import { openPressureCalibrationModal } from './pressureCalibrationModal';
import { openMaterialPickerModal } from './materialPickerModal';
import { PAPER_MATERIAL_CATALOG, TIP_MATERIAL_CATALOG } from '../brush/brushTextureAssets';

const QUICK_SIZES = [3, 5, 8, 12, 18, 28, 45, 70];

function openSubToolContextMenu(x: number, y: number, sub: any): void {
  const existing = document.querySelector('.csp-dynamics-popover');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.className = 'csp-dynamics-popover csp-subtool-context-menu';
  menu.style.top = `${y}px`;
  menu.style.left = `${Math.min(window.innerWidth - 180, x)}px`;

  const addOption = (text: string, icon: string, action: () => void, danger = false) => {
    const btn = document.createElement('button');
    btn.className = `csp-subtool-action-btn ${danger ? 'danger' : ''}`;
    btn.style.width = '100%';
    btn.style.justifyContent = 'flex-start';
    btn.style.padding = '5px 8px';
    btn.style.fontSize = '11.5px';
    btn.innerHTML = `<span style="margin-right:6px;">${icon}</span> ${text}`;
    btn.addEventListener('click', () => {
      menu.remove();
      action();
    });
    menu.appendChild(btn);
  };

  addOption('Cambiar nombre...', '✏️', () => {
    const newName = prompt('Nombre de la subherramienta:', sub.name);
    if (newName && newName.trim()) {
      renameSubTool(sub.id, newName.trim());
    }
  });

  addOption('Duplicar subherramienta', '📋', () => {
    const copy = duplicateSubTool(sub.id);
    if (copy) selectSubTool(copy.id);
  });

  addOption('Restablecer ajustes de fábrica', '↺', () => {
    resetSubTool(sub.id);
  });

  if (sub.custom) {
    addOption('Eliminar subherramienta', '🗑️', () => {
      deleteSubTool(sub.id);
    }, true);
  }

  addOption('Ajustes de subherramienta...', '⚙️', () => {
    openSubToolDetailModal(sub);
  });

  document.body.appendChild(menu);
  const close = (ev: MouseEvent) => {
    if (!menu.contains(ev.target as Node)) {
      menu.remove();
      window.removeEventListener('mousedown', close);
    }
  };
  setTimeout(() => window.addEventListener('mousedown', close), 10);
}

function openDynamicsPopover(anchor: HTMLElement, dynamicType: 'size' | 'opacity' | 'flow'): void {
  const existing = document.querySelector('.csp-dynamics-popover');
  if (existing) existing.remove();

  const state = getToolState();
  const rect = anchor.getBoundingClientRect();
  const popover = document.createElement('div');
  popover.className = 'csp-dynamics-popover';
  popover.style.top = `${rect.bottom + 4}px`;
  popover.style.left = `${Math.max(10, rect.left - 130)}px`;

  const title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.color = '#38bdf8';
  title.style.borderBottom = '1px solid #333';
  title.style.paddingBottom = '4px';
  title.textContent = dynamicType === 'size'
    ? 'Dinámica de tamaño'
    : dynamicType === 'opacity'
    ? 'Dinámica de opacidad'
    : 'Dinámica de flujo';
  popover.appendChild(title);

  // Pressure checkbox
  const pressRow = document.createElement('label');
  pressRow.style.display = 'flex';
  pressRow.style.alignItems = 'center';
  pressRow.style.gap = '6px';
  pressRow.style.cursor = 'pointer';

  const pressBox = document.createElement('input');
  pressBox.type = 'checkbox';
  pressBox.className = 'csp-checkbox';
  pressBox.checked = dynamicType === 'size' ? state.brush.pressureSize : state.brush.pressureFlow;

  pressBox.addEventListener('change', () => {
    if (dynamicType === 'size') setBrushSettings({ pressureSize: pressBox.checked });
    else setBrushSettings({ pressureFlow: pressBox.checked });
  });
  pressRow.append(pressBox, document.createTextNode('Presión del lápiz'));
  popover.appendChild(pressRow);

  if (dynamicType === 'size') {
    // Min Size Ratio
    const minRatioRow = document.createElement('div');
    minRatioRow.style.display = 'flex';
    minRatioRow.style.flexDirection = 'column';
    minRatioRow.style.gap = '2px';

    const minRatioLabel = document.createElement('div');
    minRatioLabel.style.display = 'flex';
    minRatioLabel.style.justifyContent = 'space-between';
    minRatioLabel.style.fontSize = '10px';
    minRatioLabel.style.color = '#94a3b8';
    minRatioLabel.innerHTML = `<span>Proporción mínima:</span><span>${Math.round(state.brush.minSizeRatio * 100)}%</span>`;

    const minRatioSlider = document.createElement('input');
    minRatioSlider.type = 'range';
    minRatioSlider.className = 'csp-slider';
    minRatioSlider.min = '0';
    minRatioSlider.max = '100';
    minRatioSlider.value = String(Math.round(state.brush.minSizeRatio * 100));
    minRatioSlider.addEventListener('input', () => {
      const val = Number(minRatioSlider.value) / 100;
      setBrushSettings({ minSizeRatio: val });
      minRatioLabel.querySelector('span:last-child')!.textContent = `${minRatioSlider.value}%`;
    });
    minRatioRow.append(minRatioLabel, minRatioSlider);
    popover.appendChild(minRatioRow);

    // Velocity checkbox
    const velRow = document.createElement('label');
    velRow.style.display = 'flex';
    velRow.style.alignItems = 'center';
    velRow.style.gap = '6px';
    velRow.style.cursor = 'pointer';

    const velBox = document.createElement('input');
    velBox.type = 'checkbox';
    velBox.className = 'csp-checkbox';
    velBox.checked = !!state.brush.velocitySize;
    velBox.addEventListener('change', () => {
      setBrushSettings({ velocitySize: velBox.checked });
    });
    velRow.append(velBox, document.createTextNode('Velocidad'));
    popover.appendChild(velRow);
  }

  // Tilt checkbox
  const tiltRow = document.createElement('label');
  tiltRow.style.display = 'flex';
  tiltRow.style.alignItems = 'center';
  tiltRow.style.gap = '6px';
  tiltRow.style.cursor = 'pointer';

  const tiltBox = document.createElement('input');
  tiltBox.type = 'checkbox';
  tiltBox.className = 'csp-checkbox';
  tiltBox.checked = state.tablet.tiltEnabled;
  tiltBox.addEventListener('change', () => {
    setTabletSettings({ tiltEnabled: tiltBox.checked });
  });
  tiltRow.append(tiltBox, document.createTextNode('Inclinación'));
  popover.appendChild(tiltRow);

  document.body.appendChild(popover);
  const close = (ev: MouseEvent) => {
    if (!popover.contains(ev.target as Node) && ev.target !== anchor) {
      popover.remove();
      window.removeEventListener('mousedown', close);
    }
  };
  setTimeout(() => window.addEventListener('mousedown', close), 10);
}

export interface ToolsViewOptions {
  onUndo?: () => void;
  onRedo?: () => void;
  onFillSelection?: () => void;
  onClearSelection?: () => void;
  onTransform?: () => void;
  timeline?: TimelineManager;
}

// ---------------------------------------------------------------------------
// Main Tools View Mount
// ---------------------------------------------------------------------------
export function mountToolsView(container: HTMLElement, options?: ToolsViewOptions): void {
  container.innerHTML = '';
  container.className = 'tools-root';

  // --- 1. Column 1: Lateral Tools Strip ---
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
    if (tool.id === 'pen' || tool.id === 'brush' || tool.id === 'effect' || tool.id === 'eraser') {
      button.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        button.style.outline = '2px solid #38bdf8';
      });
      button.addEventListener('dragleave', () => {
        button.style.outline = '';
      });
      button.addEventListener('drop', (e) => {
        e.preventDefault();
        button.style.outline = '';
        const subId = e.dataTransfer?.getData('text/plain');
        if (subId) {
          if (moveSubToolToTool(subId, tool.id)) {
            setTool(tool.id);
            selectSubTool(subId);
          }
        }
      });
    }
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

  // Color Widget at Bottom of Column 1
  const colorWidget = document.createElement('div');
  colorWidget.className = 'csp-color-widget';
  colorWidget.title = 'Colores (X: Alternar principal/secundario, C: Color transparente)';

  const swatchesOverlap = document.createElement('div');
  swatchesOverlap.className = 'csp-swatches-overlap';

  const secondarySwatch = document.createElement('div');
  secondarySwatch.className = 'csp-swatch secondary';
  secondarySwatch.title = 'Color Secundario (Clic para seleccionar)';
  secondarySwatch.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColorSlot('secondary');
    if (!getToolState().propertiesOpen) {
      toggleProperties(true);
    }
  });

  const primarySwatch = document.createElement('div');
  primarySwatch.className = 'csp-swatch primary';
  primarySwatch.title = 'Color Principal (Clic para seleccionar)';
  primarySwatch.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColorSlot('primary');
    if (!getToolState().propertiesOpen) {
      toggleProperties(true);
    }
  });

  const swapBtn = document.createElement('button');
  swapBtn.className = 'csp-swap-btn';
  swapBtn.title = 'Alternar color principal y secundario (Atajo: X)';
  swapBtn.innerHTML = `
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="7 10 12 15 17 10"/>
      <path d="M12 15V3"/>
    </svg>
  `;
  swapBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    swapColors();
  });

  swatchesOverlap.append(secondarySwatch, primarySwatch, swapBtn);
  colorWidget.appendChild(swatchesOverlap);

  const transparentTile = document.createElement('div');
  transparentTile.className = 'csp-transparent-tile';
  transparentTile.title = 'Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura';
  transparentTile.innerHTML = `<div class="csp-checkerboard"></div>`;
  transparentTile.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTransparentColor();
  });
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

  // --- 2. Column 2: Docked Palettes Panel ---
  const dock = document.createElement('div');
  dock.className = 'csp-sidebar-dock';

  // Section 3 Color Picker Component
  const colorPickerComp = createColorPickerSection();
  const colorSection = colorPickerComp.section;

  // Prop column / dock inner width
  const savedDockWidth = localStorage.getItem('oniri.dock.width');
  let currentDockInnerW = savedDockWidth ? Math.max(200, Math.min(500, Number(savedDockWidth))) : 250;

  function applyDockDimensions(): void {
    document.documentElement.style.setProperty('--left-dock-inner-width', `${currentDockInnerW}px`);
    document.documentElement.style.setProperty(
      '--left-dock-width',
      getToolState().propertiesOpen ? `${currentDockInnerW + 48}px` : '48px',
    );
  }

  // Dock Width Resizer Handle on right border
  const dockWidthResizer = document.createElement('div');
  dockWidthResizer.className = 'csp-dock-width-resizer';
  dockWidthResizer.title = 'Arrastrar para cambiar el ancho del panel';

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
    currentDockInnerW = Math.max(200, Math.min(500, startDockW + dx));
    localStorage.setItem('oniri.dock.width', String(currentDockInnerW));
    applyDockDimensions();
    subtoolScroll.update();
    propScroll.update();
    colorPickerComp.scroll.update();
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
    <div style="display:flex;align-items:center;gap:6px;min-width:0;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
      <span class="subtool-section-title">Subherramientas</span>
    </div>
  `;

  function actionBtn(text: string, title: string, danger = false): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = `csp-subtool-action-btn${danger ? ' danger' : ''}`;
    btn.textContent = text;
    btn.title = title;
    return btn;
  }

  const createBtn = actionBtn('+', 'Crear un pincel nuevo a partir del actual (duplicar)');
  const moveCatBtn = actionBtn('⇄', 'Mover pincel activo a otra herramienta (Pluma ↔ Pincel ↔ Efectos ↔ Borrador)');
  const resetBtn = actionBtn('↺', 'Restaurar los ajustes de fábrica de este pincel');
  const deleteBtn = actionBtn('🗑', 'Eliminar este pincel personalizado', true);

  let moveMenuEl: HTMLDivElement | null = null;
  moveCatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (moveMenuEl) {
      moveMenuEl.remove();
      moveMenuEl = null;
      return;
    }
    const activeSub = getActiveSubTool();
    if (!activeSub) return;
    const menu = document.createElement('div');
    Object.assign(menu.style, {
      position: 'fixed',
      zIndex: '9999',
      backgroundColor: '#252525',
      border: '1px solid #484848',
      borderRadius: '4px',
      padding: '4px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.65)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      minWidth: '155px',
    });
    const rect = moveCatBtn.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 4}px`;
    menu.style.left = `${Math.max(8, rect.left - 80)}px`;

    const targets: { id: ToolId; label: string }[] = [
      { id: 'pen', label: '✒️ Mover a Pluma (P)' },
      { id: 'brush', label: '🖌️ Mover a Pincel (B)' },
      { id: 'effect', label: '✨ Mover a Efectos (D)' },
      { id: 'eraser', label: '🧹 Mover a Borrador (E)' },
    ];
    for (const t of targets) {
      const itemBtn = document.createElement('button');
      const isCur = activeSub.tool === t.id;
      itemBtn.textContent = isCur ? `${t.label} (Actual)` : t.label;
      itemBtn.disabled = isCur;
      Object.assign(itemBtn.style, {
        textAlign: 'left',
        padding: '5px 8px',
        backgroundColor: isCur ? '#333' : 'transparent',
        color: isCur ? '#777' : '#e5e7eb',
        border: 'none',
        borderRadius: '3px',
        fontSize: '11.5px',
        cursor: isCur ? 'default' : 'pointer',
      });
      if (!isCur) {
        itemBtn.addEventListener('mouseenter', () => {
          itemBtn.style.backgroundColor = '#3b82f6';
        });
        itemBtn.addEventListener('mouseleave', () => {
          itemBtn.style.backgroundColor = 'transparent';
        });
        itemBtn.addEventListener('click', () => {
          const subId = activeSub.id;
          if (moveSubToolToTool(subId, t.id)) {
            setTool(t.id);
            selectSubTool(subId);
          }
          menu.remove();
          moveMenuEl = null;
        });
      }
      menu.appendChild(itemBtn);
    }
    const closeMenu = (ev: MouseEvent) => {
      if (!menu.contains(ev.target as Node)) {
        menu.remove();
        moveMenuEl = null;
        window.removeEventListener('mousedown', closeMenu);
      }
    };
    setTimeout(() => window.addEventListener('mousedown', closeMenu), 10);
    document.body.appendChild(menu);
    moveMenuEl = menu;
  });

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
  subtoolActions.append(moveCatBtn, createBtn, resetBtn, deleteBtn);
  subtoolHeader.appendChild(subtoolActions);

  // Subtool Group Tabs (e.g. [Plumilla] [Marcador] [Lápiz])
  const subtoolTabs = document.createElement('div');
  subtoolTabs.className = 'csp-subtool-tabs';

  // Section 1 custom scroll container
  const subtoolScroll = createCustomScrollContainer('csp-subtool-scroll-wrap');
  subtoolSection.append(subtoolHeader, subtoolTabs, subtoolScroll.wrap);

  // --- Splitter 1: Between Subtools & Tool Properties ---
  const splitterSubProp = document.createElement('div');
  splitterSubProp.className = 'csp-dock-splitter csp-splitter-subprop';
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
    const dockH = dock.clientHeight || window.innerHeight - 26;
    const maxSubH = Math.max(90, dockH - colorSection.offsetHeight - 110);
    currentSubtoolH = Math.max(70, Math.min(maxSubH, startSubH + dy));
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

  // =========================================================================
  // Section 2: Tool Property Palette (with its own custom scrollbar & eye visibility)
  // =========================================================================
  const propSection = document.createElement('div');
  propSection.className = 'dock-section prop-section';

  const propHeaderEl = document.createElement('div');
  propHeaderEl.className = 'dock-section-header';
  propHeaderEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      <span class="prop-section-title">Propiedad de herramienta</span>
    </div>
    <div style="display:flex;align-items:center;gap:4px;">
      <button class="csp-subtool-action-btn" id="csp-header-tablet" title="Ajustar nivel de detección de presión del lápiz (Tableta)" style="display:flex;align-items:center;justify-content:center;width:24px;height:22px;padding:0;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
        </svg>
      </button>
      <button class="csp-subtool-action-btn" id="csp-header-wrench" title="Ajustes de subherramienta" style="display:flex;align-items:center;justify-content:center;width:24px;height:22px;padding:0;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    </div>
  `;
  propHeaderEl.querySelector('#csp-header-tablet')?.addEventListener('click', () => {
    openPressureCalibrationModal();
  });
  propHeaderEl.querySelector('#csp-header-wrench')?.addEventListener('click', () => {
    const activeSub = getActiveSubTool();
    if (activeSub) openSubToolDetailModal(activeSub);
  });
  propSection.appendChild(propHeaderEl);

  // Section 2 custom scroll container (no overall sidebar scrollbar!)
  const propScroll = createCustomScrollContainer('csp-prop-scroll-wrap');
  const propBody = propScroll.list;

  const inkPropertyBoxes = new Map<BrushPropKey, HTMLElement>();

  interface PropHeaderOptions {
    propKey?: BrushPropKey;
    dynamicType?: 'size' | 'opacity' | 'flow';
    onEditValue?: (parsedValue: number) => void;
    min?: number;
    max?: number;
    unit?: string;
  }

  interface PropHeaderResult {
    header: HTMLDivElement;
    value: HTMLSpanElement;
    eyeBtn?: HTMLButtonElement;
    dynamicBtn?: HTMLButtonElement;
  }

  const propHeaderRefs = new Map<BrushPropKey, { eyeBtn: HTMLButtonElement; dynamicBtn?: HTMLButtonElement }>();

  function makePropHeader(
    label: string,
    valueText: string,
    options?: PropHeaderOptions,
  ): PropHeaderResult {
    const header = document.createElement('div');
    header.className = 'prop-row-header';

    const leftCol = document.createElement('div');
    leftCol.className = 'csp-prop-row-header-left';
    leftCol.style.display = 'flex';
    leftCol.style.alignItems = 'center';
    leftCol.style.gap = '5px';
    leftCol.style.minWidth = '0';

    let eyeBtn: HTMLButtonElement | undefined;
    if (options?.propKey) {
      eyeBtn = document.createElement('button');
      eyeBtn.className = 'csp-prop-eye-btn';
      eyeBtn.title = 'Fijar/ocultar esta propiedad en la paleta rápida';
      eyeBtn.innerHTML = '👁';
      const key = options.propKey;
      eyeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVisibleProperty(key);
      });
      leftCol.appendChild(eyeBtn);
    }

    const labelEl = document.createElement('span');
    labelEl.className = 'prop-label';
    labelEl.textContent = label;
    leftCol.appendChild(labelEl);

    const rightCol = document.createElement('div');
    rightCol.style.display = 'flex';
    rightCol.style.alignItems = 'center';
    rightCol.style.gap = '5px';

    let dynamicBtn: HTMLButtonElement | undefined;
    if (options?.dynamicType) {
      dynamicBtn = document.createElement('button');
      dynamicBtn.className = 'csp-prop-dynamic-btn';
      dynamicBtn.title = 'Ajustes de dinámica (presión de lápiz, velocidad, inclinación)';
      dynamicBtn.innerHTML = '⤹';
      const dtype = options.dynamicType;
      dynamicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDynamicsPopover(dynamicBtn!, dtype);
      });
      rightCol.appendChild(dynamicBtn);
    }

    const value = document.createElement('span');
    value.className = 'prop-value';
    value.textContent = valueText;

    if (options?.onEditValue) {
      value.classList.add('csp-editable-value');
      value.title = 'Haz clic para escribir el valor numérico exacto';
      value.addEventListener('click', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'csp-inline-num-input';
        const numStr = value.textContent?.replace(/[^0-9.-]/g, '') || '0';
        input.value = numStr;
        if (options.min !== undefined) input.min = String(options.min);
        if (options.max !== undefined) input.max = String(options.max);
        value.replaceWith(input);
        input.focus();
        input.select();

        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          let parsed = parseFloat(input.value);
          if (isNaN(parsed)) parsed = parseFloat(numStr) || 0;
          if (options.min !== undefined) parsed = Math.max(options.min, parsed);
          if (options.max !== undefined) parsed = Math.min(options.max, parsed);
          input.replaceWith(value);
          options.onEditValue!(parsed);
        };

        input.addEventListener('blur', finish);
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            finish();
          } else if (ev.key === 'Escape') {
            finished = true;
            input.replaceWith(value);
          }
        });
      });
    }

    rightCol.appendChild(value);
    header.append(leftCol, rightCol);

    if (options?.propKey && eyeBtn) {
      propHeaderRefs.set(options.propKey, { eyeBtn, dynamicBtn });
    }

    return { header, value, eyeBtn, dynamicBtn };
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
  const brushPreview = createBrushPreview();
  const previewBox = brushPreview.element;
  const queuePreview = brushPreview.update;
  propBody.appendChild(previewBox);

  // 1. Brush Size Box
  const sizeBox = document.createElement('div');
  sizeBox.className = 'prop-row-box';
  const sizeHeader = makePropHeader('Tamaño del pincel', '6.0 px', {
    propKey: 'size',
    dynamicType: 'size',
    onEditValue: (num) => setBrushSettings({ size: num }),
    min: 1,
    max: 200,
    unit: ' px',
  });
  sizeHeader.value.id = 'size-val';
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
  sizeBox.append(sizeHeader.header, sizeSlider, quickSizeRow);
  propBody.appendChild(sizeBox);
  inkPropertyBoxes.set('size', sizeBox);

  // 2. Opacity Box
  const opacityBox = document.createElement('div');
  opacityBox.className = 'prop-row-box';
  const opacityHeader = makePropHeader('Opacidad', '100%', {
    propKey: 'opacity',
    dynamicType: 'opacity',
    onEditValue: (pct) => setBrushSettings({ opacity: pct / 100 }),
    min: 1,
    max: 100,
    unit: '%',
  });
  opacityHeader.value.id = 'opacity-val';
  const opacitySlider = document.createElement('input');
  opacitySlider.type = 'range';
  opacitySlider.className = 'csp-slider';
  opacitySlider.min = '1';
  opacitySlider.max = '100';
  opacitySlider.addEventListener('input', () => {
    setBrushSettings({ opacity: Number(opacitySlider.value) / 100 });
  });
  opacityBox.append(opacityHeader.header, opacitySlider);
  propBody.appendChild(opacityBox);
  inkPropertyBoxes.set('opacity', opacityBox);

  // 3. Flow Box
  const flowBox = document.createElement('div');
  flowBox.className = 'prop-row-box';
  const flowHeader = makePropHeader('Densidad del pincel', '100%', {
    propKey: 'flow',
    dynamicType: 'flow',
    onEditValue: (pct) => setBrushSettings({ flow: pct / 100 }),
    min: 1,
    max: 100,
    unit: '%',
  });
  flowHeader.value.id = 'flow-val';
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
  flowBox.append(flowHeader.header, flowSlider, flowPressureRow);
  propBody.appendChild(flowBox);
  inkPropertyBoxes.set('flow', flowBox);

  // 4. Hardness Box
  const hardnessBox = document.createElement('div');
  hardnessBox.className = 'prop-row-box';
  const hardnessHeader = makePropHeader('Dureza', '100%', {
    propKey: 'hardness',
    onEditValue: (pct) => setBrushSettings({ hardness: pct / 100 }),
    min: 10,
    max: 100,
    unit: '%',
  });
  hardnessHeader.value.id = 'hardness-val';
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
  hardnessBox.append(hardnessHeader.header, hardnessDotsContainer);
  propBody.appendChild(hardnessBox);
  inkPropertyBoxes.set('hardness', hardnessBox);

  // 5. Stabilization Box
  const stabBox = document.createElement('div');
  stabBox.className = 'prop-row-box';
  const stabHeader = makePropHeader('Estabilización', '5', {
    propKey: 'stabilization',
    onEditValue: (val) => setBrushSettings({ stabilization: val }),
    min: 0,
    max: 10,
  });
  stabHeader.value.id = 'stab-val';
  const stabSlider = document.createElement('input');
  stabSlider.type = 'range';
  stabSlider.className = 'csp-slider';
  stabSlider.min = '0';
  stabSlider.max = '10';
  stabSlider.step = '1';
  stabSlider.addEventListener('input', () => {
    setBrushSettings({ stabilization: Number(stabSlider.value) });
  });
  stabBox.append(stabHeader.header, stabSlider);
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

  // 6b. Velocity Size Box
  const vsizeBox = document.createElement('div');
  vsizeBox.className = 'prop-row-box';
  const vsizeHeader = makePropHeader('Afinado por velocidad', '35%');
  const vsize = makeCheckbox('vsize-check', 'Afinar por velocidad');
  const vsizeRow = document.createElement('div');
  vsizeRow.className = 'csp-toggle-row';
  vsizeRow.append(vsize.box, vsize.label);
  const vsizeSlider = makeSlider('5', '100', '1');
  vsize.box.addEventListener('change', () => setBrushSettings({ velocitySize: vsize.box.checked }));
  vsizeSlider.addEventListener('input', () => {
    setBrushSettings({ velocityMinRatio: Number(vsizeSlider.value) / 100 });
  });
  vsizeBox.append(vsizeHeader.header, vsizeRow, vsizeSlider);
  propBody.appendChild(vsizeBox);
  inkPropertyBoxes.set('velocitySize', vsizeBox);

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

  // 8. Tip Shape & Material Box
  const tipBox = document.createElement('div');
  tipBox.className = 'prop-row-box';
  const tipLabel = document.createElement('span');
  tipLabel.className = 'prop-label';
  tipLabel.textContent = 'Forma de punta';
  const tipSeg = makeSegGroup<TipShape>(TIP_SHAPES, (id) => setBrushSettings({ tipShape: id }));

  const tipMatLabel = document.createElement('span');
  tipMatLabel.className = 'prop-label';
  tipMatLabel.style.marginTop = '4px';
  tipMatLabel.textContent = 'Material de punta';

  const tipMatPreviewCard = document.createElement('div');
  Object.assign(tipMatPreviewCard.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '4px 6px',
    backgroundColor: '#1f1f1f',
    border: '1px solid #3d3d3d',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '4px',
  });
  tipMatPreviewCard.title = 'Haz clic para ver la imagen del material y elegir entre las puntas disponibles';
  tipMatPreviewCard.addEventListener('click', () => {
    openMaterialPickerModal({
      category: 'tip',
      currentId: getToolState().brush.tipTexture || 'default',
      onSelect: (id) => {
        const typedId = id as TipTextureId;
        setBrushSettings({
          tipTexture: typedId,
          tipTextures:
            typedId === 'default'
              ? []
              : typedId === 'pencil-01'
                ? ['pencil-01', 'pencil-02', 'pencil-03']
                : typedId === 'brush-pen-01'
                  ? ['brush-pen-01', 'brush-pen-02']
                  : [typedId],
        });
      },
    });
  });

  const tipMatSeg = makeSegGroup<TipTextureId>(
    [
      { id: 'default', label: 'Lisa' },
      { id: 'real-g', label: 'G Real' },
      { id: 'gasagasa', label: 'Gasa' },
      { id: 'pencil-01', label: 'Grafito' },
      { id: 'brush-pen-01', label: 'Pincel' },
      { id: 'brush02', label: 'Cerdas' },
      { id: 'flat-square', label: 'Plana' },
    ],
    (id) =>
      setBrushSettings({
        tipTexture: id,
        tipTextures:
          id === 'default'
            ? []
            : id === 'pencil-01'
              ? ['pencil-01', 'pencil-02', 'pencil-03']
              : id === 'brush-pen-01'
                ? ['brush-pen-01', 'brush-pen-02']
                : [id],
      }),
  );

  const tipCycleLabel = document.createElement('span');
  tipCycleLabel.className = 'prop-label';
  tipCycleLabel.style.marginTop = '4px';
  tipCycleLabel.textContent = 'Secuencia de múltiples puntas';
  const tipCycleSeg = makeSegGroup<TipCycleMode>(
    [
      { id: 'single', label: 'Única' },
      { id: 'sequential', label: 'Ciclo' },
      { id: 'reverse', label: 'Ida/Vuelta' },
      { id: 'random', label: 'Azar' },
    ],
    (id) => setBrushSettings({ tipCycleMode: id }),
  );

  const followDir = makeCheckbox('follow-dir-check', 'Orientar con dirección del trazo');
  const followDirRow = document.createElement('div');
  followDirRow.className = 'csp-toggle-row';
  followDirRow.style.marginTop = '4px';
  followDirRow.append(followDir.box, followDir.label);
  followDir.box.addEventListener('change', () => setBrushSettings({ followDirection: followDir.box.checked }));

  const ribbonChk = makeCheckbox('ribbon-check', 'Cinta continua (Ribbon)');
  const ribbonRow = document.createElement('div');
  ribbonRow.className = 'csp-toggle-row';
  ribbonRow.append(ribbonChk.box, ribbonChk.label);
  ribbonChk.box.addEventListener('change', () =>
    setBrushSettings({
      ribbon: ribbonChk.box.checked,
      ...(ribbonChk.box.checked ? { followDirection: true } : {}),
    }),
  );

  tipBox.append(
    tipLabel,
    tipSeg.group,
    tipMatLabel,
    tipMatPreviewCard,
    tipMatSeg.group,
    tipCycleLabel,
    tipCycleSeg.group,
    followDirRow,
    ribbonRow,
  );
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

  // 10. Roundness (Thickness) & Angle Boxes
  const roundBox = document.createElement('div');
  roundBox.className = 'prop-row-box';
  const roundHeader = makePropHeader('Espesor / Achatamiento (Thickness)', '100%');
  const roundSlider = makeSlider('10', '100', '1');
  roundSlider.addEventListener('input', () => {
    setBrushSettings({ tipRoundness: Number(roundSlider.value) / 100 });
  });
  const thickDirSeg = makeSegGroup<ThicknessDirection>(
    [
      { id: 'horizontal', label: '↔ Horizontal' },
      { id: 'vertical', label: '↕ Vertical' },
    ],
    (id) => setBrushSettings({ thicknessDirection: id }),
  );
  thickDirSeg.group.style.marginTop = '4px';
  roundBox.append(roundHeader.header, roundSlider, thickDirSeg.group);
  propBody.appendChild(roundBox);
  inkPropertyBoxes.set('roundness', roundBox);

  const angleBox = document.createElement('div');
  angleBox.className = 'prop-row-box';
  const angleHeader = makePropHeader('Ángulo de punta (Angle)', '0°');
  const angleSlider = makeSlider('0', '180', '1');
  angleSlider.addEventListener('input', () => {
    setBrushSettings({ tipAngle: Number(angleSlider.value) });
  });
  angleBox.append(angleHeader.header, angleSlider);
  propBody.appendChild(angleBox);
  inkPropertyBoxes.set('angle', angleBox);

  // 11. Color Mix Box
  const colorMixBox = document.createElement('div');
  colorMixBox.className = 'prop-row-box';
  const colorMixHeader = makePropHeader('Mezcla de color / Acuarela', '0%');
  const colorMixSlider = makeSlider('0', '100', '1');
  colorMixSlider.addEventListener('input', () => {
    setBrushSettings({ colorMix: Number(colorMixSlider.value) / 100 });
  });
  colorMixBox.append(colorMixHeader.header, colorMixSlider);
  propBody.appendChild(colorMixBox);
  inkPropertyBoxes.set('colorMix', colorMixBox);

  // 12. Paper Texture Box
  const paperBox = document.createElement('div');
  paperBox.className = 'prop-row-box';
  const paperLabel = document.createElement('span');
  paperLabel.className = 'prop-label';
  paperLabel.textContent = 'Textura de papel (Grano)';

  const paperPreviewCard = document.createElement('div');
  Object.assign(paperPreviewCard.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '4px 6px',
    backgroundColor: '#1f1f1f',
    border: '1px solid #3d3d3d',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '4px',
  });
  paperPreviewCard.title = 'Haz clic para ver la imagen de la textura y abrir el selector de materiales de papel';
  paperPreviewCard.addEventListener('click', () => {
    openMaterialPickerModal({
      category: 'paper',
      currentId: getToolState().brush.paperTexture ?? 'none',
      onSelect: (id) => {
        const nextId = id as PaperTextureId;
        const curDens = getToolState().brush.textureDensity ?? 0;
        setBrushSettings({
          paperTexture: nextId,
          ...(nextId !== 'none' && curDens === 0 ? { textureDensity: 0.75 } : {}),
        });
      },
    });
  });

  const paperSeg = makeSegGroup<PaperTextureId>(PAPER_TEXTURES, (id) =>
    setBrushSettings({
      paperTexture: id,
      ...(id !== 'none' && (getToolState().brush.textureDensity ?? 0) === 0 ? { textureDensity: 0.75 } : {}),
    }),
  );

  const texModeLabel = document.createElement('span');
  texModeLabel.className = 'prop-label';
  texModeLabel.style.marginTop = '4px';
  texModeLabel.textContent = 'Modo de textura';
  const texModeSeg = makeSegGroup<TextureMode>(
    [
      { id: 'subtract', label: 'Restar' },
      { id: 'multiply', label: 'Multiplicar' },
      { id: 'height', label: 'Altura' },
      { id: 'outline', label: 'Contorno' },
    ],
    (id) => setBrushSettings({ textureMode: id }),
  );

  const texInvertChk = makeCheckbox('tex-invert-check', 'Invertir textura');
  const texInvertRow = document.createElement('div');
  texInvertRow.className = 'csp-toggle-row';
  texInvertRow.style.marginTop = '4px';
  texInvertRow.append(texInvertChk.box, texInvertChk.label);
  texInvertChk.box.addEventListener('change', () => setBrushSettings({ textureInvert: texInvertChk.box.checked }));

  const texPerTipChk = makeCheckbox('tex-pertip-check', 'Aplicar en cada punta (desact. = al final)');
  const texPerTipRow = document.createElement('div');
  texPerTipRow.className = 'csp-toggle-row';
  texPerTipRow.append(texPerTipChk.box, texPerTipChk.label);
  texPerTipChk.box.addEventListener('change', () => setBrushSettings({ textureApplyPerTip: texPerTipChk.box.checked }));

  paperBox.append(
    paperLabel,
    paperPreviewCard,
    paperSeg.group,
    texModeLabel,
    texModeSeg.group,
    texInvertRow,
    texPerTipRow,
  );
  propBody.appendChild(paperBox);
  inkPropertyBoxes.set('paperTexture', paperBox);

  // 13. Texture Density & Scale Box
  const densityBox = document.createElement('div');
  densityBox.className = 'prop-row-box';
  const densityHeader = makePropHeader('Densidad de textura (Texture density)', '0%');
  const densitySlider = makeSlider('0', '100', '1');
  densitySlider.addEventListener('input', () => {
    setBrushSettings({ textureDensity: Number(densitySlider.value) / 100 });
  });
  const texScaleHeader = makePropHeader('Escala de textura (Scale ratio)', '35%');
  texScaleHeader.header.style.marginTop = '4px';
  const texScaleSlider = makeSlider('10', '200', '5');
  texScaleSlider.addEventListener('input', () => {
    setBrushSettings({ textureScale: Number(texScaleSlider.value) / 100 });
  });
  densityBox.append(densityHeader.header, densitySlider, texScaleHeader.header, texScaleSlider);
  propBody.appendChild(densityBox);
  inkPropertyBoxes.set('textureDensity', densityBox);

  // 13a. Dual Brush Box (2-Shape / Dual Brush)
  const dualBrushBox = document.createElement('div');
  dualBrushBox.className = 'prop-row-box';
  const dualEnableChk = makeCheckbox('dual-enable-check', 'Doble Pincel (2-Shape / Dual Brush)');
  const dualEnableRow = document.createElement('div');
  dualEnableRow.className = 'csp-toggle-row';
  dualEnableRow.append(dualEnableChk.box, dualEnableChk.label);
  dualEnableChk.box.addEventListener('change', () => setBrushSettings({ dualBrushEnabled: dualEnableChk.box.checked }));

  const dualMatLabel = document.createElement('span');
  dualMatLabel.className = 'prop-label';
  dualMatLabel.style.marginTop = '4px';
  dualMatLabel.textContent = 'Material 2ª punta';
  const dualMatSeg = makeSegGroup<TipTextureId>(
    [
      { id: 'brush02', label: 'Cerdas' },
      { id: 'gasagasa', label: 'Gasa' },
      { id: 'pencil-01', label: 'Grafito' },
      { id: 'flat-square', label: 'Plana' },
      { id: 'default', label: 'Circular' },
    ],
    (id) => setBrushSettings({ dualTipTexture: id }),
  );

  const dualBlendLabel = document.createElement('span');
  dualBlendLabel.className = 'prop-label';
  dualBlendLabel.style.marginTop = '4px';
  dualBlendLabel.textContent = 'Modo Doble Pincel';
  const dualBlendSeg = makeSegGroup<DualBlendMode>(
    [
      { id: 'multiply', label: 'Multiplicar' },
      { id: 'subtract', label: 'Restar' },
      { id: 'darken', label: 'Oscurecer' },
      { id: 'lighten', label: 'Aclarar' },
    ],
    (id) => setBrushSettings({ dualBlendMode: id }),
  );

  const dualScaleHeader = makePropHeader('Escala 2ª punta', '100%');
  const dualScaleSlider = makeSlider('20', '250', '5');
  dualScaleSlider.addEventListener('input', () => {
    setBrushSettings({ dualSizeRatio: Number(dualScaleSlider.value) / 100 });
  });

  dualBrushBox.append(
    dualEnableRow,
    dualMatLabel,
    dualMatSeg.group,
    dualBlendLabel,
    dualBlendSeg.group,
    dualScaleHeader.header,
    dualScaleSlider,
  );
  propBody.appendChild(dualBrushBox);
  inkPropertyBoxes.set('dualBrush', dualBrushBox);

  // 13b. Tablet device settings: the pressure response and
  // the nib tilt belong to the tablet, not to a sub tool, so this box is always
  // visible for ink tools instead of being pinned like the brush properties.
  const tabletBox = document.createElement('div');
  tabletBox.className = 'prop-row-box tablet-box';
  const PRESSURE_MODE_LABELS: Record<PressureCurveMode, string> = {
    linear: 'Lineal',
    soft: 'Suave',
    hard: 'Dura',
    custom: 'Personalizada',
  };
  const tabletHeader = makePropHeader('Respuesta de presión (tableta)', 'Lineal');
  const pressureSeg = makeSegGroup<PressureCurveMode>(
    [
      { id: 'linear', label: 'Lineal' },
      { id: 'soft', label: 'Suave' },
      { id: 'hard', label: 'Dura' },
      { id: 'custom', label: 'A medida' },
    ],
    (id) =>
      setTabletSettings({
        pressure: { mode: id, gamma: gammaForMode(id, getTabletSettings().pressure.gamma) },
      }),
  );

  const gammaHeader = makePropHeader('Sensibilidad de la curva', '1.00');
  const gammaSlider = makeSlider(String(GAMMA_MIN), String(GAMMA_MAX), '0.05');
  gammaSlider.addEventListener('input', () => {
    setTabletSettings({ pressure: { mode: 'custom', gamma: Number(gammaSlider.value) } });
  });

  const tiltToggle = makeCheckbox('tilt-check', 'Inclinación de tableta (tilt)');
  const tiltRow = document.createElement('div');
  tiltRow.className = 'csp-toggle-row';
  tiltRow.append(tiltToggle.box, tiltToggle.label);
  tiltToggle.box.addEventListener('change', () => {
    setTabletSettings({ tiltEnabled: tiltToggle.box.checked });
  });

  const tiltHeader = makePropHeader('Fuerza de inclinación', '80%');
  const tiltSlider = makeSlider('0', '100', '1');
  tiltSlider.addEventListener('input', () => {
    setTabletSettings({ tiltAmount: Number(tiltSlider.value) / 100 });
  });

  tabletBox.append(
    tabletHeader.header,
    pressureSeg.group,
    gammaHeader.header,
    gammaSlider,
    tiltRow,
    tiltHeader.header,
    tiltSlider,
  );
  propBody.appendChild(tabletBox);

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

  // Bucket: Cerrar Hueco (Close Gap)
  const closeGapBox = document.createElement('div');
  closeGapBox.className = 'prop-row-box bucket-only';
  const closeGapHeader = document.createElement('div');
  closeGapHeader.className = 'prop-row-header';
  closeGapHeader.innerHTML = `
    <span class="prop-label">Cerrar hueco (Close Gap)</span>
    <span class="prop-value" id="gap-val">2 px</span>
  `;
  const closeGapSteps = [
    { val: 0, label: 'Off' },
    { val: 1, label: '1' },
    { val: 3, label: '3' },
    { val: 5, label: '5' },
    { val: 10, label: '10' },
    { val: 20, label: '20' },
  ];
  const closeGapBtnRow = document.createElement('div');
  closeGapBtnRow.className = 'csp-quick-size-row';
  const closeGapBtns: HTMLButtonElement[] = [];
  for (const step of closeGapSteps) {
    const btn = document.createElement('button');
    btn.className = 'csp-quick-size-btn';
    btn.textContent = step.label;
    btn.title = step.val === 0 ? 'Sin cierre de brechas' : `Cerrar brechas de hasta ${step.val} px`;
    btn.addEventListener('click', () => {
      setBrushSettings({ closeGap: step.val });
    });
    closeGapBtnRow.appendChild(btn);
    closeGapBtns.push(btn);
  }
  const closeGapSlider = document.createElement('input');
  closeGapSlider.type = 'range';
  closeGapSlider.className = 'csp-slider';
  closeGapSlider.min = '0';
  closeGapSlider.max = '20';
  closeGapSlider.addEventListener('input', () => {
    setBrushSettings({ closeGap: Number(closeGapSlider.value) });
  });
  closeGapBox.append(closeGapHeader, closeGapSlider, closeGapBtnRow);
  propBody.appendChild(closeGapBox);

  // Bucket: Escalado de Área (Area Scaling / Expand under lineart)
  const areaScaleBox = document.createElement('div');
  areaScaleBox.className = 'prop-row-box bucket-only';
  const areaScaleHeader = document.createElement('div');
  areaScaleHeader.className = 'prop-row-header';
  areaScaleHeader.innerHTML = `
    <span class="prop-label">Escalado de área (Expandir / Contraer)</span>
    <span class="prop-value" id="scale-val">+2 px</span>
  `;
  const areaScaleSlider = document.createElement('input');
  areaScaleSlider.type = 'range';
  areaScaleSlider.className = 'csp-slider';
  areaScaleSlider.min = '-10';
  areaScaleSlider.max = '10';
  areaScaleSlider.addEventListener('input', () => {
    setBrushSettings({ areaScaling: Number(areaScaleSlider.value) });
  });
  areaScaleBox.append(areaScaleHeader, areaScaleSlider);
  propBody.appendChild(areaScaleBox);

  // Bucket: Modo de Referencia (Refer Mode)
  const referBox = document.createElement('div');
  referBox.className = 'prop-row-box bucket-only';
  const referLabel = document.createElement('span');
  referLabel.className = 'prop-label';
  referLabel.textContent = 'Capa de referencia';
  referBox.appendChild(referLabel);

  const referSegGroup = document.createElement('div');
  referSegGroup.className = 'csp-seg-group';
  const referModes: { id: 'reference' | 'all' | 'editing' | 'below'; label: string }[] = [
    { id: 'reference', label: 'Faro (Ref)' },
    { id: 'all', label: 'Todas' },
    { id: 'editing', label: 'Editada' },
    { id: 'below', label: 'Inferior' },
  ];
  const referBtns = new Map<'reference' | 'all' | 'editing' | 'below', HTMLButtonElement>();
  for (const rm of referModes) {
    const rbtn = document.createElement('button');
    rbtn.className = 'csp-seg-btn';
    rbtn.textContent = rm.label;
    rbtn.addEventListener('click', () => setBrushSettings({ referMode: rm.id }));
    referSegGroup.appendChild(rbtn);
    referBtns.set(rm.id, rbtn);
  }
  referBox.appendChild(referSegGroup);
  propBody.appendChild(referBox);

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

  // Selection Tool Properties
  const selectBox = document.createElement('div');
  selectBox.className = 'prop-row-box select-only';
  selectBox.style.display = 'none';
  selectBox.style.flexDirection = 'column';
  selectBox.style.gap = '8px';

  const selectModeLabel = document.createElement('span');
  selectModeLabel.className = 'prop-label';
  selectModeLabel.textContent = 'Modo de Selección';
  selectBox.appendChild(selectModeLabel);

  const selectModes: { id: SelectionCombineMode; label: string }[] = [
    { id: 'replace', label: 'Nuevo' },
    { id: 'add', label: '+ Añadir' },
    { id: 'subtract', label: '- Restar' },
  ];
  const selectModeSeg = makeSegGroup<SelectionCombineMode>(selectModes, (id) => setSelectionCombineMode(id));
  selectBox.appendChild(selectModeSeg.group);

  const selectActionsLabel = document.createElement('span');
  selectActionsLabel.className = 'prop-label';
  selectActionsLabel.style.marginTop = '4px';
  selectActionsLabel.textContent = 'Operaciones de Selección';
  selectBox.appendChild(selectActionsLabel);

  const selectActionsGrid = document.createElement('div');
  selectActionsGrid.style.display = 'grid';
  selectActionsGrid.style.gridTemplateColumns = '1fr 1fr';
  selectActionsGrid.style.gap = '4px';

  function createSelActionBtn(text: string, title: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'csp-seg-btn';
    btn.textContent = text;
    btn.title = title;
    btn.style.padding = '5px 4px';
    btn.style.fontSize = '11px';
    btn.addEventListener('click', onClick);
    return btn;
  }

  const deselectBtn = createSelActionBtn('Deseleccionar', 'Deseleccionar todo (Ctrl+D)', () => {
    selectionModel.clearSelection();
  });
  const selectAllBtn = createSelActionBtn('Seleccionar Todo', 'Seleccionar todo el lienzo (Ctrl+A)', () => {
    selectionModel.selectAll();
  });
  const invertBtn = createSelActionBtn('Invertir', 'Invertir selección actual (Ctrl+Shift+I)', () => {
    selectionModel.invertSelection();
  });
  const fillSelBtn = createSelActionBtn('Rellenar', 'Rellenar área seleccionada con el color activo (Alt+Del)', () => {
    options?.onFillSelection?.();
  });
  const clearSelBtn = createSelActionBtn('Borrar', 'Borrar contenido dentro de la selección (Del)', () => {
    options?.onClearSelection?.();
  });
  const transformBtn = createSelActionBtn('Transformar (Ctrl+T)', 'Transformación libre: escalar, rotar, trasladar', () => {
    options?.onTransform?.();
  });

  selectActionsGrid.append(deselectBtn, selectAllBtn, invertBtn, fillSelBtn, clearSelBtn, transformBtn);
  selectBox.appendChild(selectActionsGrid);

  const selectHint = document.createElement('div');
  selectHint.style.fontSize = '10px';
  selectHint.style.lineHeight = '1.35';
  selectHint.style.color = '#9aa0a6';
  selectHint.style.marginTop = '2px';
  selectHint.textContent = 'Shift: Añadir a selección. Alt: Restar de selección. Clic para deseleccionar.';
  selectBox.appendChild(selectHint);

  propBody.appendChild(selectBox);

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
  wrenchBtn.textContent = 'Ajustes';
  wrenchBtn.title = 'Ajustes de subherramienta';
  wrenchBtn.addEventListener('click', () => {
    const activeSub = getActiveSubTool();
    if (activeSub) openSubToolDetailModal(activeSub);
  });

  propFooter.append(visibleCountLabel, wrenchBtn);
  propBody.appendChild(propFooter);

  propSection.appendChild(propScroll.wrap);

  // --- Splitter 2: Between Tool Properties & Color ---
  const splitterPropColor = document.createElement('div');
  splitterPropColor.className = 'csp-dock-splitter csp-splitter-propcolor';
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
    const dockH = dock.clientHeight || window.innerHeight - 26;
    const maxColorH = Math.max(120, dockH - subtoolSection.offsetHeight - 110);
    const currentColorH = Math.max(120, Math.min(maxColorH, startColorH - dy));
    colorSection.style.height = `${currentColorH}px`;
    localStorage.setItem('oniri.color.height', String(currentColorH));
    colorPickerComp.scroll.update();
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

  // Stacked Layout: Subtools on top, Properties in the middle (flex 1), Color on bottom
  dock.append(
    subtoolSection,
    splitterSubProp,
    propSection,
    splitterPropColor,
    colorSection,
    dockWidthResizer,
  );
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

    // 3. Update CSS variable on document for timeline docking offset and layout
    applyDockDimensions();

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

    // 5. Render Subtools for active tool with custom scrollbar, tabs, drag & drop, and context menu
    const groups = getSubToolGroupsForTool(state.tool);
    if (groups.length > 1) {
      subtoolTabs.style.display = 'flex';
      subtoolTabs.innerHTML = '';

      const allTab = document.createElement('button');
      allTab.className = `csp-subtool-tab ${!state.activeSubToolGroup ? 'active' : ''}`;
      allTab.textContent = 'Todas';
      allTab.addEventListener('click', () => setActiveSubToolGroup(null));
      subtoolTabs.appendChild(allTab);

      for (const grp of groups) {
        const tab = document.createElement('button');
        tab.className = `csp-subtool-tab ${state.activeSubToolGroup === grp ? 'active' : ''}`;
        tab.textContent = grp;
        tab.addEventListener('click', () => setActiveSubToolGroup(grp));
        subtoolTabs.appendChild(tab);
      }
    } else {
      subtoolTabs.style.display = 'none';
    }

    const allSubtools = getSubToolsForTool(state.tool);
    let subtools = allSubtools;
    if (state.activeSubToolGroup) {
      const filtered = allSubtools.filter((s) => getSubToolGroup(s) === state.activeSubToolGroup);
      if (filtered.length > 0) {
        subtools = filtered;
      }
    }
    const activeSub = subtools.find((s) => s.id === state.activeSubToolId);
    subtoolScroll.list.innerHTML = '';

    for (const sub of subtools) {
      const item = document.createElement('div');
      item.className = 'csp-subtool-item';
      item.classList.toggle('active', sub.id === state.activeSubToolId);
      item.classList.toggle('custom', !!sub.custom);
      item.dataset.subId = sub.id;

      const grip = document.createElement('span');
      grip.className = 'csp-subtool-grip';
      grip.title = 'Arrastrar para reordenar subherramientas';
      grip.textContent = '⋮⋮';
      item.appendChild(grip);

      const dot = document.createElement('span');
      dot.className = 'csp-subtool-dot';
      item.appendChild(dot);

      const name = document.createElement('span');
      name.className = 'csp-subtool-name';
      name.textContent = sub.name;
      name.title = 'Doble clic para cambiar el nombre (o clic derecho)';

      // Inline renaming on double click
      name.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'csp-subtool-name-input';
        input.value = sub.name;
        name.replaceWith(input);
        input.focus();
        input.select();

        let committed = false;
        const commit = () => {
          if (committed) return;
          committed = true;
          const val = input.value.trim();
          if (val && val !== sub.name) {
            renameSubTool(sub.id, val);
          } else {
            input.replaceWith(name);
          }
        };
        input.addEventListener('blur', commit);
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            commit();
          } else if (ev.key === 'Escape') {
            committed = true;
            input.replaceWith(name);
          }
        });
      });
      item.appendChild(name);

      if (sub.settings.size !== undefined) {
        const badge = document.createElement('span');
        badge.className = 'csp-subtool-size-badge';
        badge.textContent = `${Math.round(sub.settings.size)}`;
        item.appendChild(badge);
      }

      const gearBtn = document.createElement('button');
      gearBtn.className = 'csp-subtool-gear-btn';
      gearBtn.title = `Ajustes de subherramienta (${sub.name})`;
      gearBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      `;
      gearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSubToolDetailModal(sub);
      });
      item.appendChild(gearBtn);

      // Context menu on right click
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        openSubToolContextMenu(e.clientX, e.clientY, sub);
      });

      // Drag and drop reordering
      item.draggable = true;
      item.addEventListener('dragstart', (e) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData('text/plain', sub.id);
          e.dataTransfer.effectAllowed = 'move';
        }
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        subtoolScroll.list.querySelectorAll('.csp-subtool-item').forEach((el) => {
          el.classList.remove('drop-target-before', 'drop-target-after');
        });
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        const rect = item.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        if (e.clientY < midY) {
          item.classList.add('drop-target-before');
          item.classList.remove('drop-target-after');
        } else {
          item.classList.add('drop-target-after');
          item.classList.remove('drop-target-before');
        }
      });
      item.addEventListener('dragleave', () => {
        item.classList.remove('drop-target-before', 'drop-target-after');
      });
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer?.getData('text/plain');
        const rect = item.getBoundingClientRect();
        const placement = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        item.classList.remove('drop-target-before', 'drop-target-after');
        if (draggedId && draggedId !== sub.id) {
          reorderSubTools(draggedId, sub.id, placement);
        }
      });

      item.title = `${sub.description}\n(Doble clic para renombrar, clic derecho para menú de opciones)`;
      item.addEventListener('click', () => {
        selectSubTool(sub.id);
      });
      subtoolScroll.list.appendChild(item);
    }

    requestAnimationFrame(() => {
      subtoolScroll.update();
      propScroll.update();
      colorPickerComp.scroll.update();
    });

    const isInkCat = state.tool === 'pen' || state.tool === 'brush' || state.tool === 'effect' || state.tool === 'eraser';
    moveCatBtn.style.display = isInkCat ? 'inline-flex' : 'none';
    moveCatBtn.disabled = !activeSub || subtools.length <= 1;
    resetBtn.disabled = !activeSub;
    deleteBtn.disabled = !activeSub || !activeSub.custom;

    // 6. Tool Properties values & visibility filtering
    const isBoneTool = state.tool === 'bone';
    const isInkTool = state.tool === 'pen' || state.tool === 'brush' || state.tool === 'effect' || state.tool === 'eraser';

    previewBox.style.display = isInkTool ? 'block' : 'none';

    const isUnfilledBucket = state.tool === 'bucket' && state.activeSubToolId === 'bucket-unfilled';

    for (const [propKey, boxEl] of inkPropertyBoxes) {
      if (isInkTool || (isUnfilledBucket && propKey === 'size')) {
        const isPinned = isUnfilledBucket && propKey === 'size' ? true : state.visibleProperties.includes(propKey);
        boxEl.style.display = isPinned ? 'block' : 'none';
      } else {
        boxEl.style.display = 'none';
      }
    }

    visibleCountLabel.textContent = isInkTool
      ? `👁 ${state.visibleProperties.length} propiedades fijadas`
      : `${subtools.length} subherramientas`;

    if (isInkTool) queuePreview();

    for (const [propKey, refs] of propHeaderRefs) {
      const isPinned = state.visibleProperties.includes(propKey);
      refs.eyeBtn.classList.toggle('unpinned', !isPinned);
      if (refs.dynamicBtn) {
        if (propKey === 'size') {
          refs.dynamicBtn.classList.toggle('active', !!state.brush.pressureSize || !!state.brush.velocitySize);
        } else if (propKey === 'opacity' || propKey === 'flow') {
          refs.dynamicBtn.classList.toggle('active', !!state.brush.pressureFlow);
        }
      }
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

    psize.box.checked = state.brush.pressureSize;
    psizeSlider.value = String(Math.round(state.brush.minSizeRatio * 100));
    psizeSlider.disabled = !state.brush.pressureSize;
    psizeHeader.value.textContent = `${Math.round(state.brush.minSizeRatio * 100)}%`;

    vsize.box.checked = !!state.brush.velocitySize;
    vsizeSlider.value = String(Math.round((state.brush.velocityMinRatio ?? 0.35) * 100));
    vsizeSlider.disabled = !state.brush.velocitySize;
    vsizeHeader.value.textContent = `${Math.round((state.brush.velocityMinRatio ?? 0.35) * 100)}%`;

    taperStartSlider.value = String(Math.round(state.brush.taperStart));
    taperStartHeader.value.textContent = `${Math.round(state.brush.taperStart)} px`;
    taperEndSlider.value = String(Math.round(state.brush.taperEnd));
    taperEndHeader.value.textContent = `${Math.round(state.brush.taperEnd)} px`;

    const activeTipsCount = (state.brush.tipTextures && state.brush.tipTextures.length > 0)
      ? state.brush.tipTextures.length
      : (state.brush.tipTexture && state.brush.tipTexture !== 'default' ? 1 : 0);

    if (activeTipsCount > 1) {
      tipLabel.textContent = `Forma de punta (${activeTipsCount} materiales)`;
    } else if (activeTipsCount === 1) {
      tipLabel.textContent = `Forma de punta (Material)`;
    } else {
      tipLabel.textContent = 'Forma de punta';
    }

    for (const [id, btn] of tipSeg.buttons) {
      btn.classList.toggle('active', state.brush.tipShape === id);
    }
    const curTipTex: TipTextureId = state.brush.tipTexture || 'default';
    for (const [id, btn] of tipMatSeg.buttons) {
      btn.classList.toggle('active', curTipTex === id);
    }
    const curTipCatalogItem = TIP_MATERIAL_CATALOG.find((c) => c.id === curTipTex);
    tipMatPreviewCard.innerHTML = `
      <div style="display:flex;align-items:center;gap:7px;min-width:0;">
        <div style="width:26px;height:26px;flex-shrink:0;background:#e5e7eb;border:1px solid #555;border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          ${curTipCatalogItem?.dataUrl ? `<img src="${curTipCatalogItem.dataUrl}" style="max-width:100%;max-height:100%;object-fit:contain;filter:invert(0.85) contrast(1.4);"/>` : '<b style="color:#222;font-size:13px;">●</b>'}
        </div>
        <span style="font-size:11px;color:#e5e7eb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${curTipCatalogItem?.name ?? curTipTex}</span>
      </div>
      <span style="font-size:10px;color:#60a5fa;flex-shrink:0;">Elegir ▾</span>
    `;
    const curCycleMode: TipCycleMode = state.brush.tipCycleMode ?? 'random';
    for (const [id, btn] of tipCycleSeg.buttons) {
      btn.classList.toggle('active', curCycleMode === id);
    }
    followDir.box.checked = !!state.brush.followDirection;
    ribbonChk.box.checked = !!state.brush.ribbon;
    for (const [id, btn] of aaSeg.buttons) {
      btn.classList.toggle('active', state.brush.antiAliasing === id);
    }
    roundSlider.value = String(Math.round(state.brush.tipRoundness * 100));
    roundHeader.value.textContent = `${Math.round(state.brush.tipRoundness * 100)}%`;
    const curThickDir: ThicknessDirection = state.brush.thicknessDirection ?? 'vertical';
    for (const [id, btn] of thickDirSeg.buttons) {
      btn.classList.toggle('active', curThickDir === id);
    }
    angleSlider.value = String(Math.round(state.brush.tipAngle));
    angleHeader.value.textContent = `${Math.round(state.brush.tipAngle)}°`;

    colorMixSlider.value = String(Math.round((state.brush.colorMix ?? 0) * 100));
    colorMixHeader.value.textContent = `${Math.round((state.brush.colorMix ?? 0) * 100)}%`;

    const curPaperTex: PaperTextureId = state.brush.paperTexture ?? 'none';
    for (const [id, btn] of paperSeg.buttons) {
      btn.classList.toggle('active', curPaperTex === id);
    }
    const curPaperCatalogItem = PAPER_MATERIAL_CATALOG.find((c) => c.id === curPaperTex);
    paperPreviewCard.innerHTML = `
      <div style="display:flex;align-items:center;gap:7px;min-width:0;">
        <div style="width:28px;height:28px;flex-shrink:0;background:#e5e7eb;border:1px solid #555;border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          ${curPaperCatalogItem?.dataUrl ? `<img src="${curPaperCatalogItem.dataUrl}" style="width:100%;height:100%;object-fit:cover;"/>` : '<b style="color:#444;font-size:13px;">∅</b>'}
        </div>
        <span style="font-size:11px;color:#e5e7eb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${curPaperCatalogItem?.name ?? curPaperTex}</span>
      </div>
      <span style="font-size:10px;color:#60a5fa;flex-shrink:0;">Textura ▾</span>
    `;
    const curTexMode: TextureMode = state.brush.textureMode ?? 'height';
    for (const [id, btn] of texModeSeg.buttons) {
      btn.classList.toggle('active', curTexMode === id);
    }
    texInvertChk.box.checked = !!state.brush.textureInvert;
    texPerTipChk.box.checked = state.brush.textureApplyPerTip !== false;

    densitySlider.value = String(Math.round((state.brush.textureDensity ?? 0) * 100));
    densityHeader.value.textContent = `${Math.round((state.brush.textureDensity ?? 0) * 100)}%`;
    const scalePct = Math.round((state.brush.textureScale ?? 0.35) * 100);
    texScaleSlider.value = String(scalePct);
    texScaleHeader.value.textContent = `${scalePct}%`;

    dualEnableChk.box.checked = !!state.brush.dualBrushEnabled;
    const curDualMat: TipTextureId = state.brush.dualTipTexture ?? 'brush02';
    for (const [id, btn] of dualMatSeg.buttons) {
      btn.classList.toggle('active', curDualMat === id);
    }
    const curDualBlend: DualBlendMode = state.brush.dualBlendMode ?? 'multiply';
    for (const [id, btn] of dualBlendSeg.buttons) {
      btn.classList.toggle('active', curDualBlend === id);
    }
    const dualRatioPct = Math.round((state.brush.dualSizeRatio ?? 1.0) * 100);
    dualScaleSlider.value = String(dualRatioPct);
    dualScaleHeader.value.textContent = `${dualRatioPct}%`;

    tabletBox.style.display = isInkTool ? 'block' : 'none';
    if (isInkTool) {
      const tablet = state.tablet;
      tabletHeader.value.textContent = PRESSURE_MODE_LABELS[tablet.pressure.mode];
      for (const [id, btn] of pressureSeg.buttons) {
        btn.classList.toggle('active', tablet.pressure.mode === id);
      }
      gammaSlider.value = String(tablet.pressure.gamma);
      gammaHeader.value.textContent = tablet.pressure.gamma.toFixed(2);
      tiltToggle.box.checked = tablet.tiltEnabled;
      tiltSlider.disabled = !tablet.tiltEnabled;
      tiltSlider.value = String(Math.round(tablet.tiltAmount * 100));
      tiltHeader.value.textContent = `${Math.round(tablet.tiltAmount * 100)}%`;
    }

    const isBucket = state.tool === 'bucket';
    tolBox.style.display = isBucket ? 'block' : 'none';
    tolSlider.value = String(Math.round(state.brush.tolerance));
    const tolValNode = propBody.querySelector('#tol-val');
    if (tolValNode) tolValNode.textContent = `${Math.round(state.brush.tolerance)}%`;

    closeGapBox.style.display = isBucket ? 'block' : 'none';
    const curGap = state.brush.closeGap ?? 0;
    closeGapSlider.value = String(curGap);
    const gapValNode = propBody.querySelector('#gap-val');
    if (gapValNode) gapValNode.textContent = curGap === 0 ? 'Desactivado' : `${curGap} px`;
    closeGapBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', closeGapSteps[idx].val === curGap);
    });

    areaScaleBox.style.display = isBucket ? 'block' : 'none';
    const curScale = state.brush.areaScaling ?? 0;
    areaScaleSlider.value = String(curScale);
    const scaleValNode = propBody.querySelector('#scale-val');
    if (scaleValNode) {
      scaleValNode.textContent = curScale > 0 ? `+${curScale} px` : `${curScale} px`;
    }

    referBox.style.display = isBucket ? 'block' : 'none';
    const currentReferMode = state.brush.referMode ?? 'reference';
    for (const [id, btn] of referBtns) {
      btn.classList.toggle('active', currentReferMode === id);
    }

    shapeBox.style.display = state.tool === 'shape' ? 'block' : 'none';
    for (const [id, btn] of shapeBtns) {
      btn.classList.toggle('active', state.brush.shapeType === id);
    }
    for (const [id, btn] of fillBtns) {
      btn.classList.toggle('active', state.brush.shapeFill === id);
    }

    const isSelectTool = state.tool === 'select';
    selectBox.style.display = isSelectTool ? 'flex' : 'none';
    if (isSelectTool) {
      for (const [id, btn] of selectModeSeg.buttons) {
        btn.classList.toggle('active', state.selectionCombineMode === id);
      }
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
    colorPickerComp.sync(state);

    // Update scrollbars after content changes
    requestAnimationFrame(() => {
      subtoolScroll.update();
      propScroll.update();
      colorPickerComp.scroll.update();
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
