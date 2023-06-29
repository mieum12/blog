import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import { styled } from "styled-components";

export default function RootLayout() {
  return (
    <Root>
      <MainNav />
      <main className="main-container">
        <Outlet />
      </main>
    </Root>
  );
}

const Root = styled.div`
  .main-container {
    text-align: center;
  }
`;
