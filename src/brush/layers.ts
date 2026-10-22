export type LayerType = 'raster' | 'folder';

export interface LayerNode {
  id: string;
  type: LayerType;
  name: string;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  visible: boolean;
  opacity: number; // 0 to 1
  blendMode: GlobalCompositeOperation;
  isPaper?: boolean;
  isAnimationFolder?: boolean;
  parentId: string | null;
  collapsed: boolean;
  clipped: boolean; // Clip at layer below
  locked?: boolean; // CSP Lock layer (padlock)
  lockAlpha?: boolean; // CSP Lock transparent pixels (checkerboard lock)
  isReference?: boolean; // CSP Reference layer (lighthouse beacon for smart fill)
  useLayerColor?: boolean; // CSP Layer Color effect (sketch blue/cyan)
  layerColor?: string; // Hex color (default '#00a0e9')
  boundBoneId?: string | null; // Rigid cutout binding to a Bone2D
  meshSkinningEnabled?: boolean; // Automatic multi-bone LBS mesh deformation
  offsetX?: number; // Layer position offset X relative to canvas (allows moving & unclipped pixels)
  offsetY?: number; // Layer position offset Y relative to canvas (allows moving & unclipped pixels)
}

export interface LayerManager {
  readonly layers: LayerNode[];
  activeLayerId: string;
  createLayer(name?: string, parentId?: string | null, isPaper?: boolean, fillColor?: string): LayerNode;
  createFolder(name?: string, parentId?: string | null, isAnimationFolder?: boolean): LayerNode;
  createAnimationFolder(name?: string): LayerNode;
  duplicateLayer(id?: string): LayerNode | null;
  mergeLayerBelow(id?: string): boolean;
  clearLayer(id?: string): boolean;
  toggleLayerLock(id?: string): void;
  toggleLayerLockAlpha(id?: string): void;
  toggleLayerReference(id?: string): void;
  toggleLayerColor(id?: string, color?: string): void;
  setLayerColor(id: string, color: string): void;
  getReferenceLayers(): LayerNode[];
  deleteLayer(id: string): boolean;
  renameLayer(id: string, newName: string): void;
  toggleFolderCollapse(id: string): void;
  toggleLayerClipping(id: string): void;
  setLayerBoneBinding(layerId: string, boneId: string | null, meshSkinning?: boolean): void;
  moveToFolder(layerId: string, targetFolderId: string | null): boolean;
  getActiveLayer(): LayerNode;
  getActiveDrawableLayer(): LayerNode;
  setActiveLayer(id: string): void;
  setLayerVisibility(id: string, visible: boolean): void;
  setLayerOpacity(id: string, opacity: number): void;
  setLayerBlendMode(id: string, mode: GlobalCompositeOperation): void;
  moveLayer(fromIndex: number, toIndex: number): void;
  moveLayerBranch(layerId: string, direction: 'up' | 'down'): boolean;
  loadLayers(newLayers: LayerNode[], newActiveId?: string): void;
  resize(w: number, h: number): void;
  subscribe(listener: () => void): () => void;
}

export function getRenderOrder(layers: LayerNode[]): LayerNode[] {
  const result: LayerNode[] = [];
  const getSiblings = (parentId: string | null): LayerNode[] => {
    return layers.filter((l) => l.parentId === parentId);
  };

  function traverse(parentId: string | null): void {
    const siblings = getSiblings(parentId);
    for (const node of siblings) {
      if (node.type === 'folder') {
        traverse(node.id);
      } else {
        result.push(node);
      }
    }
  }

  traverse(null);
  return result;
}

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function createLayerManager(docW: number, docH: number): LayerManager {
  let currentDocW = docW;
  let currentDocH = docH;
  let counter = 1;
  const layers: LayerNode[] = [];
  const listeners = new Set<() => void>();

  function notify(): void {
    for (const l of listeners) l();
  }

  // 1. Initial Paper Layer (Bottom white background)
  const paperCanvas = makeCanvas(docW, docH);
  const paperCtx = paperCanvas.getContext('2d', { willReadFrequently: true })!;
  paperCtx.fillStyle = '#ffffff';
  paperCtx.fillRect(0, 0, docW, docH);

  const paperLayer: LayerNode = {
    id: 'layer-paper',
    type: 'raster',
    name: 'Papel',
    canvas: paperCanvas,
    context: paperCtx,
    visible: true,
    opacity: 1,
    blendMode: 'source-over',
    isPaper: true,
    parentId: null,
    collapsed: false,
    clipped: false,
    locked: true,
  };
  layers.push(paperLayer);

  // 2. Initial Drawing Layer
  const initCanvas = makeCanvas(docW, docH);
  const initCtx = initCanvas.getContext('2d', { willReadFrequently: true })!;
  const firstLayer: LayerNode = {
    id: `layer-${counter}`,
    type: 'raster',
    name: `Capa ${counter}`,
    canvas: initCanvas,
    context: initCtx,
    visible: true,
    opacity: 1,
    blendMode: 'source-over',
    isPaper: false,
    parentId: null,
    collapsed: false,
    clipped: false,
    locked: false,
    lockAlpha: false,
  };
  layers.push(firstLayer);

  let activeId = firstLayer.id;

  const manager: LayerManager = {
    get layers() {
      return layers;
    },
    get activeLayerId() {
      return activeId;
    },
    set activeLayerId(id: string) {
      if (activeId === id) return;
      activeId = id;
      notify();
    },
    createLayer(name, parentId, isPaper = false, fillColor) {
      counter++;
      const canvas = makeCanvas(currentDocW, currentDocH);
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, currentDocW, currentDocH);
      }

      // Determine parent folder
      let targetParent = parentId;
      if (targetParent === undefined) {
        const active = layers.find((l) => l.id === activeId);
        if (active?.type === 'folder') {
          targetParent = active.id;
        } else if (active?.parentId) {
          targetParent = active.parentId;
        } else {
          targetParent = null;
        }
      }

      const layer: LayerNode = {
        id: `layer-${Date.now()}-${counter}`,
        type: 'raster',
        name: name || `Capa ${counter}`,
        canvas,
        context: ctx,
        visible: true,
        opacity: 1,
        blendMode: 'source-over',
        isPaper,
        parentId: targetParent,
        collapsed: false,
        clipped: false,
        locked: false,
        lockAlpha: false,
      };

      // Insert relative to parent folder or active layer
      const activeIdx = layers.findIndex((l) => l.id === activeId);
      if (activeIdx !== -1) {
        layers.splice(activeIdx + 1, 0, layer);
      } else {
        layers.push(layer);
      }

      activeId = layer.id;
      notify();
      return layer;
    },
    createFolder(name, parentId = null, isAnimationFolder = false) {
      counter++;
      const folder: LayerNode = {
        id: `folder-${Date.now()}-${counter}`,
        type: 'folder',
        name: name || (isAnimationFolder ? `Carpeta animación ${counter}` : `Carpeta ${counter}`),
        visible: true,
        opacity: 1,
        blendMode: 'source-over',
        isAnimationFolder,
        parentId,
        collapsed: false,
        clipped: false,
        locked: false,
      };

      const activeIdx = layers.findIndex((l) => l.id === activeId);
      if (activeIdx !== -1) {
        layers.splice(activeIdx + 1, 0, folder);
      } else {
        layers.push(folder);
      }

      activeId = folder.id;
      notify();
      return folder;
    },
    createAnimationFolder(name) {
      return manager.createFolder(name, null, true);
    },
    duplicateLayer(id) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper) return null;

      counter++;
      const targetIdx = layers.findIndex((l) => l.id === target.id);

      if (target.type === 'raster') {
        const copyCanvas = makeCanvas(currentDocW, currentDocH);
        const copyCtx = copyCanvas.getContext('2d', { willReadFrequently: true })!;
        if (target.canvas) {
          copyCtx.drawImage(target.canvas, 0, 0);
        }

        const newLayer: LayerNode = {
          id: `layer-${Date.now()}-${counter}`,
          type: 'raster',
          name: `${target.name} (copia)`,
          canvas: copyCanvas,
          context: copyCtx,
          visible: target.visible,
          opacity: target.opacity,
          blendMode: target.blendMode,
          isPaper: false,
          parentId: target.parentId,
          collapsed: false,
          clipped: target.clipped,
          locked: false,
          lockAlpha: target.lockAlpha,
          useLayerColor: target.useLayerColor,
          layerColor: target.layerColor,
          boundBoneId: target.boundBoneId,
          meshSkinningEnabled: target.meshSkinningEnabled,
        };

        layers.splice(targetIdx + 1, 0, newLayer);
        activeId = newLayer.id;
        notify();
        return newLayer;
      } else {
        const newFolder: LayerNode = {
          id: `folder-${Date.now()}-${counter}`,
          type: 'folder',
          name: `${target.name} (copia)`,
          visible: target.visible,
          opacity: target.opacity,
          blendMode: target.blendMode,
          isAnimationFolder: target.isAnimationFolder,
          parentId: target.parentId,
          collapsed: target.collapsed,
          clipped: target.clipped,
          locked: false,
        };
        layers.splice(targetIdx + 1, 0, newFolder);
        activeId = newFolder.id;
        notify();
        return newFolder;
      }
    },
    mergeLayerBelow(id) {
      const targetId = id || activeId;
      const targetIdx = layers.findIndex((l) => l.id === targetId);
      if (targetIdx <= 0) return false;

      const upper = layers[targetIdx];
      if (!upper || upper.isPaper || upper.type !== 'raster' || !upper.canvas || upper.locked) {
        return false;
      }

      // Find the raster layer directly below upper in layer list
      let lowerIdx = targetIdx - 1;
      while (lowerIdx >= 0 && layers[lowerIdx].type !== 'raster') {
        lowerIdx--;
      }
      if (lowerIdx < 0) return false;
      const lower = layers[lowerIdx];
      if (lower.isPaper || !lower.context || lower.locked) return false;

      // Draw upper onto lower with upper's opacity and blendMode
      lower.context.save();
      lower.context.globalAlpha = upper.opacity;
      lower.context.globalCompositeOperation = upper.blendMode;
      lower.context.drawImage(upper.canvas, 0, 0);
      lower.context.restore();

      // Remove upper layer
      layers.splice(targetIdx, 1);
      activeId = lower.id;
      notify();
      return true;
    },
    clearLayer(id) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper || target.locked || !target.context) return false;
      target.context.clearRect(0, 0, currentDocW, currentDocH);
      notify();
      return true;
    },
    toggleLayerLock(id) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper) return;
      target.locked = !target.locked;
      notify();
    },
    toggleLayerLockAlpha(id) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper || target.type !== 'raster') return;
      target.lockAlpha = !target.lockAlpha;
      notify();
    },
    toggleLayerReference(id) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper) return;
      target.isReference = !target.isReference;
      notify();
    },
    toggleLayerColor(id, color) {
      const targetId = id || activeId;
      const target = layers.find((l) => l.id === targetId);
      if (!target || target.isPaper) return;
      target.useLayerColor = !target.useLayerColor;
      if (color) {
        target.layerColor = color;
      } else if (!target.layerColor) {
        target.layerColor = '#00a0e9'; // CSP standard sketch cyan
      }
      notify();
    },
    setLayerColor(id, color) {
      const target = layers.find((l) => l.id === id);
      if (!target || target.isPaper) return;
      target.layerColor = color;
      notify();
    },
    getReferenceLayers() {
      return layers.filter((l) => l.isReference && l.visible && !l.isPaper);
    },
    deleteLayer(id: string): boolean {
      if (layers.length <= 1) return false;
      const target = layers.find((l) => l.id === id);
      if (!target || target.isPaper) return false;

      // Collect all descendant ids if target is a folder
      const idsToDelete = new Set<string>([id]);
      let added = true;
      while (added) {
        added = false;
        for (const l of layers) {
          if (l.parentId && idsToDelete.has(l.parentId) && !idsToDelete.has(l.id)) {
            idsToDelete.add(l.id);
            added = true;
          }
        }
      }

      if (idsToDelete.size >= layers.length) return false;

      for (let i = layers.length - 1; i >= 0; i--) {
        if (idsToDelete.has(layers[i].id)) {
          layers.splice(i, 1);
        }
      }

      if (idsToDelete.has(activeId)) {
        activeId = layers[layers.length - 1].id;
      }

      notify();
      return true;
    },
    renameLayer(id: string, newName: string) {
      const clean = newName.trim();
      if (!clean) return;
      const node = layers.find((l) => l.id === id);
      if (node && node.name !== clean) {
        node.name = clean;
        notify();
      }
    },
    toggleFolderCollapse(id: string) {
      const folder = layers.find((l) => l.id === id && l.type === 'folder');
      if (folder) {
        folder.collapsed = !folder.collapsed;
        notify();
      }
    },
    toggleLayerClipping(id: string) {
      const node = layers.find((l) => l.id === id);
      if (node && !node.isPaper) {
        node.clipped = !node.clipped;
        notify();
      }
    },
    setLayerBoneBinding(layerId: string, boneId: string | null, meshSkinning?: boolean) {
      const node = layers.find((l) => l.id === layerId);
      if (!node || node.isPaper) return;
      node.boundBoneId = boneId;
      if (meshSkinning !== undefined) {
        node.meshSkinningEnabled = meshSkinning;
      }
      notify();
    },
    moveToFolder(layerId: string, targetFolderId: string | null): boolean {
      const node = layers.find((l) => l.id === layerId);
      if (!node || node.isPaper) return false;
      if (node.id === targetFolderId) return false;

      // Prevent circular parenting
      if (targetFolderId !== null) {
        let curr = layers.find((l) => l.id === targetFolderId);
        while (curr) {
          if (curr.id === node.id) return false;
          curr = curr.parentId ? layers.find((l) => l.id === curr!.parentId) : undefined;
        }
      }

      node.parentId = targetFolderId;
      notify();
      return true;
    },
    getActiveLayer(): LayerNode {
      return layers.find((l) => l.id === activeId) ?? layers[layers.length - 1];
    },
    getActiveDrawableLayer(): LayerNode {
      const active = layers.find((l) => l.id === activeId);
      if (active && active.type === 'raster' && active.context && !active.locked) {
        return active;
      }
      if (active && active.type === 'folder') {
        const child = layers.find((l) => l.parentId === active.id && l.type === 'raster' && l.context && !l.locked);
        if (child) return child;
      }
      const topRaster = [...layers].reverse().find((l) => l.type === 'raster' && l.context && !l.isPaper && !l.locked);
      if (topRaster) return topRaster;
      return manager.createLayer();
    },
    setActiveLayer(id: string) {
      if (activeId === id) return;
      activeId = id;
      notify();
    },
    setLayerVisibility(id: string, visible: boolean) {
      const node = layers.find((l) => l.id === id);
      if (node && node.visible !== visible) {
        node.visible = visible;
        notify();
      }
    },
    setLayerOpacity(id: string, opacity: number) {
      const node = layers.find((l) => l.id === id);
      if (node) {
        node.opacity = Math.max(0, Math.min(1, opacity));
        notify();
      }
    },
    setLayerBlendMode(id: string, mode: GlobalCompositeOperation) {
      const node = layers.find((l) => l.id === id);
      if (node) {
        node.blendMode = mode;
        notify();
      }
    },
    moveLayer(fromIndex: number, toIndex: number) {
      if (fromIndex < 0 || fromIndex >= layers.length) return;
      if (toIndex < 0 || toIndex >= layers.length) return;
      if (fromIndex === toIndex) return;

      const [removed] = layers.splice(fromIndex, 1);
      layers.splice(toIndex, 0, removed);
      notify();
    },
    moveLayerBranch(layerId: string, direction: 'up' | 'down'): boolean {
      const node = layers.find((l) => l.id === layerId);
      if (!node || node.isPaper) return false;

      // Get siblings with same parentId
      const siblings = layers.filter((l) => l.parentId === node.parentId);
      const sibIdx = siblings.findIndex((s) => s.id === node.id);
      if (sibIdx === -1) return false;

      let targetSib: LayerNode | undefined;
      if (direction === 'up') {
        if (sibIdx >= siblings.length - 1) return false;
        targetSib = siblings[sibIdx + 1];
      } else {
        if (sibIdx <= 0) return false;
        targetSib = siblings[sibIdx - 1];
        if (targetSib.isPaper) return false;
      }

      // Collect all descendant ids of node
      const nodeBlockIds = new Set<string>([node.id]);
      let added = true;
      while (added) {
        added = false;
        for (const l of layers) {
          if (l.parentId && nodeBlockIds.has(l.parentId) && !nodeBlockIds.has(l.id)) {
            nodeBlockIds.add(l.id);
            added = true;
          }
        }
      }

      const nodeBlock = layers.filter((l) => nodeBlockIds.has(l.id));

      // Remove node block from layers
      for (let i = layers.length - 1; i >= 0; i--) {
        if (nodeBlockIds.has(layers[i].id)) {
          layers.splice(i, 1);
        }
      }

      // Collect target sibling's block
      const targetBlockIds = new Set<string>([targetSib.id]);
      added = true;
      while (added) {
        added = false;
        for (const l of layers) {
          if (l.parentId && targetBlockIds.has(l.parentId) && !targetBlockIds.has(l.id)) {
            targetBlockIds.add(l.id);
            added = true;
          }
        }
      }

      if (direction === 'up') {
        let lastTargetIdx = -1;
        for (let i = layers.length - 1; i >= 0; i--) {
          if (targetBlockIds.has(layers[i].id)) {
            lastTargetIdx = i;
            break;
          }
        }
        layers.splice(lastTargetIdx + 1, 0, ...nodeBlock);
      } else {
        const targetIdx = layers.findIndex((l) => l.id === targetSib!.id);
        layers.splice(targetIdx, 0, ...nodeBlock);
      }

      notify();
      return true;
    },
    loadLayers(newLayers: LayerNode[], newActiveId?: string): void {
      layers.length = 0;
      layers.push(...newLayers);
      if (newActiveId) {
        activeId = newActiveId;
      } else {
        const drawable = layers.slice().reverse().find((l) => l.type === 'raster' && !l.isPaper);
        activeId = drawable ? drawable.id : (layers.length > 0 ? layers[0].id : '');
      }
      notify();
    },
    resize(w: number, h: number): void {
      currentDocW = w;
      currentDocH = h;
    },
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };

  return manager;
}
