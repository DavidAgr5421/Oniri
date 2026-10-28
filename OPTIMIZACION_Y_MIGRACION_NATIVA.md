# Hoja de Ruta Arquitectónica: Migración a Rust Nativo Puro con `egui` + `wgpu`

> **Documento Estratégico y Plan Maestro de Reingeniería**  
> *Inspirado en la arquitectura de alto rendimiento de VectorCraft y el ecosistema ArtCraft.*  
> *Fecha: 28 de Octubre de 2026*  
> *Meta: Reemplazar el frontend web/DOM por una interfaz nativa inmediata con `egui` y renderizado directo en GPU con `wgpu`, logrando 120 FPS sostenidos y 0 ms de latencia.*

---

## 1. Motivación y Decisión de Diseño

Tras analizar el funcionamiento interno de **VectorCraft** (renderizado SIMD multihilo, 20,000 figuras en 27 ms, interfaz a 120 FPS sin pausas de GC ni DOM), se concluye que **el cuello de botella fundamental de Oniri no es el motor de trazo en Rust (`oniri-brush-core`), sino la capa intermedia de navegador (Chromium / WebView2, DOM de HTML5 y Canvas2D/Three.js)**.

### ¿Por qué `egui` + `wgpu` es superior a WebView2 / HTML / Three.js?

| Dimensión | Arquitectura Anterior (Tauri + WebView2 + HTML) | Nueva Arquitectura Nativa (`egui` + `wgpu`) |
|---|---|---|
| **Motor de UI** | DOM de HTML/CSS (pesado, reflows con cientos de cels) | **Modo Inmediato (`egui`)**: 0 nodos DOM, renderizado en 1 ms en GPU |
| **Pipeline de Lienzo** | Canvas2D Skia ➔ IPC Bridge ➔ Three.js `texImage2D` | **Directo a GPU con `wgpu`** (DirectX 12 / Vulkan / Metal) |
| **Consumo de Memoria** | ~350 MB a 2 GB (Chromium Process + V8 Heap) | **~35 MB a 80 MB** (memoria contigua y predecible) |
| **Pausas de GC** | Frecuentes pausas de V8 (micro-stuttering al dibujar) | **0 pausas de recolección de basura** (propiedad de memoria en Rust) |
| **Muestreo de Lápiz** | Limitado al despachador de eventos web | **Eventos de tableta nativos (`winit`)** a 240+ Hz con presión y tilt |
| **Tamaño del Binario** | ~180-240 MB con WebView2 | **~15-25 MB** ejecutable autónomo sin dependencias externas |
| **Soporte Web** | WebAssembly + TS manual | **`eframe` Web**: compila a WebAssembly / WebGPU con el mismo código |

---

## 2. Diagrama de la Nueva Arquitectura

```mermaid
flowchart TD
    subgraph Input["Entrada de Hardware (240+ Hz)"]
        Pen["Lápiz Óptico / Wacom / Surface (Presión + Inclinación)"] --> WINIT["winit Window & Event Loop"]
    end

    subgraph Core["Núcleo Nativo Oniri (Rust)"]
        WINIT --> STAB["StrokeStabilizerCore (Bézier + Kalmán)"]
        STAB --> DABS["Dab Engine & ColorBlendCore (SIMD)"]
        DABS --> TILES["SparseTileGrid (Teselas 256×256 en RAM)"]
        TILES --> COMP["FastLayerCompositor (Multihilo con rayon)"]
    end

    subgraph Graphics["Renderizado Acelerado por Hardware"]
        COMP --> WGPU_TEX["Texturas de Capa en wgpu"]
        WGPU_TEX --> SHADERS["Shaders de Lienzo (Zoom, Rotación, Simetría)"]
        SHADERS --> SWAP["DirectX 12 / Vulkan SwapChain"]
    end

    subgraph UI["Interfaz de Modo Inmediato"]
        WINIT --> EGUI["egui UI Loop (120 FPS)"]
        EGUI --> TIMELINE["Timeline Widget Nativo (Virtualización Total)"]
        EGUI --> PANELS["Herramientas, Capas, Ruedas de Color (craft-ui Docking)"]
        TIMELINE --> SWAP
        PANELS --> SWAP
    end
```

---

## 3. Inventario de lo que ya tenemos en Rust (Reutilización del 80%)

No empezamos de cero. La lógica más compleja y crítica de Oniri ya reside en [`crates/oniri-brush-core`](file:///d:/Oniri/crates/oniri-brush-core) y funcionará de manera nativa e instantánea con `egui`:

1. **`SparseTileGrid`**: Almacenamiento eficiente de teselas (256×256) en RAM con cálculo de cajas delimitadoras (*content bounds*).
2. **`TimelineCore`**: Modelo de pistas, fotogramas clave, cels y exposiciones de animación.
3. **`FastLayerCompositor`**: Modos de fusión (*blend modes*) optimizados y mezcla de capas en CPU.
4. **`StrokeStabilizerCore`**: Estabilización de trazo, ventana deslizante y splines cúbicos.
5. **`ColorBlendCore` y `ColorSamplerCore`**: Mezcla de pigmentos y muestreo de color.
6. **`SmartFillCore` y `FloodFillCore`**: Relleno inteligente y cerrado de huecos.
7. **`BoneIKCore` y `BoneSkinCore`**: Deformación por huesos e IK de dos articulaciones.
8. **`HistoryCompressorCore`**: Compresión de historial de deshacer mediante formato QOI.
9. **`ClipTileCore`**: Decodificación de mosaicos y compatibilidad con Clip Studio Paint.

---

## 4. Componentes a Reemplazar

### 1. El Viewport (Lienzo de Dibujo)
* **Antes**: Three.js con `CanvasTexture` y `OrthographicCamera`, forzando subidas de 12 MB por frame.
* **Ahora**: Textura dinámica en `wgpu` renderizada mediante un shader de fragmentos. Las pinceladas actualizan exclusivamente las regiones sucias de las teselas (`wgpu::Queue::write_texture`), permitiendo dibujo sin latencia.

### 2. El Timeline de Animación
* **Antes**: Cientos de nodos HTML (`div.timeline-cel-block`) que causaban reflows masivos en Chromium durante el scrubbing o reproducción.
* **Ahora**: Un widget nativo de `egui` (`egui::Widget`). En modo inmediato, solo se dibujan los fotogramas y cels actualmente visibles en el área de recorte del panel (`clip_rect`). El arrastre en bloque de carpetas de animación es instantáneo (cero reflows).

### 3. Paletas de Herramientas, Capas y Propiedades
* **Antes**: Estructuras DOM con eventos de ratón sintéticos y CSS personalizado.
* **Ahora**: Paneles estándar de `egui` con soporte de pestañas desacoplables (*docking*) estilo `craft-ui` / `egui_dock`.

### 4. Gestor de Archivos y Proyectos
* **Antes**: Invocaciones complejas entre IPC web y `rusqlite`.
* **Ahora**: Streaming nativo y directo en disco usando hilos de Rust y `rfd` para cuadros de diálogo del sistema operativo.

---

## 5. Plan de Ejecución por Fases y Estado Actual

### ✅ Fase 1: Estructuración del Crate Nativo `oniri-desktop` (Completada)
1. Creado el workspace Cargo raíz y el crate `crates/oniri-desktop`:
   - `eframe = { version = "0.31", features = ["wgpu"] }`
   - `oniri-brush-core = { path = "../oniri-brush-core" }`
   - `rfd = "0.15"`, `image = "0.25"`, `serde`, `serde_json`.
   - Script npm agregado: `"desktop": "cargo run -p oniri-desktop"`.

### ✅ Fase 2: Implementación del Viewport Interactivo (Completada)
1. Implementado [`viewport.rs`](crates/oniri-desktop/src/viewport.rs):
   - Paneo 2D con botón central del ratón o Barra Espaciadora + arrastre.
   - Zoom suave centrado exactamente bajo la posición del cursor (5% a 6400%).
   - Transformaciones bidireccionales exactas `screen_to_doc` y `doc_to_screen`.
   - Autoencaje del documento a la ventana (`Ctrl+0`).

### ✅ Fase 3: Entrada de Lápiz, Pinceles Avanzados y Estabilización (Completada)
1. Implementado [`brush.rs`](crates/oniri-desktop/src/brush.rs):
   - Catálogo de 8 presets especializados: Plumilla G, Maru, Rugosa (Gasa-gasa), Caligráfico (Cincel 45°), Lápiz Grafito, Aerógrafo, Borrador Duro y Suave.
   - Integración nativa con `StrokeStabilizerCore` para eliminación del temblor de la mano y filtrado sub-píxel.
   - Curva de respuesta de presión con curvatura cónica (*toe*) para terminaciones en punta fina natural.
   - Rasterización directa SDF en memoria plana contigua (<0.2 ms por trazo).

### ✅ Fase 4: Widget del Timeline de Animación y Bucle a 120 FPS (Completada)
1. Línea de tiempo en modo inmediato sin nodos DOM:
   - Regla de frames virtualizada con marcas de cels dibujados.
   - Bucle de animación a FPS constante con reproducción continua en tiempo real.
   - Papel cebolla (*Onion Skin*) integrado en CPU tintado en carmesí (anterior) y azul (siguiente).
   - Historial Deshacer/Rehacer (`Ctrl+Z` / `Ctrl+Y`) por frame.

### 🟡 Fase 5: Paneles Avanzados de UI y Exportadores (En Progreso)
1. Panel de herramientas con selector de presets, paleta de color y sliders de dinámica.
2. Diálogos nativos de archivo vía `rfd` para abrir imágenes y exportar PNGs.
3. Siguiente: Exportador nativo de animación completa a GIF / secuencia PNG numerada.


---

## 6. Compatibilidad Dual y Salida Web
Al igual que VectorCraft cuenta con `vectorcraft-web`, Oniri mantendrá su capacidad de ejecutarse en navegadores web:
- `eframe` soporta compilación hacia WebAssembly con WebGL2/WebGPU de forma automática.
- Una sola base de código en Rust servirá para el binario nativo de escritorio (Windows, macOS, Linux) y la aplicación en navegador.
