/**
 * REA study: docs/csp_tablet_and_mouse_recognition_system.md
 *
 * Device-level input response (what CSP configures under
 * File > Preferences > Tablet). Everything here is pure math over the W3C
 * PointerEvent fields, so it can be reused by the engine, the input layer and
 * tests without touching the DOM state.
 */

export type PressureCurveMode = 'linear' | 'soft' | 'hard' | 'custom';

export interface PressureCurveSettings {
  mode: PressureCurveMode;
  gamma: number;
}

/** Preset exponents from the study: soft 0.6-0.8, hard 1.3-1.6. */
const PRESET_GAMMA: Record<PressureCurveMode, number> = {
  linear: 1,
  soft: 0.7,
  hard: 1.4,
  custom: 1,
};

export const GAMMA_MIN = 0.3;
export const GAMMA_MAX = 2.5;

function clampGamma(gamma: number): number {
  if (!Number.isFinite(gamma)) return 1;
  return Math.min(GAMMA_MAX, Math.max(GAMMA_MIN, gamma));
}

export function gammaFor(settings: PressureCurveSettings): number {
  if (settings.mode === 'custom') return clampGamma(settings.gamma);
  return PRESET_GAMMA[settings.mode];
}

export function gammaForMode(mode: PressureCurveMode, currentGamma: number): number {
  return gammaFor({ mode, gamma: currentGamma });
}

/**
 * Transfer function applied to the raw tablet pressure (REA study 5.3).
 * 0 = fully open hand, 1 = pressed to the stop.
 */
export function evaluatePressure(rawPressure: number, settings: PressureCurveSettings): number {
  if (rawPressure <= 0.001) return 0;
  if (rawPressure >= 0.999) return 1;

  const clamped = Math.max(0, Math.min(1, rawPressure));
  return Math.pow(clamped, gammaFor(settings));
}

/**
 * Physical eraser tip touching the surface (REA study 5.4).
 * W3C Pointer Events: erase is reported as button 5 / buttons bit 5 (mask 32).
 */
export function isPhysicalEraser(event: {
  pointerType?: string;
  button: number;
  buttons: number;
}): boolean {
  return event.pointerType === 'pen' && (event.buttons === 32 || event.button === 5);
}

export interface TiltFootprint {
  /** Direction of the lean in canvas radians (atan2 of tiltY over tiltX). */
  azimuthRad: number;
  /** Short/long axis ratio of the nib contact ellipse, quantized for the cache. */
  squash: number;
}

const MIN_TILT_DEG = 4;
const SQUASH_STEP = 0.05;
const MIN_SQUASH = 0.55;

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Maps tiltX/tiltY (REA study 5.1) onto the nib footprint: the contact ellipse
 * follows the lean direction and elongates as the pen lies flatter against the
 * glass. Returns null when the pen is effectively upright (or reports no tilt),
 * so the regular stroke-direction tip angle stays in charge.
 */
export function tiltFootprint(tiltX: number, tiltY: number, amount: number): TiltFootprint | null {
  if (!Number.isFinite(tiltX) || !Number.isFinite(tiltY)) return null;
  const magnitude = Math.hypot(tiltX, tiltY);
  if (magnitude < MIN_TILT_DEG) return null;

  const cosTilt = Math.cos((Math.min(90, magnitude) * Math.PI) / 180);
  let squash = 1 - clamp01(amount) * (1 - cosTilt);
  squash = Math.round(squash / SQUASH_STEP) * SQUASH_STEP;
  squash = Math.min(1, Math.max(MIN_SQUASH, squash));

  return { azimuthRad: Math.atan2(tiltY, tiltX), squash };
}
