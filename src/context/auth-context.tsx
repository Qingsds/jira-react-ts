import React, { ReactNode, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "../auth-provider";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../screen/project-list";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import * as authStore from "../store/auth.slice";

const AuthContext = React.createContext<
  | {
      user: User | null;
      setUser: (user: User) => void;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const bootstrapUser = async () => {
  const { getToken } = auth;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    return data.user;
  }
};
export interface AuthForm {
  username: string;
  password: string;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    isIdle,
    run,
  } = useAsync<User>();

  const dispatch:(...args:unknown[]) => Promise<User> = useDispatch();
  useEffect(() => {
    run(dispatch(authStore.bootstrap()));
  }, [run,dispatch]);

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (error) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
   <div>
     {children}
   </div>
  );
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );

  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return { user, login, register, logout };
};
