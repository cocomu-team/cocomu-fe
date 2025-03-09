import { useParams } from 'react-router-dom';
import useGetStudyInfo from '@hooks/study/useGetStudyInfo';
import Loading from '@pages/Loading';
import StudyDescription from '@components/Study/StudyDescription';

export default function StudyInfo() {
  const { studyId } = useParams<{ studyId: string }>();
  const { data, isLoading } = useGetStudyInfo(studyId);

  if (isLoading) return <Loading />;

  return (
    <StudyDescription
      id={data.id}
      name={data.name}
      status={data.status}
      languages={data.languages}
      workbooks={data.workbooks}
      description={data.description}
      totalUserCount={data.totalUserCount}
      createdAt={data.createdAt}
      leader={data.leader}
    />
  );
}
