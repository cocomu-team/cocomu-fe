import FooterLabel from '@pages/MainLayout/Footer/FooterLabel';
import { LOGO_IMAGE } from '@constants/common/image';
import { MENU_LIST } from '@constants/common/option';
import S from './style';

export default function Footer() {
  const handleMenuClick = (index: number) => {
    if (index === 0) {
      /* console.log('이용약관 작성 중...'); */
    } else if (index === 1) {
      /* console.log('개인 정보 처리 방침 작성 중...'); */
    } else if (index === 2) {
      /* console.log('서비스 소개 작성 중...'); */
    } else {
      /* console.log('문의 게시판 개발 중...'); */
    }
  };

  return (
    <S.Container>
      <S.InfoSection>
        <S.LogoImg
          src={LOGO_IMAGE}
          alt='Logo'
        />
        <S.LabelContainer>
          <FooterLabel
            name='Email'
            description='deepdive@mail.com'
          />
          <FooterLabel
            name='TEL'
            description='010-XXXX-XXXX'
          />
          <FooterLabel name='© 2025 deepdive-cocomu. MIT License.' />
        </S.LabelContainer>
      </S.InfoSection>
      <S.MenuSection>
        {MENU_LIST.map((menuItem, index) => (
          <S.MenuText
            key={`menu-${index + 1}`}
            onClick={() => handleMenuClick(index)}
          >
            {menuItem}
          </S.MenuText>
        ))}
      </S.MenuSection>
    </S.Container>
  );
}
