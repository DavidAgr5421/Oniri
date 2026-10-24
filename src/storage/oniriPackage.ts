import { zip, unzipSync, strToU8, strFromU8, type Zippable } from 'fflate';
import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from '../animation/timelineManager';
import type { LayerNode } from '../brush/layers';
import type { SkeletonKeyframe } from '../animation/boneModel';
import type { AnimationScene } from '../animation/timelineModel';
import { DOC_H, DOC_W } from '../brush/docConstants';

export interface OniriManifest {
  format: 'oniri';
  version: '1.0.0';
  generator: string;
  createdAt: string;
  id: string;
  title: string;
}

export interface OniriProjectConfig {
  width: number;
  height: number;
  resolution: number;
}

export interface SerializedLayerNode {
  id: string;
  type: 'raster' | 'folder';
  name: string;
  visible: boolean;
  opacity: number;
  blendMode: GlobalCompositeOperation;
  isPaper?: boolean;
  isAnimationFolder?: boolean;
  parentId: string | null;
  collapsed: boolean;
  clipped: boolean;
  locked?: boolean;
  lockAlpha?: boolean;
  isReference?: boolean;
  boundBoneId?: string | null;
  meshSkinningEnabled?: boolean;
}

export interface SerializedTrack {
  id: string;
  folderId: string;
  name: string;
  visible: boolean;
  keyframesEnabled: boolean;
  clips: {
    id: string;
    startFrame: number;
    endFrame: number;
    exposures: [number, string][];
  }[];
  keyframes: [number, any][];
}

export interface SerializedTimeline {
  settings: any;
  tracks: SerializedTrack[];
  scenes?: any[];
  activeSceneId?: string;
  bones?: any[];
  boneKeyframes?: [number, any][];
  onionSkin?: any;
}

/**
 * Converts an HTMLCanvasElement to a PNG Uint8Array.
 */
async function canvasToPngU8(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('No se pudo convertir el canvas a blob PNG.');
  const buf = await blob.arrayBuffer();
  return new Uint8Array(buf);
}

/**
 * Renders a PNG Uint8Array onto a target canvas using fast createImageBitmap when available.
 */
async function drawPngU8ToCanvas(u8: Uint8Array, targetCanvas: HTMLCanvasElement): Promise<void> {
  const blob = new Blob([u8 as any], { type: 'image/png' });
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(blob);
    const ctx = targetCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    return;
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Error al decodificar imagen PNG de celda.'));
      img.src = url;
    });
    const ctx = targetCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    ctx.drawImage(img, 0, 0);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Creates a scaled thumbnail canvas for fast preview.
 */
async function generatePreviewPngU8(sourceCanvas: HTMLCanvasElement, maxW = 640, maxH = 360): Promise<Uint8Array> {
  const thumb = document.createElement('canvas');
  thumb.width = maxW;
  thumb.height = maxH;
  const ctx = thumb.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, maxW, maxH);
  return canvasToPngU8(thumb);
}

/**
 * Exports the current Oniri project to a standalone .oniri ZIP package.
 */
export async function exportOniriPackage(
  engine: BrushEngine,
  timeline: TimelineManager,
  title = 'Sin título'
): Promise<Uint8Array> {
  engine.updateComposite();

  const manifest: OniriManifest = {
    format: 'oniri',
    version: '1.0.0',
    generator: 'Oniri Studio Paint 0.1.0',
    createdAt: new Date().toISOString(),
    id: `oniri-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
  };

  const project: OniriProjectConfig = {
    width: DOC_W,
    height: DOC_H,
    resolution: 300,
  };

  const layersHierarchy: SerializedLayerNode[] = engine.layerManager.layers.map((l) => ({
    id: l.id,
    type: l.type,
    name: l.name,
    visible: l.visible,
    opacity: l.opacity,
    blendMode: l.blendMode,
    isPaper: l.isPaper,
    isAnimationFolder: l.isAnimationFolder,
    parentId: l.parentId,
    collapsed: l.collapsed,
    clipped: l.clipped,
    locked: l.locked,
    lockAlpha: l.lockAlpha,
    isReference: l.isReference,
    boundBoneId: l.boundBoneId,
    meshSkinningEnabled: l.meshSkinningEnabled,
  }));

  const serializedTracks: SerializedTrack[] = timeline.tracks.map((t) => ({
    id: t.id,
    folderId: t.folderId,
    name: t.name,
    visible: t.visible,
    keyframesEnabled: t.keyframesEnabled,
    clips: t.clips.map((c) => ({
      id: c.id,
      startFrame: c.startFrame,
      endFrame: c.endFrame,
      exposures: Array.from(c.exposures.entries()),
    })),
    keyframes: Array.from(t.keyframes.entries()),
  }));

  const serializedTimeline: SerializedTimeline = {
    settings: { ...timeline.settings },
    tracks: serializedTracks,
    scenes: timeline.scenes.map((s) => ({
      id: s.id,
      name: s.name,
      settings: { ...s.settings },
      tracks: s.tracks.map((st) => ({
        id: st.id,
        folderId: st.folderId,
        name: st.name,
        visible: st.visible,
        keyframesEnabled: st.keyframesEnabled,
        clips: st.clips.map((c) => ({
          id: c.id,
          startFrame: c.startFrame,
          endFrame: c.endFrame,
          exposures: Array.from(c.exposures.entries()),
        })),
        keyframes: Array.from(st.keyframes.entries()),
      })),
      bones: s.bones,
      boneKeyframes: Array.from(s.boneKeyframes.entries()),
    })),
    activeSceneId: timeline.activeSceneId,
    bones: timeline.bones,
    boneKeyframes: Array.from(timeline.boneKeyframes.entries()),
    onionSkin: {
      enabled: timeline.onionSkin.enabled,
      prevFrames: timeline.onionSkin.prevFrames,
      nextFrames: timeline.onionSkin.nextFrames,
      prevColor: timeline.onionSkin.prevColor,
      nextColor: timeline.onionSkin.nextColor,
      startOpacity: timeline.onionSkin.startOpacity,
      stepOpacity: timeline.onionSkin.stepOpacity,
      mode: timeline.onionSkin.mode,
      customReferences: timeline.onionSkin.customReferences,
      transforms: Array.from(timeline.onionSkin.transforms.entries()),
    },
  };

  const previewBytes = await generatePreviewPngU8(engine.compositeCanvas);

  const zippable: Zippable = {
    mimetype: strToU8('application/x-oniri'),
    'manifest.json': strToU8(JSON.stringify(manifest, null, 2)),
    'project.json': strToU8(JSON.stringify(project, null, 2)),
    'preview.png': previewBytes,
    layers: {
      'hierarchy.json': strToU8(JSON.stringify(layersHierarchy, null, 2)),
    },
    timeline: {
      'tracks.json': strToU8(JSON.stringify(serializedTimeline, null, 2)),
    },
  };

  const celsFolder: Record<string, Uint8Array> = {};
  for (const layer of engine.layerManager.layers) {
    if (layer.canvas) {
      const pngU8 = await canvasToPngU8(layer.canvas);
      celsFolder[`${layer.id}.png`] = pngU8;
    }
  }
  zippable.cels = celsFolder;

  return new Promise<Uint8Array>((resolve, reject) => {
    zip(zippable, { level: 1 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/**
 * Imports an .oniri ZIP package into the running engine and timeline.
 */
export async function importOniriPackage(
  buffer: Uint8Array,
  engine: BrushEngine,
  timeline: TimelineManager
): Promise<{ title: string; layersCount: number }> {
  const unzipped = unzipSync(buffer);

  const manifestBytes = unzipped['manifest.json'];
  if (!manifestBytes) {
    throw new Error('El archivo no contiene manifest.json válido de Oniri.');
  }

  const manifest: OniriManifest = JSON.parse(strFromU8(manifestBytes));
  if (manifest.format !== 'oniri') {
    throw new Error(`Formato no reconocido: ${manifest.format}`);
  }

  const hierarchyBytes = unzipped['layers/hierarchy.json'];
  if (!hierarchyBytes) {
    throw new Error('El archivo no contiene layers/hierarchy.json.');
  }
  const rawLayers: SerializedLayerNode[] = JSON.parse(strFromU8(hierarchyBytes));

  const restoredLayers: LayerNode[] = [];
  for (const raw of rawLayers) {
    let canvas: HTMLCanvasElement | undefined = undefined;
    let context: CanvasRenderingContext2D | undefined = undefined;

    if (raw.type === 'raster') {
      canvas = document.createElement('canvas');
      canvas.width = DOC_W;
      canvas.height = DOC_H;
      context = canvas.getContext('2d')!;

      const celPath = `cels/${raw.id}.png`;
      const celBytes = unzipped[celPath];
      if (celBytes && celBytes.length > 0) {
        await drawPngU8ToCanvas(celBytes, canvas);
      } else if (raw.isPaper) {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, DOC_W, DOC_H);
      }
    }

    const node: LayerNode = {
      id: raw.id,
      type: raw.type,
      name: raw.name,
      canvas,
      context,
      visible: raw.visible ?? true,
      opacity: raw.opacity ?? 1,
      blendMode: raw.blendMode ?? 'source-over',
      isPaper: raw.isPaper,
      isAnimationFolder: raw.isAnimationFolder,
      parentId: raw.parentId ?? null,
      collapsed: raw.collapsed ?? false,
      clipped: raw.clipped ?? false,
      locked: raw.locked ?? false,
      lockAlpha: raw.lockAlpha ?? false,
      isReference: raw.isReference ?? false,
      boundBoneId: raw.boundBoneId ?? null,
      meshSkinningEnabled: raw.meshSkinningEnabled ?? false,
    };
    restoredLayers.push(node);
  }

  engine.layerManager.loadLayers(restoredLayers);

  // Restore Timeline
  const timelineBytes = unzipped['timeline/tracks.json'];
  if (timelineBytes) {
    const rawTl: SerializedTimeline = JSON.parse(strFromU8(timelineBytes));

    const restoredTracks = rawTl.tracks.map((st) => {
      const clips = st.clips.map((c) => ({
        id: c.id,
        startFrame: c.startFrame,
        endFrame: c.endFrame,
        exposures: new Map(c.exposures),
      }));
      const keyframes = new Map(st.keyframes);
      const exposures = new Map<number, string>();
      for (const cl of clips) {
        for (const [f, id] of cl.exposures.entries()) {
          exposures.set(f, id);
        }
      }
      return {
        id: st.id,
        folderId: st.folderId,
        name: st.name,
        visible: st.visible ?? true,
        keyframesEnabled: st.keyframesEnabled ?? false,
        clips,
        exposures,
        keyframes,
      };
    });

    const restoredScenes: AnimationScene[] = (rawTl.scenes || []).map((sc: any) => ({
      id: sc.id,
      name: sc.name,
      settings: sc.settings,
      tracks: (sc.tracks || []).map((st: any) => ({
        id: st.id,
        folderId: st.folderId,
        name: st.name,
        visible: st.visible ?? true,
        keyframesEnabled: st.keyframesEnabled ?? false,
        clips: (st.clips || []).map((c: any) => ({
          id: c.id,
          startFrame: c.startFrame,
          endFrame: c.endFrame,
          exposures: new Map(c.exposures),
        })),
        exposures: new Map(),
        keyframes: new Map(st.keyframes || []),
      })),
      bones: sc.bones || [],
      boneKeyframes: new Map<number, SkeletonKeyframe>(sc.boneKeyframes || []),
    }));

    timeline.loadTimelineState({
      settings: rawTl.settings,
      tracks: restoredTracks,
      scenes: restoredScenes.length > 0 ? restoredScenes : undefined,
      activeSceneId: rawTl.activeSceneId,
      bones: rawTl.bones,
      boneKeyframes: rawTl.boneKeyframes ? new Map(rawTl.boneKeyframes) : undefined,
      onionSkin: rawTl.onionSkin
        ? {
            enabled: rawTl.onionSkin.enabled,
            prevFrames: rawTl.onionSkin.prevFrames,
            nextFrames: rawTl.onionSkin.nextFrames,
            prevColor: rawTl.onionSkin.prevColor,
            nextColor: rawTl.onionSkin.nextColor,
            startOpacity: rawTl.onionSkin.startOpacity,
            stepOpacity: rawTl.onionSkin.stepOpacity,
            mode: rawTl.onionSkin.mode,
            customReferences: rawTl.onionSkin.customReferences || [],
            transforms: new Map(rawTl.onionSkin.transforms || []),
          }
        : undefined,
    });
  }

  engine.compositeDirty = true;
  engine.updateComposite();

  return {
    title: manifest.title || 'Proyecto Oniri',
    layersCount: restoredLayers.length,
  };
}

/**
 * Triggers browser download for the .oniri package.
 */
export async function saveOniriToFile(
  engine: BrushEngine,
  timeline: TimelineManager,
  filename = 'proyecto.oniri'
): Promise<void> {
  const bytes = await exportOniriPackage(engine, timeline, filename.replace(/\.oniri$/i, ''));
  const blob = new Blob([bytes as any], { type: 'application/x-oniri' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.oniri') ? filename : `${filename}.oniri`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Extracts preview.png from an .oniri package without decompressing all layers.
 */
export function extractOniriPreview(buffer: Uint8Array): Uint8Array | null {
  try {
    const unzipped = unzipSync(buffer);
    return unzipped['preview.png'] ?? null;
  } catch {
    return null;
  }
}
