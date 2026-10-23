export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface HistoryRecord {
  layerId: string;
  rect: Rect;
  data: Uint8ClampedArray;
}

export interface HistoryManager {
  push(layerId: string, rect: Rect, data: ImageData | Uint8ClampedArray): void;
  undo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null;
  redo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null;
  canUndo(): boolean;
  canRedo(): boolean;
  clear(): void;
}

export function createHistoryManager(maxSteps = 30): HistoryManager {
  const undoStack: HistoryRecord[] = [];
  const redoStack: HistoryRecord[] = [];

  return {
    push(layerId: string, rect: Rect, rawData: ImageData | Uint8ClampedArray) {
      if (rect.w <= 0 || rect.h <= 0) return;
      const buffer =
        rawData instanceof Uint8ClampedArray
          ? new Uint8ClampedArray(rawData)
          : new Uint8ClampedArray(rawData.data);

      undoStack.push({
        layerId,
        rect: { x: rect.x, y: rect.y, w: rect.w, h: rect.h },
        data: buffer,
      });

      if (undoStack.length > maxSteps) {
        undoStack.shift();
      }
      redoStack.length = 0;
    },

    undo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null {
      if (undoStack.length === 0) return null;
      const target = undoStack.pop()!;
      // Capture current state of the affected bounding box so redo can restore it
      const currentSnap = getCurrentSnapshot(target.rect);
      redoStack.push({
        layerId: currentLayerId,
        rect: { ...target.rect },
        data: new Uint8ClampedArray(currentSnap.data),
      });
      return target;
    },

    redo(currentLayerId: string, getCurrentSnapshot: (rect: Rect) => ImageData): HistoryRecord | null {
      if (redoStack.length === 0) return null;
      const target = redoStack.pop()!;
      // Capture current state before redo so undo can go back
      const currentSnap = getCurrentSnapshot(target.rect);
      undoStack.push({
        layerId: currentLayerId,
        rect: { ...target.rect },
        data: new Uint8ClampedArray(currentSnap.data),
      });
      return target;
    },

    canUndo(): boolean {
      return undoStack.length > 0;
    },

    canRedo(): boolean {
      return redoStack.length > 0;
    },

    clear() {
      undoStack.length = 0;
      redoStack.length = 0;
    },
  };
}
