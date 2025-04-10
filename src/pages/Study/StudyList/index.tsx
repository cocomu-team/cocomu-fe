import { useState } from 'react';
import useGetStudyList from '@hooks/study/useGetStudyList';
import { BANNER_IMAGES } from '@constants/common/image';
import { ACCESS_STATUS_MAP_ID, STUDY_PAGE_SIZE } from '@constants/common/ui';
import { StudyData } from '@customTypes/study';
import PageButton from 'src/components/_common/molecules/PageButton';
import StudyCard from 'src/components/Study/StudyCard';
import Loading from '@pages/Loading';
import Slider from '@components/Slider';
import MoveTopButton from '@components/_common/atoms/MoveTopButton';
import EmptyResult from '@components/_common/atoms/EmptyResult';
import StudyFilterTab from './StudyFilterTab';

import S from './style';

export default function StudyList() {
  const [filters, setFilters] = useState({
    page: 1,
    status: [],
    languages: [],
    workbooks: [],
    joinable: undefined,
    keyword: '',
  });
  const [keyword, setKeyword] = useState('');

  const getTransformedFilters = () => ({
    page: filters.page,
    status: filters.status.length > 0 ? ACCESS_STATUS_MAP_ID[filters.status[0]] : undefined,
    languages: filters.languages.length > 0 ? filters.languages.join(',') : undefined,
    workbooks: filters.workbooks.length > 0 ? filters.workbooks.join(',') : undefined,
    joinable: filters.joinable,
    keyword: filters.keyword.trim() || undefined,
  });

  const { data, isLoading } = useGetStudyList(getTransformedFilters());

  return (
    <S.Container>
      <Slider images={BANNER_IMAGES} />
      <StudyFilterTab
        filters={filters}
        keyword={keyword}
        setFilters={setFilters}
        setKeyword={setKeyword}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.studies.length === 0 && <EmptyResult isStudy />}
          <S.Body>
            {data.studies.map((study: StudyData) => (
              <StudyCard
                key={study.id}
                {...study}
              />
            ))}
          </S.Body>
          {data?.studies.length > 0 && (
            <S.Footer>
              <PageButton
                totalPage={Math.ceil(data.totalStudyCount / STUDY_PAGE_SIZE)}
                currentPage={filters.page}
                setPage={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            </S.Footer>
          )}
        </>
      )}
      <MoveTopButton />
    </S.Container>
  );
}
