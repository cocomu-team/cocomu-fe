import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};

  padding: 5rem 0;
  gap: 20rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3.5rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const LogoImg = styled.img`
  width: 12rem;
  object-fit: contain;
  align-items: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 1rem;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: row;

  gap: 4rem;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const MenuText = styled.div`
  ${({ theme }) => theme.font.common.default};
  color: ${({ theme }) => theme.color.gray[800]};
  cursor: pointer;
  white-space: nowrap;
`;

const S = {
  Container,
  InfoSection,
  LogoImg,
  LabelContainer,
  MenuSection,
  MenuText,
};

export default S;
