use wasm_bindgen::prelude::*;

/// Motor nativo de mezcla cromática, difuminado (smudge) y tintado de color
#[wasm_bindgen]
pub struct ColorBlendCore;

#[wasm_bindgen]
impl ColorBlendCore {
    /// Mezcla dos colores (Principal y Subcolor/Secundario) en función de la presión
    pub fn blend_dual_color(
        r1: u8, g1: u8, b1: u8,
        r2: u8, g2: u8, b2: u8,
        pressure: f32,
    ) -> Vec<u8> {
        let p = pressure.clamp(0.0, 1.0);
        let t = p.powf(1.2);
        let one_minus_t = 1.0 - t;

        let r = (r2 as f32 * one_minus_t + r1 as f32 * t).round().clamp(0.0, 255.0) as u8;
        let g = (g2 as f32 * one_minus_t + g1 as f32 * t).round().clamp(0.0, 255.0) as u8;
        let b = (b2 as f32 * one_minus_t + b1 as f32 * t).round().clamp(0.0, 255.0) as u8;

        vec![r, g, b]
    }

    /// Mezcla el color del pincel con el color muestreado del lienzo (acuarela/óleo)
    pub fn blend_color_mix(
        brush_r: u8, brush_g: u8, brush_b: u8,
        sampled_r: u8, sampled_g: u8, sampled_b: u8,
        sampled_a: f32,
        color_mix: f32,
        pressure: f32,
    ) -> Vec<u8> {
        let p = pressure.clamp(0.0, 1.0);
        let base_mix = color_mix * (1.0 - p.powf(1.3) * 0.85).max(0.05);
        let mix = (base_mix * sampled_a.clamp(0.0, 1.0)).clamp(0.0, 1.0);
        let one_minus_mix = 1.0 - mix;

        let r = (brush_r as f32 * one_minus_mix + sampled_r as f32 * mix).round().clamp(0.0, 255.0) as u8;
        let g = (brush_g as f32 * one_minus_mix + sampled_g as f32 * mix).round().clamp(0.0, 255.0) as u8;
        let b = (brush_b as f32 * one_minus_mix + sampled_b as f32 * mix).round().clamp(0.0, 255.0) as u8;

        vec![r, g, b]
    }

    /// Actualiza el estado acumulado de arrastre / difuminado (Smudge / Blender)
    /// Retorna `[r, g, b, alpha]`
    pub fn step_smudge(
        current_r: f32, current_g: f32, current_b: f32, current_a: f32,
        sampled_r: u8, sampled_g: u8, sampled_b: u8, sampled_a: f32,
        pick_rate: f32,
    ) -> Vec<f32> {
        let pr = pick_rate.clamp(0.05, 0.95);
        let one_minus_pr = 1.0 - pr;

        let new_r = current_r * one_minus_pr + sampled_r as f32 * pr;
        let new_g = current_g * one_minus_pr + sampled_g as f32 * pr;
        let new_b = current_b * one_minus_pr + sampled_b as f32 * pr;
        let new_a = current_a.max(sampled_a);

        vec![new_r, new_g, new_b, new_a]
    }

    /// Aplica tintado monocromo in-place (Color de capa / Papel cebolla) sobre un buffer RGBA
    pub fn apply_tint_in_place(
        rgba_buffer: &mut [u8],
        tint_r: u8,
        tint_g: u8,
        tint_b: u8,
    ) {
        let total_pixels = rgba_buffer.len() / 4;
        for i in 0..total_pixels {
            let p = i * 4;
            if rgba_buffer[p + 3] > 0 {
                rgba_buffer[p] = tint_r;
                rgba_buffer[p + 1] = tint_g;
                rgba_buffer[p + 2] = tint_b;
            }
        }
    }

    /// Evalúa la respuesta del grano de textura de papel sobre el canal alpha
    /// `mode`: 0 = height (comparar altura), 1 = subtract, 2 = multiply, 3 = outline
    pub fn evaluate_paper_texture(
        grain_val: f32,
        base_alpha: u8,
        pressure: f32,
        density: f32,
        mode: u8,
        invert: bool,
    ) -> u8 {
        if base_alpha == 0 || density <= 0.0 {
            return base_alpha;
        }

        let valley = if invert { grain_val } else { 1.0 - grain_val };
        let dab_a = base_alpha as f32 / 255.0;

        match mode {
            1 => {
                // Subtract
                let out_a = (dab_a - valley * density).max(0.0);
                (out_a * 255.0).round().clamp(0.0, 255.0) as u8
            }
            2 => {
                // Multiply
                let out_a = (dab_a * (1.0 - valley * density)).clamp(0.0, 1.0);
                (out_a * 255.0).round().clamp(0.0, 255.0) as u8
            }
            _ => {
                // Height (comparar altura por defecto)
                let press = pressure.clamp(0.0, 1.0);
                let eff_drive = dab_a * (0.62 + 0.38 * press);
                let denom = (1.0 - density * 0.78).max(0.12);
                let h_factor = ((eff_drive - valley * density * 0.85) / denom).clamp(0.0, 1.0);
                (base_alpha as f32 * h_factor).round().clamp(0.0, 255.0) as u8
            }
        }
    }

    /// Fusiona la capa superior `src_rgba` sobre `dst_rgba` en memoria con modo de fusión, opacidad y alpha lock
    pub fn merge_layers_simd(
        dst_rgba: &mut [u8],
        src_rgba: &[u8],
        width: u32,
        height: u32,
        blend_mode_id: u8,
        opacity: f32,
        lock_alpha: bool,
        clip_mask: &[u8],
    ) -> bool {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        if total == 0 || dst_rgba.len() < total * 4 || src_rgba.len() < total * 4 {
            return false;
        }

        let op = opacity.clamp(0.0, 1.0);
        let has_clip = clip_mask.len() >= total * 4;

        for i in 0..total {
            let p = i * 4;
            let mut sa = (src_rgba[p + 3] as f32 / 255.0) * op;
            if sa <= 0.001 {
                continue;
            }

            if has_clip {
                let base_clip_a = clip_mask[p + 3] as f32 / 255.0;
                sa *= base_clip_a;
                if sa <= 0.001 {
                    continue;
                }
            }

            let da = dst_rgba[p + 3] as f32 / 255.0;
            let sr = src_rgba[p] as f32 / 255.0;
            let sg = src_rgba[p + 1] as f32 / 255.0;
            let sb = src_rgba[p + 2] as f32 / 255.0;

            let dr = dst_rgba[p] as f32 / 255.0;
            let dg = dst_rgba[p + 1] as f32 / 255.0;
            let db = dst_rgba[p + 2] as f32 / 255.0;

            let out_a = if lock_alpha {
                da
            } else {
                sa + da * (1.0 - sa)
            };

            if out_a <= 0.001 {
                dst_rgba[p] = 0;
                dst_rgba[p + 1] = 0;
                dst_rgba[p + 2] = 0;
                dst_rgba[p + 3] = 0;
                continue;
            }

            let br = blend_channel(dr, sr, blend_mode_id);
            let bg = blend_channel(dg, sg, blend_mode_id);
            let bb = blend_channel(db, sb, blend_mode_id);

            let out_r = if lock_alpha {
                dr * (1.0 - sa) + br * sa
            } else {
                (br * sa + dr * da * (1.0 - sa)) / out_a
            };
            let out_g = if lock_alpha {
                dg * (1.0 - sa) + bg * sa
            } else {
                (bg * sa + dg * da * (1.0 - sa)) / out_a
            };
            let out_b = if lock_alpha {
                db * (1.0 - sa) + bb * sa
            } else {
                (bb * sa + db * da * (1.0 - sa)) / out_a
            };

            dst_rgba[p] = (out_r.clamp(0.0, 1.0) * 255.0).round() as u8;
            dst_rgba[p + 1] = (out_g.clamp(0.0, 1.0) * 255.0).round() as u8;
            dst_rgba[p + 2] = (out_b.clamp(0.0, 1.0) * 255.0).round() as u8;
            if !lock_alpha {
                dst_rgba[p + 3] = (out_a.clamp(0.0, 1.0) * 255.0).round() as u8;
            }
        }

        true
    }
}

#[inline(always)]
fn blend_channel(base: f32, blend: f32, mode: u8) -> f32 {
    match mode {
        1 => base * blend, // Multiply
        2 => 1.0 - (1.0 - base) * (1.0 - blend), // Screen
        3 => { // Overlay
            if base < 0.5 {
                2.0 * base * blend
            } else {
                1.0 - 2.0 * (1.0 - base) * (1.0 - blend)
            }
        }
        4 => base.min(blend), // Darken
        5 => base.max(blend), // Lighten
        6 => { // Color Dodge
            if blend >= 1.0 { 1.0 } else { (base / (1.0 - blend)).min(1.0) }
        }
        7 => { // Color Burn
            if blend <= 0.0 { 0.0 } else { (1.0 - (1.0 - base) / blend).max(0.0) }
        }
        8 => { // Hard Light
            if blend < 0.5 {
                2.0 * base * blend
            } else {
                1.0 - 2.0 * (1.0 - base) * (1.0 - blend)
            }
        }
        9 => { // Soft Light (Pegtop formula)
            (1.0 - 2.0 * blend) * base * base + 2.0 * blend * base
        }
        10 => (base - blend).abs(), // Difference
        11 => base + blend - 2.0 * base * blend, // Exclusion
        12 => (base + blend).min(1.0), // Linear Dodge (Add)
        13 => (base + blend - 1.0).max(0.0), // Linear Burn
        14 => { // Vivid Light
            if blend < 0.5 {
                if blend <= 0.0 { 0.0 } else { (1.0 - (1.0 - base) / (2.0 * blend)).max(0.0) }
            } else {
                let b2 = 2.0 * (blend - 0.5);
                if b2 >= 1.0 { 1.0 } else { (base / (1.0 - b2)).min(1.0) }
            }
        }
        15 => { // Pin Light
            if blend < 0.5 {
                base.min(2.0 * blend)
            } else {
                base.max(2.0 * (blend - 0.5))
            }
        }
        16 => { // Hard Mix
            if base + blend >= 1.0 { 1.0 } else { 0.0 }
        }
        _ => blend, // Normal
    }
}
