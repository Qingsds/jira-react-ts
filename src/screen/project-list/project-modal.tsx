import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectOpenModal: boolean;
  onClose: () => void;
}) => {
  const { projectOpenModal, onClose } = props;
  return (
    <Drawer
      visible={projectOpenModal}
      forceRender={true}
      onClose={onClose}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={onClose}>返回</Button>
    </Drawer>
  );
};
