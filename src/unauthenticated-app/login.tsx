import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";

export default function LoginScreen({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async(value: { username: string; password: string }) => {
    await run(login(value)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
}
