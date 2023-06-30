import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { styled } from "styled-components";

export default function AuthForm() {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthContainer>
      <Form method="post" className="form">
        <h2 className="form-title">{isLogin ? "로그인 중" : "회원가입 중"}</h2>

        {/* 에러가 있다면! */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <div className="form-content">
          <label htmlFor="email">이메일을 입력하세요</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div className="form-content">
          <label htmlFor="password">비밀번호를 입력하세요</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className="actions">
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin
              ? "회원이 아니신가요? 회원가입 하러가기"
              : "로그인 하러가기"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    justify-content: center;
    align-items: center;
  }
  .form-title {
    font-family: "CWDangamAsac-Bold";
    font-size: 4rem;
  }
  .form-content {
    width: 20rem;
    margin-top: 2rem;
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

  .actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .actions button {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    border: solid #f1f2ed;
    background-color: #1e436f;
    color: #f1f2ed;
  }

  .actions a {
    text-decoration: none;
    color: #f1f2ed;
    background-color: transparent;
  }

  .actions button:hover {
    background-color: #f1f2ed;
    color: #1e436f;
  }

  .actions a:hover {
    transform: scale(1.05);
  }
`;
