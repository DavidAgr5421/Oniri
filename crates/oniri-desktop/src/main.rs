#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use eframe::egui;
use oniri_brush_core::{SparseTileGrid, TimelineCore};

pub struct OniriApp {
    pub doc_width: u32,
    pub doc_height: u32,
    pub current_frame: i32,
    pub total_frames: i32,
    pub fps: u32,
    pub is_playing: bool,
    pub brush_size: f32,
    pub brush_color: [f32; 3],
    pub tile_grid: SparseTileGrid,
    pub timeline: TimelineCore,
    pub status_msg: String,
}

impl Default for OniriApp {
    fn default() -> Self {
        let width = 1920;
        let height = 1080;
        let mut timeline = TimelineCore::new();
        timeline.add_track(1, true, false);
        timeline.add_clip(1, 1, 1, 24);

        Self {
            doc_width: width,
            doc_height: height,
            current_frame: 1,
            total_frames: 24,
            fps: 24,
            is_playing: false,
            brush_size: 14.0,
            brush_color: [0.12, 0.12, 0.12],
            tile_grid: SparseTileGrid::new(width, height),
            timeline,
            status_msg: "Oniri Native Studio (egui + wgpu) listo".to_string(),
        }
    }
}

impl eframe::App for OniriApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        // 1. Barra de Menú Superior
        egui::TopBottomPanel::top("top_menu_bar").show(ctx, |ui| {
            egui::menu::bar(ui, |ui| {
                ui.label(
                    egui::RichText::new("ONIRI")
                        .strong()
                        .color(egui::Color32::from_rgb(56, 189, 248)),
                );
                ui.label(
                    egui::RichText::new("NATIVE")
                        .small()
                        .color(egui::Color32::from_rgb(52, 211, 153)),
                );
                ui.separator();

                ui.menu_button("Archivo", |ui| {
                    if ui.button("Nuevo... (Ctrl+N)").clicked() {
                        ui.close_menu();
                    }
                    if ui.button("Abrir... (Ctrl+O)").clicked() {
                        ui.close_menu();
                    }
                    if ui.button("Guardar (Ctrl+S)").clicked() {
                        ui.close_menu();
                    }
                    ui.separator();
                    if ui.button("Salir").clicked() {
                        ctx.send_viewport_cmd(egui::ViewportCommand::Close);
                    }
                });

                ui.menu_button("Edición", |ui| {
                    if ui.button("Deshacer (Ctrl+Z)").clicked() {
                        ui.close_menu();
                    }
                    if ui.button("Rehacer (Ctrl+Y)").clicked() {
                        ui.close_menu();
                    }
                });

                ui.menu_button("Animación", |ui| {
                    if ui.button("Reproducir / Pausar (Espacio)").clicked() {
                        self.is_playing = !self.is_playing;
                        ui.close_menu();
                    }
                });

                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    ui.label(
                        egui::RichText::new(format!("{}×{} px @ {} fps", self.doc_width, self.doc_height, self.fps))
                            .small()
                            .color(egui::Color32::GRAY),
                    );
                });
            });
        });

        // 2. Barra de Estado Inferior
        egui::TopBottomPanel::bottom("status_bar").show(ctx, |ui| {
            ui.horizontal(|ui| {
                ui.label(egui::RichText::new(&self.status_msg).small());
                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    ui.label(
                        egui::RichText::new("120 FPS | Pure Rust Engine")
                            .small()
                            .color(egui::Color32::from_rgb(16, 185, 129)),
                    );
                });
            });
        });

        // 3. Panel de Timeline Inferior (Modo Inmediato - Cero DOM)
        egui::TopBottomPanel::bottom("timeline_panel")
            .resizable(true)
            .default_height(180.0)
            .min_height(120.0)
            .max_height(400.0)
            .show(ctx, |ui| {
                ui.horizontal(|ui| {
                    ui.heading("Línea de Tiempo");
                    ui.separator();

                    let play_label = if self.is_playing { "⏸ Pausar" } else { "▶ Reproducir" };
                    if ui.button(play_label).clicked() {
                        self.is_playing = !self.is_playing;
                    }

                    ui.label(format!("Frame {} / {}", self.current_frame, self.total_frames));
                    ui.add(egui::Slider::new(&mut self.current_frame, 1..=self.total_frames).text("Frame"));
                });

                ui.separator();

                // Regla virtualizada del Timeline
                egui::ScrollArea::horizontal().show(ui, |ui| {
                    let frame_width = 24.0;
                    let height = 80.0;
                    let (response, painter) = ui.allocate_painter(
                        egui::vec2(frame_width * (self.total_frames as f32 + 2.0), height),
                        egui::Sense::click_and_drag(),
                    );

                    let rect = response.rect;
                    let bg_color = egui::Color32::from_rgb(26, 29, 36);
                    painter.rect_filled(rect, 0.0, bg_color);

                    // Dibujar marcas de frames
                    for f in 1..=self.total_frames {
                        let fx = rect.min.x + (f - 1) as f32 * frame_width;
                        let is_active = f == self.current_frame;

                        let col_rect = egui::Rect::from_min_size(
                            egui::pos2(fx, rect.min.y),
                            egui::vec2(frame_width, height),
                        );

                        if is_active {
                            painter.rect_filled(
                                col_rect,
                                0.0,
                                egui::Color32::from_rgba_premultiplied(56, 189, 248, 60),
                            );
                            painter.line_segment(
                                [egui::pos2(fx, rect.min.y), egui::pos2(fx, rect.max.y)],
                                egui::Stroke::new(2.0_f32, egui::Color32::from_rgb(56, 189, 248)),
                            );
                        }

                        // Número de frame cada 5 frames
                        if f % 5 == 0 || f == 1 {
                            painter.text(
                                egui::pos2(fx + 2.0, rect.min.y + 4.0),
                                egui::Align2::LEFT_TOP,
                                format!("{}", f),
                                egui::FontId::proportional(10.0),
                                egui::Color32::LIGHT_GRAY,
                            );
                        }
                    }

                    if response.clicked() || response.dragged() {
                        if let Some(pos) = response.interact_pointer_pos() {
                            let rel_x = (pos.x - rect.min.x).max(0.0);
                            let target_f = ((rel_x / frame_width).floor() as i32 + 1).clamp(1, self.total_frames);
                            self.current_frame = target_f;
                        }
                    }
                });
            });

        // 4. Panel Izquierdo: Herramientas
        egui::SidePanel::left("tools_panel")
            .resizable(false)
            .default_width(52.0)
            .show(ctx, |ui| {
                ui.vertical_centered(|ui| {
                    ui.add_space(4.0);
                    if ui.button("✏").on_hover_text("Pincel").clicked() {}
                    if ui.button("🧼").on_hover_text("Borrador").clicked() {}
                    if ui.button("🪣").on_hover_text("Relleno").clicked() {}
                    if ui.button("🔍").on_hover_text("Cuentagotas").clicked() {}
                    ui.separator();
                    ui.color_edit_button_rgb(&mut self.brush_color);
                    ui.add_space(8.0);
                    ui.add(egui::Slider::new(&mut self.brush_size, 0.5..=100.0).vertical().text("Ø"));
                });
            });

        // 5. Panel Derecho: Capas y Navegador
        egui::SidePanel::right("layers_panel")
            .resizable(true)
            .default_width(240.0)
            .show(ctx, |ui| {
                ui.heading("Capas de Animación");
                ui.separator();
                ui.label("📁 Carpeta de Animación 1");
                ui.indent("anim1", |ui| {
                    ui.selectable_value(&mut self.current_frame, 1, "🖼 Cel 1");
                });
            });

        // 6. Viewport Central (Lienzo)
        egui::CentralPanel::default().show(ctx, |ui| {
            let (response, painter) = ui.allocate_painter(
                ui.available_size(),
                egui::Sense::click_and_drag(),
            );

            let rect = response.rect;
            // Fondo oscuro de trabajo
            painter.rect_filled(rect, 0.0, egui::Color32::from_rgb(18, 20, 24));

            // Simulación del lienzo 16:9 centrado
            let canvas_aspect = self.doc_width as f32 / self.doc_height as f32;
            let pad = 24.0;
            let avail_w = rect.width() - pad * 2.0;
            let avail_h = rect.height() - pad * 2.0;

            let (canvas_w, canvas_h) = if avail_w / avail_h > canvas_aspect {
                (avail_h * canvas_aspect, avail_h)
            } else {
                (avail_w, avail_w / canvas_aspect)
            };

            let canvas_center = rect.center();
            let canvas_rect = egui::Rect::from_center_size(canvas_center, egui::vec2(canvas_w, canvas_h));

            // Sombra y marco blanco del papel
            let shadow_rect = canvas_rect.expand(4.0);
            painter.rect_filled(shadow_rect, 4.0, egui::Color32::from_black_alpha(80));
            painter.rect_filled(canvas_rect, 2.0, egui::Color32::WHITE);

            // Dibujo interactivo directo en pantalla
            if response.dragged() || response.clicked() {
                if let Some(pos) = response.interact_pointer_pos() {
                    if canvas_rect.contains(pos) {
                        // Coordenadas relativas al lienzo
                        let norm_x = (pos.x - canvas_rect.min.x) / canvas_rect.width();
                        let norm_y = (pos.y - canvas_rect.min.y) / canvas_rect.height();
                        let doc_x = norm_x * self.doc_width as f32;
                        let doc_y = norm_y * self.doc_height as f32;

                        self.status_msg = format!("Trazo en doc: ({:.1}, {:.1}) px", doc_x, doc_y);
                    }
                }
            }
        });
    }
}

fn main() -> eframe::Result<()> {
    let native_options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_title("Oniri Native Studio — Powered by egui & wgpu")
            .with_inner_size([1280.0, 820.0])
            .with_min_inner_size([800.0, 600.0]),
        ..Default::default()
    };

    eframe::run_native(
        "Oniri Native Studio",
        native_options,
        Box::new(|_cc| Ok(Box::new(OniriApp::default()))),
    )
}
