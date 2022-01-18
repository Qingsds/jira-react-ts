import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Project, User } from ".";

interface ListProps extends TableProps<Project>{
  users: User[];
}
export default function List({ users,...props }: ListProps) {
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
      ]}
      {...props}
    />
  );
}
