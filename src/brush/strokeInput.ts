import * as THREE from 'three';
import type { BrushEngine } from './brushEngine';
import { activeTool, getToolState, setTool, subscribeTools } from '../tools/toolState';

export interface StrokeInputOptions {
  canvas: HTMLCanvasElement;
  camera: THREE.OrthographicCamera;
  plane: THREE.Object3D;
  engine: BrushEngine;
  docW: number;
  docH: number;
  onPickColor?: (color: string) => void;
}

export interface StrokeInputHandle {
  dispose: () => void;
}

interface PointerLike {
  clientX: number;
  clientY: number;
  pressure: number;
}

export function attachStrokeInput(options: StrokeInputOptions): StrokeInputHandle {
  const { canvas, camera, plane, engine, docW, docH, onPickColor } = options;
  const raycaster = new THREE.Raycaster();
  const pointerVec = new THREE.Vector2();

  let activeStroke: 'brush' | 'eraser' | 'shape' | null = null;
  let activePointerId: number | null = null;

  // Pan / Navigation state
  let isSpacePressed = false;
  let activePan = false;
  let lastPanX = 0;
  let lastPanY = 0;

  // Smoothing state
  let smoothedX = 0;
  let smoothedY = 0;
  let rawLastX = 0;
  let rawLastY = 0;

  function updateCursor(): void {
    if (activePan) {
      canvas.style.cursor = 'grabbing';
    } else if (isSpacePressed || activeTool() === 'hand') {
      canvas.style.cursor = 'grab';
    } else if (activeTool() === 'eyedropper') {
      canvas.style.cursor = 'cell';
    } else {
      canvas.style.cursor = 'crosshair';
    }
  }

  const unsubscribe = subscribeTools(() => updateCursor());
  updateCursor();

  const pointerToDoc = (event: PointerLike): { x: number; y: number } | null => {
    const rect = canvas.getBoundingClientRect();
    pointerVec.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerVec.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerVec, camera);
    const hits = raycaster.intersectObject(plane, false);
    if (hits.length === 0 || !hits[0].uv) return null;
    return { x: hits[0].uv.x * docW, y: (1 - hits[0].uv.y) * docH };
  };

  const pressureOf = (event: PointerLike): number => (event.pressure > 0 ? event.pressure : 1);

  const finish = (pointerId?: number): void => {
    if (activeStroke === 'brush' || activeStroke === 'eraser') {
      // Flush final segment to raw release position
      const pressure = 0.5;
      if (activeStroke === 'eraser') {
        engine.continueErase(rawLastX, rawLastY, pressure);
      } else {
        engine.continueStroke(rawLastX, rawLastY, pressure);
      }
    }

    activeStroke = null;
    if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
      try {
        canvas.releasePointerCapture(pointerId);
      } catch {
        // Ignored
      }
    }
    activePointerId = null;
    engine.endStroke();
  };

  const onPointerDown = (event: PointerEvent): void => {
    // 1. Hand Tool / Spacebar Pan / Middle Click
    if (isSpacePressed || activeTool() === 'hand' || event.button === 1) {
      activePan = true;
      lastPanX = event.clientX;
      lastPanY = event.clientY;
      activePointerId = event.pointerId;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Ignored
      }
      updateCursor();
      return;
    }

    if (activeStroke) return;
    const tool = activeTool();
    const doc = pointerToDoc(event);
    if (!doc) return;

    if (tool === 'eyedropper') {
      const compCtx = engine.compositeCanvas.getContext('2d')!;
      const [r, g, b] = compCtx.getImageData(
        Math.floor(doc.x),
        Math.floor(doc.y),
        1,
        1,
      ).data;
      const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
      onPickColor?.(hex);
      return;
    }

    if (tool === 'bucket') {
      const { color, tolerance } = getToolState().brush;
      engine.fill(Math.floor(doc.x), Math.floor(doc.y), color, tolerance);
      return;
    }

    activePointerId = event.pointerId;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // Ignored
    }

    if (tool === 'shape') {
      activeStroke = 'shape';
      engine.beginShape(doc.x, doc.y);
      return;
    }

    smoothedX = doc.x;
    smoothedY = doc.y;
    rawLastX = doc.x;
    rawLastY = doc.y;

    const pressure = pressureOf(event);
    if (tool === 'eraser') {
      activeStroke = 'eraser';
      engine.beginErase(doc.x, doc.y, pressure);
    } else {
      activeStroke = 'brush';
      engine.beginStroke(doc.x, doc.y, pressure);
    }
  };

  const onPointerMove = (event: PointerEvent): void => {
    // Pan movement
    if (activePan) {
      const dx = event.clientX - lastPanX;
      const dy = event.clientY - lastPanY;
      lastPanX = event.clientX;
      lastPanY = event.clientY;

      const viewHeight = (camera.top - camera.bottom) / camera.zoom;
      const unitsPerPixel = viewHeight / window.innerHeight;

      camera.position.x -= dx * unitsPerPixel;
      camera.position.y += dy * unitsPerPixel;
      return;
    }

    if (!activeStroke) return;
    const doc = pointerToDoc(event);
    if (!doc) return;

    if (activeStroke === 'shape') {
      engine.updateShape(doc.x, doc.y);
      return;
    }

    rawLastX = doc.x;
    rawLastY = doc.y;

    const stab = getToolState().brush.stabilization;
    if (stab <= 0) {
      smoothedX = doc.x;
      smoothedY = doc.y;
    } else {
      // Exponential moving average filter for smooth stroke interpolation
      const alpha = 1 / (1 + stab * 0.35);
      smoothedX += (doc.x - smoothedX) * alpha;
      smoothedY += (doc.y - smoothedY) * alpha;
    }

    const pressure = pressureOf(event);
    if (activeStroke === 'eraser') {
      engine.continueErase(smoothedX, smoothedY, pressure);
    } else {
      engine.continueStroke(smoothedX, smoothedY, pressure);
    }
  };

  const onPointerEnd = (event: PointerEvent): void => {
    if (activePan) {
      activePan = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          // Ignored
        }
      }
      activePointerId = null;
      updateCursor();
      return;
    }

    if (!activeStroke) return;
    finish(event.pointerId);
  };

  // Wheel Zoom
  const onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.12 : 0.88;
    camera.zoom = Math.max(0.1, Math.min(25, camera.zoom * zoomFactor));
    camera.updateProjectionMatrix();
  };

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Space, B, E, I, G, U, H, Ctrl+0)
  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (event.code === 'Space' && !event.repeat) {
      event.preventDefault();
      isSpacePressed = true;
      updateCursor();
      return;
    }

    const isCtrl = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();

    if (isCtrl && key === 'z' && !event.shiftKey) {
      event.preventDefault();
      engine.undo();
      return;
    }

    if (isCtrl && (key === 'y' || (event.shiftKey && key === 'z'))) {
      event.preventDefault();
      engine.redo();
      return;
    }

    // Reset View
    if (isCtrl && key === '0') {
      event.preventDefault();
      camera.position.set(0, 0, 10);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      return;
    }

    if (!isCtrl && !event.altKey) {
      if (key === 'b') setTool('brush');
      else if (key === 'e') setTool('eraser');
      else if (key === 'i') setTool('eyedropper');
      else if (key === 'g') setTool('bucket');
      else if (key === 'u') setTool('shape');
      else if (key === 'h') setTool('hand');
    }
  };

  const onKeyUp = (event: KeyboardEvent): void => {
    if (event.code === 'Space') {
      isSpacePressed = false;
      updateCursor();
    }
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerEnd);
  canvas.addEventListener('pointercancel', onPointerEnd);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return {
    dispose: () => {
      unsubscribe();
      if (activeStroke) finish(activePointerId ?? undefined);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerEnd);
      canvas.removeEventListener('pointercancel', onPointerEnd);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
  };
}
