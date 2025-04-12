import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh;
`;

const IconButtonContainer = styled.div`
  transform: scale(1.5);

  > div {
    transition: 0.2s all ease-in-out;
  }
`;

const S = {
  ErrorContainer,
  IconButtonContainer,
};

export default S;
