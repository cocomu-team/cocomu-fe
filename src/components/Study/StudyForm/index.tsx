import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/utils/useForm';
import useGetFilterOptions from '@hooks/study/useGetFilterOptions';

import {
  validateJudges,
  validateLanguages,
  validateName,
  validatePassword,
  validateTotalUserCount,
} from '@utils/validators/studyValidators';

import { ACCESS_STATUS } from '@constants/common/option';

import { StudyFormData } from '@customTypes/study';

import InputField from '@components/_common/molecules/InputField';
import InputDropdown from '@components/_common/molecules/InputDropdown';
import RadioField from '@components/_common/molecules/RadioField';
import StepHeader from '@components/_common/molecules/StepHeader';
import TextEditor from '@components/_common/atoms/TextEditor';
import Button from '@components/_common/atoms/Button';

import Loading from '@pages/Loading';

import S from './style';

interface StudyFormProps {
  initialValues?: StudyFormData;
  description?: string;
  selectedStatus: (typeof ACCESS_STATUS)[number]['id'];
  setSelectedStatus: Dispatch<SetStateAction<(typeof ACCESS_STATUS)[number]['id']>>;
  onSubmit: (formData: StudyFormData, description: string) => void;
}

export default function StudyForm({
  initialValues,
  description,
  selectedStatus,
  setSelectedStatus,
  onSubmit,
}: StudyFormProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFilterOptions();

  const [content, setContent] = useState(description || '');

  const { formData, register, registerSelect, handleSubmit } = useForm({
    initialValues: {
      name: { value: initialValues?.name || '', validate: { onBlur: validateName.onBlur } },
      password: { value: initialValues?.password || '', validate: { onBlur: validatePassword.onBlur } },
      totalUserCount: {
        value: initialValues?.totalUserCount || '',
        validate: { onBlur: validateTotalUserCount.onBlur },
      },
      languages: { value: initialValues?.languages || [], validate: { onBlur: validateLanguages.onBlur } },
      workbooks: { value: initialValues?.workbooks || [], validate: { onBlur: validateJudges.onBlur } },
    },
  });

  if (isLoading) return <Loading />;

  return (
    <S.Container
      onSubmit={handleSubmit(
        async () => {
          onSubmit(formData, content);
        },
        selectedStatus === ACCESS_STATUS[0].id ? ['password'] : [],
      )}
    >
      <S.Section>
        <StepHeader
          step={1}
          description='스터디 정보를 입력해주세요.'
        />
        <RadioField
          name='access_status'
          options={[...ACCESS_STATUS]}
          selectedValue={selectedStatus}
          onChange={setSelectedStatus}
        />
        <S.InputWrapper>
          <InputField
            type='password'
            label='암호'
            disabled={selectedStatus === ACCESS_STATUS[0].id}
            {...register('password')}
          />
          <InputField
            label='모집 인원'
            placeholder='2명 ~ 50명 이하'
            {...register('totalUserCount')}
          />
          <InputDropdown
            label='스터디 사용 언어'
            description='사용 언어'
            items={data.languages}
            isMultiSelect
            {...registerSelect('languages')}
          />
          <InputDropdown
            label='스터디 사용 플랫폼'
            description='백준, 프로그래머스 ...'
            items={data.workbooks}
            isMultiSelect
            {...registerSelect('workbooks')}
          />
        </S.InputWrapper>
      </S.Section>

      <S.Section>
        <StepHeader
          step={2}
          description='스터디에 대해 소개해주세요.'
        />
        <InputField
          label='스터디 이름'
          placeholder='스터디 이름을 입력해주세요'
          {...register('name')}
        />
        <TextEditor
          label='스터디 소개'
          height='600px'
          value={content}
          onChange={setContent}
        />
      </S.Section>

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
          {initialValues ? '수정하기' : '생성하기'}
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}
