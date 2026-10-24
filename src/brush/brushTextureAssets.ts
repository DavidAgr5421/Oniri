/**
 * Oniri Studio Procedural Brush Tip & Paper Grain Texture Generator
 * 100% original procedural synthesis (multi-octave FBM noise, anisotropic weaves,
 * organic bristle clusters, graphite/charcoal grain, and effect sprites).
 * Zero external bitmap dependencies or third-party assets.
 */

export interface TextureAsset {
  image: HTMLImageElement | HTMLCanvasElement;
  loaded: boolean;
  dataCanvas?: HTMLCanvasElement;
  pixelData?: Uint8ClampedArray;
  toothData?: Float32Array; // Normalized high-contrast paper tooth [0..1]
  pattern?: CanvasPattern;
  width: number;
  height: number;
  dataUrl: string;
}

const assets = new Map<string, TextureAsset>();
const listeners = new Set<() => void>();

export function subscribeTextureAssets(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notifyListeners(): void {
  for (const fn of listeners) {
    try {
      fn();
    } catch {
      // ignore
    }
  }
}

// --- Deterministic Hash & Multi-Octave Value Noise ---

function hash2D(ix: number, iy: number, seed: number): number {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1442695041);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function valueNoise2D(x: number, y: number, periodX: number, periodY: number, seed: number): number {
  const fx = Math.floor(x);
  const fy = Math.floor(y);
  const tx = x - fx;
  const ty = y - fy;
  const ux = tx * tx * (3 - 2 * tx);
  const uy = ty * ty * (3 - 2 * ty);

  const x0 = ((fx % periodX) + periodX) % periodX;
  const y0 = ((fy % periodY) + periodY) % periodY;
  const x1 = (x0 + 1) % periodX;
  const y1 = (y0 + 1) % periodY;

  const v00 = hash2D(x0, y0, seed);
  const v10 = hash2D(x1, y0, seed);
  const v01 = hash2D(x0, y1, seed);
  const v11 = hash2D(x1, y1, seed);

  const a = v00 + (v10 - v00) * ux;
  const b = v01 + (v11 - v01) * ux;
  return a + (b - a) * uy;
}

function fbmTileable(
  u: number,
  v: number,
  baseFreq: number,
  octaves: number,
  seed: number,
): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let freq = baseFreq;

  for (let o = 0; o < octaves; o++) {
    const px = Math.max(2, Math.round(freq));
    const py = Math.max(2, Math.round(freq));
    sum += valueNoise2D(u * px, v * py, px, py, seed + o * 101) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / (norm || 1);
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// --- Procedural Paper Texture Synthesis ---

type PaperRecipe =
  | 'oil-paint'
  | 'pencil-paper'
  | 'birds-eye-maple'
  | 'canvas'
  | 'canvas-02'
  | 'cotton'
  | 'fine-textured'
  | 'rough-textured'
  | 'drawing-paper-c'
  | 'dappled-cloud';

function buildProceduralPaperAsset(recipe: PaperRecipe): TextureAsset {
  const size = 128;
  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d', { willReadFrequently: true })!;
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;
  const tooth = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      let t = 0.5;

      switch (recipe) {
        case 'oil-paint': {
          const warpX = Math.sin(u * Math.PI * 2 * 18) * 0.5 + 0.5;
          const weftY = Math.sin(v * Math.PI * 2 * 18 + Math.PI * 0.5) * 0.5 + 0.5;
          const weave = warpX * 0.45 + weftY * 0.45;
          const micro = fbmTileable(u, v, 16, 3, 11);
          t = clamp01(weave * 0.65 + micro * 0.35);
          break;
        }
        case 'canvas': {
          const wx = Math.abs(Math.sin(u * Math.PI * 24));
          const wy = Math.abs(Math.sin(v * Math.PI * 24));
          const noise = fbmTileable(u, v, 20, 3, 23);
          t = clamp01(Math.max(wx, wy) * 0.72 + noise * 0.28);
          break;
        }
        case 'canvas-02': {
          const wx = Math.abs(Math.sin(u * Math.PI * 14));
          const wy = Math.abs(Math.sin(v * Math.PI * 14));
          const noise = fbmTileable(u, v, 12, 4, 37);
          t = clamp01((wx * wy) * 0.68 + noise * 0.32);
          break;
        }
        case 'pencil-paper': {
          const n1 = fbmTileable(u, v, 28, 4, 53);
          const n2 = hash2D(x, y, 59);
          t = clamp01((n1 * 0.75 + n2 * 0.25 - 0.18) / 0.68);
          break;
        }
        case 'fine-textured': {
          const n1 = fbmTileable(u, v, 36, 3, 71);
          const micro = hash2D(x, y, 73);
          t = clamp01(n1 * 0.65 + micro * 0.35);
          break;
        }
        case 'rough-textured': {
          const n1 = fbmTileable(u, v, 10, 4, 89);
          t = clamp01(Math.pow(n1, 1.35) * 1.15);
          break;
        }
        case 'drawing-paper-c': {
          const fiber = fbmTileable(u, v, 22, 4, 103);
          const cross = fbmTileable(v, u, 18, 3, 107);
          t = clamp01((fiber * 0.6 + cross * 0.4 - 0.15) / 0.72);
          break;
        }
        case 'cotton': {
          const soft = fbmTileable(u, v, 14, 4, 131);
          const diag = Math.sin((u + v) * Math.PI * 2 * 16) * 0.12;
          t = clamp01(soft + diag);
          break;
        }
        case 'birds-eye-maple': {
          const swirl = fbmTileable(u, v, 6, 3, 149);
          const rings = Math.sin((u * 4 + swirl * 2.5) * Math.PI * 2) * 0.5 + 0.5;
          const fine = fbmTileable(u, v, 24, 2, 157);
          t = clamp01(rings * 0.7 + fine * 0.3);
          break;
        }
        case 'dappled-cloud': {
          const cloud = fbmTileable(u, v, 6, 4, 173);
          t = clamp01((cloud - 0.22) / 0.58);
          break;
        }
      }

      const idx = y * size + x;
      tooth[idx] = t;
      const p = idx * 4;
      const lum = Math.round((0.2 + t * 0.75) * 255);
      data[p] = lum;
      data[p + 1] = lum;
      data[p + 2] = lum;
      data[p + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return {
    image: cvs,
    loaded: true,
    dataCanvas: cvs,
    pixelData: data,
    toothData: tooth,
    width: size,
    height: size,
    dataUrl: cvs.toDataURL('image/png'),
  };
}

// --- Procedural Brush Tip Synthesis ---

function buildProceduralTipAsset(
  _id: string,
  width: number,
  height: number,
  evalAlpha: (nx: number, ny: number, px: number, py: number) => number,
): TextureAsset {
  const cvs = document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
  const ctx = cvs.getContext('2d', { willReadFrequently: true })!;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const tooth = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    const ny = ((y + 0.5) / height) * 2 - 1;
    for (let x = 0; x < width; x++) {
      const nx = ((x + 0.5) / width) * 2 - 1;
      const a = clamp01(evalAlpha(nx, ny, x, y));
      const idx = y * width + x;
      tooth[idx] = a;
      const p = idx * 4;
      data[p] = 255;
      data[p + 1] = 255;
      data[p + 2] = 255;
      data[p + 3] = Math.round(a * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return {
    image: cvs,
    loaded: true,
    dataCanvas: cvs,
    pixelData: data,
    toothData: tooth,
    width,
    height,
    dataUrl: cvs.toDataURL('image/png'),
  };
}

export function initBrushTextures(): void {
  if (assets.size > 0) return;

  // 1. Procedural Paper Textures
  const paperIds: PaperRecipe[] = [
    'oil-paint',
    'pencil-paper',
    'birds-eye-maple',
    'canvas',
    'canvas-02',
    'cotton',
    'fine-textured',
    'rough-textured',
    'drawing-paper-c',
    'dappled-cloud',
  ];
  for (const pid of paperIds) {
    assets.set(pid, buildProceduralPaperAsset(pid));
  }

  // 2. Procedural Brush Tips
  assets.set(
    'flat-square',
    buildProceduralTipAsset('flat-square', 64, 64, (nx, ny) => {
      const d = Math.max(Math.abs(nx), Math.abs(ny));
      return d <= 0.88 ? 1.0 : clamp01((0.96 - d) / 0.08);
    }),
  );

  assets.set(
    'gasagasa',
    buildProceduralTipAsset('gasagasa', 32, 96, (nx, ny, px, py) => {
      const r = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      const jitter = fbmTileable((angle + Math.PI) / (Math.PI * 2), r * 0.5, 8, 3, 211) * 0.38;
      const core = 1.0 - r - (jitter - 0.18);
      if (core <= 0) return 0;
      const grain = 0.65 + 0.35 * hash2D(px, py, 223);
      return clamp01(core * 3.2) * grain;
    }),
  );

  assets.set(
    'real-g',
    buildProceduralTipAsset('real-g', 80, 96, (nx, ny) => {
      const r = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      const edgeNoise = fbmTileable((angle + Math.PI) / (Math.PI * 2), r * 0.4, 10, 3, 241) * 0.26;
      const sd = r + edgeNoise - 0.92;
      return clamp01(-sd * 4.5);
    }),
  );

  assets.set(
    'brush02',
    buildProceduralTipAsset('brush02', 80, 80, (nx, ny) => {
      const r = Math.hypot(nx, ny);
      if (r > 0.98) return 0;
      const theta = Math.atan2(ny, nx);
      const bristles = Math.sin(theta * 28) * 0.5 + 0.5;
      const rings = fbmTileable(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 10, 3, 263);
      const env = Math.pow(1 - r, 0.55);
      return env * (0.45 + 0.35 * bristles + 0.2 * rings);
    }),
  );

  const makePencilTip = (id: string, seed: number, porosity: number) =>
    buildProceduralTipAsset(id, 64, 76, (nx, ny, px, py) => {
      const r = Math.hypot(nx, ny);
      const noise = fbmTileable(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 9, 3, seed);
      const micro = hash2D(px, py, seed + 17);
      const env = clamp01((0.95 - r + (noise - 0.5) * 0.35) * 2.2);
      return env * clamp01((noise * (1 - porosity) + micro * porosity));
    });

  assets.set('pencil-01', makePencilTip('pencil-01', 307, 0.35));
  assets.set('pencil-02', makePencilTip('pencil-02', 331, 0.45));
  assets.set('pencil-03', makePencilTip('pencil-03', 353, 0.55));

  const makeFudeTip = (id: string, seed: number) =>
    buildProceduralTipAsset(id, 72, 84, (nx, ny) => {
      // Teardrop fude nib silhouette
      const pinch = 1.0 - (ny + 1.0) * 0.22;
      const r = Math.hypot(nx / Math.max(0.25, pinch), ny);
      const streak = fbmTileable(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 12, 3, seed);
      return clamp01((0.92 - r) * 3.8) * (0.72 + 0.28 * streak);
    });

  assets.set('brush-pen-01', makeFudeTip('brush-pen-01', 401));
  assets.set('brush-pen-02', makeFudeTip('brush-pen-02', 433));

  assets.set(
    'dry-ink',
    buildProceduralTipAsset('dry-ink', 96, 64, (nx, ny) => {
      const r = Math.hypot(nx, ny);
      if (r > 0.98) return 0;
      // Striated dry bristle tracks along X
      const stripe = valueNoise2D((ny + 1) * 22, (nx + 1) * 3, 44, 6, 461);
      const env = clamp01((0.95 - r) * 2.6);
      return env * clamp01((stripe - 0.22) * 1.35);
    }),
  );

  assets.set(
    'charcoal-01',
    buildProceduralTipAsset('charcoal-01', 72, 72, (nx, ny, px, py) => {
      const d = Math.max(Math.abs(nx) * 0.85, Math.abs(ny) * 0.95) + Math.hypot(nx, ny) * 0.25;
      const coarse = fbmTileable(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 7, 4, 503);
      const grit = hash2D(px, py, 509);
      const env = clamp01((1.05 - d + (coarse - 0.5) * 0.4) * 2.4);
      return env * clamp01(coarse * 0.7 + grit * 0.3);
    }),
  );

  assets.set(
    'star02',
    buildProceduralTipAsset('star02', 64, 64, (nx, ny) => {
      const r = Math.hypot(nx, ny);
      if (r > 1.0) return 0;
      const ax = Math.abs(nx);
      const ay = Math.abs(ny);
      const ray = Math.max(
        Math.exp(-ay * 14) * (1 - ax),
        Math.exp(-ax * 14) * (1 - ay),
      );
      const core = Math.exp(-r * r * 18);
      return clamp01(Math.max(ray, core));
    }),
  );

  assets.set(
    'star04',
    buildProceduralTipAsset('star04', 64, 64, (nx, ny) => {
      const r = Math.hypot(nx, ny);
      return r >= 1.0 ? 0 : Math.pow(1.0 - r, 2.4);
    }),
  );

  const makeLightningTip = (id: string, seed: number) =>
    buildProceduralTipAsset(id, 64, 96, (nx, ny) => {
      const wave =
        (valueNoise2D((ny + 1) * 5, seed, 10, 10, seed) - 0.5) * 0.55 +
        (valueNoise2D((ny + 1) * 14, seed + 3, 28, 28, seed + 7) - 0.5) * 0.22;
      const dist = Math.abs(nx - wave);
      const taper = 1.0 - Math.pow(Math.abs(ny), 3.0) * 0.5;
      const width = 0.14 * taper;
      return clamp01((width - dist) / Math.max(0.03, width));
    });

  assets.set('lb1', makeLightningTip('lb1', 601));
  assets.set('lb2', makeLightningTip('lb2', 613));
  assets.set('lb3', makeLightningTip('lb3', 619));
  assets.set('lb4', makeLightningTip('lb4', 631));

  const makeRainTip = (id: string, seed: number) =>
    buildProceduralTipAsset(id, 32, 96, (nx, ny) => {
      const streak = Math.abs(nx);
      const vFade = 1.0 - Math.abs(ny);
      const drop = valueNoise2D((nx + 1) * 6, (ny + 1) * 2, 12, 4, seed);
      return clamp01((0.28 - streak) * 4.0) * vFade * clamp01((drop - 0.3) * 1.6);
    });

  assets.set('rain-1', makeRainTip('rain-1', 701));
  assets.set('rain-2', makeRainTip('rain-2', 709));

  notifyListeners();
}

export function getBrushTextureAsset(id: string): TextureAsset | undefined {
  if (assets.size === 0) {
    initBrushTextures();
  }
  return assets.get(id);
}

function getAssetDataUrl(id: string): string {
  return getBrushTextureAsset(id)?.dataUrl ?? '';
}

/**
 * Samples the paper tooth at coordinate (x, y) with scaling.
 * Returns 0.0 (deep paper valley / uninked pore) to 1.0 (paper peak / full tooth).
 */
export function samplePaperGrain(textureId: string, x: number, y: number, scale = 1.0): number {
  const asset = getBrushTextureAsset(textureId);
  if (!asset || !asset.loaded || !asset.toothData || asset.width === 0) {
    return 1.0;
  }
  const s = Math.max(0.05, scale);
  const tx = Math.floor(Math.abs(x * s)) % asset.width;
  const ty = Math.floor(Math.abs(y * s)) % asset.height;
  return asset.toothData[ty * asset.width + tx];
}

export interface MaterialCatalogItem {
  id: string;
  name: string;
  category: 'paper' | 'tip';
  tags: string[];
  dataUrl: string;
}

export const PAPER_MATERIAL_CATALOG: MaterialCatalogItem[] = [
  { id: 'none', name: 'Ninguna (Liso)', category: 'paper', tags: ['All'], get dataUrl() { return ''; } },
  { id: 'oil-paint', name: 'Oil paint (Lienzo al Óleo)', category: 'paper', tags: ['Texture', 'Canvas'], get dataUrl() { return getAssetDataUrl('oil-paint'); } },
  { id: 'pencil-paper', name: 'Pencil paper (Papel Lápiz)', category: 'paper', tags: ['Texture', 'Paper'], get dataUrl() { return getAssetDataUrl('pencil-paper'); } },
  { id: 'birds-eye-maple', name: "Bird's-eye maple (Arce)", category: 'paper', tags: ['Texture', 'Paper'], get dataUrl() { return getAssetDataUrl('birds-eye-maple'); } },
  { id: 'canvas', name: 'Canvas (Lienzo Clásico)', category: 'paper', tags: ['Texture', 'Canvas'], get dataUrl() { return getAssetDataUrl('canvas'); } },
  { id: 'canvas-02', name: 'Canvas 02 (Lienzo Grueso)', category: 'paper', tags: ['Texture', 'Canvas'], get dataUrl() { return getAssetDataUrl('canvas-02'); } },
  { id: 'cotton', name: 'Cotton (Algodón)', category: 'paper', tags: ['Texture', 'Canvas'], get dataUrl() { return getAssetDataUrl('cotton'); } },
  { id: 'fine-textured', name: 'Fine textured (Grano Fino)', category: 'paper', tags: ['Texture', 'Paper'], get dataUrl() { return getAssetDataUrl('fine-textured'); } },
  { id: 'rough-textured', name: 'Rough textured (Grano Rugoso)', category: 'paper', tags: ['Texture', 'Paper'], get dataUrl() { return getAssetDataUrl('rough-textured'); } },
  { id: 'drawing-paper-c', name: 'Drawing paper C (Dibujo C)', category: 'paper', tags: ['Texture', 'Paper'], get dataUrl() { return getAssetDataUrl('drawing-paper-c'); } },
  { id: 'dappled-cloud', name: 'Dappled cloud (Nube Moteada)', category: 'paper', tags: ['Texture', 'Noise'], get dataUrl() { return getAssetDataUrl('dappled-cloud'); } },
];

export const TIP_MATERIAL_CATALOG: MaterialCatalogItem[] = [
  { id: 'default', name: 'Círculo / Forma base', category: 'tip', tags: ['Basic'], get dataUrl() { return ''; } },
  { id: 'gasagasa', name: 'Plumilla Texturizada (Rough Nib)', category: 'tip', tags: ['Pen', 'Textured'], get dataUrl() { return getAssetDataUrl('gasagasa'); } },
  { id: 'real-g', name: 'Real G-Pen (Pluma G Orgánica)', category: 'tip', tags: ['Pen', 'Textured'], get dataUrl() { return getAssetDataUrl('real-g'); } },
  { id: 'flat-square', name: 'Flat Square (Marcador Plano)', category: 'tip', tags: ['Brush', 'Basic'], get dataUrl() { return getAssetDataUrl('flat-square'); } },
  { id: 'brush02', name: 'Brush 02 (Cerdas Acuarela)', category: 'tip', tags: ['Brush', 'Textured'], get dataUrl() { return getAssetDataUrl('brush02'); } },
  { id: 'pencil-01', name: 'Pencil Tip 01 (Grafito A)', category: 'tip', tags: ['Pencil', 'Textured'], get dataUrl() { return getAssetDataUrl('pencil-01'); } },
  { id: 'pencil-02', name: 'Pencil Tip 02 (Grafito B)', category: 'tip', tags: ['Pencil', 'Textured'], get dataUrl() { return getAssetDataUrl('pencil-02'); } },
  { id: 'pencil-03', name: 'Pencil Tip 03 (Grafito C)', category: 'tip', tags: ['Pencil', 'Textured'], get dataUrl() { return getAssetDataUrl('pencil-03'); } },
  { id: 'brush-pen-01', name: 'Brush Pen 01 (Fude A)', category: 'tip', tags: ['Pen', 'Brush'], get dataUrl() { return getAssetDataUrl('brush-pen-01'); } },
  { id: 'brush-pen-02', name: 'Brush Pen 02 (Fude B)', category: 'tip', tags: ['Pen', 'Brush'], get dataUrl() { return getAssetDataUrl('brush-pen-02'); } },
  { id: 'dry-ink', name: 'Dry Ink (Tinta Seca / Cerdas)', category: 'tip', tags: ['Pen', 'Textured'], get dataUrl() { return getAssetDataUrl('dry-ink'); } },
  { id: 'charcoal-01', name: 'Charcoal 01 (Carboncillo)', category: 'tip', tags: ['Pencil', 'Textured'], get dataUrl() { return getAssetDataUrl('charcoal-01'); } },
  { id: 'star02', name: 'Star 02 (Destello 4 Puntas)', category: 'tip', tags: ['Effect'], get dataUrl() { return getAssetDataUrl('star02'); } },
  { id: 'star04', name: 'Star 04 (Brillo Suave)', category: 'tip', tags: ['Effect'], get dataUrl() { return getAssetDataUrl('star04'); } },
  { id: 'lb1', name: 'Lightning LB1 (Rayo 1)', category: 'tip', tags: ['Effect', 'Ribbon'], get dataUrl() { return getAssetDataUrl('lb1'); } },
  { id: 'lb2', name: 'Lightning LB2 (Rayo 2)', category: 'tip', tags: ['Effect', 'Ribbon'], get dataUrl() { return getAssetDataUrl('lb2'); } },
  { id: 'lb3', name: 'Lightning LB3 (Rayo 3)', category: 'tip', tags: ['Effect', 'Ribbon'], get dataUrl() { return getAssetDataUrl('lb3'); } },
  { id: 'lb4', name: 'Lightning LB4 (Rayo 4)', category: 'tip', tags: ['Effect', 'Ribbon'], get dataUrl() { return getAssetDataUrl('lb4'); } },
  { id: 'rain-1', name: 'Rain 1 (Cortina de Lluvia 1)', category: 'tip', tags: ['Effect'], get dataUrl() { return getAssetDataUrl('rain-1'); } },
  { id: 'rain-2', name: 'Rain 2 (Cortina de Lluvia 2)', category: 'tip', tags: ['Effect'], get dataUrl() { return getAssetDataUrl('rain-2'); } },
];

const patternCache = new Map<string, CanvasPattern>();

/**
 * Builds and caches a GPU-ready CanvasPattern mask for zero-lag per-dab and
 * stroke-end paper texture compositing via `destination-in`.
 */
export function getPaperGrainPattern(
  ctx: CanvasRenderingContext2D,
  textureId: string,
  scale: number,
  density: number,
  mode: 'subtract' | 'multiply' | 'height' | 'outline',
  invert: boolean,
): CanvasPattern | null {
  const asset = getBrushTextureAsset(textureId);
  if (!asset || !asset.loaded || !asset.toothData || asset.width === 0) return null;

  const qScale = Math.round(Math.max(0.05, Math.min(4.0, scale)) * 40) / 40;
  const qDensity = Math.round(Math.max(0, Math.min(1, density)) * 50) / 50;
  const key = `${textureId}:${qScale}:${qDensity}:${mode}:${invert ? 1 : 0}`;
  const cached = patternCache.get(key);
  if (cached) return cached;

  const w = Math.max(8, Math.min(1024, Math.round(asset.width * qScale)));
  const h = Math.max(8, Math.min(1024, Math.round(asset.height * qScale)));

  const tile = document.createElement('canvas');
  tile.width = w;
  tile.height = h;
  const tctx = tile.getContext('2d');
  if (!tctx) return null;

  const imgData = tctx.createImageData(w, h);
  const data = imgData.data;
  const aw = asset.width;
  const ah = asset.height;
  const toothData = asset.toothData;

  for (let py = 0; py < h; py++) {
    const sy = Math.min(ah - 1, Math.floor((py / h) * ah));
    for (let px = 0; px < w; px++) {
      const sx = Math.min(aw - 1, Math.floor((px / w) * aw));
      let tooth = toothData[sy * aw + sx];
      if (invert) tooth = 1.0 - tooth;
      const valley = 1.0 - tooth;

      let mult = 1.0;
      if (mode === 'subtract') {
        mult = Math.max(0, 1.0 - valley * qDensity * 1.15);
      } else if (mode === 'multiply') {
        mult = Math.max(0, 1.0 - valley * qDensity);
      } else if (mode === 'outline') {
        const sxR = (sx + 1) % aw;
        const syD = (sy + 1) % ah;
        let tR = toothData[sy * aw + sxR];
        let tD = toothData[syD * aw + sx];
        if (invert) {
          tR = 1.0 - tR;
          tD = 1.0 - tD;
        }
        const grad = Math.min(1, Math.hypot(tooth - tR, tooth - tD) * 3.4);
        const hardTooth = tooth > 0.46 ? 1.0 : Math.max(0, (tooth - 0.15) / 0.31);
        const edgeBoost = Math.min(1, hardTooth * 0.78 + grad * 0.55);
        mult = 1.0 - qDensity + qDensity * edgeBoost;
      } else {
        // 'height' (Valley threshold)
        const threshold = valley * qDensity * 0.92;
        const denom = Math.max(0.12, 1.0 - qDensity * 0.78);
        mult = Math.max(0, Math.min(1, (1.0 - threshold) / denom));
      }

      const idx = (py * w + px) * 4;
      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.round(Math.max(0, Math.min(1, mult)) * 255);
    }
  }

  tctx.putImageData(imgData, 0, 0);
  const pattern = ctx.createPattern(tile, 'repeat');
  if (pattern) {
    if (patternCache.size > 48) {
      const firstKey = patternCache.keys().next().value;
      if (firstKey) patternCache.delete(firstKey);
    }
    patternCache.set(key, pattern);
  }
  return pattern;
}
