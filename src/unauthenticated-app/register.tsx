import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";

export default function RegisterScreen({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async (value: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    const { username, password, cpassword } = value;
    if (password === cpassword) {
      await run(register({ username, password })).catch(onError);
    } else {
      onError(new Error("两次密码输入不一致"));
    }
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
        rules={[{ required: true, message: " 请输入密码" }]}
      >
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        dependencies={["password"]}
        rules={[
          { required: true, message: "请确认密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              /* 若还没有输入密码,或者 password === value 返回 resolve */
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("两次密码输入不一致"));
              }
            },
          }),
        ]}
      >
        <Input type="password" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
}
