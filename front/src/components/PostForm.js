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

export default function PostForm({ method, post }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/posts");
  }

  return (
    <Form method={method}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={post ? post.title : ""}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={post ? post.image : ""}
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={post ? post.date : ""}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
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
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "저장중.." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const method = request.method;
  console.log(request);
  const data = await request.formData();

  //get()으로 가져오는 것은 input form에서의 name이 된다
  // const enteredTitle = data.get('title') 이렇게 각각 할수도 있지만
  const postData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

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
    throw json({ message: "Could not save post.." }, { status: 500 });
  }

  return redirect("/posts");
}
