import { useRouteLoaderData } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function EditPostPage() {
  const data = useRouteLoaderData("post-detail");

  return <PostForm method="patch" post={data.post} />;
}
