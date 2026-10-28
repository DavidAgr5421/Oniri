#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod clip_native;
use clip_native::{parse_clip_file_native, NativeClipSummary};

#[tauri::command]
fn get_desktop_version() -> String {
    format!("Oniri Native Desktop Engine v{}", env!("CARGO_PKG_VERSION"))
}

#[tauri::command]
fn inspect_clip_file(file_path: String) -> Result<NativeClipSummary, String> {
    parse_clip_file_native(&file_path)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_desktop_version,
            inspect_clip_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
