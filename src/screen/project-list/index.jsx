import SearchPanel from "./search-panel";
import List from "./list";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useDebounce } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectScreenList = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    id: "",
  });
  const debounceParam = useDebounce(param,500)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debounceParam]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectScreenList;
