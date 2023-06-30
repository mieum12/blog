import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";
import swal from "sweetalert";

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  );
}

//AuthForm이 전송 될 때마다 아래 함수가 실행
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  //get을 호출해 mode를 얻음(mode가 없다면 디폴트로 로그인으로)
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();

  //데이터 얻기!
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log("email:", authData.email);
  console.log("password:", authData.password);

  //일단 로그인, 회원가입 모두 post요청
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (mode === "login") {
    if (!response.ok) {
      swal({ title: "로그인에 실패했습니다!", icon: "error" });
      throw json({ message: "로그인에 실패했습니다!" }, { status: 500 });
    } else {
      swal({
        title: "로그인 완료!",
        text: "환영합니다!",
        icon: "success",
      });
    }
  }

  if (mode === "signup") {
    if (!response.ok) {
      swal({ title: "회원가입에 실패했습니다!", icon: "error" });
      throw json({ message: "회원가입에 실패했습니다!" }, { status: 500 });
    } else {
      swal({
        title: "회원가입 완료!",
        text: "자동 로그인 되었습니다!",
        icon: "success",
      });
    }
  }

  //모든게 지나면 사용자 생성 혹은 가입에 성공!!

  //📍백엔드에서 주는 token을 여기서 관리해야한다
  const resData = await response.json();
  const token = resData.token;
  //해당 토큰을 브라우저 저장소에 저장, key를 부여하고 추출한 토큰을 여기에 저장
  localStorage.setItem("token", token);
  //만료시간 계산해서 로컬스토리지에 저장 (새로고침해도 계속 유지)
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  // 홈으로 가게함
  return redirect("/");
}
