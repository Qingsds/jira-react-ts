import { User } from "./index";
interface SearchPanelProps {
  param: { name: string; personId: string };
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
}

export default function SearchPanel({
  param,
  setParam,
  users,
}: SearchPanelProps) {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(evt) => setParam({ ...param, name: evt.target.value })}
      />
      <select
        value={param.personId}
        onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
}
