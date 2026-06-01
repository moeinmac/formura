import { useCallback, useRef, useSyncExternalStore } from "react";
import type { ZodType } from "zod";
import { createActionStore } from "../store/action.store";
import { ActionError, ActionResult, ActionState, ActionSuccess, FormAction } from "../types";
import { isServerAction, toFormData } from "../utils/action.utils";

type ActionCallbacks<TData> = {
  onSuccess?: (result: ActionSuccess<TData>) => void;
  onError?: (result: ActionError) => void;
  onSettled?: (result: ActionResult<TData>) => void;
};

export const useFormAction = <TSchema extends ZodType, TData = unknown>(action: FormAction<TSchema, TData>, callbacks: ActionCallbacks<TData>) => {
  const storeRef = useRef(createActionStore<TData>());
  const actionRef = useRef(action);
  actionRef.current = action;

  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  const actionState = useSyncExternalStore<ActionState<TData>>(
    storeRef.current.subscribe,
    storeRef.current.getSnapshot,
    storeRef.current.getSnapshot,
  );

  const executeAction = useCallback(async (values: any): Promise<ActionResult<TData>> => {
    const store = storeRef.current;
    const currentAction = actionRef.current;
    const { onSuccess, onError, onSettled } = callbacksRef.current;

    store.dispatch({ type: "SUBMIT_START" });
    let result: ActionResult<TData>;

    try {
      const formData = toFormData(values);
      if (isServerAction(currentAction)) {
        const prevState = store.getSnapshot().result;
        result = await currentAction(prevState, formData);
      } else {
        result = await currentAction(values, formData);
      }
    } catch (err) {
      result = {
        status: "error",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
      };
    }

    store.dispatch({ type: "SUBMIT_END", result });

    if (result.status === "success") onSuccess?.(result);
    else onError?.(result);
    onSettled?.(result);

    return result;
  }, []);

  const resetAction = useCallback(() => {
    storeRef.current.dispatch({ type: "RESET" });
  }, []);

  return { actionState, executeAction, resetAction };
};
