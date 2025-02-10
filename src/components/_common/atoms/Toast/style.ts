import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface ToastContainerProps {
  type: 'default' | 'success' | 'error';
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const progressShrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const ToastContainer = styled.div<{ isLeaving: boolean }>`
  position: fixed;
  top: 5%;
  right: 1%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: fit-content;
  min-width: 20rem;
  max-width: 35rem;

  background-color: ${({ theme }) => theme.color.gray[50]};
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
  opacity: ${({ isLeaving }) => (isLeaving ? 0 : 1)};

  border-radius: 0.8rem;

  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  animation: ${({ isLeaving }) => (isLeaving ? slideOut : slideIn)} 0.5s ease-out;
  pointer-events: ${({ isLeaving }) => (isLeaving ? 'none' : 'auto')};
`;

const CloseBtn = styled.button`
  float: right;

  ${({ theme }) => theme.font.heading[500]};
  color: ${({ theme }) => theme.color.gray[600]};
  background: none;

  border: none;

  padding-top: 0.2rem;
  padding-right: 0.8rem;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.gray[950]};
  }
`;

const ProgressBar = styled.div<ToastContainerProps>`
  width: 100%;
  height: 0.5rem;

  background-color: ${({ theme, type }) =>
    ({
      default: theme.color.secondary[900],
      success: theme.color.analogous[500],
      error: theme.color.triadic[800],
    })[type] || theme.color.primary[900]};

  border-radius: 0.4rem;

  margin-top: 1.8rem;

  animation: ${progressShrink} 4.3s linear forwards;
`;

const ToastContent = styled.div<ToastContainerProps>`
  margin: 0 1rem;

  ${({ theme }) => theme.font.common.default};
  color: ${({ theme, type }) =>
    ({
      default: theme.color.gray[950],
      success: theme.color.gray[950],
      error: theme.color.triadic[800],
    })[type] || theme.color.gray[950]};
`;

const S = {
  ToastContainer,
  CloseBtn,
  ProgressBar,
  ToastContent,
};

export default S;
