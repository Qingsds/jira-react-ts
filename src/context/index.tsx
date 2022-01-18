import { ReactNode } from "react";
import {  QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
