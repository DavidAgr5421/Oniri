export interface HistoryRecord {
  layerId: string;
  data: ImageData;
}

export interface HistoryManager {
  push(layerId: string, snapshot: ImageData): void;
  undo(currentLayerId: string, current: ImageData): HistoryRecord | null;
  redo(currentLayerId: string, current: ImageData): HistoryRecord | null;
  canUndo(): boolean;
  canRedo(): boolean;
  clear(): void;
}

export function createHistoryManager(maxSteps = 30): HistoryManager {
  const undoStack: HistoryRecord[] = [];
  const redoStack: HistoryRecord[] = [];

  return {
    push(layerId: string, snapshot: ImageData) {
      undoStack.push({ layerId, data: snapshot });
      if (undoStack.length > maxSteps) {
        undoStack.shift();
      }
      redoStack.length = 0;
    },
    undo(currentLayerId: string, current: ImageData): HistoryRecord | null {
      if (undoStack.length === 0) return null;
      redoStack.push({ layerId: currentLayerId, data: current });
      return undoStack.pop() ?? null;
    },
    redo(currentLayerId: string, current: ImageData): HistoryRecord | null {
      if (redoStack.length === 0) return null;
      undoStack.push({ layerId: currentLayerId, data: current });
      return redoStack.pop() ?? null;
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
