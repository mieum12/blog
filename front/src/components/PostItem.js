import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

export default function PostItem({ post }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("정말 삭제하시겠습니까?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <>
      <img src={post.image} alt={post.title} />
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <p>{post.description}</p>
      <menu>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </>
  );
}
