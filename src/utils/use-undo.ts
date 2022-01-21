import { useCallback, useState } from "react";

export const useUndo = <T>(initialValue: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialValue,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      const newPastList = past.slice(0, past.length - 1);

      return {
        present: previous,
        past: newPastList,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newFutureList = future.slice(1);
      return {
        present: next,
        future: newFutureList,
        past: [...past, present],
      };
    });
  }, []);

  const set = useCallback((newValue: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newValue === present) return currentState;

      return {
        past: [...past, present],
        present: newValue,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newValue: T) => {
    setState((currentState) => {
      return {
        present: newValue,
        past: [],
        future: [],
      };
    });
  }, []);

  return {
    present: state.present,
    future: state.future,
    past: state.past,
    canRedo,
    canUndo,
    set,
    reset,
    undo,
    redo,
  };
};
