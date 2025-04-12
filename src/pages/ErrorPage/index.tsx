import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { ERROR_IMAGE } from '@constants/common/image';
import IconButton from '@components/_common/atoms/IconButton';

import S from './style';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigate = (path: string | number) => {
    navigate(`${path}`);
  };

  return (
    <S.ErrorContainer>
      <img
        src={ERROR_IMAGE}
        alt='에러이미지'
        width='500px'
      />
      <S.IconButtonContainer>
        <IconButton
          onClick={() => handleNavigate('/')}
          content='메인 페이지로 이동하기'
        >
          <BsArrowLeft />
        </IconButton>
      </S.IconButtonContainer>
    </S.ErrorContainer>
  );
}
