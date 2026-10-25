export interface AudioClip {
  id: string;
  name: string;
  startFrame: number; // Starting frame in timeline (supports negative frames e.g. -12, 0, 1)
  durationFrames: number; // Total length in frames based on current fps
  offsetSeconds: number; // In-point offset inside original audio file (seconds)
  volume: number; // Clip volume 0.0 - 2.0 (default 1.0)
  audioBuffer: AudioBuffer | null; // Decoded PCM audio data
  peaks: Float32Array; // Precalculated normalized amplitude peaks for instant waveform rendering
  audioBlob?: Blob; // Original audio file for project persistence
}

export interface AudioTrack {
  id: string;
  name: string;
  volume: number; // Track master volume 0.0 - 1.0 (default 1.0)
  muted: boolean;
  solo: boolean;
  clips: AudioClip[];
}
