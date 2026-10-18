export type ShapeType = 'line' | 'rectangle' | 'ellipse';
export type ShapeFillMode = 'stroke' | 'fill';

export function drawShape(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  shape: ShapeType,
  fillMode: ShapeFillMode,
  strokeWidth: number,
  color: string,
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1, Math.round(strokeWidth));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  if (shape === 'line') {
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  } else if (shape === 'rectangle') {
    const left = Math.min(x0, x1);
    const top = Math.min(y0, y1);
    const width = Math.abs(x1 - x0);
    const height = Math.abs(y1 - y0);
    if (fillMode === 'fill') {
      ctx.fillRect(left, top, width, height);
    } else {
      ctx.strokeRect(left, top, width, height);
    }
  } else if (shape === 'ellipse') {
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    const rx = Math.abs(x1 - x0) / 2;
    const ry = Math.abs(y1 - y0) / 2;
    ctx.ellipse(cx, cy, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2);
    if (fillMode === 'fill') {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  ctx.restore();
}
