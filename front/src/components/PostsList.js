import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function PostsList({ posts }) {
  return (
    <PostContainer>
      <div>전체 게시물({posts.length})</div>
      <div className="posts">
        <ul className="list">
          {posts.map((post) => (
            <li key={post.id} className="item">
              <Link to={post.id}>
                <img src={post.image} alt={post.title} />
                <div className="content">
                  <h2>{post.title}</h2>
                  <time>{post.date}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  .posts {
    margin: 3rem auto;
  }

  .list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .item {
    list-style-type: none;
  }
  .item a {
    padding: 0rem 4rem 2rem;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .item a:hover {
    transform: scale(1.02);
  }

  .item img {
    border-radius: 4px;
    height: 20rem;
    object-fit: cover;
  }

  .content {
    padding: 1rem;
  }
  .item h2 {
    margin: 0 0 1rem 0;
  }
`;
