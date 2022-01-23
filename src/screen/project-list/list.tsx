import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Project, User } from ".";
import { NoPaddingButton } from "../../components/lib";
import Pin from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { projectListAction } from "./project-list.slice";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject();
  const PinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  const dispatch = useDispatch();

  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin pin={true} disabled={true} />,
          render(index, project) {
            return (
              <Pin pin={project.pin} onCheckedChange={PinProject(project.id)} />
            );
          },
        },
        {
          title: "名称",
          render(index, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(index, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建日期",
          render(index, project) {
            return <span>{dayjs(project.created).format("YYYY-MM-DD")}</span>;
          },
        },
        {
          render(project, index) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>
                      <NoPaddingButton
                        onClick={() =>
                          dispatch(projectListAction.openProjectModal())
                        }
                        type={"link"}
                      >
                        编辑
                      </NoPaddingButton>
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type={"link"}>...</NoPaddingButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}
