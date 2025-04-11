import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ACCESS_STATUS, ACCESS_STATUS_MAP_REVERSE } from '@constants/common/option';
import { CreateStudyData, StudyFormData } from '@customTypes/study';

import useEditStudy from '@hooks/study/useEditStudy';
import useGetStudyInfo from '@hooks/study/useGetStudyInfo';

import StudyForm from '@components/Study/StudyForm';
import Loading from '@pages/Loading';
import { FilterData } from '@customTypes/common';

export default function StudyEdit() {
  const { studyId } = useParams<{ studyId: string }>();
  const { data, isLoading } = useGetStudyInfo(studyId);
  const { editStudyMutate } = useEditStudy();

  const [selectedStatus, setSelectedStatus] = useState<(typeof ACCESS_STATUS)[number]['id']>(null);

  const [initialValues, setInitialValues] = useState<StudyFormData>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      setSelectedStatus(ACCESS_STATUS_MAP_REVERSE[data.status]);
      setInitialValues({
        name: data.name,
        password: '',
        totalUserCount: data.totalUserCount.toString(),
        languages: data.languages.map((language: FilterData) => language.id),
        workbooks: data.workbooks.map((workbook: FilterData) => workbook.id),
      });
      setDescription(data.description);
    }
  }, [data]);

  const handleSubmit = (formData: StudyFormData, content: string) => {
    const studyData: CreateStudyData = {
      name: formData.name,
      password: formData.password,
      languages: formData.languages,
      workbooks: formData.workbooks,
      totalUserCount: Number(formData.totalUserCount),
      description: content,
    };

    if (selectedStatus === ACCESS_STATUS[0].id) {
      editStudyMutate.mutate({ studyId, editStudyData: { ...studyData, publicStudy: true } });
    } else if (selectedStatus === ACCESS_STATUS[1].id) {
      editStudyMutate.mutate({ studyId, editStudyData: { ...studyData, publicStudy: false } });
    }
  };

  if (isLoading || !initialValues) return <Loading />;

  return (
    <StudyForm
      initialValues={initialValues}
      description={description}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      onSubmit={handleSubmit}
    />
  );
}
