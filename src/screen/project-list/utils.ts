import { useCallback, useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/**
 * useProjectModalOpen
 * @returns
 * 用来控制 projectModal 的展示
 */
export const useProjectModalOpen = () => {
  const [{ createProjectModal }, setCreateProjectModal] = useUrlQueryParam([
    "createProjectModal",
  ]);

  const open = useCallback(() => {
    setCreateProjectModal({ createProjectModal: true });
  }, [setCreateProjectModal]);

  const close = useCallback(() => {
    setCreateProjectModal({ createProjectModal: undefined });
  }, [setCreateProjectModal]);

  return { open, close, projectModalOpen: createProjectModal === "true" };
};
