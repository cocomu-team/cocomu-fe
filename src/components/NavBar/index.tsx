import { useNavigate } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';

import useCheckAuth from '@hooks/utils/useCheckAuth';
import { useDropdown } from '@hooks/utils/useDropdown';

import ProfileImage from '@components/_common/atoms/ProfileImage';
import Icon from '@components/_common/atoms/Icon';
import Button from '@components/_common/atoms/Button';
import DropdownItem from '@components/_common/atoms/DropdownItem';

import { UserData } from '@customTypes/user';

import { ROUTES } from '@constants/path';
import { LOGO_IMAGE } from '@constants/common/image';
import { NAVBAR_DROPDOWN_LABELS } from '@constants/common/ui';
import { ACCESS_TOKEN_KEY } from '@constants/api';

import { useModalStore } from '@stores/useModalStore';

import S from './style';

interface NavbarProps {
  isLoggedIn: boolean;
  user?: UserData;
}

export default function NavBar({ isLoggedIn, user }: NavbarProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();
  const { checkAuth } = useCheckAuth();
  const { isOpen, toggle, handleBlur, dropdownRef } = useDropdown();

  const handleStudyCreate = () => {
    checkAuth(() => navigate(ROUTES.STUDY.CREATE()));
  };

  const handleItemSelect = (event: React.MouseEvent, selectedItem: string) => {
    event.stopPropagation();
    toggle();

    if (selectedItem === NAVBAR_DROPDOWN_LABELS[0].label) {
      return navigate(ROUTES.MYPAGE.ROOT({ userId: user.id }));
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = ROUTES.ROOT();
  };

  return (
    <S.Container>
      <S.LogoImage
        src={LOGO_IMAGE}
        alt='Logo'
        onClick={() => navigate(ROUTES.ROOT())}
      />

      <S.NavItems>
        <Button
          onClick={handleStudyCreate}
          color='primary'
          size='lg'
          shape='round'
        >
          스터디 모집하기
        </Button>

        {isLoggedIn ? (
          <S.ProfileSection
            ref={dropdownRef}
            onBlur={handleBlur}
            tabIndex={-1}
            onClick={toggle}
          >
            <ProfileImage
              src={user.profileImageUrl}
              size='x_sm'
            />
            <Icon
              size='sm'
              color='950'
            >
              <BsChevronDown />
            </Icon>

            {isOpen && (
              <S.DropdownList>
                {NAVBAR_DROPDOWN_LABELS.map(({ label, color }) => (
                  <DropdownItem
                    key={label}
                    item={label}
                    size='lg'
                    color={color}
                    onClick={(e) => handleItemSelect(e, label)}
                  />
                ))}
              </S.DropdownList>
            )}
          </S.ProfileSection>
        ) : (
          <S.LoginButton onClick={() => open('login')}>로그인</S.LoginButton>
        )}
      </S.NavItems>
    </S.Container>
  );
}
