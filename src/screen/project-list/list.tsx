import { Table } from "antd";
import { Project, User } from ".";

interface ListProps {
  users: User[];
  list: Project[];
}
export default function List({ users, list }: ListProps) {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(index, project) {
            return (
              <td>
                {users.find((user) => user.id === project.personId)?.name}
              </td>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
}
