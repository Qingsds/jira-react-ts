import styled from "@emotion/styled";
import { NoPaddingButton, Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screen/project-list";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { restRouter, useDocumentTitle } from "./utils";
import { Navigate, Route, Routes } from "react-router-dom";
import ProjectScreen from "./screen/project";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectPopover } from "./components/project-popover";
import { useState } from "react";
import { ProjectModal } from "./screen/project-list/project-modal";

export default function AuthenticatedApp() {
  useDocumentTitle("任务列表", false);
  const [projectOpenModal, setProjectOpenModal] = useState(false);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to={"projects"} />} />
            <Route path={"projects"} element={<ProjectListScreen />} />
            <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectOpenModal={projectOpenModal}
        onClose={() => setProjectOpenModal(false)}
      />
    </Container>
  );
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <NoPaddingButton type={"link"} onClick={restRouter}>
          <SoftWareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </NoPaddingButton>
        <ProjectPopover />
        <span>人员</span>
      </HeaderLeft>
      <User />
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <HeaderRight>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"logout"}>
              <Button type={"link"} onClick={logout}>
                登出
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button type={"link"} onClick={(e) => e.preventDefault()}>
          Hi,{user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.div``;
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
