import { useCallback, useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../screen/project-list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [fetchProjects, run]);
  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = useCallback(
    (param: Partial<Project>) => {
      return run(
        client(`projects/${param.id}`, {
          method: "PATCH",
          data: param,
        })
      );
    },
    [client, run]
  );
  return { mutate, ...asyncResult };
};
