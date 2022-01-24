import styled from "@emotion/styled";
import { List, Popover, Typography } from "antd";
import { useProjectModalOpen } from "../screen/project-list/utils";
import { useProjects } from "../utils/project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinProject = projects?.filter((project) => project.pin === true);
  const { open } = useProjectModalOpen();
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
      <NoPaddingButton onClick={open} type={"link"}>
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span style={{ cursor: "pointer" }}>项目列表</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
  cursor: pointer;
`;
