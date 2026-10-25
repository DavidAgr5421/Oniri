import type { LayerManager, LayerNode } from '../brush/layers';
import {
  type Bone2D,
  type BonePoseDelta,
  type EvaluatedBoneWorld,
  type SkeletonKeyframe,
  distanceToSegment,
  evaluateArmatureWorld,
  normalizeAngleDeg,
  solveTwoBoneIK,
  transformPoint2D,
} from './boneModel';
import type {
  AnimationClip,
  AnimationScene,
  AnimationTrack,
  AudioClip,
  AudioTrack,
  EvaluatedTransform,
  InterpolationType,
  LightTableRegistration,
  LightTableSettings,
  LightTableTransform,
  OnionSkinCelInfo,
  OnionSkinCustomReference,
  OnionSkinSettings,
  OnionSkinTransform,
  TimeDisplayFormat,
  TimelineSettings,
  TransformKeyframe,
} from './timelineModel';
import { transformManager } from '../selection/transformGizmo';
import { timelineAudioManager } from './audioManager';
import { timelineCoreEngine } from './rustTimelineCore';

export interface TimelineManager {
  readonly settings: TimelineSettings;
  readonly onionSkin: OnionSkinSettings;
  readonly lightTable: LightTableSettings;
  readonly tracks: AnimationTrack[];
  readonly scenes: AnimationScene[];
  readonly activeSceneId: string;
  readonly activeScene: AnimationScene;
  readonly bones: Bone2D[];
  readonly boneKeyframes: Map<number, SkeletonKeyframe>;
  readonly selectedBoneId: string | null;
  readonly audioTracks: AudioTrack[];

  // Audio Tracks (Sync & Lip-Sync)
  addAudioTrack(name?: string): AudioTrack;
  removeAudioTrack(trackId: string): boolean;
  renameAudioTrack(trackId: string, name: string): void;
  setAudioTrackVolume(trackId: string, volume: number): void;
  toggleAudioTrackMute(trackId: string): void;
  toggleAudioTrackSolo(trackId: string): void;
  addAudioClip(trackId: string, clip: AudioClip): boolean;
  removeAudioClip(trackId: string, clipId: string): boolean;
  moveAudioClip(trackId: string, clipId: string, newStartFrame: number): boolean;
  trimAudioClip(trackId: string, clipId: string, newStartFrame: number, newDurationFrames: number): boolean;

  // Light Table (Mesa de Luz de Animación)
  toggleLightTable(force?: boolean): void;
  registerCelToLightTable(celId: string, customName?: string): LightTableRegistration | null;
  registerPrevCelToLightTable(trackId?: string): LightTableRegistration | null;
  registerNextCelToLightTable(trackId?: string): LightTableRegistration | null;
  unregisterLightTable(registrationId: string): void;
  updateLightTableRegistration(id: string, patch: Partial<LightTableRegistration>): void;
  updateLightTableTransform(id: string, transformPatch: Partial<LightTableTransform>): void;
  resetLightTableTransform(id: string): void;
  setActiveLightTableRegistration(id: string | null): void;
  getLightTableRegistrations(): LightTableRegistration[];

  // Scenes (Multi-animation system)
  createScene(name?: string, duplicateCurrent?: boolean): AnimationScene;
  switchScene(sceneId: string): void;
  renameScene(sceneId: string, name: string): void;
  deleteScene(sceneId: string): boolean;

  // Playback & Timeline settings
  play(): void;
  pause(): void;
  togglePlay(): void;
  setFps(fps: number): void;
  setTotalFrames(total: number, expandEndFrame?: boolean): void;
  setRange(start: number, end: number): void;
  setLoop(loop: boolean): void;
  setDivision(division: number): void;
  setTimeFormat(format: TimeDisplayFormat): void;
  updateTimelineSettings(patch: Partial<TimelineSettings> & { sceneName?: string }): void;

  // Frame Navigation
  goToFrame(frame: number): void;
  nextFrame(): void;
  prevFrame(): void;
  firstFrame(): void;
  lastFrame(): void;
  nextCel(trackId?: string): void;
  prevCel(trackId?: string): void;

  // Tracks, Clips, and Cels
  createTrack(name?: string): AnimationTrack;
  deleteTrack(trackId: string): void;
  createCel(trackId?: string, frame?: number): LayerNode | null;
  specifyCel(trackId: string, frame: number, celId: string): void;
  moveExposure(trackId: string, fromFrame: number, toFrame: number): boolean;
  moveCelSpan(trackId: string, fromFrame: number, toFrame: number, spanLength: number): boolean;
  resizeCelSpan(
    trackId: string,
    expFrame: number,
    edge: 'left' | 'right',
    newEdgeFrame: number,
    mode?: 'ripple' | 'overwrite'
  ): boolean;
  resizeClip(trackId: string, clipId: string, newStart: number, newEnd: number): boolean;
  splitClip(trackId: string, frame: number): boolean;
  removeExposure(trackId: string, frame: number): void;
  deleteCelLayer(trackId: string, celId: string): boolean;
  getCelsInTrack(trackId: string): LayerNode[];
  batchSpecifyCels(trackId: string, step: number): void;

  // Keyframes & Interpolation (Enable Keyframes on Layer)
  toggleTrackKeyframes(trackId: string, force?: boolean): void;
  addOrUpdateKeyframe(
    trackId: string,
    frame: number,
    patch?: Partial<Omit<TransformKeyframe, 'frame'>>
  ): TransformKeyframe | null;
  moveKeyframe(trackId: string, fromFrame: number, toFrame: number): boolean;
  deleteKeyframe(trackId: string, frame: number): boolean;
  setKeyframeInterpolation(trackId: string, frame: number, interpolation: InterpolationType): void;
  getInterpolatedTransform(trackId: string, frame: number): EvaluatedTransform;

  // 2D Bone / Skeleton System (Rigging, FK, IK, and Bone Keyframes)
  selectBone(boneId: string | null): void;
  createBoneFromWorld(
    headX: number,
    headY: number,
    tailX: number,
    tailY: number,
    parentId?: string | null,
    name?: string
  ): Bone2D;
  updateBoneEndpointWorld(boneId: string, newTailX: number, newTailY: number): void;
  moveBoneHeadWorld(boneId: string, newHeadX: number, newHeadY: number): void;
  renameBone(boneId: string, name: string): void;
  setBoneParent(boneId: string, parentId: string | null): void;
  toggleBoneIKBend(boneId: string): void;
  deleteBone(boneId: string): boolean;
  createHumanoidPreset(centerX: number, centerY: number): void;
  setBonePoseAtFrame(
    frame: number,
    boneId: string,
    patch: Partial<BonePoseDelta>,
    interpolation?: InterpolationType
  ): void;
  applyTwoBoneIKAtFrame(frame: number, endBoneId: string, targetX: number, targetY: number): void;
  addOrUpdateBoneKeyframe(frame: number, interpolation?: InterpolationType): SkeletonKeyframe;
  moveBoneKeyframe(fromFrame: number, toFrame: number): boolean;
  deleteBoneKeyframe(frame: number): boolean;
  resetBonePoseAtFrame(frame: number, boneId?: string): void;
  getInterpolatedBonePoses(frame: number): Map<string, BonePoseDelta>;
  getEvaluatedBones(frame?: number): Map<string, EvaluatedBoneWorld>;
  hitTestBoneAtWorld(
    docX: number,
    docY: number,
    frame?: number
  ): { bone: Bone2D; part: 'head' | 'tail' | 'body'; evalBone: EvaluatedBoneWorld } | null;

  // Onion skin & Reference Calibration (Papel Cebolla con calibración tipo Mesa de Luz)
  setOnionSkin(patch: Partial<OnionSkinSettings>): void;
  toggleOnionSkin(force?: boolean): void;
  getOnionSkinTransform(celId: string): OnionSkinTransform;
  updateOnionSkinTransform(celId: string, patch: Partial<OnionSkinTransform>): void;
  resetOnionSkinTransform(celId: string): void;
  addCustomOnionReference(celId: string, customName?: string): OnionSkinCustomReference | null;
  removeCustomOnionReference(referenceId: string): void;
  updateCustomOnionReference(id: string, patch: Partial<OnionSkinCustomReference>): void;
  setActiveReferenceCel(celId: string | null): void;

  // Query state for rendering
  getActiveCelForFrame(trackId: string, frame: number): LayerNode | undefined;
  getOnionSkinCels(trackId: string, currentFrame: number): OnionSkinCelInfo[];
  isLayerVisibleAtFrame(layer: LayerNode, frame: number): boolean;
  getLayerTransformAtFrame(layer: LayerNode, frame: number): EvaluatedTransform | null;

  // State loading & Project persistence
  loadTimelineState(state: {
    settings?: Partial<TimelineSettings>;
    tracks?: AnimationTrack[];
    scenes?: AnimationScene[];
    activeSceneId?: string;
    bones?: Bone2D[];
    boneKeyframes?: Map<number, SkeletonKeyframe>;
    onionSkin?: Partial<OnionSkinSettings>;
  }): void;

  // Subscriptions
  subscribe(listener: () => void): () => void;
}

const DEFAULT_TRANSFORM: EvaluatedTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  opacity: 1,
};

function makeDefaultSettings(): TimelineSettings {
  return {
    fps: 12,
    totalFrames: 24,
    startFrame: 1,
    endFrame: 24,
    currentFrame: 1,
    minFrame: 0, // Soporte para fotograma 0 y fotogramas negativos
    loop: true,
    isPlaying: false,
    division: 5,
    timeFormat: 'frames',
  };
}

function makeDefaultClip(totalFrames: number, initialCelId?: string): AnimationClip {
  const exposures = new Map<number, string>();
  if (initialCelId) {
    exposures.set(1, initialCelId);
  }
  return {
    id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    startFrame: 1,
    endFrame: totalFrames,
    exposures,
  };
}

function syncTrackFlatExposures(track: AnimationTrack): void {
  track.exposures.clear();
  track.clips.sort((a, b) => a.startFrame - b.startFrame);
  for (const clip of track.clips) {
    for (const [f, celId] of clip.exposures.entries()) {
      track.exposures.set(f, celId);
    }
  }
}

function findOrCreateClipForFrame(
  track: AnimationTrack,
  frame: number,
  totalFrames: number
): AnimationClip {
  let clip = track.clips.find((c) => frame >= c.startFrame && frame <= c.endFrame);
  if (clip) return clip;

  if (track.clips.length === 0) {
    clip = makeDefaultClip(totalFrames);
    track.clips.push(clip);
    return clip;
  }

  // Expand nearest clip to include frame
  track.clips.sort((a, b) => a.startFrame - b.startFrame);
  const before = [...track.clips].reverse().find((c) => c.endFrame < frame);
  if (before) {
    const after = track.clips.find((c) => c.startFrame > frame);
    before.endFrame = after ? Math.min(frame, after.startFrame - 1) : Math.max(before.endFrame, frame);
    return before;
  }
  const first = track.clips[0];
  first.startFrame = Math.min(first.startFrame, frame);
  return first;
}

const BONE_PALETTE = [
  '#00e5ff',
  '#ffd43b',
  '#ff6b6b',
  '#51cf66',
  '#cc5de8',
  '#ff922b',
  '#4dabf7',
];

export function createTimelineManager(layerManager: LayerManager): TimelineManager {
  let sceneCounter = 1;
  let boneCounter = 1;
  let selectedBoneId: string | null = null;

  const initialScene: AnimationScene = {
    id: `scene-1`,
    name: `Escena 1`,
    settings: makeDefaultSettings(),
    tracks: [],
    bones: [],
    boneKeyframes: new Map(),
    audioTracks: [],
  };

  const scenes: AnimationScene[] = [initialScene];
  let activeSceneId = initialScene.id;

  function getActiveScene(): AnimationScene {
    return scenes.find((s) => s.id === activeSceneId) ?? scenes[0];
  }

  function makeDefaultOnionTransform(): OnionSkinTransform {
    return {
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      flipY: false,
    };
  }

  const onionSkin: OnionSkinSettings = {
    enabled: false,
    prevFrames: 2,
    nextFrames: 2,
    prevColor: '#38bdf8', // Blue for past frames
    nextColor: '#4ade80', // Green for future
    startOpacity: 0.5,
    stepOpacity: 0.15,
    mode: 'tint',
    activeReferenceCelId: null,
    transforms: new Map(),
    customReferences: [],
  };

  const listeners = new Set<() => void>();

  function notify(): void {
    for (const listener of listeners) {
      listener();
    }
  }

  // Playback timer variables
  let animFrameId: number | null = null;
  let lastTime: number = 0;
  let accumulatedTime: number = 0;

  function playbackLoop(time: number): void {
    const settings = getActiveScene().settings;
    if (!settings.isPlaying) return;

    if (lastTime === 0) {
      lastTime = time;
    }
    const delta = time - lastTime;
    lastTime = time;
    accumulatedTime += delta;

    const frameInterval = 1000 / settings.fps;
    if (accumulatedTime >= frameInterval) {
      const framesToAdvance = Math.floor(accumulatedTime / frameInterval);
      accumulatedTime %= frameInterval;

      let next = settings.currentFrame + framesToAdvance;
      if (next > settings.endFrame) {
        if (settings.loop) {
          const span = Math.max(1, settings.endFrame - settings.startFrame + 1);
          next = settings.startFrame + ((next - settings.startFrame) % span);
          const sc = getActiveScene();
          if (sc.audioTracks && sc.audioTracks.length > 0) {
            timelineAudioManager.startPlayback(sc.audioTracks, next, settings.fps);
          }
        } else {
          next = settings.endFrame;
          manager.pause();
        }
      }

      if (settings.currentFrame !== next) {
        settings.currentFrame = next;
        syncActiveCelWithFrame();
        notify();
      }
    }

    if (settings.isPlaying) {
      animFrameId = requestAnimationFrame(playbackLoop);
    }
  }

  // Ensure active layer in layerManager matches the active cel of the selected or first track
  function syncActiveCelWithFrame(): void {
    const scene = getActiveScene();
    const tracks = scene.tracks;
    const settings = scene.settings;
    if (tracks.length === 0) return;

    const activeLayer = layerManager.getActiveLayer();
    let targetTrack = tracks.find(
      (t) => t.folderId === activeLayer.id || t.folderId === activeLayer.parentId
    );
    if (!targetTrack && tracks.length > 0) {
      targetTrack = tracks[0];
    }
    if (targetTrack) {
      const activeCel = manager.getActiveCelForFrame(targetTrack.id, settings.currentFrame);
      if (activeCel && activeCel.id !== activeLayer.id) {
        layerManager.setActiveLayer(activeCel.id);
      }
    }
  }

  // Sync existing animation folders in layerManager with the active scene's tracks
  function syncTracksWithLayers(): void {
    const scene = getActiveScene();
    const tracks = scene.tracks;
    const settings = scene.settings;

    const existingFolders = layerManager.layers.filter(
      (l) => l.type === 'folder' && l.isAnimationFolder
    );

    // Remove tracks whose folders no longer exist or are duplicates
    const seenFolderIds = new Set<string>();
    for (let i = tracks.length - 1; i >= 0; i--) {
      const fId = tracks[i].folderId;
      if (!existingFolders.some((f) => f.id === fId) || seenFolderIds.has(fId)) {
        tracks.splice(i, 1);
      } else {
        seenFolderIds.add(fId);
      }
    }

    // Add tracks for any new animation folders
    for (const folder of existingFolders) {
      let track = tracks.find((t) => t.folderId === folder.id);
      const childLayers = layerManager.layers.filter((l) => l.parentId === folder.id);

      if (!track) {
        const clip = makeDefaultClip(
          settings.totalFrames,
          childLayers.length > 0 ? childLayers[0].id : undefined
        );
        track = {
          id: folder.id,
          folderId: folder.id,
          name: folder.name,
          visible: folder.visible,
          clips: [clip],
          exposures: new Map<number, string>(),
          keyframesEnabled: false,
          keyframes: new Map<number, TransformKeyframe>(),
        };
        syncTrackFlatExposures(track);
        tracks.push(track);
      } else {
        track.name = folder.name;
        track.visible = folder.visible;
        if (track.clips.length === 0) {
          track.clips.push(makeDefaultClip(settings.totalFrames));
        }
        if (childLayers.length > 0 && track.exposures.size === 0) {
          track.clips[0].exposures.set(track.clips[0].startFrame, childLayers[0].id);
          syncTrackFlatExposures(track);
        }
      }
    }

    // Ensure tracks array order matches visual layer order (topmost layer = topmost track)
    const folderOrderMap = new Map(existingFolders.map((f, i) => [f.id, i]));
    tracks.sort(
      (a, b) => (folderOrderMap.get(b.folderId) ?? 0) - (folderOrderMap.get(a.folderId) ?? 0)
    );
  }

  layerManager.subscribe(() => {
    syncTracksWithLayers();
    notify();
  });

  const manager: TimelineManager = {
    get settings() {
      return getActiveScene().settings;
    },
    get onionSkin() {
      return onionSkin;
    },
    get tracks() {
      return getActiveScene().tracks;
    },
    get scenes() {
      return scenes;
    },
    get activeSceneId() {
      return activeSceneId;
    },
    get activeScene() {
      return getActiveScene();
    },
    get bones() {
      return getActiveScene().bones;
    },
    get boneKeyframes() {
      return getActiveScene().boneKeyframes;
    },
    get selectedBoneId() {
      return selectedBoneId;
    },
    get audioTracks() {
      const sc = getActiveScene();
      if (!sc.audioTracks) sc.audioTracks = [];
      return sc.audioTracks;
    },

    // --- Audio Tracks (Lip-Sync & Sound Sync) ---
    addAudioTrack(name?: string): AudioTrack {
      const sc = getActiveScene();
      if (!sc.audioTracks) sc.audioTracks = [];
      const num = sc.audioTracks.length + 1;
      const newTrack: AudioTrack = {
        id: `audio-track-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: name?.trim() || `Audio ${num}`,
        volume: 1.0,
        muted: false,
        solo: false,
        clips: [],
      };
      sc.audioTracks.push(newTrack);
      notify();
      return newTrack;
    },

    removeAudioTrack(trackId: string): boolean {
      const sc = getActiveScene();
      if (!sc.audioTracks) return false;
      const idx = sc.audioTracks.findIndex((t) => t.id === trackId);
      if (idx === -1) return false;
      sc.audioTracks.splice(idx, 1);
      if (sc.settings.isPlaying) {
        timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
      }
      notify();
      return true;
    },

    renameAudioTrack(trackId: string, name: string): void {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (tr && name.trim()) {
        tr.name = name.trim();
        notify();
      }
    },

    setAudioTrackVolume(trackId: string, volume: number): void {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (tr) {
        tr.volume = Math.max(0, Math.min(1, volume));
        if (sc.settings.isPlaying) {
          timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
        }
        notify();
      }
    },

    toggleAudioTrackMute(trackId: string): void {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (tr) {
        tr.muted = !tr.muted;
        if (sc.settings.isPlaying) {
          timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
        }
        notify();
      }
    },

    toggleAudioTrackSolo(trackId: string): void {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (tr) {
        tr.solo = !tr.solo;
        if (sc.settings.isPlaying) {
          timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
        }
        notify();
      }
    },

    addAudioClip(trackId: string, clip: AudioClip): boolean {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (!tr) return false;
      tr.clips.push(clip);
      const clipEnd = clip.startFrame + clip.durationFrames - 1;
      if (clipEnd > sc.settings.totalFrames) {
        manager.setTotalFrames(clipEnd, true);
      }
      if (clip.startFrame < (sc.settings.minFrame ?? 0)) {
        sc.settings.minFrame = clip.startFrame;
      }
      if (sc.settings.isPlaying) {
        timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
      }
      notify();
      return true;
    },

    removeAudioClip(trackId: string, clipId: string): boolean {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (!tr) return false;
      const idx = tr.clips.findIndex((c) => c.id === clipId);
      if (idx === -1) return false;
      tr.clips.splice(idx, 1);
      if (sc.settings.isPlaying) {
        timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
      }
      notify();
      return true;
    },

    moveAudioClip(trackId: string, clipId: string, newStartFrame: number): boolean {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (!tr) return false;
      const clip = tr.clips.find((c) => c.id === clipId);
      if (!clip) return false;
      clip.startFrame = Math.round(newStartFrame);
      if (clip.startFrame < (sc.settings.minFrame ?? 0)) {
        sc.settings.minFrame = clip.startFrame;
      }
      const clipEnd = clip.startFrame + clip.durationFrames - 1;
      if (clipEnd > sc.settings.totalFrames) {
        manager.setTotalFrames(clipEnd, true);
      }
      if (sc.settings.isPlaying) {
        timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
      }
      notify();
      return true;
    },

    trimAudioClip(trackId: string, clipId: string, newStartFrame: number, newDurationFrames: number): boolean {
      const sc = getActiveScene();
      const tr = sc.audioTracks?.find((t) => t.id === trackId);
      if (!tr) return false;
      const clip = tr.clips.find((c) => c.id === clipId);
      if (!clip) return false;
      clip.startFrame = Math.round(newStartFrame);
      clip.durationFrames = Math.max(1, Math.round(newDurationFrames));
      if (clip.startFrame < (sc.settings.minFrame ?? 0)) {
        sc.settings.minFrame = clip.startFrame;
      }
      const clipEnd = clip.startFrame + clip.durationFrames - 1;
      if (clipEnd > sc.settings.totalFrames) {
        manager.setTotalFrames(clipEnd, true);
      }
      if (sc.settings.isPlaying) {
        timelineAudioManager.startPlayback(sc.audioTracks, sc.settings.currentFrame, sc.settings.fps);
      }
      notify();
      return true;
    },

    // --- Scenes (Multi-Animation System) ---
    createScene(name?: string, duplicateCurrent = false): AnimationScene {
      manager.pause();
      sceneCounter++;
      const current = getActiveScene();
      const newSettings: TimelineSettings = duplicateCurrent
        ? { ...current.settings, isPlaying: false, currentFrame: 1 }
        : makeDefaultSettings();

      const newTracks: AnimationTrack[] = [];
      const existingFolders = layerManager.layers.filter(
        (l) => l.type === 'folder' && l.isAnimationFolder
      );

      for (const folder of existingFolders) {
        const prevTrack = current.tracks.find((t) => t.folderId === folder.id);
        const childLayers = layerManager.layers.filter((l) => l.parentId === folder.id);

        if (duplicateCurrent && prevTrack) {
          const clonedClips: AnimationClip[] = prevTrack.clips.map((c) => ({
            id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            startFrame: c.startFrame,
            endFrame: c.endFrame,
            exposures: new Map(c.exposures),
          }));
          const clonedKeyframes = new Map<number, TransformKeyframe>();
          for (const [kFrame, kf] of prevTrack.keyframes.entries()) {
            clonedKeyframes.set(kFrame, { ...kf });
          }
          const t: AnimationTrack = {
            id: folder.id,
            folderId: folder.id,
            name: folder.name,
            visible: folder.visible,
            clips: clonedClips,
            exposures: new Map(),
            keyframesEnabled: prevTrack.keyframesEnabled,
            keyframes: clonedKeyframes,
          };
          syncTrackFlatExposures(t);
          newTracks.push(t);
        } else {
          // Create fresh cel for the new scene or assign first existing cel
          let initialCelId = childLayers[0]?.id;
          if (!duplicateCurrent) {
            // Create a dedicated clean cel for this scene so drawing immediately starts clean
            let maxNum = 0;
            for (const cel of childLayers) {
              const m = cel.name.match(/^(\d+)$/);
              if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
            }
            const newCel = layerManager.createLayer(`${maxNum + 1}`, folder.id);
            initialCelId = newCel.id;
          }
          const clip = makeDefaultClip(newSettings.totalFrames, initialCelId);
          const t: AnimationTrack = {
            id: folder.id,
            folderId: folder.id,
            name: folder.name,
            visible: folder.visible,
            clips: [clip],
            exposures: new Map(),
            keyframesEnabled: false,
            keyframes: new Map(),
          };
          syncTrackFlatExposures(t);
          newTracks.push(t);
        }
      }

      const clonedBones: Bone2D[] = current.bones.map((b) => ({ ...b }));
      const clonedBoneKfs = new Map<number, SkeletonKeyframe>();
      if (duplicateCurrent) {
        for (const [f, skf] of current.boneKeyframes.entries()) {
          const posesCopy = new Map<string, BonePoseDelta>();
          for (const [bId, p] of skf.poses.entries()) {
            posesCopy.set(bId, { ...p });
          }
          clonedBoneKfs.set(f, {
            frame: skf.frame,
            interpolation: skf.interpolation,
            poses: posesCopy,
          });
        }
      }

      const clonedAudioTracks: AudioTrack[] = duplicateCurrent
        ? current.audioTracks.map((at) => ({
            ...at,
            clips: at.clips.map((c) => ({ ...c })),
          }))
        : [];

      const newScene: AnimationScene = {
        id: `scene-${Date.now()}-${sceneCounter}`,
        name: name?.trim() || `Escena ${sceneCounter}`,
        settings: newSettings,
        tracks: newTracks,
        bones: clonedBones,
        boneKeyframes: clonedBoneKfs,
        audioTracks: clonedAudioTracks,
      };

      scenes.push(newScene);
      activeSceneId = newScene.id;
      syncTracksWithLayers();
      syncActiveCelWithFrame();
      notify();
      return newScene;
    },

    switchScene(sceneId: string) {
      if (sceneId === activeSceneId) return;
      const target = scenes.find((s) => s.id === sceneId);
      if (!target) return;
      manager.pause();
      activeSceneId = target.id;
      syncTracksWithLayers();
      syncActiveCelWithFrame();
      notify();
    },

    renameScene(sceneId: string, name: string) {
      const target = scenes.find((s) => s.id === sceneId);
      const clean = name.trim();
      if (target && clean) {
        target.name = clean;
        notify();
      }
    },

    deleteScene(sceneId: string): boolean {
      if (scenes.length <= 1) return false;
      const idx = scenes.findIndex((s) => s.id === sceneId);
      if (idx === -1) return false;
      manager.pause();
      scenes.splice(idx, 1);
      if (activeSceneId === sceneId) {
        activeSceneId = scenes[Math.max(0, idx - 1)].id;
      }
      syncTracksWithLayers();
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    // --- Playback ---
    play() {
      if (transformManager.isTransforming()) {
        transformManager.commitTransform();
      }
      const sc = getActiveScene();
      const settings = sc.settings;
      if (settings.isPlaying) return;
      settings.isPlaying = true;
      lastTime = 0;
      accumulatedTime = 0;
      if (sc.audioTracks && sc.audioTracks.length > 0) {
        timelineAudioManager.startPlayback(sc.audioTracks, settings.currentFrame, settings.fps);
      }
      animFrameId = requestAnimationFrame(playbackLoop);
      notify();
    },

    pause() {
      const settings = getActiveScene().settings;
      if (!settings.isPlaying) return;
      settings.isPlaying = false;
      timelineAudioManager.stopPlayback();
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      notify();
    },

    togglePlay() {
      if (getActiveScene().settings.isPlaying) {
        manager.pause();
      } else {
        manager.play();
      }
    },

    setFps(fps: number) {
      const settings = getActiveScene().settings;
      settings.fps = Math.max(1, Math.min(120, Math.round(fps)));
      notify();
    },

    setTotalFrames(total: number, expandEndFrame = true) {
      const scene = getActiveScene();
      const settings = scene.settings;
      const prevTotal = settings.totalFrames;
      const newTotal = Math.max(1, Math.min(2000, Math.round(total)));
      if (newTotal === prevTotal) return;

      const wasAtEnd = settings.endFrame === prevTotal;
      settings.totalFrames = newTotal;

      if (expandEndFrame && (wasAtEnd || settings.endFrame > newTotal)) {
        settings.endFrame = newTotal;
      } else if (settings.endFrame > newTotal) {
        settings.endFrame = newTotal;
      }

      const minF = settings.minFrame ?? 0;
      if (settings.startFrame > settings.endFrame) {
        settings.startFrame = Math.max(minF, settings.endFrame);
      }
      if (settings.currentFrame > newTotal) {
        settings.currentFrame = newTotal;
      }
      if (settings.currentFrame < minF) {
        settings.currentFrame = minF;
      }

      // Update clips that extended to the end of the timeline
      for (const track of scene.tracks) {
        for (const clip of track.clips) {
          if (clip.endFrame === prevTotal || clip.endFrame > newTotal) {
            clip.endFrame = newTotal;
          }
          if (clip.startFrame > newTotal) {
            clip.startFrame = newTotal;
          }
        }
        syncTrackFlatExposures(track);
      }

      syncActiveCelWithFrame();
      notify();
    },

    setRange(start: number, end: number) {
      const settings = getActiveScene().settings;
      const s = Math.round(start);
      // Si el inicio es menor que el minFrame actual, expandimos el rango visual hacia la izquierda
      const minF = Math.min(settings.minFrame ?? 0, s);
      settings.minFrame = minF;
      const e = Math.max(s, Math.min(settings.totalFrames, Math.round(end)));
      settings.startFrame = s;
      settings.endFrame = e;
      if (settings.currentFrame < s) settings.currentFrame = s;
      if (settings.currentFrame > e) settings.currentFrame = e;
      syncActiveCelWithFrame();
      notify();
    },

    setLoop(loop: boolean) {
      getActiveScene().settings.loop = loop;
      notify();
    },

    setDivision(division: number) {
      getActiveScene().settings.division = Math.max(2, Math.min(24, Math.round(division)));
      notify();
    },

    setTimeFormat(format: TimeDisplayFormat) {
      getActiveScene().settings.timeFormat = format;
      notify();
    },

    updateTimelineSettings(patch) {
      const scene = getActiveScene();
      if (patch.sceneName !== undefined && patch.sceneName.trim()) {
        scene.name = patch.sceneName.trim();
      }
      if (patch.minFrame !== undefined) {
        scene.settings.minFrame = Math.round(patch.minFrame);
      }
      if (patch.totalFrames !== undefined) {
        manager.setTotalFrames(patch.totalFrames, true);
      }
      if (patch.fps !== undefined) {
        scene.settings.fps = Math.max(1, Math.min(120, Math.round(patch.fps)));
      }
      if (patch.startFrame !== undefined || patch.endFrame !== undefined) {
        const s = patch.startFrame ?? scene.settings.startFrame;
        const e = patch.endFrame ?? scene.settings.endFrame;
        manager.setRange(s, e);
      }
      if (patch.loop !== undefined) {
        scene.settings.loop = patch.loop;
      }
      if (patch.division !== undefined) {
        scene.settings.division = Math.max(2, Math.min(24, Math.round(patch.division)));
      }
      if (patch.timeFormat !== undefined) {
        scene.settings.timeFormat = patch.timeFormat;
      }
      notify();
    },

    // --- Frame Navigation ---
    goToFrame(frame: number) {
      if (transformManager.isTransforming()) {
        transformManager.commitTransform();
      }
      const settings = getActiveScene().settings;
      const minF = settings.minFrame ?? 0;
      const clamped = Math.max(minF, Math.min(settings.totalFrames, Math.round(frame)));
      if (settings.currentFrame === clamped) return;
      settings.currentFrame = clamped;
      const sc = getActiveScene();
      if (sc.audioTracks && sc.audioTracks.length > 0) {
        if (settings.isPlaying) {
          timelineAudioManager.startPlayback(sc.audioTracks, clamped, settings.fps);
        } else {
          timelineAudioManager.scrubFrame(sc.audioTracks, clamped, settings.fps);
        }
      }
      syncActiveCelWithFrame();
      notify();
    },

    nextFrame() {
      const settings = getActiveScene().settings;
      let next = settings.currentFrame + 1;
      if (next > settings.endFrame) {
        next = settings.loop ? settings.startFrame : settings.endFrame;
      }
      manager.goToFrame(next);
    },

    prevFrame() {
      const settings = getActiveScene().settings;
      let prev = settings.currentFrame - 1;
      if (prev < settings.startFrame) {
        prev = settings.loop ? settings.endFrame : settings.startFrame;
      }
      manager.goToFrame(prev);
    },

    firstFrame() {
      manager.goToFrame(getActiveScene().settings.startFrame);
    },

    lastFrame() {
      manager.goToFrame(getActiveScene().settings.endFrame);
    },

    nextCel(trackId?: string) {
      const { tracks, settings } = getActiveScene();
      const track = trackId ? tracks.find((t) => t.id === trackId) : tracks[0];
      if (!track) return;
      const keyFrames = Array.from(track.exposures.keys()).sort((a, b) => a - b);
      const nextKey = keyFrames.find((f) => f > settings.currentFrame);
      if (nextKey !== undefined) {
        manager.goToFrame(nextKey);
      } else if (settings.loop && keyFrames.length > 0) {
        manager.goToFrame(keyFrames[0]);
      }
    },

    prevCel(trackId?: string) {
      const { tracks, settings } = getActiveScene();
      const track = trackId ? tracks.find((t) => t.id === trackId) : tracks[0];
      if (!track) return;
      const keyFrames = Array.from(track.exposures.keys()).sort((a, b) => b - a);
      const prevKey = keyFrames.find((f) => f < settings.currentFrame);
      if (prevKey !== undefined) {
        manager.goToFrame(prevKey);
      } else if (settings.loop && keyFrames.length > 0) {
        manager.goToFrame(keyFrames[0]);
      }
    },

    // --- Tracks, Clips, and Cels ---
    createTrack(name?: string): AnimationTrack {
      const { tracks, settings } = getActiveScene();
      const folder = layerManager.createAnimationFolder(name || `Animation ${tracks.length + 1}`);
      let track = tracks.find((t) => t.folderId === folder.id);
      if (!track) {
        track = {
          id: folder.id,
          folderId: folder.id,
          name: folder.name,
          visible: true,
          clips: [makeDefaultClip(settings.totalFrames)],
          exposures: new Map(),
          keyframesEnabled: false,
          keyframes: new Map(),
        };
        tracks.push(track);
      }

      const childLayers = layerManager.layers.filter((l) => l.parentId === folder.id);
      if (childLayers.length === 0) {
        const firstCel = layerManager.createLayer('1', folder.id);
        track.clips[0].exposures.set(1, firstCel.id);
        syncTrackFlatExposures(track);
        layerManager.setActiveLayer(firstCel.id);
      } else if (track.exposures.size === 0) {
        track.clips[0].exposures.set(1, childLayers[0].id);
        syncTrackFlatExposures(track);
        layerManager.setActiveLayer(childLayers[0].id);
      }

      notify();
      return track;
    },

    deleteTrack(trackId: string) {
      const { tracks } = getActiveScene();
      const idx = tracks.findIndex((t) => t.id === trackId);
      if (idx !== -1) {
        const track = tracks[idx];
        tracks.splice(idx, 1);
        layerManager.deleteLayer(track.folderId);
        notify();
      }
    },

    createCel(trackId?: string, frame?: number): LayerNode | null {
      const { tracks, settings } = getActiveScene();
      let track = trackId ? tracks.find((t) => t.id === trackId) : tracks[0];
      if (!track) {
        track = manager.createTrack();
      }

      const targetFrame = frame !== undefined ? frame : settings.currentFrame;

      const existingCels = layerManager.layers.filter((l) => l.parentId === track!.folderId);
      let maxNum = 0;
      for (const cel of existingCels) {
        const match = cel.name.match(/^(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
      const nextCelName = `${maxNum + 1}`;

      const newCel = layerManager.createLayer(nextCelName, track.folderId);
      const clip = findOrCreateClipForFrame(track, targetFrame, settings.totalFrames);
      clip.exposures.set(targetFrame, newCel.id);
      syncTrackFlatExposures(track);
      layerManager.setActiveLayer(newCel.id);
      notify();
      return newCel;
    },

    specifyCel(trackId: string, frame: number, celId: string) {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      if (frame > settings.totalFrames) {
        manager.setTotalFrames(frame, true);
      }
      const clip = findOrCreateClipForFrame(track, frame, settings.totalFrames);
      clip.exposures.set(frame, celId);
      syncTrackFlatExposures(track);
      syncActiveCelWithFrame();
      notify();
    },

    moveExposure(trackId: string, fromFrame: number, toFrame: number): boolean {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const celId = track.exposures.get(fromFrame);
      if (!celId) return false;

      const minF = settings.minFrame ?? 0;
      const targetClamped = Math.max(minF, Math.round(toFrame));
      if (targetClamped === fromFrame) return false;
      if (targetClamped > settings.totalFrames) {
        manager.setTotalFrames(targetClamped, true);
      }

      for (const c of track.clips) {
        c.exposures.delete(fromFrame);
      }
      const clip = findOrCreateClipForFrame(track, targetClamped, settings.totalFrames);
      clip.exposures.set(targetClamped, celId);
      syncTrackFlatExposures(track);
      settings.currentFrame = targetClamped;
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    moveCelSpan(
      trackId: string,
      fromFrame: number,
      toFrame: number,
      spanLength: number
    ): boolean {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const celId = track.exposures.get(fromFrame);
      if (!celId) return false;

      const minF = settings.minFrame ?? 0;
      const targetStart = Math.max(minF, Math.round(toFrame));
      const targetEnd = targetStart + Math.max(1, spanLength) - 1;
      if (targetStart === fromFrame) return false;

      if (targetEnd > settings.totalFrames) {
        manager.setTotalFrames(targetEnd, true);
      }

      // Encontrar el clip que contenía la exposición original
      const origClip = track.clips.find((c) => c.exposures.has(fromFrame));
      if (!origClip) return false;

      // Quitar la exposición original
      origClip.exposures.delete(fromFrame);

      // Si el clip original solo contenía este cel: trasladamos todo el clip con su inicio y fin intactos
      if (origClip.exposures.size === 0) {
        origClip.startFrame = targetStart;
        origClip.endFrame = targetEnd;
        origClip.exposures.set(targetStart, celId);
      } else {
        // Si el clip original tenía otras celdas, reajustar los límites de origClip
        const remainingFrames = Array.from(origClip.exposures.keys()).sort((a, b) => a - b);
        if (remainingFrames.length > 0) {
          origClip.startFrame = Math.min(origClip.startFrame, remainingFrames[0]);
          if (fromFrame > remainingFrames[remainingFrames.length - 1]) {
            const lastStart = remainingFrames[remainingFrames.length - 1];
            origClip.endFrame = Math.max(lastStart, fromFrame - 1);
          }
        }

        // Asignar a la celda trasladada su propio clip con la duración y límites exactos
        const newClip: AnimationClip = {
          id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          startFrame: targetStart,
          endFrame: targetEnd,
          exposures: new Map([[targetStart, celId]]),
        };
        track.clips.push(newClip);
      }

      // Ordenar clips y asegurar consistencia
      track.clips.sort((a, b) => a.startFrame - b.startFrame);
      syncTrackFlatExposures(track);
      settings.currentFrame = targetStart;
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    resizeCelSpan(
      trackId: string,
      expFrame: number,
      edge: 'left' | 'right',
      newEdgeFrame: number,
      mode: 'ripple' | 'overwrite' = 'ripple'
    ): boolean {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;

      const clip = track.clips.find((c) => c.exposures.has(expFrame));
      if (!clip) return false;

      const sorted = Array.from(clip.exposures.entries()).sort((a, b) => a[0] - b[0]);
      const idx = sorted.findIndex(([f]) => f === expFrame);
      if (idx === -1) return false;

      const [currStart, celId] = sorted[idx];
      const nextEntry = sorted[idx + 1];
      const prevEntry = idx > 0 ? sorted[idx - 1] : undefined;
      const currEnd = nextEntry ? nextEntry[0] - 1 : clip.endFrame;

      if (edge === 'right') {
        const targetEnd = Math.max(currStart, Math.round(newEdgeFrame));
        const delta = targetEnd - currEnd;
        if (delta === 0) return false;

        // If extending past totalFrames, auto-expand timeline
        if (targetEnd > settings.totalFrames) {
          manager.setTotalFrames(targetEnd, true);
        }

        if (!nextEntry) {
          // Last cel in clip: resize clip endFrame directly
          clip.endFrame = Math.max(currStart, targetEnd);
          if (clip.endFrame > settings.totalFrames) {
            manager.setTotalFrames(clip.endFrame, true);
          }
        } else if (mode === 'ripple') {
          // Shift all subsequent exposures in this clip by delta (ripple cel duration)
          const rebuilt = new Map<number, string>();
          for (let i = 0; i <= idx; i++) {
            rebuilt.set(sorted[i][0], sorted[i][1]);
          }
          for (let i = idx + 1; i < sorted.length; i++) {
            const shiftedFrame = Math.max(currStart + (i - idx), sorted[i][0] + delta);
            rebuilt.set(shiftedFrame, sorted[i][1]);
            if (shiftedFrame > clip.endFrame) {
              clip.endFrame = shiftedFrame;
            }
          }
          if (clip.endFrame > settings.totalFrames) {
            manager.setTotalFrames(clip.endFrame, true);
          }
          clip.exposures = rebuilt;
        } else {
          // Non-ripple (roll edit with next exposure)
          const newNextStart = targetEnd + 1;
          clip.exposures.delete(nextEntry[0]);
          if (newNextStart <= clip.endFrame) {
            clip.exposures.set(newNextStart, nextEntry[1]);
          }
        }
      } else {
        // Left edge drag: adjust start frame of this cel
        const minAllowed = prevEntry ? prevEntry[0] + 1 : (settings.minFrame ?? 0);
        const maxAllowed = currEnd;
        const targetStart = Math.max(minAllowed, Math.min(maxAllowed, Math.round(newEdgeFrame)));
        if (targetStart === currStart) return false;

        if (targetStart < clip.startFrame) {
          clip.startFrame = targetStart;
        }
        clip.exposures.delete(currStart);
        clip.exposures.set(targetStart, celId);
      }

      syncTrackFlatExposures(track);
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    resizeClip(trackId: string, clipId: string, newStart: number, newEnd: number): boolean {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const clip = track.clips.find((c) => c.id === clipId);
      if (!clip) return false;

      const minF = settings.minFrame ?? 0;
      const s = Math.max(minF, Math.round(newStart));
      const e = Math.max(s, Math.round(newEnd));
      if (e > settings.totalFrames) {
        manager.setTotalFrames(e, true);
      }

      // If left edge moved and there was an exposure at old startFrame, move it with the clip start if no earlier exposure exists
      if (s !== clip.startFrame && clip.exposures.has(clip.startFrame) && !clip.exposures.has(s)) {
        const firstCel = clip.exposures.get(clip.startFrame)!;
        clip.exposures.delete(clip.startFrame);
        clip.exposures.set(s, firstCel);
      }

      clip.startFrame = s;
      clip.endFrame = e;
      syncTrackFlatExposures(track);
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    splitClip(trackId: string, frame: number): boolean {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const clip = track.clips.find((c) => frame > c.startFrame && frame <= c.endFrame);
      if (!clip) return false;

      const activeCel = manager.getActiveCelForFrame(trackId, frame);
      const rightExposures = new Map<number, string>();
      for (const [f, cId] of Array.from(clip.exposures.entries())) {
        if (f >= frame) {
          rightExposures.set(f, cId);
          clip.exposures.delete(f);
        }
      }
      if (!rightExposures.has(frame) && activeCel) {
        rightExposures.set(frame, activeCel.id);
      }

      const rightClip: AnimationClip = {
        id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        startFrame: frame,
        endFrame: clip.endFrame,
        exposures: rightExposures,
      };
      clip.endFrame = frame - 1;
      track.clips.push(rightClip);
      syncTrackFlatExposures(track);
      notify();
      return true;
    },

    removeExposure(trackId: string, frame: number) {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      for (const clip of track.clips) {
        clip.exposures.delete(frame);
      }
      syncTrackFlatExposures(track);
      syncActiveCelWithFrame();
      notify();
    },

    getCelsInTrack(trackId: string): LayerNode[] {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return [];
      return layerManager.layers.filter((l) => l.parentId === track.folderId);
    },

    deleteCelLayer(trackId: string, celId: string): boolean {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;

      // Remove across all scenes
      for (const sc of scenes) {
        for (const tr of sc.tracks) {
          for (const clip of tr.clips) {
            for (const [f, id] of Array.from(clip.exposures.entries())) {
              if (id === celId) clip.exposures.delete(f);
            }
          }
          syncTrackFlatExposures(tr);
        }
      }

      const res = layerManager.deleteLayer(celId);
      syncActiveCelWithFrame();
      notify();
      return res;
    },

    batchSpecifyCels(trackId: string, step: number = 2) {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      const cels = layerManager.layers.filter((l) => l.parentId === track.folderId);
      if (cels.length === 0) return;

      const s = Math.max(1, Math.round(step));
      const requiredFrames = (cels.length - 1) * s + s;
      if (requiredFrames > settings.totalFrames) {
        manager.setTotalFrames(requiredFrames, true);
      }

      const clip = makeDefaultClip(settings.totalFrames);
      let f = 1;
      for (const cel of cels) {
        if (f > settings.totalFrames) break;
        clip.exposures.set(f, cel.id);
        f += s;
      }
      track.clips = [clip];
      syncTrackFlatExposures(track);
      syncActiveCelWithFrame();
      notify();
    },

    // --- Keyframes & Interpolation ---
    toggleTrackKeyframes(trackId: string, force?: boolean) {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      track.keyframesEnabled = force !== undefined ? force : !track.keyframesEnabled;
      if (track.keyframesEnabled && track.keyframes.size === 0) {
        // Automatically insert an initial keyframe at currentFrame so user sees it right away
        track.keyframes.set(settings.currentFrame, {
          frame: settings.currentFrame,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          opacity: 1,
          interpolation: 'smooth',
        });
      }
      notify();
    },

    addOrUpdateKeyframe(trackId, frame, patch) {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return null;
      track.keyframesEnabled = true;

      const minF = settings.minFrame ?? 0;
      const clampedFrame = Math.max(minF, Math.min(settings.totalFrames, Math.round(frame)));
      const existing = track.keyframes.get(clampedFrame);
      if (existing) {
        if (patch) Object.assign(existing, patch);
        notify();
        return existing;
      }

      // Initialize from current interpolated transform at that frame
      const base = manager.getInterpolatedTransform(trackId, clampedFrame);
      const kf: TransformKeyframe = {
        frame: clampedFrame,
        x: patch?.x ?? base.x,
        y: patch?.y ?? base.y,
        scaleX: patch?.scaleX ?? base.scaleX,
        scaleY: patch?.scaleY ?? base.scaleY,
        rotation: patch?.rotation ?? base.rotation,
        opacity: patch?.opacity ?? base.opacity,
        interpolation: patch?.interpolation ?? 'smooth',
      };
      track.keyframes.set(clampedFrame, kf);
      notify();
      return kf;
    },

    moveKeyframe(trackId, fromFrame, toFrame) {
      const { tracks, settings } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const kf = track.keyframes.get(fromFrame);
      if (!kf) return false;
      const minF = settings.minFrame ?? 0;
      const target = Math.max(minF, Math.min(settings.totalFrames, Math.round(toFrame)));
      if (target === fromFrame) return false;

      track.keyframes.delete(fromFrame);
      kf.frame = target;
      track.keyframes.set(target, kf);
      notify();
      return true;
    },

    deleteKeyframe(trackId, frame) {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const deleted = track.keyframes.delete(frame);
      if (deleted) notify();
      return deleted;
    },

    setKeyframeInterpolation(trackId, frame, interpolation) {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      const kf = track.keyframes.get(frame);
      if (kf) {
        kf.interpolation = interpolation;
        notify();
      }
    },

    getInterpolatedTransform(trackId: string, frame: number): EvaluatedTransform {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId);
      if (!track || !track.keyframesEnabled || track.keyframes.size === 0) {
        return { ...DEFAULT_TRANSFORM };
      }
      return timelineCoreEngine.evaluateTrackTransform(track, frame).transform;
    },

    // --- 2D Bone / Skeleton System (Rigging, FK, IK, and Bone Keyframes) ---
    selectBone(boneId: string | null) {
      if (selectedBoneId === boneId) return;
      selectedBoneId = boneId;
      notify();
    },

    createBoneFromWorld(
      headX: number,
      headY: number,
      tailX: number,
      tailY: number,
      parentId?: string | null,
      name?: string
    ): Bone2D {
      const scene = getActiveScene();
      const evalMap = evaluateArmatureWorld(scene.bones);

      const resolvedParentId =
        parentId !== undefined
          ? parentId
          : selectedBoneId && scene.bones.some((b) => b.id === selectedBoneId)
          ? selectedBoneId
          : null;

      const parentEval = resolvedParentId ? evalMap.get(resolvedParentId) : undefined;
      const dx = tailX - headX;
      const dy = tailY - headY;
      const length = Math.max(18, Math.hypot(dx, dy));
      const worldAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      let restX = headX;
      let restY = headY;
      let restRotation = worldAngleDeg;

      if (parentEval) {
        const localHead = transformPoint2D(parentEval.bindInverseMatrix, headX, headY);
        restX = localHead.x;
        restY = localHead.y;
        restRotation = normalizeAngleDeg(worldAngleDeg - parentEval.bindWorldAngleDeg);
      }

      const id = `bone-${Date.now()}-${boneCounter++}`;
      const color = BONE_PALETTE[(scene.bones.length) % BONE_PALETTE.length];
      const bone: Bone2D = {
        id,
        name: name?.trim() || `Hueso ${scene.bones.length + 1}`,
        parentId: resolvedParentId,
        restX,
        restY,
        restRotation,
        length,
        color,
        ikBendPositive: true,
      };

      scene.bones.push(bone);
      selectedBoneId = bone.id;
      notify();
      return bone;
    },

    updateBoneEndpointWorld(boneId: string, newTailX: number, newTailY: number) {
      const scene = getActiveScene();
      const bone = scene.bones.find((b) => b.id === boneId);
      if (!bone) return;
      const evalMap = evaluateArmatureWorld(scene.bones);
      const bEval = evalMap.get(boneId);
      if (!bEval) return;

      const dx = newTailX - bEval.bindHeadX;
      const dy = newTailY - bEval.bindHeadY;
      const newLen = Math.max(12, Math.hypot(dx, dy));
      const newWorldAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

      const parentEval = bone.parentId ? evalMap.get(bone.parentId) : undefined;
      bone.length = newLen;
      bone.restRotation = parentEval
        ? normalizeAngleDeg(newWorldAngle - parentEval.bindWorldAngleDeg)
        : newWorldAngle;
      notify();
    },

    moveBoneHeadWorld(boneId: string, newHeadX: number, newHeadY: number) {
      const scene = getActiveScene();
      const bone = scene.bones.find((b) => b.id === boneId);
      if (!bone) return;
      const evalMap = evaluateArmatureWorld(scene.bones);
      const parentEval = bone.parentId ? evalMap.get(bone.parentId) : undefined;

      if (parentEval) {
        const localPt = transformPoint2D(parentEval.bindInverseMatrix, newHeadX, newHeadY);
        bone.restX = localPt.x;
        bone.restY = localPt.y;
      } else {
        bone.restX = newHeadX;
        bone.restY = newHeadY;
      }
      notify();
    },

    renameBone(boneId: string, name: string) {
      const scene = getActiveScene();
      const bone = scene.bones.find((b) => b.id === boneId);
      const clean = name.trim();
      if (bone && clean) {
        bone.name = clean;
        notify();
      }
    },

    setBoneParent(boneId: string, parentId: string | null) {
      const scene = getActiveScene();
      const bone = scene.bones.find((b) => b.id === boneId);
      if (!bone || bone.id === parentId) return;

      // Prevent cycle
      let curr = parentId ? scene.bones.find((b) => b.id === parentId) : undefined;
      while (curr) {
        if (curr.id === bone.id) return;
        curr = curr.parentId ? scene.bones.find((b) => b.id === curr!.parentId) : undefined;
      }

      // Preserve world bind position & orientation
      const evalMap = evaluateArmatureWorld(scene.bones);
      const bEval = evalMap.get(bone.id);
      if (!bEval) return;

      const newParentEval = parentId ? evalMap.get(parentId) : undefined;
      if (newParentEval) {
        const localHead = transformPoint2D(
          newParentEval.bindInverseMatrix,
          bEval.bindHeadX,
          bEval.bindHeadY
        );
        bone.restX = localHead.x;
        bone.restY = localHead.y;
        bone.restRotation = normalizeAngleDeg(
          bEval.bindWorldAngleDeg - newParentEval.bindWorldAngleDeg
        );
      } else {
        bone.restX = bEval.bindHeadX;
        bone.restY = bEval.bindHeadY;
        bone.restRotation = bEval.bindWorldAngleDeg;
      }
      bone.parentId = parentId;
      notify();
    },

    toggleBoneIKBend(boneId: string) {
      const scene = getActiveScene();
      const bone = scene.bones.find((b) => b.id === boneId);
      if (!bone) return;
      bone.ikBendPositive = bone.ikBendPositive === false ? true : false;
      notify();
    },

    deleteBone(boneId: string): boolean {
      const scene = getActiveScene();
      const idx = scene.bones.findIndex((b) => b.id === boneId);
      if (idx === -1) return false;

      const target = scene.bones[idx];
      // Reparent children to target.parentId while preserving world coordinates
      const children = scene.bones.filter((b) => b.parentId === boneId);
      for (const ch of children) {
        manager.setBoneParent(ch.id, target.parentId);
      }

      scene.bones.splice(idx, 1);
      for (const skf of scene.boneKeyframes.values()) {
        skf.poses.delete(boneId);
      }
      for (const l of layerManager.layers) {
        if (l.boundBoneId === boneId) {
          l.boundBoneId = null;
        }
      }
      if (selectedBoneId === boneId) {
        selectedBoneId = scene.bones[0]?.id ?? null;
      }
      notify();
      return true;
    },

    createHumanoidPreset(centerX: number, centerY: number) {
      const scene = getActiveScene();
      scene.bones = [];
      scene.boneKeyframes.clear();

      // Root Pelvis -> Torso -> Head
      const pelvis = manager.createBoneFromWorld(centerX, centerY + 40, centerX, centerY - 60, null, 'Torso');
      const head = manager.createBoneFromWorld(centerX, centerY - 60, centerX, centerY - 135, pelvis.id, 'Cabeza');
      // Left Arm (Upper + Forearm)
      const armL = manager.createBoneFromWorld(centerX - 10, centerY - 50, centerX - 85, centerY - 10, pelvis.id, 'Brazo Izq');
      manager.createBoneFromWorld(centerX - 85, centerY - 10, centerX - 145, centerY + 35, armL.id, 'Antebrazo Izq');
      // Right Arm (Upper + Forearm)
      const armR = manager.createBoneFromWorld(centerX + 10, centerY - 50, centerX + 85, centerY - 10, pelvis.id, 'Brazo Der');
      manager.createBoneFromWorld(centerX + 85, centerY - 10, centerX + 145, centerY + 35, armR.id, 'Antebrazo Der');
      // Left Leg (Thigh + Shin)
      const legL = manager.createBoneFromWorld(centerX - 18, centerY + 40, centerX - 30, centerY + 135, pelvis.id, 'Muslo Izq');
      manager.createBoneFromWorld(centerX - 30, centerY + 135, centerX - 35, centerY + 230, legL.id, 'Pierna Izq');
      // Right Leg (Thigh + Shin)
      const legR = manager.createBoneFromWorld(centerX + 18, centerY + 40, centerX + 30, centerY + 135, pelvis.id, 'Muslo Der');
      manager.createBoneFromWorld(centerX + 30, centerY + 135, centerX + 35, centerY + 230, legR.id, 'Pierna Der');

      selectedBoneId = head.id;
      // Create initial bind keyframe at frame 1
      manager.addOrUpdateBoneKeyframe(1, 'smooth');
      notify();
    },

    setBonePoseAtFrame(frame, boneId, patch, interpolation = 'smooth') {
      const scene = getActiveScene();
      const minF = scene.settings.minFrame ?? 0;
      const clampedFrame = Math.max(minF, Math.min(scene.settings.totalFrames, Math.round(frame)));
      let skf = scene.boneKeyframes.get(clampedFrame);
      if (!skf) {
        const currentPoses = manager.getInterpolatedBonePoses(clampedFrame);
        skf = {
          frame: clampedFrame,
          interpolation,
          poses: currentPoses,
        };
        scene.boneKeyframes.set(clampedFrame, skf);
      }
      const existing = skf.poses.get(boneId) ?? {
        dX: 0,
        dY: 0,
        dRotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      skf.poses.set(boneId, { ...existing, ...patch });
      notify();
    },

    applyTwoBoneIKAtFrame(frame, endBoneId, targetX, targetY) {
      const scene = getActiveScene();
      const minF = scene.settings.minFrame ?? 0;
      const clampedFrame = Math.max(minF, Math.min(scene.settings.totalFrames, Math.round(frame)));
      const currentPoses = manager.getInterpolatedBonePoses(clampedFrame);
      const solved = solveTwoBoneIK(scene.bones, currentPoses, endBoneId, targetX, targetY);

      let skf = scene.boneKeyframes.get(clampedFrame);
      if (!skf) {
        skf = {
          frame: clampedFrame,
          interpolation: 'smooth',
          poses: solved,
        };
        scene.boneKeyframes.set(clampedFrame, skf);
      } else {
        skf.poses = solved;
      }
      notify();
    },

    addOrUpdateBoneKeyframe(frame, interpolation = 'smooth') {
      const scene = getActiveScene();
      const minF = scene.settings.minFrame ?? 0;
      const clampedFrame = Math.max(minF, Math.min(scene.settings.totalFrames, Math.round(frame)));
      let skf = scene.boneKeyframes.get(clampedFrame);
      if (skf) {
        skf.interpolation = interpolation;
        notify();
        return skf;
      }
      const currentPoses = manager.getInterpolatedBonePoses(clampedFrame);
      for (const b of scene.bones) {
        if (!currentPoses.has(b.id)) {
          currentPoses.set(b.id, { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 });
        }
      }
      skf = {
        frame: clampedFrame,
        interpolation,
        poses: currentPoses,
      };
      scene.boneKeyframes.set(clampedFrame, skf);
      notify();
      return skf;
    },

    moveBoneKeyframe(fromFrame, toFrame) {
      const scene = getActiveScene();
      const skf = scene.boneKeyframes.get(fromFrame);
      if (!skf) return false;
      const minF = scene.settings.minFrame ?? 0;
      const target = Math.max(minF, Math.min(scene.settings.totalFrames, Math.round(toFrame)));
      if (target === fromFrame) return false;
      scene.boneKeyframes.delete(fromFrame);
      skf.frame = target;
      scene.boneKeyframes.set(target, skf);
      notify();
      return true;
    },

    deleteBoneKeyframe(frame) {
      const scene = getActiveScene();
      const res = scene.boneKeyframes.delete(frame);
      if (res) notify();
      return res;
    },

    resetBonePoseAtFrame(frame, boneId) {
      const scene = getActiveScene();
      const skf = scene.boneKeyframes.get(frame);
      if (!skf) return;
      if (boneId) {
        skf.poses.set(boneId, { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 });
      } else {
        for (const b of scene.bones) {
          skf.poses.set(b.id, { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 });
        }
      }
      notify();
    },

    getInterpolatedBonePoses(frame: number): Map<string, BonePoseDelta> {
      const scene = getActiveScene();
      const result = new Map<string, BonePoseDelta>();
      if (scene.bones.length === 0 || scene.boneKeyframes.size === 0) {
        return result;
      }

      const sorted = Array.from(scene.boneKeyframes.values()).sort((a, b) => a.frame - b.frame);
      if (frame <= sorted[0].frame) {
        for (const [bId, p] of sorted[0].poses.entries()) {
          result.set(bId, { ...p });
        }
        return result;
      }
      if (frame >= sorted[sorted.length - 1].frame) {
        for (const [bId, p] of sorted[sorted.length - 1].poses.entries()) {
          result.set(bId, { ...p });
        }
        return result;
      }

      let k0 = sorted[0];
      let k1 = sorted[1];
      for (let i = 0; i < sorted.length - 1; i++) {
        if (frame >= sorted[i].frame && frame <= sorted[i + 1].frame) {
          k0 = sorted[i];
          k1 = sorted[i + 1];
          break;
        }
      }

      if (k0.interpolation === 'hold' || k0.frame === k1.frame) {
        for (const [bId, p] of k0.poses.entries()) {
          result.set(bId, { ...p });
        }
        return result;
      }

      const rawT = (frame - k0.frame) / (k1.frame - k0.frame);
      const t = k0.interpolation === 'smooth' ? rawT * rawT * (3 - 2 * rawT) : rawT;

      for (const bone of scene.bones) {
        const p0 = k0.poses.get(bone.id) ?? { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 };
        const p1 = k1.poses.get(bone.id) ?? { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 };
        const rotDiff = normalizeAngleDeg(p1.dRotation - p0.dRotation);
        result.set(bone.id, {
          dX: p0.dX + (p1.dX - p0.dX) * t,
          dY: p0.dY + (p1.dY - p0.dY) * t,
          dRotation: p0.dRotation + rotDiff * t,
          scaleX: p0.scaleX + (p1.scaleX - p0.scaleX) * t,
          scaleY: p0.scaleY + (p1.scaleY - p0.scaleY) * t,
        });
      }

      return result;
    },

    getEvaluatedBones(frame?: number): Map<string, EvaluatedBoneWorld> {
      const scene = getActiveScene();
      const targetFrame = frame ?? scene.settings.currentFrame;
      const poses = manager.getInterpolatedBonePoses(targetFrame);
      return evaluateArmatureWorld(scene.bones, poses);
    },

    hitTestBoneAtWorld(docX: number, docY: number, frame?: number) {
      const scene = getActiveScene();
      if (scene.bones.length === 0) return null;
      const evalMap = manager.getEvaluatedBones(frame);
      const jointRadius = 14;

      // 1. Check tail joints first (great for IK / lengthening / chaining)
      for (let i = scene.bones.length - 1; i >= 0; i--) {
        const b = scene.bones[i];
        const ev = evalMap.get(b.id);
        if (!ev) continue;
        if (Math.hypot(docX - ev.tailX, docY - ev.tailY) <= jointRadius) {
          return { bone: b, part: 'tail' as const, evalBone: ev };
        }
      }

      // 2. Check head joints
      for (let i = scene.bones.length - 1; i >= 0; i--) {
        const b = scene.bones[i];
        const ev = evalMap.get(b.id);
        if (!ev) continue;
        if (Math.hypot(docX - ev.headX, docY - ev.headY) <= jointRadius) {
          return { bone: b, part: 'head' as const, evalBone: ev };
        }
      }

      // 3. Check bone body segment
      for (let i = scene.bones.length - 1; i >= 0; i--) {
        const b = scene.bones[i];
        const ev = evalMap.get(b.id);
        if (!ev) continue;
        const dist = distanceToSegment(docX, docY, ev.headX, ev.headY, ev.tailX, ev.tailY);
        if (dist <= 12) {
          return { bone: b, part: 'body' as const, evalBone: ev };
        }
      }

      return null;
    },

    // --- Onion Skin Settings & Reference Calibration ---
    setOnionSkin(patch: Partial<OnionSkinSettings>) {
      Object.assign(onionSkin, patch);
      notify();
    },

    toggleOnionSkin(force?: boolean) {
      onionSkin.enabled = force !== undefined ? force : !onionSkin.enabled;
      notify();
    },

    getOnionSkinTransform(celId: string): OnionSkinTransform {
      let t = onionSkin.transforms.get(celId);
      if (!t) {
        t = makeDefaultOnionTransform();
        onionSkin.transforms.set(celId, t);
      }
      return t;
    },

    updateOnionSkinTransform(celId: string, patch: Partial<OnionSkinTransform>): void {
      const current = manager.getOnionSkinTransform(celId);
      Object.assign(current, patch);
      const ref = onionSkin.customReferences.find((r) => r.celId === celId);
      if (ref) {
        ref.transform = current;
      }
      notify();
    },

    resetOnionSkinTransform(celId: string): void {
      const def = makeDefaultOnionTransform();
      onionSkin.transforms.set(celId, def);
      const ref = onionSkin.customReferences.find((r) => r.celId === celId);
      if (ref) {
        ref.transform = def;
      }
      notify();
    },

    addCustomOnionReference(celId: string, customName?: string): OnionSkinCustomReference | null {
      const layer = layerManager.layers.find((l) => l.id === celId);
      if (!layer) return null;

      const existing = onionSkin.customReferences.find((r) => r.celId === celId);
      if (existing) {
        existing.visible = true;
        onionSkin.activeReferenceCelId = celId;
        notify();
        return existing;
      }

      const scene = getActiveScene();
      let parentTrack: AnimationTrack | undefined;
      let expFrame = scene.settings.currentFrame;

      for (const t of scene.tracks) {
        for (const [f, id] of t.exposures.entries()) {
          if (id === celId) {
            parentTrack = t;
            expFrame = f;
            break;
          }
        }
        if (parentTrack) break;
      }

      const transform = manager.getOnionSkinTransform(celId);
      const ref: OnionSkinCustomReference = {
        id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        celId: layer.id,
        name: customName || layer.name,
        trackId: parentTrack ? parentTrack.id : '',
        trackName: parentTrack ? parentTrack.name : 'Pista',
        frame: expFrame,
        visible: true,
        opacity: onionSkin.startOpacity,
        colorMode: 'monochrome',
        tintColor: '#ffd43b',
        transform,
      };

      onionSkin.customReferences.push(ref);
      onionSkin.activeReferenceCelId = celId;
      notify();
      return ref;
    },

    removeCustomOnionReference(referenceId: string): void {
      const idx = onionSkin.customReferences.findIndex((r) => r.id === referenceId || r.celId === referenceId);
      if (idx !== -1) {
        const removed = onionSkin.customReferences.splice(idx, 1)[0];
        if (onionSkin.activeReferenceCelId === removed.celId) {
          onionSkin.activeReferenceCelId =
            onionSkin.customReferences.length > 0 ? onionSkin.customReferences[0].celId : null;
        }
        notify();
      }
    },

    updateCustomOnionReference(id: string, patch: Partial<OnionSkinCustomReference>): void {
      const ref = onionSkin.customReferences.find((r) => r.id === id || r.celId === id);
      if (ref) {
        Object.assign(ref, patch);
        if (patch.transform) {
          onionSkin.transforms.set(ref.celId, ref.transform);
        }
        notify();
      }
    },

    setActiveReferenceCel(celId: string | null): void {
      onionSkin.activeReferenceCelId = celId;
      notify();
    },

    // --- Query State for Rendering ---
    getActiveCelForFrame(trackId: string, frame: number): LayerNode | undefined {
      const { tracks } = getActiveScene();
      const track = tracks.find((t) => t.id === trackId || t.folderId === trackId);
      if (!track) return undefined;
      const celId = timelineCoreEngine.getActiveCelId(track, frame);
      if (!celId) return undefined;
      return layerManager.layers.find((l) => l.id === celId);
    },

    getOnionSkinCels(trackId: string, currentFrame: number): OnionSkinCelInfo[] {
      if (!onionSkin.enabled) return [];
      const scene = getActiveScene();
      const track = scene.tracks.find((t) => t.id === trackId);
      if (!track || !track.visible) return [];

      const currentCel = manager.getActiveCelForFrame(trackId, currentFrame);
      const currentCelId = currentCel ? currentCel.id : null;

      const evaluated = timelineCoreEngine.evaluateOnionSkin(scene, currentFrame, onionSkin);
      const results: OnionSkinCelInfo[] = [];

      for (const item of evaluated) {
        if (item.trackId !== trackId) continue;
        const cel = layerManager.layers.find((l) => l.id === item.celId);
        if (!cel) continue;

        results.push({
          layer: cel,
          isPrev: item.isPrev,
          distance: item.distance,
          opacity: item.opacity,
          tintColor: item.isPrev ? onionSkin.prevColor : onionSkin.nextColor,
          transform: item.transform,
          onionTransform: manager.getOnionSkinTransform(cel.id),
        });
      }

      // Append any custom pinned reference cels
      for (const ref of onionSkin.customReferences) {
        if (!ref.visible) continue;
        const celLayer = layerManager.layers.find((l) => l.id === ref.celId);
        if (celLayer && celLayer.id !== currentCelId && !results.some((r) => r.layer.id === celLayer.id)) {
          results.push({
            layer: celLayer,
            isPrev: true,
            distance: 0,
            opacity: ref.opacity ?? onionSkin.startOpacity,
            tintColor: ref.tintColor ?? '#ffd43b',
            onionTransform: manager.getOnionSkinTransform(celLayer.id),
          });
        }
      }

      return results;
    },

    isLayerVisibleAtFrame(layer: LayerNode, frame: number): boolean {
      if (!layer.visible) return false;

      let parentFolder: LayerNode | undefined;
      if (layer.parentId) {
        parentFolder = layerManager.layers.find((l) => l.id === layer.parentId);
      }

      if (parentFolder && parentFolder.isAnimationFolder) {
        const activeCel = manager.getActiveCelForFrame(parentFolder.id, frame);
        if (!activeCel) return false;
        if (layer.id === activeCel.id) return true;
        return layer.parentId === activeCel.id;
      }

      return true;
    },

    getLayerTransformAtFrame(layer: LayerNode, frame: number): EvaluatedTransform | null {
      let parentFolder: LayerNode | undefined;
      if (layer.parentId) {
        parentFolder = layerManager.layers.find((l) => l.id === layer.parentId);
      }
      if (parentFolder && parentFolder.isAnimationFolder) {
        const { tracks } = getActiveScene();
        const track = tracks.find((t) => t.folderId === parentFolder!.id);
        if (track && track.keyframesEnabled && track.keyframes.size > 0) {
          return manager.getInterpolatedTransform(track.id, frame);
        }
      }
      return null;
    },

    get lightTable(): LightTableSettings {
      return {
        get enabled() {
          return onionSkin.enabled;
        },
        set enabled(v: boolean) {
          onionSkin.enabled = v;
        },
        get activeRegistrationId() {
          return onionSkin.activeReferenceCelId ?? null;
        },
        set activeRegistrationId(v: string | null) {
          onionSkin.activeReferenceCelId = v;
        },
        get registrations() {
          return onionSkin.customReferences;
        },
      };
    },

    toggleLightTable(force?: boolean): void {
      manager.toggleOnionSkin(force);
    },

    registerCelToLightTable(celId: string, customName?: string): LightTableRegistration | null {
      return manager.addCustomOnionReference(celId, customName);
    },

    registerPrevCelToLightTable(trackId?: string): LightTableRegistration | null {
      const scene = getActiveScene();
      const track = trackId ? scene.tracks.find((t) => t.id === trackId) : scene.tracks[0];
      if (!track) return null;

      const f = scene.settings.currentFrame;
      const sorted = Array.from(track.exposures.keys()).sort((a, b) => a - b);
      const prevF = [...sorted].reverse().find((frame) => frame < f);
      if (prevF === undefined) return null;

      const celId = track.exposures.get(prevF);
      if (!celId) return null;

      const reg = manager.addCustomOnionReference(celId);
      if (reg) {
        reg.tintColor = '#38bdf8';
        reg.colorMode = 'monochrome';
      }
      return reg;
    },

    registerNextCelToLightTable(trackId?: string): LightTableRegistration | null {
      const scene = getActiveScene();
      const track = trackId ? scene.tracks.find((t) => t.id === trackId) : scene.tracks[0];
      if (!track) return null;

      const f = scene.settings.currentFrame;
      const sorted = Array.from(track.exposures.keys()).sort((a, b) => a - b);
      const nextF = sorted.find((frame) => frame > f);
      if (nextF === undefined) return null;

      const celId = track.exposures.get(nextF);
      if (!celId) return null;

      const reg = manager.addCustomOnionReference(celId);
      if (reg) {
        reg.tintColor = '#4ade80';
        reg.colorMode = 'monochrome';
      }
      return reg;
    },

    unregisterLightTable(registrationId: string): void {
      manager.removeCustomOnionReference(registrationId);
    },

    updateLightTableRegistration(id: string, patch: Partial<LightTableRegistration>): void {
      manager.updateCustomOnionReference(id, patch);
    },

    updateLightTableTransform(id: string, transformPatch: Partial<LightTableTransform>): void {
      const ref = onionSkin.customReferences.find((r) => r.id === id || r.celId === id);
      if (ref) {
        manager.updateOnionSkinTransform(ref.celId, transformPatch);
      }
    },

    resetLightTableTransform(id: string): void {
      const ref = onionSkin.customReferences.find((r) => r.id === id || r.celId === id);
      if (ref) {
        manager.resetOnionSkinTransform(ref.celId);
      }
    },

    setActiveLightTableRegistration(id: string | null): void {
      manager.setActiveReferenceCel(id);
    },

    getLightTableRegistrations(): LightTableRegistration[] {
      return onionSkin.customReferences;
    },

    loadTimelineState(state): void {
      if (state.scenes && state.scenes.length > 0) {
        scenes.length = 0;
        scenes.push(...state.scenes);
        for (const s of scenes) {
          if (!s.audioTracks) s.audioTracks = [];
        }
        activeSceneId = state.activeSceneId || scenes[0].id;
      }
      const scene = getActiveScene();
      if (!scene.audioTracks) scene.audioTracks = [];
      if (state.settings) {
        Object.assign(scene.settings, state.settings);
      }
      if (state.tracks) {
        scene.tracks.length = 0;
        scene.tracks.push(...state.tracks);
        for (const tr of scene.tracks) {
          syncTrackFlatExposures(tr);
        }
      }
      if (state.bones) {
        scene.bones.length = 0;
        scene.bones.push(...state.bones);
      }
      if (state.boneKeyframes) {
        scene.boneKeyframes.clear();
        for (const [f, kf] of state.boneKeyframes) {
          scene.boneKeyframes.set(f, kf);
        }
      }
      if (state.onionSkin) {
        Object.assign(onionSkin, state.onionSkin);
      }
      notify();
    },

    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };

  syncTracksWithLayers();
  return manager;
}
