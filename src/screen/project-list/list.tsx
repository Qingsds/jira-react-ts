import { Project, User } from ".";


interface ListProps {
  users: User[];
  list: Project[];
}
export default function List({ users, list }: ListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未命名"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
