import { Form, Input, Select } from "antd";
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
    <Form style={{marginBottom:'2rem'}} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Select
        value={param.personId}
        onChange={(value) => setParam({ ...param, personId: value })}
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  );
}
