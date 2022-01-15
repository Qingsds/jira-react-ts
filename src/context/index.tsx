import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
