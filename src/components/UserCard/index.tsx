import UserProfile from '@components/_common/molecules/UserProfile';
import { formatDate } from '@utils/formatDate';
import { UserDetailData } from '@customTypes/user';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/path';
import S from './style';

export default function UserCard({
  id,
  nickname,
  profileImageUrl,
  role,
  joinedSpaceCount,
  joinedDate,
}: UserDetailData) {
  const user = { id, nickname, profileImageUrl };
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(ROUTES.MYPAGE.DETAIL({ userId: user.id }));
  };

  return (
    <S.CardContainer
      onClick={handleUserClick}
      role={role}
    >
      <UserProfile
        user={user}
        size='md'
      />
      <S.Info>
        <S.Text role={role}>{role}</S.Text>
        <S.Text>{`참여한 스페이스 수 : ${joinedSpaceCount}`}</S.Text>
        <S.Text>{`가입일 : ${formatDate(joinedDate)}`}</S.Text>
      </S.Info>
    </S.CardContainer>
  );
}
