import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "../screen/project-list";
import { useProjectSearchParams } from "../screen/project-list/utils";
import { useHttp } from "./http";
/* 查询 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

/* 修改 */
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const searchParams = useProjectSearchParams();
  const queryKey = ["projects", searchParams];
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return { previousItems };
      },
      onError(error, newValue, context: any) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
};

/* 添加 */
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client("projects", {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
