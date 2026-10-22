import { zipSync } from 'fflate';
import type { BrushEngine } from '../brush/brushEngine';
import type { TimelineManager } from './timelineManager';
import { encodeGif, type GifFrameInput } from './gifEncoder';
import { DOC_H, DOC_W } from '../brush/docConstants';
import { cameraFrameManager } from '../canvas/cameraFrameManager';

export type ExportAnimationFormat = 'gif' | 'video' | 'png_sequence';

export interface ExportAnimationConfig {
  format: ExportAnimationFormat;
  startFrame: number;
  endFrame: number;
  fps: number;
  width: number;
  height: number;
  loopCount: number; // 0 = infinite loop
  filename?: string;
  onProgress?: (current: number, total: number, message: string) => void;
}

/**
 * Renders all animation frames in the range to an array of canvas elements.
 */
async function renderFramesToCanvases(
  engine: BrushEngine,
  timeline: TimelineManager,
  config: ExportAnimationConfig
): Promise<HTMLCanvasElement[]> {
  const { startFrame, endFrame, width, height, onProgress } = config;
  const originalFrame = timeline.settings.currentFrame;
  const totalFrames = endFrame - startFrame + 1;
  const frames: HTMLCanvasElement[] = [];

  try {
    for (let f = startFrame; f <= endFrame; f++) {
      const idx = f - startFrame + 1;
      onProgress?.(idx, totalFrames, `Renderizando fotograma ${idx} de ${totalFrames}...`);

      timeline.goToFrame(f);
      engine.updateComposite();

      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = width;
      frameCanvas.height = height;
      const fctx = frameCanvas.getContext('2d')!;
      fctx.imageSmoothingEnabled = true;
      fctx.imageSmoothingQuality = 'high';

      const cfState = cameraFrameManager.getState();
      if (cfState.enabled) {
        const crop = cameraFrameManager.getEffectiveCropRect(engine.docW, engine.docH);
        fctx.drawImage(engine.compositeCanvas, crop.x, crop.y, crop.w, crop.h, 0, 0, width, height);
      } else {
        fctx.drawImage(engine.compositeCanvas, 0, 0, width, height);
      }

      frames.push(frameCanvas);
      // Brief yield so the UI progress bar can update
      await new Promise((r) => setTimeout(r, 4));
    }
  } finally {
    timeline.goToFrame(originalFrame);
    engine.updateComposite();
  }

  return frames;
}

/**
 * Exports animation as an animated GIF.
 */
export async function exportAnimationAsGif(
  engine: BrushEngine,
  timeline: TimelineManager,
  config: ExportAnimationConfig
): Promise<Uint8Array> {
  const frames = await renderFramesToCanvases(engine, timeline, config);
  const delayMs = Math.round(1000 / Math.max(1, config.fps));

  const gifInputs: GifFrameInput[] = frames.map((c) => ({
    canvas: c,
    delayMs,
  }));

  config.onProgress?.(0, frames.length, 'Comprimiendo GIF animado (LZW & Paleta)...');

  const gifBytes = encodeGif(gifInputs, {
    width: config.width,
    height: config.height,
    loopCount: config.loopCount,
    onProgress: (cur, tot) => {
      config.onProgress?.(cur, tot, `Codificando cuadro GIF ${cur} de ${tot}...`);
    },
  });

  return gifBytes;
}

/**
 * Exports animation as a sequence of PNG images in a ZIP archive.
 */
export async function exportAnimationAsPngSequence(
  engine: BrushEngine,
  timeline: TimelineManager,
  config: ExportAnimationConfig
): Promise<Uint8Array> {
  const frames = await renderFramesToCanvases(engine, timeline, config);
  const zipFiles: Record<string, Uint8Array> = {};

  const total = frames.length;
  for (let i = 0; i < total; i++) {
    const frameNum = config.startFrame + i;
    config.onProgress?.(i + 1, total, `Codificando PNG fotograma ${i + 1} de ${total}...`);

    const canvas = frames[i];
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (blob) {
      const buf = await blob.arrayBuffer();
      const filename = `frame_${String(frameNum).padStart(4, '0')}.png`;
      zipFiles[filename] = new Uint8Array(buf);
    }
  }

  config.onProgress?.(total, total, 'Empaquetando archivo ZIP de secuencia...');
  return zipSync(zipFiles, { level: 4 });
}

/**
 * Exports animation as a video file (MP4 / WebM) via MediaRecorder.
 */
export async function exportAnimationAsVideo(
  engine: BrushEngine,
  timeline: TimelineManager,
  config: ExportAnimationConfig
): Promise<Blob> {
  const frames = await renderFramesToCanvases(engine, timeline, config);
  const total = frames.length;

  const playCanvas = document.createElement('canvas');
  playCanvas.width = config.width;
  playCanvas.height = config.height;
  const playCtx = playCanvas.getContext('2d')!;

  const mimeType = MediaRecorder.isTypeSupported('video/mp4')
    ? 'video/mp4'
    : MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';

  const stream = playCanvas.captureStream(config.fps);
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 6_000_000, // 6 Mbps for crisp animation
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const recordingPromise = new Promise<Blob>((resolve) => {
    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: mimeType }));
    };
  });

  recorder.start();

  const frameDurationMs = 1000 / Math.max(1, config.fps);

  // Play through frames onto the stream canvas
  for (let i = 0; i < total; i++) {
    config.onProgress?.(i + 1, total, `Grabando video cuadro ${i + 1} de ${total}...`);
    playCtx.clearRect(0, 0, config.width, config.height);
    playCtx.drawImage(frames[i], 0, 0);
    await new Promise((r) => setTimeout(r, frameDurationMs));
  }

  // Hold last frame for 2 frames
  await new Promise((r) => setTimeout(r, frameDurationMs * 2));
  recorder.stop();

  return recordingPromise;
}

/**
 * Downloads a binary blob to the user's filesystem.
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Opens the interactive Clip Studio Paint-style Animation Export Modal.
 */
export function openExportAnimationModal(engine: BrushEngine, timeline: TimelineManager): void {
  const existing = document.querySelector('.csp-export-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'csp-modal-backdrop csp-export-modal';

  const tlSettings = timeline.settings;
  const defaultStart = tlSettings.startFrame;
  const defaultEnd = tlSettings.endFrame;
  const defaultFps = tlSettings.fps;

  const cfState = cameraFrameManager.getState();
  const baseW = cfState.enabled ? cfState.outputWidth : engine.docW;
  const baseH = cfState.enabled ? cfState.outputHeight : engine.docH;

  modal.innerHTML = `
    <div class="csp-detail-window" style="width: 520px; max-width: 92vw;">
      <div class="csp-detail-header">
        <span class="detail-title">Exportar Animación (Clip Studio Paint Style)</span>
        <button class="csp-detail-close-btn" id="export-close-btn">✕</button>
      </div>

      <div style="padding: 16px 20px; font-size: 13px; color: #d0d0d0; display: flex; flex-direction: column; gap: 14px;">
        
        <!-- Format Selector -->
        <div>
          <label style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 6px;">
            Formato de Exportación
          </label>
          <div class="csp-seg-group" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
            <button class="csp-seg-btn active" data-format="gif">🎞️ GIF Animado</button>
            <button class="csp-seg-btn" data-format="video">🎬 Película (Video)</button>
            <button class="csp-seg-btn" data-format="png_sequence">📁 Secuencia PNG</button>
          </div>
        </div>

        <!-- Frame Range -->
        <div style="background: #1e2229; border: 1px solid #323844; border-radius: 6px; padding: 12px;">
          <label style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 8px;">
            Rango de Fotogramas
          </label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="flex: 1;">
              <span style="font-size: 11px; color: #94a3b8;">Desde fotograma:</span>
              <input type="number" id="exp-start" class="csp-num-input" style="width: 100%; margin-top: 4px;" value="${defaultStart}" min="1" max="${tlSettings.totalFrames}" />
            </div>
            <div style="flex: 1;">
              <span style="font-size: 11px; color: #94a3b8;">Hasta fotograma:</span>
              <input type="number" id="exp-end" class="csp-num-input" style="width: 100%; margin-top: 4px;" value="${defaultEnd}" min="1" max="${tlSettings.totalFrames}" />
            </div>
            <div style="flex: 1;">
              <span style="font-size: 11px; color: #94a3b8;">Velocidad (FPS):</span>
              <input type="number" id="exp-fps" class="csp-num-input" style="width: 100%; margin-top: 4px;" value="${defaultFps}" min="1" max="60" />
            </div>
          </div>
        </div>

        <!-- Resolution & Scale Presets -->
        <div style="background: #1e2229; border: 1px solid #323844; border-radius: 6px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700;">
              Resolución y Escala de Salida ${cfState.enabled ? '(Cuadro de cámara)' : ''}
            </label>
            <span id="exp-res-indicator" style="font-size: 11px; color: #38bdf8; font-weight: 600;">${baseW} × ${baseH} px</span>
          </div>

          <div class="csp-seg-group" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; margin-bottom: 10px;">
            <button class="csp-seg-btn active" data-scale="1.0">100%</button>
            <button class="csp-seg-btn" data-scale="0.75">75%</button>
            <button class="csp-seg-btn" data-scale="0.50">50%</button>
            <button class="csp-seg-btn" data-scale="0.25">25%</button>
          </div>

          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex: 1;">
              <span style="font-size: 11px; color: #94a3b8;">Ancho (px):</span>
              <input type="number" id="exp-w" class="csp-num-input" style="width: 100%; margin-top: 4px;" value="${baseW}" />
            </div>
            <span style="margin-top: 18px; color: #64748b;">×</span>
            <div style="flex: 1;">
              <span style="font-size: 11px; color: #94a3b8;">Alto (px):</span>
              <input type="number" id="exp-h" class="csp-num-input" style="width: 100%; margin-top: 4px;" value="${baseH}" />
            </div>
          </div>
        </div>

        <!-- GIF Loop Options (visible only for GIF) -->
        <div id="exp-gif-opts" style="display: flex; justify-content: space-between; align-items: center; background: #1e2229; border: 1px solid #323844; border-radius: 6px; padding: 10px 14px;">
          <span style="font-size: 12px; color: #cbd5e1;">Repetición en Bucle (Loop):</span>
          <select id="exp-loop" class="timeline-select" style="width: 140px;">
            <option value="0">Infinito (Siempre)</option>
            <option value="1">1 vez (Sin bucle)</option>
            <option value="3">3 repeticiones</option>
            <option value="5">5 repeticiones</option>
          </select>
        </div>

        <!-- Live Progress Section (hidden initially) -->
        <div id="exp-progress-box" style="display: none; background: #0f172a; border: 1px solid #0284c7; border-radius: 6px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
            <span id="exp-prog-msg" style="color: #38bdf8; font-weight: 600;">Preparando exportación...</span>
            <span id="exp-prog-pct" style="color: #e2e8f0;">0%</span>
          </div>
          <div style="width: 100%; height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden;">
            <div id="exp-prog-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); transition: width 0.15s ease;"></div>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px;">
          <button class="csp-btn-secondary" id="exp-cancel-btn">Cancelar</button>
          <button class="csp-btn-primary" id="exp-start-btn" style="min-width: 130px; background: #0284c7;">
            Exportar Archivo
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Modal logic
  let selectedFormat: ExportAnimationFormat = 'gif';
  let activeScale = 1.0;

  const close = () => modal.remove();
  modal.querySelector('#export-close-btn')?.addEventListener('click', close);
  modal.querySelector('#exp-cancel-btn')?.addEventListener('click', close);

  // Format selection
  const formatBtns = modal.querySelectorAll<HTMLButtonElement>('[data-format]');
  const gifOptsBox = modal.querySelector<HTMLElement>('#exp-gif-opts')!;
  formatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      formatBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFormat = btn.dataset.format as ExportAnimationFormat;
      gifOptsBox.style.display = selectedFormat === 'gif' ? 'flex' : 'none';
    });
  });

  // Scale presets
  const scaleBtns = modal.querySelectorAll<HTMLButtonElement>('[data-scale]');
  const wInput = modal.querySelector<HTMLInputElement>('#exp-w')!;
  const hInput = modal.querySelector<HTMLInputElement>('#exp-h')!;
  const resIndicator = modal.querySelector<HTMLElement>('#exp-res-indicator')!;

  scaleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scaleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeScale = Number(btn.dataset.scale);
      const nw = Math.round(baseW * activeScale);
      const nh = Math.round(baseH * activeScale);
      wInput.value = String(nw);
      hInput.value = String(nh);
      resIndicator.textContent = `${nw} × ${nh} px`;
    });
  });

  wInput.addEventListener('input', () => {
    scaleBtns.forEach((b) => b.classList.remove('active'));
    const w = Number(wInput.value) || DOC_W;
    const h = Math.round((w / DOC_W) * DOC_H);
    hInput.value = String(h);
    resIndicator.textContent = `${w} × ${h} px`;
  });

  // Export start
  const startBtn = modal.querySelector<HTMLButtonElement>('#exp-start-btn')!;
  const progressBox = modal.querySelector<HTMLElement>('#exp-progress-box')!;
  const progMsg = modal.querySelector<HTMLElement>('#exp-prog-msg')!;
  const progPct = modal.querySelector<HTMLElement>('#exp-prog-pct')!;
  const progBar = modal.querySelector<HTMLElement>('#exp-prog-bar')!;

  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    progressBox.style.display = 'block';

    const startF = Math.max(1, Number((modal.querySelector('#exp-start') as HTMLInputElement).value) || 1);
    const endF = Math.max(startF, Number((modal.querySelector('#exp-end') as HTMLInputElement).value) || tlSettings.totalFrames);
    const fps = Math.max(1, Number((modal.querySelector('#exp-fps') as HTMLInputElement).value) || 24);
    const width = Number(wInput.value) || DOC_W;
    const height = Number(hInput.value) || DOC_H;
    const loop = Number((modal.querySelector('#exp-loop') as HTMLSelectElement)?.value ?? 0);

    const config: ExportAnimationConfig = {
      format: selectedFormat,
      startFrame: startF,
      endFrame: endF,
      fps,
      width,
      height,
      loopCount: loop,
      onProgress: (cur, tot, msg) => {
        const pct = Math.round((cur / Math.max(1, tot)) * 100);
        progMsg.textContent = msg;
        progPct.textContent = `${pct}%`;
        progBar.style.width = `${pct}%`;
      },
    };

    try {
      if (selectedFormat === 'gif') {
        const gifBytes = await exportAnimationAsGif(engine, timeline, config);
        const blob = new Blob([gifBytes as any], { type: 'image/gif' });
        downloadBlob(blob, `animacion_${width}x${height}.gif`);
      } else if (selectedFormat === 'video') {
        const videoBlob = await exportAnimationAsVideo(engine, timeline, config);
        const isMp4 = videoBlob.type.includes('mp4');
        downloadBlob(videoBlob, `animacion_${width}x${height}.${isMp4 ? 'mp4' : 'webm'}`);
      } else if (selectedFormat === 'png_sequence') {
        const zipBytes = await exportAnimationAsPngSequence(engine, timeline, config);
        const blob = new Blob([zipBytes as any], { type: 'application/zip' });
        downloadBlob(blob, `secuencia_png_${width}x${height}.zip`);
      }

      progMsg.textContent = '¡Exportación completada exitosamente!';
      progPct.textContent = '100%';
      progBar.style.width = '100%';
      setTimeout(() => close(), 1200);
    } catch (err: any) {
      console.error('Error during animation export:', err);
      alert(`Error durante la exportación: ${err?.message || err}`);
      startBtn.disabled = false;
      progressBox.style.display = 'none';
    }
  });
}
