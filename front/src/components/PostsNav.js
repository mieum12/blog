import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export default function PostsNav() {
  return (
    <Nav>
      <div className="list">
        <ul>
          <NavLink to="/posts">
            <h1>모든 글 보기</h1>
          </NavLink>
        </ul>

        {/* 토큰이 없을 때 사라지게 */}
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
  overflow: hidden;

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
`;
