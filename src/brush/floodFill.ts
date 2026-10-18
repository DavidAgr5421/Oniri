export function floodFill(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillHex: string,
  tolerance = 20,
): void {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Parse fill hex to RGBA
  const rF = parseInt(fillHex.slice(1, 3), 16) || 0;
  const gF = parseInt(fillHex.slice(3, 5), 16) || 0;
  const bF = parseInt(fillHex.slice(5, 7), 16) || 0;
  const aF = 255;

  const startIdx = (startY * width + startX) * 4;
  const rS = data[startIdx];
  const gS = data[startIdx + 1];
  const bS = data[startIdx + 2];
  const aS = data[startIdx + 3];

  // Already identical color
  if (rS === rF && gS === gF && bS === bF && aS === aF) return;

  const tolSq = ((tolerance / 100) * 255) ** 2 * 3;

  function matches(idx: number): boolean {
    const dr = data[idx] - rS;
    const dg = data[idx + 1] - gS;
    const db = data[idx + 2] - bS;
    const da = data[idx + 3] - aS;
    return dr * dr + dg * dg + db * db + da * da <= tolSq;
  }

  function setPixel(idx: number): void {
    data[idx] = rF;
    data[idx + 1] = gF;
    data[idx + 2] = bF;
    data[idx + 3] = aF;
  }

  // Scanline Flood Fill with bitfield / visited table
  const visited = new Uint8Array(width * height);
  const stack: [number, number][] = [[startX, startY]];
  visited[startY * width + startX] = 1;

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const lineY = cy * width;

    let left = cx;
    while (left > 0) {
      const idx = (lineY + left - 1) * 4;
      if (visited[lineY + left - 1] || !matches(idx)) break;
      left--;
    }

    let right = cx;
    while (right < width - 1) {
      const idx = (lineY + right + 1) * 4;
      if (visited[lineY + right + 1] || !matches(idx)) break;
      right++;
    }

    for (let x = left; x <= right; x++) {
      visited[lineY + x] = 1;
      setPixel((lineY + x) * 4);
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

  ctx.putImageData(imgData, 0, 0);
}
