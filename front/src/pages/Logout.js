import { redirect } from "react-router-dom";
import swal from "sweetalert";

// 컴포넌트는 없고 함수만 있는 페이지! -> 리다이렉트로 거쳐만 가게
export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  console.log("로그아웃 완료");
  swal({
    title: "로그아웃이 완료되었습니다!",
    text: "안녕히가세요",
    icon: "success",
  });

  return redirect("/");
}
