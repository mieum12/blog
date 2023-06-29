import { styled } from "styled-components";

export default function HomePage() {
  return (
    <div>
      <Intro>
        <div>반가워요,</div>
        <div>최지원</div>
        <div>입니다.</div>
      </Intro>
    </div>
  );
}

const Intro = styled.div`
  font-family: "CWDangamAsac-Bold";
  font-size: 17rem;
`;
