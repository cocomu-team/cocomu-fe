import { useState, useEffect } from 'react';
import { useDraggable } from '@hooks/utils/useDraggable';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import IconButton from '@components/_common/atoms/IconButton';
import Button from '@components/_common/atoms/Button';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import TextEditor from '@components/_common/atoms/TextEditor';
import { generateTimer } from '@utils/timeUtils';
import { useSpaceDetail } from '@hooks/useSpace';
import { SpaceDetail } from '@customTypes/space';
import { ROUTES } from '@constants/path';
import { SPACE_NAV_BUTTON } from '@constants/constants';
import { useTestCaseOpen, useTestCaseSubmit, useSpaceStatusHandler } from './useSpaceDetailHandler';
import S from './style';

export default function SpaceDetail() {
  const navigate = useNavigate();

  const [spaceData, setSpacedata] = useState<SpaceDetail>();
  const [timer, settimer] = useState<number>(0);
  const [navButton, setNavbutton] = useState<string>(SPACE_NAV_BUTTON[0]);
  const [testCaseStatus, setTestcaseStatus] = useState<string>('DEFAULT');
  const [testCaseList, setTestCaseList] = useState([]);

  const { spaceId } = useParams();
  const { data, refetch } = useSpaceDetail({ spaceId });

  const { TestcaseSubmitHadler } = useTestCaseSubmit(spaceId, testCaseList, setTestCaseList);
  const { testcaseOpenHandler } = useTestCaseOpen(testCaseStatus, testCaseList, setTestCaseList, TestcaseSubmitHadler);
  const { spaceStartHandler } = useSpaceStatusHandler(spaceId, spaceData?.studyId, spaceData?.status);

  const {
    value: width,
    containerRef,
    handleMouseDown,
  } = useDraggable({
    direction: 'x',
    initialValue: 40,
    min: 10,
    max: 90,
    threshold: 5,
  });

  useEffect(() => {
    refetch();
    setSpacedata(data?.codingSpace);
    settimer(data?.codingSpace?.codingTime);
    setTestCaseList(spaceData?.testCase);
    switch (spaceData?.status) {
      case '대기':
        setNavbutton(SPACE_NAV_BUTTON[0]);
        setTestcaseStatus('DEFAULT');
        break;
      case '진행':
        setNavbutton(SPACE_NAV_BUTTON[1]);
        setTestcaseStatus('CUSTOM');
        break;
      case '피드백':
        setNavbutton(SPACE_NAV_BUTTON[2]);
        setTestcaseStatus('CUSTOM');
        break;
      case '종료':
        setNavbutton(SPACE_NAV_BUTTON[3]);
        setTestcaseStatus('DEFAULT');
        break;
      default:
        setNavbutton(SPACE_NAV_BUTTON[0]);
        setTestcaseStatus('DEFAULT');
        break;
    }
  }, [data, spaceData, refetch]);

  return (
    <S.PageContainer>
      <S.Navbar>
        <S.NavbarLeftcontent>
          <IconButton
            content='돌아가기'
            align='center'
            color='none'
            onClick={() => navigate(ROUTES.STUDY.DETAIL({ studyId: spaceData?.studyId }))}
          >
            <BsArrowLeft />
          </IconButton>
          <div>{spaceData?.name}</div>
        </S.NavbarLeftcontent>

        <S.NavbarRightcontent>
          <div>{generateTimer(timer * 60)}</div>
          {(spaceData?.hasLeaderRole || spaceData?.status === '종료') && (
            <Button
              size='md'
              color='triadic'
              onClick={spaceStartHandler}
            >
              {navButton}
            </Button>
          )}
        </S.NavbarRightcontent>
      </S.Navbar>

      <S.MainContent ref={containerRef}>
        <S.ProblemDescription>
          <TextEditor
            value={spaceData?.description}
            height='100%'
            readOnly
          />
          <S.ReferenceContainer>
            <div>출처</div>
            <div>{spaceData?.referenceUrl}</div>
          </S.ReferenceContainer>
        </S.ProblemDescription>
        <S.ResizablePanel>
          <S.ResizeButton onMouseDown={handleMouseDown} />
        </S.ResizablePanel>
        <S.RightContent width={100 - width}>
          <Outlet context={spaceData} />
        </S.RightContent>
      </S.MainContent>
      <S.Footer>
        <S.FooterItem>
          {['진행', '피드백'].includes(spaceData?.status) ? (
            <IconButton
              content='테스트 케이스 추가하기'
              align='center'
              shape='round'
              onClick={testcaseOpenHandler}
            >
              <BsPlus />
            </IconButton>
          ) : (
            <IconButton
              content='테스트 케이스 확인하기'
              align='center'
              shape='round'
              onClick={testcaseOpenHandler}
            />
          )}
        </S.FooterItem>
        {['진행', '피드백'].includes(spaceData?.status) && (
          <S.FooterItem>
            <Button
              size='md'
              color='analogous'
            >
              코드 실행
            </Button>
            <Button
              size='md'
              color='primary'
            >
              제출하기
            </Button>
          </S.FooterItem>
        )}
      </S.Footer>
    </S.PageContainer>
  );
}
