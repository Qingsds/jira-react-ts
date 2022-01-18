import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screen/project-list";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { useDocumentTitle } from "./utils";
import { Route, Routes } from "react-router-dom";
import ProjectScreen from "./screen/project";

export default function AuthenticatedApp() {
  useDocumentTitle("任务列表", false);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"projects"} element={<ProjectListScreen />} />
          <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          <Route index element={<ProjectListScreen />} />
        </Routes>
      </Main>
    </Container>
  );
}

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftWareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        <h3>列表</h3>
        <h3>人员</h3>
      </HeaderLeft>
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
    </Header>
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
