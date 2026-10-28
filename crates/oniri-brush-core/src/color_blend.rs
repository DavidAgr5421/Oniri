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

    /// Genera una tesela RGBA matricial de patrón de grano de papel optimizada para repetición
    pub fn generate_paper_pattern_tile(
        out_rgba: &mut [u8],
        tile_width: u32,
        tile_height: u32,
        tooth_matrix: &[f32],
        tooth_width: u32,
        tooth_height: u32,
        density: f32,
        mode: u8,
        invert: bool,
    ) -> bool {
        let tw = tile_width as usize;
        let th = tile_height as usize;
        let total_pixels = tw * th;
        if total_pixels == 0 || out_rgba.len() < total_pixels * 4 {
            return false;
        }

        let aw = tooth_width as usize;
        let ah = tooth_height as usize;
        if aw == 0 || ah == 0 || tooth_matrix.len() < aw * ah {
            return false;
        }

        let q_density = density.clamp(0.0, 1.0);
        let denom = (1.0 - q_density * 0.78).max(0.12);

        for py in 0..th {
            let sy = (py * ah / th).min(ah - 1);
            let row_offset = py * tw;

            for px in 0..tw {
                let sx = (px * aw / tw).min(aw - 1);
                let raw_tooth = tooth_matrix[sy * aw + sx];
                let tooth = if invert { 1.0 - raw_tooth } else { raw_tooth };
                let valley = 1.0 - tooth;

                let mult = match mode {
                    1 => (1.0 - valley * q_density * 1.15).max(0.0), // subtract
                    2 => (1.0 - valley * q_density).max(0.0),         // multiply
                    3 => {                                           // outline
                        let sx_r = (sx + 1) % aw;
                        let sy_d = (sy + 1) % ah;
                        let tr_raw = tooth_matrix[sy * aw + sx_r];
                        let td_raw = tooth_matrix[sy_d * aw + sx];
                        let tr = if invert { 1.0 - tr_raw } else { tr_raw };
                        let td = if invert { 1.0 - td_raw } else { td_raw };

                        let dx = tooth - tr;
                        let dy = tooth - td;
                        let grad = ((dx * dx + dy * dy).sqrt() * 3.4).min(1.0);
                        let hard_tooth = if tooth > 0.46 {
                            1.0
                        } else {
                            ((tooth - 0.15) / 0.31).max(0.0)
                        };
                        let edge_boost = (hard_tooth * 0.78 + grad * 0.55).min(1.0);
                        1.0 - q_density + q_density * edge_boost
                    }
                    _ => {                                           // height (valley threshold)
                        let threshold = valley * q_density * 0.92;
                        ((1.0 - threshold) / denom).clamp(0.0, 1.0)
                    }
                };

                let p = (row_offset + px) * 4;
                out_rgba[p] = 255;
                out_rgba[p + 1] = 255;
                out_rgba[p + 2] = 255;
                out_rgba[p + 3] = (mult.clamp(0.0, 1.0) * 255.0).round() as u8;
            }
        }

        true
    }

    /// Aplica modulación matricial de grano de papel SIMD in-place sobre un buffer RGBA
    /// Modula directamente el canal alfa (y premultiplica si llega a 0) en memoria contigua.
    pub fn apply_paper_grain_rect(
        rgba_buffer: &mut [u8],
        stride_width: u32,
        rect_width: u32,
        rect_height: u32,
        doc_origin_x: i32,
        doc_origin_y: i32,
        tooth_matrix: &[f32],
        tooth_width: u32,
        tooth_height: u32,
        scale: f32,
        density: f32,
        mode: u8,
        invert: bool,
    ) -> bool {
        let rw = rect_width as usize;
        let rh = rect_height as usize;
        let sw = stride_width as usize;
        let total_pixels = sw * rh;
        if rw == 0 || rh == 0 || rgba_buffer.len() < total_pixels * 4 {
            return false;
        }

        let tw = tooth_width as usize;
        let th = tooth_height as usize;
        if tw == 0 || th == 0 || tooth_matrix.len() < tw * th {
            return false;
        }

        let s = scale.max(0.05);
        let q_density = density.clamp(0.0, 1.0);
        if q_density <= 0.0001 {
            return true;
        }

        let denom = (1.0 - q_density * 0.78).max(0.12);

        for ry in 0..rh {
            let doc_y = doc_origin_y + ry as i32;
            let ty = ((doc_y.abs() as f32 * s) as usize) % th;
            let row_offset = ry * sw;

            for rx in 0..rw {
                let p = (row_offset + rx) * 4;
                let cur_a = rgba_buffer[p + 3];
                if cur_a == 0 {
                    continue;
                }

                let doc_x = doc_origin_x + rx as i32;
                let tx = ((doc_x.abs() as f32 * s) as usize) % tw;

                let raw_tooth = tooth_matrix[ty * tw + tx];
                let tooth = if invert { 1.0 - raw_tooth } else { raw_tooth };
                let valley = 1.0 - tooth;

                let mult = match mode {
                    1 => (1.0 - valley * q_density * 1.15).max(0.0),
                    2 => (1.0 - valley * q_density).max(0.0),
                    3 => {
                        let sx_r = (tx + 1) % tw;
                        let sy_d = (ty + 1) % th;
                        let tr_raw = tooth_matrix[ty * tw + sx_r];
                        let td_raw = tooth_matrix[sy_d * tw + tx];
                        let tr = if invert { 1.0 - tr_raw } else { tr_raw };
                        let td = if invert { 1.0 - td_raw } else { td_raw };

                        let dx = tooth - tr;
                        let dy = tooth - td;
                        let grad = ((dx * dx + dy * dy).sqrt() * 3.4).min(1.0);
                        let hard_tooth = if tooth > 0.46 {
                            1.0
                        } else {
                            ((tooth - 0.15) / 0.31).max(0.0)
                        };
                        let edge_boost = (hard_tooth * 0.78 + grad * 0.55).min(1.0);
                        1.0 - q_density + q_density * edge_boost
                    }
                    _ => {
                        let threshold = valley * q_density * 0.92;
                        ((1.0 - threshold) / denom).clamp(0.0, 1.0)
                    }
                };

                let new_a = ((cur_a as f32 / 255.0) * mult.clamp(0.0, 1.0) * 255.0).round() as u8;
                rgba_buffer[p + 3] = new_a;
                if new_a == 0 {
                    rgba_buffer[p] = 0;
                    rgba_buffer[p + 1] = 0;
                    rgba_buffer[p + 2] = 0;
                }
            }
        }

        true
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

    /// Fusiona de forma ultra-rápida un rectángulo delimitado [min_x, min_y, max_x, max_y]
    /// de un trazo (`src_rgba`) sobre la capa de destino (`dst_rgba`), aplicando opacidad,
    /// modo de mezcla (normal, lighter, multiply, screen, etc.) y bloqueo de canal alfa (`lock_alpha`).
    /// Si `clip_mask` no está vacío, modula el alfa del trazo por la máscara.
    pub fn merge_stroke_rect(
        dst_rgba: &mut [u8],
        src_rgba: &[u8],
        stride_width: u32,
        stride_height: u32,
        min_x: u32,
        min_y: u32,
        max_x: u32,
        max_y: u32,
        blend_mode_id: u8,
        opacity: f32,
        lock_alpha: bool,
        clip_mask: &[u8],
    ) -> bool {
        let sw = stride_width as usize;
        let sh = stride_height as usize;
        let total_pixels = sw * sh;
        if total_pixels == 0 || dst_rgba.len() < total_pixels * 4 || src_rgba.len() < total_pixels * 4 {
            return false;
        }

        let op = opacity.clamp(0.0, 1.0);
        if op <= 0.0001 {
            return true;
        }

        let min_x = (min_x as usize).min(sw);
        let max_x = (max_x as usize).min(sw);
        let min_y = (min_y as usize).min(sh);
        let max_y = (max_y as usize).min(sh);

        if min_x >= max_x || min_y >= max_y {
            return true;
        }

        let has_clip = clip_mask.len() >= total_pixels * 4;

        for y in min_y..max_y {
            let row_offset = y * sw;
            for x in min_x..max_x {
                let p = (row_offset + x) * 4;

                let mut sa = (src_rgba[p + 3] as f32 / 255.0) * op;
                if sa <= 0.001 {
                    continue;
                }

                if has_clip {
                    let clip_a = clip_mask[p + 3] as f32 / 255.0;
                    sa *= clip_a;
                    if sa <= 0.001 {
                        continue;
                    }
                }

                let da = dst_rgba[p + 3] as f32 / 255.0;

                // Si lock_alpha está activo y el destino es transparente, se ignora por completo
                if lock_alpha && da <= 0.001 {
                    continue;
                }

                let sr = src_rgba[p] as f32 / 255.0;
                let sg = src_rgba[p + 1] as f32 / 255.0;
                let sb = src_rgba[p + 2] as f32 / 255.0;

                let dr = dst_rgba[p] as f32 / 255.0;
                let dg = dst_rgba[p + 1] as f32 / 255.0;
                let db = dst_rgba[p + 2] as f32 / 255.0;

                let br = blend_channel(dr, sr, blend_mode_id);
                let bg = blend_channel(dg, sg, blend_mode_id);
                let bb = blend_channel(db, sb, blend_mode_id);

                if lock_alpha {
                    // Lock Alpha: el alfa del destino permanece 100% inalterado (source-atop)
                    let out_r = dr * (1.0 - sa) + br * sa;
                    let out_g = dg * (1.0 - sa) + bg * sa;
                    let out_b = db * (1.0 - sa) + bb * sa;

                    dst_rgba[p] = (out_r.clamp(0.0, 1.0) * 255.0).round() as u8;
                    dst_rgba[p + 1] = (out_g.clamp(0.0, 1.0) * 255.0).round() as u8;
                    dst_rgba[p + 2] = (out_b.clamp(0.0, 1.0) * 255.0).round() as u8;
                    // dst_rgba[p + 3] no se toca
                } else if blend_mode_id == 12 {
                    // Lighter / Linear Dodge (aditivo)
                    let out_a = (sa + da).min(1.0);
                    let out_r = (sr * sa + dr * da).min(1.0);
                    let out_g = (sg * sa + dg * da).min(1.0);
                    let out_b = (sb * sa + db * da).min(1.0);

                    dst_rgba[p] = (out_r * 255.0).round() as u8;
                    dst_rgba[p + 1] = (out_g * 255.0).round() as u8;
                    dst_rgba[p + 2] = (out_b * 255.0).round() as u8;
                    dst_rgba[p + 3] = (out_a * 255.0).round() as u8;
                } else {
                    // Standard Source-Over composite
                    let out_a = sa + da * (1.0 - sa);
                    if out_a <= 0.001 {
                        dst_rgba[p] = 0;
                        dst_rgba[p + 1] = 0;
                        dst_rgba[p + 2] = 0;
                        dst_rgba[p + 3] = 0;
                    } else {
                        let out_r = (br * sa + dr * da * (1.0 - sa)) / out_a;
                        let out_g = (bg * sa + dg * da * (1.0 - sa)) / out_a;
                        let out_b = (bb * sa + db * da * (1.0 - sa)) / out_a;

                        dst_rgba[p] = (out_r.clamp(0.0, 1.0) * 255.0).round() as u8;
                        dst_rgba[p + 1] = (out_g.clamp(0.0, 1.0) * 255.0).round() as u8;
                        dst_rgba[p + 2] = (out_b.clamp(0.0, 1.0) * 255.0).round() as u8;
                        dst_rgba[p + 3] = (out_a.clamp(0.0, 1.0) * 255.0).round() as u8;
                    }
                }
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
