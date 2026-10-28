import type {
  BezierHandle,
  InterpolationType,
  TangentMode,
  TransformKeyframe,
  CameraKeyframe,
} from './timelineModel';

export interface CurvePoint {
  frame: number;
  value: number;
  interpolation: InterpolationType;
  inTangent?: BezierHandle;
  outTangent?: BezierHandle;
  tangentMode?: TangentMode;
}

export type CurvePreset =
  | 'linear'
  | 'smooth'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'anticipate'
  | 'bounce';

/**
 * Evaluates 1D cubic Bezier at parameter u in [0, 1]
 */
export function cubicBezier1D(p0: number, p1: number, p2: number, p3: number, u: number): number {
  const oneMinusU = 1 - u;
  const oneMinusU2 = oneMinusU * oneMinusU;
  const u2 = u * u;

  return (
    oneMinusU2 * oneMinusU * p0 +
    3 * oneMinusU2 * u * p1 +
    3 * oneMinusU * u2 * p2 +
    u2 * u * p3
  );
}

/**
 * Solves parameter u in [0, 1] for targetX on cubic Bezier curve (p0x, p1x, p2x, p3x)
 * using Newton-Raphson with bisection fallback.
 */
export function solveBezierParamForX(
  p0x: number,
  p1x: number,
  p2x: number,
  p3x: number,
  targetX: number,
  maxIterations = 10,
  epsilon = 1e-5
): number {
  if (targetX <= p0x) return 0;
  if (targetX >= p3x) return 1;

  // Initial estimate by linear interpolation
  let u = (targetX - p0x) / Math.max(1e-5, p3x - p0x);
  let low = 0;
  let high = 1;

  for (let i = 0; i < maxIterations; i++) {
    const x = cubicBezier1D(p0x, p1x, p2x, p3x, u);
    const err = x - targetX;
    if (Math.abs(err) < epsilon) {
      return u;
    }

    if (err > 0) {
      high = u;
    } else {
      low = u;
    }

    // Derivative: B'(u) = 3(1-u)^2 (p1 - p0) + 6(1-u)u (p2 - p1) + 3u^2 (p3 - p2)
    const oneMinusU = 1 - u;
    const dx =
      3 * oneMinusU * oneMinusU * (p1x - p0x) +
      6 * oneMinusU * u * (p2x - p1x) +
      3 * u * u * (p3x - p2x);

    if (Math.abs(dx) > 1e-6) {
      const nextU = u - err / dx;
      if (nextU > low && nextU < high) {
        u = nextU;
        continue;
      }
    }

    // Fallback to bisection
    u = 0.5 * (low + high);
  }

  return u;
}

/**
 * Solves Y value on 2D cubic Bezier curve given target frame (X)
 */
export function solveCubicBezierY(
  p0x: number,
  p0y: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
  p3x: number,
  p3y: number,
  targetX: number
): number {
  const u = solveBezierParamForX(p0x, p1x, p2x, p3x, targetX);
  return cubicBezier1D(p0y, p1y, p2y, p3y, u);
}

/**
 * Calculates auto-tangent offsets for a keyframe based on neighboring keyframes.
 * Uses Catmull-Rom with monotonic slope clamping to prevent overshoot.
 */
export function computeAutoTangents(
  prev: { frame: number; value: number } | null,
  curr: { frame: number; value: number },
  next: { frame: number; value: number } | null
): { inTangent: BezierHandle; outTangent: BezierHandle } {
  let slope = 0;

  if (prev && next) {
    const dFrame = next.frame - prev.frame;
    const dVal = next.value - prev.value;
    const d1 = curr.value - prev.value;
    const d2 = next.value - curr.value;

    // If local extremum (peak or valley), force horizontal slope (0)
    if (d1 * d2 <= 0) {
      slope = 0;
    } else if (dFrame > 0) {
      slope = dVal / dFrame;
    }
  } else if (next) {
    const dFrame = next.frame - curr.frame;
    if (dFrame > 0) slope = (next.value - curr.value) / dFrame;
  } else if (prev) {
    const dFrame = curr.frame - prev.frame;
    if (dFrame > 0) slope = (curr.value - prev.value) / dFrame;
  }

  const prevDist = prev ? Math.max(1, (curr.frame - prev.frame) / 3) : 2;
  const nextDist = next ? Math.max(1, (next.frame - curr.frame) / 3) : 2;

  return {
    inTangent: {
      frameOffset: -prevDist,
      valueOffset: -slope * prevDist,
    },
    outTangent: {
      frameOffset: nextDist,
      valueOffset: slope * nextDist,
    },
  };
}

/**
 * Applies standard easing curve presets between two keyframe points
 */
export function applyCurvePresetToSegment(
  k0: CurvePoint,
  k1: CurvePoint,
  preset: CurvePreset
): void {
  const dFrame = k1.frame - k0.frame;
  const dVal = k1.value - k0.value;
  if (dFrame <= 0) return;

  k0.interpolation = 'bezier';
  k1.interpolation = 'bezier';

  switch (preset) {
    case 'linear':
      k0.outTangent = { frameOffset: dFrame / 3, valueOffset: dVal / 3 };
      k1.inTangent = { frameOffset: -dFrame / 3, valueOffset: -dVal / 3 };
      break;

    case 'smooth':
      k0.outTangent = { frameOffset: dFrame / 3, valueOffset: 0 };
      k1.inTangent = { frameOffset: -dFrame / 3, valueOffset: 0 };
      break;

    case 'ease-in':
      // Flat at start, steep into end
      k0.outTangent = { frameOffset: dFrame * 0.42, valueOffset: 0 };
      k1.inTangent = { frameOffset: -dFrame * 0.2, valueOffset: -dVal * 0.8 };
      break;

    case 'ease-out':
      // Fast at start, flat into end
      k0.outTangent = { frameOffset: dFrame * 0.2, valueOffset: dVal * 0.8 };
      k1.inTangent = { frameOffset: -dFrame * 0.42, valueOffset: 0 };
      break;

    case 'ease-in-out':
      // Flat at both ends, steeper in middle
      k0.outTangent = { frameOffset: dFrame * 0.4, valueOffset: 0 };
      k1.inTangent = { frameOffset: -dFrame * 0.4, valueOffset: 0 };
      break;

    case 'anticipate':
      // Anticipation dip at start
      k0.outTangent = { frameOffset: dFrame * 0.35, valueOffset: -dVal * 0.3 };
      k1.inTangent = { frameOffset: -dFrame * 0.3, valueOffset: 0 };
      break;

    case 'bounce':
      // Overshoot past target before settling
      k0.outTangent = { frameOffset: dFrame * 0.3, valueOffset: dVal * 0.2 };
      k1.inTangent = { frameOffset: -dFrame * 0.3, valueOffset: dVal * 0.25 };
      break;
  }
}

/**
 * Evaluates value across a sequence of sorted curve points at arbitrary target frame
 */
export function evaluateCurvePoints(points: CurvePoint[], targetFrame: number, defaultValue = 0): number {
  if (!points || points.length === 0) return defaultValue;
  if (points.length === 1 || targetFrame <= points[0].frame) return points[0].value;
  if (targetFrame >= points[points.length - 1].frame) return points[points.length - 1].value;

  // Binary search
  let low = 0;
  let high = points.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (points[mid].frame === targetFrame) return points[mid].value;
    if (points[mid].frame < targetFrame) low = mid + 1;
    else high = mid - 1;
  }

  const k0 = points[high];
  const k1 = points[low];

  if (k0.interpolation === 'hold') {
    return k0.value;
  }

  if (k0.interpolation === 'linear') {
    const t = (targetFrame - k0.frame) / Math.max(1, k1.frame - k0.frame);
    return k0.value + (k1.value - k0.value) * t;
  }

  if (k0.interpolation === 'smooth' && !k0.outTangent && !k1.inTangent) {
    const t = (targetFrame - k0.frame) / Math.max(1, k1.frame - k0.frame);
    const s = t * t * (3 - 2 * t);
    return k0.value + (k1.value - k0.value) * s;
  }

  // Bezier evaluation
  const dFrame = Math.max(1, k1.frame - k0.frame);
  const outH = k0.outTangent || { frameOffset: dFrame / 3, valueOffset: 0 };
  const inH = k1.inTangent || { frameOffset: -dFrame / 3, valueOffset: 0 };

  const p0x = k0.frame;
  const p0y = k0.value;

  // Clamp handle frame offsets so curves stay strictly monotonic in X
  const p1x = Math.max(p0x, Math.min(k1.frame, p0x + Math.max(0, outH.frameOffset)));
  const p1y = p0y + outH.valueOffset;

  const p3x = k1.frame;
  const p3y = k1.value;

  const p2x = Math.max(p0x, Math.min(p3x, p3x + Math.min(0, inH.frameOffset)));
  const p2y = p3y + inH.valueOffset;

  return solveCubicBezierY(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, targetFrame);
}

/**
 * Extracts curve points for a specific track channel
 */
export function getTrackChannelPoints(
  kfs: TransformKeyframe[],
  channel: 'x' | 'y' | 'scaleX' | 'scaleY' | 'rotation' | 'opacity'
): CurvePoint[] {
  return kfs
    .slice()
    .sort((a, b) => a.frame - b.frame)
    .map((k) => {
      const curve = k.curves?.[channel];
      return {
        frame: k.frame,
        value: k[channel],
        interpolation: k.interpolation,
        inTangent: curve?.inTangent,
        outTangent: curve?.outTangent,
        tangentMode: curve?.tangentMode || 'auto',
      };
    });
}

/**
 * Extracts curve points for a camera channel
 */
export function getCameraChannelPoints(
  kfs: CameraKeyframe[],
  channel: 'x' | 'y' | 'zoom' | 'rotation'
): CurvePoint[] {
  return kfs
    .slice()
    .sort((a, b) => a.frame - b.frame)
    .map((k) => {
      const curve = k.curves?.[channel];
      return {
        frame: k.frame,
        value: k[channel],
        interpolation: k.interpolation,
        inTangent: curve?.inTangent,
        outTangent: curve?.outTangent,
        tangentMode: curve?.tangentMode || 'auto',
      };
    });
}
