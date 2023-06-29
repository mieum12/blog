import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export default function PostsNav() {
  return (
    <Nav>
      <div className="list">
        {/* 토큰이 없을 떄 */}
        <ul>
          <NavLink to="/posts">
            <h1>모든 글 보기</h1>
          </NavLink>
        </ul>

        {/* 토큰이 없을 때 */}
        <ul>
          <NavLink to="/posts/new">
            <h1>새 글 쓰기</h1>
          </NavLink>
        </ul>
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;

  .list {
    display: flex;
    gap: 1rem;
  }
  .list a {
    text-decoration: none;
    color: #f1f2ed;
  }
`;
