use wasm_bindgen::prelude::*;

/// Motor nativo de selección, morfología y extracción de bordes (Marching Ants)
#[wasm_bindgen]
pub struct SelectionCore;

#[wasm_bindgen]
impl SelectionCore {
    /// Calcula de manera ultrarrápida los límites de la selección (bounding box)
    /// Retorna `[min_x, min_y, max_x, max_y, width, height]` o un vector vacío si no hay selección.
    pub fn compute_bounds(buffer: &[u8], width: u32, height: u32, is_rgba: bool) -> Vec<i32> {
        let w = width as usize;
        let h = height as usize;
        if w == 0 || h == 0 || buffer.is_empty() {
            return Vec::new();
        }

        let stride = if is_rgba { 4 } else { 1 };
        let alpha_offset = if is_rgba { 3 } else { 0 };

        let mut min_x = w as i32;
        let mut min_y = h as i32;
        let mut max_x = -1i32;
        let mut max_y = -1i32;
        let mut found = false;

        for y in 0..h {
            let row_start = y * w * stride;
            let yi = y as i32;

            for x in 0..w {
                let a = buffer[row_start + x * stride + alpha_offset];
                if a > 0 {
                    found = true;
                    let xi = x as i32;
                    if xi < min_x { min_x = xi; }
                    if xi > max_x { max_x = xi; }
                    if yi < min_y { min_y = yi; }
                    if yi > max_y { max_y = yi; }
                }
            }
        }

        if !found {
            Vec::new()
        } else {
            vec![
                min_x,
                min_y,
                max_x,
                max_y,
                max_x - min_x + 1,
                max_y - min_y + 1,
            ]
        }
    }

    /// Dilatación morfológica circular (Expand Selection) directamente a RGBA
    pub fn morphology_expand(
        src_buffer: &[u8],
        width: u32,
        height: u32,
        radius: i32,
        is_rgba: bool,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];
        if total == 0 {
            return output;
        }

        let r = radius.clamp(1, 64);
        let stride = if is_rgba { 4 } else { 1 };
        let alpha_offset = if is_rgba { 3 } else { 0 };

        // 1. Extraer máscara binaria (1 si alpha > 128, 0 si no)
        let mut bin = vec![0u8; total];
        for i in 0..total {
            let a = src_buffer[i * stride + alpha_offset];
            if a > 128 {
                bin[i] = 1;
            }
        }

        // 2. Dilatación circular precisa por disco euclidiano
        let mut dilated = bin.clone();
        let wi = w as isize;
        let hi = h as isize;
        let r_sq = r * r;

        // Optimización separable de 2 pasadas si el radio es grande (> 6),
        // o dilatación circular euclidiana exacta para radios pequeños/medianos.
        for y in 0..hi {
            for x in 0..wi {
                if bin[(y as usize) * w + (x as usize)] == 1 {
                    for dy in -r..=r {
                        let ny = y + (dy as isize);
                        if ny < 0 || ny >= hi {
                            continue;
                        }
                        let rem_r_sq = r_sq - dy * dy;
                        if rem_r_sq < 0 {
                            continue;
                        }
                        let max_dx = (rem_r_sq as f32).sqrt().floor() as isize;
                        let x0 = (x - max_dx).max(0) as usize;
                        let x1 = (x + max_dx).min(wi - 1) as usize;
                        let row_offset = (ny as usize) * w;
                        for nx in x0..=x1 {
                            dilated[row_offset + nx] = 1;
                        }
                    }
                }
            }
        }

        // 3. Escribir resultado a RGBA (#ffffff con alpha 255)
        for i in 0..total {
            if dilated[i] == 1 {
                let p = i * 4;
                output[p] = 255;
                output[p + 1] = 255;
                output[p + 2] = 255;
                output[p + 3] = 255;
            }
        }

        output
    }

    /// Erosión morfológica circular (Contract / Reduce Selection) directamente a RGBA
    pub fn morphology_contract(
        src_buffer: &[u8],
        width: u32,
        height: u32,
        radius: i32,
        is_rgba: bool,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];
        if total == 0 {
            return output;
        }

        let r = radius.clamp(1, 64);
        let stride = if is_rgba { 4 } else { 1 };
        let alpha_offset = if is_rgba { 3 } else { 0 };

        // 1. Extraer máscara invertida (1 si el pixel NO está seleccionado)
        let mut inverted_bin = vec![0u8; total];
        for i in 0..total {
            let a = src_buffer[i * stride + alpha_offset];
            if a <= 128 {
                inverted_bin[i] = 1;
            }
        }

        // 2. Dilatar la máscara invertida (el fondo come hacia adentro)
        let mut dilated = inverted_bin.clone();
        let wi = w as isize;
        let hi = h as isize;
        let r_sq = r * r;

        for y in 0..hi {
            for x in 0..wi {
                if inverted_bin[(y as usize) * w + (x as usize)] == 1 {
                    for dy in -r..=r {
                        let ny = y + (dy as isize);
                        if ny < 0 || ny >= hi {
                            continue;
                        }
                        let rem_r_sq = r_sq - dy * dy;
                        if rem_r_sq < 0 {
                            continue;
                        }
                        let max_dx = (rem_r_sq as f32).sqrt().floor() as isize;
                        let x0 = (x - max_dx).max(0) as usize;
                        let x1 = (x + max_dx).min(wi - 1) as usize;
                        let row_offset = (ny as usize) * w;
                        for nx in x0..=x1 {
                            dilated[row_offset + nx] = 1;
                        }
                    }
                }
            }
        }

        // 3. Los píxeles que queden en 0 en dilated son los que sobrevivieron a la contracción
        for i in 0..total {
            if dilated[i] == 0 {
                let p = i * 4;
                output[p] = 255;
                output[p + 1] = 255;
                output[p + 2] = 255;
                output[p + 3] = 255;
            }
        }

        output
    }

    /// Extrae el contorno perimetral exacto de 1 píxel para las Marching Ants
    /// Genera directamente un buffer RGBA con el perímetro marcado para pintar en canvas
    pub fn extract_boundary_mask(
        src_buffer: &[u8],
        width: u32,
        height: u32,
        is_rgba: bool,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut boundary_rgba = vec![0u8; total * 4];
        if total == 0 {
            return boundary_rgba;
        }

        let stride = if is_rgba { 4 } else { 1 };
        let alpha_offset = if is_rgba { 3 } else { 0 };

        // 1. Extraer máscara booleana
        let mut is_sel = vec![false; total];
        for i in 0..total {
            is_sel[i] = src_buffer[i * stride + alpha_offset] > 128;
        }

        // 2. Un píxel es borde si está seleccionado y tiene al menos un vecino 4-conexo no seleccionado
        for y in 0..h {
            let row_offset = y * w;
            for x in 0..w {
                let idx = row_offset + x;
                if is_sel[idx] {
                    let has_unselected_neighbor =
                        x == 0 || !is_sel[idx - 1] ||
                        x == w - 1 || !is_sel[idx + 1] ||
                        y == 0 || !is_sel[idx - w] ||
                        y == h - 1 || !is_sel[idx + w];

                    if has_unselected_neighbor {
                        let p = idx * 4;
                        boundary_rgba[p] = 255;
                        boundary_rgba[p + 1] = 255;
                        boundary_rgba[p + 2] = 255;
                        boundary_rgba[p + 3] = 255;
                    }
                }
            }
        }

        boundary_rgba
    }

    /// Inversión de máscara booleana directamente a RGBA
    pub fn invert_mask(src_rgba: &[u8], width: u32, height: u32) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];

        for i in 0..total {
            let a = src_rgba[i * 4 + 3];
            let p = i * 4;
            if a <= 128 {
                output[p] = 255;
                output[p + 1] = 255;
                output[p + 2] = 255;
                output[p + 3] = 255;
            }
        }

        output
    }
}
