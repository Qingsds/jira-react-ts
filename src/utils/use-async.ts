import { useCallback, useMemo, useState } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = useMemo(() => {
    return { ...defaultConfig, ...initialConfig };
  }, [initialConfig]);
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  /* 更新完数据后刷新页面 */
  const [retry, setRetry] = useState(() => () => {});
  /* 查看是否被挂载的 flag */
  const mountRef = useMountRef();
  const setData = useCallback((param: D | null) => {
    setState({
      data: param,
      status: "success",
      error: null,
    });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      status: "error",
      error,
    });
  }, []);

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

      setState((state) => ({ ...state, status: "loading" }));
      return promise
        .then((data) => {
          if (mountRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwError) return Promise.reject(error);
          return error;
        });
    },
    [setData, setError, config]
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
