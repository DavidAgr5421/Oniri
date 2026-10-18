import type { LayerManager, LayerNode } from '../brush/layers';
import './layers.css';

const BLEND_MODES: { id: GlobalCompositeOperation; label: string }[] = [
  { id: 'source-over', label: 'Normal' },
  { id: 'multiply', label: 'Multiply' },
  { id: 'screen', label: 'Screen' },
  { id: 'overlay', label: 'Overlay' },
  { id: 'darken', label: 'Darken' },
  { id: 'lighten', label: 'Lighten' },
  { id: 'color-dodge', label: 'Color Dodge' },
  { id: 'difference', label: 'Difference' },
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

export function mountLayersView(container: HTMLElement, layerManager: LayerManager): void {
  container.innerHTML = '';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.right = '0';
  container.style.bottom = '0';
  container.style.width = '250px';
  container.style.pointerEvents = 'auto';
  container.style.zIndex = '100';
  container.style.display = 'block';

  const panel = document.createElement('aside');
  panel.className = 'layers-panel';

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
    <span>Layer</span>
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
  folderRow.innerHTML = `<span class="assign-label">Parent:</span>`;

  const folderSelect = document.createElement('select');
  folderSelect.className = 'layer-folder-select';
  folderSelect.addEventListener('change', () => {
    const val = folderSelect.value === 'root' ? null : folderSelect.value;
    layerManager.moveToFolder(layerManager.activeLayerId, val);
  });
  folderRow.appendChild(folderSelect);
  panel.appendChild(folderRow);

  // --- 4. Palette Actions Toolbar ---
  const actionsBar = document.createElement('div');
  actionsBar.className = 'layers-actions-bar';

  // New Raster Layer (+)
  const addLayerBtn = document.createElement('button');
  addLayerBtn.className = 'layer-action-btn';
  addLayerBtn.title = 'New Raster Layer';
  addLayerBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `;
  addLayerBtn.addEventListener('click', () => layerManager.createLayer());

  // New Layer Folder (Folder +)
  const addFolderBtn = document.createElement('button');
  addFolderBtn.className = 'layer-action-btn';
  addFolderBtn.title = 'New Layer Folder';
  addFolderBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `;
  addFolderBtn.addEventListener('click', () => layerManager.createFolder());

  // Clip at Layer Below (Clipping Mask Toggle)
  const clipLayerBtn = document.createElement('button');
  clipLayerBtn.className = 'layer-action-btn clip-btn';
  clipLayerBtn.title = 'Clip at Layer Below';
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

  // Delete Layer / Folder
  const deleteLayerBtn = document.createElement('button');
  deleteLayerBtn.className = 'layer-action-btn';
  deleteLayerBtn.title = 'Delete Selected Layer / Folder';
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

  // Move Up
  const moveUpBtn = document.createElement('button');
  moveUpBtn.className = 'layer-action-btn';
  moveUpBtn.title = 'Move Layer Up';
  moveUpBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `;
  moveUpBtn.addEventListener('click', () => {
    const idx = layerManager.layers.findIndex((l) => l.id === layerManager.activeLayerId);
    if (idx < layerManager.layers.length - 1) {
      layerManager.moveLayer(idx, idx + 1);
    }
  });

  // Move Down
  const moveDownBtn = document.createElement('button');
  moveDownBtn.className = 'layer-action-btn';
  moveDownBtn.title = 'Move Layer Down';
  moveDownBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;
  moveDownBtn.addEventListener('click', () => {
    const idx = layerManager.layers.findIndex((l) => l.id === layerManager.activeLayerId);
    if (idx > 0) {
      layerManager.moveLayer(idx, idx - 1);
    }
  });

  actionsBar.append(addLayerBtn, addFolderBtn, clipLayerBtn, deleteLayerBtn, moveUpBtn, moveDownBtn);
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
    }

    // Populate Parent Folder Select
    const folders = layerManager.layers.filter((l) => l.type === 'folder' && l.id !== active?.id);
    folderSelect.innerHTML = `<option value="root">None (Root Level)</option>`;
    for (const f of folders) {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = `📁 ${f.name}`;
      folderSelect.appendChild(opt);
    }
    folderSelect.value = active?.parentId ?? 'root';
    folderSelect.disabled = !active || !!active.isPaper;

    const layerMap = new Map(layerManager.layers.map((l) => [l.id, l]));

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
      eyeBtn.title = node.visible ? 'Hide Layer' : 'Show Layer';
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
        clipIndicator.title = 'Clipped at layer below';
        item.appendChild(clipIndicator);
      }

      // 4. Icon / Thumbnail
      if (node.type === 'folder') {
        const folderIcon = document.createElement('div');
        folderIcon.className = 'layer-folder-icon';
        folderIcon.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
        `;
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
        }
        item.appendChild(thumbCanvas);
      }

      // 5. Layer Name (Double click to rename)
      const nameText = document.createElement('span');
      nameText.className = 'layer-name-text';
      nameText.textContent = node.name;
      nameText.title = 'Double click to rename';

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

      // 6. Paper Lock Badge
      if (node.isPaper) {
        const lockBadge = document.createElement('span');
        lockBadge.className = 'layer-badge';
        lockBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        item.appendChild(lockBadge);
      }

      item.addEventListener('click', () => {
        layerManager.setActiveLayer(node.id);
      });

      listContainer.appendChild(item);
    }
  }

  layerManager.subscribe(render);
  render();
}
