import { useUndo } from "../utils/use-undo";

export default function UndoScreen() {
  const { undo, redo, present, canRedo, canUndo, set, reset,past,future } = useUndo(0);
  console.log('past',past);
  console.log('future',future);
  return (
    <div>
      <h1>{present}</h1>
      <button onClick={() => set(present + 1)}>+1</button>
      <button onClick={() => set(present - 1)}>-1</button>
      <button onClick={undo} disabled={!canUndo}>
        undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        redo
      </button>
      <button onClick={() => reset(0)}>reset 0</button>
    </div>
  );
}
