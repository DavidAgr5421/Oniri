use wasm_bindgen::prelude::*;

/// Motor nativo de decodificación planar y composición de mosaicos (tiles)
#[wasm_bindgen]
pub struct ClipTileCore;

#[wasm_bindgen]
impl ClipTileCore {
    /// Compone un tile descompreso de 5 planos (256x256) directamente en el buffer RGBA del documento
    pub fn blit_planar_tile(
        dest_rgba: &mut [u8],
        doc_w: u32,
        doc_h: u32,
        decomp_planes: &[u8],
        start_x: i32,
        start_y: i32,
        is_monochrome: bool,
    ) -> bool {
        const TILE_W: usize = 256;
        const TILE_H: usize = 256;
        const PLANE_SIZE: usize = TILE_W * TILE_H; // 65536

        if decomp_planes.len() < PLANE_SIZE * 4 {
            return false;
        }

        let dw = doc_w as usize;
        let dh = doc_h as usize;
        if dw == 0 || dh == 0 || dest_rgba.len() < dw * dh * 4 {
            return false;
        }

        let c0 = &decomp_planes[0..PLANE_SIZE];                  // Alpha / Density
        let c1 = &decomp_planes[PLANE_SIZE..PLANE_SIZE * 2];      // Red / Black mask
        let c2 = &decomp_planes[PLANE_SIZE * 2..PLANE_SIZE * 3];  // Green / White mask
        let c3 = &decomp_planes[PLANE_SIZE * 3..PLANE_SIZE * 4];  // Blue

        for ty in 0..TILE_H {
            let py = start_y + (ty as i32);
            if py < 0 || py >= (dh as i32) {
                continue;
            }
            let py_idx = (py as usize) * dw;
            let tile_row_idx = ty * TILE_W;

            for tx in 0..TILE_W {
                let px = start_x + (tx as i32);
                if px < 0 || px >= (dw as i32) {
                    continue;
                }

                let tidx = tile_row_idx + tx;
                let a = c0[tidx];
                if a == 0 {
                    continue;
                }

                let pidx = (py_idx + (px as usize)) * 4;
                if is_monochrome {
                    dest_rgba[pidx] = 0;
                    dest_rgba[pidx + 1] = 0;
                    dest_rgba[pidx + 2] = 0;
                } else {
                    dest_rgba[pidx] = c1[tidx];
                    dest_rgba[pidx + 1] = c2[tidx];
                    dest_rgba[pidx + 2] = c3[tidx];
                }
                dest_rgba[pidx + 3] = a;
            }
        }

        true
    }
}
