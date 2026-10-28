/// Funciones de composición ultrarrápidas para lienzo, capas y papel cebolla (Onion Skin)

/// Mezcla una capa con canal alfa sobre un búfer de destino ya inicializado
#[inline(always)]
pub fn blend_layer(dest: &mut [u8], src: &[u8], num_pixels: usize) {
    for i in 0..num_pixels {
        let idx = i * 4;
        let sa = src[idx + 3] as u32;
        if sa == 0 {
            continue;
        }

        if sa == 255 {
            dest[idx] = src[idx];
            dest[idx + 1] = src[idx + 1];
            dest[idx + 2] = src[idx + 2];
            dest[idx + 3] = 255;
        } else {
            let inv_a = 255 - sa;
            let dr = dest[idx] as u32;
            let dg = dest[idx + 1] as u32;
            let db = dest[idx + 2] as u32;
            let da = dest[idx + 3] as u32;

            let sr = src[idx] as u32;
            let sg = src[idx + 1] as u32;
            let sb = src[idx + 2] as u32;

            dest[idx] = ((sr * sa + dr * inv_a) / 255) as u8;
            dest[idx + 1] = ((sg * sa + dg * inv_a) / 255) as u8;
            dest[idx + 2] = ((sb * sa + db * inv_a) / 255) as u8;
            dest[idx + 3] = (sa + da * inv_a / 255).min(255) as u8;
        }
    }
}

/// Mezcla una capa aplicando un tinte de color y opacidad reducida (ideal para Papel Cebolla)
#[inline(always)]
pub fn blend_tinted_layer(
    dest: &mut [u8],
    src: &[u8],
    num_pixels: usize,
    tint_rgb: [u8; 3],
    opacity_factor: f32,
) {
    let [tr, tg, tb] = tint_rgb;
    let factor = opacity_factor.clamp(0.0, 1.0);

    for i in 0..num_pixels {
        let idx = i * 4;
        let sa_raw = src[idx + 3] as f32;
        if sa_raw <= 0.0 {
            continue;
        }

        let sa = (sa_raw * factor) as u32;
        if sa == 0 {
            continue;
        }

        let inv_a = 255 - sa;
        let dr = dest[idx] as u32;
        let dg = dest[idx + 1] as u32;
        let db = dest[idx + 2] as u32;
        let da = dest[idx + 3] as u32;

        dest[idx] = ((tr as u32 * sa + dr * inv_a) / 255) as u8;
        dest[idx + 1] = ((tg as u32 * sa + dg * inv_a) / 255) as u8;
        dest[idx + 2] = ((tb as u32 * sa + db * inv_a) / 255) as u8;
        dest[idx + 3] = (sa + da * inv_a / 255).min(255) as u8;
    }
}

/// Compone el lienzo completo: Papel blanco + Papel Cebolla anterior + Papel Cebolla posterior + Cel activo
pub fn composite_canvas(
    dest: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    current_cel: &[u8],
    prev_cel: Option<&[u8]>,
    next_cel: Option<&[u8]>,
    onion_skin_enabled: bool,
) {
    let total_pixels = (doc_w * doc_h) as usize;
    assert_eq!(dest.len(), total_pixels * 4);

    // 1. Fondo de papel blanco opaco
    dest.fill(255);

    // 2. Papel cebolla (Onion Skin)
    if onion_skin_enabled {
        // Frame anterior en tono carmesí/rojo (225, 29, 72)
        if let Some(prev) = prev_cel {
            blend_tinted_layer(dest, prev, total_pixels, [225, 29, 72], 0.35);
        }
        // Frame siguiente en tono azul/cian (2, 132, 199)
        if let Some(next) = next_cel {
            blend_tinted_layer(dest, next, total_pixels, [2, 132, 199], 0.35);
        }
    }

    // 3. Cel activo actual (tinta normal)
    blend_layer(dest, current_cel, total_pixels);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_composite_white_paper_and_ink() {
        let w = 16;
        let h = 16;
        let total = (w * h) as usize;
        let mut dest = vec![0u8; total * 4];
        let mut cel = vec![0u8; total * 4];

        // Pintar un pixel negro (0,0,0,255) en cel
        cel[0] = 0;
        cel[1] = 0;
        cel[2] = 0;
        cel[3] = 255;

        composite_canvas(&mut dest, w, h, &cel, None, None, false);

        // Pixel 0 debe ser negro opaco
        assert_eq!(&dest[0..4], &[0, 0, 0, 255]);
        // Pixel 1 debe ser blanco de fondo
        assert_eq!(&dest[4..8], &[255, 255, 255, 255]);
    }

    #[test]
    fn test_onion_skin_tint() {
        let w = 8;
        let h = 8;
        let total = (w * h) as usize;
        let mut dest = vec![0u8; total * 4];
        let cel = vec![0u8; total * 4]; // vacío
        let mut prev = vec![0u8; total * 4];

        // Pixel 0 en frame anterior con tinta opaca
        prev[0] = 0;
        prev[1] = 0;
        prev[2] = 0;
        prev[3] = 255;

        composite_canvas(&mut dest, w, h, &cel, Some(&prev), None, true);

        // Pixel 0 debe tener tono rojizo (R > B y G) debido al tinte [225, 29, 72]
        assert!(dest[0] > dest[1]);
        assert!(dest[0] > dest[2]);
    }
}

