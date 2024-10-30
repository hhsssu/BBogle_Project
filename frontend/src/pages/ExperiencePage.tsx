import { Route, Routes, useNavigate } from "react-router-dom";
import ExList from "../components/experience/ExList";
import ExDetail from "../components/experience/ExDetail";
import ExCreate from "../components/experience/ExCreate";

function ExperiencePage() {
  const nav = useNavigate();
  const navExList = () => {
    nav("list");
  };
  const navExCreate = () => {
    nav("create");
  };
  const navExDetail = () => {
    nav("detail");
  };

  return (
    <>
      <div>나의 경험</div>
      <button onClick={navExList}>목록</button>
      <button onClick={navExCreate}>생성</button>
      <button onClick={navExDetail}>상세</button>

      <Routes>
        <Route path="list" element={<ExList />} />
        <Route path="create" element={<ExCreate />} />
        <Route path="detail" element={<ExDetail />} />
        {/* <Route path="detail/:exId" element={<ExDetail />} /> */}
      </Routes>
    </>
  );
}

export default ExperiencePage;
