import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

export default function RootLayout() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
