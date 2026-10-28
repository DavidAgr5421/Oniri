use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq)]
#[repr(u8)]
pub enum TangentMode {
    Auto = 0,
    Aligned = 1,
    Free = 2,
    Vector = 3,
    Linear = 4,
}

impl From<u8> for TangentMode {
    fn from(val: u8) -> Self {
        match val {
            0 => TangentMode::Auto,
            1 => TangentMode::Aligned,
            2 => TangentMode::Free,
            3 => TangentMode::Vector,
            _ => TangentMode::Linear,
        }
    }
}

#[derive(Clone, Copy, Debug, Default)]
pub struct BezierTangent {
    pub frame_offset: f32,
    pub value_offset: f32,
}

#[derive(Clone, Copy, Debug)]
pub struct CurvePoint {
    pub frame: f32,
    pub value: f32,
    pub interpolation: u8, // 0 = hold, 1 = linear, 2 = smooth, 3 = bezier
    pub in_tangent: Option<BezierTangent>,
    pub out_tangent: Option<BezierTangent>,
    pub tangent_mode: TangentMode,
}

/// Evaluates 1D cubic Bezier at parameter u in [0, 1]
#[inline]
pub fn cubic_bezier_1d(p0: f32, p1: f32, p2: f32, p3: f32, u: f32) -> f32 {
    let one_minus_u = 1.0 - u;
    let one_minus_u2 = one_minus_u * one_minus_u;
    let u2 = u * u;

    one_minus_u2 * one_minus_u * p0
        + 3.0 * one_minus_u2 * u * p1
        + 3.0 * one_minus_u * u2 * p2
        + u2 * u * p3
}

/// Solves parameter u in [0, 1] for target_x using Newton-Raphson with bisection fallback
pub fn solve_bezier_param_for_x(
    p0x: f32,
    p1x: f32,
    p2x: f32,
    p3x: f32,
    target_x: f32,
    max_iterations: usize,
    epsilon: f32,
) -> f32 {
    if target_x <= p0x {
        return 0.0;
    }
    if target_x >= p3x {
        return 1.0;
    }

    let mut u = (target_x - p0x) / (p3x - p0x).max(1e-5);
    let mut low = 0.0f32;
    let mut high = 1.0f32;

    for _ in 0..max_iterations {
        let x = cubic_bezier_1d(p0x, p1x, p2x, p3x, u);
        let err = x - target_x;
        if err.abs() < epsilon {
            return u;
        }

        if err > 0.0 {
            high = u;
        } else {
            low = u;
        }

        let one_minus_u = 1.0 - u;
        let dx = 3.0 * one_minus_u * one_minus_u * (p1x - p0x)
            + 6.0 * one_minus_u * u * (p2x - p1x)
            + 3.0 * u * u * (p3x - p2x);

        if dx.abs() > 1e-6 {
            let next_u = u - err / dx;
            if next_u > low && next_u < high {
                u = next_u;
                continue;
            }
        }

        u = 0.5 * (low + high);
    }

    u
}

/// Evaluates Y value on cubic Bezier curve for target X frame
#[inline]
pub fn solve_cubic_bezier_y(
    p0x: f32,
    p0y: f32,
    p1x: f32,
    p1y: f32,
    p2x: f32,
    p2y: f32,
    p3x: f32,
    p3y: f32,
    target_x: f32,
) -> f32 {
    let u = solve_bezier_param_for_x(p0x, p1x, p2x, p3x, target_x, 10, 1e-4);
    cubic_bezier_1d(p0y, p1y, p2y, p3y, u)
}

/// Evaluates a sequence of sorted CurvePoints at target frame
pub fn evaluate_curve_points(points: &[CurvePoint], target_frame: f32, default_val: f32) -> f32 {
    if points.is_empty() {
        return default_val;
    }
    if points.len() == 1 || target_frame <= points[0].frame {
        return points[0].value;
    }
    if target_frame >= points[points.len() - 1].frame {
        return points[points.len() - 1].value;
    }

    // Binary search
    let idx = match points.binary_search_by(|p| {
        p.frame
            .partial_cmp(&target_frame)
            .unwrap_or(std::cmp::Ordering::Equal)
    }) {
        Ok(exact) => return points[exact].value,
        Err(i) => i,
    };

    let k0 = &points[idx - 1];
    let k1 = &points[idx];

    match k0.interpolation {
        0 => k0.value, // Hold
        1 => {
            // Linear
            let t = (target_frame - k0.frame) / (k1.frame - k0.frame).max(1.0);
            k0.value + (k1.value - k0.value) * t
        }
        2 => {
            // Smooth (Hermite smoothstep)
            let t = (target_frame - k0.frame) / (k1.frame - k0.frame).max(1.0);
            let s = t * t * (3.0 - 2.0 * t);
            k0.value + (k1.value - k0.value) * s
        }
        _ => {
            // Bezier
            let d_frame = (k1.frame - k0.frame).max(1.0);
            let out_h = k0.out_tangent.unwrap_or(BezierTangent {
                frame_offset: d_frame / 3.0,
                value_offset: 0.0,
            });
            let in_h = k1.in_tangent.unwrap_or(BezierTangent {
                frame_offset: -d_frame / 3.0,
                value_offset: 0.0,
            });

            let p0x = k0.frame;
            let p0y = k0.value;

            let p1x = (p0x + out_h.frame_offset.max(0.0)).clamp(p0x, k1.frame);
            let p1y = p0y + out_h.value_offset;

            let p3x = k1.frame;
            let p3y = k1.value;

            let p2x = (p3x + in_h.frame_offset.min(0.0)).clamp(p0x, p3x);
            let p2y = p3y + in_h.value_offset;

            solve_cubic_bezier_y(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, target_frame)
        }
    }
}

/// WASM-exported helper for rapid batch evaluation of Bezier curves
#[wasm_bindgen]
pub fn wasm_solve_bezier_y(
    p0x: f32,
    p0y: f32,
    p1x: f32,
    p1y: f32,
    p2x: f32,
    p2y: f32,
    p3x: f32,
    p3y: f32,
    target_x: f32,
) -> f32 {
    solve_cubic_bezier_y(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, target_x)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bezier_endpoints() {
        let y0 = solve_cubic_bezier_y(0.0, 10.0, 2.0, 10.0, 8.0, 50.0, 10.0, 50.0, 0.0);
        assert!((y0 - 10.0).abs() < 1e-4);

        let y1 = solve_cubic_bezier_y(0.0, 10.0, 2.0, 10.0, 8.0, 50.0, 10.0, 50.0, 10.0);
        assert!((y1 - 50.0).abs() < 1e-4);
    }

    #[test]
    fn test_bezier_midpoint_ease_in_out() {
        // Symmetric ease-in-out from 0 to 100 between frames 0 and 10
        let y_mid = solve_cubic_bezier_y(0.0, 0.0, 4.0, 0.0, 6.0, 100.0, 10.0, 100.0, 5.0);
        assert!((y_mid - 50.0).abs() < 0.5);
    }
}
