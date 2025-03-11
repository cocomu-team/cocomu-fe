import styled from '@emotion/styled';

const BackgroundContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[300]};
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: 0;
  padding: 0;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem 0;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  gap: 4rem;
`;

const LogoImg = styled.img`
  width: 8rem;
  object-fit: contain;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 1rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
`;

const LabelText = styled.div`
  ${({ theme }) => theme.font.heading[100]};
  color: ${({ theme }) => theme.color.gray[800]};
`;

const SmallLabelText = styled.p`
  ${({ theme }) => theme.font.common.small};
  color: ${({ theme }) => theme.color.gray[800]};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;

  gap: 4rem;
  justify-content: center;
  align-items: center;
`;

const MenuText = styled.div`
  ${({ theme }) => theme.font.heading[100]};
  color: ${({ theme }) => theme.color.gray[800]};
  cursor: pointer;
`;

const S = {
  BackgroundContainer,
  FooterContainer,
  LeftContainer,
  LogoImg,
  LabelContainer,
  Label,
  LabelText,
  SmallLabelText,
  RightContainer,
  MenuText,
};

export default S;
