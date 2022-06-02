import { useCallback, useMemo } from 'react'
import { useProject } from '../../utils/project'
import { useSetUrlQueryParams, useUrlQueryParam } from '../../utils/url'

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const
}

/**
 * useProjectModalOpen
 * @returns
 * 用来控制 projectModal 的展示
 */
export const useProjectModalOpen = () => {
    const [{ createProjectModal }, setCreateProjectModal] = useUrlQueryParam([
        'createProjectModal',
    ])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId',
    ])
    const { data: editingProject, isLoading } = useProject(
        Number(editingProjectId)
    )
    const setUrlParams = useSetUrlQueryParams()

    const open = useCallback(() => {
        setCreateProjectModal({ createProjectModal: true })
    }, [setCreateProjectModal])

    const startEditingProject = useCallback(
        (id: number) => {
            setEditingProjectId({ editingProjectId: id })
        },
        [setEditingProjectId]
    )

    const close = useCallback(() => {
        setUrlParams({ createProjectModal: '', editingProjectId: '' })
    }, [setUrlParams])

    return {
        open,
        close,
        projectModalOpen:
            createProjectModal === 'true' || Boolean(editingProject),
        startEditingProject,
        editingProject,
        isLoading,
    }
}
