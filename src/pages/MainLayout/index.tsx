import { Outlet } from 'react-router-dom';

import useGetMyInfo from '@hooks/user/useGetMyInfo';
import { useUserStore } from '@stores/useUserStore';

import NavBar from '@components/NavBar';
import Loading from '@pages/Loading';

import S from './style';

export default function MainLayout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setUserId = useUserStore((state) => state.setUserId);
  const { data, isLoading } = useGetMyInfo({ enabled: isLoggedIn });

  if (isLoading) return <Loading />;

  if (data?.id) {
    setUserId(data.id);
  }

  return (
    <S.MainContainer>
      <NavBar
        isLoggedIn={isLoggedIn}
        user={data}
      />
      <S.Container>
        <Outlet />
      </S.Container>
    </S.MainContainer>
  );
}
