use eframe::egui;

/// Pinta un sello circular suavizado directamente sobre un búfer RGBA de documento
pub fn stamp_circle_rgba(
    buffer: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    cx: f32,
    cy: f32,
    radius: f32,
    color: [u8; 4],
) -> Option<[u32; 4]> {
    let min_x = (cx - radius - 1.0).floor().max(0.0) as u32;
    let max_x = (cx + radius + 1.0).ceil().min(doc_w as f32 - 1.0) as u32;
    let min_y = (cy - radius - 1.0).floor().max(0.0) as u32;
    let max_y = (cy + radius + 1.0).ceil().min(doc_h as f32 - 1.0) as u32;

    if min_x > max_x || min_y > max_y {
        return None;
    }

    let r_sq = radius * radius;
    let [sr, sg, sb, sa] = color;
    let dw = doc_w as usize;

    for y in min_y..=max_y {
        let dy = y as f32 - cy;
        let dy_sq = dy * dy;
        let row_start = (y as usize * dw) * 4;

        for x in min_x..=max_x {
            let dx = x as f32 - cx;
            let dist_sq = dx * dx + dy_sq;
            if dist_sq <= r_sq + radius {
                let dist = dist_sq.sqrt();
                // Anti-aliasing suave en el borde exterior
                let edge_alpha = ((radius - dist) + 0.75).clamp(0.0, 1.0);
                let alpha = ((sa as f32) * edge_alpha) as u32;

                if alpha > 0 {
                    let idx = row_start + (x as usize) * 4;
                    let da = buffer[idx + 3] as u32;
                    let out_a = alpha + da * (255 - alpha) / 255;
                    if out_a > 0 {
                        let dr = buffer[idx] as u32;
                        let dg = buffer[idx + 1] as u32;
                        let db = buffer[idx + 2] as u32;

                        buffer[idx] =
                            ((sr as u32 * alpha + dr * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 1] =
                            ((sg as u32 * alpha + dg * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 2] =
                            ((sb as u32 * alpha + db * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 3] = out_a as u8;
                    }
                }
            }
        }
    }

    Some([min_x, min_y, max_x + 1, max_y + 1])
}

/// Borra píxeles en forma circular suave reduciendo el canal alfa
pub fn erase_circle_rgba(
    buffer: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    cx: f32,
    cy: f32,
    radius: f32,
    erase_power: f32,
) -> Option<[u32; 4]> {
    let min_x = (cx - radius - 1.0).floor().max(0.0) as u32;
    let max_x = (cx + radius + 1.0).ceil().min(doc_w as f32 - 1.0) as u32;
    let min_y = (cy - radius - 1.0).floor().max(0.0) as u32;
    let max_y = (cy + radius + 1.0).ceil().min(doc_h as f32 - 1.0) as u32;

    if min_x > max_x || min_y > max_y {
        return None;
    }

    let r_sq = radius * radius;
    let dw = doc_w as usize;

    for y in min_y..=max_y {
        let dy = y as f32 - cy;
        let dy_sq = dy * dy;
        let row_start = (y as usize * dw) * 4;

        for x in min_x..=max_x {
            let dx = x as f32 - cx;
            let dist_sq = dx * dx + dy_sq;
            if dist_sq <= r_sq + radius {
                let dist = dist_sq.sqrt();
                let edge = ((radius - dist) + 0.75).clamp(0.0, 1.0);
                let erase_amount = (edge * erase_power.clamp(0.0, 1.0) * 255.0) as u32;

                let idx = row_start + (x as usize) * 4;
                let cur_a = buffer[idx + 3] as u32;
                let new_a = cur_a.saturating_sub(erase_amount);
                buffer[idx + 3] = new_a as u8;
                if new_a == 0 {
                    buffer[idx] = 0;
                    buffer[idx + 1] = 0;
                    buffer[idx + 2] = 0;
                }
            }
        }
    }

    Some([min_x, min_y, max_x + 1, max_y + 1])
}

/// Dibuja un segmento interpolando sellos entre el punto anterior y el actual
pub fn stamp_stroke_segment(
    buffer: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    p0: egui::Pos2,
    p1: egui::Pos2,
    radius: f32,
    color: [u8; 4],
    is_eraser: bool,
) -> Option<[u32; 4]> {
    let dist = p0.distance(p1);
    let step = (radius * 0.35).max(1.0);
    let count = (dist / step).ceil().max(1.0) as usize;

    let mut dirty: Option<[u32; 4]> = None;

    for i in 0..=count {
        let t = i as f32 / count as f32;
        let pos = p0.lerp(p1, t);

        let res = if is_eraser {
            erase_circle_rgba(buffer, doc_w, doc_h, pos.x, pos.y, radius, 1.0)
        } else {
            stamp_circle_rgba(buffer, doc_w, doc_h, pos.x, pos.y, radius, color)
        };

        if let Some(r) = res {
            dirty = match dirty {
                None => Some(r),
                Some([min_x, min_y, max_x, max_y]) => {
                    Some([min_x.min(r[0]), min_y.min(r[1]), max_x.max(r[2]), max_y.max(r[3])])
                }
            };
        }
    }

    dirty
}

/// Muestrea el color RGB en una coordenada del búfer (Cuentagotas)
pub fn sample_color_at(buffer: &[u8], doc_w: u32, doc_h: u32, x: f32, y: f32) -> Option<[f32; 3]> {
    let px = x.floor() as i32;
    let py = y.floor() as i32;
    if px >= 0 && px < doc_w as i32 && py >= 0 && py < doc_h as i32 {
        let idx = (py as usize * doc_w as usize + px as usize) * 4;
        let r = buffer[idx] as f32 / 255.0;
        let g = buffer[idx + 1] as f32 / 255.0;
        let b = buffer[idx + 2] as f32 / 255.0;
        Some([r, g, b])
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_stamp_and_sample() {
        let w = 64;
        let h = 64;
        let mut buffer = vec![0u8; (w * h * 4) as usize];

        // Estampar un círculo rojo en el centro (32, 32)
        let dirty = stamp_circle_rgba(&mut buffer, w, h, 32.0, 32.0, 8.0, [255, 0, 0, 255]);
        assert!(dirty.is_some());

        // Muestrear en el centro exacto
        let sampled = sample_color_at(&buffer, w, h, 32.0, 32.0).expect("Debe haber color");
        assert!((sampled[0] - 1.0).abs() < 0.05); // Rojo alto
        assert!(sampled[1] < 0.05); // Verde 0
        assert!(sampled[2] < 0.05); // Azul 0

        // Borrar una porción
        let erased = erase_circle_rgba(&mut buffer, w, h, 32.0, 32.0, 8.0, 1.0);
        assert!(erased.is_some());
        let center_idx = ((32 * w + 32) * 4) as usize;
        assert_eq!(buffer[center_idx + 3], 0); // Canal alfa borrado
    }
}


