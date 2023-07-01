import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import Swal from "sweetalert2";
import { styled } from "styled-components";

export default function PostForm({ method, post }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/posts");
  }

  return (
    <PostFormContainer>
      <Form method={method} className="form">
        <div className="form-content">
          <label htmlFor="title">제목을 입력하세요</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={post ? post.title : ""}
          />
        </div>
        <div className="form-content">
          <label htmlFor="image">이미지 url을 입력하세요</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={post ? post.image : ""}
          />
        </div>
        <div className="form-content">
          <label htmlFor="date">날짜를 선택하세요</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={post ? post.date : ""}
          />
        </div>
        <div className="form-content">
          <label htmlFor="description">내용을 입력하세요</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={post ? post.description : ""}
          />
        </div>
        <div>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            취소
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "저장중.." : "저장하기"}
          </button>
        </div>
      </Form>
    </PostFormContainer>
  );
}

// 게시글 작성 , 수정 하나로 해결

export async function action({ request, params }) {
  const method = request.method;
  console.log(request);
  const data = await request.formData();

  // get()으로 가져오는 것은 input form에서의 name이 된다
  // const enteredTitle = data.get('title') 이렇게 각각 할수도 있지만
  const postData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  //게시글 수정
  if (method === "PATCH") {
    const postId = params.postId;
    url = "http://localhost:8080/events/" + postId;
  }

  const token = getAuthToken();

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      //이벤트 편집 시에도 토큰 보냄
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });

  //error 페이지를 따로 표시하지 않으려 할때 이렇게 response를 리턴
  //에러페이지로 가게되면 사용자의 글이 전부 날아가기때문에 사용자 경험에 큰 문제
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "게시글 저잘 실패.." }, { status: 500 });
  }

  Swal.fire("게시글을 성공적으로 등록했습니다!", "", "success");
  return redirect("/posts");
}

const PostFormContainer = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    justify-content: center;
    align-items: center;
  }
  .form-content {
    width: 20rem;
    margin-top: 1rem;
  }

  .form label,
  .form input,
  .form textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }

  .form input,
  .form textarea {
    font: inherit;
    padding: 0.25rem;
  }

  button {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    border: solid #f1f2ed;
    background-color: #1e436f;
    color: #f1f2ed;
    margin: 0.5rem;
  }

  button:hover {
    background-color: #f1f2ed;
    color: #1e436f;
  }
`;
