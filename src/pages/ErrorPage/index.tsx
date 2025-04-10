import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { ERROR_IMAGE } from '@constants/common/image';
import IconButton from '@components/_common/atoms/IconButton';

import S from './style';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <S.ErrorContainer>
      <img
        src={ERROR_IMAGE}
        alt='에러이미지'
      />
      <div>
        <IconButton
          onClick={handleNavigate}
          content='이전 페이지로 돌아가기'
        >
          <BsArrowLeft />
        </IconButton>
      </div>
    </S.ErrorContainer>
  );
}
