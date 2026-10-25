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

    /// Extrae segmentos de contorno vectoriales [x1, y1, x2, y2, ...]
    /// Aplica fusión colineal automática para reducir miles de píxeles a unas pocas líneas.
    pub fn extract_boundary_segments(
        src_buffer: &[u8],
        width: u32,
        height: u32,
        min_x: i32,
        min_y: i32,
        max_x: i32,
        max_y: i32,
        is_rgba: bool,
    ) -> Vec<f32> {
        let w = width as usize;
        let h = height as usize;
        if w == 0 || h == 0 || src_buffer.is_empty() {
            return Vec::new();
        }

        let stride = if is_rgba { 4 } else { 1 };
        let alpha_offset = if is_rgba { 3 } else { 0 };

        let x0 = (min_x.max(0) as usize).min(w - 1);
        let y0 = (min_y.max(0) as usize).min(h - 1);
        let x1 = (max_x.max(0) as usize).min(w - 1);
        let y1 = (max_y.max(0) as usize).min(h - 1);

        if x1 < x0 || y1 < y0 {
            return Vec::new();
        }

        let mut segments = Vec::with_capacity(1024);

        let is_sel = |x: usize, y: usize| -> bool {
            src_buffer[(y * w + x) * stride + alpha_offset] > 128
        };

        // 1. Bordes horizontales (Superior e Inferior) con fusión colineal
        for y in y0..=y1 {
            // Borde superior
            let mut in_top = false;
            let mut seg_start_x = 0;
            for x in x0..=(x1 + 1) {
                let edge = x <= x1 && is_sel(x, y) && (y == 0 || !is_sel(x, y - 1));
                if edge && !in_top {
                    in_top = true;
                    seg_start_x = x;
                } else if !edge && in_top {
                    in_top = false;
                    segments.push(seg_start_x as f32);
                    segments.push(y as f32);
                    segments.push(x as f32);
                    segments.push(y as f32);
                }
            }

            // Borde inferior
            let mut in_bottom = false;
            let mut b_start_x = 0;
            for x in x0..=(x1 + 1) {
                let edge = x <= x1 && is_sel(x, y) && (y == h - 1 || !is_sel(x, y + 1));
                if edge && !in_bottom {
                    in_bottom = true;
                    b_start_x = x;
                } else if !edge && in_bottom {
                    in_bottom = false;
                    segments.push(b_start_x as f32);
                    segments.push((y + 1) as f32);
                    segments.push(x as f32);
                    segments.push((y + 1) as f32);
                }
            }
        }

        // 2. Bordes verticales (Izquierdo y Derecho) con fusión colineal
        for x in x0..=x1 {
            // Borde izquierdo
            let mut in_left = false;
            let mut seg_start_y = 0;
            for y in y0..=(y1 + 1) {
                let edge = y <= y1 && is_sel(x, y) && (x == 0 || !is_sel(x - 1, y));
                if edge && !in_left {
                    in_left = true;
                    seg_start_y = y;
                } else if !edge && in_left {
                    in_left = false;
                    segments.push(x as f32);
                    segments.push(seg_start_y as f32);
                    segments.push(x as f32);
                    segments.push(y as f32);
                }
            }

            // Borde derecho
            let mut in_right = false;
            let mut r_start_y = 0;
            for y in y0..=(y1 + 1) {
                let edge = y <= y1 && is_sel(x, y) && (x == w - 1 || !is_sel(x + 1, y));
                if edge && !in_right {
                    in_right = true;
                    r_start_y = y;
                } else if !edge && in_right {
                    in_right = false;
                    segments.push((x + 1) as f32);
                    segments.push(r_start_y as f32);
                    segments.push((x + 1) as f32);
                    segments.push(y as f32);
                }
            }
        }

        segments
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

    /// Varita Mágica (Magic Wand): Selección continua o global por tolerancia de color
    pub fn magic_wand_selection(
        rgba: &[u8],
        width: u32,
        height: u32,
        seed_x: u32,
        seed_y: u32,
        tolerance: f32,
        contiguous: bool,
        antialias: bool,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];
        if total == 0 || (seed_x as usize) >= w || (seed_y as usize) >= h || rgba.len() < total * 4 {
            return output;
        }

        let seed_idx = (seed_y as usize) * w + (seed_x as usize);
        let sp = seed_idx * 4;
        let sr = rgba[sp] as i32;
        let sg = rgba[sp + 1] as i32;
        let sb = rgba[sp + 2] as i32;
        let sa = rgba[sp + 3] as i32;

        let tol = (tolerance.clamp(0.0, 100.0) / 100.0) * 255.0;
        let tol_sq = ((tol * tol * 3.0) as i32).max(1);
        let inner_tol_sq = if antialias { (tol_sq as f32 * 0.70) as i32 } else { tol_sq };

        #[inline(always)]
        fn dist_sq(rgba: &[u8], idx: usize, sr: i32, sg: i32, sb: i32, sa: i32) -> i32 {
            let p = idx * 4;
            let dr = rgba[p] as i32 - sr;
            let dg = rgba[p + 1] as i32 - sg;
            let db = rgba[p + 2] as i32 - sb;
            let da = rgba[p + 3] as i32 - sa;
            dr * dr + dg * dg + db * db + da * da
        }

        if !contiguous {
            // Selección global por gama de color (Select by color / Color range)
            for i in 0..total {
                let d2 = dist_sq(rgba, i, sr, sg, sb, sa);
                if d2 <= tol_sq {
                    let alpha = if antialias && d2 > inner_tol_sq {
                        let t = (d2 - inner_tol_sq) as f32 / (tol_sq - inner_tol_sq).max(1) as f32;
                        ((1.0 - t).clamp(0.0, 1.0) * 255.0).round() as u8
                    } else {
                        255
                    };
                    if alpha > 0 {
                        let p = i * 4;
                        output[p] = 255;
                        output[p + 1] = 255;
                        output[p + 2] = 255;
                        output[p + 3] = alpha;
                    }
                }
            }
            return output;
        }

        // Selección continua por flood-fill scanline
        let mut visited = vec![0u8; total];
        let mut queue = Vec::with_capacity(4096);
        queue.push(seed_idx);
        visited[seed_idx] = 1;

        while let Some(curr_idx) = queue.pop() {
            let cx = curr_idx % w;
            let cy = curr_idx / w;
            let line_y = cy * w;

            let mut left = cx;
            while left > 0 && visited[line_y + left - 1] == 0 && dist_sq(rgba, line_y + left - 1, sr, sg, sb, sa) <= tol_sq {
                left -= 1;
            }

            let mut right = cx;
            while right + 1 < w && visited[line_y + right + 1] == 0 && dist_sq(rgba, line_y + right + 1, sr, sg, sb, sa) <= tol_sq {
                right += 1;
            }

            for x in left..=right {
                let idx = line_y + x;
                visited[idx] = 1;
                let d2 = dist_sq(rgba, idx, sr, sg, sb, sa);
                let alpha = if antialias && d2 > inner_tol_sq {
                    let t = (d2 - inner_tol_sq) as f32 / (tol_sq - inner_tol_sq).max(1) as f32;
                    ((1.0 - t).clamp(0.0, 1.0) * 255.0).round() as u8
                } else {
                    255
                };
                let p = idx * 4;
                output[p] = 255;
                output[p + 1] = 255;
                output[p + 2] = 255;
                output[p + 3] = alpha;
            }

            // Vecinos superior e inferior
            if cy > 0 {
                let next_line = (cy - 1) * w;
                let mut in_span = false;
                for x in left..=right {
                    let idx = next_line + x;
                    let matches = visited[idx] == 0 && dist_sq(rgba, idx, sr, sg, sb, sa) <= tol_sq;
                    if !in_span && matches {
                        queue.push(idx);
                        in_span = true;
                    } else if in_span && !matches {
                        in_span = false;
                    }
                }
            }

            if cy + 1 < h {
                let next_line = (cy + 1) * w;
                let mut in_span = false;
                for x in left..=right {
                    let idx = next_line + x;
                    let matches = visited[idx] == 0 && dist_sq(rgba, idx, sr, sg, sb, sa) <= tol_sq;
                    if !in_span && matches {
                        queue.push(idx);
                        in_span = true;
                    } else if in_span && !matches {
                        in_span = false;
                    }
                }
            }
        }

        output
    }

    /// Desvanecer selección (Feather): Desenfoque gaussiano separable rápido sobre el canal alfa de la máscara
    pub fn feather_selection(
        mask_rgba: &[u8],
        width: u32,
        height: u32,
        radius: f32,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];
        if total == 0 || radius <= 0.2 || mask_rgba.len() < total * 4 {
            let copy_len = mask_rgba.len().min(total * 4);
            output[..copy_len].copy_from_slice(&mask_rgba[..copy_len]);
            return output;
        }

        let r = radius.clamp(0.5, 64.0);
        let kernel_radius = (r * 2.0).ceil() as usize;
        let mut kernel = vec![0.0f32; kernel_radius * 2 + 1];
        let sigma2 = 2.0 * r * r;
        let mut sum = 0.0f32;
        for i in 0..kernel.len() {
            let x = (i as isize - kernel_radius as isize) as f32;
            let val = (-x * x / sigma2).exp();
            kernel[i] = val;
            sum += val;
        }
        for k in kernel.iter_mut() {
            *k /= sum;
        }

        // Pasada horizontal sobre canal alfa
        let mut temp_alpha = vec![0.0f32; total];
        for y in 0..h {
            let row_offset = y * w;
            for x in 0..w {
                let mut a_val = 0.0f32;
                for ki in 0..kernel.len() {
                    let offset = ki as isize - kernel_radius as isize;
                    let kx = ((x as isize + offset).max(0) as usize).min(w - 1);
                    let a = mask_rgba[(row_offset + kx) * 4 + 3] as f32;
                    a_val += a * kernel[ki];
                }
                temp_alpha[row_offset + x] = a_val;
            }
        }

        // Pasada vertical sobre canal alfa y escritura a RGBA
        for y in 0..h {
            let row_offset = y * w;
            for x in 0..w {
                let mut a_val = 0.0f32;
                for ki in 0..kernel.len() {
                    let offset = ki as isize - kernel_radius as isize;
                    let ky = ((y as isize + offset).max(0) as usize).min(h - 1);
                    a_val += temp_alpha[ky * w + x] * kernel[ki];
                }
                let final_a = (a_val.round().clamp(0.0, 255.0)) as u8;
                if final_a > 0 {
                    let p = (row_offset + x) * 4;
                    output[p] = 255;
                    output[p + 1] = 255;
                    output[p + 2] = 255;
                    output[p + 3] = final_a;
                }
            }
        }

        output
    }

    /// Borde de selección (Border Selection): Convierte la selección en un contorno hueco
    /// position: 0 = interior, 1 = centrado, 2 = exterior
    pub fn border_selection(
        mask_rgba: &[u8],
        width: u32,
        height: u32,
        radius: i32,
        position: u8,
    ) -> Vec<u8> {
        let w = width as usize;
        let h = height as usize;
        let total = w * h;
        let mut output = vec![0u8; total * 4];
        let r = radius.clamp(1, 48);
        if total == 0 || mask_rgba.len() < total * 4 {
            return output;
        }

        let mut bin = vec![0u8; total];
        for i in 0..total {
            if mask_rgba[i * 4 + 3] > 128 {
                bin[i] = 1;
            }
        }

        let mut final_border = vec![0u8; total];

        if position == 1 {
            // Centrado: Dilatación(r/2) - Erosión(r/2)
            let r_half = (r / 2).max(1);
            let dilated = Self::morphology_expand(mask_rgba, width, height, r_half, true);
            let contracted = Self::morphology_contract(mask_rgba, width, height, r_half, true);
            for i in 0..total {
                let d_val = dilated[i * 4 + 3] > 128;
                let c_val = contracted[i * 4 + 3] > 128;
                if d_val && !c_val {
                    final_border[i] = 1;
                }
            }
        } else if position == 2 {
            // Exterior: Dilatación(r) - Original
            let dilated = Self::morphology_expand(mask_rgba, width, height, r, true);
            for i in 0..total {
                let d_val = dilated[i * 4 + 3] > 128;
                let orig = bin[i] == 1;
                if d_val && !orig {
                    final_border[i] = 1;
                }
            }
        } else {
            // Interior: Original - Erosión(r)
            let contracted = Self::morphology_contract(mask_rgba, width, height, r, true);
            for i in 0..total {
                let orig = bin[i] == 1;
                let c_val = contracted[i * 4 + 3] > 128;
                if orig && !c_val {
                    final_border[i] = 1;
                }
            }
        }

        for i in 0..total {
            if final_border[i] == 1 {
                let p = i * 4;
                output[p] = 255;
                output[p + 1] = 255;
                output[p + 2] = 255;
                output[p + 3] = 255;
            }
        }

        output
    }
}
