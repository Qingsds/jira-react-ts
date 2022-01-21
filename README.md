# 项目说明

React+TS后台管理项目
项目学习源: 慕课网jira

## 笔记(TypeScript)

JS中的 `typeof`和 TS 中`typeof`的区别

- JS 中是运行时
- TS 中是静态的

{ [key: string]: unknown }  表示键值对对象

## Hook

useAsync 状态管理

```ts
import { useCallback, useState } from "react";

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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = useCallback((param: D) => {
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
    async (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型参数");
      }
      setState((state) => ({ ...state, status: "loading" }));
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [setData, setError]
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
  };
};
```

### useState直接传入函数的意义是惰性初始化

## 其他

`import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";`可以将 svg 转换成ReactComponent,方便自定义样式

CSS-in-JS传参实例

```tsx

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
```

### 捕捉错误边界

```jsx
import React, { ReactElement } from "react";

type fallBackRender = (error : { error: Error | null }) => ReactElement;

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallBackRender: fallBackRender }>,
  { error: Error | null }
> {
  state = { error: null };
  // 当子组件抛出异常,这里会接收到并调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallBackRender, children } = this.props;
    if (error) {
      return fallBackRender(error);
    }
    return children;
  }
}
```

### 自定义iterator

如何检测对象有没有部署 `arr[Symbol.iterator]  ->> ƒ values() { [native code] }`

```javaScript

const obj = {
  data:['hello','world'],
  [Symbol.iterator](){
    const self = this
    let index = 0
    return {
      next(){
        /* 中间可以加入自己的逻辑 */
        if(index < self.data.length){
          return {
            value:self.data[index++]
            done: false
          }
        } else {
          return {value:undefined,done:true}
        }
      }
    }
  }
}

```

### 乐观更新
