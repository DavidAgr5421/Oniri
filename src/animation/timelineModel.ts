import type { LayerNode } from '../brush/layers';
import type { Bone2D, SkeletonKeyframe } from './boneModel';

export type InterpolationType = 'hold' | 'linear' | 'smooth';

export interface TransformKeyframe {
  frame: number; // 1-based frame index
  x: number; // Offset in pixels (default 0)
  y: number; // Offset in pixels (default 0)
  scaleX: number; // Scale factor (default 1)
  scaleY: number; // Scale factor (default 1)
  rotation: number; // Rotation in degrees (default 0)
  opacity: number; // Track keyframe opacity 0..1 (default 1)
  interpolation: InterpolationType;
}

export interface EvaluatedTransform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

export interface CelExposure {
  frame: number; // 1-based index
  celId: string; // LayerNode id
}

export interface AnimationClip {
  id: string;
  startFrame: number; // 1-based inclusive
  endFrame: number; // 1-based inclusive
  // Frame number (within [startFrame, endFrame]) -> Cel Layer ID
  exposures: Map<number, string>;
}

export interface AnimationTrack {
  id: string; // Typically folderId
  folderId: string;
  name: string;
  visible: boolean;
  // Clips along the track (CSP Clip & Cel architecture)
  clips: AnimationClip[];
  // Legacy / convenience flat exposure map (synced with clips)
  exposures: Map<number, string>;
  // Keyframe mode enabled on this track (CSP "Enable keyframes on this layer")
  keyframesEnabled: boolean;
  // Frame number -> TransformKeyframe
  keyframes: Map<number, TransformKeyframe>;
}

export interface AnimationScene {
  id: string;
  name: string;
  settings: TimelineSettings;
  tracks: AnimationTrack[];
  bones: Bone2D[];
  boneKeyframes: Map<number, SkeletonKeyframe>;
}

export interface OnionSkinTransform {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  flipX: boolean;
  flipY: boolean;
}

export interface OnionSkinCustomReference {
  id: string;
  celId: string;
  name: string;
  trackId?: string;
  trackName?: string;
  frame?: number;
  opacity?: number;
  tintColor?: string;
  colorMode?: 'monochrome' | 'color';
  visible: boolean;
  transform: OnionSkinTransform;
}

export interface OnionSkinSettings {
  enabled: boolean;
  prevFrames: number; // How many preceding cels to show (e.g. 1, 2, 3)
  nextFrames: number; // How many succeeding cels to show (e.g. 1, 2, 3)
  prevColor: string;  // Tint for past frames (default blue #38bdf8 or red #ff3b30)
  nextColor: string;  // Tint for future frames (default green #34c759)
  startOpacity: number; // Initial opacity for closest frame (e.g. 0.45)
  stepOpacity: number;  // Falloff / decay per frame distance (e.g. 0.15)
  mode: 'tint' | 'color'; // Tinted overlay vs natural colors
  activeReferenceCelId?: string | null;
  transforms: Map<string, OnionSkinTransform>;
  customReferences: OnionSkinCustomReference[];
}

export type TimeDisplayFormat = 'frames' | 'sec_frames' | 'timecode';

export interface TimelineSettings {
  fps: number; // Frames per second (e.g. 8, 12, 24, 30, 60)
  totalFrames: number; // Total length of timeline in frames (e.g. 24)
  startFrame: number;  // Playback start frame (e.g. 1 or 0 or -12)
  endFrame: number;    // Playback end frame (e.g. 24)
  currentFrame: number;// Currently viewed/edited frame
  minFrame?: number;   // Lowest display frame (CSP support for frame 0 and negative frames, e.g. -12, 0)
  loop: boolean;       // Repeat playback continuously
  isPlaying: boolean;  // Active playback status
  division?: number;   // Ruler major division (e.g. 4, 5, 6, 8, 12)
  timeFormat?: TimeDisplayFormat;
}

export interface OnionSkinCelInfo {
  layer: LayerNode;
  isPrev: boolean;
  distance: number;
  opacity: number;
  tintColor: string;
  transform?: EvaluatedTransform;
  onionTransform?: OnionSkinTransform;
}

export type LightTableTransform = OnionSkinTransform;
export type LightTableRegistration = OnionSkinCustomReference;
export interface LightTableSettings {
  enabled: boolean;
  activeRegistrationId: string | null;
  registrations: any[];
}
