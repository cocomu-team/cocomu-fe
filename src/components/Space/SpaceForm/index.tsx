import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { useForm } from '@hooks/utils/useForm';
import useGetStudyDetail from '@hooks/study/useGetStudyDetail';

import {
  validateLanguage,
  validateName,
  validateReferenceUrl,
  validateTotalUserCount,
} from '@utils/validators/spaceValidators';

import { SPACE_MEMBER_OPTIONS } from '@constants/common/ui';
import { SpaceFormData, TestCaseIO } from '@customTypes/space';

import InputField from '@components/_common/molecules/InputField';
import InputDropdown from '@components/_common/molecules/InputDropdown';
import TimeInputField from '@components/_common/molecules/TimeInputField';
import TestCaseList from '@components/_common/molecules/TestCaseList';
import StepHeader from '@components/_common/molecules/StepHeader';
import TextEditor from '@components/_common/atoms/TextEditor';
import Button from '@components/_common/atoms/Button';

import Loading from '@pages/Loading';

import S from './style';

interface SpaceFormProps {
  studyId: string;
  initialValues?: SpaceFormData;
  description?: string;
  onSubmit: (spaceFormData: SpaceFormData, testCases: TestCaseIO[]) => void;
}

export default function SpaceForm({ studyId, initialValues, description, onSubmit }: SpaceFormProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetStudyDetail(studyId);

  const [content, setContent] = useState(description || '');
  const [selectedTime, setSelectedTime] = useState<Dayjs>(null);
  const [localTestCases, setLocalTestCases] = useState([]);

  const { formData, register, registerSelect, handleSubmit } = useForm({
    initialValues: {
      name: { value: initialValues?.name || '', validate: { onBlur: validateName.onBlur } },
      workbookUrl: { value: initialValues?.workbookUrl || '', validate: { onBlur: validateReferenceUrl.onBlur } },
      totalUserCount: {
        value: initialValues?.totalUserCount || [],
        validate: { onBlur: validateTotalUserCount.onBlur },
      },
      languageId: {
        value: initialValues?.languageId || [],
        validate: { onBlur: validateLanguage.onBlur },
      },
    },
  });

  const handleAddTestCase = () => {
    setLocalTestCases((prevList) => [...prevList, { testCaseId: uuidv4(), type: 'CUSTOM', input: '', output: '' }]);
  };

  const handleRemoveTestCase = (id: string | number) => {
    setLocalTestCases((prevList) => prevList.filter((testCase) => testCase.testCaseId !== id));
  };

  const handleInputChange = (id: string | number, field: 'input' | 'output', value: string) => {
    setLocalTestCases((prevList) =>
      prevList.map((item) => (item.testCaseId === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleFormSubmit = async () => {
    const spaceFormData: SpaceFormData = {
      name: formData.name,
      timerTime: selectedTime.format('HH:mm'),
      workbookUrl: formData.workbookUrl,
      totalUserCount: formData.totalUserCount as number[],
      languageId: formData.languageId as number[],
      description: content,
    };

    const testCases: TestCaseIO[] = localTestCases.map(({ input, output }) => ({ input, output }));

    onSubmit(spaceFormData, testCases);
  };

  if (isLoading) return <Loading />;

  return (
    <S.Container onSubmit={handleSubmit(handleFormSubmit)}>
      <S.Section>
        <StepHeader
          step={1}
          description='코딩 스페이스의 정보를 입력해주세요.'
        />
        <S.InputWrapper>
          <InputDropdown
            label='스페이스 인원'
            description='2명 ~ 4명 이하'
            items={[...SPACE_MEMBER_OPTIONS]}
            {...registerSelect('totalUserCount')}
          />
          <TimeInputField
            label='스페이스 문제 풀이 제한시간'
            value={selectedTime}
            onChange={setSelectedTime}
          />
          <InputDropdown
            label='스페이스 사용 언어'
            description='사용 언어'
            items={data.languages}
            {...registerSelect('languageId')}
          />
          <InputField
            label='문제 출처'
            {...register('workbookUrl')}
          />
        </S.InputWrapper>
      </S.Section>

      <S.Section>
        <StepHeader
          step={2}
          description='코딩 스페이스에서 풀어볼 문제를 작성해주세요.'
        />
        <InputField
          label='문제 제목'
          {...register('name')}
        />
        <TextEditor
          label='문제 내용'
          height='600px'
          value={content}
          onChange={setContent}
        />
      </S.Section>

      <TestCaseList
        testCases={localTestCases}
        handleInputChange={handleInputChange}
        handleRemoveTestCase={handleRemoveTestCase}
        handleAddTestCase={handleAddTestCase}
        isEditable
      />

      <S.ButtonWrapper>
        <Button
          size='lg'
          color='white'
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
        <Button
          size='lg'
          color='primary'
          type='submit'
        >
          생성하기
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}
