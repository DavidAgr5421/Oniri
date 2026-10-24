use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct FloodFillResult {
    pub min_x: u32,
    pub min_y: u32,
    pub max_x: u32,
    pub max_y: u32,
    pub filled_count: u32,
}

#[wasm_bindgen]
pub struct FloodFillCore;

#[wasm_bindgen]
impl FloodFillCore {
    /// 4-way scanline flood fill on an RGBA buffer in place.
    /// If `selection_mask` is non-empty, filling only applies where mask > 0.
    /// Returns bounding box and filled count, or None if no pixels were changed.
    pub fn scanline_fill(
        rgba: &mut [u8],
        width: usize,
        height: usize,
        start_x: usize,
        start_y: usize,
        fill_r: u8,
        fill_g: u8,
        fill_b: u8,
        fill_a: u8,
        tolerance: f32,
        selection_mask: &[u8],
    ) -> Option<FloodFillResult> {
        let total_pixels = width * height;
        if total_pixels == 0 || rgba.len() != total_pixels * 4 {
            return None;
        }
        if start_x >= width || start_y >= height {
            return None;
        }

        let start_idx = (start_y * width + start_x) * 4;
        let r_start = rgba[start_idx];
        let g_start = rgba[start_idx + 1];
        let b_start = rgba[start_idx + 2];
        let a_start = rgba[start_idx + 3];

        // If target color is already identical, nothing to do
        if r_start == fill_r && g_start == fill_g && b_start == fill_b && a_start == fill_a {
            return None;
        }

        // Check if start pixel is masked out
        if !selection_mask.is_empty() && !is_mask_set(selection_mask, width, start_x, start_y) {
            return None;
        }

        let tol_ratio = (tolerance / 100.0).clamp(0.0, 1.0) * 255.0;
        let tol_sq = (tol_ratio * tol_ratio * 3.0) as i32;

        let mut visited = vec![0u8; total_pixels];
        let mut stack: Vec<(usize, usize)> = Vec::with_capacity(1024);
        stack.push((start_x, start_y));

        let mut min_x = start_x;
        let mut max_x = start_x;
        let mut min_y = start_y;
        let mut max_y = start_y;
        let mut filled_count = 0u32;

        while let Some((cx, cy)) = stack.pop() {
            let line_y = cy * width;
            if visited[line_y + cx] != 0
                || !color_matches(rgba, width, cx, cy, r_start, g_start, b_start, a_start, tol_sq)
            {
                continue;
            }

            // Find leftmost pixel of span
            let mut left = cx;
            while left > 0
                && visited[line_y + left - 1] == 0
                && color_matches(rgba, width, left - 1, cy, r_start, g_start, b_start, a_start, tol_sq)
            {
                left -= 1;
            }

            // Find rightmost pixel of span
            let mut right = cx;
            while right + 1 < width
                && visited[line_y + right + 1] == 0
                && color_matches(rgba, width, right + 1, cy, r_start, g_start, b_start, a_start, tol_sq)
            {
                right += 1;
            }

            // Fill span
            for x in left..=right {
                visited[line_y + x] = 1;

                // Check selection mask before writing pixel
                let can_fill = selection_mask.is_empty() || is_mask_set(selection_mask, width, x, cy);
                if can_fill {
                    let idx = (line_y + x) * 4;
                    rgba[idx] = fill_r;
                    rgba[idx + 1] = fill_g;
                    rgba[idx + 2] = fill_b;
                    rgba[idx + 3] = fill_a;

                    min_x = min_x.min(x);
                    max_x = max_x.max(x);
                    min_y = min_y.min(cy);
                    max_y = max_y.max(cy);
                    filled_count += 1;
                }
            }

            // Inspect upper row (cy - 1)
            if cy > 0 {
                let next_y = cy - 1;
                let next_line = next_y * width;
                let mut in_span = false;
                for x in left..=right {
                    let is_match = visited[next_line + x] == 0
                        && color_matches(rgba, width, x, next_y, r_start, g_start, b_start, a_start, tol_sq);
                    if !in_span && is_match {
                        stack.push((x, next_y));
                        in_span = true;
                    } else if in_span && !is_match {
                        in_span = false;
                    }
                }
            }

            // Inspect lower row (cy + 1)
            if cy + 1 < height {
                let next_y = cy + 1;
                let next_line = next_y * width;
                let mut in_span = false;
                for x in left..=right {
                    let is_match = visited[next_line + x] == 0
                        && color_matches(rgba, width, x, next_y, r_start, g_start, b_start, a_start, tol_sq);
                    if !in_span && is_match {
                        stack.push((x, next_y));
                        in_span = true;
                    } else if in_span && !is_match {
                        in_span = false;
                    }
                }
            }
        }

        if filled_count == 0 {
            None
        } else {
            Some(FloodFillResult {
                min_x: min_x as u32,
                min_y: min_y as u32,
                max_x: max_x as u32,
                max_y: max_y as u32,
                filled_count,
            })
        }
    }

    /// Non-contiguous color fill: replaces all pixels matching the color under (start_x, start_y)
    /// across the whole buffer within tolerance, respecting optional selection mask.
    pub fn fill_all_matching(
        rgba: &mut [u8],
        width: usize,
        height: usize,
        start_x: usize,
        start_y: usize,
        fill_r: u8,
        fill_g: u8,
        fill_b: u8,
        fill_a: u8,
        tolerance: f32,
        selection_mask: &[u8],
    ) -> Option<FloodFillResult> {
        let total_pixels = width * height;
        if total_pixels == 0 || rgba.len() != total_pixels * 4 {
            return None;
        }
        if start_x >= width || start_y >= height {
            return None;
        }

        let start_idx = (start_y * width + start_x) * 4;
        let r_start = rgba[start_idx];
        let g_start = rgba[start_idx + 1];
        let b_start = rgba[start_idx + 2];
        let a_start = rgba[start_idx + 3];

        if r_start == fill_r && g_start == fill_g && b_start == fill_b && a_start == fill_a {
            return None;
        }

        let tol_ratio = (tolerance / 100.0).clamp(0.0, 1.0) * 255.0;
        let tol_sq = (tol_ratio * tol_ratio * 3.0) as i32;

        let mut min_x = width;
        let mut max_x = 0;
        let mut min_y = height;
        let mut max_y = 0;
        let mut filled_count = 0u32;

        for y in 0..height {
            let row = y * width;
            for x in 0..width {
                if !selection_mask.is_empty() && !is_mask_set(selection_mask, width, x, y) {
                    continue;
                }

                if color_matches(rgba, width, x, y, r_start, g_start, b_start, a_start, tol_sq) {
                    let idx = (row + x) * 4;
                    rgba[idx] = fill_r;
                    rgba[idx + 1] = fill_g;
                    rgba[idx + 2] = fill_b;
                    rgba[idx + 3] = fill_a;

                    min_x = min_x.min(x);
                    max_x = max_x.max(x);
                    min_y = min_y.min(y);
                    max_y = max_y.max(y);
                    filled_count += 1;
                }
            }
        }

        if filled_count == 0 {
            None
        } else {
            Some(FloodFillResult {
                min_x: min_x as u32,
                min_y: min_y as u32,
                max_x: max_x as u32,
                max_y: max_y as u32,
                filled_count,
            })
        }
    }
}

#[inline(always)]
fn color_matches(
    rgba: &[u8],
    width: usize,
    px: usize,
    py: usize,
    r_start: u8,
    g_start: u8,
    b_start: u8,
    a_start: u8,
    tol_sq: i32,
) -> bool {
    let idx = (py * width + px) * 4;
    let dr = rgba[idx] as i32 - r_start as i32;
    let dg = rgba[idx + 1] as i32 - g_start as i32;
    let db = rgba[idx + 2] as i32 - b_start as i32;
    let da = rgba[idx + 3] as i32 - a_start as i32;
    (dr * dr + dg * dg + db * db + da * da) <= tol_sq
}

#[inline(always)]
fn is_mask_set(mask: &[u8], width: usize, x: usize, y: usize) -> bool {
    let offset = y * width + x;
    if mask.len() >= (offset + 1) * 4 {
        mask[offset * 4 + 3] > 0
    } else if offset < mask.len() {
        mask[offset] > 0
    } else {
        false
    }
}
