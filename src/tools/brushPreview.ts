import { brushDiameterAt, brushStampAlpha } from '../brush/brushEngine';
import { samplePaperGrain } from '../brush/brushTextureAssets';
import { getStampTexture } from '../brush/stampTexture';
import type { PreviewBgMode } from './toolState';
import { getToolState, hexToRgb, setPreviewBgMode } from './toolState';

export const PREVIEW_W = 210;
export const PREVIEW_H = 62;

export interface BrushPreviewComponent {
  element: HTMLDivElement;
  update: () => void;
  drawNow: () => void;
}

export function createBrushPreview(): BrushPreviewComponent {
  const previewDpr = Math.min(2, window.devicePixelRatio || 1);

  const previewBox = document.createElement('div');
  previewBox.className = 'prop-row-box ink-only';
  previewBox.style.display = 'none';

  const previewWrap = document.createElement('div');
  previewWrap.className = 'csp-preview-wrap';

  const previewCanvas = document.createElement('canvas');
  previewCanvas.className = 'csp-preview-canvas bg-paper';
  previewCanvas.width = Math.round(PREVIEW_W * previewDpr);
  previewCanvas.height = Math.round(PREVIEW_H * previewDpr);
  previewCanvas.title = 'Visión del pincel (Trazo dinámico con respuesta a presión)';
  previewWrap.appendChild(previewCanvas);

  const previewOverlayBar = document.createElement('div');
  previewOverlayBar.className = 'csp-preview-overlay-bar';

  const previewBgBtn = document.createElement('button');
  previewBgBtn.className = 'csp-preview-mini-btn';
  previewBgBtn.innerHTML = `<span>◐</span><span id="preview-bg-name">Papel</span>`;
  previewBgBtn.title = 'Cambiar fondo de vista previa (Papel / Damero / Oscuro)';
  previewBgBtn.addEventListener('click', () => {
    const cur = getToolState().previewBgMode;
    const next: PreviewBgMode = cur === 'paper' ? 'checker' : cur === 'checker' ? 'dark' : 'paper';
    setPreviewBgMode(next);
  });
  previewOverlayBar.appendChild(previewBgBtn);
  previewWrap.appendChild(previewOverlayBar);
  previewBox.appendChild(previewWrap);

  const drawStrokePreview = (): void => {
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;
    const st = getToolState();
    const b = st.brush;
    const mode = st.previewBgMode;

    previewCanvas.className = `csp-preview-canvas bg-${mode}`;
    const bgName = previewBox.querySelector('#preview-bg-name');
    if (bgName) {
      bgName.textContent = mode === 'paper' ? 'Papel' : mode === 'checker' ? 'Damero' : 'Oscuro';
    }

    ctx.setTransform(previewDpr, 0, 0, previewDpr, 0, 0);
    ctx.clearRect(0, 0, PREVIEW_W, PREVIEW_H);

    let renderColor = !b.color || b.color === 'transparent' ? '#111111' : b.color;
    if (mode === 'dark') {
      const rgb = hexToRgb(renderColor);
      const luminance = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      if (luminance < 65) {
        renderColor = '#f3f4f6';
      }
    }

    const pad = 12;
    const midY = PREVIEW_H / 2;
    const amp = PREVIEW_H / 2 - pad;
    const pathWidth = PREVIEW_W - pad * 2;
    const fit = Math.min(1, 30 / Math.max(1, b.size));
    const spacing = Math.min(0.5, Math.max(0.03, b.spacing));

    const N = 120;
    const pathX: number[] = [];
    const pathY: number[] = [];
    const pathArc: number[] = [0];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = pad + t * pathWidth;
      const y = midY + Math.sin(t * Math.PI * 2) * amp;
      if (i > 0) {
        const prev = i - 1;
        pathArc.push(pathArc[prev] + Math.hypot(x - pathX[prev], y - pathY[prev]));
      }
      pathX.push(x);
      pathY.push(y);
    }
    const totalLen = pathArc[N];

    const sampleAt = (arc: number): { x: number; y: number; dx: number; dy: number } => {
      let i = 1;
      while (i < N && pathArc[i] < arc) i++;
      const a0 = pathArc[i - 1];
      const a1 = pathArc[i];
      const u = a1 > a0 ? (arc - a0) / (a1 - a0) : 0;
      return {
        x: pathX[i - 1] + (pathX[i] - pathX[i - 1]) * u,
        y: pathY[i - 1] + (pathY[i] - pathY[i - 1]) * u,
        dx: pathX[i] - pathX[i - 1],
        dy: pathY[i] - pathY[i - 1],
      };
    };

    let pos = 0;
    let guard = 0;
    while (pos <= totalLen && guard++ < 3000) {
      const t = pos / totalLen;
      const pt = sampleAt(pos);
      const pressure = 0.25 + 0.75 * Math.pow(Math.sin(Math.PI * t), 0.7);
      const realDiameter = brushDiameterAt(b, pressure, pos / Math.max(fit, 0.001));
      const diameter = Math.max(0.4, realDiameter * fit);
      const stamp = getStampTexture({
        diameter,
        hardness: b.hardness,
        color: renderColor,
        antiAliasing: b.antiAliasing,
        tipShape: b.tipShape,
        tipRoundness: b.tipRoundness,
        tipTexture: b.tipTexture,
      });
      let alpha = brushStampAlpha(b, pressure);
      if (b.paperTexture && b.paperTexture !== 'none' && (b.textureDensity ?? 0) > 0) {
        const density = Math.min(1, Math.max(0, b.textureDensity ?? 0.85));
        const grain = samplePaperGrain(b.paperTexture, pt.x, pt.y, b.textureScale ?? 0.35);
        const thresh = density * (0.85 - pressure * 0.45);
        if (grain < thresh) {
          const margin = 0.12;
          if (grain < thresh - margin) {
            alpha = 0;
          } else {
            const tr = (grain - (thresh - margin)) / margin;
            alpha *= tr * tr * (1 - density * 0.9);
          }
        } else {
          const tr = (grain - thresh) / Math.max(0.01, 1 - thresh);
          alpha *= (0.45 + 0.55 * tr);
        }
      }

      if (alpha <= 0.005) {
        pos += Math.max(0.3, diameter * spacing);
        continue;
      }

      const follows = b.followDirection && b.tipShape !== 'calligraphic';
      const angleDeg = (follows ? (Math.atan2(pt.dy, pt.dx) * 180) / Math.PI : 0) + b.tipAngle;
      const symmetric = b.tipShape !== 'square' && b.tipRoundness >= 0.999 && (!b.tipTexture || b.tipTexture === 'default');

      if (b.spray) {
        ctx.save();
        if (b.compositeMode === 'lighter') {
          ctx.globalCompositeOperation = 'lighter';
        }
        const count = Math.max(1, Math.round((b.sprayDensity ?? 5) * 0.5));
        const radius = (b.sprayRadius ?? 25) * 0.5;
        for (let k = 0; k < count; k++) {
          const r = radius * Math.sqrt(Math.random());
          const th = Math.random() * Math.PI * 2;
          const sx = pt.x + r * Math.cos(th);
          const sy = pt.y + r * Math.sin(th);
          const pAngle = Math.random() * Math.PI * 2;
          ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(pAngle);
          ctx.drawImage(stamp, -stamp.width / 2, -stamp.height / 2);
          ctx.restore();
        }
        ctx.restore();
      } else {
        ctx.globalAlpha = alpha;
        if (!symmetric && angleDeg !== 0) {
          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate((angleDeg * Math.PI) / 180);
          ctx.drawImage(stamp, -stamp.width / 2, -stamp.height / 2);
          ctx.restore();
        } else {
          ctx.drawImage(stamp, pt.x - stamp.width / 2, pt.y - stamp.height / 2);
        }
      }
      pos += Math.max(0.3, diameter * spacing);
    }
    ctx.globalAlpha = 1;
  };

  let previewQueued = false;
  const queuePreview = (): void => {
    if (previewQueued) return;
    previewQueued = true;
    requestAnimationFrame(() => {
      previewQueued = false;
      drawStrokePreview();
    });
  };

  return {
    element: previewBox,
    update: queuePreview,
    drawNow: drawStrokePreview,
  };
}
