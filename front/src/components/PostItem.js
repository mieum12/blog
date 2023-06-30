import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { styled } from "styled-components";
// import swal from "sweetalert";
import Swal from "sweetalert2";

export default function PostItem({ post }) {
  const submit = useSubmit();
  const token = useRouteLoaderData("root");

  function startDeleteHandler() {
    // const proceed = window.confirm("정말 삭제하시겠습니까?");

    //https://inpa.tistory.com/entry/SweetAlert2-%F0%9F%93%9A-%EC%84%A4%EC%B9%98-%EC%82%AC%EC%9A%A9
    const swalButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      // buttonsStyling: false,
    });

    swalButtons
      .fire({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 게시물은 되돌릴 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "네! 삭제할게요!",
        cancelButtonText: "아니요! 취소할게요!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalButtons.fire("삭제되었습니다!", "삭제~", "success");
          submit(null, { method: "delete" });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalButtons.fire(
            "삭제가 취소되었습니다!",
            "걱정하지마세요! 게시물은 그대로 남아있습니다 :)",
            "error"
          );
        }
      });

    // if (proceed) {
    //   submit(null, { method: "delete" });
    // }
  }

  return (
    <PostItemDetail>
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />

      <time>{post.date}</time>
      <p>{post.description}</p>

      {token && (
        <menu>
          <Link to="edit" className="buttons">
            Edit
          </Link>
          <button className="buttons" onClick={startDeleteHandler}>
            Delete
          </button>
        </menu>
      )}
      {!token && <menu>( 게시물을 수정/삭제하려면 로그인이 필요합니다. )</menu>}
    </PostItemDetail>
  );
}

const PostItemDetail = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 1rem;
  }
  .buttons {
    margin: 0.5rem;
    text-decoration: none;
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    border: solid #f1f2ed;
    background-color: #1e436f;
    color: #f1f2ed;
  }
  .buttons:hover {
    background-color: #f1f2ed;
    color: #1e436f;
  }
`;
