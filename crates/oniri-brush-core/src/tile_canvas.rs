use wasm_bindgen::prelude::*;

pub const TILE_SIZE: usize = 128;
pub const TILE_BYTES: usize = TILE_SIZE * TILE_SIZE * 4; // 65,536 bytes per RGBA tile

/// Representa una cuadrícula esparsa de teselas de 128x128 px para una capa.
/// Las áreas transparentes/vacías ocupan 0 bytes en memoria.
#[wasm_bindgen]
pub struct SparseTileGrid {
    doc_width: u32,
    doc_height: u32,
    cols: u32,
    rows: u32,
    /// Mapa plano de teselas instanciadas: None si está vacía / transparente
    tiles: Vec<Option<Vec<u8>>>,
}

#[wasm_bindgen]
impl SparseTileGrid {
    #[wasm_bindgen(constructor)]
    pub fn new(doc_width: u32, doc_height: u32) -> Self {
        let cols = (doc_width + TILE_SIZE as u32 - 1) / (TILE_SIZE as u32);
        let rows = (doc_height + TILE_SIZE as u32 - 1) / (TILE_SIZE as u32);
        let total = (cols * rows) as usize;
        let mut tiles = Vec::with_capacity(total);
        for _ in 0..total {
            tiles.push(None);
        }
        Self {
            doc_width,
            doc_height,
            cols,
            rows,
            tiles,
        }
    }

    #[inline(always)]
    fn tile_index(&self, col: u32, row: u32) -> Option<usize> {
        if col < self.cols && row < self.rows {
            Some((row * self.cols + col) as usize)
        } else {
            None
        }
    }

    /// Comprueba si existe una tesela asignada en la coordenada
    pub fn has_tile(&self, col: u32, row: u32) -> bool {
        if let Some(idx) = self.tile_index(col, row) {
            self.tiles[idx].is_some()
        } else {
            false
        }
    }

    /// Retorna el número total de teselas activas en memoria
    pub fn allocated_tile_count(&self) -> usize {
        self.tiles.iter().filter(|t| t.is_some()).count()
    }

    /// Asigna o actualiza una tesela con datos RGBA (128x128 = 65536 bytes)
    pub fn set_tile_data(&mut self, col: u32, row: u32, rgba_data: &[u8]) -> bool {
        if let Some(idx) = self.tile_index(col, row) {
            if rgba_data.len() < TILE_BYTES {
                return false;
            }
            // Comprobar si es un bloque 100% transparente para ahorrar memoria
            let is_fully_transparent = rgba_data.chunks_exact(4).all(|px| px[3] == 0);
            if is_fully_transparent {
                self.tiles[idx] = None;
                return true;
            }

            let mut buf = Vec::with_capacity(TILE_BYTES);
            buf.extend_from_slice(&rgba_data[0..TILE_BYTES]);
            self.tiles[idx] = Some(buf);
            true
        } else {
            false
        }
    }

    /// Copia una tesela individual a un buffer de destino
    pub fn get_tile_data(&self, col: u32, row: u32, out_buf: &mut [u8]) -> bool {
        if let Some(idx) = self.tile_index(col, row) {
            if let Some(ref tile) = self.tiles[idx] {
                if out_buf.len() >= TILE_BYTES {
                    out_buf[0..TILE_BYTES].copy_from_slice(tile);
                    return true;
                }
            }
        }
        false
    }

    /// Libera la memoria de una tesela
    pub fn clear_tile(&mut self, col: u32, row: u32) {
        if let Some(idx) = self.tile_index(col, row) {
            self.tiles[idx] = None;
        }
    }

    /// Vacía todas las teselas (reseteo completo de capa sin reasignar vector)
    pub fn clear_all(&mut self) {
        for t in self.tiles.iter_mut() {
            *t = None;
        }
    }

    /// Proyecta todas las teselas activas directamente en un búfer RGBA del tamaño del documento
    pub fn render_to_full_buffer(&self, dest_rgba: &mut [u8]) -> bool {
        let expected_len = (self.doc_width as usize) * (self.doc_height as usize) * 4;
        if dest_rgba.len() < expected_len {
            return false;
        }

        // Limpiar el buffer primero
        dest_rgba[0..expected_len].fill(0);

        let dw = self.doc_width as usize;
        let dh = self.doc_height as usize;

        for r in 0..self.rows {
            let start_y = (r as usize) * TILE_SIZE;
            for c in 0..self.cols {
                let idx = (r * self.cols + c) as usize;
                if let Some(ref tile) = self.tiles[idx] {
                    let start_x = (c as usize) * TILE_SIZE;
                    let valid_h = (dh - start_y).min(TILE_SIZE);
                    let valid_w = (dw - start_x).min(TILE_SIZE);

                    for ty in 0..valid_h {
                        let doc_row = (start_y + ty) * dw;
                        let tile_row = ty * TILE_SIZE;

                        let doc_slice_start = (doc_row + start_x) * 4;
                        let doc_slice_end = doc_slice_start + valid_w * 4;

                        let tile_slice_start = tile_row * 4;
                        let tile_slice_end = tile_slice_start + valid_w * 4;

                        dest_rgba[doc_slice_start..doc_slice_end]
                            .copy_from_slice(&tile[tile_slice_start..tile_slice_end]);
                    }
                }
            }
        }
        true
    }

    /// Importa un lienzo completo RGBA descomponiéndolo automáticamente en teselas esparsas.
    /// Las regiones vacías no ocupan memoria.
    pub fn import_from_full_buffer(&mut self, src_rgba: &[u8]) -> usize {
        let expected_len = (self.doc_width as usize) * (self.doc_height as usize) * 4;
        if src_rgba.len() < expected_len {
            return 0;
        }

        let dw = self.doc_width as usize;
        let dh = self.doc_height as usize;
        let mut allocated = 0;

        for r in 0..self.rows {
            let start_y = (r as usize) * TILE_SIZE;
            for c in 0..self.cols {
                let start_x = (c as usize) * TILE_SIZE;
                let valid_h = (dh - start_y).min(TILE_SIZE);
                let valid_w = (dw - start_x).min(TILE_SIZE);

                // Comprobar si hay algún pixel no transparente en esta área de 128x128
                let mut has_content = false;
                'check: for ty in 0..valid_h {
                    let row_start = ((start_y + ty) * dw + start_x) * 4;
                    for tx in 0..valid_w {
                        let alpha = src_rgba[row_start + tx * 4 + 3];
                        if alpha > 0 {
                            has_content = true;
                            break 'check;
                        }
                    }
                }

                let idx = (r * self.cols + c) as usize;
                if has_content {
                    let mut tile = vec![0u8; TILE_BYTES];
                    for ty in 0..valid_h {
                        let doc_row = (start_y + ty) * dw;
                        let tile_row = ty * TILE_SIZE;

                        let doc_slice_start = (doc_row + start_x) * 4;
                        let doc_slice_end = doc_slice_start + valid_w * 4;

                        let tile_slice_start = tile_row * 4;
                        let tile_slice_end = tile_slice_start + valid_w * 4;

                        tile[tile_slice_start..tile_slice_end]
                            .copy_from_slice(&src_rgba[doc_slice_start..doc_slice_end]);
                    }
                    self.tiles[idx] = Some(tile);
                    allocated += 1;
                } else {
                    self.tiles[idx] = None;
                }
            }
        }

        allocated
    }

    /// Actualiza únicamente las teselas que intersecan con el rectángulo delimitador [min_x, min_y, max_x, max_y]
    /// a partir de un buffer RGBA sub-rectángulo o lienzo completo.
    pub fn update_rect_from_buffer(
        &mut self,
        src_rgba: &[u8],
        stride_width: u32,
        min_x: u32,
        min_y: u32,
        max_x: u32,
        max_y: u32,
        offset_x: u32,
        offset_y: u32,
    ) -> usize {
        let max_x = max_x.min(self.doc_width);
        let max_y = max_y.min(self.doc_height);
        if min_x >= max_x || min_y >= max_y {
            return 0;
        }

        let start_col = min_x / (TILE_SIZE as u32);
        let end_col = (max_x.saturating_sub(1)) / (TILE_SIZE as u32);
        let start_row = min_y / (TILE_SIZE as u32);
        let end_row = (max_y.saturating_sub(1)) / (TILE_SIZE as u32);

        let mut updated = 0;
        let stride_w = stride_width as usize;
        let stride_h = if stride_w > 0 { src_rgba.len() / (stride_w * 4) } else { 0 };

        for r in start_row..=end_row {
            let tile_top = (r as usize) * TILE_SIZE;
            for c in start_col..=end_col {
                let tile_left = (c as usize) * TILE_SIZE;
                let idx = (r * self.cols + c) as usize;
                if idx >= self.tiles.len() {
                    continue;
                }

                let valid_w = (self.doc_width as usize - tile_left).min(TILE_SIZE);
                let valid_h = (self.doc_height as usize - tile_top).min(TILE_SIZE);

                let mut tile = self.tiles[idx].take().unwrap_or_else(|| vec![0u8; TILE_BYTES]);

                let mut has_non_transparent = false;
                for ty in 0..valid_h {
                    let doc_y = tile_top + ty;
                    let tile_row_start = ty * TILE_SIZE * 4;

                    if doc_y >= offset_y as usize && (doc_y - offset_y as usize) < stride_h {
                        let src_y = doc_y - offset_y as usize;
                        let src_row_start = src_y * stride_w * 4;

                        for tx in 0..valid_w {
                            let doc_x = tile_left + tx;
                            let tile_p = tile_row_start + tx * 4;

                            if doc_x >= offset_x as usize && (doc_x - offset_x as usize) < stride_w {
                                let src_x = doc_x - offset_x as usize;
                                let src_p = src_row_start + src_x * 4;
                                if src_p + 3 < src_rgba.len() {
                                    tile[tile_p..tile_p + 4].copy_from_slice(&src_rgba[src_p..src_p + 4]);
                                }
                            }
                            if tile[tile_p + 3] > 0 {
                                has_non_transparent = true;
                            }
                        }
                    } else {
                        for tx in 0..valid_w {
                            let tile_p = tile_row_start + tx * 4;
                            if tile[tile_p + 3] > 0 {
                                has_non_transparent = true;
                            }
                        }
                    }
                }

                if has_non_transparent {
                    self.tiles[idx] = Some(tile);
                    updated += 1;
                } else {
                    self.tiles[idx] = None;
                }
            }
        }

        updated
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sparse_tile_grid_allocation() {
        let mut grid = SparseTileGrid::new(256, 256);
        assert_eq!(grid.cols, 2);
        assert_eq!(grid.rows, 2);
        assert_eq!(grid.allocated_tile_count(), 0);

        let mut tile_data = vec![0u8; TILE_BYTES];
        // Poner un píxel opaco
        tile_data[3] = 255;
        assert!(grid.set_tile_data(0, 0, &tile_data));
        assert_eq!(grid.allocated_tile_count(), 1);
        assert!(grid.has_tile(0, 0));
        assert!(!grid.has_tile(1, 1));

        // Proyectar a full buffer
        let mut full_buf = vec![0u8; 256 * 256 * 4];
        assert!(grid.render_to_full_buffer(&mut full_buf));
        assert_eq!(full_buf[3], 255);

        // Vaciar
        grid.clear_all();
        assert_eq!(grid.allocated_tile_count(), 0);
    }

    #[test]
    fn test_update_rect_from_buffer() {
        let mut grid = SparseTileGrid::new(256, 256);
        assert_eq!(grid.allocated_tile_count(), 0);

        // Sub-rectángulo de 10x10 en (5, 5) con pixel rojo
        let mut sub_rect = vec![0u8; 10 * 10 * 4];
        sub_rect[0] = 255; // R
        sub_rect[3] = 255; // A

        let updated = grid.update_rect_from_buffer(&sub_rect, 10, 5, 5, 15, 15, 5, 5);
        assert_eq!(updated, 1);
        assert_eq!(grid.allocated_tile_count(), 1);
        assert!(grid.has_tile(0, 0));
        assert!(!grid.has_tile(1, 0));
    }
}
