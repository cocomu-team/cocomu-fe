import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/path';
import { MYPAGE_TAB } from '@constants/common/ui';

export default function useMyPageTab(userId: string) {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = () => (location.pathname.includes('/space') ? MYPAGE_TAB[1] : MYPAGE_TAB[0]);

  const [selectedTab, setSelectedTab] = useState<(typeof MYPAGE_TAB)[number]>(getTabFromPath());

  useEffect(() => {
    setSelectedTab(getTabFromPath());
  }, [location.pathname]);

  const handleNavigation = (tab: (typeof MYPAGE_TAB)[number]) => {
    if (tab === MYPAGE_TAB[0]) {
      navigate(ROUTES.MYPAGE.ROOT({ userId: Number(userId) }));
    }
    if (tab === MYPAGE_TAB[1]) {
      navigate(ROUTES.MYPAGE.SPACE_LIST({ userId: Number(userId) }));
    }
  };

  return { selectedTab, handleNavigation };
}
