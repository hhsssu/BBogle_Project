import "./App.css";
import SideBar from "./components/common/sideBar/SideBar";
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <>
      <AppRouter />
      <SideBar />
    </>
  );
}

export default App;
