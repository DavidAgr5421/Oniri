import type { TimelineManager } from '../animation/timelineManager';
import type { BrushEngine } from '../brush/brushEngine';
import type { LayerManager, LayerNode } from '../brush/layers';
import './layers.css';

const BLEND_MODES: { id: GlobalCompositeOperation; label: string }[] = [
  { id: 'source-over', label: 'Normal' },
  { id: 'darken', label: 'Oscurecer' },
  { id: 'multiply', label: 'Multiplicar' },
  { id: 'color-burn', label: 'Subexponer color' },
  { id: 'lighten', label: 'Aclarar' },
  { id: 'screen', label: 'Trama (Screen)' },
  { id: 'color-dodge', label: 'Sobreexponer color' },
  { id: 'lighter', label: 'Añadir (brillo)' },
  { id: 'overlay', label: 'Superponer' },
  { id: 'soft-light', label: 'Luz suave' },
  { id: 'hard-light', label: 'Luz intensa' },
  { id: 'difference', label: 'Diferencia' },
  { id: 'exclusion', label: 'Exclusión' },
];

function getDepth(node: LayerNode, layerMap: Map<string, LayerNode>): number {
  let depth = 0;
  let curr = node.parentId ? layerMap.get(node.parentId) : undefined;
  while (curr) {
    depth++;
    curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
  }
  return depth;
}

function isAncestorCollapsed(node: LayerNode, layerMap: Map<string, LayerNode>): boolean {
  let curr = node.parentId ? layerMap.get(node.parentId) : undefined;
  while (curr) {
    if (curr.collapsed) return true;
    curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
  }
  return false;
}

// Hierarchical traversal: Folder headers appear directly ABOVE their contents in UI list
function getVisualHierarchyOrder(layers: LayerNode[]): LayerNode[] {
  const result: LayerNode[] = [];
  const getSiblings = (parentId: string | null): LayerNode[] => {
    return layers.filter((l) => l.parentId === parentId).reverse();
  };

  function traverse(parentId: string | null): void {
    const siblings = getSiblings(parentId);
    for (const node of siblings) {
      result.push(node);
      if (node.type === 'folder') {
        traverse(node.id);
      }
    }
  }

  traverse(null);
  return result;
}

export function mountLayersView(
  container: HTMLElement,
  layerManager: LayerManager,
  timeline?: TimelineManager,
  engine?: BrushEngine,
): void {
  container.innerHTML = '';
  container.style.position = 'absolute';
  container.style.top = '26px';
  container.style.right = '0';
  container.style.bottom = '0';
  container.style.width = 'var(--right-dock-width, 250px)';
  container.style.pointerEvents = 'auto';
  container.style.zIndex = '15';
  container.style.display = 'block';

  const panel = document.createElement('aside');
  panel.className = 'layers-panel';

  // Left-edge width resizer
  const resizer = document.createElement('div');
  resizer.className = 'csp-layers-width-resizer';
  resizer.title = 'Arrastrar para cambiar el ancho del panel de capas';

  const savedWidth = localStorage.getItem('oniri.layers.width');
  if (savedWidth) {
    const w = Math.max(180, Math.min(480, Number(savedWidth)));
    document.documentElement.style.setProperty('--right-dock-width', `${w}px`);
  }

  let isDragging = false;
  let startX = 0;
  let startWidth = 250;

  resizer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    startX = e.clientX;
    const currentW =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--right-dock-width')) ||
      250;
    startWidth = currentW;
    resizer.classList.add('dragging');
    resizer.setPointerCapture(e.pointerId);
  });

  resizer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const newWidth = Math.max(180, Math.min(480, startWidth - dx));
    document.documentElement.style.setProperty('--right-dock-width', `${newWidth}px`);
    localStorage.setItem('oniri.layers.width', String(newWidth));
  });

  const stopDrag = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('dragging');
    try {
      resizer.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  resizer.addEventListener('pointerup', stopDrag);
  resizer.addEventListener('pointercancel', stopDrag);

  panel.appendChild(resizer);

  // --- 1. Tab Header ---
  const tabHeader = document.createElement('div');
  tabHeader.className = 'layers-tab-header';

  const tab = document.createElement('div');
  tab.className = 'layers-tab-title active';
  tab.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
    <span>Capa (Layers)</span>
  `;
  tabHeader.appendChild(tab);
  panel.appendChild(tabHeader);

  // --- 2. Blend Mode & Opacity Strip ---
  const controlsRow = document.createElement('div');
  controlsRow.className = 'layer-controls-row';

  const blendSelect = document.createElement('select');
  blendSelect.className = 'layer-blend-select';
  for (const bm of BLEND_MODES) {
    const opt = document.createElement('option');
    opt.value = bm.id;
    opt.textContent = bm.label;
    blendSelect.appendChild(opt);
  }
  blendSelect.addEventListener('change', () => {
    layerManager.setLayerBlendMode(
      layerManager.activeLayerId,
      blendSelect.value as GlobalCompositeOperation,
    );
  });
  controlsRow.appendChild(blendSelect);

  const opacityBox = document.createElement('div');
  opacityBox.className = 'layer-opacity-box';

  const opacityLabel = document.createElement('span');
  opacityLabel.className = 'layer-opacity-label';
  opacityLabel.textContent = '100%';

  const opacitySlider = document.createElement('input');
  opacitySlider.type = 'range';
  opacitySlider.className = 'layer-opacity-slider';
  opacitySlider.min = '0';
  opacitySlider.max = '100';
  opacitySlider.step = '1';
  opacitySlider.value = '100';
  opacitySlider.addEventListener('input', () => {
    const val = Number(opacitySlider.value);
    opacityLabel.textContent = `${val}%`;
    layerManager.setLayerOpacity(layerManager.activeLayerId, val / 100);
  });

  opacityBox.append(opacitySlider, opacityLabel);
  controlsRow.appendChild(opacityBox);
  panel.appendChild(controlsRow);

  // --- 3. Parent Folder Assignment Strip ---
  const folderRow = document.createElement('div');
  folderRow.className = 'layer-folder-assign-row';
  folderRow.innerHTML = `<span class="assign-label">Carpeta:</span>`;

  const folderSelect = document.createElement('select');
  folderSelect.className = 'layer-folder-select';
  folderSelect.addEventListener('change', () => {
    const val = folderSelect.value === 'root' ? null : folderSelect.value;
    layerManager.moveToFolder(layerManager.activeLayerId, val);
  });
  folderRow.appendChild(folderSelect);
  panel.appendChild(folderRow);

  // --- 3b. 2D Bone Binding & Mesh Skinning Strip ---
  const boneRow = document.createElement('div');
  boneRow.className = 'layer-folder-assign-row';
  boneRow.style.gap = '4px';
  boneRow.innerHTML = `<span class="assign-label" title="Vincular esta capa a un Hueso 2D">🦴 Hueso:</span>`;

  const boneSelect = document.createElement('select');
  boneSelect.className = 'layer-folder-select';
  boneSelect.style.flex = '1';
  boneSelect.title = 'Vincular capa rígidamente a un hueso del esqueleto';
  boneSelect.addEventListener('change', () => {
    const active = layerManager.getActiveLayer();
    if (!active || active.isPaper) return;
    const boneId = boneSelect.value === '' ? null : boneSelect.value;
    layerManager.setLayerBoneBinding(active.id, boneId, !!active.meshSkinningEnabled);
  });

  const meshSkinBtn = document.createElement('button');
  meshSkinBtn.className = 'layer-action-btn';
  meshSkinBtn.style.width = 'auto';
  meshSkinBtn.style.padding = '2px 6px';
  meshSkinBtn.style.fontSize = '10px';
  meshSkinBtn.textContent = '🕸️ Malla';
  meshSkinBtn.title =
    'Malla Deformable (Linear Blend Skinning): deforma suavemente el dibujo de esta capa con todos los huesos cercanos';
  meshSkinBtn.addEventListener('click', () => {
    const active = layerManager.getActiveLayer();
    if (!active || active.isPaper || active.type !== 'raster') return;
    layerManager.setLayerBoneBinding(
      active.id,
      active.boundBoneId ?? null,
      !active.meshSkinningEnabled,
    );
  });

  boneRow.append(boneSelect, meshSkinBtn);
  panel.appendChild(boneRow);

  // --- 4. Palette Actions Toolbar (Clip Studio Paint Authentic) ---
  const actionsBar = document.createElement('div');
  actionsBar.className = 'layers-actions-bar';

  // 1. Clip at Layer Below (Ajustar a capa inferior)
  const clipLayerBtn = document.createElement('button');
  clipLayerBtn.className = 'layer-action-btn clip-btn';
  clipLayerBtn.title = 'Ajustar a capa inferior (Máscara de recorte)';
  clipLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="7" y="7" width="14" height="14" rx="2"/>
      <path d="M3 17V5a2 2 0 0 1 2-2h12"/>
      <polyline points="10 14 7 14 7 17"/>
    </svg>
  `;
  clipLayerBtn.addEventListener('click', () => {
    layerManager.toggleLayerClipping(layerManager.activeLayerId);
  });

  // 1b. Layer Color (Color de capa - Azul de boceto / Sketch Cyan)
  const layerColorBtn = document.createElement('button');
  layerColorBtn.className = 'layer-action-btn layer-color-btn';
  layerColorBtn.title = 'Color de capa (Azul de boceto CSP: colorea temporalmente el dibujo para entintar encima. Clic derecho para cambiar color)';
  layerColorBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M3 15l6-6 4 4 8-8"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
    </svg>
  `;
  layerColorBtn.addEventListener('click', () => {
    layerManager.toggleLayerColor(layerManager.activeLayerId);
    if (engine) {
      engine.compositeDirty = true;
      engine.updateComposite();
    }
  });
  layerColorBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const active = layerManager.getActiveLayer();
    if (!active || active.isPaper) return;
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = active.layerColor || '#00a0e9';
    picker.addEventListener('input', () => {
      layerManager.setLayerColor(active.id, picker.value);
      if (engine) {
        engine.compositeDirty = true;
        engine.updateComposite();
      }
    });
    picker.click();
  });

  // 2. Lock Transparent Pixels (Bloquear píxeles transparentes - Alpha Lock)
  const lockAlphaBtn = document.createElement('button');
  lockAlphaBtn.className = 'layer-action-btn lock-alpha-btn';
  lockAlphaBtn.title = 'Bloquear píxeles transparentes (Alpha Lock: pintar solo sobre dibujo existente)';
  lockAlphaBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.5"/>
      <rect x="3" y="3" width="9" height="9" fill="currentColor" fill-opacity="0.3" stroke="none"/>
      <rect x="12" y="12" width="9" height="9" fill="currentColor" fill-opacity="0.3" stroke="none"/>
      <rect x="11" y="12" width="8" height="7" rx="1.5" fill="#181818" stroke="currentColor" stroke-width="1.8"/>
      <path d="M13 12V10a2 2 0 1 1 4 0v2" stroke="currentColor" stroke-width="1.8"/>
    </svg>
  `;
  lockAlphaBtn.addEventListener('click', () => {
    layerManager.toggleLayerLockAlpha(layerManager.activeLayerId);
  });

  // 3. Lock Layer (Bloquear capa - Protección contra edición)
  const lockLayerBtn = document.createElement('button');
  lockLayerBtn.className = 'layer-action-btn lock-layer-btn';
  lockLayerBtn.title = 'Bloquear capa (Protege contra cualquier dibujo, borrado o cambio)';
  lockLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="5" y="11" width="14" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  `;
  lockLayerBtn.addEventListener('click', () => {
    layerManager.toggleLayerLock(layerManager.activeLayerId);
  });

  // 3b. Reference Layer (Faro - Capa de Referencia CSP para Bote Inteligente)
  const refLayerBtn = document.createElement('button');
  refLayerBtn.className = 'layer-action-btn ref-layer-btn';
  refLayerBtn.title = 'Establecer como capa de referencia (Faro: guía para el Bote de pintura inteligente)';
  refLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M12 2l2 4h-4l2-4z"/>
      <path d="M9 6h6l1 14H8L9 6z"/>
      <line x1="8" y1="11" x2="16" y2="11"/>
      <line x1="6" y1="20" x2="18" y2="20"/>
    </svg>
  `;
  refLayerBtn.addEventListener('click', () => {
    layerManager.toggleLayerReference(layerManager.activeLayerId);
  });

  // 4. New Raster Layer (+)
  const addLayerBtn = document.createElement('button');
  addLayerBtn.className = 'layer-action-btn';
  addLayerBtn.title = 'Nueva capa de rasterizado';
  addLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `;
  addLayerBtn.addEventListener('click', () => layerManager.createLayer());

  // 5. New Layer Folder (📁+)
  const addFolderBtn = document.createElement('button');
  addFolderBtn.className = 'layer-action-btn';
  addFolderBtn.title = 'Nueva carpeta de capas';
  addFolderBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `;
  addFolderBtn.addEventListener('click', () => layerManager.createFolder());

  // 6. New Animation Folder (🎞️ Track CSP)
  const addAnimFolderBtn = document.createElement('button');
  addAnimFolderBtn.className = 'layer-action-btn';
  addAnimFolderBtn.title = 'Nueva carpeta de animación (Track de animación)';
  addAnimFolderBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/>
      <line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  `;
  addAnimFolderBtn.addEventListener('click', () => layerManager.createAnimationFolder());

  // 7. Duplicate Layer (Duplicar capa - Ctrl+J)
  const duplicateLayerBtn = document.createElement('button');
  duplicateLayerBtn.className = 'layer-action-btn';
  duplicateLayerBtn.title = 'Duplicar capa (Ctrl+J)';
  duplicateLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="8" y="8" width="13" height="13" rx="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  `;
  duplicateLayerBtn.addEventListener('click', () => {
    layerManager.duplicateLayer(layerManager.activeLayerId);
  });

  // 8. Merge with Layer Below (Fusionar con capa inferior - Ctrl+E)
  const mergeBelowBtn = document.createElement('button');
  mergeBelowBtn.className = 'layer-action-btn';
  mergeBelowBtn.title = 'Combinar con capa inferior (Ctrl+E)';
  mergeBelowBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="3" x2="12" y2="15"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="4" y1="19" x2="20" y2="19" stroke-width="2.5"/>
    </svg>
  `;
  mergeBelowBtn.addEventListener('click', () => {
    layerManager.mergeLayerBelow(layerManager.activeLayerId);
  });

  // 9. Clear Layer (Borrar contenido de la capa - Delete)
  const clearLayerBtn = document.createElement('button');
  clearLayerBtn.className = 'layer-action-btn';
  clearLayerBtn.title = 'Borrar contenido de la capa (Limpiar lienzo)';
  clearLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 2L22 6L9 19L5 19L5 15L18 2Z"/>
      <line x1="14" y1="6" x2="18" y2="10"/>
      <line x1="3" y1="22" x2="21" y2="22"/>
    </svg>
  `;
  clearLayerBtn.addEventListener('click', () => {
    if (engine) {
      engine.clearActiveLayer();
    } else {
      layerManager.clearLayer(layerManager.activeLayerId);
    }
  });

  // 10. Delete Layer / Folder (Eliminar capa seleccionada)
  const deleteLayerBtn = document.createElement('button');
  deleteLayerBtn.className = 'layer-action-btn';
  deleteLayerBtn.title = 'Eliminar capa o carpeta seleccionada';
  deleteLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  `;
  deleteLayerBtn.addEventListener('click', () => {
    layerManager.deleteLayer(layerManager.activeLayerId);
  });

  // 11. Move Up (Subir capa)
  const moveUpBtn = document.createElement('button');
  moveUpBtn.className = 'layer-action-btn';
  moveUpBtn.title = 'Hacia la parte frontal (Subir capa)';
  moveUpBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `;
  moveUpBtn.addEventListener('click', () => {
    layerManager.moveLayerBranch(layerManager.activeLayerId, 'up');
  });

  // 12. Move Down (Bajar capa)
  const moveDownBtn = document.createElement('button');
  moveDownBtn.className = 'layer-action-btn';
  moveDownBtn.title = 'Abajo (Bajar capa)';
  moveDownBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;
  moveDownBtn.addEventListener('click', () => {
    layerManager.moveLayerBranch(layerManager.activeLayerId, 'down');
  });

  actionsBar.append(
    clipLayerBtn,
    layerColorBtn,
    lockAlphaBtn,
    lockLayerBtn,
    refLayerBtn,
    addLayerBtn,
    addFolderBtn,
    addAnimFolderBtn,
    duplicateLayerBtn,
    mergeBelowBtn,
    clearLayerBtn,
    deleteLayerBtn,
    moveUpBtn,
    moveDownBtn,
  );
  panel.appendChild(actionsBar);

  // --- 5. Scrollable Layer List ---
  const listContainer = document.createElement('div');
  listContainer.className = 'layers-list';
  panel.appendChild(listContainer);

  container.appendChild(panel);

  // --- 6. Render & Sync View ---
  function render(): void {
    listContainer.innerHTML = '';

    const active = layerManager.getActiveLayer();
    if (active) {
      blendSelect.value = active.blendMode;
      const opacityPct = Math.round(active.opacity * 100);
      opacitySlider.value = String(opacityPct);
      opacityLabel.textContent = `${opacityPct}%`;
      clipLayerBtn.classList.toggle('active', !!active.clipped);
      layerColorBtn.classList.toggle('active', !!active.useLayerColor);
      lockAlphaBtn.classList.toggle('active', !!active.lockAlpha);
      lockLayerBtn.classList.toggle('active', !!active.locked);
      refLayerBtn.classList.toggle('active', !!active.isReference);

      if (active.useLayerColor) {
        layerColorBtn.style.color = active.layerColor || '#00a0e9';
      } else {
        layerColorBtn.style.color = '';
      }

      // Disable buttons when layer is paper
      const isPaper = !!active.isPaper;
      clipLayerBtn.disabled = isPaper;
      layerColorBtn.disabled = isPaper;
      lockAlphaBtn.disabled = isPaper || active.type !== 'raster';
      lockLayerBtn.disabled = isPaper;
      refLayerBtn.disabled = isPaper;
      clearLayerBtn.disabled = isPaper || !!active.locked;
      deleteLayerBtn.disabled = isPaper;
      mergeBelowBtn.disabled = isPaper || !!active.locked || active.type !== 'raster';
    }

    // Populate Parent Folder Select
    const folders = layerManager.layers.filter((l) => l.type === 'folder' && l.id !== active?.id);
    folderSelect.innerHTML = `<option value="root">Ninguna (Nivel raíz)</option>`;
    for (const f of folders) {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = `📁 ${f.name}`;
      folderSelect.appendChild(opt);
    }
    folderSelect.value = active?.parentId ?? 'root';
    folderSelect.disabled = !active || !!active.isPaper;

    // Populate Bone Binding Select & Mesh Skinning button
    const bones = timeline?.bones ?? [];
    boneSelect.innerHTML = `<option value="">(Sin hueso)</option>`;
    for (const b of bones) {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = `🦴 ${b.name}`;
      boneSelect.appendChild(opt);
    }
    boneSelect.value = active?.boundBoneId ?? '';
    boneSelect.disabled = !active || !!active.isPaper || active.type !== 'raster';
    meshSkinBtn.classList.toggle('active', !!active?.meshSkinningEnabled);
    meshSkinBtn.style.color = active?.meshSkinningEnabled ? '#fbbf24' : '';
    meshSkinBtn.disabled = !active || !!active.isPaper || active.type !== 'raster';

    const layerMap = new Map(layerManager.layers.map((l) => [l.id, l]));
    const boneMap = new Map(bones.map((b) => [b.id, b]));

    // Hierarchical list traversal ensures child layers appear nested directly under their parent folder
    const orderedNodes = getVisualHierarchyOrder(layerManager.layers);

    for (const node of orderedNodes) {
      // If any ancestor folder is collapsed, skip rendering this child
      if (isAncestorCollapsed(node, layerMap)) continue;

      const depth = getDepth(node, layerMap);

      const item = document.createElement('div');
      item.className = 'layer-item';
      item.dataset.layerId = node.id;
      item.classList.toggle('active', node.id === layerManager.activeLayerId);
      item.classList.toggle('is-folder', node.type === 'folder');
      item.classList.toggle('is-clipped', !!node.clipped);
      if (depth > 0) {
        item.style.paddingLeft = `${8 + depth * 14}px`;
      }

      // 1. Folder Expand/Collapse Chevron (or spacer)
      if (node.type === 'folder') {
        const chevronBtn = document.createElement('button');
        chevronBtn.className = 'layer-folder-chevron';
        chevronBtn.title = node.collapsed ? 'Expand Folder' : 'Collapse Folder';
        chevronBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="${node.collapsed ? 'collapsed' : ''}">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        `;
        chevronBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          layerManager.toggleFolderCollapse(node.id);
        });
        item.appendChild(chevronBtn);
      } else {
        const spacer = document.createElement('span');
        spacer.className = 'layer-chevron-spacer';
        item.appendChild(spacer);
      }

      // 2. Eye Visibility Button
      const eyeBtn = document.createElement('button');
      eyeBtn.className = 'layer-eye-btn';
      eyeBtn.title = node.visible ? 'Ocultar capa' : 'Mostrar capa';
      eyeBtn.innerHTML = node.visible
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      eyeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        layerManager.setLayerVisibility(node.id, !node.visible);
      });
      item.appendChild(eyeBtn);

      // 3. Clipping Mask Indicator (Clip Studio Paint Pink/Red Bar)
      if (node.clipped) {
        const clipIndicator = document.createElement('div');
        clipIndicator.className = 'layer-clip-indicator';
        clipIndicator.title = 'Ajustada a la capa inferior';
        item.appendChild(clipIndicator);
      }

      // 4. Icon / Thumbnail
      if (node.type === 'folder') {
        const folderIcon = document.createElement('div');
        folderIcon.className = 'layer-folder-icon';
        if (node.isAnimationFolder) {
          folderIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          `;
          folderIcon.title = 'Carpeta de animación (Track)';
        } else {
          folderIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          `;
        }
        item.appendChild(folderIcon);
      } else {
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.className = 'layer-thumb';
        thumbCanvas.width = 36;
        thumbCanvas.height = 22;
        const thumbCtx = thumbCanvas.getContext('2d')!;
        if (node.isPaper) {
          thumbCtx.fillStyle = '#ffffff';
          thumbCtx.fillRect(0, 0, 36, 22);
        } else if (node.canvas) {
          thumbCtx.fillStyle = '#262626';
          thumbCtx.fillRect(0, 0, 36, 22);
          thumbCtx.drawImage(node.canvas, 0, 0, 36, 22);
          if (node.useLayerColor) {
            thumbCtx.save();
            thumbCtx.globalCompositeOperation = 'source-in';
            thumbCtx.fillStyle = node.layerColor || '#00a0e9';
            thumbCtx.fillRect(0, 0, 36, 22);
            thumbCtx.restore();
          }
        }
        item.appendChild(thumbCanvas);
      }

      // 5. Layer Name (Double click to rename)
      const nameText = document.createElement('span');
      nameText.className = 'layer-name-text';
      nameText.textContent = node.name;
      nameText.title = 'Doble clic para cambiar nombre';

      nameText.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'layer-name-input';
        input.value = node.name;

        const commit = (): void => {
          layerManager.renameLayer(node.id, input.value);
        };

        input.addEventListener('blur', commit);
        input.addEventListener('keydown', (ke) => {
          if (ke.key === 'Enter') {
            input.removeEventListener('blur', commit);
            commit();
          } else if (ke.key === 'Escape') {
            input.removeEventListener('blur', commit);
            render();
          }
        });

        nameText.replaceWith(input);
        input.focus();
        input.select();
      });
      item.appendChild(nameText);

      // 5b. Reference Layer Badge (Faro CSP)
      if (node.isReference) {
        const refBadge = document.createElement('span');
        refBadge.className = 'layer-badge';
        refBadge.style.color = '#38bdf8';
        refBadge.title = 'Capa de Referencia (Lineart de referencia para el Bote Inteligente)';
        refBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l2 4h-4l2-4z"/>
            <path d="M9 6h6l1 14H8L9 6z"/>
            <line x1="8" y1="11" x2="16" y2="11"/>
          </svg>
        `;
        item.appendChild(refBadge);
      }

      // 5b2. Layer Color Badge (CSP sketch cyan indicator)
      if (node.useLayerColor) {
        const colorBadge = document.createElement('span');
        colorBadge.className = 'layer-badge layer-color-badge';
        colorBadge.style.color = node.layerColor || '#00a0e9';
        colorBadge.title = `Color de capa activo (${node.layerColor || '#00a0e9'})`;
        colorBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="7"/>
          </svg>
        `;
        item.appendChild(colorBadge);
      }

      // 5c. Alpha Lock Badge (CSP checkerboard lock)
      if (node.lockAlpha) {
        const alphaBadge = document.createElement('span');
        alphaBadge.className = 'layer-badge alpha-lock-badge';
        alphaBadge.title = 'Píxeles transparentes bloqueados';
        alphaBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.5"/>
            <rect x="3" y="3" width="9" height="9" fill="currentColor" fill-opacity="0.4" stroke="none"/>
            <rect x="12" y="12" width="9" height="9" fill="currentColor" fill-opacity="0.4" stroke="none"/>
          </svg>
        `;
        item.appendChild(alphaBadge);
      }

      // 5c. Bone Binding / Mesh Skinning Badge
      if (node.meshSkinningEnabled) {
        const meshBadge = document.createElement('span');
        meshBadge.className = 'layer-badge';
        meshBadge.style.color = '#fbbf24';
        meshBadge.style.fontSize = '10px';
        meshBadge.title = 'Malla 2D Deformable (Linear Blend Skinning)';
        meshBadge.textContent = '🕸️';
        item.appendChild(meshBadge);
      } else if (node.boundBoneId) {
        const b = boneMap.get(node.boundBoneId);
        const boneBadge = document.createElement('span');
        boneBadge.className = 'layer-badge';
        boneBadge.style.color = b?.color ?? '#38bdf8';
        boneBadge.style.fontSize = '10px';
        boneBadge.title = `Vinculado a hueso: ${b?.name ?? node.boundBoneId}`;
        boneBadge.textContent = '🦴';
        item.appendChild(boneBadge);
      }

      // 6. Lock Badge (Locked layer or Paper)
      if (node.locked || node.isPaper) {
        const lockBadge = document.createElement('span');
        lockBadge.className = 'layer-badge lock-badge';
        lockBadge.title = node.isPaper ? 'Capa de papel protegida' : 'Capa bloqueada';
        lockBadge.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        item.appendChild(lockBadge);
      }

      item.addEventListener('click', () => {
        layerManager.setActiveLayer(node.id);
      });

      listContainer.appendChild(item);
    }
  }

  let renderRaf = 0;
  function scheduleRender(): void {
    if (renderRaf) return;
    renderRaf = requestAnimationFrame(() => {
      renderRaf = 0;
      render();
    });
  }

  layerManager.subscribe(scheduleRender);
  timeline?.subscribe(scheduleRender);
  render();
}
