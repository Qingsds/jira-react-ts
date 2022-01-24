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

### component composition

官网的例子

```jsx

/**
 * 如果在最后只有 Avatar 组件真的需要 user 和 avatarSize，
 * 那么层层传递这两个 props 就显得非常冗余。而且一旦 Avatar 
 * 组件需要更多从来自顶层组件的 props，你还得在中间级一个一个加上去，这将会变得非常麻烦。
 * 
**/

<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ... (消费者)
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>


/**
 * component composition
 * 种变化下，只有最顶部的 Page 组件需要知道 Link 和 Avatar 
 * 组件是如何使用 user 和 avatarSize 的。
**/
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}

```

> 这种对组件的控制反转减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控

### HOC

- 优点:
  - 可以在任何组件包括 class Component 中使用
  - 所倡导的容器组件和展示组件分离原则 做到了关注点分离
- 缺点:
  - 不直观,难以阅读
  - 名字冲突
  - 组件层层嵌套

### 乐观更新

### redux toolkit

```ts
//用来注册 reducer
export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
//获取 getState 返回值的类型
export type RootState = ReturnType<typeof store.getState>;



/* -------------------------分割线------------------------- */
const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setState(state, action) {
      state.user = action.payload;
    },
  },
});

const { setState } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setState(user)));

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setState(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setState(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setState(user)));

```

### 类型守卫

` const isError = (value:any) :value is Error => value?.message `
