import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import { styled } from "styled-components";

export default function MainNav() {
  const token = useRouteLoaderData("root");

  return (
    <Nav>
      <div className="list">
        <ul>
          <NavLink to="/">JIWON</NavLink>
        </ul>
        <ul>
          <NavLink to="/posts">Blog</NavLink>
        </ul>

        {!token && (
          <ul>
            <NavLink to="/auth?mode=login">Login/Signup</NavLink>
          </ul>
        )}

        {token && (
          <ul>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </ul>
        )}
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  font-family: "CWDangamAsac-Bold";
  font-size: 2rem;
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  .list {
    display: flex;
    gap: 1rem;
  }
  .list a {
    text-decoration: none;
    color: #f1f2ed;
    display: flex;
  }
  .list a:hover {
    transform: scale(1.15);
  }
  .list a.active {
    text-decoration: underline;
    text-underline-position: under;
  }
  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
    color: #f1f2ed;
    font-family: "CWDangamAsac-Bold";
    font-size: 2rem;
  }
  button:hover {
    transform: scale(1.15);
  }
`;
