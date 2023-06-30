import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";
import MainNav from "../components/MainNav";
import { styled } from "styled-components";

export default function RootLayout() {
  //자동로그아웃
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    //token이 없다면 할게없음, 아무것도 리턴하지않음
    if (!token) {
      return;
    }

    //토큰 만료시 로그아웃 -> 타이머 없이 바로 리턴
    if (token === "EXPIRED") {
      submit(null, { action: "logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log("남은 시간:", tokenDuration);

    //token이 있으면 1시간 타이머를 설정 -> 자동로그아웃
    setTimeout(() => {
      // Main nav로 로그아웃 라우트를 트리거해서, 로그아웃 요청 전송
      submit(null, { action: "logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

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
