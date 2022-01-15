import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as auth from "../auth-provider";
import { User } from "../screen/project-list";
import { http } from "../utils/http";

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

const bootstrapUser = async () => {
  const { getToken } = auth;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    return data.user;
  }
};
interface AuthForm {
  username: string;
  password: string;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    bootstrapUser().then(setUser);
  }, []);

  const login = useCallback(
    (form: AuthForm) => auth.login(form).then(setUser),
    []
  );
  const register = useCallback(
    (form: AuthForm) => auth.register(form).then(setUser),
    []
  );
  const logout = useCallback(() => auth.logout().then(() => setUser(null)), []);
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, setUser, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("请在AuthProvider中使用.");
  }
  return context;
};
