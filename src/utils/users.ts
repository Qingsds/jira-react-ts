import { useEffect } from "react";
import { User } from "../screen/project-list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = () => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users"));
  }, [client, run]);

  return result;
};
