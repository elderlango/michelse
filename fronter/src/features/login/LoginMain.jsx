import styled from "styled-components";
import Login from "../authentication/LoginForm";


const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 5rem 2.8rem 15rem;
  overflow: scroll;
`;

function HomeMain() {
  return (
    <>
      <Main>
        <Login />
      </Main>
    </>
  );
}

export default HomeMain;
