import { Await, json, defer, useLoaderData } from "react-router-dom";
import PostsList from "../components/PostsList";
import { Suspense } from "react";

export default function PostsPage() {
  const { posts } = useLoaderData();

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
      <Await resolve={posts}>
        {(loadedPosts) => <PostsList posts={loadedPosts} />}
      </Await>
    </Suspense>
  );
}

async function loadPosts() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    console.log("전체못가져오고있음");
    return json(
      { message: "게시글 목록을 가져올 수 없습니다!" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    console.log("게시글 전체 잘 들어오고있음");
    console.log(resData.events);
    return resData.events;
  }
}

export function loader() {
  return defer({
    posts: loadPosts(),
  });
}
