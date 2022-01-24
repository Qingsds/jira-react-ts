import { Button, Drawer } from "antd";
import { useProjectModalOpen } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModalOpen();
  return (
    <Drawer
      visible={projectModalOpen}
      forceRender={true}
      onClose={close}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={close}>返回</Button>
    </Drawer>
  );
};
