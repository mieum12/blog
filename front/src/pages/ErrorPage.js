import { styled } from "styled-components";

export default function ErrorPage() {
  return (
    <Error>
      <h1>ERROR</h1>
    </Error>
  );
}

const Error = styled.div`
  text-align: center;
  font-family: CWDangamAsac-Bold;
  font-size: 10rem;
`;
