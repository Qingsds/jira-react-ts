import SearchPanel from './search-panel'
import List from './list'
import {useDebounce} from '../../utils'
import styled from '@emotion/styled'
import {useProjects} from '../../utils/project'
import {useUsers} from '../../utils/users'
import {Button, Typography} from 'antd'
import {useProjectModalOpen, useProjectSearchParams} from './utils'
import {Row} from '../../components/lib'

export interface User {
    id: number
    name: string
    email: string
    title: string
    organization: string
    token: string
}

export interface Project {
    id: number
    name: string
    personId: number
    pin: boolean
    organization: string
    created: number
}

const ProjectListScreenList = () => {
    const [param, setParam] = useProjectSearchParams()
    const {
        data: list,
        isLoading,
        error,
    } = useProjects(useDebounce(param, 500))
    const {data: users} = useUsers()
    const {open} = useProjectModalOpen()

    return (
        <Container>
            <Row between={true} marginBottom={1.5}>
                <h1>项目列表</h1>
                <Button onClick={open}>创建项目</Button>
            </Row>
            <SearchPanel param={param} setParam={setParam}/>
            <ErrorBox error={error}/>
            <List
                users={users || []}
                dataSource={list || []}
                loading={isLoading}
            />
        </Container>
    )
}

export default ProjectListScreenList

// ProjectListScreenList.whyDidYouRender = true;

const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({error}: { error: unknown }) => {
    if (isError(error)) {
        return (
            <Typography.Text type={'danger'}>{error.message}</Typography.Text>
        )
    } else {
        return null
    }
}

const Container = styled.div`
  padding: 3.2rem;
`
