import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import EpicScreen from "../epic";
import KanbanScreen from "../kanban";

export default function ProjectScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const array = window.location.pathname.split("/");
    if (array.indexOf("kanban") === -1 && array.indexOf("epic") === -1) {
      navigate("kanban");
    }
  }, [navigate]);
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>

      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
        <Route index element={<KanbanScreen />} />
      </Routes>
    </div>
  );
}
