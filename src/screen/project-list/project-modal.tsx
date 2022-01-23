import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListAction, selectProjectOpenModal } from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectOpenModal);
  return (
    <Drawer
      visible={projectModalOpen}
      forceRender={true}
      onClose={() => dispatch(projectListAction.closeProjectModal())}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={() => dispatch(projectListAction.closeProjectModal())}>
        返回
      </Button>
    </Drawer>
  );
};
