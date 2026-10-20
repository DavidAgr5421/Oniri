import * as THREE from 'three';
import type { BrushEngine } from './brushEngine';
import {
  activeTool,
  getToolState,
  setTool,
  subscribeTools,
  swapColors,
  toggleTransparentColor,
} from '../tools/toolState';

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

/**
 * W3C Pointer Events: a pressed mouse always reports pressure 0.5. Forcing
 * that onto every mouse stroke made stamps semi-transparent (visible circles
 * on every tick), so the mouse gets full pressure and the starting/ending
 * tapers handle the finesse instead.
 */
function pressureOf(event: PointerLike): number {
  if (event.pointerType === 'pen') {
    return event.pressure > 0 ? event.pressure : 0.5;
  }
  return 1.0;
}

export function attachStrokeInput(options: StrokeInputOptions): StrokeInputHandle {
  const { canvas, camera, plane, engine, docW, docH, onPickColor } = options;
  const raycaster = new THREE.Raycaster();
  const pointerVec = new THREE.Vector2();

  let activeStroke: 'brush' | 'eraser' | 'shape' | 'bone' | null = null;
  let activePointerId: number | null = null;
  let lastPointerType = 'mouse';

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

  // Stroke shaping state (quadratic Bezier smoothing + ending tail)
  let smoothHist: SmoothPoint[] = [];
  let curveEmitted: SmoothPoint | null = null;
  let velX = 0;
  let velY = 0;
  let lastSamplePressure = 1;

  function updateCursor(): void {
    if (activePan) {
      canvas.style.cursor = 'grabbing';
    } else if (isSpacePressed || activeTool() === 'hand') {
      canvas.style.cursor = 'grab';
    } else if (activeTool() === 'eyedropper') {
      canvas.style.cursor = 'cell';
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
   * Keeps the last 3 smoothed points and emits a quadratic Bezier piece from
   * the midpoint of (p0,p1) to the midpoint of (p1,p2), with p1 as control.
   * Each new point continues exactly where the previous one ended, so there
   * are no polygonal corners when the pointer moves fast.
   */
  const pushSmoothed = (x: number, y: number, p: number): void => {
    const pt: SmoothPoint = { x, y, p };
    if (smoothHist.length === 0) {
      smoothHist.push(pt);
      curveEmitted = pt;
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

    curveEmitted = { x: m2x, y: m2y, p: m2p };
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
    const wasBone = activeStroke === 'bone';
    if (activeStroke === 'brush' || activeStroke === 'eraser') {
      // Stabilizer catch-up: pull the smoothed curve toward the raw release
      // point so the stroke doesn't stop short of the cursor, then close it
      // at the real release pressure (never at a hardcoded 0.5).
      const stab = getToolState().brush.stabilization;
      if (stab > 0) {
        const alpha = 1 / (1 + stab * 0.35);
        for (let i = 0; i < 3; i++) {
          smoothedX += (rawLastX - smoothedX) * alpha;
          smoothedY += (rawLastY - smoothedY) * alpha;
        }
      } else {
        smoothedX = rawLastX;
        smoothedY = rawLastY;
      }

      pushSmoothed(smoothedX, smoothedY, lastSamplePressure);
      if (curveEmitted) {
        emitTo(smoothedX, smoothedY, lastSamplePressure);
        curveEmitted = { x: smoothedX, y: smoothedY, p: lastSamplePressure };
      }
    }

    activeStroke = null;
    boneDragState = null;
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

    const pressure = pressureOf(event);
    smoothedX = doc.x;
    smoothedY = doc.y;
    rawLastX = doc.x;
    rawLastY = doc.y;
    lastSamplePressure = pressure;
    velX = 0;
    velY = 0;
    smoothHist = [{ x: doc.x, y: doc.y, p: pressure }];
    curveEmitted = smoothHist[0];

    const isErase = tool === 'eraser' || getToolState().isTransparentColor;
    if (isErase) {
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

    if (activeStroke === 'shape') {
      const doc = pointerToDoc(event);
      if (doc) engine.updateShape(doc.x, doc.y);
      return;
    }

    // High-frequency samples (coalesced) are fed one by one so no input
    // resolution is lost between two pointermove events.
    for (const sample of coalescedSamples(event)) {
      const doc = pointerToDoc(sample);
      if (!doc) continue;
      handleStrokePoint(doc, pressureOf(sample));
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
      if (key === 'p') setTool('pen');
      else if (key === 'b') setTool('brush');
      else if (key === 'e') setTool('eraser');
      else if (key === 'i') setTool('eyedropper');
      else if (key === 'g') setTool('bucket');
      else if (key === 'u') setTool('shape');
      else if (key === 'j') setTool('bone');
      else if (key === 'h') setTool('hand');
      else if (key === 'x') swapColors();
      else if (key === 'c') toggleTransparentColor();
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
