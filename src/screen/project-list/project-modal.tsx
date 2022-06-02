import styled from '@emotion/styled'
import { Button, Drawer, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { ErrorBox } from '.'
import { FullPageLoading } from '../../components/lib'
import UserSelect from '../../components/user-select'
import { useAddProject, useEditProject } from '../../utils/project'
import { useProjectModalOpen } from './utils'

export const ProjectModal = () => {
    const { projectModalOpen, close, isLoading, editingProject } =
        useProjectModalOpen()
    const useMutateProject = editingProject ? useEditProject : useAddProject
    const title = editingProject ? '编辑项目' : '添加项目'

    const [form] = useForm()
    const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject()
    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [form, editingProject])

    const onFinish = (value: any) => {
        mutateAsync({ ...editingProject, ...value }).then(() => {
            form.resetFields()
            close()
        })
    }
    return (
        <Drawer
            visible={projectModalOpen}
            forceRender={true}
            onClose={close}
            width={'100%'}
        >
            <Container>
                {isLoading ? (
                    <FullPageLoading />
                ) : (
                    <>
                        <ErrorBox error={error} />
                        <h1>{title}</h1>
                        <Form
                            form={form}
                            layout={'vertical'}
                            style={{ width: '40rem' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={'名称'}
                                name={'name'}
                                rules={[
                                    { required: true, message: '请输入项目名' },
                                ]}
                            >
                                <Input placeholder='用户名' />
                            </Form.Item>
                            <Form.Item
                                label={'部门'}
                                name={'organization'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入部门名称',
                                    },
                                ]}
                            >
                                <Input placeholder='部门名称' />
                            </Form.Item>
                            <Form.Item label={'负责人'} name={'personId'}>
                                <UserSelect defaultOptionName={'负责人'} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    loading={mutateLoading}
                                    htmlType={'submit'}
                                    type={'primary'}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
`
