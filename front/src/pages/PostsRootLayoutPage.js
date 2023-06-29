import { Outlet } from "react-router-dom";
import PostsNav from "../components/PostsNav";

// 포스트 메뉴의 레이아웃

export default function PostsRootLayoutPage() {
  return (
    <>
      <PostsNav />
      <Outlet />
    </>
  );
}
