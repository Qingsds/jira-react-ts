import SearchPanel from "./search-panel";
import List from "./list";
import { useState } from "react";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/users";
import { Typography } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

const ProjectListScreenList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const { data: list, isLoading, error } = useProjects(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

export default ProjectListScreenList;

const Container = styled.div`
  padding: 3.2rem;
`;
