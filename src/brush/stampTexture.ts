const CACHE_LIMIT = 64;
const cache = new Map<string, HTMLCanvasElement>();

function buildStamp(diameter: number, hardness: number, color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = diameter;
  canvas.height = diameter;
  const ctx = canvas.getContext('2d')!;
  const r = diameter / 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();
  const inner = hardness >= 1 ? r - 0.01 : r * hardness;
  const gradient = ctx.createRadialGradient(r, r, inner, r, r, r);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

export function getStampTexture(diameter: number, hardness: number, color: string): HTMLCanvasElement {
  const rounded = Math.max(1, Math.round(diameter));
  const key = `${rounded}:${hardness.toFixed(3)}:${color}`;
  let stamp = cache.get(key);
  if (!stamp) {
    if (cache.size >= CACHE_LIMIT) cache.clear();
    stamp = buildStamp(rounded, hardness, color);
    cache.set(key, stamp);
  }
  return stamp;
}

export function clearStampCache(): void {
  cache.clear();
}
