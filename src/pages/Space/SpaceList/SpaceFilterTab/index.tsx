import SelectDropdown from '@components/_common/molecules/SelectDropdown';
import ToggleButton from '@components/_common/atoms/ToggleButton';
import SearchInput from '@components/_common/atoms/SearchInput';
import useGetStudyDetail from '@hooks/study/useGetStudyDetail';
import { SPACE_STATUS } from '@constants/common/ui';
import S from './style';

interface Filters {
  status: number[];
  languageIds: number[];
  joinable: boolean;
}

interface FilterTabProps {
  studyId: string;
  filters: Filters;
  keyword: string;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setKeyword: (keyword: string) => void;
}

export default function SpaceFilterTab({ studyId, filters, keyword, setFilters, setKeyword }: FilterTabProps) {
  const { data } = useGetStudyDetail(studyId);

  return (
    <S.FilterTabContainer>
      <S.DropdownWrapper>
        <SelectDropdown
          items={[...SPACE_STATUS]}
          description='전체'
          values={filters.status}
          onSelect={(values) => setFilters((prev) => ({ ...prev, status: values }))}
        />
        <SelectDropdown
          items={data.languages}
          description='사용 언어'
          values={filters.languageIds}
          onSelect={(values) => setFilters((prev) => ({ ...prev, languageIds: values }))}
          isMultiSelect
        />
        <ToggleButton
          size='md'
          shape='round'
          isActive={filters.joinable}
          onToggle={(value) => setFilters((prev) => ({ ...prev, joinable: value }))}
        >
          참여 가능한 스터디 보기
        </ToggleButton>
      </S.DropdownWrapper>
      <SearchInput
        placeholder='제목을 검색해주세요'
        value={keyword}
        onChange={setKeyword}
        onSearch={() => setFilters((prev) => ({ ...prev, keyword }))}
      />
    </S.FilterTabContainer>
  );
}
