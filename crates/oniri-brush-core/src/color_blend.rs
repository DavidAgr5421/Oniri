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
}
