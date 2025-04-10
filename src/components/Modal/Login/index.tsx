import { BsXLg } from 'react-icons/bs';
import Icon from '@components/_common/atoms/Icon';
import { LoginProps } from '@customTypes/modal';
import { GITHUB_IMAGE, GOOGLE_IMAGE, KAKAO_IMAGE, LOGO_IMAGE } from '@constants/common/image';
import { GITHUB_AUTH_API_URL, GOOGLE_AUTH_API_URL, KAKAO_AUTH_API_URL } from '@constants/api';
import { useToastStore } from '@stores/useToastStore';
import S from './style';

export default function Login({ onClose }: LoginProps) {
  const { error } = useToastStore();

  const handleClick = (platform: string) => {
    const authUrls = {
      google: GOOGLE_AUTH_API_URL,
      github: GITHUB_AUTH_API_URL,
      kakao: KAKAO_AUTH_API_URL,
    };

    const authUrl = authUrls[platform];

    if (authUrl) {
      window.location.href = authUrl;
    } else {
      error('지원하지 않는 로그인 플랫폼입니다.');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <Icon
          onClick={onClose}
          size='md'
          color='950'
        >
          <BsXLg />
        </Icon>
      </S.Header>

      <S.Body>
        <S.Logo src={LOGO_IMAGE} />
        <S.WelcomeText>
          코코무에 오신 것을
          <br />
          환영합니다!
        </S.WelcomeText>

        <S.ButtonWrapper>
          <S.LoginButton
            buttonType='google'
            onClick={() => handleClick('google')}
          >
            <S.ButtonIcon src={GOOGLE_IMAGE} />
            <S.ButtonLabel>Google 로그인</S.ButtonLabel>
          </S.LoginButton>

          <S.LoginButton
            buttonType='github'
            onClick={() => handleClick('github')}
          >
            <S.ButtonIcon src={GITHUB_IMAGE} />
            <S.ButtonLabel>GitHub 로그인</S.ButtonLabel>
          </S.LoginButton>

          <S.LoginButton
            buttonType='kakao'
            onClick={() => handleClick('kakao')}
          >
            <S.ButtonIcon src={KAKAO_IMAGE} />
            <S.ButtonLabel>Kakao 로그인</S.ButtonLabel>
          </S.LoginButton>
        </S.ButtonWrapper>
      </S.Body>
    </S.Container>
  );
}
