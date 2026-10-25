use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq)]
#[repr(u8)]
pub enum RulerType {
    None = 0,
    Symmetry = 1,
    Perspective1 = 2,
    Perspective2 = 3,
    Perspective3 = 4,
    RadialSpeedline = 5,
    ParallelSpeedline = 6,
}

impl From<u8> for RulerType {
    fn from(val: u8) -> Self {
        match val {
            1 => RulerType::Symmetry,
            2 => RulerType::Perspective1,
            3 => RulerType::Perspective2,
            4 => RulerType::Perspective3,
            5 => RulerType::RadialSpeedline,
            6 => RulerType::ParallelSpeedline,
            _ => RulerType::None,
        }
    }
}

/// Perspective Vanishing Point definition
#[derive(Clone, Copy, Debug)]
pub struct VanishingPoint {
    pub x: f32,
    pub y: f32,
}

/// Projection ray definition
#[derive(Clone, Copy, Debug)]
pub struct SnapRay {
    pub ox: f32,
    pub oy: f32,
    pub dx: f32, // Normalized direction
    pub dy: f32,
}

#[inline(always)]
fn normalize(dx: f32, dy: f32) -> (f32, f32) {
    let len = dx.hypot(dy);
    if len < 1e-6 {
        (1.0, 0.0)
    } else {
        (dx / len, dy / len)
    }
}

#[inline(always)]
fn dot(ax: f32, ay: f32, bx: f32, by: f32) -> f32 {
    ax * bx + ay * by
}

#[inline(always)]
fn project_on_line(px: f32, py: f32, ox: f32, oy: f32, dx: f32, dy: f32) -> (f32, f32) {
    let t = (px - ox) * dx + (py - oy) * dy;
    (ox + t * dx, oy + t * dy)
}

/// High-performance Ruler and Perspective Engine in Rust + WebAssembly.
/// Provides real-time magnetic stroke snapping, 1/2/3-point perspective guides,
/// bilateral & radial symmetry reflection, and manga action speedlines.
#[wasm_bindgen]
pub struct RulerCore {
    ruler_type: RulerType,
    snap_enabled: boolean_t,
    // Symmetry settings
    sym_center_x: f32,
    sym_center_y: f32,
    sym_angle_deg: f32,
    sym_axes: u32,
    sym_is_mirror: bool,
    // Perspective settings
    vp1: VanishingPoint,
    vp2: VanishingPoint,
    vp3: VanishingPoint,
    horizon_y: f32,
    // Radial speedline settings
    radial_center_x: f32,
    radial_center_y: f32,
    parallel_angle_deg: f32,
    // Active stroke snap lock state
    locked_ray: Option<SnapRay>,
    is_stroke_locked: bool,
    // Output buffer for symmetric coordinates
    sym_points_buffer: Vec<f32>,
}

type boolean_t = bool;

#[wasm_bindgen]
impl RulerCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            ruler_type: RulerType::None,
            snap_enabled: true,
            sym_center_x: 800.0,
            sym_center_y: 600.0,
            sym_angle_deg: 0.0,
            sym_axes: 2,
            sym_is_mirror: true,
            vp1: VanishingPoint { x: -400.0, y: 600.0 },
            vp2: VanishingPoint { x: 2000.0, y: 600.0 },
            vp3: VanishingPoint { x: 800.0, y: 2400.0 },
            horizon_y: 600.0,
            radial_center_x: 800.0,
            radial_center_y: 600.0,
            parallel_angle_deg: 0.0,
            locked_ray: None,
            is_stroke_locked: false,
            sym_points_buffer: Vec::with_capacity(32),
        }
    }

    /// Sets active ruler type (0: None, 1: Symmetry, 2: Persp1, 3: Persp2, 4: Persp3, 5: Radial, 6: Parallel)
    pub fn set_ruler_type(&mut self, ruler_type: u8) {
        self.ruler_type = RulerType::from(ruler_type);
        self.reset_stroke_lock();
    }

    /// Toggles or sets magnetic snapping to ruler
    pub fn set_snap_enabled(&mut self, enabled: bool) {
        self.snap_enabled = enabled;
        if !enabled {
            self.reset_stroke_lock();
        }
    }

    /// Configures symmetry ruler parameters
    pub fn set_symmetry_params(
        &mut self,
        center_x: f32,
        center_y: f32,
        angle_deg: f32,
        axes: u32,
        is_mirror: bool,
    ) {
        self.sym_center_x = center_x;
        self.sym_center_y = center_y;
        self.sym_angle_deg = angle_deg;
        self.sym_axes = axes.clamp(2, 16);
        self.sym_is_mirror = is_mirror;
    }

    /// Configures perspective vanishing points
    pub fn set_perspective_params(
        &mut self,
        vp1_x: f32,
        vp1_y: f32,
        vp2_x: f32,
        vp2_y: f32,
        vp3_x: f32,
        vp3_y: f32,
        horizon_y: f32,
    ) {
        self.vp1 = VanishingPoint { x: vp1_x, y: vp1_y };
        self.vp2 = VanishingPoint { x: vp2_x, y: vp2_y };
        self.vp3 = VanishingPoint { x: vp3_x, y: vp3_y };
        self.horizon_y = horizon_y;
    }

    /// Configures speedline radial / parallel center
    pub fn set_speedline_params(&mut self, center_x: f32, center_y: f32, angle_deg: f32) {
        self.radial_center_x = center_x;
        self.radial_center_y = center_y;
        self.parallel_angle_deg = angle_deg;
    }

    /// Resets the current stroke magnetic direction lock on pen lift
    pub fn reset_stroke_lock(&mut self) {
        self.locked_ray = None;
        self.is_stroke_locked = false;
    }

    /// Begins a new stroke at (start_x, start_y)
    pub fn begin_stroke(&mut self, _start_x: f32, _start_y: f32) {
        self.reset_stroke_lock();
    }

    /// Snaps current raw cursor position (cur_x, cur_y) to the active perspective or speedline guide.
    /// Returns a 2-element array [snapped_x, snapped_y].
    pub fn snap_point(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        if !self.snap_enabled {
            return vec![cur_x, cur_y];
        }

        match self.ruler_type {
            RulerType::None | RulerType::Symmetry => vec![cur_x, cur_y],
            RulerType::Perspective1 => self.snap_perspective_1(start_x, start_y, cur_x, cur_y),
            RulerType::Perspective2 => self.snap_perspective_2(start_x, start_y, cur_x, cur_y),
            RulerType::Perspective3 => self.snap_perspective_3(start_x, start_y, cur_x, cur_y),
            RulerType::RadialSpeedline => self.snap_radial_speedline(start_x, start_y, cur_x, cur_y),
            RulerType::ParallelSpeedline => self.snap_parallel_speedline(start_x, start_y, cur_x, cur_y),
        }
    }

    /// Perspective 1 Point of View: Rays to VP1, perfect horizontal lines, and perfect vertical lines
    fn snap_perspective_1(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        if let Some(ray) = self.locked_ray {
            let (px, py) = project_on_line(cur_x, cur_y, ray.ox, ray.oy, ray.dx, ray.dy);
            return vec![px, py];
        }

        let dx = cur_x - start_x;
        let dy = cur_y - start_y;
        let dist = dx.hypot(dy);
        if dist < 2.5 {
            return vec![cur_x, cur_y];
        }

        let (ndx, ndy) = normalize(dx, dy);

        // Candidate 1: Ray to VP1
        let (vp1_dx, vp1_dy) = normalize(self.vp1.x - start_x, self.vp1.y - start_y);
        let dot_vp1 = dot(ndx, ndy, vp1_dx, vp1_dy).abs();

        // Candidate 2: Horizontal
        let dot_horiz = ndx.abs();

        // Candidate 3: Vertical
        let dot_vert = ndy.abs();

        let chosen_ray = if dot_vp1 >= dot_horiz && dot_vp1 >= dot_vert {
            SnapRay { ox: start_x, oy: start_y, dx: vp1_dx, dy: vp1_dy }
        } else if dot_horiz >= dot_vert {
            SnapRay { ox: start_x, oy: start_y, dx: 1.0, dy: 0.0 }
        } else {
            SnapRay { ox: start_x, oy: start_y, dx: 0.0, dy: 1.0 }
        };

        self.locked_ray = Some(chosen_ray);
        self.is_stroke_locked = true;

        let (px, py) = project_on_line(cur_x, cur_y, chosen_ray.ox, chosen_ray.oy, chosen_ray.dx, chosen_ray.dy);
        vec![px, py]
    }

    /// Perspective 2 Points of View: Rays to VP1, rays to VP2, and vertical lines
    fn snap_perspective_2(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        if let Some(ray) = self.locked_ray {
            let (px, py) = project_on_line(cur_x, cur_y, ray.ox, ray.oy, ray.dx, ray.dy);
            return vec![px, py];
        }

        let dx = cur_x - start_x;
        let dy = cur_y - start_y;
        let dist = dx.hypot(dy);
        if dist < 2.5 {
            return vec![cur_x, cur_y];
        }

        let (ndx, ndy) = normalize(dx, dy);

        // Candidate 1: Ray to VP1 (Left vanishing point)
        let (vp1_dx, vp1_dy) = normalize(self.vp1.x - start_x, self.vp1.y - start_y);
        let dot_vp1 = dot(ndx, ndy, vp1_dx, vp1_dy).abs();

        // Candidate 2: Ray to VP2 (Right vanishing point)
        let (vp2_dx, vp2_dy) = normalize(self.vp2.x - start_x, self.vp2.y - start_y);
        let dot_vp2 = dot(ndx, ndy, vp2_dx, vp2_dy).abs();

        // Candidate 3: Vertical lines
        let dot_vert = ndy.abs();

        let chosen_ray = if dot_vp1 >= dot_vp2 && dot_vp1 >= dot_vert {
            SnapRay { ox: start_x, oy: start_y, dx: vp1_dx, dy: vp1_dy }
        } else if dot_vp2 >= dot_vert {
            SnapRay { ox: start_x, oy: start_y, dx: vp2_dx, dy: vp2_dy }
        } else {
            SnapRay { ox: start_x, oy: start_y, dx: 0.0, dy: 1.0 }
        };

        self.locked_ray = Some(chosen_ray);
        self.is_stroke_locked = true;

        let (px, py) = project_on_line(cur_x, cur_y, chosen_ray.ox, chosen_ray.oy, chosen_ray.dx, chosen_ray.dy);
        vec![px, py]
    }

    /// Perspective 3 Points of View: Rays to VP1, VP2, and VP3 (high angle / bird's-eye or low angle / worm's-eye)
    fn snap_perspective_3(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        if let Some(ray) = self.locked_ray {
            let (px, py) = project_on_line(cur_x, cur_y, ray.ox, ray.oy, ray.dx, ray.dy);
            return vec![px, py];
        }

        let dx = cur_x - start_x;
        let dy = cur_y - start_y;
        let dist = dx.hypot(dy);
        if dist < 2.5 {
            return vec![cur_x, cur_y];
        }

        let (ndx, ndy) = normalize(dx, dy);

        let (vp1_dx, vp1_dy) = normalize(self.vp1.x - start_x, self.vp1.y - start_y);
        let dot_vp1 = dot(ndx, ndy, vp1_dx, vp1_dy).abs();

        let (vp2_dx, vp2_dy) = normalize(self.vp2.x - start_x, self.vp2.y - start_y);
        let dot_vp2 = dot(ndx, ndy, vp2_dx, vp2_dy).abs();

        let (vp3_dx, vp3_dy) = normalize(self.vp3.x - start_x, self.vp3.y - start_y);
        let dot_vp3 = dot(ndx, ndy, vp3_dx, vp3_dy).abs();

        let chosen_ray = if dot_vp1 >= dot_vp2 && dot_vp1 >= dot_vp3 {
            SnapRay { ox: start_x, oy: start_y, dx: vp1_dx, dy: vp1_dy }
        } else if dot_vp2 >= dot_vp3 {
            SnapRay { ox: start_x, oy: start_y, dx: vp2_dx, dy: vp2_dy }
        } else {
            SnapRay { ox: start_x, oy: start_y, dx: vp3_dx, dy: vp3_dy }
        };

        self.locked_ray = Some(chosen_ray);
        self.is_stroke_locked = true;

        let (px, py) = project_on_line(cur_x, cur_y, chosen_ray.ox, chosen_ray.oy, chosen_ray.dx, chosen_ray.dy);
        vec![px, py]
    }

    /// Radial Speedlines (Impact focus burst): Proportional ray from focus point through stroke start
    fn snap_radial_speedline(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        let (dx, dy) = normalize(start_x - self.radial_center_x, start_y - self.radial_center_y);
        let (px, py) = project_on_line(cur_x, cur_y, self.radial_center_x, self.radial_center_y, dx, dy);
        vec![px, py]
    }

    /// Parallel Speedlines (Linear manga speedlines): Fixed angle line
    fn snap_parallel_speedline(&mut self, start_x: f32, start_y: f32, cur_x: f32, cur_y: f32) -> Vec<f32> {
        let rad = self.parallel_angle_deg.to_radians();
        let dx = rad.cos();
        let dy = rad.sin();
        let (px, py) = project_on_line(cur_x, cur_y, start_x, start_y, dx, dy);
        vec![px, py]
    }

    /// Generates symmetric reflected/rotated points for a point (x, y) based on active symmetry configuration.
    /// Returns a flat buffer of pairs: [x0, y0, x1, y1, ...]
    pub fn get_symmetric_points(&mut self, x: f32, y: f32) -> Vec<f32> {
        self.sym_points_buffer.clear();

        if self.ruler_type != RulerType::Symmetry {
            self.sym_points_buffer.push(x);
            self.sym_points_buffer.push(y);
            return self.sym_points_buffer.clone();
        }

        let cx = self.sym_center_x;
        let cy = self.sym_center_y;
        let base_angle = self.sym_angle_deg.to_radians();
        let axes = self.sym_axes.clamp(2, 16);

        let rx = x - cx;
        let ry = y - cy;

        if self.sym_is_mirror {
            // Bilateral or multi-axis mirror reflection
            let wedge = std::f32::consts::PI * 2.0 / (axes as f32);

            for i in 0..axes {
                let axis_angle = base_angle + (i as f32) * (wedge / 2.0);
                let cos2 = (2.0 * axis_angle).cos();
                let sin2 = (2.0 * axis_angle).sin();

                if i == 0 {
                    // Original point
                    self.sym_points_buffer.push(x);
                    self.sym_points_buffer.push(y);
                } else if i % 2 == 1 {
                    // Mirror reflection
                    let mx = cx + rx * cos2 + ry * sin2;
                    let my = cy + rx * sin2 - ry * cos2;
                    self.sym_points_buffer.push(mx);
                    self.sym_points_buffer.push(my);
                } else {
                    // Rotated partner
                    let rot = (i as f32) * (wedge / 2.0);
                    let cos_r = rot.cos();
                    let sin_r = rot.sin();
                    let rot_x = cx + rx * cos_r - ry * sin_r;
                    let rot_y = cy + rx * sin_r + ry * cos_r;
                    self.sym_points_buffer.push(rot_x);
                    self.sym_points_buffer.push(rot_y);
                }
            }
        } else {
            // Pure rotational symmetry (radial mandala / star)
            let step = std::f32::consts::PI * 2.0 / (axes as f32);
            for i in 0..axes {
                let rot = base_angle + (i as f32) * step;
                let cos_r = rot.cos();
                let sin_r = rot.sin();
                let rot_x = cx + rx * cos_r - ry * sin_r;
                let rot_y = cy + rx * sin_r + ry * cos_r;
                self.sym_points_buffer.push(rot_x);
                self.sym_points_buffer.push(rot_y);
            }
        }

        self.sym_points_buffer.clone()
    }
}
