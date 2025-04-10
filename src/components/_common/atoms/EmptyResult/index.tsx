import { EMPTY_RESULT_IMAGES } from '@constants/common/image';
import S from './style';

interface EmptyResultProps {
  isStudy?: boolean;
}

export default function EmptyResult({ isStudy }: EmptyResultProps) {
  return (
    <S.EmptyWrapper>
      <S.EmptyContent>
        <img
          src={isStudy ? EMPTY_RESULT_IMAGES[0] : EMPTY_RESULT_IMAGES[1]}
          alt='Empty results found'
        />
      </S.EmptyContent>
    </S.EmptyWrapper>
  );
}
