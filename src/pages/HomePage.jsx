import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

function HomePage() {
  return (
    <>
      <Header />
      <Main />
      <Outlet />
    </>
  );
}

export default HomePage;
