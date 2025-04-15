import { useNavigate } from 'react-router-dom';

export const useNavigateClick = (path: number | string) => {
  const navigate = useNavigate();

  return () => {
    if (typeof path === 'number') {
      navigate(path);
    } else if (path === '/') {
      window.location.href = '/';
    } else {
      navigate(`${path}`);
    }
  };
};
