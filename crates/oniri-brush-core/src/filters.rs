use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct FilterCore;

#[wasm_bindgen]
impl FilterCore {
    /// Invert RGB channels in place, preserving alpha.
    pub fn invert_colors(rgba: &mut [u8]) {
        for chunk in rgba.chunks_exact_mut(4) {
            if chunk[3] > 0 {
                chunk[0] = 255 - chunk[0];
                chunk[1] = 255 - chunk[1];
                chunk[2] = 255 - chunk[2];
            }
        }
    }

    /// Adjust brightness (-1.0 to 1.0) and contrast (-1.0 to 1.0) in place.
    pub fn adjust_brightness_contrast(rgba: &mut [u8], brightness: f32, contrast: f32) {
        let b_offset = brightness.clamp(-1.0, 1.0) * 255.0;
        let c = contrast.clamp(-0.99, 1.0);
        let factor = (259.0 * (c + 1.0)) / (255.0 * (1.0 - c * 0.99));

        for chunk in rgba.chunks_exact_mut(4) {
            if chunk[3] == 0 {
                continue;
            }
            for i in 0..3 {
                let val = chunk[i] as f32;
                let adjusted = factor * (val - 128.0) + 128.0 + b_offset;
                chunk[i] = adjusted.clamp(0.0, 255.0).round() as u8;
            }
        }
    }

    /// Convert to black or white based on luminance threshold (0..255).
    /// Pixels with luminance >= threshold become white (255), otherwise black (0).
    /// Transparent pixels remain unaffected.
    pub fn binarize(rgba: &mut [u8], threshold: u8) {
        let th = threshold as f32;
        for chunk in rgba.chunks_exact_mut(4) {
            if chunk[3] == 0 {
                continue;
            }
            // ITU-R BT.601 perceptual luminance
            let lum = 0.299 * (chunk[0] as f32) + 0.587 * (chunk[1] as f32) + 0.114 * (chunk[2] as f32);
            let val = if lum >= th { 255 } else { 0 };
            chunk[0] = val;
            chunk[1] = val;
            chunk[2] = val;
        }
    }

    /// Adjust Hue, Saturation and Value (HSV).
    /// - `hue_delta_deg`: -180.0 to 180.0
    /// - `sat_scale`: 0.0 to 3.0 (1.0 = unchanged)
    /// - `val_scale`: 0.0 to 3.0 (1.0 = unchanged)
    pub fn adjust_hsv(rgba: &mut [u8], hue_delta_deg: f32, sat_scale: f32, val_scale: f32) {
        for chunk in rgba.chunks_exact_mut(4) {
            if chunk[3] == 0 {
                continue;
            }
            let r = chunk[0] as f32 / 255.0;
            let g = chunk[1] as f32 / 255.0;
            let b = chunk[2] as f32 / 255.0;

            let (mut h, mut s, mut v) = rgb_to_hsv(r, g, b);
            h = (h + hue_delta_deg).rem_euclid(360.0);
            s = (s * sat_scale).clamp(0.0, 1.0);
            v = (v * val_scale).clamp(0.0, 1.0);

            let (nr, ng, nb) = hsv_to_rgb(h, s, v);
            chunk[0] = (nr * 255.0).clamp(0.0, 255.0).round() as u8;
            chunk[1] = (ng * 255.0).clamp(0.0, 255.0).round() as u8;
            chunk[2] = (nb * 255.0).clamp(0.0, 255.0).round() as u8;
        }
    }

    /// Fast separable 1D Gaussian blur on an RGBA buffer.
    /// Returns a new blurred RGBA vector of identical dimensions.
    pub fn gaussian_blur(src_rgba: &[u8], width: usize, height: usize, radius: f32) -> Vec<u8> {
        let total_pixels = width * height;
        if total_pixels == 0 || src_rgba.len() != total_pixels * 4 || radius <= 0.1 {
            return src_rgba.to_vec();
        }

        let r = radius.clamp(0.5, 50.0);
        let sigma = r / 2.0;
        let k_size = (sigma * 3.0).ceil() as usize;
        let kernel = make_gaussian_kernel(sigma, k_size);

        // Intermediate buffer for horizontal pass (f32 channels to avoid precision loss)
        let mut temp = vec![0.0f32; total_pixels * 4];

        // Horizontal Pass
        for y in 0..height {
            let row_offset = y * width;
            for x in 0..width {
                let mut sum_r = 0.0f32;
                let mut sum_g = 0.0f32;
                let mut sum_b = 0.0f32;
                let mut sum_a = 0.0f32;

                for (ki, &weight) in kernel.iter().enumerate() {
                    let offset = ki as isize - k_size as isize;
                    let sample_x = (x as isize + offset).clamp(0, width as isize - 1) as usize;
                    let idx = (row_offset + sample_x) * 4;

                    sum_r += src_rgba[idx] as f32 * weight;
                    sum_g += src_rgba[idx + 1] as f32 * weight;
                    sum_b += src_rgba[idx + 2] as f32 * weight;
                    sum_a += src_rgba[idx + 3] as f32 * weight;
                }

                let out_idx = (row_offset + x) * 4;
                temp[out_idx] = sum_r;
                temp[out_idx + 1] = sum_g;
                temp[out_idx + 2] = sum_b;
                temp[out_idx + 3] = sum_a;
            }
        }

        // Vertical Pass into final u8 buffer
        let mut dst = vec![0u8; total_pixels * 4];
        for y in 0..height {
            for x in 0..width {
                let mut sum_r = 0.0f32;
                let mut sum_g = 0.0f32;
                let mut sum_b = 0.0f32;
                let mut sum_a = 0.0f32;

                for (ki, &weight) in kernel.iter().enumerate() {
                    let offset = ki as isize - k_size as isize;
                    let sample_y = (y as isize + offset).clamp(0, height as isize - 1) as usize;
                    let idx = (sample_y * width + x) * 4;

                    sum_r += temp[idx] * weight;
                    sum_g += temp[idx + 1] * weight;
                    sum_b += temp[idx + 2] * weight;
                    sum_a += temp[idx + 3] * weight;
                }

                let out_idx = (y * width + x) * 4;
                dst[out_idx] = sum_r.clamp(0.0, 255.0).round() as u8;
                dst[out_idx + 1] = sum_g.clamp(0.0, 255.0).round() as u8;
                dst[out_idx + 2] = sum_b.clamp(0.0, 255.0).round() as u8;
                dst[out_idx + 3] = sum_a.clamp(0.0, 255.0).round() as u8;
            }
        }

        dst
    }
}

fn make_gaussian_kernel(sigma: f32, k_size: usize) -> Vec<f32> {
    let size = k_size * 2 + 1;
    let mut kernel = Vec::with_capacity(size);
    let two_sigma_sq = 2.0 * sigma * sigma;
    let mut sum = 0.0f32;

    for i in 0..size {
        let dist = i as f32 - k_size as f32;
        let w = (-dist * dist / two_sigma_sq).exp();
        kernel.push(w);
        sum += w;
    }

    if sum > 0.0 {
        for w in kernel.iter_mut() {
            *w /= sum;
        }
    }

    kernel
}

fn rgb_to_hsv(r: f32, g: f32, b: f32) -> (f32, f32, f32) {
    let max = r.max(g).max(b);
    let min = r.min(g).min(b);
    let delta = max - min;

    let v = max;
    let s = if max <= 0.0 { 0.0 } else { delta / max };

    let mut h = if delta <= 0.0 {
        0.0
    } else if (max - r).abs() < f32::EPSILON {
        60.0 * (((g - b) / delta).rem_euclid(6.0))
    } else if (max - g).abs() < f32::EPSILON {
        60.0 * (((b - r) / delta) + 2.0)
    } else {
        60.0 * (((r - g) / delta) + 4.0)
    };

    if h < 0.0 {
        h += 360.0;
    }

    (h, s, v)
}

fn hsv_to_rgb(h: f32, s: f32, v: f32) -> (f32, f32, f32) {
    if s <= 0.0 {
        return (v, v, v);
    }

    let hh = (h.rem_euclid(360.0)) / 60.0;
    let i = hh.floor() as i32;
    let f = hh - i as f32;
    let p = v * (1.0 - s);
    let q = v * (1.0 - s * f);
    let t = v * (1.0 - s * (1.0 - f));

    match i {
        0 => (v, t, p),
        1 => (q, v, p),
        2 => (p, v, t),
        3 => (p, q, v),
        4 => (t, p, v),
        _ => (v, p, q),
    }
}
