import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { useDropdown } from '@hooks/utils/useDropdown';

import UserProfile from '@components/_common/molecules/UserProfile';
import Icon from '@components/_common/atoms/Icon';
import Button from '@components/_common/atoms/Button';
import DropdownItem from '@components/_common/atoms/DropdownItem';

import { STUDY_EDIT_DROPDOWN_LABELS } from '@constants/common/option';
import { ROUTES } from '@constants/path';
import { UserData } from '@customTypes/user';
import { useModalStore } from '@stores/useModalStore';

import S from './style';

interface DescriptionHeaderProps {
  isLeader: boolean;
  isStudy: boolean;
  leader: UserData;
  studyId: number;
  name: string;
}

export default function DescriptionHeader({ isLeader, isStudy, leader, studyId, name }: DescriptionHeaderProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();
  const { isOpen, toggle, handleBlur, dropdownRef } = useDropdown();

  const handleItemSelect = (selectedItem: string) => {
    toggle();

    if (selectedItem === STUDY_EDIT_DROPDOWN_LABELS[0].label) {
      return navigate(ROUTES.STUDY.EDIT({ studyId }));
    }

    open('delete', {
      studyId: String(studyId),
      name,
      navigate: () => navigate(ROUTES.ROOT()),
    });
  };

  const handleLeaveClick = () => {
    open('leave', {
      studyId: String(studyId),
      name,
      navigate: () => navigate(ROUTES.ROOT()),
    });
  };

  return (
    <S.Header>
      <UserProfile
        user={leader}
        size='md'
      />

      {isLeader ? (
        <S.IconWrapper
          ref={dropdownRef}
          onBlur={handleBlur}
          tabIndex={-1}
        >
          <Icon
            size='md'
            color='950'
            onClick={toggle}
          >
            <BsThreeDotsVertical />
          </Icon>

          {isOpen && (
            <S.DropdownList>
              {STUDY_EDIT_DROPDOWN_LABELS.map(({ label, color }) => (
                <DropdownItem
                  key={label}
                  item={label}
                  size='lg'
                  color={color}
                  onClick={() => handleItemSelect(label)}
                />
              ))}
            </S.DropdownList>
          )}
        </S.IconWrapper>
      ) : (
        isStudy && (
          <Button
            color='triadic'
            size='md'
            onClick={handleLeaveClick}
          >
            스터디 나가기
          </Button>
        )
      )}
    </S.Header>
  );
}
