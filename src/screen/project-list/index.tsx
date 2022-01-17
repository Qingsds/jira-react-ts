import SearchPanel from "./search-panel";
import List from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
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
  created:number;
}

const ProjectListScreenList = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam, client]);

  useEffect(() => {
    client("users").then(setUsers);
  }, [client]);

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

export default ProjectListScreenList;

const Container = styled.div`
  padding: 3.2rem;
`
