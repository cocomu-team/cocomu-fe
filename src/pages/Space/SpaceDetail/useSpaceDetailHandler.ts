import { useModalStore } from '@stores/useModalStore';
import { useTestcaseUpdate } from '@hooks/useTestcase';
import { useSpaceStart } from '@hooks/useSpace';

export function useTestCaseOpen(testCaseStatus, testCaseList, setTestCaseList, TestcaseSubmitHadler) {
  const { open } = useModalStore();

  const testcaseOpenHandler = () => {
    open('testCase', {
      status: testCaseStatus,
      testCases: testCaseList,
      setTestCaseList,
      onsubmit: TestcaseSubmitHadler,
    });
  };

  return { testcaseOpenHandler };
}

export function useTestCaseSubmit(spaceId, testCaseList, setTestCaseList) {
  const { testCaseUpdateMutate } = useTestcaseUpdate();

  const TestcaseSubmitHadler = async () => {
    const filteredTestCases = testCaseList
      ?.filter((testCase) => testCase.type !== 'BASE')
      .map(({ input, output }) => ({ input, output }));
    const newTestCases = await testCaseUpdateMutate.mutateAsync({ spaceId, testCase: filteredTestCases });
    const BaseTestCase = testCaseList?.filter((testCase) => testCase.type === 'BASE');
    const FetchTestCaseList = BaseTestCase.concat(newTestCases);
    setTestCaseList(FetchTestCaseList);
  };

  return { TestcaseSubmitHadler };
}

export function useSpaceStatusHandler(spaceId, studyId, status) {
  const { spaceStartMutate } = useSpaceStart();
  const spaceStartHandler = () => {
    if (status === '대기') {
      spaceStartMutate.mutate({ spaceId, studyId });
    }
  };
  return { spaceStartHandler };
}
