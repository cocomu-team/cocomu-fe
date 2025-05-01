import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PATH } from '@constants/path';

import Loading from '@pages/Loading';
import ErrorPage from '@pages/ErrorPage';
import MainLayout from '@pages/MainLayout';
import StudyList from '@pages/Study/StudyList';
import App from '../App';

const StudyCreate = lazy(() => import('@pages/Study/StudyCreate'));
const StudyEdit = lazy(() => import('@pages/Study/StudyEdit'));
const StudyParticipation = lazy(() => import('@pages/Study/StudyParticipation'));
const StudyDetail = lazy(() => import('@pages/Study/StudyDetail'));

const SpaceList = lazy(() => import('@pages/Space/SpaceList'));
const MemberList = lazy(() => import('@pages/Study/MemberList'));
const StudyInfo = lazy(() => import('@pages/Study/StudyInfo'));

const MyPage = lazy(() => import('@pages/MyPage'));
const MyStudyList = lazy(() => import('@pages/MyPage/MyStudyList'));
const MySpaceList = lazy(() => import('@pages/MyPage/MySpaceList'));

const OAuthCallback = lazy(() => import('@pages/OAuthCallback'));

const SpaceCreate = lazy(() => import('@pages/Space/SpaceCreate'));

const router = createBrowserRouter(
  [
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <StudyList /> },
            { path: PATH.STUDY.CREATE, element: <StudyCreate /> },
            { path: PATH.STUDY.EDIT, element: <StudyEdit /> },
            {
              path: PATH.STUDY.PARTICIPATION,
              element: <StudyParticipation />,
              children: [{ index: true, element: <StudyInfo /> }],
            },
            {
              path: PATH.STUDY.DETAIL,
              element: <StudyDetail />,
              children: [
                { index: true, element: <SpaceList /> },
                { path: PATH.STUDY.MEMBERS, element: <MemberList /> },
                { path: PATH.STUDY.INFO, element: <StudyInfo /> },
              ],
            },
            {
              path: PATH.MYPAGE.ROOT,
              element: <MyPage />,
              children: [
                { index: true, element: <MyStudyList /> },
                { path: PATH.MYPAGE.SPACE_LIST, element: <MySpaceList /> },
              ],
            },
            { path: PATH.OAUTH, element: <OAuthCallback /> },
            { path: PATH.SPACE.CREATE, element: <SpaceCreate /> },
          ],
        },
      ],
    },
  ],
  {
    basename: '/',
  },
);

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
