import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import useGetUserInfo from '@hooks/user/useGetUserInfo';
import useMyPageTab from '@hooks/utils/useMyPageTab';
import useEditUser from '@hooks/user/useEditUser';

import TabMenu from '@components/_common/molecules/TabMenu';
import ProfileImage from '@components/_common/atoms/ProfileImage';
import Button from '@components/_common/atoms/Button';

import Loading from '@pages/Loading';

import { MYPAGE_TAB } from '@constants/common/ui';

import S from './style';

export default function MyPage() {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading } = useGetUserInfo(userId);
  const { editUserMutate } = useEditUser();
  const { selectedTab, handleNavigation } = useMyPageTab(userId!);

  const [nickname, setNickname] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const handleCancel = () => {
    setNickname(null);
    setProfileImageUrl(null);
  };

  const handleMyPageEdit = () => {
    editUserMutate.mutate({
      nickname: nickname ?? data.nickname,
      profileImageUrl: profileImageUrl ?? data.profileImageUrl,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <ProfileImage
            size='lg'
            src={profileImageUrl ?? data.profileImageUrl}
            onChange={setProfileImageUrl}
            upload={data.me}
            border
          />
          <S.UserName
            value={nickname ?? data.nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!data.me}
          />
        </S.UserWrapper>

        {data.me && (
          <S.ButtonWrapper>
            <Button
              size='md'
              color='white'
              shape='default'
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              size='md'
              color='primary'
              shape='default'
              onClick={handleMyPageEdit}
            >
              수정
            </Button>
          </S.ButtonWrapper>
        )}
      </S.Header>
      <TabMenu
        tabs={MYPAGE_TAB}
        selectedTab={selectedTab}
        onTabChange={handleNavigation}
      />
      <Outlet />
    </S.Container>
  );
}
