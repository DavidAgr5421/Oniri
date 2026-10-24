import { Vector3, type Camera } from 'three';
import { DOC_H, DOC_W } from '../brush/docConstants';

export interface DocRect {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const projVec = new Vector3();

/**
 * Maps a document pixel (0..DOC_W, 0..DOC_H) to client (viewport) coordinates
 * through the shared 16x9 canvas plane and the orthographic camera.
 */
export function projectDocToScreen(
  camera: Camera,
  canvas: HTMLCanvasElement,
  docX: number,
  docY: number,
): { x: number; y: number } {
  const uvX = docX / DOC_W;
  const uvY = 1 - docY / DOC_H;
  const worldX = (uvX - 0.5) * 16;
  const worldY = (uvY - 0.5) * 9;

  projVec.set(worldX, worldY, 0);
  projVec.project(camera);

  const rect = canvas.getBoundingClientRect();
  return {
    x: ((projVec.x + 1) / 2) * rect.width + rect.left,
    y: ((-projVec.y + 1) / 2) * rect.height + rect.top,
  };
}

/**
 * Floating launcher placement: anchor at the horizontal
 * center of the bounds, directly below `bbox.maxY`, then flip above the
 * selection when the bar would overflow the bottom of the viewport.
 * If the bounds fill the screen the bar is clamped to the inner bottom edge.
 */
export function placeLauncherNearBounds(
  bar: HTMLElement,
  camera: Camera,
  canvas: HTMLCanvasElement,
  bounds: DocRect,
  margin = 14,
): void {
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const below = projectDocToScreen(camera, canvas, centerX, bounds.maxY);
  const above = projectDocToScreen(camera, canvas, centerX, bounds.minY);

  const barW = bar.offsetWidth || 200;
  const barH = bar.offsetHeight || 34;
  const edge = 8;

  const flip = below.y + margin + barH > window.innerHeight - edge;
  const anchorY = flip ? above.y - margin - barH : below.y + margin;

  const minLeft = margin + barW / 2;
  const maxLeft = window.innerWidth - margin - barW / 2;
  const left = Math.max(minLeft, Math.min(maxLeft, below.x));

  bar.style.left = `${left}px`;
  bar.style.top = `${Math.max(margin, Math.min(window.innerHeight - barH - margin, anchorY))}px`;
  bar.style.transform = 'translate(-50%, 0)';
}
