import { rustStrokeEngine } from './rustStrokeEngine';

export interface FloodFillResult {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  filledCount: number;
}

export function floodFill(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillHex: string,
  tolerance = 20,
  selectionMask?: Uint8ClampedArray | Uint8Array,
): FloodFillResult | null {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) return null;

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Parse fill hex to RGBA
  const rF = parseInt(fillHex.slice(1, 3), 16) || 0;
  const gF = parseInt(fillHex.slice(3, 5), 16) || 0;
  const bF = parseInt(fillHex.slice(5, 7), 16) || 0;
  const aF = 255;

  // 1. WASM Fast-Path via FloodFillCore
  if (rustStrokeEngine.available) {
    const rustRes = rustStrokeEngine.floodFillScanline(
      data,
      width,
      height,
      startX,
      startY,
      rF,
      gF,
      bF,
      aF,
      tolerance,
      selectionMask,
    );
    if (rustRes) {
      ctx.putImageData(imgData, 0, 0);
      return rustRes;
    }
    return null;
  }

  // 2. TypeScript Scanline Fallback
  const startIdx = (startY * width + startX) * 4;
  const rS = data[startIdx];
  const gS = data[startIdx + 1];
  const bS = data[startIdx + 2];
  const aS = data[startIdx + 3];

  if (rS === rF && gS === gF && bS === bF && aS === aF) return null;

  const isMaskedOut = (x: number, y: number): boolean => {
    if (!selectionMask || selectionMask.length === 0) return false;
    const offset = y * width + x;
    if (selectionMask.length >= (offset + 1) * 4) {
      return selectionMask[offset * 4 + 3] === 0;
    }
    return selectionMask[offset] === 0;
  };

  if (isMaskedOut(startX, startY)) return null;

  const tolSq = ((tolerance / 100) * 255) ** 2 * 3;

  function matches(idx: number): boolean {
    const dr = data[idx] - rS;
    const dg = data[idx + 1] - gS;
    const db = data[idx + 2] - bS;
    const da = data[idx + 3] - aS;
    return dr * dr + dg * dg + db * db + da * da <= tolSq;
  }

  let minX = startX;
  let maxX = startX;
  let minY = startY;
  let maxY = startY;
  let filledCount = 0;

  const visited = new Uint8Array(width * height);
  const stack: [number, number][] = [[startX, startY]];

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const lineY = cy * width;
    if (visited[lineY + cx] || !matches((lineY + cx) * 4)) continue;

    let left = cx;
    while (left > 0 && !visited[line_y_prev(lineY, left)] && matches((lineY + left - 1) * 4)) {
      left--;
    }

    let right = cx;
    while (right < width - 1 && !visited[lineY + right + 1] && matches((lineY + right + 1) * 4)) {
      right++;
    }

    for (let x = left; x <= right; x++) {
      visited[lineY + x] = 1;
      if (!isMaskedOut(x, cy)) {
        const idx = (lineY + x) * 4;
        data[idx] = rF;
        data[idx + 1] = gF;
        data[idx + 2] = bF;
        data[idx + 3] = aF;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        filledCount++;
      }
    }

    for (const nextY of [cy - 1, cy + 1]) {
      if (nextY < 0 || nextY >= height) continue;
      const nextLine = nextY * width;
      let inSpan = false;

      for (let x = left; x <= right; x++) {
        const idx = (nextLine + x) * 4;
        const match = !visited[nextLine + x] && matches(idx);

        if (!inSpan && match) {
          stack.push([x, nextY]);
          inSpan = true;
        } else if (inSpan && !match) {
          inSpan = false;
        }
      }
    }
  }

  if (filledCount === 0) return null;

  ctx.putImageData(imgData, 0, 0);
  return { minX, minY, maxX, maxY, filledCount };
}

function line_y_prev(lineY: number, left: number): number {
  return lineY + left - 1;
}
