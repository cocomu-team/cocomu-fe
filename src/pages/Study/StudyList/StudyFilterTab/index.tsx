import { ACCESS_STATUS } from '@constants/common/option';
import { studyFilters } from '@customTypes/study';

import SelectDropdown from '@components/_common/molecules/SelectDropdown';
import ToggleButton from '@components/_common/atoms/ToggleButton';
import SearchInput from '@components/_common/atoms/SearchInput';

import useGetFilterOptions from '@hooks/study/useGetFilterOptions';
import S from './style';

interface FilterTabProps {
  filters: studyFilters;
  setFilters: React.Dispatch<React.SetStateAction<studyFilters>>;
}

export default function StudyFilterTab({ filters, setFilters }: FilterTabProps) {
  const { data, isLoading } = useGetFilterOptions();

  if (isLoading) return null;

  const changeStudyFilters = <K extends keyof studyFilters>(key: K, value: studyFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <S.FilterTabContainer>
      <S.DropdownWrapper>
        <SelectDropdown
          items={[...ACCESS_STATUS]}
          description='전체'
          values={filters.status}
          onSelect={(values) => changeStudyFilters('status', values)}
        />
        <SelectDropdown
          items={data.languages}
          description='사용 언어'
          values={filters.languages}
          onSelect={(values) => changeStudyFilters('languages', values)}
          isMultiSelect
        />
        <SelectDropdown
          items={data.workbooks}
          description='사용 플랫폼'
          values={filters.workbooks}
          onSelect={(values) => changeStudyFilters('workbooks', values)}
          isMultiSelect
        />
        <ToggleButton
          size='md'
          shape='round'
          isActive={filters.joinable}
          onToggle={(value) => changeStudyFilters('joinable', value)}
        >
          참여 가능한 스터디 보기
        </ToggleButton>
      </S.DropdownWrapper>
      <SearchInput
        placeholder='제목을 검색해주세요'
        value={filters.keyword}
        onChange={(value) => changeStudyFilters('keyword', value)}
        onSearch={() => changeStudyFilters('keyword', filters.keyword)}
      />
    </S.FilterTabContainer>
  );
}
