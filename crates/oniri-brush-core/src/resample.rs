use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ResampleMode {
    Nearest = 0,
    Bilinear = 1,
    Bicubic = 2,
    Lanczos = 3,
}

#[wasm_bindgen]
pub struct TransformResampleCore;

#[wasm_bindgen]
impl TransformResampleCore {
    /// Resample an RGBA image from `(src_w, src_h)` to `(dst_w, dst_h)`.
    /// Returns a new RGBA vector of length `dst_w * dst_h * 4`.
    pub fn resample_scale(
        src_rgba: &[u8],
        src_w: usize,
        src_h: usize,
        dst_w: usize,
        dst_h: usize,
        mode: ResampleMode,
    ) -> Vec<u8> {
        let total_dst = dst_w * dst_h;
        if total_dst == 0 || src_w == 0 || src_h == 0 || src_rgba.len() != src_w * src_h * 4 {
            return Vec::new();
        }

        let mut dst = vec![0u8; total_dst * 4];
        let scale_x = src_w as f32 / dst_w as f32;
        let scale_y = src_h as f32 / dst_h as f32;

        for dy in 0..dst_h {
            let sy = (dy as f32 + 0.5) * scale_y - 0.5;
            let dst_row = dy * dst_w;

            for dx in 0..dst_w {
                let sx = (dx as f32 + 0.5) * scale_x - 0.5;
                let color = sample_pixel(src_rgba, src_w, src_h, sx, sy, mode);
                let out_idx = (dst_row + dx) * 4;
                dst[out_idx..out_idx + 4].copy_from_slice(&color);
            }
        }

        dst
    }

    /// Resample an RGBA patch applying an affine transformation with inverse mapping.
    /// `mat_inv` is the 6-element inverse affine matrix:
    /// `[a, b, c, d, tx, ty]` where
    /// `src_x = a * dst_x + c * dst_y + tx`
    /// `src_y = b * dst_x + d * dst_y + ty`
    pub fn resample_affine(
        src_rgba: &[u8],
        src_w: usize,
        src_h: usize,
        dst_w: usize,
        dst_h: usize,
        mat_inv: &[f32],
        mode: ResampleMode,
    ) -> Vec<u8> {
        let total_dst = dst_w * dst_h;
        if total_dst == 0 || src_w == 0 || src_h == 0 || mat_inv.len() < 6 || src_rgba.len() != src_w * src_h * 4 {
            return Vec::new();
        }

        let a = mat_inv[0];
        let b = mat_inv[1];
        let c = mat_inv[2];
        let d = mat_inv[3];
        let tx = mat_inv[4];
        let ty = mat_inv[5];

        let mut dst = vec![0u8; total_dst * 4];

        for dy in 0..dst_h {
            let y_f = dy as f32;
            let dst_row = dy * dst_w;

            for dx in 0..dst_w {
                let x_f = dx as f32;
                let sx = a * x_f + c * y_f + tx;
                let sy = b * x_f + d * y_f + ty;

                let color = sample_pixel(src_rgba, src_w, src_h, sx, sy, mode);
                let out_idx = (dst_row + dx) * 4;
                dst[out_idx..out_idx + 4].copy_from_slice(&color);
            }
        }

        dst
    }

    /// Helper to compute the 6-element inverse affine transform matrix
    /// for translation, rotation, scale and pivot offset:
    /// `P_src = Center_src + S^-1 * R^-1 * (P_dst - Center_dst)`
    pub fn compute_inverse_transform_matrix(
        center_src_x: f32,
        center_src_y: f32,
        center_dst_x: f32,
        center_dst_y: f32,
        scale_x: f32,
        scale_y: f32,
        rotation_rad: f32,
    ) -> Vec<f32> {
        let cos = rotation_rad.cos();
        let sin = rotation_rad.sin();
        let inv_sx = if scale_x.abs() < 1e-6 { 1.0 } else { 1.0 / scale_x };
        let inv_sy = if scale_y.abs() < 1e-6 { 1.0 } else { 1.0 / scale_y };

        // R^-1: [[cos, sin], [-sin, cos]]
        // S^-1: [[inv_sx, 0], [0, inv_sy]]
        // M = S^-1 * R^-1
        // a = inv_sx * cos
        // c = inv_sx * sin
        // b = -inv_sy * sin
        // d = inv_sy * cos
        let a = inv_sx * cos;
        let c = inv_sx * sin;
        let b = -inv_sy * sin;
        let d = inv_sy * cos;

        // tx = center_src_x - (a * center_dst_x + c * center_dst_y)
        // ty = center_src_y - (b * center_dst_x + d * center_dst_y)
        let tx = center_src_x - (a * center_dst_x + c * center_dst_y);
        let ty = center_src_y - (b * center_dst_x + d * center_dst_y);

        vec![a, b, c, d, tx, ty]
    }
}

#[inline]
fn sample_pixel(
    src: &[u8],
    w: usize,
    h: usize,
    x: f32,
    y: f32,
    mode: ResampleMode,
) -> [u8; 4] {
    match mode {
        ResampleMode::Nearest => sample_nearest(src, w, h, x, y),
        ResampleMode::Bilinear => sample_bilinear(src, w, h, x, y),
        ResampleMode::Bicubic => sample_bicubic(src, w, h, x, y),
        ResampleMode::Lanczos => sample_lanczos(src, w, h, x, y),
    }
}

#[inline]
fn get_pixel_clamped(src: &[u8], w: usize, h: usize, x: isize, y: isize) -> [u8; 4] {
    if x < 0 || x >= w as isize || y < 0 || y >= h as isize {
        return [0, 0, 0, 0];
    }
    let idx = (y as usize * w + x as usize) * 4;
    [src[idx], src[idx + 1], src[idx + 2], src[idx + 3]]
}

#[inline]
fn sample_nearest(src: &[u8], w: usize, h: usize, x: f32, y: f32) -> [u8; 4] {
    let px = x.round() as isize;
    let py = y.round() as isize;
    get_pixel_clamped(src, w, h, px, py)
}

#[inline]
fn sample_bilinear(src: &[u8], w: usize, h: usize, x: f32, y: f32) -> [u8; 4] {
    if x < -1.0 || x > w as f32 || y < -1.0 || y > h as f32 {
        return [0, 0, 0, 0];
    }

    let x0 = x.floor() as isize;
    let y0 = y.floor() as isize;
    let tx = x - x0 as f32;
    let ty = y - y0 as f32;

    let p00 = get_pixel_clamped(src, w, h, x0, y0);
    let p10 = get_pixel_clamped(src, w, h, x0 + 1, y0);
    let p01 = get_pixel_clamped(src, w, h, x0, y0 + 1);
    let p11 = get_pixel_clamped(src, w, h, x0 + 1, y0 + 1);

    let mut out = [0u8; 4];
    for c in 0..4 {
        let top = p00[c] as f32 * (1.0 - tx) + p10[c] as f32 * tx;
        let bot = p01[c] as f32 * (1.0 - tx) + p11[c] as f32 * tx;
        let val = top * (1.0 - ty) + bot * ty;
        out[c] = val.clamp(0.0, 255.0).round() as u8;
    }
    out
}

#[inline]
fn catmull_rom_weight(t: f32) -> f32 {
    let at = t.abs();
    if at <= 1.0 {
        1.5 * at * at * at - 2.5 * at * at + 1.0
    } else if at <= 2.0 {
        -0.5 * at * at * at + 2.5 * at * at - 4.0 * at + 2.0
    } else {
        0.0
    }
}

#[inline]
fn sample_bicubic(src: &[u8], w: usize, h: usize, x: f32, y: f32) -> [u8; 4] {
    if x < -2.0 || x > (w + 1) as f32 || y < -2.0 || y > (h + 1) as f32 {
        return [0, 0, 0, 0];
    }

    let x0 = x.floor() as isize;
    let y0 = y.floor() as isize;
    let tx = x - x0 as f32;
    let ty = y - y0 as f32;

    let mut wx = [0.0f32; 4];
    let mut wy = [0.0f32; 4];
    for i in 0..4 {
        wx[i] = catmull_rom_weight(tx - (i as f32 - 1.0));
        wy[i] = catmull_rom_weight(ty - (i as f32 - 1.0));
    }

    let mut sums = [0.0f32; 4];
    let mut weight_sum = 0.0f32;

    for j in 0..4 {
        let py = y0 + j as isize - 1;
        let w_y = wy[j];
        if w_y == 0.0 {
            continue;
        }

        for i in 0..4 {
            let px = x0 + i as isize - 1;
            let w_combined = wx[i] * w_y;
            if w_combined == 0.0 {
                continue;
            }

            let p = get_pixel_clamped(src, w, h, px, py);
            sums[0] += p[0] as f32 * w_combined;
            sums[1] += p[1] as f32 * w_combined;
            sums[2] += p[2] as f32 * w_combined;
            sums[3] += p[3] as f32 * w_combined;
            weight_sum += w_combined;
        }
    }

    let norm = if weight_sum.abs() > 1e-6 { 1.0 / weight_sum } else { 1.0 };
    [
        (sums[0] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[1] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[2] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[3] * norm).clamp(0.0, 255.0).round() as u8,
    ]
}

#[inline]
fn lanczos3_weight(t: f32) -> f32 {
    let at = t.abs();
    if at < 1e-6 {
        1.0
    } else if at < 3.0 {
        let pi_t = std::f32::consts::PI * at;
        let sinc = pi_t.sin() / pi_t;
        let pi_t_3 = pi_t / 3.0;
        let window = pi_t_3.sin() / pi_t_3;
        sinc * window
    } else {
        0.0
    }
}

#[inline]
fn sample_lanczos(src: &[u8], w: usize, h: usize, x: f32, y: f32) -> [u8; 4] {
    if x < -3.0 || x > (w + 2) as f32 || y < -3.0 || y > (h + 2) as f32 {
        return [0, 0, 0, 0];
    }

    let x0 = x.floor() as isize;
    let y0 = y.floor() as isize;
    let tx = x - x0 as f32;
    let ty = y - y0 as f32;

    let mut wx = [0.0f32; 6];
    let mut wy = [0.0f32; 6];
    for i in 0..6 {
        wx[i] = lanczos3_weight(tx - (i as f32 - 2.0));
        wy[i] = lanczos3_weight(ty - (i as f32 - 2.0));
    }

    let mut sums = [0.0f32; 4];
    let mut weight_sum = 0.0f32;

    for j in 0..6 {
        let py = y0 + j as isize - 2;
        let w_y = wy[j];
        if w_y == 0.0 {
            continue;
        }

        for i in 0..6 {
            let px = x0 + i as isize - 2;
            let w_combined = wx[i] * w_y;
            if w_combined == 0.0 {
                continue;
            }

            let p = get_pixel_clamped(src, w, h, px, py);
            sums[0] += p[0] as f32 * w_combined;
            sums[1] += p[1] as f32 * w_combined;
            sums[2] += p[2] as f32 * w_combined;
            sums[3] += p[3] as f32 * w_combined;
            weight_sum += w_combined;
        }
    }

    let norm = if weight_sum.abs() > 1e-6 { 1.0 / weight_sum } else { 1.0 };
    [
        (sums[0] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[1] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[2] * norm).clamp(0.0, 255.0).round() as u8,
        (sums[3] * norm).clamp(0.0, 255.0).round() as u8,
    ]
}
