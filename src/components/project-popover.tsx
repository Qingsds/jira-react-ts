import styled from "@emotion/styled";
import { List, Popover, Typography } from "antd";
import { useDispatch } from "react-redux";
import { projectListAction } from "../screen/project-list/project-list.slice";
import { useProjects } from "../utils/project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinProject = projects?.filter((project) => project.pin === true);
  const dispatch = useDispatch();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinProject?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
      </List>
      <NoPaddingButton
        type={"link"}
        onClick={() => dispatch(projectListAction.openProjectModal())}
      >
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      列表
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
