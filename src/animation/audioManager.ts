import type { AudioClip, AudioTrack } from './audioModel';

/**
 * High-performance audio engine for Oniri Animation Timeline.
 * Handles decoding, waveform caching, frame-accurate synchronized playback,
 * and click-free audio scrubbing for phoneme/lip-sync analysis.
 */
class TimelineAudioManager {
  private ctx: AudioContext | null = null;
  private activeSources: AudioBufferSourceNode[] = [];
  private activeGainNodes: GainNode[] = [];
  private scrubSource: AudioBufferSourceNode | null = null;
  private scrubGain: GainNode | null = null;

  /**
   * Initializes or resumes the AudioContext after user gesture.
   */
  public getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Decodes an audio file or blob into an AudioBuffer and generates waveform peak cache.
   */
  public async decodeAudio(
    fileOrBlob: Blob | File,
    fps: number
  ): Promise<{ audioBuffer: AudioBuffer; peaks: Float32Array; durationFrames: number }> {
    const ctx = this.getContext();
    const arrayBuffer = await fileOrBlob.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    const peaks = this.extractPeaks(audioBuffer, 120); // 120 peak samples per second for high-res visual fidelity
    const durationFrames = Math.max(1, Math.round(audioBuffer.duration * fps));

    return { audioBuffer, peaks, durationFrames };
  }

  /**
   * Downsamples PCM channels into normalized min/max amplitude peaks (0..1) for instantaneous waveform drawing.
   */
  public extractPeaks(buffer: AudioBuffer, pointsPerSec = 120): Float32Array {
    const totalPoints = Math.max(16, Math.floor(buffer.duration * pointsPerSec));
    const peaks = new Float32Array(totalPoints);
    const numChannels = buffer.numberOfChannels;
    const length = buffer.length;
    const blockSize = Math.floor(length / totalPoints);

    if (blockSize <= 0) return peaks;

    // Fast-path downsampling using first channel or mixed channels
    const ch0 = buffer.getChannelData(0);
    const ch1 = numChannels > 1 ? buffer.getChannelData(1) : null;

    for (let i = 0; i < totalPoints; i++) {
      const start = i * blockSize;
      const end = Math.min(start + blockSize, length);
      let maxVal = 0;

      for (let j = start; j < end; j += 4) { // stride 4 for cache & speed
        const val0 = Math.abs(ch0[j]);
        if (val0 > maxVal) maxVal = val0;
        if (ch1) {
          const val1 = Math.abs(ch1[j]);
          if (val1 > maxVal) maxVal = val1;
        }
      }
      peaks[i] = Math.min(1.0, maxVal);
    }

    return peaks;
  }

  /**
   * Begins frame-accurate synchronized audio playback for all unmuted audio tracks.
   */
  public startPlayback(
    tracks: AudioTrack[],
    currentFrame: number,
    fps: number
  ): void {
    this.stopPlayback();
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const anySolo = tracks.some((t) => t.solo);

    for (const track of tracks) {
      if (track.muted) continue;
      if (anySolo && !track.solo) continue;

      for (const clip of track.clips) {
        if (!clip.audioBuffer) continue;

        const clipStartFrame = clip.startFrame;
        const clipEndFrame = clip.startFrame + clip.durationFrames - 1;

        // Check if clip is active at current frame or will play ahead
        if (currentFrame > clipEndFrame) continue;

        const trackGain = ctx.createGain();
        trackGain.gain.value = Math.max(0, Math.min(2, track.volume * clip.volume));
        trackGain.connect(ctx.destination);
        this.activeGainNodes.push(trackGain);

        const source = ctx.createBufferSource();
        source.buffer = clip.audioBuffer;
        source.connect(trackGain);

        if (currentFrame >= clipStartFrame) {
          // Playback starts mid-clip
          const frameOffset = currentFrame - clipStartFrame;
          const timeOffset = frameOffset / fps + clip.offsetSeconds;
          const remainingDuration = Math.max(0, clip.audioBuffer.duration - timeOffset);
          if (remainingDuration > 0.005) {
            source.start(ctx.currentTime, timeOffset, remainingDuration);
            this.activeSources.push(source);
          }
        } else {
          // Clip starts at a future frame during playback
          const framesUntilStart = clipStartFrame - currentFrame;
          const delaySec = framesUntilStart / fps;
          source.start(ctx.currentTime + delaySec, clip.offsetSeconds, clip.audioBuffer.duration - clip.offsetSeconds);
          this.activeSources.push(source);
        }
      }
    }
  }

  /**
   * Stops all running audio playback sources immediately.
   */
  public stopPlayback(): void {
    for (const src of this.activeSources) {
      try {
        src.stop();
        src.disconnect();
      } catch (_) {}
    }
    for (const gain of this.activeGainNodes) {
      try {
        gain.disconnect();
      } catch (_) {}
    }
    this.activeSources = [];
    this.activeGainNodes = [];
  }

  /**
   * Plays a momentary click-free audio snippet at the scrubbed frame (indispensable for lip-sync).
   */
  public scrubFrame(tracks: AudioTrack[], frame: number, fps: number): void {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // Terminate previous scrub burst cleanly
    if (this.scrubSource) {
      try {
        this.scrubSource.stop();
        this.scrubSource.disconnect();
      } catch (_) {}
      this.scrubSource = null;
    }
    if (this.scrubGain) {
      try {
        this.scrubGain.disconnect();
      } catch (_) {}
      this.scrubGain = null;
    }

    const anySolo = tracks.some((t) => t.solo);
    const scrubDuration = Math.max(0.04, Math.min(0.08, 1 / fps)); // 40ms to 80ms snippet

    for (const track of tracks) {
      if (track.muted) continue;
      if (anySolo && !track.solo) continue;

      for (const clip of track.clips) {
        if (!clip.audioBuffer) continue;

        const clipStart = clip.startFrame;
        const clipEnd = clip.startFrame + clip.durationFrames - 1;

        if (frame >= clipStart && frame <= clipEnd) {
          const frameOffset = frame - clipStart;
          const timeOffset = frameOffset / fps + clip.offsetSeconds;

          if (timeOffset >= 0 && timeOffset < clip.audioBuffer.duration) {
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            const masterVol = Math.max(0, Math.min(2, track.volume * clip.volume));

            // Envelope to avoid pop/clicks
            gain.gain.setValueAtTime(masterVol, now);
            gain.gain.linearRampToValueAtTime(0.001, now + scrubDuration);
            gain.connect(ctx.destination);

            const source = ctx.createBufferSource();
            source.buffer = clip.audioBuffer;
            source.connect(gain);
            source.start(now, timeOffset, scrubDuration);

            this.scrubSource = source;
            this.scrubGain = gain;
            return; // Scrub primary active clip
          }
        }
      }
    }
  }

  /**
   * Draws a crisp, high-contrast waveform directly on an HTML5 canvas.
   */
  public renderWaveform(
    canvas: HTMLCanvasElement,
    clip: AudioClip,
    widthPx: number,
    heightPx: number
  ): void {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(widthPx * dpr));
    canvas.height = Math.max(1, Math.round(heightPx * dpr));
    canvas.style.width = `${widthPx}px`;
    canvas.style.height = `${heightPx}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, widthPx, heightPx);

    const peaks = clip.peaks;
    if (!peaks || peaks.length === 0) {
      // Fallback line if no peaks
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, heightPx / 2);
      ctx.lineTo(widthPx, heightPx / 2);
      ctx.stroke();
      return;
    }

    const midY = heightPx / 2;
    const ampScale = (heightPx / 2) * 0.92;

    // Draw baseline
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(widthPx, midY);
    ctx.stroke();

    // Create stylish gradient for waveform
    const grad = ctx.createLinearGradient(0, 0, 0, heightPx);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.5, '#818cf8');
    grad.addColorStop(1, '#38bdf8');

    ctx.fillStyle = grad;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;

    // Draw mirrored vertical bars per pixel
    const totalPeaks = peaks.length;
    for (let x = 0; x < widthPx; x++) {
      const peakIdx = Math.floor((x / widthPx) * totalPeaks);
      const amp = peaks[Math.min(peakIdx, totalPeaks - 1)] * ampScale;
      const barH = Math.max(1.5, amp);

      ctx.fillRect(x, midY - barH, 1, barH * 2);
    }
  }
}

export const timelineAudioManager = new TimelineAudioManager();
