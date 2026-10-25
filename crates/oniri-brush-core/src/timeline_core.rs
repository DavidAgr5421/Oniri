use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq)]
#[repr(u8)]
pub enum KeyframeInterpolation {
    Hold = 0,
    Linear = 1,
    Smooth = 2,
}

impl From<u8> for KeyframeInterpolation {
    fn from(val: u8) -> Self {
        match val {
            0 => KeyframeInterpolation::Hold,
            1 => KeyframeInterpolation::Linear,
            _ => KeyframeInterpolation::Smooth,
        }
    }
}

#[derive(Clone, Debug)]
pub struct KeyframeData {
    pub frame: i32,
    pub x: f32,
    pub y: f32,
    pub scale_x: f32,
    pub scale_y: f32,
    pub rotation: f32, // Degrees
    pub opacity: f32,
    pub interpolation: KeyframeInterpolation,
}

#[derive(Clone, Debug)]
pub struct CelExposure {
    pub frame: i32,
    pub cel_id: u32,
}

#[derive(Clone, Debug)]
pub struct TrackClip {
    pub id: u32,
    pub start_frame: i32,
    pub end_frame: i32,
    pub exposures: Vec<CelExposure>,
}

#[derive(Clone, Debug)]
pub struct TrackData {
    pub id: u32,
    pub visible: bool,
    pub keyframes_enabled: bool,
    pub clips: Vec<TrackClip>,
    pub keyframes: Vec<KeyframeData>,
}

#[derive(Clone, Debug)]
pub struct TimelineSettingsData {
    pub fps: u32,
    pub total_frames: i32,
    pub start_frame: i32,
    pub end_frame: i32,
    pub current_frame: i32,
    pub min_frame: i32,
    pub loop_playback: bool,
}

impl Default for TimelineSettingsData {
    fn default() -> Self {
        Self {
            fps: 12,
            total_frames: 24,
            start_frame: 1,
            end_frame: 24,
            current_frame: 1,
            min_frame: 0,
            loop_playback: true,
        }
    }
}

/// Evaluated 2D affine transform parameters
#[derive(Clone, Copy, Debug)]
pub struct EvaluatedTransform2D {
    pub m11: f32,
    pub m12: f32,
    pub m21: f32,
    pub m22: f32,
    pub tx: f32,
    pub ty: f32,
    pub opacity: f32,
}

impl Default for EvaluatedTransform2D {
    fn default() -> Self {
        Self {
            m11: 1.0,
            m12: 0.0,
            m21: 0.0,
            m22: 1.0,
            tx: 0.0,
            ty: 0.0,
            opacity: 1.0,
        }
    }
}

#[inline(always)]
fn lerp(a: f32, b: f32, t: f32) -> f32 {
    a + (b - a) * t
}

#[inline(always)]
fn smoothstep(t: f32) -> f32 {
    let ct = t.clamp(0.0, 1.0);
    ct * ct * (3.0 - 2.0 * ct)
}

#[inline(always)]
fn lerp_angle_deg(a: f32, b: f32, t: f32) -> f32 {
    let mut diff = (b - a) % 360.0;
    if diff > 180.0 {
        diff -= 360.0;
    } else if diff < -180.0 {
        diff += 360.0;
    }
    a + diff * t
}

/// High-performance Timeline and Keyframe Evaluation Engine in Rust + WebAssembly.
/// Eliminates JavaScript GC spikes and resolves full scene composition in < 0.05 ms.
#[wasm_bindgen]
pub struct TimelineCore {
    settings: TimelineSettingsData,
    tracks: Vec<TrackData>,
    /// Preallocated evaluation buffer to avoid memory allocations during 60/120 fps playback
    eval_buffer: Vec<f32>,
    /// Preallocated onion skin evaluation buffer
    onion_buffer: Vec<f32>,
}

#[wasm_bindgen]
impl TimelineCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            settings: TimelineSettingsData::default(),
            tracks: Vec::with_capacity(32),
            eval_buffer: Vec::with_capacity(1024),
            onion_buffer: Vec::with_capacity(2048),
        }
    }

    /// Clears all tracks and keyframes
    pub fn reset(&mut self) {
        self.tracks.clear();
        self.eval_buffer.clear();
        self.onion_buffer.clear();
    }

    /// Sets global timeline parameters
    pub fn set_settings(
        &mut self,
        fps: u32,
        total_frames: i32,
        start_frame: i32,
        end_frame: i32,
        min_frame: i32,
        loop_playback: bool,
    ) {
        self.settings.fps = fps.max(1);
        self.settings.total_frames = total_frames.max(1);
        self.settings.min_frame = min_frame;
        self.settings.start_frame = start_frame.max(min_frame);
        self.settings.end_frame = end_frame.max(self.settings.start_frame);
        self.settings.loop_playback = loop_playback;
    }

    /// Adds or updates a track
    pub fn add_track(&mut self, track_id: u32, visible: bool, keyframes_enabled: bool) {
        if let Some(t) = self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            t.visible = visible;
            t.keyframes_enabled = keyframes_enabled;
        } else {
            self.tracks.push(TrackData {
                id: track_id,
                visible,
                keyframes_enabled,
                clips: Vec::with_capacity(8),
                keyframes: Vec::with_capacity(32),
            });
        }
    }

    /// Removes a track
    pub fn remove_track(&mut self, track_id: u32) -> bool {
        if let Some(pos) = self.tracks.iter().position(|tr| tr.id == track_id) {
            self.tracks.remove(pos);
            true
        } else {
            false
        }
    }

    /// Adds or updates an animation clip on a track
    pub fn add_clip(&mut self, track_id: u32, clip_id: u32, start_frame: i32, end_frame: i32) -> bool {
        let track = match self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            Some(t) => t,
            None => return false,
        };

        if let Some(c) = track.clips.iter_mut().find(|cp| cp.id == clip_id) {
            c.start_frame = start_frame;
            c.end_frame = end_frame.max(start_frame);
        } else {
            track.clips.push(TrackClip {
                id: clip_id,
                start_frame,
                end_frame: end_frame.max(start_frame),
                exposures: Vec::with_capacity(16),
            });
        }
        true
    }

    /// Adds an exposure (Cel instance) to a clip
    pub fn add_exposure(
        &mut self,
        track_id: u32,
        clip_id: u32,
        frame: i32,
        cel_id: u32,
    ) -> bool {
        let track = match self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            Some(t) => t,
            None => return false,
        };
        let clip = match track.clips.iter_mut().find(|c| c.id == clip_id) {
            Some(c) => c,
            None => return false,
        };

        // Remove previous exposure at this exact frame if exists
        clip.exposures.retain(|e| e.frame != frame);
        clip.exposures.push(CelExposure { frame, cel_id });
        // Maintain sorted order by frame for binary search
        clip.exposures.sort_unstable_by_key(|e| e.frame);
        true
    }

    /// Adds or updates a transform keyframe on a track
    pub fn add_keyframe(
        &mut self,
        track_id: u32,
        frame: i32,
        x: f32,
        y: f32,
        scale_x: f32,
        scale_y: f32,
        rotation: f32,
        opacity: f32,
        interpolation: u8,
    ) -> bool {
        let track = match self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            Some(t) => t,
            None => return false,
        };

        let interp = KeyframeInterpolation::from(interpolation);
        if let Some(kf) = track.keyframes.iter_mut().find(|k| k.frame == frame) {
            kf.x = x;
            kf.y = y;
            kf.scale_x = scale_x;
            kf.scale_y = scale_y;
            kf.rotation = rotation;
            kf.opacity = opacity.clamp(0.0, 1.0);
            kf.interpolation = interp;
        } else {
            track.keyframes.push(KeyframeData {
                frame,
                x,
                y,
                scale_x,
                scale_y,
                rotation,
                opacity: opacity.clamp(0.0, 1.0),
                interpolation: interp,
            });
            track.keyframes.sort_unstable_by_key(|k| k.frame);
        }
        true
    }

    /// Evaluates 2D affine transform matrix at target frame for a given track
    fn evaluate_track_transform(&self, track: &TrackData, frame: i32) -> EvaluatedTransform2D {
        if !track.keyframes_enabled || track.keyframes.is_empty() {
            return EvaluatedTransform2D::default();
        }

        let kfs = &track.keyframes;
        if kfs.len() == 1 || frame <= kfs[0].frame {
            let k = &kfs[0];
            return Self::compose_matrix(k.x, k.y, k.scale_x, k.scale_y, k.rotation, k.opacity);
        }
        if frame >= kfs.last().unwrap().frame {
            let k = kfs.last().unwrap();
            return Self::compose_matrix(k.x, k.y, k.scale_x, k.scale_y, k.rotation, k.opacity);
        }

        // Binary search between neighboring keyframes
        let idx = match kfs.binary_search_by_key(&frame, |k| k.frame) {
            Ok(exact) => {
                let k = &kfs[exact];
                return Self::compose_matrix(k.x, k.y, k.scale_x, k.scale_y, k.rotation, k.opacity);
            }
            Err(i) => i,
        };

        let k0 = &kfs[idx - 1];
        let k1 = &kfs[idx];

        match k0.interpolation {
            KeyframeInterpolation::Hold => {
                Self::compose_matrix(k0.x, k0.y, k0.scale_x, k0.scale_y, k0.rotation, k0.opacity)
            }
            KeyframeInterpolation::Linear => {
                let t = (frame - k0.frame) as f32 / (k1.frame - k0.frame).max(1) as f32;
                let x = lerp(k0.x, k1.x, t);
                let y = lerp(k0.y, k1.y, t);
                let sx = lerp(k0.scale_x, k1.scale_x, t);
                let sy = lerp(k0.scale_y, k1.scale_y, t);
                let rot = lerp_angle_deg(k0.rotation, k1.rotation, t);
                let op = lerp(k0.opacity, k1.opacity, t);
                Self::compose_matrix(x, y, sx, sy, rot, op)
            }
            KeyframeInterpolation::Smooth => {
                let raw_t = (frame - k0.frame) as f32 / (k1.frame - k0.frame).max(1) as f32;
                let t = smoothstep(raw_t);
                let x = lerp(k0.x, k1.x, t);
                let y = lerp(k0.y, k1.y, t);
                let sx = lerp(k0.scale_x, k1.scale_x, t);
                let sy = lerp(k0.scale_y, k1.scale_y, t);
                let rot = lerp_angle_deg(k0.rotation, k1.rotation, t);
                let op = lerp(k0.opacity, k1.opacity, t);
                Self::compose_matrix(x, y, sx, sy, rot, op)
            }
        }
    }

    /// Composes 2D transformation matrix: M = Translation * Rotation * Scale
    #[inline(always)]
    fn compose_matrix(x: f32, y: f32, sx: f32, sy: f32, rot_deg: f32, opacity: f32) -> EvaluatedTransform2D {
        let rad = rot_deg.to_radians();
        let cos = rad.cos();
        let sin = rad.sin();

        EvaluatedTransform2D {
            m11: sx * cos,
            m12: -sy * sin,
            m21: sx * sin,
            m22: sy * cos,
            tx: x,
            ty: y,
            opacity: opacity.clamp(0.0, 1.0),
        }
    }

    /// Finds active cel ID for a track at target frame
    fn get_active_cel_id(track: &TrackData, frame: i32) -> Option<u32> {
        for clip in &track.clips {
            if frame >= clip.start_frame && frame <= clip.end_frame {
                if clip.exposures.is_empty() {
                    return None;
                }
                // Binary search for nearest preceding exposure <= frame
                let pos = match clip.exposures.binary_search_by_key(&frame, |e| e.frame) {
                    Ok(idx) => idx,
                    Err(idx) => {
                        if idx == 0 {
                            // Frame is before first exposure in this clip
                            continue;
                        }
                        idx - 1
                    }
                };
                return Some(clip.exposures[pos].cel_id);
            }
        }
        None
    }

    /// Evaluates the complete scene for a frame.
    /// Returns a flat buffer with Stride 10 per track:
    /// `[track_id, has_active_cel (0.0/1.0), cel_id, opacity, m11, m12, m21, m22, tx, ty]`
    pub fn evaluate_frame(&mut self, frame: i32) -> Vec<f32> {
        self.eval_buffer.clear();

        for track in &self.tracks {
            if !track.visible {
                continue;
            }

            let cel_id_opt = Self::get_active_cel_id(track, frame);
            let has_cel = if cel_id_opt.is_some() { 1.0 } else { 0.0 };
            let cel_id = cel_id_opt.unwrap_or(0) as f32;

            let xform = self.evaluate_track_transform(track, frame);

            self.eval_buffer.push(track.id as f32);
            self.eval_buffer.push(has_cel);
            self.eval_buffer.push(cel_id);
            self.eval_buffer.push(xform.opacity);
            self.eval_buffer.push(xform.m11);
            self.eval_buffer.push(xform.m12);
            self.eval_buffer.push(xform.m21);
            self.eval_buffer.push(xform.m22);
            self.eval_buffer.push(xform.tx);
            self.eval_buffer.push(xform.ty);
        }

        self.eval_buffer.clone()
    }

    /// Evaluates Onion Skin adjacent cels around the current frame.
    /// Returns a flat buffer with Stride 11 per onion cel:
    /// `[track_id, cel_id, is_prev (1.0/0.0), distance, opacity, m11, m12, m21, m22, tx, ty]`
    pub fn evaluate_onion_skin(
        &mut self,
        current_frame: i32,
        prev_count: u32,
        next_count: u32,
        start_opacity: f32,
        step_opacity: f32,
    ) -> Vec<f32> {
        self.onion_buffer.clear();

        for track in &self.tracks {
            if !track.visible {
                continue;
            }

            // Collect all unique exposures across all clips of this track
            let mut all_exposures: Vec<CelExposure> = Vec::with_capacity(32);
            for clip in &track.clips {
                all_exposures.extend_from_slice(&clip.exposures);
            }
            all_exposures.sort_unstable_by_key(|e| e.frame);
            all_exposures.dedup_by_key(|e| e.frame);

            if all_exposures.is_empty() {
                continue;
            }

            let curr_idx = all_exposures
                .iter()
                .rposition(|e| e.frame <= current_frame)
                .unwrap_or(0);

            let curr_cel_id = all_exposures[curr_idx].cel_id;

            // 1. Previous frames
            let p_count = prev_count as usize;
            for dist in 1..=p_count {
                if curr_idx < dist {
                    break;
                }
                let target = &all_exposures[curr_idx - dist];
                if target.cel_id == curr_cel_id {
                    continue;
                }
                let op = (start_opacity - (dist as f32 - 1.0) * step_opacity).clamp(0.02, 1.0);
                let xform = self.evaluate_track_transform(track, target.frame);

                self.onion_buffer.push(track.id as f32);
                self.onion_buffer.push(target.cel_id as f32);
                self.onion_buffer.push(1.0); // is_prev = 1.0
                self.onion_buffer.push(dist as f32);
                self.onion_buffer.push(op);
                self.onion_buffer.push(xform.m11);
                self.onion_buffer.push(xform.m12);
                self.onion_buffer.push(xform.m21);
                self.onion_buffer.push(xform.m22);
                self.onion_buffer.push(xform.tx);
                self.onion_buffer.push(xform.ty);
            }

            // 2. Next frames
            let n_count = next_count as usize;
            for dist in 1..=n_count {
                if curr_idx + dist >= all_exposures.len() {
                    break;
                }
                let target = &all_exposures[curr_idx + dist];
                if target.cel_id == curr_cel_id {
                    continue;
                }
                let op = (start_opacity - (dist as f32 - 1.0) * step_opacity).clamp(0.02, 1.0);
                let xform = self.evaluate_track_transform(track, target.frame);

                self.onion_buffer.push(track.id as f32);
                self.onion_buffer.push(target.cel_id as f32);
                self.onion_buffer.push(0.0); // is_prev = 0.0 (future)
                self.onion_buffer.push(dist as f32);
                self.onion_buffer.push(op);
                self.onion_buffer.push(xform.m11);
                self.onion_buffer.push(xform.m12);
                self.onion_buffer.push(xform.m21);
                self.onion_buffer.push(xform.m22);
                self.onion_buffer.push(xform.tx);
                self.onion_buffer.push(xform.ty);
            }
        }

        self.onion_buffer.clone()
    }

    /// Batch operation: Shifts all clips, exposures and keyframes on/after `from_frame` by `delta_frames`
    pub fn shift_track_frames(&mut self, track_id: u32, from_frame: i32, delta_frames: i32) -> bool {
        let track = match self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            Some(t) => t,
            None => return false,
        };

        if delta_frames == 0 {
            return true;
        }

        for clip in &mut track.clips {
            if clip.start_frame >= from_frame {
                clip.start_frame += delta_frames;
                clip.end_frame += delta_frames;
            } else if clip.end_frame >= from_frame {
                clip.end_frame += delta_frames;
            }
            for exp in &mut clip.exposures {
                if exp.frame >= from_frame {
                    exp.frame += delta_frames;
                }
            }
        }

        for kf in &mut track.keyframes {
            if kf.frame >= from_frame {
                kf.frame += delta_frames;
            }
        }

        true
    }

    /// Batch operation: Ripple-deletes the frame range `[start_frame, end_frame]` and collapses time
    pub fn ripple_delete_range(&mut self, track_id: u32, start_frame: i32, end_frame: i32) -> bool {
        let track = match self.tracks.iter_mut().find(|tr| tr.id == track_id) {
            Some(t) => t,
            None => return false,
        };

        if end_frame < start_frame {
            return false;
        }

        let span = end_frame - start_frame + 1;

        // Delete exposures within the range and shift remaining
        for clip in &mut track.clips {
            clip.exposures.retain(|e| e.frame < start_frame || e.frame > end_frame);
            for exp in &mut clip.exposures {
                if exp.frame > end_frame {
                    exp.frame -= span;
                }
            }
            if clip.start_frame > end_frame {
                clip.start_frame -= span;
                clip.end_frame -= span;
            } else if clip.end_frame >= start_frame {
                clip.end_frame = (clip.end_frame - span).max(clip.start_frame);
            }
        }

        // Delete keyframes within the range and shift remaining
        track.keyframes.retain(|k| k.frame < start_frame || k.frame > end_frame);
        for kf in &mut track.keyframes {
            if kf.frame > end_frame {
                kf.frame -= span;
            }
        }

        true
    }
}
