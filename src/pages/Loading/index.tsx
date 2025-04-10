import { LOADING_IMAGE } from '@constants/common/image';
import S from './style';

export default function Loading() {
  return (
    <S.LoadingContainer>
      <S.LoadingImage
        src={LOADING_IMAGE}
        alt='로딩 이미지'
      />
    </S.LoadingContainer>
  );
}
