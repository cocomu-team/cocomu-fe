import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useGetSpaceList from '@hooks/space/useGetSpaceList';
import useScroll from '@hooks/utils/useScroll';

import LoadingSpinner from '@components/_common/atoms/LoadingSpinner';
import EmptyResult from '@components/_common/atoms/EmptyResult';
import InfiniteScrollSentinel from '@components/_common/molecules/InfiniteScrollSentinel';

import SpaceCard from '@components/Space/SpaceCard';
import SpaceFilterTab from '@pages/Space/SpaceList/SpaceFilterTab';

import { SPACE_STATUS_MAP_ID } from '@constants/common/option';
import { SpaceData } from '@customTypes/space';

import S from './style';

export default function SpaceList() {
  const [filters, setFilters] = useState({
    status: [],
    languageIds: [],
    joinable: undefined,
    keyword: '',
  });
  const { studyId } = useParams<{ studyId: string }>();

  const [keyword, setKeyword] = useState('');
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceData[]>([]);

  const getTransformedFilters = () => ({
    status: filters.status.length > 0 ? SPACE_STATUS_MAP_ID[filters.status[0]] : undefined,
    languageIds: filters.languageIds.length > 0 ? filters.languageIds.join(',') : undefined,
    joinable: filters.joinable,
    keyword: filters.keyword.trim() || undefined,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetSpaceList({
    studyId,
    params: getTransformedFilters(),
  });

  const { observerRef } = useScroll({
    nextPage: hasNextPage,
    fetchingNextPage: isFetchingNextPage,
    fetchNext: fetchNextPage,
  });

  useEffect(() => {
    if (data) {
      const newSpaces = data.pages.flatMap((page) => page.codingSpaces) || [];
      setFilteredSpaces(newSpaces);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;

  const handleRemove = (id: number) => {
    setFilteredSpaces((prev) => prev.filter((space) => space.id !== id));
  };

  return (
    <S.Container>
      <SpaceFilterTab
        studyId={studyId}
        filters={filters}
        keyword={keyword}
        setFilters={setFilters}
        setKeyword={setKeyword}
      />

      {filteredSpaces.length === 0 && <EmptyResult />}
      <S.SpaceListContainer>
        {filteredSpaces.map((space) => (
          <SpaceCard
            key={space.id}
            {...space}
            onRemove={handleRemove}
          />
        ))}
      </S.SpaceListContainer>

      <InfiniteScrollSentinel
        observerRef={observerRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </S.Container>
  );
}
