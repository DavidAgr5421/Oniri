import * as THREE from 'three';
import type { BrushEngine } from './brushEngine';
import {
  activeTool,
  getTabletSettings,
  getToolState,
  setBrushSettings,
  setTool,
  subscribeTools,
  swapColors,
  toggleTransparentColor,
} from '../tools/toolState';
import { evaluatePressure, isPhysicalEraser, tiltFootprint } from './pressureResponse';
import { selectionModel } from '../selection/selectionModel';
import { marchingAnts } from '../selection/marchingAnts';
import { transformManager } from '../selection/transformGizmo';
import { isTransformModalLocked, warnTransformModalBlocked } from '../selection/transformModal';
import { viewportNav } from '../canvas/viewportNavigation';
import { brushSizeOverlay, eyedropperLoupeOverlay } from '../ui/canvasOverlays';

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
  pointerType?: string;
  tiltX?: number;
  tiltY?: number;
}

interface SmoothPoint {
  x: number;
  y: number;
  p: number;
}

const MIN_SAMPLE_DISTANCE = 0.25;
const CURVE_SUBDIVISIONS = 6;

function coalescedSamples(event: PointerEvent): PointerEvent[] {
  const fn = (event as PointerEvent & { getCoalescedEvents?: () => PointerEvent[] }).getCoalescedEvents;
  if (typeof fn !== 'function') return [event];
  try {
    const list = fn.call(event);
    return list && list.length > 0 ? list : [event];
  } catch {
    return [event];
  }
}

function predictedSamples(event: PointerEvent): PointerEvent[] {
  const fn = (event as PointerEvent & { getPredictedEvents?: () => PointerEvent[] }).getPredictedEvents;
  if (typeof fn !== 'function') return [];
  try {
    const list = fn.call(event);
    return list && list.length > 0 ? list : [];
  } catch {
    return [];
  }
}

/**
 * W3C Pointer Events: a pressed mouse always reports pressure 0.5. Forcing
 * that onto every mouse stroke made stamps semi-transparent (visible circles
 * on every tick), so the mouse gets full pressure and the starting/ending
 * tapers handle the finesse instead.
 *
 * For a physical pen stylus, we read the analog value (0.0 to 1.0) and pass
 * it through the device response curve (CSP Preferences > Tablet, REA study 5.3).
 * When the stylus is lifting or hovering, event.pressure drops naturally to 0.0,
 * which produces the authentic razor-sharp tapered ending ("抜き" - Nuki).
 */
function pressureOf(event: PointerLike, isStart = false): number {
  if (event.pointerType === 'pen') {
    let raw = typeof event.pressure === 'number' ? event.pressure : 0;
    // On pointerdown, if the stylus driver reports 0 on initial touch, give it a subtle starting touch (0.08)
    // instead of jumping to 0.5, so it starts as a sharp needle rather than a blunt dot.
    if (isStart && raw <= 0) {
      raw = 0.08;
    }
    return evaluatePressure(Math.max(0, Math.min(1, raw)), getTabletSettings().pressure);
  }
  return 1.0;
}

export function attachStrokeInput(options: StrokeInputOptions): StrokeInputHandle {
  const { canvas, camera, plane, engine, docW, docH, onPickColor } = options;
  const raycaster = new THREE.Raycaster();
  const pointerVec = new THREE.Vector2();

  let activeStroke:
    | 'brush'
    | 'eraser'
    | 'shape'
    | 'bone'
    | 'select'
    | 'mask-move'
    | 'transform'
    | 'bucket-enclose'
    | 'bucket-unfilled'
    | null = null;
  let activePointerId: number | null = null;
  let lastPointerType = 'mouse';
  let encloseLassoPoints: { x: number; y: number }[] = [];
  let unfilledBrushPoints: { x: number; y: number }[] = [];

  // Selection drag state
  let selectionDragState: {
    type: 'rect' | 'ellipse' | 'lasso' | 'poly';
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    points: { x: number; y: number }[];
    combineMode: 'replace' | 'add' | 'subtract';
  } | null = null;

  // Selection mask move state (drag inside an existing selection)
  let maskMoveStart: { x: number; y: number } | null = null;

  // Bone drag state
  let boneDragState: {
    kind: 'rig_tail' | 'rig_head' | 'pose_fk_rotate' | 'pose_fk_move' | 'pose_ik';
    boneId: string;
    startDocX: number;
    startDocY: number;
    headX: number;
    headY: number;
    startAngleDeg: number;
    startDRotation: number;
    startDX: number;
    startDY: number;
  } | null = null;

  // Pan & Rotate Navigation state
  let isSpacePressed = false;
  let isRPressed = false;
  let activePan = false;
  let activeRotate = false;
  let lastPanX = 0;
  let lastPanY = 0;
  let rotStartAngle = 0;
  let rotStartCanvasAngle = 0;

  // CSP Ergonomic Modifier States (Ctrl+Alt+Drag Brush Resize & Alt Eyedropper)
  let isCtrlAltPressed = false;
  let isAltPressed = false;
  let isResizingBrush = false;
  let isSamplingEyedropper = false;
  let resizeStartX = 0;
  let resizeStartY = 0;
  let resizeStartSize = 20;
  let initialSampledColor = '#000000';

  // Smoothing state
  let smoothedX = 0;
  let smoothedY = 0;
  let rawLastX = 0;
  let rawLastY = 0;

  // Stroke shaping state (quadratic Bezier smoothing + ending tail)
  let smoothHist: SmoothPoint[] = [];
  let velX = 0;
  let velY = 0;
  let lastSamplePressure = 1;

  function updateCursor(): void {
    if (activePan) {
      canvas.style.cursor = 'grabbing';
    } else if (activeRotate || isRPressed || activeTool() === 'rotate') {
      canvas.style.cursor = 'ew-resize';
    } else if (isResizingBrush || isCtrlAltPressed) {
      canvas.style.cursor = 'crosshair';
    } else if (isSamplingEyedropper || isAltPressed || activeTool() === 'eyedropper') {
      canvas.style.cursor = 'cell';
    } else if (isSpacePressed || activeTool() === 'hand') {
      canvas.style.cursor = 'grab';
    } else if (activeTool() === 'bone') {
      canvas.style.cursor = 'pointer';
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

  const emitTo = (x: number, y: number, pressure: number): void => {
    if (activeStroke === 'eraser') {
      engine.continueErase(x, y, pressure);
    } else if (activeStroke === 'brush') {
      engine.continueStroke(x, y, pressure);
    }
  };

  /**
   * Feeds the pen lean of a sample into the engine (REA study 5.1). Everything
   * that is not an active ink stroke with tilt enabled drops back to an
   * upright nib, so the last tilt of a stroke can never leak into the next one.
   */
  const applyTiltFrom = (event: PointerLike): void => {
    const tablet = getTabletSettings();
    if (
      !tablet.tiltEnabled ||
      event.pointerType !== 'pen' ||
      (activeStroke !== 'brush' && activeStroke !== 'eraser')
    ) {
      engine.setStrokeTilt(null);
      return;
    }
    engine.setStrokeTilt(tiltFootprint(event.tiltX ?? 0, event.tiltY ?? 0, tablet.tiltAmount));
  };

  /**
   * Keeps the last 3 smoothed points and emits a quadratic Bezier piece from
   * the midpoint of (p0,p1) to the midpoint of (p1,p2), with p1 as control.
   * Each new point continues exactly where the previous one ended, so there
   * are no polygonal corners when the pointer moves fast.
   */
  const pushSmoothed = (x: number, y: number, p: number): void => {
    const pt: SmoothPoint = { x, y, p };
    if (smoothHist.length === 0) {
      smoothHist.push(pt);
      return;
    }

    const p1 = smoothHist[smoothHist.length - 1];
    const p0 = smoothHist.length >= 2 ? smoothHist[smoothHist.length - 2] : smoothHist[0];
    const m1x = (p0.x + p1.x) / 2;
    const m1y = (p0.y + p1.y) / 2;
    const m1p = (p0.p + p1.p) / 2;
    const m2x = (p1.x + pt.x) / 2;
    const m2y = (p1.y + pt.y) / 2;
    const m2p = (p1.p + pt.p) / 2;

    for (let i = 1; i <= CURVE_SUBDIVISIONS; i++) {
      const t = i / CURVE_SUBDIVISIONS;
      const mt = 1 - t;
      const qx = mt * mt * m1x + 2 * mt * t * p1.x + t * t * m2x;
      const qy = mt * mt * m1y + 2 * mt * t * p1.y + t * t * m2y;
      const qp = m1p + (m2p - m1p) * t;
      emitTo(qx, qy, qp);
    }

    smoothHist.push(pt);
    if (smoothHist.length > 3) smoothHist.shift();
  };

  const handleStrokePoint = (doc: { x: number; y: number }, pressure: number): void => {
    const dxr = doc.x - rawLastX;
    const dyr = doc.y - rawLastY;
    // Ignore sub-pixel jitter: otherwise a resting mouse keeps stacking
    // stamps in the same spot (the "repeated seal" artifact).
    if (Math.hypot(dxr, dyr) < MIN_SAMPLE_DISTANCE) return;

    velX = velX * 0.55 + dxr * 0.45;
    velY = velY * 0.55 + dyr * 0.45;
    rawLastX = doc.x;
    rawLastY = doc.y;
    lastSamplePressure = pressure;

    const speed = Math.hypot(velX, velY);
    engine.setStrokeSpeed(speed);

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

    pushSmoothed(smoothedX, smoothedY, pressure);
  };

  const finish = (pointerId?: number): void => {
    if (activeStroke === 'bucket-enclose') {
      activeStroke = null;
      marchingAnts.overlayCtx.clearRect(0, 0, docW, docH);
      marchingAnts.markDirty();
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      if (encloseLassoPoints.length >= 3) {
        const { color, tolerance } = getToolState().brush;
        engine.encloseAndFill(encloseLassoPoints, color, tolerance);
      }
      encloseLassoPoints = [];
      return;
    }

    if (activeStroke === 'bucket-unfilled') {
      activeStroke = null;
      marchingAnts.overlayCtx.clearRect(0, 0, docW, docH);
      marchingAnts.markDirty();
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      if (unfilledBrushPoints.length > 0) {
        const { color, tolerance, size } = getToolState().brush;
        const rad = Math.max(6, (size || 28) / 2);
        engine.paintUnfilledArea(unfilledBrushPoints, rad, color, tolerance);
      }
      unfilledBrushPoints = [];
      return;
    }

    if (activeStroke === 'transform') {
      transformManager.handlePointerUp();
      activeStroke = null;
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      return;
    }

    if (activeStroke === 'mask-move') {
      selectionModel.endMoveMask();
      maskMoveStart = null;
      activeStroke = null;
      updateCursor();
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      return;
    }

    if (activeStroke === 'select') {
      if (selectionDragState) {
        const { type, startX, startY, currentX, currentY, points, combineMode } = selectionDragState;
        const dist = Math.hypot(currentX - startX, currentY - startY);

        if (type === 'poly') {
          // Keep polyline active for next clicks until closed or double-clicked
          if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
            try {
              canvas.releasePointerCapture(pointerId);
            } catch {
              // ignore
            }
          }
          activePointerId = null;
          activeStroke = null;
          return;
        }

        if (dist < 4 && type !== 'lasso') {
          // Clicked without dragging: if combineMode is 'replace', deselect!
          if (combineMode === 'replace') {
            selectionModel.clearSelection();
          }
        } else if (type === 'rect') {
          selectionModel.selectRect(startX, startY, currentX - startX, currentY - startY, combineMode);
        } else if (type === 'ellipse') {
          selectionModel.selectEllipse(
            (startX + currentX) / 2,
            (startY + currentY) / 2,
            Math.abs(currentX - startX) / 2,
            Math.abs(currentY - startY) / 2,
            combineMode,
          );
        } else if (type === 'lasso') {
          if (points.length >= 3) {
            selectionModel.selectPolygon(points, combineMode);
          }
        }
      }

      selectionDragState = null;
      marchingAnts.setDragPreview(null);
      activeStroke = null;
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
        try {
          canvas.releasePointerCapture(pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      return;
    }

    const wasBone = activeStroke === 'bone';
    if (activeStroke === 'brush' || activeStroke === 'eraser') {
      // Stabilizer catch-up: smoothly pull the smoothed curve toward the raw release
      // point so the stroke doesn't stop short of the cursor, tapering pressure
      // naturally for stylus pen lifts ("抜き" - Nuki, sharp ending).
      const stab = getToolState().brush.stabilization;
      if (stab > 0) {
        const steps = 3;
        const startX = smoothedX;
        const startY = smoothedY;
        const startP = lastSamplePressure;
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const cx = startX + (rawLastX - startX) * t;
          const cy = startY + (rawLastY - startY) * t;
          const cp = lastPointerType === 'pen' ? startP * Math.pow(1 - t, 1.5) : startP;
          pushSmoothed(cx, cy, cp);
        }
        smoothedX = rawLastX;
        smoothedY = rawLastY;
      } else {
        smoothedX = rawLastX;
        smoothedY = rawLastY;
        const cp = lastPointerType === 'pen' ? 0 : lastSamplePressure;
        pushSmoothed(smoothedX, smoothedY, cp);
      }
    }

    activeStroke = null;
    boneDragState = null;
    engine.clearPredictedStroke();
    if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) {
      try {
        canvas.releasePointerCapture(pointerId);
      } catch {
        // Ignored
      }
    }
    activePointerId = null;
    if (!wasBone) {
      engine.endStroke({ vx: velX, vy: velY, isMouse: lastPointerType !== 'pen' });
    }
  };

  const onPointerDown = (event: PointerEvent): void => {
    // 0a. Dynamic Brush Sizing (Ctrl+Alt+Drag)
    if ((event.ctrlKey || event.metaKey) && event.altKey) {
      isResizingBrush = true;
      activePointerId = event.pointerId;
      resizeStartX = event.clientX;
      resizeStartY = event.clientY;
      resizeStartSize = getToolState().brush.size || 20;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // ignore
      }

      const viewHeight = (camera.top - camera.bottom) / camera.zoom;
      const unitsPerPixel = viewHeight / window.innerHeight;
      const docToScreenScale = (9.0 / docH) / unitsPerPixel;
      const screenRadius = (resizeStartSize / 2) * docToScreenScale;
      brushSizeOverlay.show(resizeStartX, resizeStartY, screenRadius, resizeStartSize);
      updateCursor();
      return;
    }

    // 0b. Temporary Eyedropper (Hold Alt)
    if (event.altKey && !event.ctrlKey && !event.metaKey) {
      isSamplingEyedropper = true;
      activePointerId = event.pointerId;
      initialSampledColor = getToolState().brush.color;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // ignore
      }

      const doc = pointerToDoc(event);
      if (doc) {
        const compCtx = engine.compositeCanvas.getContext('2d')!;
        const px = Math.max(0, Math.min(docW - 1, Math.floor(doc.x)));
        const py = Math.max(0, Math.min(docH - 1, Math.floor(doc.y)));
        const [r, g, b] = compCtx.getImageData(px, py, 1, 1).data;
        const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
        setBrushSettings({ color: hex });
        onPickColor?.(hex);
        eyedropperLoupeOverlay.show(event.clientX, event.clientY, hex, initialSampledColor);
      }
      updateCursor();
      return;
    }

    // 0c. Rotate Tool / Holding R / Space + Shift
    if (activeTool() === 'rotate' || isRPressed || (isSpacePressed && event.shiftKey)) {
      activeRotate = true;
      activePointerId = event.pointerId;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rotStartAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      rotStartCanvasAngle = viewportNav.getState().rotation;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Ignored
      }
      updateCursor();
      return;
    }

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

    if (transformManager.isTransforming()) {
      // CSP modal state: the gizmo owns the pointer. Drawing tools, fills and
      // new selections stay blocked until confirm/cancel (REA study, 2.1).
      const handled = transformManager.handlePointerDown(doc.x, doc.y, event);
      if (handled) {
        activePointerId = event.pointerId;
        lastPointerType = event.pointerType || 'mouse';
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
        activeStroke = 'transform';
      }
      return;
    }

    // Physical eraser tip (REA study 5.4): erases with the current sub tool
    // settings without touching the selected tool, and restores it as soon as
    // the pen is flipped back.
    if (isPhysicalEraser(event)) {
      activePointerId = event.pointerId;
      lastPointerType = event.pointerType || 'pen';
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Ignored
      }
      const erasePressure = pressureOf(event, true);
      smoothedX = doc.x;
      smoothedY = doc.y;
      rawLastX = doc.x;
      rawLastY = doc.y;
      lastSamplePressure = erasePressure;
      velX = 0;
      velY = 0;
      smoothHist = [{ x: doc.x, y: doc.y, p: erasePressure }];
      activeStroke = 'eraser';
      applyTiltFrom(event);
      engine.beginErase(doc.x, doc.y, erasePressure);
      return;
    }

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
      const subId = getToolState().activeSubToolId;
      if (subId === 'bucket-enclose') {
        activePointerId = event.pointerId;
        lastPointerType = event.pointerType || 'mouse';
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
        activeStroke = 'bucket-enclose';
        encloseLassoPoints = [{ x: doc.x, y: doc.y }];
        return;
      }

      if (subId === 'bucket-unfilled') {
        activePointerId = event.pointerId;
        lastPointerType = event.pointerType || 'mouse';
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
        activeStroke = 'bucket-unfilled';
        unfilledBrushPoints = [{ x: doc.x, y: doc.y }];
        return;
      }

      const { color, tolerance } = getToolState().brush;
      engine.fill(Math.floor(doc.x), Math.floor(doc.y), color, tolerance);
      return;
    }

    if (tool === 'select') {
      const subId = getToolState().activeSubToolId;
      let selType: 'rect' | 'ellipse' | 'lasso' | 'poly' = 'rect';
      if (subId === 'select-ellipse') selType = 'ellipse';
      else if (subId === 'select-lasso') selType = 'lasso';
      else if (subId === 'select-poly') selType = 'poly';

      let combineMode = getToolState().selectionCombineMode;
      if (event.shiftKey) combineMode = 'add';
      else if (event.altKey) combineMode = 'subtract';

      // Drag inside an existing selection moves only the selection tent
      // (CSP "move selection", REA study 4.1). Modifiers still create a new
      // combined selection instead.
      if (
        !event.shiftKey &&
        !event.altKey &&
        combineMode === 'replace' &&
        selectionModel.isPointInsideSelection(doc.x, doc.y) &&
        selectionModel.beginMoveMask()
      ) {
        activePointerId = event.pointerId;
        lastPointerType = event.pointerType || 'mouse';
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          // Ignored
        }
        activeStroke = 'mask-move';
        maskMoveStart = { x: doc.x, y: doc.y };
        canvas.style.cursor = 'move';
        return;
      }

      activePointerId = event.pointerId;
      lastPointerType = event.pointerType || 'mouse';
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Ignored
      }
      activeStroke = 'select';

      if (selType === 'poly' && selectionDragState && selectionDragState.type === 'poly') {
        const firstPt = selectionDragState.points[0];
        const distToFirst = firstPt ? Math.hypot(doc.x - firstPt.x, doc.y - firstPt.y) : 999;
        if (selectionDragState.points.length >= 3 && distToFirst < 16) {
          selectionModel.selectPolygon(selectionDragState.points, selectionDragState.combineMode);
          selectionDragState = null;
          marchingAnts.setDragPreview(null);
          activeStroke = null;
          return;
        }
        selectionDragState.points.push({ x: doc.x, y: doc.y });
        selectionDragState.currentX = doc.x;
        selectionDragState.currentY = doc.y;
        marchingAnts.setDragPreview(selectionDragState);
        return;
      }

      selectionDragState = {
        type: selType,
        startX: doc.x,
        startY: doc.y,
        currentX: doc.x,
        currentY: doc.y,
        points: [{ x: doc.x, y: doc.y }],
        combineMode,
      };
      marchingAnts.setDragPreview(selectionDragState);
      return;
    }

    if (tool === 'bone') {
      const tm = engine.getTimelineManager();
      if (!tm) return;
      const boneMode = getToolState().boneMode;
      const hit = tm.hitTestBoneAtWorld(doc.x, doc.y, tm.settings.currentFrame);

      activePointerId = event.pointerId;
      lastPointerType = event.pointerType || 'mouse';
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Ignored
      }
      activeStroke = 'bone';

      if (boneMode === 'rig') {
        if (hit && !event.shiftKey) {
          tm.selectBone(hit.bone.id);
          if (hit.part === 'tail') {
            boneDragState = {
              kind: 'rig_tail',
              boneId: hit.bone.id,
              startDocX: doc.x,
              startDocY: doc.y,
              headX: hit.evalBone.headX,
              headY: hit.evalBone.headY,
              startAngleDeg: 0,
              startDRotation: 0,
              startDX: 0,
              startDY: 0,
            };
          } else {
            boneDragState = {
              kind: 'rig_head',
              boneId: hit.bone.id,
              startDocX: doc.x,
              startDocY: doc.y,
              headX: hit.evalBone.headX,
              headY: hit.evalBone.headY,
              startAngleDeg: 0,
              startDRotation: 0,
              startDX: hit.evalBone.headX - doc.x,
              startDY: hit.evalBone.headY - doc.y,
            };
          }
        } else {
          // Create new bone (if Shift+click on a bone tail, chain from its tail; if Alt, root bone; else parent to selectedBoneId)
          const parentId = hit
            ? hit.bone.id
            : event.altKey
              ? null
              : tm.selectedBoneId;
          const startX = hit && hit.part === 'tail' ? hit.evalBone.tailX : doc.x;
          const startY = hit && hit.part === 'tail' ? hit.evalBone.tailY : doc.y;
          const created = tm.createBoneFromWorld(startX, startY, doc.x + 24, doc.y, parentId);
          boneDragState = {
            kind: 'rig_tail',
            boneId: created.id,
            startDocX: startX,
            startDocY: startY,
            headX: startX,
            headY: startY,
            startAngleDeg: 0,
            startDRotation: 0,
            startDX: 0,
            startDY: 0,
          };
        }
        return;
      }

      if (boneMode === 'pose_fk') {
        if (!hit) {
          tm.selectBone(null);
          return;
        }
        tm.selectBone(hit.bone.id);
        const poses = tm.getInterpolatedBonePoses(tm.settings.currentFrame);
        const curDelta = poses.get(hit.bone.id) ?? {
          dX: 0,
          dY: 0,
          dRotation: 0,
          dScaleX: 1,
          dScaleY: 1,
        };
        if ((hit.part === 'head' && !hit.bone.parentId) || event.shiftKey) {
          boneDragState = {
            kind: 'pose_fk_move',
            boneId: hit.bone.id,
            startDocX: doc.x,
            startDocY: doc.y,
            headX: hit.evalBone.headX,
            headY: hit.evalBone.headY,
            startAngleDeg: 0,
            startDRotation: curDelta.dRotation,
            startDX: curDelta.dX,
            startDY: curDelta.dY,
          };
        } else {
          const startAngleDeg =
            (Math.atan2(doc.y - hit.evalBone.headY, doc.x - hit.evalBone.headX) * 180) / Math.PI;
          boneDragState = {
            kind: 'pose_fk_rotate',
            boneId: hit.bone.id,
            startDocX: doc.x,
            startDocY: doc.y,
            headX: hit.evalBone.headX,
            headY: hit.evalBone.headY,
            startAngleDeg,
            startDRotation: curDelta.dRotation,
            startDX: curDelta.dX,
            startDY: curDelta.dY,
          };
        }
        return;
      }

      if (boneMode === 'pose_ik') {
        const targetBoneId = hit ? hit.bone.id : tm.selectedBoneId;
        if (!targetBoneId) return;
        tm.selectBone(targetBoneId);
        boneDragState = {
          kind: 'pose_ik',
          boneId: targetBoneId,
          startDocX: doc.x,
          startDocY: doc.y,
          headX: doc.x,
          headY: doc.y,
          startAngleDeg: 0,
          startDRotation: 0,
          startDX: 0,
          startDY: 0,
        };
        tm.applyTwoBoneIKAtFrame(tm.settings.currentFrame, targetBoneId, doc.x, doc.y);
        return;
      }
      return;
    }

    activePointerId = event.pointerId;
    lastPointerType = event.pointerType || 'mouse';
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

    const pressure = pressureOf(event, true);
    smoothedX = doc.x;
    smoothedY = doc.y;
    rawLastX = doc.x;
    rawLastY = doc.y;
    lastSamplePressure = pressure;
    velX = 0;
    velY = 0;
    smoothHist = [{ x: doc.x, y: doc.y, p: pressure }];

    const isErase = tool === 'eraser' || getToolState().isTransparentColor;
    activeStroke = isErase ? 'eraser' : 'brush';
    applyTiltFrom(event);
    if (isErase) {
      engine.beginErase(doc.x, doc.y, pressure);
    } else {
      engine.beginStroke(doc.x, doc.y, pressure);
    }
  };

  const onPointerMove = (event: PointerEvent): void => {
    // Dynamic brush resize movement (Ctrl+Alt+Drag)
    if (isResizingBrush) {
      const dx = event.clientX - resizeStartX;
      const step = resizeStartSize < 20 ? 0.35 : 0.8;
      const newSize = Math.max(0.5, Math.min(500, Math.round((resizeStartSize + dx * step) * 2) / 2));
      setBrushSettings({ size: newSize });

      const viewHeight = (camera.top - camera.bottom) / camera.zoom;
      const unitsPerPixel = viewHeight / window.innerHeight;
      const docToScreenScale = (9.0 / docH) / unitsPerPixel;
      const screenRadius = (newSize / 2) * docToScreenScale;
      brushSizeOverlay.show(resizeStartX, resizeStartY, screenRadius, newSize);
      return;
    }

    // Dynamic eyedropper sampling movement (Hold Alt)
    if (isSamplingEyedropper) {
      const doc = pointerToDoc(event);
      if (doc) {
        const compCtx = engine.compositeCanvas.getContext('2d')!;
        const px = Math.max(0, Math.min(docW - 1, Math.floor(doc.x)));
        const py = Math.max(0, Math.min(docH - 1, Math.floor(doc.y)));
        const [r, g, b] = compCtx.getImageData(px, py, 1, 1).data;
        const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
        setBrushSettings({ color: hex });
        onPickColor?.(hex);
        eyedropperLoupeOverlay.show(event.clientX, event.clientY, hex, initialSampledColor);
      }
      return;
    }

    // Rotate movement
    if (activeRotate) {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      const angleDelta = currentAngle - rotStartAngle;
      let targetAngle = rotStartCanvasAngle + angleDelta;

      if (event.shiftKey) {
        // Snap to nearest 15 degrees
        const deg = (targetAngle * 180) / Math.PI;
        const snappedDeg = Math.round(deg / 15) * 15;
        targetAngle = (snappedDeg * Math.PI) / 180;
      }
      viewportNav.setRotation(targetAngle);
      return;
    }

    // Pan movement
    if (activePan) {
      const dx = event.clientX - lastPanX;
      const dy = event.clientY - lastPanY;
      lastPanX = event.clientX;
      lastPanY = event.clientY;

      viewportNav.panByScreenDelta(dx, dy);
      return;
    }

    if (!activeStroke) return;

    if (activeStroke === 'bone') {
      const tm = engine.getTimelineManager();
      const doc = pointerToDoc(event);
      if (!tm || !doc || !boneDragState) return;

      if (boneDragState.kind === 'rig_tail') {
        tm.updateBoneEndpointWorld(boneDragState.boneId, doc.x, doc.y);
      } else if (boneDragState.kind === 'rig_head') {
        tm.moveBoneHeadWorld(
          boneDragState.boneId,
          doc.x + boneDragState.startDX,
          doc.y + boneDragState.startDY,
        );
      } else if (boneDragState.kind === 'pose_fk_move') {
        tm.setBonePoseAtFrame(tm.settings.currentFrame, boneDragState.boneId, {
          dX: boneDragState.startDX + (doc.x - boneDragState.startDocX),
          dY: boneDragState.startDY + (doc.y - boneDragState.startDocY),
        });
      } else if (boneDragState.kind === 'pose_fk_rotate') {
        const curAngleDeg =
          (Math.atan2(doc.y - boneDragState.headY, doc.x - boneDragState.headX) * 180) / Math.PI;
        let deltaDeg = curAngleDeg - boneDragState.startAngleDeg;
        while (deltaDeg > 180) deltaDeg -= 360;
        while (deltaDeg < -180) deltaDeg += 360;
        tm.setBonePoseAtFrame(tm.settings.currentFrame, boneDragState.boneId, {
          dRotation: Math.round((boneDragState.startDRotation + deltaDeg) * 10) / 10,
        });
      } else if (boneDragState.kind === 'pose_ik') {
        tm.applyTwoBoneIKAtFrame(tm.settings.currentFrame, boneDragState.boneId, doc.x, doc.y);
      }
      return;
    }

    if (activeStroke === 'bucket-enclose') {
      const doc = pointerToDoc(event);
      if (doc) {
        encloseLassoPoints.push({ x: doc.x, y: doc.y });
        const ctx = marchingAnts.overlayCtx;
        ctx.clearRect(0, 0, docW, docH);
        ctx.save();
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 5]);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.14)';
        ctx.beginPath();
        ctx.moveTo(encloseLassoPoints[0].x, encloseLassoPoints[0].y);
        for (let i = 1; i < encloseLassoPoints.length; i++) {
          ctx.lineTo(encloseLassoPoints[i].x, encloseLassoPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        marchingAnts.markDirty();
      }
      return;
    }

    if (activeStroke === 'bucket-unfilled') {
      const doc = pointerToDoc(event);
      if (doc) {
        unfilledBrushPoints.push({ x: doc.x, y: doc.y });
        const rad = Math.max(6, (getToolState().brush.size || 28) / 2);
        const ctx = marchingAnts.overlayCtx;
        ctx.clearRect(0, 0, docW, docH);
        ctx.save();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = rad * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(unfilledBrushPoints[0].x, unfilledBrushPoints[0].y);
        for (let i = 1; i < unfilledBrushPoints.length; i++) {
          ctx.lineTo(unfilledBrushPoints[i].x, unfilledBrushPoints[i].y);
        }
        ctx.stroke();
        ctx.restore();
        marchingAnts.markDirty();
      }
      return;
    }

    if (activeStroke === 'transform') {
      const doc = pointerToDoc(event);
      if (doc) transformManager.handlePointerMove(doc.x, doc.y, event);
      return;
    }

    if (activeStroke === 'mask-move') {
      const doc = pointerToDoc(event);
      if (doc && maskMoveStart) {
        selectionModel.moveMaskBy(doc.x - maskMoveStart.x, doc.y - maskMoveStart.y);
      }
      return;
    }

    if (activeStroke === 'select') {
      const doc = pointerToDoc(event);
      if (!doc || !selectionDragState) return;
      selectionDragState.currentX = doc.x;
      selectionDragState.currentY = doc.y;

      if (selectionDragState.type === 'lasso') {
        const pts = selectionDragState.points;
        const lastPt = pts[pts.length - 1];
        if (!lastPt || Math.hypot(doc.x - lastPt.x, doc.y - lastPt.y) > 3) {
          pts.push({ x: doc.x, y: doc.y });
        }
      }
      marchingAnts.setDragPreview(selectionDragState);
      return;
    }

    if (activeStroke === 'shape') {
      const doc = pointerToDoc(event);
      if (doc) engine.updateShape(doc.x, doc.y);
      return;
    }

    // High-frequency samples (coalesced) are fed one by one so no input
    // resolution is lost between two pointermove events.
    for (const sample of coalescedSamples(event)) {
      applyTiltFrom(sample);
      const doc = pointerToDoc(sample);
      if (!doc) continue;
      handleStrokePoint(doc, pressureOf(sample));
    }

    // Zero-latency prediction (W3C getPredictedEvents + velocity projection):
    // Renders the predicted next 1-2 points right under the physical pen nib
    // on a live overlay without altering the permanent stroke buffer.
    if (activeStroke === 'brush' || activeStroke === 'eraser') {
      const pred = predictedSamples(event);
      const predictedPoints: { x: number; y: number; pressure: number }[] = [];
      if (pred.length > 0) {
        for (const p of pred) {
          const pdoc = pointerToDoc(p);
          if (pdoc) {
            predictedPoints.push({ x: pdoc.x, y: pdoc.y, pressure: pressureOf(p) });
          }
        }
      } else if (Math.hypot(velX, velY) > 1.5) {
        // Micro-prediction along velocity vector (1 step) for mouse and standard styluses
        predictedPoints.push({
          x: rawLastX + velX * 0.5,
          y: rawLastY + velY * 0.5,
          pressure: lastSamplePressure,
        });
      }
      if (predictedPoints.length > 0) {
        engine.renderPredictedStroke(predictedPoints);
      } else {
        engine.clearPredictedStroke();
      }
    }
  };

  const onPointerEnd = (event: PointerEvent): void => {
    if (isResizingBrush) {
      isResizingBrush = false;
      brushSizeOverlay.hide();
      if (canvas.hasPointerCapture(event.pointerId)) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      updateCursor();
      return;
    }

    if (isSamplingEyedropper) {
      isSamplingEyedropper = false;
      eyedropperLoupeOverlay.hide();
      if (canvas.hasPointerCapture(event.pointerId)) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }
      activePointerId = null;
      updateCursor();
      return;
    }

    if (activeRotate) {
      activeRotate = false;
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

  // Wheel Zoom (Focal Zoom at cursor)
  const onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.15 : 0.85;
    const currentZoom = viewportNav.getState().zoom;
    viewportNav.setZoom(currentZoom * zoomFactor, event.clientX, event.clientY);
  };

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Space, B, E, I, G, U, H, J, Ctrl+0)
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

    // Bracket keys [ and ] for discrete brush size steps (CSP standard)
    if (event.key === '[' || event.key === ']') {
      event.preventDefault();
      const SIZES = [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 120, 150, 200, 250, 300, 400, 500];
      const curSize = getToolState().brush.size || 20;
      let targetSize = curSize;
      if (event.key === '[') {
        targetSize = SIZES.slice().reverse().find((s) => s < curSize) ?? SIZES[0];
      } else {
        targetSize = SIZES.find((s) => s > curSize) ?? SIZES[SIZES.length - 1];
      }
      setBrushSettings({ size: targetSize });
      viewportNav.showHUD(`Pincel: ${targetSize} px`);
      return;
    }

    // Dynamic modifier tracking (Alt for Eyedropper, Ctrl+Alt for Brush sizing)
    if (event.key === 'Alt') {
      event.preventDefault(); // Prevents Windows browser from unfocusing to window bar
      isAltPressed = true;
      isCtrlAltPressed = event.ctrlKey || event.metaKey;
      updateCursor();
    } else if (event.key === 'Control') {
      isCtrlAltPressed = event.altKey;
      updateCursor();
    }

    if (event.defaultPrevented) return;

    const isCtrl = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();

    // CSP modal transform state (REA study, 2.1): only confirm / cancel / the
    // transform toggle itself may run. Every other command is refused.
    if (isTransformModalLocked()) {
      if (event.key === 'Enter' || event.key === 'NumpadEnter') {
        event.preventDefault();
        transformManager.commitTransform();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        transformManager.cancelTransform();
      } else if (isCtrl && key === 't') {
        event.preventDefault();
        transformManager.commitTransform();
      } else if (isCtrl && key === 'z' && !event.shiftKey) {
        // CSP: undo while transforming discards the in-flight transform
        event.preventDefault();
        transformManager.cancelTransform();
      } else if (!isSpacePressed && !['control', 'meta', 'shift', 'alt'].includes(key)) {
        warnTransformModalBlocked('Transformación activa');
      }
      return;
    }

    // Temporary hold R for rotating
    if (key === 'r' && !isCtrl && !event.altKey && !event.repeat) {
      isRPressed = true;
      updateCursor();
    }

    if (event.key === 'Enter' && transformManager.isTransforming()) {
      event.preventDefault();
      transformManager.commitTransform();
      return;
    }

    if (event.key === 'Escape' && transformManager.isTransforming()) {
      event.preventDefault();
      transformManager.cancelTransform();
      return;
    }

    // Arrow-key nudge of the selection tent (1px, or 10px with Shift)
    if (
      !isCtrl &&
      !event.altKey &&
      activeTool() === 'select' &&
      selectionModel.hasSelection() &&
      (event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      const step = event.shiftKey ? 10 : 1;
      if (event.key === 'ArrowUp') selectionModel.nudgeMask(0, -step);
      else if (event.key === 'ArrowDown') selectionModel.nudgeMask(0, step);
      else if (event.key === 'ArrowLeft') selectionModel.nudgeMask(-step, 0);
      else selectionModel.nudgeMask(step, 0);
      return;
    }

    if (!isCtrl && !event.altKey) {
      if (key === 'p') setTool('pen');
      else if (key === 'b') setTool('brush');
      else if (key === 'd') setTool('effect');
      else if (key === 'e') setTool('eraser');
      else if (key === 'm') setTool('select');
      else if (key === 'i') setTool('eyedropper');
      else if (key === 'g') setTool('bucket');
      else if (key === 'u') setTool('shape');
      else if (key === 'j') setTool('bone');
      else if (key === 'h') setTool('hand');
      else if (key === 'r') setTool('rotate');
      else if (key === 'x') swapColors();
      else if (key === 'c') toggleTransparentColor();
    }
  };

  const onKeyUp = (event: KeyboardEvent): void => {
    if (event.code === 'Space') {
      isSpacePressed = false;
      updateCursor();
    }
    if (event.code === 'KeyR' || event.key.toLowerCase() === 'r') {
      isRPressed = false;
      updateCursor();
    }
    if (event.key === 'Alt') {
      isAltPressed = false;
      isCtrlAltPressed = false;
      if (isSamplingEyedropper) {
        isSamplingEyedropper = false;
        eyedropperLoupeOverlay.hide();
      }
      updateCursor();
    }
    if (event.key === 'Control') {
      isCtrlAltPressed = false;
      if (isResizingBrush) {
        isResizingBrush = false;
        brushSizeOverlay.hide();
      }
      updateCursor();
    }
  };

  const onDblClick = (): void => {
    // CSP: double click on the canvas commits an active transform
    if (transformManager.isTransforming()) {
      transformManager.commitTransform();
      return;
    }
    if (activeTool() === 'rotate' || isRPressed) {
      viewportNav.resetRotation();
      return;
    }
    if (activeTool() === 'hand' || isSpacePressed) {
      viewportNav.resetView();
      return;
    }
    if (selectionDragState && selectionDragState.type === 'poly') {
      if (selectionDragState.points.length >= 3) {
        selectionModel.selectPolygon(selectionDragState.points, selectionDragState.combineMode);
      }
      selectionDragState = null;
      marchingAnts.setDragPreview(null);
      activeStroke = null;
    }
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerEnd);
  canvas.addEventListener('pointercancel', onPointerEnd);
  canvas.addEventListener('dblclick', onDblClick);
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
      canvas.removeEventListener('dblclick', onDblClick);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
  };
}
