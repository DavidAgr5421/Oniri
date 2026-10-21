import type { LayerNode } from './layers';

export interface SmartFillConfig {
  seedX: number;
  seedY: number;
  fillColorHex: string;
  tolerance: number; // 0 to 100
  closeGap: number; // 0 = off, 1 to 20 px
  areaScaling: number; // 0 to 10 px
  referMode: 'editing' | 'reference' | 'all';
  activeLayer: LayerNode;
  allLayers: LayerNode[];
  selectionMaskCanvas?: HTMLCanvasElement | null;
  docW: number;
  docH: number;
}

/**
 * High-performance morphological dilation using separable 2-pass horizontal & vertical
 * sliding window (O(N) time complexity).
 */
function dilateBinaryMask(src: Uint8Array, w: number, h: number, radius: number): Uint8Array {
  if (radius <= 0) return src;
  const rad = Math.min(25, Math.max(1, Math.round(radius)));
  const total = w * h;

  // Horizontal pass
  const temp = new Uint8Array(total);
  for (let y = 0; y < h; y++) {
    const rowOffset = y * w;
    let countInWindow = 0;

    // Initialize window [-rad, rad]
    for (let x = -rad; x <= rad; x++) {
      if (x >= 0 && x < w && src[rowOffset + x] === 1) {
        countInWindow++;
      }
    }

    for (let x = 0; x < w; x++) {
      if (countInWindow > 0) {
        temp[rowOffset + x] = 1;
      }
      // Slide window: remove leaving pixel, add entering pixel
      const leavingX = x - rad;
      const enteringX = x + rad + 1;
      if (leavingX >= 0 && leavingX < w && src[rowOffset + leavingX] === 1) {
        countInWindow--;
      }
      if (enteringX >= 0 && enteringX < w && src[rowOffset + enteringX] === 1) {
        countInWindow++;
      }
    }
  }

  // Vertical pass
  const dst = new Uint8Array(total);
  for (let x = 0; x < w; x++) {
    let countInWindow = 0;

    // Initialize window [-rad, rad]
    for (let y = -rad; y <= rad; y++) {
      if (y >= 0 && y < h && temp[y * w + x] === 1) {
        countInWindow++;
      }
    }

    for (let y = 0; y < h; y++) {
      if (countInWindow > 0) {
        dst[y * w + x] = 1;
      }
      // Slide window
      const leavingY = y - rad;
      const enteringY = y + rad + 1;
      if (leavingY >= 0 && leavingY < h && temp[leavingY * w + x] === 1) {
        countInWindow--;
      }
      if (enteringY >= 0 && enteringY < h && temp[enteringY * w + x] === 1) {
        countInWindow++;
      }
    }
  }

  return dst;
}

/** Parse hex '#rrggbb' to [r, g, b, 255] */
function hexToRgba(hex: string): [number, number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.slice(0, 2), 16) || 0;
  const g = parseInt(c.slice(2, 4), 16) || 0;
  const b = parseInt(c.slice(4, 6), 16) || 0;
  return [r, g, b, 255];
}

/**
 * Intelligent Flood Fill implementing Clip Studio Paint's core algorithms:
 * 1. Reference Layer boundary isolation.
 * 2. Morphological Close Gap (seals lines with small openings).
 * 3. Area Scaling (expands color under anti-aliased lineart, removing white halos).
 */
export function executeSmartFill(config: SmartFillConfig): boolean {
  const {
    seedX,
    seedY,
    fillColorHex,
    tolerance,
    closeGap,
    areaScaling,
    referMode,
    activeLayer,
    allLayers,
    selectionMaskCanvas,
    docW,
    docH,
  } = config;

  if (!activeLayer.context || activeLayer.locked || activeLayer.isPaper) {
    return false;
  }
  if (seedX < 0 || seedX >= docW || seedY < 0 || seedY >= docH) {
    return false;
  }

  const targetCtx = activeLayer.context;
  const totalPixels = docW * docH;

  // 1. Determine boundary data source
  let boundaryData: Uint8ClampedArray;
  let isMultiLayerBoundary = false;

  if (referMode === 'reference') {
    const refLayers = allLayers.filter((l) => l.isReference && l.visible && l.canvas && !l.isPaper);
    if (refLayers.length > 0) {
      isMultiLayerBoundary = true;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = docW;
      tempCanvas.height = docH;
      const tCtx = tempCanvas.getContext('2d')!;
      for (const rl of refLayers) {
        tCtx.globalAlpha = rl.opacity;
        tCtx.drawImage(rl.canvas!, 0, 0);
      }
      boundaryData = tCtx.getImageData(0, 0, docW, docH).data;
    } else {
      // Fallback to active layer if no reference layer is assigned
      boundaryData = targetCtx.getImageData(0, 0, docW, docH).data;
    }
  } else if (referMode === 'all') {
    isMultiLayerBoundary = true;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = docW;
    tempCanvas.height = docH;
    const tCtx = tempCanvas.getContext('2d')!;
    for (const l of allLayers) {
      if (l.visible && l.canvas && !l.isPaper) {
        tCtx.globalAlpha = l.opacity;
        tCtx.drawImage(l.canvas, 0, 0);
      }
    }
    boundaryData = tCtx.getImageData(0, 0, docW, docH).data;
  } else {
    // Mode 'editing' (only active layer)
    boundaryData = targetCtx.getImageData(0, 0, docW, docH).data;
  }

  const targetImg = targetCtx.getImageData(0, 0, docW, docH);
  const targetData = targetImg.data;

  // 2. Sample seed pixel
  const seedIdx = seedY * docW + seedX;
  const seedP = seedIdx * 4;
  const seedR = boundaryData[seedP];
  const seedG = boundaryData[seedP + 1];
  const seedB = boundaryData[seedP + 2];
  const seedA = boundaryData[seedP + 3];

  const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

  // If clicked on active layer with exact same color and opacity, do nothing
  if (!isMultiLayerBoundary && targetData[seedP] === fillR && targetData[seedP + 1] === fillG && targetData[seedP + 2] === fillB && targetData[seedP + 3] === fillA) {
    return false;
  }

  // 3. Build Obstacle / Boundary Mask
  // When referencing lineart layers: pixels with significant ink (alpha > tolerance) are obstacles
  const obstacleMask = new Uint8Array(totalPixels);
  const tolSq = ((Math.max(1, tolerance) / 100) * 255) ** 2 * 3;

  if (isMultiLayerBoundary) {
    // If seed was on an empty transparent pixel (the typical coloring workflow)
    const isSeedEmpty = seedA < 20;
    for (let i = 0; i < totalPixels; i++) {
      const p = i * 4;
      const a = boundaryData[p + 3];
      if (isSeedEmpty) {
        // Lineart is an obstacle if it has opacity > 40
        if (a > 30) obstacleMask[i] = 1;
      } else {
        // Seed is on a colored region: match color difference
        const dr = boundaryData[p] - seedR;
        const dg = boundaryData[p + 1] - seedG;
        const db = boundaryData[p + 2] - seedB;
        const da = a - seedA;
        if (dr * dr + dg * dg + db * db + da * da > tolSq || a > 200) {
          obstacleMask[i] = 1;
        }
      }
    }
  } else {
    // Single layer fill: obstacle if color distance exceeds tolerance
    for (let i = 0; i < totalPixels; i++) {
      const p = i * 4;
      const dr = boundaryData[p] - seedR;
      const dg = boundaryData[p + 1] - seedG;
      const db = boundaryData[p + 2] - seedB;
      const da = boundaryData[p + 3] - seedA;
      if (dr * dr + dg * dg + db * db + da * da > tolSq) {
        obstacleMask[i] = 1;
      }
    }
  }

  // If seed itself is an impenetrable obstacle, abort
  if (obstacleMask[seedIdx] === 1) {
    return false;
  }

  // 4. Close Gap: Morphological Dilation of Obstacles
  // Bridges small line openings so paint does not leak outside
  const effectiveObstacles = closeGap > 0 ? dilateBinaryMask(obstacleMask, docW, docH, closeGap) : obstacleMask;

  // If dilation accidentally covered the seed point, fall back to undilated
  const obstaclesForFlood = effectiveObstacles[seedIdx] === 1 ? obstacleMask : effectiveObstacles;

  // 5. Scanline Flood Fill on bounded grid
  const visited = new Uint8Array(totalPixels);
  const rawFillMask = new Uint8Array(totalPixels);
  const stack: [number, number][] = [[seedX, seedY]];
  visited[seedIdx] = 1;

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const lineY = cy * docW;

    let left = cx;
    while (left > 0 && !visited[lineY + left - 1] && obstaclesForFlood[lineY + left - 1] === 0) {
      left--;
    }

    let right = cx;
    while (right < docW - 1 && !visited[lineY + right + 1] && obstaclesForFlood[lineY + right + 1] === 0) {
      right++;
    }

    for (let x = left; x <= right; x++) {
      const idx = lineY + x;
      visited[idx] = 1;
      // Do not fill over the original un-dilated lineart
      if (obstacleMask[idx] === 0) {
        rawFillMask[idx] = 1;
      }
    }

    // Inspect rows above and below
    for (const nextY of [cy - 1, cy + 1]) {
      if (nextY < 0 || nextY >= docH) continue;
      const nextLine = nextY * docW;
      let inSpan = false;

      for (let x = left; x <= right; x++) {
        const idx = nextLine + x;
        const canFill = !visited[idx] && obstaclesForFlood[idx] === 0;

        if (!inSpan && canFill) {
          stack.push([x, nextY]);
          inSpan = true;
        } else if (inSpan && !canFill) {
          inSpan = false;
        }
      }
    }
  }

  // 6. Area Scaling: Expand fill mask outward to tuck underneath lineart
  // This eliminates the anti-aliased white fringe/halo
  const finalFillMask = areaScaling > 0 ? dilateBinaryMask(rawFillMask, docW, docH, areaScaling) : rawFillMask;

  // 7. Apply Selection Mask if active
  let selectionData: Uint8ClampedArray | null = null;
  if (selectionMaskCanvas) {
    const sCtx = selectionMaskCanvas.getContext('2d');
    if (sCtx) {
      selectionData = sCtx.getImageData(0, 0, docW, docH).data;
    }
  }

  // 8. Write pixels into target layer
  const lockAlpha = !!activeLayer.lockAlpha;

  for (let i = 0; i < totalPixels; i++) {
    if (finalFillMask[i] === 1) {
      // Check selection boundary
      if (selectionData && selectionData[i * 4 + 3] === 0) {
        continue;
      }

      const p = i * 4;
      if (lockAlpha && targetData[p + 3] === 0) {
        // Skip transparent pixel when Lock Alpha is active
        continue;
      }

      targetData[p] = fillR;
      targetData[p + 1] = fillG;
      targetData[p + 2] = fillB;
      targetData[p + 3] = fillA;
    }
  }

  targetCtx.putImageData(targetImg, 0, 0);
  return true;
}
