import { useCallback, useMemo, useReducer, useState } from "react";
import { useMountRef } from ".";

interface State<D> {
  data: D | null;
  status: "idle" | "error" | "loading" | "success";
  error: Error | null;
}

const defaultInitialState: State<null> = {
  data: null,
  status: "idle",
  error: null,
};

const defaultConfig = {
  throwError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountRef = useMountRef();
  return useCallback(
    (...args) => (mountRef.current ? dispatch(...args) : void 0),
    [mountRef, dispatch]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = useMemo(() => {
    return { ...defaultConfig, ...initialConfig };
  }, [initialConfig]);
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => {
      return { ...state, ...action };
    },
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  /* 更新完数据后刷新页面 */
  const [retry, setRetry] = useState(() => () => {});
  /* 查看是否被挂载的 flag */
  const setData = useCallback(
    (param: D | null) => {
      safeDispatch({
        data: param,
        status: "success",
        error: null,
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        status: "error",
        error,
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    async (promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型参数");
      }
      setRetry(() => () => {
        if (retryConfig) {
          run(retryConfig.retry(), retryConfig);
        }
      });

      safeDispatch({ status: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwError) return Promise.reject(error);
          return error;
        });
    },
    [setData, setError, config, safeDispatch]
  );

  return {
    isError: state.status === "error",
    isLoading: state.status === "loading",
    isIdle: state.status === "idle",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    data: state.data,
    error: state.error,
    retry,
  };
};
