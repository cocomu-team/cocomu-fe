import { BsFillCaretUpFill } from 'react-icons/bs';
import S from './style';
import { scrollToTop } from '../../../../utils/scrollToTop';

export default function MoveTopButton() {
  return (
    <S.ScrollButton onClick={scrollToTop}>
      <S.IconContainer>
        <BsFillCaretUpFill
          size={25}
          color='slateBlue'
        />
      </S.IconContainer>
      <S.ButtonText>TOP</S.ButtonText>
    </S.ScrollButton>
  );
}
