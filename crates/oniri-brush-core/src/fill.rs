use wasm_bindgen::prelude::*;

/// Dilatación morfológica separable en 2 pasadas (horizontal + vertical) en O(N)
pub fn dilate_binary_mask_into(
    src: &[u8],
    temp: &mut [u8],
    dst: &mut [u8],
    w: usize,
    h: usize,
    radius: i32,
) {
    let total = w * h;
    if radius <= 0 || w == 0 || h == 0 {
        dst[..total].copy_from_slice(&src[..total]);
        return;
    }
    let rad = radius.clamp(1, 25) as isize;
    let wi = w as isize;
    let hi = h as isize;

    temp[..total].fill(0);
    dst[..total].fill(0);

    // Pasada horizontal
    for y in 0..h {
        let row_offset = y * w;
        let mut count_in_window: i32 = 0;

        let init_end = rad.min(wi - 1);
        for x in 0..=init_end {
            if src[row_offset + (x as usize)] == 1 {
                count_in_window += 1;
            }
        }

        for x in 0..wi {
            if count_in_window > 0 {
                temp[row_offset + (x as usize)] = 1;
            }
            let leaving_x = x - rad;
            let entering_x = x + rad + 1;
            if leaving_x >= 0 && leaving_x < wi && src[row_offset + (leaving_x as usize)] == 1 {
                count_in_window -= 1;
            }
            if entering_x >= 0 && entering_x < wi && src[row_offset + (entering_x as usize)] == 1 {
                count_in_window += 1;
            }
        }
    }

    // Pasada vertical (Row-major contigua, amigable con la caché L1 de la CPU)
    let mut col_counts = vec![0i32; w];
    let init_end = rad.min(hi - 1);
    for y in 0..=init_end {
        let row_offset = (y as usize) * w;
        for x in 0..w {
            if temp[row_offset + x] == 1 {
                col_counts[x] += 1;
            }
        }
    }

    for y in 0..hi {
        let row_offset = (y as usize) * w;
        let leaving_y = y - rad;
        let entering_y = y + rad + 1;
        let has_leaving = leaving_y >= 0 && leaving_y < hi;
        let has_entering = entering_y >= 0 && entering_y < hi;
        let row_leaving = if has_leaving { (leaving_y as usize) * w } else { 0 };
        let row_entering = if has_entering { (entering_y as usize) * w } else { 0 };

        for x in 0..w {
            if col_counts[x] > 0 {
                dst[row_offset + x] = 1;
            }
            if has_leaving && temp[row_leaving + x] == 1 {
                col_counts[x] -= 1;
            }
            if has_entering && temp[row_entering + x] == 1 {
                col_counts[x] += 1;
            }
        }
    }
}

/// Erosión morfológica por dualidad: Erosion(M) = 1 - Dilation(1 - M) en O(N)
pub fn erode_binary_mask_into(
    src: &[u8],
    comp: &mut [u8],
    temp: &mut [u8],
    dst: &mut [u8],
    w: usize,
    h: usize,
    radius: i32,
) {
    let total = w * h;
    if radius <= 0 || w == 0 || h == 0 {
        dst[..total].copy_from_slice(&src[..total]);
        return;
    }
    for i in 0..total {
        comp[i] = if src[i] == 0 { 1 } else { 0 };
    }
    dilate_binary_mask_into(comp, temp, dst, w, h, radius);
    for i in 0..total {
        dst[i] = if dst[i] == 0 { 1 } else { 0 };
    }
}

/// Motor morfológico en Rust + WASM para Smart Fill, Enclose & Fill y Paint Unfilled Area
#[wasm_bindgen]
pub struct SmartFillCore {
    obstacle_mask: Vec<u8>,
    obstacles_for_flood: Vec<u8>,
    bridge_mask: Vec<u8>,
    visited: Vec<u8>,
    raw_fill_mask: Vec<u8>,
    final_fill_mask: Vec<u8>,
    scratch_a: Vec<u8>,
    scratch_b: Vec<u8>,
    queue: Vec<u32>,
    bounds: [i32; 4], // [min_x, min_y, max_x, max_y]
}

#[wasm_bindgen]
impl SmartFillCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            obstacle_mask: Vec::new(),
            obstacles_for_flood: Vec::new(),
            bridge_mask: Vec::new(),
            visited: Vec::new(),
            raw_fill_mask: Vec::new(),
            final_fill_mask: Vec::new(),
            scratch_a: Vec::new(),
            scratch_b: Vec::new(),
            queue: Vec::with_capacity(4096),
            bounds: [0, 0, -1, -1],
        }
    }

    fn ensure_capacity(&mut self, total: usize) {
        if self.obstacle_mask.len() < total {
            self.obstacle_mask.resize(total, 0);
            self.obstacles_for_flood.resize(total, 0);
            self.bridge_mask.resize(total, 0);
            self.visited.resize(total, 0);
            self.raw_fill_mask.resize(total, 0);
            self.final_fill_mask.resize(total, 0);
            self.scratch_a.resize(total, 0);
            self.scratch_b.resize(total, 0);
        }
    }

    /// Ejecuta el cálculo completo de Smart Fill (Cubo de pintura inteligente) en Rust.
    /// Retorna la cantidad de píxeles en la máscara final (0 si no hay área rellenable).
    #[allow(clippy::too_many_arguments)]
    pub fn compute_smart_fill_mask(
        &mut self,
        boundary_rgba: &[u8],
        doc_w: u32,
        doc_h: u32,
        seed_x: u32,
        seed_y: u32,
        tolerance: f32,
        close_gap: i32,
        area_scaling: i32,
        is_multi_layer: bool,
    ) -> u32 {
        let w = doc_w as usize;
        let h = doc_h as usize;
        let total = w * h;
        if w == 0
            || h == 0
            || (seed_x as usize) >= w
            || (seed_y as usize) >= h
            || boundary_rgba.len() < total * 4
        {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        self.ensure_capacity(total);
        self.obstacle_mask[..total].fill(0);
        self.bridge_mask[..total].fill(0);
        self.visited[..total].fill(0);
        self.raw_fill_mask[..total].fill(0);

        let seed_idx = (seed_y as usize) * w + (seed_x as usize);
        let seed_p = seed_idx * 4;
        let seed_r = boundary_rgba[seed_p] as i32;
        let seed_g = boundary_rgba[seed_p + 1] as i32;
        let seed_b = boundary_rgba[seed_p + 2] as i32;
        let seed_a = boundary_rgba[seed_p + 3] as i32;

        let tol_norm = (tolerance.max(1.0) / 100.0) * 255.0;
        let tol_sq = (tol_norm * tol_norm * 3.0) as i32;

        // 1. Construir máscara de obstáculos
        if is_multi_layer {
            let is_seed_empty = seed_a < 20;
            for i in 0..total {
                let p = i * 4;
                let a = boundary_rgba[p + 3] as i32;
                if is_seed_empty {
                    if a > 30 {
                        self.obstacle_mask[i] = 1;
                    }
                } else {
                    let dr = (boundary_rgba[p] as i32) - seed_r;
                    let dg = (boundary_rgba[p + 1] as i32) - seed_g;
                    let db = (boundary_rgba[p + 2] as i32) - seed_b;
                    let da = a - seed_a;
                    if dr * dr + dg * dg + db * db + da * da > tol_sq || a > 200 {
                        self.obstacle_mask[i] = 1;
                    }
                }
            }
        } else {
            for i in 0..total {
                let p = i * 4;
                let dr = (boundary_rgba[p] as i32) - seed_r;
                let dg = (boundary_rgba[p + 1] as i32) - seed_g;
                let db = (boundary_rgba[p + 2] as i32) - seed_b;
                let da = (boundary_rgba[p + 3] as i32) - seed_a;
                if dr * dr + dg * dg + db * db + da * da > tol_sq {
                    self.obstacle_mask[i] = 1;
                }
            }
        }

        if self.obstacle_mask[seed_idx] == 1 {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        // 2. Close Gap (dilatación morfológica de obstáculos)
        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.obstacle_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.obstacles_for_flood[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.obstacles_for_flood[i] == 1 && self.obstacle_mask[i] == 0 {
                    self.bridge_mask[i] = 1;
                }
            }
            if self.obstacles_for_flood[seed_idx] == 1 {
                let rad = close_gap.min(3);
                let sx = seed_x as i32;
                let sy = seed_y as i32;
                for dy in -rad..=rad {
                    let py = sy + dy;
                    if py < 0 || py >= (h as i32) {
                        continue;
                    }
                    for dx in -rad..=rad {
                        let px = sx + dx;
                        if px < 0 || px >= (w as i32) {
                            continue;
                        }
                        let p_idx = (py as usize) * w + (px as usize);
                        if self.obstacle_mask[p_idx] == 0 {
                            self.obstacles_for_flood[p_idx] = 0;
                            self.bridge_mask[p_idx] = 0;
                        }
                    }
                }
            }
        } else {
            self.obstacles_for_flood[..total].copy_from_slice(&self.obstacle_mask[..total]);
        }

        // 3. Scanline Flood Fill con pila contigua en Rust (sin asignaciones en heap por píxel)
        self.queue.clear();
        self.queue.push(seed_idx as u32);
        self.visited[seed_idx] = 1;

        while let Some(curr_idx) = self.queue.pop() {
            let curr = curr_idx as usize;
            let cx = curr % w;
            let cy = curr / w;
            let line_y = cy * w;

            let mut left = cx;
            while left > 0
                && self.visited[line_y + left - 1] == 0
                && self.obstacles_for_flood[line_y + left - 1] == 0
            {
                left -= 1;
            }

            let mut right = cx;
            while right + 1 < w
                && self.visited[line_y + right + 1] == 0
                && self.obstacles_for_flood[line_y + right + 1] == 0
            {
                right += 1;
            }

            for x in left..=right {
                let idx = line_y + x;
                self.visited[idx] = 1;
                if self.obstacle_mask[idx] == 0 {
                    self.raw_fill_mask[idx] = 1;
                }
            }

            // Filas superior e inferior
            if cy > 0 {
                let next_line = (cy - 1) * w;
                let mut in_span = false;
                for x in left..=right {
                    let idx = next_line + x;
                    let can_fill =
                        self.visited[idx] == 0 && self.obstacles_for_flood[idx] == 0;
                    if !in_span && can_fill {
                        self.queue.push(idx as u32);
                        in_span = true;
                    } else if in_span && !can_fill {
                        in_span = false;
                    }
                }
            }
            if cy + 1 < h {
                let next_line = (cy + 1) * w;
                let mut in_span = false;
                for x in left..=right {
                    let idx = next_line + x;
                    let can_fill =
                        self.visited[idx] == 0 && self.obstacles_for_flood[idx] == 0;
                    if !in_span && can_fill {
                        self.queue.push(idx as u32);
                        in_span = true;
                    } else if in_span && !can_fill {
                        in_span = false;
                    }
                }
            }
        }

        // 4. Expandir el relleno hasta el borde real del obstáculo, frenado por los puentes de Close Gap
        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.scratch_b[i] == 1
                    && self.obstacle_mask[i] == 0
                    && self.bridge_mask[i] == 0
                {
                    self.raw_fill_mask[i] = 1;
                }
            }
        }

        // 5. Area Scaling (dilatación o erosión final)
        if area_scaling > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling,
            );
        } else if area_scaling < 0 {
            erode_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling.abs(),
            );
        } else {
            self.final_fill_mask[..total].copy_from_slice(&self.raw_fill_mask[..total]);
        }

        self.compute_mask_bounds(w, h)
    }

    /// Ejecuta "Cerrar y Rellenar" (Enclose and Fill) en Rust sobre una región local [rw × rh]
    pub fn compute_enclose_fill_mask(
        &mut self,
        boundary_rgba: &[u8],
        target_rgba: &[u8],
        lasso_rgba: &[u8],
        rw: u32,
        rh: u32,
        close_gap: i32,
        area_scaling: i32,
    ) -> u32 {
        let w = rw as usize;
        let h = rh as usize;
        let total = w * h;
        if w <= 2
            || h <= 2
            || boundary_rgba.len() < total * 4
            || target_rgba.len() < total * 4
            || lasso_rgba.len() < total * 4
        {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        self.ensure_capacity(total);
        self.obstacle_mask[..total].fill(0);
        self.bridge_mask[..total].fill(0);
        self.visited[..total].fill(0);
        self.raw_fill_mask[..total].fill(0);

        for i in 0..total {
            if boundary_rgba[i * 4 + 3] > 30 {
                self.obstacle_mask[i] = 1;
            }
        }

        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.obstacle_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.obstacles_for_flood[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.obstacles_for_flood[i] == 1 && self.obstacle_mask[i] == 0 {
                    self.bridge_mask[i] = 1;
                }
            }
        } else {
            self.obstacles_for_flood[..total].copy_from_slice(&self.obstacle_mask[..total]);
        }

        // BFS exterior desde los 4 bordes del rectángulo
        self.queue.clear();
        for x in 0..w {
            let top_idx = x;
            if self.obstacles_for_flood[top_idx] == 0 && self.visited[top_idx] == 0 {
                self.visited[top_idx] = 1;
                self.queue.push(top_idx as u32);
            }
            let bot_idx = (h - 1) * w + x;
            if self.obstacles_for_flood[bot_idx] == 0 && self.visited[bot_idx] == 0 {
                self.visited[bot_idx] = 1;
                self.queue.push(bot_idx as u32);
            }
        }
        for y in 0..h {
            let left_idx = y * w;
            if self.obstacles_for_flood[left_idx] == 0 && self.visited[left_idx] == 0 {
                self.visited[left_idx] = 1;
                self.queue.push(left_idx as u32);
            }
            let right_idx = y * w + (w - 1);
            if self.obstacles_for_flood[right_idx] == 0 && self.visited[right_idx] == 0 {
                self.visited[right_idx] = 1;
                self.queue.push(right_idx as u32);
            }
        }

        let mut head = 0usize;
        while head < self.queue.len() {
            let curr = self.queue[head] as usize;
            head += 1;
            let cx = curr % w;
            let cy = curr / w;

            if cx > 0 {
                let left = curr - 1;
                if self.obstacles_for_flood[left] == 0 && self.visited[left] == 0 {
                    self.visited[left] = 1;
                    self.queue.push(left as u32);
                }
            }
            if cx + 1 < w {
                let right = curr + 1;
                if self.obstacles_for_flood[right] == 0 && self.visited[right] == 0 {
                    self.visited[right] = 1;
                    self.queue.push(right as u32);
                }
            }
            if cy > 0 {
                let top = curr - w;
                if self.obstacles_for_flood[top] == 0 && self.visited[top] == 0 {
                    self.visited[top] = 1;
                    self.queue.push(top as u32);
                }
            }
            if cy + 1 < h {
                let bot = curr + w;
                if self.obstacles_for_flood[bot] == 0 && self.visited[bot] == 0 {
                    self.visited[bot] = 1;
                    self.queue.push(bot as u32);
                }
            }
        }

        let mut filled_count = 0u32;
        for i in 0..total {
            let is_inside_lasso = lasso_rgba[i * 4 + 3] > 64;
            let is_outside = self.visited[i] == 1;
            let is_ink_line = self.obstacle_mask[i] == 1;
            if is_inside_lasso && !is_outside && !is_ink_line && target_rgba[i * 4 + 3] < 60 {
                self.raw_fill_mask[i] = 1;
                filled_count += 1;
            }
        }

        if filled_count == 0 {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.scratch_b[i] == 1
                    && self.obstacle_mask[i] == 0
                    && self.bridge_mask[i] == 0
                {
                    self.raw_fill_mask[i] = 1;
                }
            }
        }

        if area_scaling > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling,
            );
        } else if area_scaling < 0 {
            erode_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling.abs(),
            );
        } else {
            self.final_fill_mask[..total].copy_from_slice(&self.raw_fill_mask[..total]);
        }

        self.compute_mask_bounds(w, h)
    }

    /// Ejecuta "Pintar área no rellenada" (Paint Unfilled Area) en Rust sobre una región [rw × rh]
    pub fn compute_unfilled_area_mask(
        &mut self,
        boundary_rgba: &[u8],
        target_rgba: &[u8],
        stroke_rgba: &[u8],
        rw: u32,
        rh: u32,
        close_gap: i32,
        area_scaling: i32,
    ) -> u32 {
        let w = rw as usize;
        let h = rh as usize;
        let total = w * h;
        if w <= 2
            || h <= 2
            || boundary_rgba.len() < total * 4
            || target_rgba.len() < total * 4
            || stroke_rgba.len() < total * 4
        {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        self.ensure_capacity(total);
        self.obstacle_mask[..total].fill(0);
        self.bridge_mask[..total].fill(0);
        self.raw_fill_mask[..total].fill(0);

        for i in 0..total {
            if boundary_rgba[i * 4 + 3] > 30 {
                self.obstacle_mask[i] = 1;
            }
        }

        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.obstacle_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.obstacles_for_flood[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.obstacles_for_flood[i] == 1 && self.obstacle_mask[i] == 0 {
                    self.bridge_mask[i] = 1;
                }
            }
        }

        let mut filled_count = 0u32;
        for i in 0..total {
            if stroke_rgba[i * 4 + 3] > 64
                && self.obstacle_mask[i] == 0
                && target_rgba[i * 4 + 3] < 60
            {
                self.raw_fill_mask[i] = 1;
                filled_count += 1;
            }
        }

        if filled_count == 0 {
            self.bounds = [0, 0, -1, -1];
            return 0;
        }

        if close_gap > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                w,
                h,
                close_gap,
            );
            for i in 0..total {
                if self.scratch_b[i] == 1
                    && self.obstacle_mask[i] == 0
                    && self.bridge_mask[i] == 0
                {
                    self.raw_fill_mask[i] = 1;
                }
            }
        }

        if area_scaling > 0 {
            dilate_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling,
            );
        } else if area_scaling < 0 {
            erode_binary_mask_into(
                &self.raw_fill_mask[..total],
                &mut self.scratch_a[..total],
                &mut self.scratch_b[..total],
                &mut self.final_fill_mask[..total],
                w,
                h,
                area_scaling.abs(),
            );
        } else {
            self.final_fill_mask[..total].copy_from_slice(&self.raw_fill_mask[..total]);
        }

        self.compute_mask_bounds(w, h)
    }

    pub fn get_mask_ptr(&self) -> *const u8 {
        self.final_fill_mask.as_ptr()
    }

    pub fn get_bounds(&self) -> Vec<i32> {
        self.bounds.to_vec()
    }

    fn compute_mask_bounds(&mut self, w: usize, h: usize) -> u32 {
        let mut min_x = w as i32;
        let mut min_y = h as i32;
        let mut max_x = -1i32;
        let mut max_y = -1i32;
        let mut count = 0u32;

        for y in 0..h {
            let row = y * w;
            let yi = y as i32;
            for x in 0..w {
                if self.final_fill_mask[row + x] == 1 {
                    let xi = x as i32;
                    if xi < min_x {
                        min_x = xi;
                    }
                    if yi < min_y {
                        min_y = yi;
                    }
                    if xi > max_x {
                        max_x = xi;
                    }
                    if yi > max_y {
                        max_y = yi;
                    }
                    count += 1;
                }
            }
        }

        if count == 0 {
            self.bounds = [0, 0, -1, -1];
        } else {
            self.bounds = [min_x, min_y, max_x, max_y];
        }
        count
    }

    /// Dilatación morfológica binaria rápida (0 o 1) con ventana deslizante en memoria contigua
    pub fn dilate_binary_mask(
        &mut self,
        src: &[u8],
        w: u32,
        h: u32,
        radius: i32,
    ) -> Vec<u8> {
        let wi = w as usize;
        let hi = h as usize;
        let total = wi * hi;
        if total == 0 || src.len() < total {
            return Vec::new();
        }
        self.ensure_capacity(total);
        dilate_binary_mask_into(
            src,
            &mut self.scratch_a[..total],
            &mut self.final_fill_mask[..total],
            wi,
            hi,
            radius,
        );
        self.final_fill_mask[..total].to_vec()
    }

    /// Erosión morfológica binaria rápida (0 o 1) por dualidad morfológica en memoria contigua
    pub fn erode_binary_mask(
        &mut self,
        src: &[u8],
        w: u32,
        h: u32,
        radius: i32,
    ) -> Vec<u8> {
        let wi = w as usize;
        let hi = h as usize;
        let total = wi * hi;
        if total == 0 || src.len() < total {
            return Vec::new();
        }
        self.ensure_capacity(total);
        erode_binary_mask_into(
            src,
            &mut self.scratch_a[..total],
            &mut self.scratch_b[..total],
            &mut self.final_fill_mask[..total],
            wi,
            hi,
            radius,
        );
        self.final_fill_mask[..total].to_vec()
    }
}
