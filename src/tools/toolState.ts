export type ToolId = 'pen' | 'brush' | 'eraser' | 'eyedropper' | 'bucket' | 'shape' | 'bone' | 'hand';
export type BoneToolMode = 'rig' | 'pose_fk' | 'pose_ik';
export type ShapeType = 'line' | 'rectangle' | 'ellipse';
export type ShapeFillMode = 'stroke' | 'fill';
export type TipShape = 'circle' | 'square' | 'calligraphic';
export type AntiAliasingLevel = 'none' | 'weak' | 'medium' | 'strong';
export type InkMode = 'uniform' | 'accumulate';

export interface BrushSettings {
  size: number;
  minSizeRatio: number;
  pressureSize: boolean;
  pressureCurve: number;
  opacity: number;
  flow: number;
  pressureFlow: boolean;
  inkMode: InkMode;
  hardness: number;
  antiAliasing: AntiAliasingLevel;
  spacing: number;
  tipShape: TipShape;
  tipRoundness: number;
  tipAngle: number;
  followDirection: boolean;
  taperStart: number;
  taperEnd: number;
  stabilization: number;
  tolerance: number;
  shapeType: ShapeType;
  shapeFill: ShapeFillMode;
  color: string;
}

export interface SubTool {
  id: string;
  name: string;
  tool: ToolId;
  description: string;
  settings: Partial<BrushSettings>;
  custom?: boolean;
}

export const SUBTOOLS: SubTool[] = [
  // Pen / Inking tools (P)
  {
    id: 'g-pen',
    name: 'Pluma G (G-Pen)',
    tool: 'pen',
    description: 'Trazo nítido y dinámico con alta respuesta a la presión.',
    settings: {
      size: 6,
      minSizeRatio: 0.0,
      pressureSize: true,
      pressureCurve: 1.35,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 8,
      taperEnd: 18,
      stabilization: 5,
    },
  },
  {
    id: 'real-g-pen',
    name: 'Pluma G Real',
    tool: 'pen',
    description: 'Textura analógica y leve sangrado para manga tradicional.',
    settings: {
      size: 5,
      minSizeRatio: 0.1,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.95,
      pressureFlow: true,
      inkMode: 'uniform',
      hardness: 0.85,
      antiAliasing: 'weak',
      spacing: 0.07,
      tipShape: 'circle',
      taperStart: 6,
      taperEnd: 14,
      stabilization: 4,
    },
  },
  {
    id: 'turnip-pen',
    name: 'Pluma Cuchara (Kabura)',
    tool: 'pen',
    description: 'Grosor consistente y líneas limpias para entintar detalles.',
    settings: {
      size: 4,
      minSizeRatio: 0.65,
      pressureSize: true,
      pressureCurve: 1.0,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 3,
      taperEnd: 8,
      stabilization: 6,
    },
  },
  {
    id: 'manga-line',
    name: 'manga line art',
    tool: 'pen',
    description: 'Inspirado en el legendario pincel todo-en-uno de CSP (怠けものブラシ): línea principal con presión fuerte, acuarela y pintura suave con presión ligera.',
    settings: {
      size: 8,
      minSizeRatio: 0.1,
      pressureSize: true,
      pressureCurve: 1.45,
      flow: 0.98,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.9,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 8,
      taperEnd: 18,
      stabilization: 7,
    },
  },
  {
    id: 'maru-pen',
    name: 'Pluma Maru (Redonda)',
    tool: 'pen',
    description: 'Plumilla fina de CSP para cabello, ojos y detalles delicados.',
    settings: {
      size: 3,
      minSizeRatio: 0.05,
      pressureSize: true,
      pressureCurve: 1.3,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 5,
      taperEnd: 12,
      stabilization: 5,
    },
  },
  {
    id: 'calligraphy-pen',
    name: 'Caligrafía',
    tool: 'pen',
    description: 'Punta biselada de grosor variable según el ángulo del trazo.',
    settings: {
      size: 14,
      minSizeRatio: 0.35,
      pressureSize: true,
      pressureCurve: 1.1,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.04,
      tipShape: 'calligraphic',
      tipRoundness: 0.25,
      tipAngle: 45,
      taperStart: 6,
      taperEnd: 14,
      stabilization: 6,
    },
  },
  {
    id: 'millipen',
    name: 'Marcador Millipen',
    tool: 'pen',
    description: 'Estilógrafo técnico de grosor uniforme sin variación por presión.',
    settings: {
      size: 5,
      minSizeRatio: 1.0,
      pressureSize: false,
      pressureCurve: 1.0,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 4,
    },
  },

  // Brush / Painting tools (B)
  {
    id: 'manga-line-art-brush',
    name: 'manga line art',
    tool: 'brush',
    description: 'Inspirado en el legendario pincel todo-en-uno de CSP (怠けものブラシ): trazo firme con presión fuerte, veladura y mezcla acuarela con presión ligera.',
    settings: {
      size: 14,
      minSizeRatio: 0.1,
      pressureSize: true,
      pressureCurve: 1.45,
      flow: 0.95,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.88,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 8,
      taperEnd: 18,
      stabilization: 7,
    },
  },
  {
    id: 'watercolor',
    name: 'Acuarela Suave',
    tool: 'brush',
    description: 'Bordes suaves translúcidos ideales para colorear y sombras.',
    settings: {
      size: 30,
      minSizeRatio: 0.5,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.45,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.35,
      antiAliasing: 'strong',
      spacing: 0.08,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 3,
    },
  },
  {
    id: 'thick-paint',
    name: 'Óleo / Pintura Densa',
    tool: 'brush',
    description: 'Pincelada corpórea con cobertura rápida y buena mezcla.',
    settings: {
      size: 26,
      minSizeRatio: 0.6,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.85,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.7,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },
  {
    id: 'airbrush',
    name: 'Aerógrafo Suave',
    tool: 'brush',
    description: 'Gradaciones difuminadas sin textura de borde evidente.',
    settings: {
      size: 60,
      minSizeRatio: 0.4,
      pressureSize: true,
      pressureCurve: 1.1,
      flow: 0.3,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.1,
      antiAliasing: 'strong',
      spacing: 0.04,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 1,
    },
  },
  {
    id: 'flat-brush',
    name: 'Pincel Plano',
    tool: 'brush',
    description: 'Puntas rectangulares para fondos arquitectónicos y ropa.',
    settings: {
      size: 22,
      minSizeRatio: 0.7,
      pressureSize: false,
      pressureCurve: 1.2,
      flow: 0.85,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.9,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'square',
      tipRoundness: 0.28,
      tipAngle: 35,
      followDirection: true,
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },
  {
    id: 'gouache-brush',
    name: 'Gouache Opaco',
    tool: 'brush',
    description: 'Cobertura mate de bordes definidos ideal para fondos de animación.',
    settings: {
      size: 32,
      minSizeRatio: 0.45,
      pressureSize: true,
      pressureCurve: 1.15,
      flow: 0.92,
      pressureFlow: true,
      inkMode: 'uniform',
      hardness: 0.85,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 2,
      taperEnd: 4,
      stabilization: 3,
    },
  },
  {
    id: 'airbrush-highlight',
    name: 'Aerógrafo de Brillo',
    tool: 'brush',
    description: 'Haz concentrado para luces especulares y atmósfera.',
    settings: {
      size: 42,
      minSizeRatio: 0.25,
      pressureSize: true,
      pressureCurve: 1.4,
      flow: 0.55,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.25,
      antiAliasing: 'strong',
      spacing: 0.04,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },

  // Eraser tools (E)
  {
    id: 'hard-eraser',
    name: 'Borrador Duro',
    tool: 'eraser',
    description: 'Eliminación 100% limpia sin halos difusos.',
    settings: {
      size: 24,
      minSizeRatio: 0.3,
      pressureSize: false,
      pressureCurve: 1.2,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 3,
    },
  },
  {
    id: 'soft-eraser',
    name: 'Borrador Suave',
    tool: 'eraser',
    description: 'Desvanecimiento gradual para degradados y luz.',
    settings: {
      size: 36,
      minSizeRatio: 0.5,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.6,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.25,
      antiAliasing: 'strong',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },
  {
    id: 'kneaded-eraser',
    name: 'Goma Maleable',
    tool: 'eraser',
    description: 'Baja opacidad para aclarar trazos suavemente.',
    settings: {
      size: 50,
      minSizeRatio: 0.6,
      pressureSize: true,
      pressureCurve: 1.1,
      flow: 0.3,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.4,
      antiAliasing: 'strong',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },

  // Shape tools (U)
  {
    id: 'straight-line',
    name: 'Línea Directa',
    tool: 'shape',
    description: 'Trazos rectos precisos entre dos puntos.',
    settings: { shapeType: 'line', shapeFill: 'stroke', size: 4 },
  },
  {
    id: 'rect',
    name: 'Rectángulo',
    tool: 'shape',
    description: 'Cajas delimitadoras y marcos ortogonales.',
    settings: { shapeType: 'rectangle', shapeFill: 'stroke', size: 4 },
  },
  {
    id: 'ellipse',
    name: 'Elipse / Círculo',
    tool: 'shape',
    description: 'Círculos y óvalos con o sin relleno.',
    settings: { shapeType: 'ellipse', shapeFill: 'stroke', size: 4 },
  },

  // Bucket tools (G)
  {
    id: 'bucket-layer',
    name: 'Capa de Edición',
    tool: 'bucket',
    description: 'Rellena respetando únicamente las líneas de la capa actual.',
    settings: { tolerance: 20 },
  },
  {
    id: 'bucket-all',
    name: 'Todas las Capas',
    tool: 'bucket',
    description: 'Rellena respetando la composición visible de todas las capas.',
    settings: { tolerance: 35 },
  },

  // Eyedropper (I)
  {
    id: 'eyedropper-pixel',
    name: 'Cuentagotas',
    tool: 'eyedropper',
    description: 'Muestrea el color exacto del píxel seleccionado.',
    settings: {},
  },

  // Hand (H)
  {
    id: 'hand-pan',
    name: 'Mover Lienzo',
    tool: 'hand',
    description: 'Desplaza el encuadre del lienzo sin alterarlo.',
    settings: {},
  },

  // Bone / 2D Rigging (J)
  {
    id: 'bone-rig',
    name: 'Crear / Editar Esqueleto (Rig)',
    tool: 'bone',
    description: 'Haz clic y arrastra en el lienzo para crear cadenas de huesos 2D o mover articulaciones en reposo.',
    settings: {},
  },
  {
    id: 'bone-pose-fk',
    name: 'Posar Huesos FK (Rotar / Mover)',
    tool: 'bone',
    description: 'Rota huesos individuales con cinemática directa (FK) y registra keyframes automáticamente.',
    settings: {},
  },
  {
    id: 'bone-pose-ik',
    name: 'Posar Cadena IK (Cinemática Inversa)',
    tool: 'bone',
    description: 'Arrastra la punta de una extremidad (mano/pie) para resolver el ángulo de articulación automáticamente con IK de 2 huesos.',
    settings: {},
  },
];

export type ColorTabId = 'picker' | 'rgb' | 'set' | 'harmony';
export type PreviewBgMode = 'paper' | 'checker' | 'dark';
export type BrushPropKey =
  | 'size'
  | 'opacity'
  | 'flow'
  | 'hardness'
  | 'stabilization'
  | 'pressureSize'
  | 'taper'
  | 'tipShape'
  | 'antiAliasing'
  | 'roundness'
  | 'angle'
  | 'spacing';

export interface ColorSet {
  id: string;
  name: string;
  colors: string[];
}

export interface ToolState {
  tool: ToolId;
  activeSubToolId: string;
  brush: BrushSettings;
  propertiesOpen: boolean;
  // Sub Tool Detail: which properties are pinned/visible in the main Tool Property panel (CSP Eye icon)
  visibleProperties: BrushPropKey[];
  previewBgMode: PreviewBgMode;
  // Bone Rigging & Animation state
  boneMode: BoneToolMode;
  showBonesOverlay: boolean;
  autoKeyBones: boolean;
  // Clip Studio Paint Color System
  colorTab: ColorTabId;
  primaryColor: string;
  secondaryColor: string;
  activeColorSlot: 'primary' | 'secondary';
  isTransparentColor: boolean;
  colorHistory: string[];
  colorSets: ColorSet[];
  activeColorSetId: string;
}

export const DEFAULT_BRUSH: BrushSettings = {
  size: 6,
  minSizeRatio: 0.15,
  pressureSize: true,
  pressureCurve: 1.2,
  opacity: 1,
  flow: 1,
  pressureFlow: false,
  inkMode: 'uniform',
  hardness: 1.0,
  antiAliasing: 'medium',
  spacing: 0.06,
  tipShape: 'circle',
  tipRoundness: 1,
  tipAngle: 0,
  followDirection: false,
  taperStart: 6,
  taperEnd: 12,
  stabilization: 5,
  tolerance: 20,
  shapeType: 'rectangle',
  shapeFill: 'stroke',
  color: '#000000',
};

const DEFAULT_HISTORY = [
  '#000000',
  '#ffffff',
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#2ecc71',
  '#1abc9c',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#7f8c8d',
  '#bdc3c7',
];

export const DEFAULT_COLOR_SETS: ColorSet[] = [
  {
    id: 'csp-standard',
    name: 'Conjunto Estándar CSP',
    colors: [
      '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
      '#e53935', '#fb8c00', '#fdd835', '#43a047', '#00acc1', '#1e88e5',
      '#3949ab', '#8e24aa', '#d81b60', '#6d4c41', '#546e7a', '#f4511e',
      '#ffcdd2', '#ffe0b2', '#fff9c4', '#c8e6c9', '#b2ebf2', '#bbdefb',
    ],
  },
  {
    id: 'anime-skin',
    name: 'Tonos de Piel & Anime',
    colors: [
      '#fff5eb', '#ffecd9', '#ffe0c2', '#f7cba4', '#eba87c', '#d1845c',
      '#f9d5c5', '#eec0ad', '#dfa088', '#c67d63', '#9c563f', '#6e3726',
      '#ffcad4', '#f4acb7', '#9d8189', '#4a3f45', '#2b2429', '#1a1518',
    ],
  },
  {
    id: 'vibrant-cel',
    name: 'Cel Shading Vibrante',
    colors: [
      '#ff1744', '#ff9100', '#ffea00', '#00e676', '#00e5ff', '#2979ff',
      '#651fff', '#d500f9', '#ff4081', '#1de9b6', '#76ff03', '#c6ff00',
    ],
  },
];

export const DEFAULT_VISIBLE_PROPS: BrushPropKey[] = [
  'size',
  'opacity',
  'hardness',
  'stabilization',
];

// ---------------------------------------------------------------------------
// Sub Tool persistence (Clip Studio Paint "Sub Tool Detail" style)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'oniri.subtools.v1';

const TOOL_IDS: ToolId[] = ['pen', 'brush', 'eraser', 'eyedropper', 'bucket', 'shape', 'bone', 'hand'];

function isValidSubTool(value: unknown): value is SubTool {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<SubTool>;
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    typeof s.tool === 'string' &&
    TOOL_IDS.includes(s.tool as ToolId) &&
    !!s.settings &&
    typeof s.settings === 'object'
  );
}

interface SubToolStorage {
  v: number;
  items: SubTool[];
  deleted: string[];
}

function cloneSubTools(list: SubTool[]): SubTool[] {
  return list.map((s) => ({ ...s, settings: { ...s.settings } }));
}

let deletedBaseIds: string[] = [];

function loadSubTools(): SubTool[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SubToolStorage>;
      if (
        parsed &&
        parsed.v === 1 &&
        Array.isArray(parsed.items) &&
        parsed.items.length > 0 &&
        parsed.items.every(isValidSubTool)
      ) {
        const items = cloneSubTools(parsed.items);
        deletedBaseIds = Array.isArray(parsed.deleted)
          ? parsed.deleted.filter((d): d is string => typeof d === 'string')
          : [];
        const present = new Set(items.map((s) => s.id));
        for (const base of SUBTOOLS) {
          const existing = items.find((i) => i.id === base.id);
          if (existing && !existing.custom && (base.id === 'manga-line' || base.id === 'manga-line-art-brush')) {
            existing.name = base.name;
            existing.description = base.description;
            existing.settings = { ...base.settings, ...existing.settings, pressureFlow: true, inkMode: 'accumulate' };
          }
          if (!present.has(base.id) && !deletedBaseIds.includes(base.id)) {
            items.push({ ...base, settings: { ...base.settings } });
          }
        }
        return items;
      }
    }
  } catch {
    // Storage corrupted or unavailable: fall back to factory presets.
  }
  return cloneSubTools(SUBTOOLS);
}

let subTools: SubTool[] = loadSubTools();

function persistSubTools(): void {
  try {
    const storage: SubToolStorage = { v: 1, items: subTools, deleted: [...deletedBaseIds] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch {
    // Storage full or unavailable: the in-memory session keeps working.
  }
}

function findSubTool(id: string): SubTool | undefined {
  return subTools.find((s) => s.id === id);
}

function factorySettingsFor(tool: ToolId): Partial<BrushSettings> {
  const template = SUBTOOLS.find((b) => b.tool === tool);
  return template ? { ...template.settings } : {};
}

function mergeBrush(sub: SubTool, color: string): BrushSettings {
  return { ...DEFAULT_BRUSH, ...sub.settings, color };
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const COLOR_SETS_KEY = 'oniri.colorsets.v1';
const VISIBLE_PROPS_KEY = 'oniri.visibleprops.v1';

function loadColorSets(): ColorSet[] {
  try {
    const raw = localStorage.getItem(COLOR_SETS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_COLOR_SETS.map((s) => ({ ...s, colors: [...s.colors] }));
}

function persistColorSets(sets: ColorSet[]): void {
  try {
    localStorage.setItem(COLOR_SETS_KEY, JSON.stringify(sets));
  } catch {
    // ignore
  }
}

function loadVisibleProps(): BrushPropKey[] {
  try {
    const raw = localStorage.getItem(VISIBLE_PROPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as BrushPropKey[];
      }
    }
  } catch {
    // ignore
  }
  return [...DEFAULT_VISIBLE_PROPS];
}

function persistVisibleProps(props: BrushPropKey[]): void {
  try {
    localStorage.setItem(VISIBLE_PROPS_KEY, JSON.stringify(props));
  } catch {
    // ignore
  }
}

const initialSub = findSubTool('g-pen') ?? subTools[0];
const initialSets = loadColorSets();

let state: ToolState = {
  tool: 'pen',
  activeSubToolId: initialSub ? initialSub.id : 'g-pen',
  brush: initialSub ? mergeBrush(initialSub, '#000000') : { ...DEFAULT_BRUSH },
  propertiesOpen: true,
  visibleProperties: loadVisibleProps(),
  previewBgMode: 'paper',
  boneMode: 'rig',
  showBonesOverlay: true,
  autoKeyBones: true,
  colorTab: 'picker',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  activeColorSlot: 'primary',
  isTransparentColor: false,
  colorHistory: DEFAULT_HISTORY,
  colorSets: initialSets,
  activeColorSetId: initialSets[0]?.id ?? 'csp-standard',
};

const listeners = new Set<(s: ToolState) => void>();

function emit(): void {
  for (const listener of listeners) listener(state);
}

export function getToolState(): ToolState {
  return state;
}

export function activeTool(): ToolId {
  return state.tool;
}

export function setTool(tool: ToolId): void {
  if (state.tool === tool) return;
  const subtools = subTools.filter((s) => s.tool === tool);
  const firstSub = subtools[0];
  const nextSubId = firstSub ? firstSub.id : state.activeSubToolId;

  let nextBoneMode = state.boneMode;
  if (tool === 'bone') {
    if (nextSubId === 'bone-rig') nextBoneMode = 'rig';
    else if (nextSubId === 'bone-pose-fk') nextBoneMode = 'pose_fk';
    else if (nextSubId === 'bone-pose-ik') nextBoneMode = 'pose_ik';
  }

  state = {
    ...state,
    tool,
    activeSubToolId: nextSubId,
    boneMode: nextBoneMode,
    brush: firstSub ? mergeBrush(firstSub, state.brush.color) : state.brush,
  };
  emit();
}

export function selectSubTool(subToolId: string): void {
  const found = findSubTool(subToolId);
  if (!found) return;
  let nextBoneMode = state.boneMode;
  if (found.id === 'bone-rig') nextBoneMode = 'rig';
  else if (found.id === 'bone-pose-fk') nextBoneMode = 'pose_fk';
  else if (found.id === 'bone-pose-ik') nextBoneMode = 'pose_ik';

  state = {
    ...state,
    tool: found.tool,
    activeSubToolId: found.id,
    boneMode: nextBoneMode,
    brush: mergeBrush(found, state.brush.color),
  };
  emit();
}

export function setBoneToolMode(mode: BoneToolMode): void {
  const subId =
    mode === 'rig' ? 'bone-rig' : mode === 'pose_fk' ? 'bone-pose-fk' : 'bone-pose-ik';
  state = {
    ...state,
    tool: 'bone',
    activeSubToolId: subId,
    boneMode: mode,
  };
  emit();
}

export function setShowBonesOverlay(show: boolean): void {
  state = { ...state, showBonesOverlay: show };
  emit();
}

export function setAutoKeyBones(autoKey: boolean): void {
  state = { ...state, autoKeyBones: autoKey };
  emit();
}

export function toggleVisibleProperty(prop: BrushPropKey): void {
  const exists = state.visibleProperties.includes(prop);
  const next = exists
    ? state.visibleProperties.filter((p) => p !== prop)
    : [...state.visibleProperties, prop];
  state = { ...state, visibleProperties: next };
  persistVisibleProps(next);
  emit();
}

export function setPreviewBgMode(mode: PreviewBgMode): void {
  state = { ...state, previewBgMode: mode };
  emit();
}

export function setColorTab(tab: ColorTabId): void {
  if (state.colorTab === tab) return;
  state = { ...state, colorTab: tab };
  emit();
}

export function setActiveColorSet(setId: string): void {
  if (!state.colorSets.some((s) => s.id === setId)) return;
  state = { ...state, activeColorSetId: setId };
  emit();
}

export function addColorToActiveSet(hex: string): void {
  if (!hex || hex === 'transparent') return;
  const norm = hex.toLowerCase();
  const nextSets = state.colorSets.map((s) => {
    if (s.id !== state.activeColorSetId) return s;
    return { ...s, colors: [...s.colors, norm] };
  });
  state = { ...state, colorSets: nextSets };
  persistColorSets(nextSets);
  emit();
}

export function removeColorFromActiveSet(index: number): void {
  const nextSets = state.colorSets.map((s) => {
    if (s.id !== state.activeColorSetId) return s;
    if (s.colors.length <= 1) return s;
    return { ...s, colors: s.colors.filter((_, idx) => idx !== index) };
  });
  state = { ...state, colorSets: nextSets };
  persistColorSets(nextSets);
  emit();
}

export function getSubToolsForTool(tool: ToolId): SubTool[] {
  return subTools.filter((s) => s.tool === tool);
}

export function getActiveSubTool(): SubTool | undefined {
  return findSubTool(state.activeSubToolId);
}

export function setBrushSettings(patch: Partial<BrushSettings>): void {
  state = {
    ...state,
    brush: { ...state.brush, ...patch },
  };

  // Every sub tool remembers its own configuration (like CSP sub tools).
  const sub = findSubTool(state.activeSubToolId);
  if (sub) {
    const subPatch: Partial<BrushSettings> = { ...patch };
    delete subPatch.color; // Color is global, owned by the color widget.
    sub.settings = { ...sub.settings, ...subPatch };
    persistSubTools();
  }

  if (patch.color && !state.isTransparentColor) {
    if (state.activeColorSlot === 'primary') {
      state.primaryColor = patch.color;
    } else {
      state.secondaryColor = patch.color;
    }
    addColorToHistory(patch.color);
  }
  emit();
}

// ---------------------------------------------------------------------------
// Sub Tool CRUD
// ---------------------------------------------------------------------------

let customCounter = 0;

function nextCustomId(): string {
  customCounter += 1;
  return `custom-${Date.now().toString(36)}-${customCounter.toString(36)}`;
}

export function createCustomSubTool(name: string, tool?: ToolId): SubTool {
  const targetTool: ToolId = tool ?? state.tool;
  const template = tool
    ? factorySettingsFor(targetTool)
    : { ...(findSubTool(state.activeSubToolId)?.settings ?? {}) };
  const source = tool ? undefined : findSubTool(state.activeSubToolId);

  const sub: SubTool = {
    id: nextCustomId(),
    name: name.trim() || 'Pincel nuevo',
    tool: targetTool,
    description: source
      ? `Pincel personalizado basado en ${source.name}.`
      : 'Pincel personalizado.',
    settings: Object.keys(template).length > 0 ? template : { ...DEFAULT_BRUSH },
    custom: true,
  };

  subTools.push(sub);
  persistSubTools();
  return sub;
}

export function duplicateSubTool(subToolId: string): SubTool | null {
  const source = findSubTool(subToolId);
  if (!source) return null;

  const copy: SubTool = {
    ...source,
    id: nextCustomId(),
    name: `${source.name} (copia)`,
    description: `Copia personalizada de ${source.name}.`,
    settings: { ...source.settings },
    custom: true,
  };

  subTools.push(copy);
  persistSubTools();
  return copy;
}

export function deleteSubTool(subToolId: string): boolean {
  const target = findSubTool(subToolId);
  if (!target) return false;

  const siblings = subTools.filter((s) => s.tool === target.tool);
  if (siblings.length <= 1) return false; // Never empty a tool category.

  subTools = subTools.filter((s) => s.id !== subToolId);
  if (SUBTOOLS.some((b) => b.id === subToolId) && !deletedBaseIds.includes(subToolId)) {
    deletedBaseIds.push(subToolId);
  }
  persistSubTools();

  if (state.activeSubToolId === subToolId) {
    const next = subTools.find((s) => s.tool === target.tool);
    if (next) {
      state = {
        ...state,
        tool: next.tool,
        activeSubToolId: next.id,
        brush: mergeBrush(next, state.brush.color),
      };
    }
  }
  emit();
  return true;
}

export function resetSubTool(subToolId: string): void {
  const target = findSubTool(subToolId);
  if (!target) return;

  const factory = SUBTOOLS.find((b) => b.id === subToolId);
  target.settings = factory ? { ...factory.settings } : factorySettingsFor(target.tool);
  persistSubTools();

  if (state.activeSubToolId === subToolId) {
    state = { ...state, brush: mergeBrush(target, state.brush.color) };
  }
  emit();
}

// ---------------------------------------------------------------------------
// Colors & Color Harmonies
// ---------------------------------------------------------------------------

export function setActiveColor(color: string): void {
  if (state.activeColorSlot === 'primary') {
    setPrimaryColor(color);
  } else {
    setSecondaryColor(color);
  }
}

export function setPrimaryColor(color: string): void {
  state = {
    ...state,
    primaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'primary',
    brush: { ...state.brush, color },
  };
  addColorToHistory(color);
  emit();
}

export function setSecondaryColor(color: string): void {
  state = {
    ...state,
    secondaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'secondary',
    brush: { ...state.brush, color },
  };
  addColorToHistory(color);
  emit();
}

export function setActiveColorSlot(slot: 'primary' | 'secondary'): void {
  const color = slot === 'primary' ? state.primaryColor : state.secondaryColor;
  state = {
    ...state,
    activeColorSlot: slot,
    isTransparentColor: false,
    brush: { ...state.brush, color },
  };
  emit();
}

export function swapColors(): void {
  const oldPrimary = state.primaryColor;
  const oldSecondary = state.secondaryColor;
  const targetColor = state.activeColorSlot === 'primary' ? oldSecondary : oldPrimary;
  state = {
    ...state,
    primaryColor: oldSecondary,
    secondaryColor: oldPrimary,
    brush: { ...state.brush, color: targetColor },
  };
  emit();
}

export function toggleTransparentColor(force?: boolean): void {
  const next = force !== undefined ? force : !state.isTransparentColor;
  state = {
    ...state,
    isTransparentColor: next,
    brush: {
      ...state.brush,
      color: next
        ? 'transparent'
        : state.activeColorSlot === 'primary'
          ? state.primaryColor
          : state.secondaryColor,
    },
  };
  emit();
}

export function addColorToHistory(hex: string): void {
  if (!hex || hex === 'transparent') return;
  const normalized = hex.toLowerCase();
  const filtered = state.colorHistory.filter((c) => c.toLowerCase() !== normalized);
  state.colorHistory = [normalized, ...filtered].slice(0, 16);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) return { r: 17, g: 17, b: 17 };
  const n = parseInt(clean, 16);
  if (Number.isNaN(n)) return { r: 17, g: 17, b: 17 };
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)].map((c) => c.toString(16).padStart(2, '0')).join('')
  );
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, v };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const hn = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = v - c;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hn < 60) [r1, g1, b1] = [c, x, 0];
  else if (hn < 120) [r1, g1, b1] = [x, c, 0];
  else if (hn < 180) [r1, g1, b1] = [0, c, x];
  else if (hn < 240) [r1, g1, b1] = [0, x, c];
  else if (hn < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

export interface ColorHarmonyGroup {
  label: string;
  colors: { hex: string; tag: string }[];
}

export function computeColorHarmonies(baseHex: string): ColorHarmonyGroup[] {
  const { r, g, b } = hexToRgb(baseHex);
  const { h, s, v } = rgbToHsv(r, g, b);
  // Ensure minimum saturation/value for chromatic harmonies even if base is near-black/white
  const effS = s < 0.12 ? 0.68 : s;
  const effV = v < 0.18 ? 0.78 : v;

  return [
    {
      label: 'Complementario (Contraste Directo)',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 180, effS, effV), tag: '180° Opuesto' },
      ],
    },
    {
      label: 'Complementario Dividido',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 150, effS, effV), tag: '+150°' },
        { hex: hsvToHex(h + 210, effS, effV), tag: '+210°' },
      ],
    },
    {
      label: 'Tríada Armónica',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 120, effS, effV), tag: '+120°' },
        { hex: hsvToHex(h + 240, effS, effV), tag: '+240°' },
      ],
    },
    {
      label: 'Análogos (Cercanos)',
      colors: [
        { hex: hsvToHex(h - 30, effS, effV), tag: '-30°' },
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 30, effS, effV), tag: '+30°' },
      ],
    },
    {
      label: 'Escala de Luz y Sombra (Cel Shading)',
      colors: [
        { hex: hsvToHex(h + 8, Math.max(0.15, effS * 0.45), Math.min(1, effV * 1.25)), tag: 'Luz+' },
        { hex: hsvToHex(h + 4, Math.max(0.25, effS * 0.75), Math.min(1, effV * 1.12)), tag: 'Luz' },
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h - 8, Math.min(1, effS * 1.1), Math.max(0.12, effV * 0.75)), tag: 'Sombra 1' },
        { hex: hsvToHex(h - 16, Math.min(1, effS * 1.2), Math.max(0.08, effV * 0.5)), tag: 'Sombra 2' },
      ],
    },
  ];
}

export function toggleProperties(force?: boolean): void {
  const next = force !== undefined ? force : !state.propertiesOpen;
  if (state.propertiesOpen === next) return;
  state = { ...state, propertiesOpen: next };
  emit();
}

export function subscribeTools(listener: (s: ToolState) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
