import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';

import { STUDY_TABS } from '@constants/common/option';
import { ROUTES } from '@constants/path';

import useGetStudyDetail from '@hooks/study/useGetStudyDetail';

import TabMenu from '@components/_common/molecules/TabMenu';
import IconButton from '@components/_common/atoms/IconButton';
import { BsPlusLg } from 'react-icons/bs';

import Loading from '@pages/Loading';

import MoveTopButton from '@components/_common/atoms/MoveTopButton';
import S from './style';

export default function StudyDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studyId } = useParams<{ studyId: string }>();
  const { data, isLoading } = useGetStudyDetail(studyId);

  const getTabFromPath = () => {
    if (location.pathname.includes('/members')) return STUDY_TABS[1];
    if (location.pathname.includes('/info')) return STUDY_TABS[2];
    return STUDY_TABS[0];
  };

  const [selectedTab, setSelectedTab] = useState<(typeof STUDY_TABS)[number]>(getTabFromPath());

  useEffect(() => {
    setSelectedTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabNavigation = (tab: (typeof STUDY_TABS)[number]) => {
    if (tab === STUDY_TABS[0]) {
      navigate(ROUTES.STUDY.DETAIL({ studyId: data.id }));
    } else if (tab === STUDY_TABS[1]) {
      navigate(ROUTES.STUDY.MEMBERS({ studyId: data.id }));
    } else if (tab === STUDY_TABS[2]) {
      navigate(ROUTES.STUDY.INFO({ studyId: data.id }));
    }
  };

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <S.Header>
        <S.Name>{data.name}</S.Name>
        <S.ButtonWrapper>
          <IconButton
            shape='round'
            content='스페이스 생성하기'
            onClick={() => navigate(ROUTES.SPACE.CREATE({ studyId: data.id }))}
          >
            <BsPlusLg />
          </IconButton>
        </S.ButtonWrapper>
      </S.Header>
      <TabMenu
        tabs={STUDY_TABS}
        selectedTab={selectedTab}
        onTabChange={handleTabNavigation}
      />
      <Outlet />
      <MoveTopButton />
    </S.Container>
  );
}
