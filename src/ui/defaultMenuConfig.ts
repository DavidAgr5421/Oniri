import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import { viewportNav } from '../canvas/viewportNavigation';
import { selectionModel } from '../selection/selectionModel';
import { transformManager } from '../selection/transformGizmo';
import {
  getSelectionLauncherEnabled,
  setSelectionLauncherEnabled,
  openSelectionLauncherSettingsModal,
} from '../selection/selectionLauncher';
import { openPressureCalibrationModal } from '../tools/pressureCalibrationModal';
import { openExportAnimationModal } from '../animation/exportAnimation';
import { cameraFrameManager } from '../canvas/cameraFrameManager';
import { saveOniriToFile } from '../storage/oniriPackage';
import { ADJUSTMENT_LABELS, type AdjustmentKind } from '../brush/adjustments';
import { openAdjustmentEditor } from '../layers/adjustmentPanel';
import { getActiveProjectName } from '../storage/fileMenu';
import {
  createNewFromClipboard,
  pasteClipboardImage,
  copyToClipboard,
  cutToClipboard,
  setupGlobalClipboardHandlers,
} from '../storage/clipboardManager';
import { commandDispatcher } from './commandDispatcher';
import type { TopMenuCategory } from './topMenuBar';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';
import { rulerManager } from '../canvas/rulerManager';
import { PlatformAdapter } from '../platform/platformAdapter';

export interface MenuDependencies {
  engine: BrushEngine;
  timeline: TimelineManager;
  onOpenFileInput: () => void;
  onNewCanvas: () => void;
  onToggleNavigator: () => void;
  isNavigatorVisible: () => boolean;
  onShowFormatInfo: () => void;
  onShowShortcuts: () => void;
  onShowAbout: () => void;
}

export function buildTopMenuCategories(deps: MenuDependencies): TopMenuCategory[] {
  const { engine, timeline, onOpenFileInput, onNewCanvas, onToggleNavigator, isNavigatorVisible } = deps;
  const lm = engine.layerManager;

  // 1. Archivo (File)
  commandDispatcher.register({
    id: 'file.new',
    label: 'Nuevo...',
    category: 'file',
    shortcut: 'Ctrl+N',
    execute: () => onNewCanvas(),
  });
  commandDispatcher.register({
    id: 'file.newFromClipboard',
    label: 'Crear nuevo desde portapapeles',
    category: 'file',
    execute: () => { createNewFromClipboard(engine, timeline); },
  });
  commandDispatcher.register({
    id: 'file.open',
    label: 'Abrir...',
    category: 'file',
    shortcut: 'Ctrl+O',
    execute: () => onOpenFileInput(),
  });
  commandDispatcher.register({
    id: 'file.save',
    label: 'Guardar',
    category: 'file',
    shortcut: 'Ctrl+S',
    execute: async () => {
      if (getActiveProjectName().toLowerCase().endsWith('.clip')) {
        const { saveClipToFile } = await import('../storage/clipImporter');
        await saveClipToFile(engine, timeline);
      } else {
        saveOniriToFile(engine, timeline);
      }
    },
  });
  commandDispatcher.register({
    id: 'file.saveClip',
    label: 'Guardar formato compatible (.clip)',
    category: 'file',
    execute: async () => {
      const { saveClipToFile } = await import('../storage/clipImporter');
      await saveClipToFile(engine, timeline);
    },
  });
  commandDispatcher.register({
    id: 'file.exportPng',
    label: 'Exportar imagen (PNG)...',
    category: 'file',
    execute: () => {
      engine.updateComposite();
      engine.compositeCanvas.toBlob(async (blob) => {
        if (!blob) return;
        const buf = new Uint8Array(await blob.arrayBuffer());
        await PlatformAdapter.saveFileDialog(buf, {
          title: 'Exportar imagen PNG',
          defaultPath: 'ilustracion.png',
          filters: [{ name: 'Imagen PNG (*.png)', extensions: ['png'] }],
          mimeType: 'image/png',
        });
      }, 'image/png');
    },
  });
  commandDispatcher.register({
    id: 'file.exportAnimation',
    label: 'Exportar animación (GIF / Video / PNGs)...',
    category: 'file',
    execute: () => openExportAnimationModal(engine, timeline),
  });
  commandDispatcher.register({
    id: 'file.preferences',
    label: 'Calibración de presión y lápiz...',
    category: 'file',
    shortcut: 'Ctrl+K',
    execute: () => openPressureCalibrationModal(),
  });

  // 2. Edición (Edit)
  commandDispatcher.register({
    id: 'edit.undo',
    label: 'Deshacer',
    category: 'edit',
    shortcut: 'Ctrl+Z',
    isEnabled: () => transformManager.isTransforming() || engine.canUndo(),
    execute: () => {
      if (transformManager.isTransforming()) {
        transformManager.cancelTransform();
      } else {
        engine.undo();
      }
    },
  });
  commandDispatcher.register({
    id: 'edit.redo',
    label: 'Rehacer',
    category: 'edit',
    shortcut: 'Ctrl+Y',
    aliases: ['Ctrl+Shift+Z'],
    isEnabled: () => !transformManager.isTransforming() && engine.canRedo(),
    execute: () => { engine.redo(); },
  });
  commandDispatcher.register({
    id: 'edit.cut',
    label: 'Cortar',
    category: 'edit',
    shortcut: 'Ctrl+X',
    execute: () => { cutToClipboard(engine); },
  });
  commandDispatcher.register({
    id: 'edit.copy',
    label: 'Copiar',
    category: 'edit',
    shortcut: 'Ctrl+C',
    execute: () => { copyToClipboard(engine); },
  });
  commandDispatcher.register({
    id: 'edit.paste',
    label: 'Pegar',
    category: 'edit',
    shortcut: 'Ctrl+V',
    execute: () => { pasteClipboardImage(engine); },
  });
  commandDispatcher.register({
    id: 'edit.clear',
    label: 'Borrar',
    category: 'edit',
    shortcut: 'Delete',
    execute: () => { engine.clearActiveLayer(); },
  });
  commandDispatcher.register({
    id: 'edit.clearOutside',
    label: 'Borrar fuera de selección',
    category: 'edit',
    shortcut: 'Alt+Delete',
    isEnabled: () => selectionModel.hasSelection(),
    execute: () => {
      selectionModel.invertSelection();
      engine.clearActiveLayer();
      selectionModel.invertSelection();
    },
  });
  commandDispatcher.register({
    id: 'edit.fill',
    label: 'Rellenar con color activo',
    category: 'edit',
    shortcut: 'Shift+Delete',
    execute: () => { engine.fillSelection(); },
  });
  commandDispatcher.register({
    id: 'edit.transform',
    label: 'Escalar / Rotar (Transformación)',
    category: 'edit',
    shortcut: 'Ctrl+T',
    execute: () => {
      if (transformManager.isTransforming()) {
        transformManager.commitTransform();
      } else {
        transformManager.startTransform(engine);
      }
    },
  });
  commandDispatcher.register({
    id: 'edit.transformMesh',
    label: 'Deformación de malla (Mesh Warp)...',
    category: 'edit',
    shortcut: 'Ctrl+Shift+T',
    execute: () => {
      if (transformManager.isTransforming()) {
        if (transformManager.getMode() === 'mesh') {
          transformManager.commitTransform();
        } else {
          transformManager.setMode('mesh');
        }
      } else {
        transformManager.startMeshTransform(engine);
      }
    },
  });
  commandDispatcher.register({
    id: 'edit.flipH',
    label: 'Voltear capa horizontalmente',
    category: 'edit',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const tmp = document.createElement('canvas');
      tmp.width = l.canvas.width;
      tmp.height = l.canvas.height;
      const tctx = tmp.getContext('2d')!;
      tctx.drawImage(l.canvas, 0, 0);

      l.context.clearRect(0, 0, l.canvas.width, l.canvas.height);
      l.context.save();
      l.context.translate(l.canvas.width, 0);
      l.context.scale(-1, 1);
      l.context.drawImage(tmp, 0, 0);
      l.context.restore();
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });
  commandDispatcher.register({
    id: 'edit.flipV',
    label: 'Voltear capa verticalmente',
    category: 'edit',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const tmp = document.createElement('canvas');
      tmp.width = l.canvas.width;
      tmp.height = l.canvas.height;
      const tctx = tmp.getContext('2d')!;
      tctx.drawImage(l.canvas, 0, 0);

      l.context.clearRect(0, 0, l.canvas.width, l.canvas.height);
      l.context.save();
      l.context.translate(0, l.canvas.height);
      l.context.scale(1, -1);
      l.context.drawImage(tmp, 0, 0);
      l.context.restore();
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });

  // 3. Animación (Animation)
  commandDispatcher.register({
    id: 'animation.newFolder',
    label: 'Nueva carpeta de animación',
    category: 'animation',
    execute: () => {
      const track = timeline.createTrack('Animación');
      lm.setActiveLayer(track.id);
    },
  });
  commandDispatcher.register({
    id: 'animation.newCel',
    label: 'Nuevo cel de animación',
    category: 'animation',
    execute: () => {
      const curTrack = timeline.tracks[0];
      if (curTrack) {
        timeline.createCel(curTrack.id, timeline.settings.currentFrame);
      }
    },
  });
  commandDispatcher.register({
    id: 'animation.toggleOnion',
    label: 'Activar papel cebolla (Onion Skin)',
    category: 'animation',
    isChecked: () => timeline.onionSkin.enabled,
    execute: () => {
      timeline.toggleOnionSkin();
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });
  commandDispatcher.register({
    id: 'animation.toggleLoop',
    label: 'Reproducción en bucle',
    category: 'animation',
    isChecked: () => timeline.settings.loop,
    execute: () => { timeline.setLoop(!timeline.settings.loop); },
  });
  commandDispatcher.register({
    id: 'animation.playPause',
    label: 'Reproducir / Detener',
    category: 'animation',
    execute: () => { timeline.togglePlay(); },
  });
  commandDispatcher.register({
    id: 'animation.prevFrame',
    label: 'Fotograma anterior',
    category: 'animation',
    shortcut: ',',
    execute: () => { timeline.prevFrame(); },
  });
  commandDispatcher.register({
    id: 'animation.nextFrame',
    label: 'Fotograma siguiente',
    category: 'animation',
    shortcut: '.',
    execute: () => { timeline.nextFrame(); },
  });

  // 4. Capa (Layer)
  commandDispatcher.register({
    id: 'layer.new',
    label: 'Nueva capa rasterizada',
    category: 'layer',
    shortcut: 'Ctrl+Shift+N',
    execute: () => { lm.createLayer(); },
  });
  commandDispatcher.register({
    id: 'layer.newFolder',
    label: 'Nueva carpeta',
    category: 'layer',
    execute: () => { lm.createFolder(); },
  });
  const ADJUSTMENT_KINDS: AdjustmentKind[] = [
    'brightness-contrast',
    'levels',
    'curves',
    'hsl',
    'color-balance',
    'gradient-map',
    'invert',
  ];
  for (const kind of ADJUSTMENT_KINDS) {
    commandDispatcher.register({
      id: `layer.newAdjustment.${kind}`,
      label: `Nueva capa de ajuste: ${ADJUSTMENT_LABELS[kind]}`,
      category: 'layer',
      execute: () => {
        const node = lm.createAdjustmentLayer(kind);
        if (kind !== 'invert') openAdjustmentEditor(lm, node.id);
      },
    });
  }
  commandDispatcher.register({
    id: 'layer.editAdjustment',
    label: 'Editar capa de ajuste...',
    category: 'layer',
    isEnabled: () => lm.getActiveLayer()?.type === 'adjustment',
    execute: () => {
      const active = lm.getActiveLayer();
      if (active?.type === 'adjustment') openAdjustmentEditor(lm, active.id);
    },
  });
  commandDispatcher.register({
    id: 'layer.duplicate',
    label: 'Duplicar capa',
    category: 'layer',
    shortcut: 'Ctrl+J',
    execute: () => { lm.duplicateLayer(); },
  });
  commandDispatcher.register({
    id: 'layer.delete',
    label: 'Eliminar capa',
    category: 'layer',
    execute: () => { lm.deleteLayer(lm.activeLayerId); },
  });
  commandDispatcher.register({
    id: 'layer.mergeBelow',
    label: 'Combinar con capa inferior',
    category: 'layer',
    shortcut: 'Ctrl+E',
    execute: () => { lm.mergeLayerBelow(); },
  });
  commandDispatcher.register({
    id: 'layer.toggleClipping',
    label: 'Máscara de recorte',
    category: 'layer',
    shortcut: 'Ctrl+Shift+G',
    isChecked: () => lm.getActiveLayer()?.clipped ?? false,
    execute: () => { lm.toggleLayerClipping(lm.activeLayerId); },
  });
  commandDispatcher.register({
    id: 'layer.toggleReference',
    label: 'Establecer como capa de referencia (Faro)',
    category: 'layer',
    isChecked: () => lm.getActiveLayer()?.isReference ?? false,
    execute: () => { lm.toggleLayerReference(lm.activeLayerId); },
  });
  commandDispatcher.register({
    id: 'layer.toggleLayerColor',
    label: 'Color de capa (Azul de boceto)',
    category: 'layer',
    isChecked: () => lm.getActiveLayer()?.useLayerColor ?? false,
    execute: () => {
      lm.toggleLayerColor(lm.activeLayerId);
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });
  commandDispatcher.register({
    id: 'layer.toggleLock',
    label: 'Bloquear capa',
    category: 'layer',
    isChecked: () => lm.getActiveLayer()?.locked ?? false,
    execute: () => { lm.toggleLayerLock(lm.activeLayerId); },
  });
  commandDispatcher.register({
    id: 'layer.toggleAlphaLock',
    label: 'Bloquear píxeles transparentes (Alpha Lock)',
    category: 'layer',
    isChecked: () => lm.getActiveLayer()?.lockAlpha ?? false,
    execute: () => { lm.toggleLayerLockAlpha(lm.activeLayerId); },
  });

  // 5. Selección (Selection)
  commandDispatcher.register({
    id: 'select.all',
    label: 'Seleccionar todo',
    category: 'select',
    shortcut: 'Ctrl+A',
    execute: () => selectionModel.selectAll(),
  });
  commandDispatcher.register({
    id: 'select.deselect',
    label: 'Deseleccionar',
    category: 'select',
    shortcut: 'Ctrl+D',
    isEnabled: () => selectionModel.hasSelection(),
    execute: () => selectionModel.clearSelection(),
  });
  commandDispatcher.register({
    id: 'select.invert',
    label: 'Invertir selección',
    category: 'select',
    shortcut: 'Ctrl+Shift+I',
    isEnabled: () => selectionModel.hasSelection(),
    execute: () => selectionModel.invertSelection(),
  });
  commandDispatcher.register({
    id: 'select.expand',
    label: 'Expandir área seleccionada...',
    category: 'select',
    isEnabled: () => selectionModel.hasSelection(),
    execute: () => {
      const p = prompt('Píxeles para expandir la selección (1-64):', '5');
      if (p) {
        const r = parseInt(p, 10);
        if (!isNaN(r) && r > 0) selectionModel.expandSelection(r);
      }
    },
  });
  commandDispatcher.register({
    id: 'select.contract',
    label: 'Reducir área seleccionada...',
    category: 'select',
    isEnabled: () => selectionModel.hasSelection(),
    execute: () => {
      const p = prompt('Píxeles para reducir la selección (1-64):', '5');
      if (p) {
        const r = parseInt(p, 10);
        if (!isNaN(r) && r > 0) selectionModel.contractSelection(r);
      }
    },
  });

  // 6. Ver (View)
  commandDispatcher.register({
    id: 'view.zoomIn',
    label: 'Acercar zoom',
    category: 'view',
    shortcut: 'Ctrl++',
    execute: () => viewportNav.zoomIn(),
  });
  commandDispatcher.register({
    id: 'view.zoomOut',
    label: 'Alejar zoom',
    category: 'view',
    shortcut: 'Ctrl+-',
    execute: () => viewportNav.zoomOut(),
  });
  commandDispatcher.register({
    id: 'view.fit',
    label: 'Ajustar a ventana',
    category: 'view',
    shortcut: 'Ctrl+0',
    execute: () => viewportNav.resetView(),
  });
  commandDispatcher.register({
    id: 'view.zoom100',
    label: 'Tamaño real (100%)',
    category: 'view',
    shortcut: 'Ctrl+Alt+0',
    execute: () => viewportNav.zoom100(),
  });
  commandDispatcher.register({
    id: 'view.flipHorizontal',
    label: 'Voltear vista horizontalmente (Espejo)',
    category: 'view',
    isChecked: () => viewportNav.getState().flippedH,
    execute: () => viewportNav.toggleFlipHorizontal(),
  });
  commandDispatcher.register({
    id: 'view.flipVertical',
    label: 'Voltear vista verticalmente',
    category: 'view',
    isChecked: () => viewportNav.getState().flippedV,
    execute: () => viewportNav.toggleFlipVertical(),
  });
  commandDispatcher.register({
    id: 'view.rotate90CCW',
    label: 'Rotar vista 90° a la izquierda',
    category: 'view',
    execute: () => viewportNav.rotate90CCW(),
  });
  commandDispatcher.register({
    id: 'view.rotate90CW',
    label: 'Rotar vista 90° a la derecha',
    category: 'view',
    execute: () => viewportNav.rotate90CW(),
  });
  commandDispatcher.register({
    id: 'view.resetRotation',
    label: 'Restablecer rotación (0°)',
    category: 'view',
    shortcut: 'Ctrl+Alt+R',
    execute: () => viewportNav.resetRotation(),
  });
  commandDispatcher.register({
    id: 'view.navigator',
    label: 'Paleta Navegador',
    category: 'view',
    isChecked: () => isNavigatorVisible(),
    execute: () => onToggleNavigator(),
  });
  commandDispatcher.register({
    id: 'view.selectLauncher',
    label: 'Menú flotante de selección',
    category: 'view',
    isChecked: () => getSelectionLauncherEnabled(),
    execute: () => setSelectionLauncherEnabled(!getSelectionLauncherEnabled()),
  });
  commandDispatcher.register({
    id: 'view.selectLauncherSettings',
    label: 'Ajustes del menú flotante de selección...',
    category: 'view',
    execute: () => openSelectionLauncherSettingsModal(),
  });
  commandDispatcher.register({
    id: 'view.cameraFrame',
    label: 'Cuadro de cámara (Marco de salida)',
    category: 'view',
    shortcut: 'Shift+F',
    isChecked: () => cameraFrameManager.getState().showFrame && cameraFrameManager.getState().enabled,
    execute: () => {
      const s = cameraFrameManager.getState();
      if (!s.enabled) {
        cameraFrameManager.configure({ enabled: true, showFrame: true });
      } else {
        cameraFrameManager.toggleFrame();
      }
    },
  });
  commandDispatcher.register({
    id: 'view.cameraMask',
    label: 'Máscara de cámara (Sobreexploración)',
    category: 'view',
    isChecked: () => cameraFrameManager.getState().showMask && cameraFrameManager.getState().enabled,
    execute: () => cameraFrameManager.toggleMask(),
  });
  commandDispatcher.register({
    id: 'view.safeMargin',
    label: 'Márgenes de seguridad (90% / 80%)',
    category: 'view',
    isChecked: () => cameraFrameManager.getState().showSafeMargin && cameraFrameManager.getState().enabled,
    execute: () => cameraFrameManager.toggleSafeMargin(),
  });

  // 7. Filtro (Filter)
  commandDispatcher.register({
    id: 'filter.invert',
    label: 'Invertir color de capa',
    category: 'filter',
    shortcut: 'Ctrl+I',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const img = l.context.getImageData(0, 0, w, h);
      if (!rustStrokeEngine.invertColors(img.data)) {
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] > 0) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];
          }
        }
      }
      l.context.putImageData(img, 0, 0);
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });

  commandDispatcher.register({
    id: 'filter.binarize',
    label: 'Binarización / Umbral (Tinta)',
    category: 'filter',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const img = l.context.getImageData(0, 0, w, h);
      if (!rustStrokeEngine.binarize(img.data, 128)) {
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] > 0) {
            const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            const v = lum >= 128 ? 255 : 0;
            d[i] = v;
            d[i + 1] = v;
            d[i + 2] = v;
          }
        }
      }
      l.context.putImageData(img, 0, 0);
      engine.compositeDirty = true;
      engine.updateComposite();
    },
  });

  commandDispatcher.register({
    id: 'filter.gaussianBlur',
    label: 'Desenfoque Gaussiano (Suave)',
    category: 'filter',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const blurred = rustStrokeEngine.gaussianBlur(prev.data, w, h, 4.0);
      if (blurred) {
        const clamped = new Uint8ClampedArray(
          blurred.buffer as ArrayBuffer,
          blurred.byteOffset,
          blurred.byteLength,
        );
        const newImg = new ImageData(clamped, w, h);
        l.context.putImageData(newImg, 0, 0);
        engine.compositeDirty = true;
        engine.updateComposite();
      }
    },
  });

  commandDispatcher.register({
    id: 'filter.screentone',
    label: 'Trama Manga (Screentone)',
    category: 'filter',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const ok = rustStrokeEngine.generateScreentone(prev.data, w, h, 60, 45, 0);
      if (ok) {
        l.context.putImageData(prev, 0, 0);
        engine.compositeDirty = true;
        engine.updateComposite();
      }
    },
  });

  commandDispatcher.register({
    id: 'filter.extractLineart',
    label: 'Extraer Lineart (Papel blanco a transparente)',
    category: 'filter',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const ok = rustStrokeEngine.extractLineartTransparent(prev.data, 1.2, 235);
      if (ok) {
        l.context.putImageData(prev, 0, 0);
        engine.compositeDirty = true;
        engine.updateComposite();
      }
    },
  });

  commandDispatcher.register({
    id: 'filter.unsharpMask',
    label: 'Máscara de Enfoque (Nitidez)',
    category: 'filter',
    execute: () => {
      const l = lm.getActiveDrawableLayer();
      if (!l || !l.canvas || !l.context) return;
      const w = l.canvas.width;
      const h = l.canvas.height;
      const prev = l.context.getImageData(0, 0, w, h);
      engine.pushUndoRecord(l.id, { x: 0, y: 0, w, h }, prev);
      const ok = rustStrokeEngine.unsharpMask(prev.data, w, h, 2.0, 1.5, 2);
      if (ok) {
        l.context.putImageData(prev, 0, 0);
        engine.compositeDirty = true;
        engine.updateComposite();
      }
    },
  });

  // 7b. Reglas y Perspectiva Manga (Ruler)
  commandDispatcher.register({
    id: 'ruler.toggleSnap',
    label: 'Ajustar a regla (Magnetismo Snap)',
    category: 'ruler',
    shortcut: 'Ctrl+1',
    isChecked: () => rulerManager.getState().snapEnabled,
    execute: () => { rulerManager.toggleSnap(); },
  });
  commandDispatcher.register({
    id: 'ruler.none',
    label: 'Ocultar / Desactivar regla',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'none',
    execute: () => rulerManager.setRulerType('none'),
  });
  commandDispatcher.register({
    id: 'ruler.symmetry',
    label: '🪞 Regla de Simetría (Espejo / Radial)',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'symmetry',
    execute: () => rulerManager.setRulerType('symmetry'),
  });
  commandDispatcher.register({
    id: 'ruler.persp1',
    label: '📐 Perspectiva: 1 Punto de Fuga',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'perspective1',
    execute: () => rulerManager.setRulerType('perspective1'),
  });
  commandDispatcher.register({
    id: 'ruler.persp2',
    label: '📐 Perspectiva: 2 Puntos de Fuga (Manga Arquitectura)',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'perspective2',
    execute: () => rulerManager.setRulerType('perspective2'),
  });
  commandDispatcher.register({
    id: 'ruler.persp3',
    label: '📐 Perspectiva: 3 Puntos de Fuga (Picado / Contrapicado)',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'perspective3',
    execute: () => rulerManager.setRulerType('perspective3'),
  });
  commandDispatcher.register({
    id: 'ruler.radial',
    label: '💥 Líneas de Acción Radiales (Speedlines)',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'radial',
    execute: () => rulerManager.setRulerType('radial'),
  });
  commandDispatcher.register({
    id: 'ruler.parallel',
    label: '⚡ Líneas de Acción Paralelas (Velocidad)',
    category: 'ruler',
    isChecked: () => rulerManager.getState().type === 'parallel',
    execute: () => rulerManager.setRulerType('parallel'),
  });
  commandDispatcher.register({
    id: 'ruler.symmetryAxes',
    label: 'Configurar número de ejes de simetría...',
    category: 'ruler',
    execute: () => {
      const currentAxes = rulerManager.getState().symmetry.axes;
      const val = prompt('Número de ejes de simetría (2, 3, 4, 6, 8, 12, 16):', String(currentAxes));
      if (val && !isNaN(Number(val))) {
        rulerManager.updateSymmetry({ axes: Math.max(2, Math.min(16, Number(val))) });
      }
    },
  });

  // 8. Ventana (Window)
  commandDispatcher.register({
    id: 'window.navigator',
    label: 'Navegador',
    category: 'window',
    isChecked: () => isNavigatorVisible(),
    execute: () => onToggleNavigator(),
  });
  commandDispatcher.register({
    id: 'window.resetWorkspace',
    label: 'Restablecer espacio de trabajo',
    category: 'window',
    execute: () => {
      localStorage.removeItem('oniri.layers.width');
      document.documentElement.style.setProperty('--right-dock-width', '250px');
      viewportNav.resetView();
    },
  });

  // 9. Ayuda (Help)
  commandDispatcher.register({
    id: 'help.formatInfo',
    label: 'Compatibilidad de formatos .oniri y .clip...',
    category: 'help',
    execute: () => deps.onShowFormatInfo(),
  });
  commandDispatcher.register({
    id: 'help.shortcuts',
    label: 'Atajos de teclado...',
    category: 'help',
    execute: () => deps.onShowShortcuts(),
  });
  commandDispatcher.register({
    id: 'help.about',
    label: 'Acerca de Oniri Studio Paint...',
    category: 'help',
    execute: () => deps.onShowAbout(),
  });

  // Global keydown routing through CommandDispatcher
  window.addEventListener('keydown', (e) => {
    commandDispatcher.handleKeyEvent(e);
  });

  // Global clipboard paste listener
  setupGlobalClipboardHandlers(engine, timeline);

  // Return full hierarchical category definition
  return [
    {
      id: 'file',
      title: 'Archivo',
      entries: [
        { id: 'file.new', label: 'Nuevo...', shortcut: 'Ctrl+N' },
        { id: 'file.newFromClipboard', label: 'Crear nuevo desde portapapeles' },
        { id: 'file.open', label: 'Abrir...', shortcut: 'Ctrl+O' },
        { id: 'file.save', label: 'Guardar .oniri', shortcut: 'Ctrl+S' },
        { id: 'file.saveClip', label: 'Guardar formato compatible (.clip)' },
        { divider: true },
        { id: 'file.exportPng', label: 'Exportar imagen (PNG)...' },
        { id: 'file.exportAnimation', label: 'Exportar animación (GIF/Video/PNGs)...' },
        { divider: true },
        { id: 'file.preferences', label: 'Calibración de presión...', shortcut: 'Ctrl+K' },
      ],
    },
    {
      id: 'edit',
      title: 'Edición',
      entries: [
        { id: 'edit.undo', label: 'Deshacer', shortcut: 'Ctrl+Z' },
        { id: 'edit.redo', label: 'Rehacer', shortcut: 'Ctrl+Y' },
        { divider: true },
        { id: 'edit.cut', label: 'Cortar', shortcut: 'Ctrl+X' },
        { id: 'edit.copy', label: 'Copiar', shortcut: 'Ctrl+C' },
        { id: 'edit.paste', label: 'Pegar', shortcut: 'Ctrl+V' },
        { divider: true },
        { id: 'edit.clear', label: 'Borrar', shortcut: 'Delete' },
        { id: 'edit.clearOutside', label: 'Borrar fuera de selección', shortcut: 'Alt+Delete' },
        { id: 'edit.fill', label: 'Rellenar con color', shortcut: 'Shift+Delete' },
        { divider: true },
        { id: 'edit.transform', label: 'Escalar / Rotar (Transformación)', shortcut: 'Ctrl+T' },
        { id: 'edit.transformMesh', label: 'Deformación de malla (Mesh Warp)...', shortcut: 'Ctrl+Shift+T' },
        { divider: true },
        { id: 'edit.flipH', label: 'Voltear capa horizontalmente' },
        { id: 'edit.flipV', label: 'Voltear capa verticalmente' },
      ],
    },
    {
      id: 'animation',
      title: 'Animación',
      entries: [
        { id: 'animation.newFolder', label: 'Nueva carpeta de animación' },
        { id: 'animation.newCel', label: 'Nuevo cel de animación' },
        { divider: true },
        { id: 'animation.toggleOnion', label: 'Papel cebolla (Onion Skin)', checked: () => timeline.onionSkin.enabled },
        { id: 'animation.toggleLoop', label: 'Reproducción en bucle', checked: () => timeline.settings.loop },
        { divider: true },
        { id: 'animation.playPause', label: 'Reproducir / Detener' },
        { id: 'animation.prevFrame', label: 'Fotograma anterior', shortcut: ',' },
        { id: 'animation.nextFrame', label: 'Fotograma siguiente', shortcut: '.' },
      ],
    },
    {
      id: 'layer',
      title: 'Capa',
      entries: [
        { id: 'layer.new', label: 'Nueva capa rasterizada', shortcut: 'Ctrl+Shift+N' },
        { id: 'layer.newFolder', label: 'Nueva carpeta' },
        {
          label: 'Nueva capa de ajuste',
          submenu: ADJUSTMENT_KINDS.map((k) => ({
            id: `layer.newAdjustment.${k}`,
            label: ADJUSTMENT_LABELS[k],
          })),
        },
        { id: 'layer.editAdjustment', label: 'Editar capa de ajuste...' },
        { divider: true },
        { id: 'layer.duplicate', label: 'Duplicar capa', shortcut: 'Ctrl+J' },
        { id: 'layer.delete', label: 'Eliminar capa' },
        { divider: true },
        { id: 'layer.mergeBelow', label: 'Combinar con capa inferior', shortcut: 'Ctrl+E' },
        { divider: true },
        { id: 'layer.toggleClipping', label: 'Máscara de recorte', shortcut: 'Ctrl+Shift+G', checked: () => lm.getActiveLayer()?.clipped ?? false },
        { id: 'layer.toggleLayerColor', label: 'Color de capa (Azul de boceto)', checked: () => lm.getActiveLayer()?.useLayerColor ?? false },
        { id: 'layer.toggleReference', label: 'Capa de referencia (Faro)', checked: () => lm.getActiveLayer()?.isReference ?? false },
        { id: 'layer.toggleLock', label: 'Bloquear capa', checked: () => lm.getActiveLayer()?.locked ?? false },
        { id: 'layer.toggleAlphaLock', label: 'Bloquear píxeles transparentes', checked: () => lm.getActiveLayer()?.lockAlpha ?? false },
      ],
    },
    {
      id: 'select',
      title: 'Selección',
      entries: [
        { id: 'select.all', label: 'Seleccionar todo', shortcut: 'Ctrl+A' },
        { id: 'select.deselect', label: 'Deseleccionar', shortcut: 'Ctrl+D' },
        { id: 'select.invert', label: 'Invertir selección', shortcut: 'Ctrl+Shift+I' },
        { divider: true },
        { id: 'select.expand', label: 'Expandir área seleccionada...' },
        { id: 'select.contract', label: 'Reducir área seleccionada...' },
        { divider: true },
        { id: 'view.selectLauncher', label: 'Menú flotante de selección', checked: () => getSelectionLauncherEnabled() },
      ],
    },
    {
      id: 'view',
      title: 'Ver',
      entries: [
        { id: 'view.zoomIn', label: 'Acercar zoom', shortcut: 'Ctrl++' },
        { id: 'view.zoomOut', label: 'Alejar zoom', shortcut: 'Ctrl+-' },
        { id: 'view.fit', label: 'Ajustar a ventana', shortcut: 'Ctrl+0' },
        { id: 'view.zoom100', label: 'Tamaño real (100%)', shortcut: 'Ctrl+Alt+0' },
        { divider: true },
        { id: 'view.flipHorizontal', label: 'Voltear vista horizontalmente (Espejo)', checked: () => viewportNav.getState().flippedH },
        { id: 'view.flipVertical', label: 'Voltear vista verticalmente', checked: () => viewportNav.getState().flippedV },
        { divider: true },
        { id: 'view.rotate90CCW', label: 'Rotar 90° a la izquierda' },
        { id: 'view.rotate90CW', label: 'Rotar 90° a la derecha' },
        { id: 'view.resetRotation', label: 'Restablecer rotación (0°)', shortcut: 'Ctrl+Alt+R' },
        { divider: true },
        { id: 'view.selectLauncher', label: 'Menú flotante de selección', checked: () => getSelectionLauncherEnabled() },
        { id: 'view.selectLauncherSettings', label: 'Ajustes del menú flotante de selección...' },
        { divider: true },
        { id: 'view.navigator', label: 'Paleta Navegador', checked: () => isNavigatorVisible() },
      ],
    },
    {
      id: 'ruler',
      title: 'Regla',
      entries: [
        {
          id: 'ruler.toggleSnap',
          label: 'Ajustar a regla (Magnetismo Snap)',
          shortcut: 'Ctrl+1',
          checked: () => rulerManager.getState().snapEnabled,
        },
        { divider: true },
        {
          id: 'ruler.none',
          label: 'Ocultar / Desactivar regla',
          checked: () => rulerManager.getState().type === 'none',
        },
        {
          id: 'ruler.symmetry',
          label: '🪞 Regla de Simetría (Espejo / Radial)',
          checked: () => rulerManager.getState().type === 'symmetry',
        },
        {
          id: 'ruler.persp1',
          label: '📐 Perspectiva: 1 Punto de Fuga',
          checked: () => rulerManager.getState().type === 'perspective1',
        },
        {
          id: 'ruler.persp2',
          label: '📐 Perspectiva: 2 Puntos de Fuga (Manga Arquitectura)',
          checked: () => rulerManager.getState().type === 'perspective2',
        },
        {
          id: 'ruler.persp3',
          label: '📐 Perspectiva: 3 Puntos de Fuga (Picado / Contrapicado)',
          checked: () => rulerManager.getState().type === 'perspective3',
        },
        { divider: true },
        {
          id: 'ruler.radial',
          label: '💥 Líneas de Acción Radiales (Speedlines)',
          checked: () => rulerManager.getState().type === 'radial',
        },
        {
          id: 'ruler.parallel',
          label: '⚡ Líneas de Acción Paralelas (Velocidad)',
          checked: () => rulerManager.getState().type === 'parallel',
        },
        { divider: true },
        {
          id: 'ruler.symmetryAxes',
          label: 'Configurar número de ejes de simetría...',
        },
      ],
    },
    {
      id: 'filter',
      title: 'Filtro',
      entries: [
        { id: 'filter.invert', label: 'Invertir color de capa', shortcut: 'Ctrl+I' },
        { id: 'filter.binarize', label: 'Binarización / Umbral (Tinta)' },
        { id: 'filter.gaussianBlur', label: 'Desenfoque Gaussiano (Suave)' },
        { id: 'filter.unsharpMask', label: 'Máscara de Enfoque (Nitidez)' },
        { divider: true },
        { id: 'filter.screentone', label: 'Trama Manga (Screentone)' },
        { id: 'filter.extractLineart', label: 'Extraer Lineart (Papel blanco a transparente)' },
      ],
    },
    {
      id: 'window',
      title: 'Ventana',
      entries: [
        { id: 'window.navigator', label: 'Navegador', checked: () => isNavigatorVisible() },
        { divider: true },
        { id: 'window.resetWorkspace', label: 'Restablecer espacio de trabajo' },
      ],
    },
    {
      id: 'help',
      title: 'Ayuda',
      entries: [
        { id: 'help.shortcuts', label: 'Atajos de teclado...' },
        { id: 'help.formatInfo', label: 'Formatos .oniri y .clip...' },
        { divider: true },
        { id: 'help.about', label: 'Acerca de Oniri Studio Paint...' },
      ],
    },
  ];
}
