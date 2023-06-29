import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export default function MainNav() {
  return (
    <Nav>
      <div className="list">
        <ul>
          <NavLink to="/">JIWON</NavLink>
        </ul>
        <ul>
          <NavLink to="/posts">Blog</NavLink>
        </ul>

        {/* 토큰이 없을 떄 */}
        <ul>
          <NavLink to="/auth?mode=login">Login/Signup</NavLink>
        </ul>

        {/* 토큰이 없을 때 */}
        <ul>
          <NavLink to="/logout">Logout</NavLink>
        </ul>
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  font-family: "CWDangamAsac-Bold";
  font-size: 3rem;
  margin: auto;
  padding: 2rem;
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
`;
