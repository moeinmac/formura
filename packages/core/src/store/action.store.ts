import type { ActionEvent, ActionState } from "../types";

export type ActionStore<TData = unknown> = {
  dispatch: (event: ActionEvent<TData>) => void;
  getSnapshot: () => ActionState<TData>;
  subscribe: (listener: () => void) => () => void;
};

export type ActionContextValue<TData = unknown> = {
  actionState: ActionState<TData>;
  resetAction: () => void;
};

export const createActionStore = <TData = unknown>(): ActionStore<TData> => {
  let state: ActionState<TData> = {
    result: null,
    isSubmitting: false,
    submitCount: 0,
  };

  const listeners = new Set<() => void>();
  const notify = (): void => listeners.forEach((l) => l());

  const reduce = (current: ActionState<TData>, event: ActionEvent<TData>): ActionState<TData> => {
    switch (event.type) {
      case "SUBMIT_START":
        return {
          ...current,
          isSubmitting: true,
          submitCount: current.submitCount + 1,
        };

      case "SUBMIT_END":
        return {
          ...current,
          isSubmitting: false,
          result: event.result,
        };

      case "RESET":
        return {
          result: null,
          isSubmitting: false,
          submitCount: 0,
        };
    }
  };

  return {
    dispatch: (event) => {
      const next = reduce(state, event);
      if (next === state) return;
      state = next;
      notify();
    },

    getSnapshot: () => state,

    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
