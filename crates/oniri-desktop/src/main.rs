#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod brush;
mod compositor;
mod viewport;

use brush::{BrushPreset, BrushSettings, StrokeTracker};
use eframe::egui;
use oniri_brush_core::{SparseTileGrid, TimelineCore};
use std::collections::HashMap;
use std::time::Instant;
use viewport::ViewportState;

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum ToolMode {
    Brush,
    Eraser,
    Eyedropper,
    Pan,
}

pub struct OniriApp {
    pub doc_width: u32,
    pub doc_height: u32,
    pub current_frame: i32,
    pub total_frames: i32,
    pub fps: u32,
    pub is_playing: bool,
    pub last_playback_tick: Instant,

    // Herramientas y pincel nativo optimizado
    pub tool_mode: ToolMode,
    pub brush_settings: BrushSettings,
    pub brush_color: [f32; 3],
    pub onion_skin: bool,
    pub stroke_tracker: StrokeTracker,

    // Viewport y lienzo
    pub viewport: ViewportState,
    pub viewport_initialized: bool,

    // Animación y búferes
    pub frames: HashMap<i32, Vec<u8>>,
    pub composite_buffer: Vec<u8>,
    pub canvas_texture: Option<egui::TextureHandle>,
    pub needs_composite: bool,

    // Historial (Deshacer / Rehacer)
    pub undo_stack: Vec<(i32, Vec<u8>)>,
    pub redo_stack: Vec<(i32, Vec<u8>)>,

    // Núcleo Rust
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

        let total_pixels = (width * height) as usize;
        let composite_buffer = vec![255u8; total_pixels * 4];

        // Primer frame inicial (en blanco con canal alfa cero / transparente)
        let mut frames = HashMap::new();
        frames.insert(1, vec![0u8; total_pixels * 4]);

        Self {
            doc_width: width,
            doc_height: height,
            current_frame: 1,
            total_frames: 24,
            fps: 24,
            is_playing: false,
            last_playback_tick: Instant::now(),
            tool_mode: ToolMode::Brush,
            brush_settings: BrushSettings::from_preset(BrushPreset::GPen),
            brush_color: [0.12, 0.12, 0.12],
            onion_skin: true,
            stroke_tracker: StrokeTracker::default(),
            viewport: ViewportState::default(),
            viewport_initialized: false,
            frames,
            composite_buffer,
            canvas_texture: None,
            needs_composite: true,
            undo_stack: Vec::new(),
            redo_stack: Vec::new(),
            tile_grid: SparseTileGrid::new(width, height),
            timeline,
            status_msg: "Oniri Native Studio listo (Motor de pinceles optimizado)".to_string(),
        }
    }
}

impl OniriApp {
    /// Obtiene o inicializa el búfer de dibujo para el frame indicado
    pub fn get_or_create_current_frame_mut(&mut self) -> &mut Vec<u8> {
        let total_pixels = (self.doc_width * self.doc_height) as usize;
        self.frames
            .entry(self.current_frame)
            .or_insert_with(|| vec![0u8; total_pixels * 4])
    }

    /// Guarda el estado actual en el historial para permitir deshacer
    pub fn push_undo_snapshot(&mut self) {
        let frame_id = self.current_frame;
        let buffer_clone = self.get_or_create_current_frame_mut().clone();
        if self.undo_stack.len() >= 30 {
            self.undo_stack.remove(0);
        }
        self.undo_stack.push((frame_id, buffer_clone));
        self.redo_stack.clear();
    }

    /// Deshace la última acción
    pub fn undo(&mut self) {
        if let Some((frame_id, previous_buf)) = self.undo_stack.pop() {
            let current_buf = self.frames.get(&frame_id).cloned().unwrap_or_default();
            self.redo_stack.push((frame_id, current_buf));
            self.frames.insert(frame_id, previous_buf);
            self.current_frame = frame_id;
            self.needs_composite = true;
            self.status_msg = format!("Deshacer en frame {}", frame_id);
        }
    }

    /// Rehace la última acción deshecha
    pub fn redo(&mut self) {
        if let Some((frame_id, next_buf)) = self.redo_stack.pop() {
            let current_buf = self.frames.get(&frame_id).cloned().unwrap_or_default();
            self.undo_stack.push((frame_id, current_buf));
            self.frames.insert(frame_id, next_buf);
            self.current_frame = frame_id;
            self.needs_composite = true;
            self.status_msg = format!("Rehacer en frame {}", frame_id);
        }
    }

    /// Recompone la textura del lienzo
    pub fn update_canvas_texture(&mut self, ctx: &egui::Context) {
        let total_pixels = (self.doc_width * self.doc_height) as usize;
        self.frames
            .entry(self.current_frame)
            .or_insert_with(|| vec![0u8; total_pixels * 4]);

        let doc_w = self.doc_width;
        let doc_h = self.doc_height;
        let onion = self.onion_skin;
        let current_frame = self.current_frame;

        let prev_cel = self.frames.get(&(current_frame - 1)).map(|v| v.as_slice());
        let next_cel = self.frames.get(&(current_frame + 1)).map(|v| v.as_slice());
        let cur_cel = self.frames.get(&current_frame).unwrap().as_slice();

        compositor::composite_canvas(
            &mut self.composite_buffer,
            doc_w,
            doc_h,
            cur_cel,
            prev_cel,
            next_cel,
            onion,
        );

        let image = egui::ColorImage::from_rgba_unmultiplied(
            [doc_w as usize, doc_h as usize],
            &self.composite_buffer,
        );

        match &mut self.canvas_texture {
            Some(tex) => tex.set(image, egui::TextureOptions::LINEAR),
            None => {
                self.canvas_texture = Some(ctx.load_texture("oniri_canvas", image, egui::TextureOptions::LINEAR));
            }
        }
        self.needs_composite = false;
    }
}

impl eframe::App for OniriApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        // --- 0. Control de Teclado y Atajos Globales ---
        ctx.input(|i| {
            if i.modifiers.command && i.key_pressed(egui::Key::Z) {
                if i.modifiers.shift {
                    self.redo();
                } else {
                    self.undo();
                }
            } else if i.modifiers.command && i.key_pressed(egui::Key::Y) {
                self.redo();
            }

            if !i.modifiers.command && !i.modifiers.ctrl && !i.modifiers.alt {
                if i.key_pressed(egui::Key::B) {
                    self.tool_mode = ToolMode::Brush;
                    if self.brush_settings.preset.is_eraser() {
                        self.brush_settings = BrushSettings::from_preset(BrushPreset::GPen);
                    }
                    self.status_msg = "Herramienta: Pincel (B)".to_string();
                } else if i.key_pressed(egui::Key::E) {
                    self.tool_mode = ToolMode::Eraser;
                    if !self.brush_settings.preset.is_eraser() {
                        self.brush_settings = BrushSettings::from_preset(BrushPreset::HardEraser);
                    }
                    self.status_msg = "Herramienta: Borrador (E)".to_string();
                } else if i.key_pressed(egui::Key::I) {
                    self.tool_mode = ToolMode::Eyedropper;
                    self.status_msg = "Herramienta: Cuentagotas (I)".to_string();
                } else if i.key_pressed(egui::Key::H) {
                    self.tool_mode = ToolMode::Pan;
                    self.status_msg = "Herramienta: Mano / Paneo (H)".to_string();
                } else if i.key_pressed(egui::Key::O) {
                    self.onion_skin = !self.onion_skin;
                    self.needs_composite = true;
                    self.status_msg = format!("Papel Cebolla: {}", if self.onion_skin { "Activado" } else { "Desactivado" });
                } else if i.key_pressed(egui::Key::Space) {
                    self.is_playing = !self.is_playing;
                } else if i.key_pressed(egui::Key::ArrowLeft) || i.key_pressed(egui::Key::Comma) {
                    if self.current_frame > 1 {
                        self.current_frame -= 1;
                        self.needs_composite = true;
                    }
                } else if i.key_pressed(egui::Key::ArrowRight) || i.key_pressed(egui::Key::Period) {
                    if self.current_frame < self.total_frames {
                        self.current_frame += 1;
                        self.needs_composite = true;
                    }
                }
            }
        });

        // --- 0.1 Bucle de Reproducción de Animación a FPS constante ---
        if self.is_playing {
            let now = Instant::now();
            let frame_dur = std::time::Duration::from_secs_f32(1.0 / self.fps.max(1) as f32);
            if now.duration_since(self.last_playback_tick) >= frame_dur {
                self.last_playback_tick = now;
                self.current_frame = if self.current_frame >= self.total_frames {
                    1
                } else {
                    self.current_frame + 1
                };
                self.needs_composite = true;
            }
            ctx.request_repaint();
        }

        // --- 1. Barra de Menú Superior ---
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
                        let total_pixels = (self.doc_width * self.doc_height) as usize;
                        self.frames.clear();
                        self.frames.insert(1, vec![0u8; total_pixels * 4]);
                        self.undo_stack.clear();
                        self.redo_stack.clear();
                        self.current_frame = 1;
                        self.needs_composite = true;
                        self.status_msg = "Nuevo documento creado".to_string();
                        ui.close_menu();
                    }
                    if ui.button("Abrir Imagen... (Ctrl+O)").clicked() {
                        if let Some(path) = rfd::FileDialog::new()
                            .add_filter("Imágenes", &["png", "jpg", "jpeg"])
                            .pick_file()
                        {
                            if let Ok(img) = image::open(&path) {
                                let rgba = img.to_rgba8();
                                let total_pixels = (self.doc_width * self.doc_height) as usize;
                                let mut buf = vec![0u8; total_pixels * 4];
                                let copy_w = rgba.width().min(self.doc_width) as usize;
                                let copy_h = rgba.height().min(self.doc_height) as usize;
                                for y in 0..copy_h {
                                    for x in 0..copy_w {
                                        let p = rgba.get_pixel(x as u32, y as u32);
                                        let d_idx = (y * self.doc_width as usize + x) * 4;
                                        buf[d_idx] = p[0];
                                        buf[d_idx + 1] = p[1];
                                        buf[d_idx + 2] = p[2];
                                        buf[d_idx + 3] = p[3];
                                    }
                                }
                                self.frames.insert(self.current_frame, buf);
                                self.needs_composite = true;
                                self.status_msg = format!("Imagen cargada: {:?}", path.file_name().unwrap_or_default());
                            }
                        }
                        ui.close_menu();
                    }
                    if ui.button("Exportar Frame como PNG...").clicked() {
                        if let Some(path) = rfd::FileDialog::new()
                            .add_filter("PNG", &["png"])
                            .set_file_name(format!("frame_{:03}.png", self.current_frame))
                            .save_file()
                        {
                            let _ = image::save_buffer(
                                path,
                                &self.composite_buffer,
                                self.doc_width,
                                self.doc_height,
                                image::ExtendedColorType::Rgba8,
                            );
                            self.status_msg = "Frame exportado con éxito a PNG".to_string();
                        }
                        ui.close_menu();
                    }
                    ui.separator();
                    if ui.button("Salir").clicked() {
                        ctx.send_viewport_cmd(egui::ViewportCommand::Close);
                    }
                });

                ui.menu_button("Edición", |ui| {
                    if ui.button("Deshacer (Ctrl+Z)").clicked() {
                        self.undo();
                        ui.close_menu();
                    }
                    if ui.button("Rehacer (Ctrl+Y)").clicked() {
                        self.redo();
                        ui.close_menu();
                    }
                    ui.separator();
                    if ui.button("Limpiar Cel Actual (Del)").clicked() {
                        self.push_undo_snapshot();
                        let total_pixels = (self.doc_width * self.doc_height) as usize;
                        self.frames.insert(self.current_frame, vec![0u8; total_pixels * 4]);
                        self.needs_composite = true;
                        ui.close_menu();
                    }
                });

                ui.menu_button("Ver", |ui| {
                    if ui.button("Ajustar a Pantalla (Ctrl+0)").clicked() {
                        self.viewport_initialized = false;
                        ui.close_menu();
                    }
                    if ui.button("Zoom 100%").clicked() {
                        self.viewport.zoom = 1.0;
                        self.viewport.pan = egui::Vec2::ZERO;
                        ui.close_menu();
                    }
                });

                ui.menu_button("Animación", |ui| {
                    let play_text = if self.is_playing { "Pausar (Espacio)" } else { "Reproducir (Espacio)" };
                    if ui.button(play_text).clicked() {
                        self.is_playing = !self.is_playing;
                        ui.close_menu();
                    }
                    let onion_text = if self.onion_skin { "Desactivar Papel Cebolla (O)" } else { "Activar Papel Cebolla (O)" };
                    if ui.button(onion_text).clicked() {
                        self.onion_skin = !self.onion_skin;
                        self.needs_composite = true;
                        ui.close_menu();
                    }
                });

                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    ui.label(
                        egui::RichText::new(format!(
                            "{}×{} px @ {} fps | Zoom: {:.0}%",
                            self.doc_width,
                            self.doc_height,
                            self.fps,
                            self.viewport.zoom * 100.0
                        ))
                        .small()
                        .color(egui::Color32::GRAY),
                    );
                });
            });
        });

        // --- 2. Barra de Estado Inferior ---
        egui::TopBottomPanel::bottom("status_bar").show(ctx, |ui| {
            ui.horizontal(|ui| {
                ui.label(egui::RichText::new(&self.status_msg).small());
                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    ui.label(
                        egui::RichText::new(format!(
                            "Pincel: {} | Tamaño: {:.1} px | Estabilizador: {:.0}",
                            self.brush_settings.preset.name(),
                            self.brush_settings.size,
                            self.brush_settings.stabilization
                        ))
                        .small()
                        .color(egui::Color32::from_rgb(16, 185, 129)),
                    );
                });
            });
        });

        // --- 3. Panel de Timeline Inferior ---
        egui::TopBottomPanel::bottom("timeline_panel")
            .resizable(true)
            .default_height(160.0)
            .min_height(100.0)
            .max_height(350.0)
            .show(ctx, |ui| {
                ui.horizontal(|ui| {
                    ui.heading("Línea de Tiempo");
                    ui.separator();

                    let play_label = if self.is_playing { "⏸ Pausar" } else { "▶ Reproducir" };
                    if ui.button(play_label).clicked() {
                        self.is_playing = !self.is_playing;
                    }

                    if ui.selectable_label(self.onion_skin, "🧅 Papel Cebolla").clicked() {
                        self.onion_skin = !self.onion_skin;
                        self.needs_composite = true;
                    }

                    ui.separator();
                    ui.label(format!("Frame {} / {}", self.current_frame, self.total_frames));
                    if ui.add(egui::Slider::new(&mut self.current_frame, 1..=self.total_frames).text("Frame")).changed() {
                        self.needs_composite = true;
                    }

                    ui.label("FPS:");
                    ui.add(egui::Slider::new(&mut self.fps, 1..=60).text(""));
                });

                ui.separator();

                // Regla interactiva inmediata de frames
                egui::ScrollArea::horizontal().show(ui, |ui| {
                    let frame_width = 28.0;
                    let height = 70.0;
                    let (response, painter) = ui.allocate_painter(
                        egui::vec2(frame_width * (self.total_frames as f32 + 2.0), height),
                        egui::Sense::click_and_drag(),
                    );

                    let rect = response.rect;
                    let bg_color = egui::Color32::from_rgb(26, 29, 36);
                    painter.rect_filled(rect, 0.0, bg_color);

                    for f in 1..=self.total_frames {
                        let fx = rect.min.x + (f - 1) as f32 * frame_width;
                        let is_active = f == self.current_frame;
                        let has_drawing = self.frames.get(&f).is_some();

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
                        } else if has_drawing {
                            // Marca pequeña para indicar que el frame contiene trazos
                            painter.circle_filled(
                                egui::pos2(fx + frame_width * 0.5, rect.min.y + height - 12.0),
                                3.0,
                                egui::Color32::from_rgb(52, 211, 153),
                            );
                        }

                        if f % 5 == 0 || f == 1 {
                            painter.text(
                                egui::pos2(fx + 2.0, rect.min.y + 4.0),
                                egui::Align2::LEFT_TOP,
                                format!("{}", f),
                                egui::FontId::proportional(11.0),
                                egui::Color32::LIGHT_GRAY,
                            );
                        }
                    }

                    if response.clicked() || response.dragged() {
                        if let Some(pos) = response.interact_pointer_pos() {
                            let rel_x = (pos.x - rect.min.x).max(0.0);
                            let target_f = ((rel_x / frame_width).floor() as i32 + 1).clamp(1, self.total_frames);
                            if target_f != self.current_frame {
                                self.current_frame = target_f;
                                self.needs_composite = true;
                            }
                        }
                    }
                });
            });

        // --- 4. Panel Izquierdo de Herramientas y Pinceles ---
        egui::SidePanel::left("tools_panel")
            .resizable(false)
            .default_width(70.0)
            .show(ctx, |ui| {
                ui.vertical_centered(|ui| {
                    ui.add_space(4.0);

                    // Presets de entintado y dibujo
                    let presets = [
                        (BrushPreset::GPen, "✒", "Plumilla G (Inking)"),
                        (BrushPreset::MaruPen, "🖋", "Plumilla Maru (Detalle)"),
                        (BrushPreset::TexturedPen, "🖌", "Plumilla Rugosa (Gasa)"),
                        (BrushPreset::Calligraphy, "🪶", "Caligráfico (Cincel)"),
                        (BrushPreset::Pencil, "✏", "Lápiz Grafito"),
                        (BrushPreset::Airbrush, "💨", "Aerógrafo"),
                        (BrushPreset::HardEraser, "🧼", "Borrador Duro"),
                        (BrushPreset::SoftEraser, "🧽", "Borrador Suave"),
                    ];

                    for (preset, icon, tooltip) in presets {
                        let is_sel = self.brush_settings.preset == preset && (
                            (!preset.is_eraser() && self.tool_mode == ToolMode::Brush) ||
                            (preset.is_eraser() && self.tool_mode == ToolMode::Eraser)
                        );
                        if ui.selectable_label(is_sel, icon).on_hover_text(tooltip).clicked() {
                            self.brush_settings = BrushSettings::from_preset(preset);
                            self.tool_mode = if preset.is_eraser() { ToolMode::Eraser } else { ToolMode::Brush };
                            self.status_msg = format!("Pincel activo: {}", preset.name());
                        }
                    }

                    ui.separator();
                    if ui.selectable_label(self.tool_mode == ToolMode::Eyedropper, "🔍")
                        .on_hover_text("Cuentagotas (I)")
                        .clicked()
                    {
                        self.tool_mode = ToolMode::Eyedropper;
                        self.status_msg = "Herramienta: Cuentagotas (I)".to_string();
                    }

                    if ui.selectable_label(self.tool_mode == ToolMode::Pan, "✋")
                        .on_hover_text("Mano / Paneo (H o Espacio)")
                        .clicked()
                    {
                        self.tool_mode = ToolMode::Pan;
                        self.status_msg = "Herramienta: Mano / Paneo (H)".to_string();
                    }

                    ui.separator();
                    ui.label("Color");
                    ui.color_edit_button_rgb(&mut self.brush_color);

                    ui.add_space(8.0);
                    ui.label(format!("{:.0}px", self.brush_settings.size));
                    ui.add(egui::Slider::new(&mut self.brush_settings.size, 1.0..=140.0).vertical().text(""));

                    ui.add_space(4.0);
                    ui.label("Estabil.");
                    ui.add(egui::Slider::new(&mut self.brush_settings.stabilization, 0.0..=40.0).vertical().text(""));
                });
            });

        // --- 5. Panel Derecho de Capas e Información ---
        egui::SidePanel::right("layers_panel")
            .resizable(true)
            .default_width(230.0)
            .show(ctx, |ui| {
                ui.heading("Capas de Animación");
                ui.separator();

                ui.collapsing("🎬 Carpeta de Animación 1", |ui| {
                    for f in 1..=self.total_frames {
                        let is_active = f == self.current_frame;
                        let text = format!("🖼 Cel {:02}", f);
                        if ui.selectable_label(is_active, text).clicked() {
                            self.current_frame = f;
                            self.needs_composite = true;
                        }
                    }
                });

                ui.separator();
                ui.heading("Ajustes de Pincel");
                ui.horizontal(|ui| {
                    ui.label("Grosor:");
                    ui.add(egui::Slider::new(&mut self.brush_settings.size, 0.5..=150.0).text("px"));
                });
                ui.horizontal(|ui| {
                    ui.label("Opacidad:");
                    ui.add(egui::Slider::new(&mut self.brush_settings.opacity, 0.05..=1.0).text(""));
                });
                ui.horizontal(|ui| {
                    ui.label("Flujo:");
                    ui.add(egui::Slider::new(&mut self.brush_settings.flow, 0.05..=1.0).text(""));
                });
                ui.horizontal(|ui| {
                    ui.label("Estabilizador:");
                    ui.add(egui::Slider::new(&mut self.brush_settings.stabilization, 0.0..=40.0).text(""));
                });
                ui.checkbox(&mut self.brush_settings.pressure_size, "Presión -> Tamaño");
                ui.checkbox(&mut self.brush_settings.pressure_flow, "Presión -> Opacidad");

                ui.separator();
                ui.heading("Atajos Rápidos");
                ui.label("• B: Pincel");
                ui.label("• E: Borrador");
                ui.label("• I: Cuentagotas");
                ui.label("• H / Espacio: Paneo");
                ui.label("• O: Papel Cebolla");
                ui.label("• Espacio: Reproducir");
                ui.label("• Ctrl+Z: Deshacer");
                ui.label("• Ctrl+Y: Rehacer");
                ui.label("• Ctrl+0: Centrar Lienzo");
            });

        // --- 6. Viewport Central (Lienzo Nativo) ---
        egui::CentralPanel::default().show(ctx, |ui| {
            let (response, painter) = ui.allocate_painter(
                ui.available_size(),
                egui::Sense::click_and_drag(),
            );

            let rect = response.rect;
            let center = rect.center();

            // Auto-ajustar lienzo en el primer ciclo
            if !self.viewport_initialized && rect.width() > 10.0 && rect.height() > 10.0 {
                self.viewport.fit_to_rect(rect, self.doc_width as f32, self.doc_height as f32);
                self.viewport_initialized = true;
            }

            // Gestionar navegación (paneo con rueda, clic central o espacio)
            let is_space = ui.input(|i| i.key_down(egui::Key::Space));
            let wants_pan = self.tool_mode == ToolMode::Pan || is_space;

            self.viewport.handle_navigation(ui, &response, center);

            // Fondo oscuro de trabajo
            painter.rect_filled(rect, 0.0, egui::Color32::from_rgb(18, 20, 24));

            // Calcular rect del lienzo en coordenadas de pantalla
            let doc_w = self.doc_width as f32;
            let doc_h = self.doc_height as f32;
            let screen_p0 = self.viewport.doc_to_screen(egui::pos2(0.0, 0.0), center, doc_w, doc_h);
            let screen_p1 = self.viewport.doc_to_screen(egui::pos2(doc_w, doc_h), center, doc_w, doc_h);
            let canvas_rect = egui::Rect::from_min_max(screen_p0, screen_p1);

            // Sombra y papel
            let shadow_rect = canvas_rect.expand(6.0 * self.viewport.zoom.min(2.0));
            painter.rect_filled(shadow_rect, 4.0, egui::Color32::from_black_alpha(100));

            // Renderizar la textura de la composición
            if self.needs_composite || self.canvas_texture.is_none() {
                self.update_canvas_texture(ctx);
            }

            if let Some(tex) = &self.canvas_texture {
                painter.image(
                    tex.id(),
                    canvas_rect,
                    egui::Rect::from_min_max(egui::pos2(0.0, 0.0), egui::pos2(1.0, 1.0)),
                    egui::Color32::WHITE,
                );
            }

            // Borde sutil del lienzo
            painter.rect_stroke(
                canvas_rect,
                0.0,
                egui::Stroke::new(1.0_f32, egui::Color32::from_rgb(70, 75, 85)),
                egui::StrokeKind::Outside,
            );

            // Cursor circular dinámico con diámetro real del pincel en coordenadas de pantalla
            if let Some(hover_pos) = response.hover_pos() {
                if canvas_rect.contains(hover_pos) && (self.tool_mode == ToolMode::Brush || self.tool_mode == ToolMode::Eraser) {
                    let radius_screen = (self.brush_settings.size * 0.5) * self.viewport.zoom;
                    let cursor_color = if self.tool_mode == ToolMode::Eraser {
                        egui::Color32::from_rgb(244, 63, 94)
                    } else {
                        egui::Color32::from_rgba_unmultiplied(255, 255, 255, 200)
                    };
                    painter.circle_stroke(hover_pos, radius_screen, egui::Stroke::new(1.2_f32, cursor_color));
                }
            }

            // Detección de presión de lápiz / stylus en eventos
            let mut raw_pressure = 1.0f32;
            let mut is_pen = false;
            ctx.input(|i| {
                for ev in &i.events {
                    if let egui::Event::Touch { force: Some(f), .. } = ev {
                        raw_pressure = *f;
                        is_pen = true;
                    }
                }
            });

            let dw = self.doc_width;
            let dh = self.doc_height;
            let cur_frame_id = self.current_frame;

            // --- Interacción de Dibujo / Borrado / Cuentagotas ---
            if wants_pan {
                if response.dragged_by(egui::PointerButton::Primary) {
                    self.viewport.pan += response.drag_delta();
                }
            } else if response.drag_started_by(egui::PointerButton::Primary) {
                if self.tool_mode == ToolMode::Brush || self.tool_mode == ToolMode::Eraser {
                    self.push_undo_snapshot();
                    if let Some(screen_pos) = response.interact_pointer_pos() {
                        if let Some(doc_pos) = self.viewport.screen_to_doc(screen_pos, center, doc_w, doc_h) {
                            self.stroke_tracker.begin(doc_pos, raw_pressure);

                            let total_pixels = (dw * dh) as usize;
                            self.frames.entry(cur_frame_id).or_insert_with(|| vec![0u8; total_pixels * 4]);
                            let cur_buf = self.frames.get_mut(&cur_frame_id).unwrap();

                            let color = [
                                (self.brush_color[0] * 255.0) as u8,
                                (self.brush_color[1] * 255.0) as u8,
                                (self.brush_color[2] * 255.0) as u8,
                                255,
                            ];
                            let diam = self.brush_settings.evaluate_diameter(raw_pressure, 0.0);
                            let alpha = self.brush_settings.evaluate_alpha(raw_pressure);

                            brush::stamp_preset_dab(
                                cur_buf,
                                dw,
                                dh,
                                doc_pos.x,
                                doc_pos.y,
                                diam,
                                alpha,
                                color,
                                self.brush_settings.preset,
                            );
                            self.needs_composite = true;
                        }
                    }
                }
            }

            if !wants_pan && (response.dragged_by(egui::PointerButton::Primary) || response.clicked_by(egui::PointerButton::Primary)) {
                if let Some(screen_pos) = response.interact_pointer_pos() {
                    if let Some(doc_pos) = self.viewport.screen_to_doc(screen_pos, center, doc_w, doc_h) {
                        match self.tool_mode {
                            ToolMode::Brush | ToolMode::Eraser => {
                                let stab = self.brush_settings.stabilization;
                                let emitted_count = self.stroke_tracker.stabilizer.add_raw_point(
                                    doc_pos.x,
                                    doc_pos.y,
                                    raw_pressure,
                                    stab,
                                    is_pen,
                                );

                                if emitted_count > 0 {
                                    let total_len = self.stroke_tracker.stabilizer.get_emitted_len();
                                    let ptr = self.stroke_tracker.stabilizer.get_emitted_ptr();
                                    let points = unsafe { std::slice::from_raw_parts(ptr, total_len) };

                                    let color = [
                                        (self.brush_color[0] * 255.0) as u8,
                                        (self.brush_color[1] * 255.0) as u8,
                                        (self.brush_color[2] * 255.0) as u8,
                                        255,
                                    ];

                                    let total_pixels = (dw * dh) as usize;
                                    self.frames.entry(cur_frame_id).or_insert_with(|| vec![0u8; total_pixels * 4]);

                                    let cur_buf = self.frames.get_mut(&cur_frame_id).unwrap();
                                    let tracker = &mut self.stroke_tracker;
                                    let settings = &self.brush_settings;

                                    for i in 0..emitted_count {
                                        let next_pt = egui::pos2(points[i * 3], points[i * 3 + 1]);
                                        let next_p = points[i * 3 + 2];
                                        let last_pt = tracker.last_pos.unwrap_or(next_pt);
                                        let last_p = tracker.last_pressure;

                                        brush::stamp_stroke_segment_advanced(
                                            cur_buf,
                                            dw,
                                            dh,
                                            last_pt,
                                            next_pt,
                                            last_p,
                                            next_p,
                                            &mut tracker.stroke_distance,
                                            settings,
                                            color,
                                        );

                                        tracker.last_pos = Some(next_pt);
                                        tracker.last_pressure = next_p;
                                    }

                                    self.needs_composite = true;
                                    self.status_msg = format!("Trazo estabilizado en ({:.0}, {:.0}) px", doc_pos.x, doc_pos.y);
                                }
                            }
                            ToolMode::Eyedropper => {
                                if let Some(rgb) = brush::sample_color_at(
                                    &self.composite_buffer,
                                    self.doc_width,
                                    self.doc_height,
                                    doc_pos.x,
                                    doc_pos.y,
                                ) {
                                    self.brush_color = rgb;
                                    self.tool_mode = ToolMode::Brush;
                                    self.status_msg = format!("Color seleccionado: RGB({:.2}, {:.2}, {:.2})", rgb[0], rgb[1], rgb[2]);
                                }
                            }
                            ToolMode::Pan => {}
                        }
                    }
                }
            }

            if response.drag_stopped() {
                if self.tool_mode == ToolMode::Brush || self.tool_mode == ToolMode::Eraser {
                    let tail_count = self.stroke_tracker.stabilizer.flush_tail();
                    if tail_count > 0 {
                        let total_len = self.stroke_tracker.stabilizer.get_emitted_len();
                        let ptr = self.stroke_tracker.stabilizer.get_emitted_ptr();
                        let points = unsafe { std::slice::from_raw_parts(ptr, total_len) };

                        let color = [
                            (self.brush_color[0] * 255.0) as u8,
                            (self.brush_color[1] * 255.0) as u8,
                            (self.brush_color[2] * 255.0) as u8,
                            255,
                        ];

                        let total_pixels = (dw * dh) as usize;
                        self.frames.entry(cur_frame_id).or_insert_with(|| vec![0u8; total_pixels * 4]);

                        let cur_buf = self.frames.get_mut(&cur_frame_id).unwrap();
                        let tracker = &mut self.stroke_tracker;
                        let settings = &self.brush_settings;

                        for i in 0..tail_count {
                            let next_pt = egui::pos2(points[i * 3], points[i * 3 + 1]);
                            let next_p = points[i * 3 + 2];
                            let last_pt = tracker.last_pos.unwrap_or(next_pt);
                            let last_p = tracker.last_pressure;

                            brush::stamp_stroke_segment_advanced(
                                cur_buf,
                                dw,
                                dh,
                                last_pt,
                                next_pt,
                                last_p,
                                next_p,
                                &mut tracker.stroke_distance,
                                settings,
                                color,
                            );

                            tracker.last_pos = Some(next_pt);
                            tracker.last_pressure = next_p;
                        }
                        self.needs_composite = true;
                    }
                }
                self.stroke_tracker.reset();
            }
        });
    }
}

fn main() -> eframe::Result<()> {
    let native_options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_title("Oniri Native Studio — egui + wgpu")
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
