use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
use std::path::Path;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NativeCanvasInfo {
    pub width: u32,
    pub height: u32,
    pub resolution: u32,
    pub root_folder_id: i64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NativeLayerInfo {
    pub id: i64,
    pub name: String,
    pub layer_type: i64,
    pub folder_id: i64,
    pub visible: bool,
    pub opacity: f32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NativeClipSummary {
    pub canvas: NativeCanvasInfo,
    pub layers: Vec<NativeLayerInfo>,
    pub preview_base64: Option<String>,
}

/// Localiza la cabecera SQLite ('SQLite format 3\0') dentro del contenedor binario .clip
pub fn find_sqlite_offset(data: &[u8]) -> Option<usize> {
    let needle = b"SQLite format 3\0";
    if data.len() < needle.len() {
        return None;
    }
    // Buscar primero hacia el principio (típico en archivos .clip)
    data.windows(needle.len()).position(|window| window == needle)
}

/// Extrae metadatos y vista previa del archivo .clip directamente en disco sin saturar la memoria web
pub fn parse_clip_file_native(file_path: &str) -> Result<NativeClipSummary, String> {
    let path = Path::new(file_path);
    if !path.exists() {
        return Err(format!("El archivo no existe: {}", file_path));
    }

    let mut file = File::open(path).map_err(|e| format!("Error abriendo archivo: {}", e))?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)
        .map_err(|e| format!("Error leyendo archivo: {}", e))?;

    let offset = find_sqlite_offset(&buffer)
        .ok_or_else(|| "El archivo .clip no contiene una base de datos SQLite válida".to_string())?;

    let sqlite_bytes = &buffer[offset..];

    // Crear archivo SQLite temporal para consulta nativa ultra-rápida sin lock de memoria
    let temp_dir = std::env::temp_dir();
    let temp_db_path = temp_dir.join(format!(
        "oniri_native_{}_{}.sqlite",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis()
    ));

    std::fs::write(&temp_db_path, sqlite_bytes)
        .map_err(|e| format!("Error escribiendo SQLite temporal: {}", e))?;

    let conn = Connection::open(&temp_db_path)
        .map_err(|e| format!("Error abriendo SQLite nativo: {}", e))?;

    // 1. Extraer dimensiones del lienzo
    let canvas_info = {
        let mut stmt = conn
            .prepare(
                "SELECT CanvasWidth, CanvasHeight, CanvasResolution, CanvasRootFolder FROM Canvas LIMIT 1",
            )
            .map_err(|e| format!("Error preparando consulta Canvas: {}", e))?;

        stmt.query_row([], |row| {
            let w: f64 = row.get(0).unwrap_or(1920.0);
            let h: f64 = row.get(1).unwrap_or(1080.0);
            let res: f64 = row.get(2).unwrap_or(300.0);
            let root: i64 = row.get(3).unwrap_or(2);
            Ok(NativeCanvasInfo {
                width: w as u32,
                height: h as u32,
                resolution: res as u32,
                root_folder_id: root,
            })
        })
        .unwrap_or(NativeCanvasInfo {
            width: 1920,
            height: 1080,
            resolution: 300,
            root_folder_id: 2,
        })
    };

    // 2. Extraer capas
    let layers: Vec<NativeLayerInfo> = {
        let mut layers_list = Vec::new();
        if let Ok(mut stmt) = conn.prepare(
            "SELECT MainId, LayerName, LayerType, LayerFolder, LayerVisibility, LayerOpacity FROM Layer",
        ) {
            if let Ok(rows) = stmt.query_map([], |row| {
                let id: i64 = row.get(0).unwrap_or(0);
                let name: String = row.get(1).unwrap_or_else(|_| "Capa".to_string());
                let l_type: i64 = row.get(2).unwrap_or(0);
                let folder: i64 = row.get(3).unwrap_or(0);
                let vis: i64 = row.get(4).unwrap_or(1);
                let op: f64 = row.get(5).unwrap_or(100.0);
                Ok(NativeLayerInfo {
                    id,
                    name,
                    layer_type: l_type,
                    folder_id: folder,
                    visible: vis != 0,
                    opacity: (op / 100.0) as f32,
                })
            }) {
                for l in rows.flatten() {
                    layers_list.push(l);
                }
            }
        }
        layers_list
    };

    // 3. Extraer vista previa PNG si existe
    let preview_base64 = {
        if let Ok(mut stmt) = conn.prepare("SELECT ImageData FROM CanvasPreview LIMIT 1") {
            let img_data: Result<Vec<u8>, _> = stmt.query_row([], |row| row.get(0));
            match img_data {
                Ok(bytes) => Some(format!("data:image/png;base64,{}", simple_base64_encode(&bytes))),
                Err(_) => None,
            }
        } else {
            None
        }
    };

    drop(conn);
    let _ = std::fs::remove_file(&temp_db_path);

    Ok(NativeClipSummary {
        canvas: canvas_info,
        layers,
        preview_base64,
    })
}

fn simple_base64_encode(data: &[u8]) -> String {
    const TABLE: &[u8; 64] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut out = String::with_capacity((data.len() + 2) / 3 * 4);
    for chunk in data.chunks(3) {
        let b0 = chunk[0] as usize;
        let b1 = if chunk.len() > 1 { chunk[1] as usize } else { 0 };
        let b2 = if chunk.len() > 2 { chunk[2] as usize } else { 0 };

        let triple = (b0 << 16) | (b1 << 8) | b2;

        out.push(TABLE[(triple >> 18) & 0x3F] as char);
        out.push(TABLE[(triple >> 12) & 0x3F] as char);
        if chunk.len() > 1 {
            out.push(TABLE[(triple >> 6) & 0x3F] as char);
        } else {
            out.push('=');
        }
        if chunk.len() > 2 {
            out.push(TABLE[triple & 0x3F] as char);
        } else {
            out.push('=');
        }
    }
    out
}
