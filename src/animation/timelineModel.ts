import type { LayerNode } from '../brush/layers';

export interface CelExposure {
  frame: number; // 1-based index
  celId: string; // LayerNode id
}

export interface AnimationTrack {
  id: string; // Typically folderId
  folderId: string;
  name: string;
  visible: boolean;
  // Frame number (1..totalFrames) -> Cel Layer ID
  exposures: Map<number, string>;
}

export interface OnionSkinSettings {
  enabled: boolean;
  prevFrames: number; // How many preceding cels to show (e.g. 1, 2, 3)
  nextFrames: number; // How many succeeding cels to show (e.g. 1, 2, 3)
  prevColor: string;  // Tint for past frames (default red/orange #ff3b30 or blue #007acc)
  nextColor: string;  // Tint for future frames (default green #34c759)
  startOpacity: number; // Initial opacity for closest frame (e.g. 0.45)
  stepOpacity: number;  // Falloff / decay per frame distance (e.g. 0.15)
  mode: 'tint' | 'color'; // Tinted overlay vs natural colors
}

export interface TimelineSettings {
  fps: number; // Frames per second (e.g. 8, 12, 24, 30, 60)
  totalFrames: number; // Total length of timeline in frames (e.g. 24)
  startFrame: number;  // Playback start frame (usually 1)
  endFrame: number;    // Playback end frame (usually 24)
  currentFrame: number;// Currently viewed/edited frame (1..totalFrames)
  loop: boolean;       // Repeat playback continuously
  isPlaying: boolean;  // Active playback status
}

export interface OnionSkinCelInfo {
  layer: LayerNode;
  isPrev: boolean;
  distance: number;
  opacity: number;
  tintColor: string;
}
