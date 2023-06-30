import {
  Await,
  json,
  defer,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import { Suspense } from "react";
import PostItem from "../components/PostItem";
import { getAuthToken } from "../util/auth";

export default function PostDetailPage() {
  const { post } = useRouteLoaderData("post-detail");

  return (
    <Suspense
      fallback={
        <p
          style={{
            textAlign: "center",
            fontFamily: "CWDangamAsac-Bold",
            fontSize: "6rem",
          }}
        >
          Loading...
        </p>
      }
    >
      <Await resolve={post}>
        {(loadedPost) => <PostItem post={loadedPost} />}
      </Await>
    </Suspense>
  );
}

async function loadPost(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    console.log("이거 하나 못가져오고있음");
    throw json({ message: "게시글을 가져올 수 없습니다!" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log("게시글 디테일 페이지로 잘 들어오고있음");
    console.log(resData.events);
    return resData.event;
  }
}
export async function loader({ request, params }) {
  const id = params.postId;

  // 2개의 요청을 한다
  return defer({
    //await가 있으면 데이터가 로딩될 때까지 기다렸다가 페이지 컴포넌트 로딩, 이동
    post: await loadPost(id),
  });
}

export async function action({ params, request }) {
  const postId = params.postId;
  //토큰 추출함수를 불러서 변수에 저장하기
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/events/" + postId, {
    //클라이언트 측에서 요청에 사용된 메서드(delete)와 같다고 말해줌
    method: request.method,
    headers: {
      //로그인 시 토큰을 저장하게 되고, 삭제 요청시 토큰을 보낸다
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "게시글을 삭제할 수 없습니다!" }, { status: 500 });
  }

  return redirect("/posts");
}
