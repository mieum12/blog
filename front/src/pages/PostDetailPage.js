import { Await, json, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import PostItem from "../components/PostItem";

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
        {(loadedPost) => <PostItem posts={loadedPost} />}
      </Await>
    </Suspense>
  );
}
