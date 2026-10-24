use wasm_bindgen::prelude::*;

#[inline(always)]
fn distance_to_segment(px: f32, py: f32, x1: f32, y1: f32, x2: f32, y2: f32) -> f32 {
    let vx = x2 - x1;
    let vy = y2 - y1;
    let len_sq = vx * vx + vy * vy;
    if len_sq < 1e-6 {
        return (px - x1).hypot(py - y1);
    }
    let t = (((px - x1) * vx + (py - y1) * vy) / len_sq).clamp(0.0, 1.0);
    let proj_x = x1 + t * vx;
    let proj_y = y1 + t * vy;
    (px - proj_x).hypot(py - proj_y)
}

/// Motor en Rust + WASM para Esqueleto 2D (FK/IK), Pesos de Malla y Linear Blend Skinning (LBS)
#[wasm_bindgen]
pub struct BoneSkinCore {
    /// Stride 10 por vértice: [x, y, u, v, b0, w0, b1, w1, b2, w2]
    vertices_buffer: Vec<f32>,
    /// Coordenadas deformadas temporales [dx, dy] por vértice
    deformed_xy: Vec<f32>,
    /// Stride 12 por triángulo: [ep0x, ep0y, ep1x, ep1y, ep2x, ep2y, m11, m12, m21, m22, dx, dy]
    triangles_buffer: Vec<f32>,
}

#[wasm_bindgen]
impl BoneSkinCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            vertices_buffer: Vec::with_capacity(121 * 10),
            deformed_xy: Vec::with_capacity(121 * 2),
            triangles_buffer: Vec::with_capacity(200 * 12),
        }
    }

    /// Escanea el canal alpha de una capa RGBA8 con paso `step` y retorna `[min_x, min_y, bw, bh]`
    pub fn scan_layer_bounds(
        &self,
        rgba: &[u8],
        w: u32,
        h: u32,
        step: u32,
        pad: i32,
    ) -> Vec<i32> {
        let wi = w as usize;
        let hi = h as usize;
        let st = (step.max(1)) as usize;
        if wi == 0 || hi == 0 || rgba.len() < wi * hi * 4 {
            return vec![0, 0, w as i32, h as i32];
        }

        let mut min_x = wi;
        let mut min_y = hi;
        let mut max_x = 0usize;
        let mut max_y = 0usize;
        let mut found = false;

        let mut y = 0usize;
        while y < hi {
            let row = y * wi;
            let mut x = 0usize;
            while x < wi {
                let alpha = rgba[(row + x) * 4 + 3];
                if alpha > 8 {
                    found = true;
                    if x < min_x {
                        min_x = x;
                    }
                    if y < min_y {
                        min_y = y;
                    }
                    if x > max_x {
                        max_x = x;
                    }
                    if y > max_y {
                        max_y = y;
                    }
                }
                x += st;
            }
            y += st;
        }

        let (bx0, by0, bx1, by1) = if !found {
            (0i32, 0i32, w as i32, h as i32)
        } else {
            (
                ((min_x as i32) - pad).max(0),
                ((min_y as i32) - pad).max(0),
                ((max_x as i32) + pad).min(w as i32),
                ((max_y as i32) + pad).min(h as i32),
            )
        };

        let bw = (bx1 - bx0).max(32);
        let bh = (by1 - by0).max(32);
        vec![bx0, by0, bw, bh]
    }

    /// Calcula la grilla de vértices y los 3 pesos de influencia inversa por hueso en Bind Pose.
    /// `bone_segments`: slice plano `[bindHeadX, bindHeadY, bindTailX, bindTailY, ...]` (stride 4).
    /// Retorna la cantidad de vértices generados en `vertices_buffer` (stride 10).
    pub fn build_mesh_vertices(
        &mut self,
        min_x: f32,
        min_y: f32,
        bw: f32,
        bh: f32,
        cols: u32,
        rows: u32,
        bone_segments: &[f32],
    ) -> usize {
        let bone_count = bone_segments.len() / 4;
        if bone_count == 0 || cols == 0 || rows == 0 {
            self.vertices_buffer.clear();
            return 0;
        }

        let total_verts = ((cols + 1) * (rows + 1)) as usize;
        self.vertices_buffer.clear();
        self.vertices_buffer.reserve(total_verts * 10);

        for r in 0..=rows {
            let v = (r as f32) / (rows as f32);
            let vy = min_y + v * bh;
            for c in 0..=cols {
                let u = (c as f32) / (cols as f32);
                let vx = min_x + u * bw;

                // Top 3 influencias: (bone_idx, weight)
                let mut best_idx = [-1i32; 3];
                let mut best_w = [0.0f32; 3];

                for b in 0..bone_count {
                    let base = b * 4;
                    let d = distance_to_segment(
                        vx,
                        vy,
                        bone_segments[base],
                        bone_segments[base + 1],
                        bone_segments[base + 2],
                        bone_segments[base + 3],
                    );
                    let w_val = 1.0 / d.max(6.0).powf(2.2);

                    if w_val > best_w[0] {
                        best_w[2] = best_w[1];
                        best_idx[2] = best_idx[1];
                        best_w[1] = best_w[0];
                        best_idx[1] = best_idx[0];
                        best_w[0] = w_val;
                        best_idx[0] = b as i32;
                    } else if w_val > best_w[1] {
                        best_w[2] = best_w[1];
                        best_idx[2] = best_idx[1];
                        best_w[1] = w_val;
                        best_idx[1] = b as i32;
                    } else if w_val > best_w[2] {
                        best_w[2] = w_val;
                        best_idx[2] = b as i32;
                    }
                }

                let sum = (best_w[0] + best_w[1] + best_w[2]).max(1e-8);
                self.vertices_buffer.push(vx);
                self.vertices_buffer.push(vy);
                self.vertices_buffer.push(u);
                self.vertices_buffer.push(v);
                for k in 0..3 {
                    self.vertices_buffer.push(best_idx[k] as f32);
                    self.vertices_buffer
                        .push(if best_idx[k] >= 0 { best_w[k] / sum } else { 0.0 });
                }
            }
        }

        total_verts
    }

    pub fn get_vertices_ptr(&self) -> *const f32 {
        self.vertices_buffer.as_ptr()
    }

    pub fn get_vertices_len(&self) -> usize {
        self.vertices_buffer.len()
    }

    /// Calcula en un solo lote WASM todos los vértices deformados por LBS y las matrices afines
    /// de cada triángulo texturizado (con expansión de centroide de 0.45px anti-costuras).
    /// - `packed_vertices`: stride 10 `[x, y, u, v, b0, w0, b1, w1, b2, w2]`
    /// - `packed_indices`: índices de triángulos `[i0, i1, i2, ...]` (stride 3)
    /// - `skin_matrices`: matrices 2D `[a, b, c, d, tx, ty]` por hueso (stride 6)
    /// Retorna la cantidad de triángulos válidos escritos en `triangles_buffer` (stride 12).
    #[allow(clippy::too_many_arguments)]
    pub fn compute_skinned_triangles(
        &mut self,
        packed_vertices: &[f32],
        packed_indices: &[u32],
        skin_matrices: &[f32],
        bx: f32,
        by: f32,
        bw: f32,
        bh: f32,
    ) -> usize {
        let vert_count = packed_vertices.len() / 10;
        let bone_count = skin_matrices.len() / 6;
        let tri_count = packed_indices.len() / 3;
        if vert_count == 0 || tri_count == 0 {
            self.triangles_buffer.clear();
            return 0;
        }

        self.deformed_xy.resize(vert_count * 2, 0.0);

        // 1. Deformación Linear Blend Skinning (LBS) de todos los vértices
        for i in 0..vert_count {
            let vbase = i * 10;
            let vx = packed_vertices[vbase];
            let vy = packed_vertices[vbase + 1];

            let mut dx = 0.0f32;
            let mut dy = 0.0f32;
            let mut total_w = 0.0f32;

            for k in 0..3 {
                let b_idx = packed_vertices[vbase + 4 + k * 2] as i32;
                let w = packed_vertices[vbase + 5 + k * 2];
                if b_idx >= 0 && (b_idx as usize) < bone_count && w > 0.0 {
                    let mbase = (b_idx as usize) * 6;
                    let a = skin_matrices[mbase];
                    let b = skin_matrices[mbase + 1];
                    let c = skin_matrices[mbase + 2];
                    let d = skin_matrices[mbase + 3];
                    let tx = skin_matrices[mbase + 4];
                    let ty = skin_matrices[mbase + 5];

                    let px = a * vx + c * vy + tx;
                    let py = b * vx + d * vy + ty;
                    dx += px * w;
                    dy += py * w;
                    total_w += w;
                }
            }

            if total_w > 0.0 {
                let inv_w = 1.0 / total_w;
                self.deformed_xy[i * 2] = dx * inv_w;
                self.deformed_xy[i * 2 + 1] = dy * inv_w;
            } else {
                self.deformed_xy[i * 2] = vx;
                self.deformed_xy[i * 2 + 1] = vy;
            }
        }

        // 2. Construir triángulos expandidos y resolver el mapeo afín UV -> XY
        self.triangles_buffer.clear();
        self.triangles_buffer.reserve(tri_count * 12);
        let mut valid_tris = 0usize;

        for t in 0..tri_count {
            let i0 = packed_indices[t * 3] as usize;
            let i1 = packed_indices[t * 3 + 1] as usize;
            let i2 = packed_indices[t * 3 + 2] as usize;
            if i0 >= vert_count || i1 >= vert_count || i2 >= vert_count {
                continue;
            }

            let u0 = bx + packed_vertices[i0 * 10 + 2] * bw;
            let v0 = by + packed_vertices[i0 * 10 + 3] * bh;
            let u1 = bx + packed_vertices[i1 * 10 + 2] * bw;
            let v1 = by + packed_vertices[i1 * 10 + 3] * bh;
            let u2 = bx + packed_vertices[i2 * 10 + 2] * bw;
            let v2 = by + packed_vertices[i2 * 10 + 3] * bh;

            let denom = u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0;
            if denom.abs() < 1e-5 {
                continue;
            }
            let inv_denom = 1.0 / denom;

            let x0 = self.deformed_xy[i0 * 2];
            let y0 = self.deformed_xy[i0 * 2 + 1];
            let x1 = self.deformed_xy[i1 * 2];
            let y1 = self.deformed_xy[i1 * 2 + 1];
            let x2 = self.deformed_xy[i2 * 2];
            let y2 = self.deformed_xy[i2 * 2 + 1];

            let cx = (x0 + x1 + x2) * (1.0 / 3.0);
            let cy = (y0 + y1 + y2) * (1.0 / 3.0);

            let expand = |px: f32, py: f32| -> (f32, f32) {
                let d = (px - cx).hypot(py - cy);
                if d < 1e-3 {
                    (px, py)
                } else {
                    let f = (d + 0.45) / d;
                    (cx + (px - cx) * f, cy + (py - cy) * f)
                }
            };

            let (ep0x, ep0y) = expand(x0, y0);
            let (ep1x, ep1y) = expand(x1, y1);
            let (ep2x, ep2y) = expand(x2, y2);

            let m11 = -(v0 * (x2 - x1) - v1 * x2 + v2 * x1 + (v1 - v2) * x0) * inv_denom;
            let m12 = (v1 * y2 + v0 * (y1 - y2) - v2 * y1 + (v2 - v1) * y0) * inv_denom;
            let m21 = (u0 * (x2 - x1) - u1 * x2 + u2 * x1 + (u1 - u2) * x0) * inv_denom;
            let m22 = -(u1 * y2 + u0 * (y1 - y2) - u2 * y1 + (u2 - u1) * y0) * inv_denom;
            let dx = (u0 * (v2 * x1 - v1 * x2)
                + v0 * (u1 * x2 - u2 * x1)
                + (u2 * v1 - u1 * v2) * x0)
                * inv_denom;
            let dy = (u0 * (v2 * y1 - v1 * y2)
                + v0 * (u1 * y2 - u2 * y1)
                + (u2 * v1 - u1 * v2) * y0)
                * inv_denom;

            self.triangles_buffer.extend_from_slice(&[
                ep0x, ep0y, ep1x, ep1y, ep2x, ep2y, m11, m12, m21, m22, dx, dy,
            ]);
            valid_tris += 1;
        }

        valid_tris
    }

    pub fn get_triangles_ptr(&self) -> *const f32 {
        self.triangles_buffer.as_ptr()
    }

    pub fn get_triangles_len(&self) -> usize {
        self.triangles_buffer.len()
    }
}
