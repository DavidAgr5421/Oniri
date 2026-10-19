import type { LayerManager, LayerNode } from '../brush/layers';
import type {
  AnimationTrack,
  OnionSkinCelInfo,
  OnionSkinSettings,
  TimelineSettings,
} from './timelineModel';

export interface TimelineManager {
  readonly settings: TimelineSettings;
  readonly onionSkin: OnionSkinSettings;
  readonly tracks: AnimationTrack[];
  
  // Playback
  play(): void;
  pause(): void;
  togglePlay(): void;
  setFps(fps: number): void;
  setTotalFrames(total: number): void;
  setRange(start: number, end: number): void;
  setLoop(loop: boolean): void;
  
  // Frame Navigation
  goToFrame(frame: number): void;
  nextFrame(): void;
  prevFrame(): void;
  firstFrame(): void;
  lastFrame(): void;
  nextCel(trackId?: string): void;
  prevCel(trackId?: string): void;
  
  // Tracks and Cels
  createTrack(name?: string): AnimationTrack;
  deleteTrack(trackId: string): void;
  createCel(trackId?: string, frame?: number): LayerNode | null;
  specifyCel(trackId: string, frame: number, celId: string): void;
  moveExposure(trackId: string, fromFrame: number, toFrame: number): boolean;
  removeExposure(trackId: string, frame: number): void;
  deleteCelLayer(trackId: string, celId: string): boolean;
  getCelsInTrack(trackId: string): LayerNode[];
  batchSpecifyCels(trackId: string, step: number): void;
  
  // Onion skin settings
  setOnionSkin(patch: Partial<OnionSkinSettings>): void;
  toggleOnionSkin(force?: boolean): void;

  // Query state for rendering
  getActiveCelForFrame(trackId: string, frame: number): LayerNode | undefined;
  getOnionSkinCels(trackId: string, currentFrame: number): OnionSkinCelInfo[];
  isLayerVisibleAtFrame(layer: LayerNode, frame: number): boolean;

  // Subscriptions
  subscribe(listener: () => void): () => void;
}

export function createTimelineManager(layerManager: LayerManager): TimelineManager {
  const settings: TimelineSettings = {
    fps: 12,
    totalFrames: 24,
    startFrame: 1,
    endFrame: 24,
    currentFrame: 1,
    loop: true,
    isPlaying: false,
  };

  const onionSkin: OnionSkinSettings = {
    enabled: false,
    prevFrames: 2,
    nextFrames: 2,
    prevColor: '#ff3b30', // Red for past
    nextColor: '#34c759', // Green for future
    startOpacity: 0.45,
    stepOpacity: 0.15,
    mode: 'tint',
  };

  const tracks: AnimationTrack[] = [];
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
          const span = settings.endFrame - settings.startFrame + 1;
          next = settings.startFrame + ((next - settings.startFrame) % span);
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
    if (tracks.length === 0) return;
    const activeLayer = layerManager.getActiveLayer();
    // Check if current active layer belongs to an animation track
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

  // Sync existing animation folders in layerManager
  function syncTracksWithLayers(): void {
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
      if (!track) {
        track = {
          id: folder.id,
          folderId: folder.id,
          name: folder.name,
          visible: folder.visible,
          exposures: new Map<number, string>(),
        };
        tracks.push(track);
      } else {
        track.name = folder.name;
        track.visible = folder.visible;
      }

      // Auto-assign any child layers found in folder
      const childLayers = layerManager.layers.filter((l) => l.parentId === folder.id);
      if (childLayers.length > 0 && track.exposures.size === 0) {
        track.exposures.set(1, childLayers[0].id);
      }
    }

    // Ensure tracks array order matches visual layer order (topmost layer = topmost track)
    const folderOrderMap = new Map(existingFolders.map((f, i) => [f.id, i]));
    tracks.sort((a, b) => (folderOrderMap.get(b.folderId) ?? 0) - (folderOrderMap.get(a.folderId) ?? 0));
  }

  layerManager.subscribe(() => {
    syncTracksWithLayers();
    notify();
  });

  const manager: TimelineManager = {
    get settings() {
      return settings;
    },
    get onionSkin() {
      return onionSkin;
    },
    get tracks() {
      return tracks;
    },

    play() {
      if (settings.isPlaying) return;
      settings.isPlaying = true;
      lastTime = 0;
      accumulatedTime = 0;
      animFrameId = requestAnimationFrame(playbackLoop);
      notify();
    },

    pause() {
      if (!settings.isPlaying) return;
      settings.isPlaying = false;
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      notify();
    },

    togglePlay() {
      if (settings.isPlaying) {
        manager.pause();
      } else {
        manager.play();
      }
    },

    setFps(fps: number) {
      settings.fps = Math.max(1, Math.min(60, Math.round(fps)));
      notify();
    },

    setTotalFrames(total: number) {
      settings.totalFrames = Math.max(1, Math.min(240, Math.round(total)));
      if (settings.endFrame > settings.totalFrames) {
        settings.endFrame = settings.totalFrames;
      }
      if (settings.currentFrame > settings.totalFrames) {
        settings.currentFrame = settings.totalFrames;
      }
      notify();
    },

    setRange(start: number, end: number) {
      const s = Math.max(1, Math.min(settings.totalFrames, start));
      const e = Math.max(s, Math.min(settings.totalFrames, end));
      settings.startFrame = s;
      settings.endFrame = e;
      if (settings.currentFrame < s) settings.currentFrame = s;
      if (settings.currentFrame > e) settings.currentFrame = e;
      notify();
    },

    setLoop(loop: boolean) {
      settings.loop = loop;
      notify();
    },

    goToFrame(frame: number) {
      const clamped = Math.max(1, Math.min(settings.totalFrames, Math.round(frame)));
      if (settings.currentFrame === clamped) return;
      settings.currentFrame = clamped;
      syncActiveCelWithFrame();
      notify();
    },

    nextFrame() {
      let next = settings.currentFrame + 1;
      if (next > settings.endFrame) {
        next = settings.loop ? settings.startFrame : settings.endFrame;
      }
      manager.goToFrame(next);
    },

    prevFrame() {
      let prev = settings.currentFrame - 1;
      if (prev < settings.startFrame) {
        prev = settings.loop ? settings.endFrame : settings.startFrame;
      }
      manager.goToFrame(prev);
    },

    firstFrame() {
      manager.goToFrame(settings.startFrame);
    },

    lastFrame() {
      manager.goToFrame(settings.endFrame);
    },

    nextCel(trackId?: string) {
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

    createTrack(name?: string): AnimationTrack {
      const folder = layerManager.createAnimationFolder(name || `Animation ${tracks.length + 1}`);
      let track = tracks.find((t) => t.folderId === folder.id);
      if (!track) {
        track = {
          id: folder.id,
          folderId: folder.id,
          name: folder.name,
          visible: true,
          exposures: new Map(),
        };
        tracks.push(track);
      }

      // Check if this folder already has any child layers
      const childLayers = layerManager.layers.filter((l) => l.parentId === folder.id);
      if (childLayers.length === 0) {
        const firstCel = layerManager.createLayer('1', folder.id);
        track.exposures.set(1, firstCel.id);
        layerManager.setActiveLayer(firstCel.id);
      } else if (track.exposures.size === 0) {
        track.exposures.set(1, childLayers[0].id);
        layerManager.setActiveLayer(childLayers[0].id);
      }

      notify();
      return track;
    },

    deleteTrack(trackId: string) {
      const idx = tracks.findIndex((t) => t.id === trackId);
      if (idx !== -1) {
        const track = tracks[idx];
        tracks.splice(idx, 1);
        layerManager.deleteLayer(track.folderId);
        notify();
      }
    },

    createCel(trackId?: string, frame?: number): LayerNode | null {
      let track = trackId ? tracks.find((t) => t.id === trackId) : tracks[0];
      if (!track) {
        track = manager.createTrack();
      }

      const targetFrame = frame !== undefined ? frame : settings.currentFrame;

      // Find all existing child layers in the folder to determine next cel number
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
      track.exposures.set(targetFrame, newCel.id);
      layerManager.setActiveLayer(newCel.id);
      notify();
      return newCel;
    },

    specifyCel(trackId: string, frame: number, celId: string) {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      track.exposures.set(frame, celId);
      syncActiveCelWithFrame();
      notify();
    },

    moveExposure(trackId: string, fromFrame: number, toFrame: number): boolean {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;
      const celId = track.exposures.get(fromFrame);
      if (!celId) return false;
      const targetClamped = Math.max(1, Math.min(settings.totalFrames, Math.round(toFrame)));
      if (targetClamped === fromFrame) return false;

      // Move keyframe assignment to target frame
      track.exposures.delete(fromFrame);
      track.exposures.set(targetClamped, celId);
      settings.currentFrame = targetClamped;
      syncActiveCelWithFrame();
      notify();
      return true;
    },

    removeExposure(trackId: string, frame: number) {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      track.exposures.delete(frame);
      syncActiveCelWithFrame();
      notify();
    },

    getCelsInTrack(trackId: string): LayerNode[] {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return [];
      return layerManager.layers.filter((l) => l.parentId === track.folderId);
    },

    deleteCelLayer(trackId: string, celId: string): boolean {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return false;

      // Remove all exposures that reference this cel
      for (const [f, id] of Array.from(track.exposures.entries())) {
        if (id === celId) {
          track.exposures.delete(f);
        }
      }

      const res = layerManager.deleteLayer(celId);
      syncActiveCelWithFrame();
      notify();
      return res;
    },

    batchSpecifyCels(trackId: string, step: number = 2) {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      const cels = layerManager.layers.filter((l) => l.parentId === track.folderId);
      if (cels.length === 0) return;

      track.exposures.clear();
      let f = 1;
      for (const cel of cels) {
        if (f > settings.totalFrames) break;
        track.exposures.set(f, cel.id);
        f += Math.max(1, step);
      }
      syncActiveCelWithFrame();
      notify();
    },

    setOnionSkin(patch: Partial<OnionSkinSettings>) {
      Object.assign(onionSkin, patch);
      notify();
    },

    toggleOnionSkin(force?: boolean) {
      onionSkin.enabled = force !== undefined ? force : !onionSkin.enabled;
      notify();
    },

    getActiveCelForFrame(trackId: string, frame: number): LayerNode | undefined {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return undefined;

      // Find the exposure with the highest frame <= requested frame (Hold duration)
      let activeCelId: string | undefined;
      let maxFrame = -1;

      for (const [expFrame, celId] of track.exposures.entries()) {
        if (expFrame <= frame && expFrame > maxFrame) {
          maxFrame = expFrame;
          activeCelId = celId;
        }
      }

      if (!activeCelId) return undefined;
      return layerManager.layers.find((l) => l.id === activeCelId);
    },

    getOnionSkinCels(trackId: string, currentFrame: number): OnionSkinCelInfo[] {
      if (!onionSkin.enabled) return [];
      const track = tracks.find((t) => t.id === trackId);
      if (!track || !track.visible) return [];

      const currentCel = manager.getActiveCelForFrame(trackId, currentFrame);
      const currentCelId = currentCel ? currentCel.id : null;

      const results: OnionSkinCelInfo[] = [];

      // Look back for preceding cels
      let foundPrev = 0;
      const seenPrevIds = new Set<string>();
      if (currentCelId) seenPrevIds.add(currentCelId);

      for (let f = currentFrame - 1; f >= 1; f--) {
        if (foundPrev >= onionSkin.prevFrames) break;
        const cel = manager.getActiveCelForFrame(trackId, f);
        if (cel && !seenPrevIds.has(cel.id)) {
          seenPrevIds.add(cel.id);
          foundPrev++;
          const opacity = Math.max(0.05, onionSkin.startOpacity - (foundPrev - 1) * onionSkin.stepOpacity);
          results.push({
            layer: cel,
            isPrev: true,
            distance: foundPrev,
            opacity,
            tintColor: onionSkin.prevColor,
          });
        }
      }

      // Look ahead for succeeding cels
      let foundNext = 0;
      const seenNextIds = new Set<string>();
      if (currentCelId) seenNextIds.add(currentCelId);

      for (let f = currentFrame + 1; f <= settings.totalFrames; f++) {
        if (foundNext >= onionSkin.nextFrames) break;
        const cel = manager.getActiveCelForFrame(trackId, f);
        if (cel && !seenNextIds.has(cel.id)) {
          seenNextIds.add(cel.id);
          foundNext++;
          const opacity = Math.max(0.05, onionSkin.startOpacity - (foundNext - 1) * onionSkin.stepOpacity);
          results.push({
            layer: cel,
            isPrev: false,
            distance: foundNext,
            opacity,
            tintColor: onionSkin.nextColor,
          });
        }
      }

      return results;
    },

    isLayerVisibleAtFrame(layer: LayerNode, frame: number): boolean {
      if (!layer.visible) return false;

      // Check if layer belongs to an animation folder
      let parentFolder: LayerNode | undefined;
      if (layer.parentId) {
        parentFolder = layerManager.layers.find((l) => l.id === layer.parentId);
      }

      if (parentFolder && parentFolder.isAnimationFolder) {
        const activeCel = manager.getActiveCelForFrame(parentFolder.id, frame);
        // Only visible if it is the active cel or a child of the active cel
        if (!activeCel) return false;
        if (layer.id === activeCel.id) return true;
        // If the active cel is a folder, check if this layer is inside it
        return layer.parentId === activeCel.id;
      }

      return true;
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
