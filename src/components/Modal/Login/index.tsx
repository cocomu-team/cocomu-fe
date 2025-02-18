import { BsXLg } from 'react-icons/bs';
import COCOMU_LOGO from '@assets/Image/cocomu-logo.png';
import GOOGLE_LOGO from '@assets/Image/google-logo.png';
import GITHUB_LOGO from '@assets/Image/github-logo.png';
import KAKAO_LOGO from '@assets/Image/kakao-logo.png';
import Icon from '@components/_common/atoms/Icon';
import { useModalStore } from '@stores/useModalStore';
import S from './style';

export default function Login() {
  const handleClick = (platform: string) => {
    /* 각 플랫폼으로 로그인 클릭 시 발생하는 이벤트 */
    console.log(`please access your ${platform}`);
  };
  const { close } = useModalStore();

  return (
    <S.LoginModalContainer>
      <S.Header onClick={close}>
        <Icon
          icon={
            <BsXLg
              size={20}
              color='50'
            />
          }
        />
      </S.Header>
      <S.Body>
        <S.Logo src='https://cdn.cocomu.co.kr/images/default/Logo.png' />
        <S.Text>
          <S.IntroduceLabel>코코무에 오신 것을</S.IntroduceLabel>
          <S.IntroduceLabel>환영합니다!</S.IntroduceLabel>
        </S.Text>
        <S.LoginButtonContainer>
          <S.LoginButton
            buttonType='google'
            onClick={() => handleClick('google')}
          >
            <S.ButtonIcon src='https://cdn.cocomu.co.kr/images/default/google.png' />
            <S.ButtonLabel>Google 로그인</S.ButtonLabel>
          </S.LoginButton>
          <S.LoginButton
            buttonType='github'
            onClick={() => handleClick('github')}
          >
            <S.ButtonIcon src='https://cdn.cocomu.co.kr/images/default/github.png' />
            <S.ButtonLabel>GitHub 로그인</S.ButtonLabel>
          </S.LoginButton>
          <S.LoginButton
            buttonType='kakao'
            onClick={() => handleClick('kakao')}
          >
            <S.ButtonIcon src='https://cdn.cocomu.co.kr/images/default/kakaotalk.png' />
            <S.ButtonLabel>Kakao 로그인</S.ButtonLabel>
          </S.LoginButton>
        </S.LoginButtonContainer>
      </S.Body>
    </S.LoginModalContainer>
  );
}
