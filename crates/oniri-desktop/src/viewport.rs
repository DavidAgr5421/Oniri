use eframe::egui;

/// Gestiona las transformaciones 2D del lienzo: paneo, zoom suave centrado y rotación
#[derive(Clone, Debug)]
pub struct ViewportState {
    pub pan: egui::Vec2,
    pub zoom: f32,
    pub rotation_rad: f32,
}

impl Default for ViewportState {
    fn default() -> Self {
        Self {
            pan: egui::Vec2::ZERO,
            zoom: 1.0,
            rotation_rad: 0.0,
        }
    }
}

impl ViewportState {
    /// Ajusta el documento para que encaje cómodamente en el área disponible
    pub fn fit_to_rect(&mut self, rect: egui::Rect, doc_w: f32, doc_h: f32) {
        let pad = 40.0;
        let avail_w = (rect.width() - pad * 2.0).max(10.0);
        let avail_h = (rect.height() - pad * 2.0).max(10.0);

        let scale_w = avail_w / doc_w;
        let scale_h = avail_h / doc_h;
        self.zoom = scale_w.min(scale_h).clamp(0.05, 50.0);
        self.pan = egui::Vec2::ZERO;
        self.rotation_rad = 0.0;
    }

    /// Convierte una coordenada de pantalla (píxeles de ventana) a coordenadas del documento (0..doc_w, 0..doc_h)
    pub fn screen_to_doc(
        &self,
        screen_pos: egui::Pos2,
        center: egui::Pos2,
        doc_w: f32,
        doc_h: f32,
    ) -> Option<egui::Pos2> {
        // 1. Restar el centro del viewport y el paneo
        let rel = screen_pos - (center + self.pan);

        // 2. Deshacer la rotación
        let cos = (-self.rotation_rad).cos();
        let sin = (-self.rotation_rad).sin();
        let unrotated = egui::vec2(rel.x * cos - rel.y * sin, rel.x * sin + rel.y * cos);

        // 3. Deshacer el zoom
        let unscaled = unrotated / self.zoom;

        // 4. Centrar relativo al documento
        let doc_x = unscaled.x + doc_w * 0.5;
        let doc_y = unscaled.y + doc_h * 0.5;

        if doc_x >= 0.0 && doc_x <= doc_w && doc_y >= 0.0 && doc_y <= doc_h {
            Some(egui::pos2(doc_x, doc_y))
        } else {
            // Fuera de los límites del lienzo
            None
        }
    }

    /// Convierte coordenadas del documento a coordenadas de pantalla para renderizado
    pub fn doc_to_screen(
        &self,
        doc_pos: egui::Pos2,
        center: egui::Pos2,
        doc_w: f32,
        doc_h: f32,
    ) -> egui::Pos2 {
        let centered = egui::vec2(doc_pos.x - doc_w * 0.5, doc_pos.y - doc_h * 0.5);
        let scaled = centered * self.zoom;

        let cos = self.rotation_rad.cos();
        let sin = self.rotation_rad.sin();
        let rotated = egui::vec2(scaled.x * cos - scaled.y * sin, scaled.x * sin + scaled.y * cos);

        (center + self.pan) + rotated
    }

    /// Procesa gestos de paneo (clic central o Espacio+arrastre) y zoom con la rueda
    pub fn handle_navigation(
        &mut self,
        ui: &egui::Ui,
        response: &egui::Response,
        center: egui::Pos2,
    ) {
        // 1. Zoom con la rueda del ratón centrado en el puntero
        let scroll_delta = ui.input(|i| i.raw_scroll_delta.y);
        if scroll_delta != 0.0 {
            let pointer_pos = ui.input(|i| i.pointer.hover_pos()).unwrap_or(center);
            let zoom_factor = if scroll_delta > 0.0 { 1.15 } else { 1.0 / 1.15 };
            let old_zoom = self.zoom;
            let new_zoom = (old_zoom * zoom_factor).clamp(0.05, 64.0);

            // Ajustar el paneo para que el punto bajo el cursor permanezca inmóvil
            let pivot = pointer_pos - (center + self.pan);
            self.pan += pivot * (1.0 - new_zoom / old_zoom);
            self.zoom = new_zoom;
        }

        // 2. Paneo con botón central del ratón
        if response.dragged_by(egui::PointerButton::Middle) {
            self.pan += response.drag_delta();
        }

        // 3. Paneo con barra espaciadora pulsada + clic primario
        let space_down = ui.input(|i| i.key_down(egui::Key::Space));
        if space_down && response.dragged_by(egui::PointerButton::Primary) {
            self.pan += response.drag_delta();
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_viewport_coord_roundtrip() {
        let viewport = ViewportState {
            pan: egui::vec2(50.0, -30.0),
            zoom: 2.0,
            rotation_rad: 0.0,
        };
        let center = egui::pos2(500.0, 400.0);
        let doc_w = 1920.0;
        let doc_h = 1080.0;

        let original_doc_pos = egui::pos2(960.0, 540.0);
        let screen_pos = viewport.doc_to_screen(original_doc_pos, center, doc_w, doc_h);
        let recovered_doc_pos = viewport
            .screen_to_doc(screen_pos, center, doc_w, doc_h)
            .expect("Debe estar dentro del documento");

        assert!((recovered_doc_pos.x - original_doc_pos.x).abs() < 1e-3);
        assert!((recovered_doc_pos.y - original_doc_pos.y).abs() < 1e-3);
    }
}

