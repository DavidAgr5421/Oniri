#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_desktop_version() -> String {
    format!("Oniri Native Desktop Engine v{}", env!("CARGO_PKG_VERSION"))
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_desktop_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
