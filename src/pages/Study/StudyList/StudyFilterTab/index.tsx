import { ACCESS_STATUS } from '@constants/common/option';
import { studyFilters } from '@customTypes/study';

import SelectDropdown from '@components/_common/molecules/SelectDropdown';
import ToggleButton from '@components/_common/atoms/ToggleButton';
import SearchInput from '@components/_common/atoms/SearchInput';

import useGetFilterOptions from '@hooks/study/useGetFilterOptions';
import S from './style';

interface FilterTabProps {
  filters: studyFilters;
  keyword: string;
  setFilters: React.Dispatch<React.SetStateAction<studyFilters>>;
  setKeyword: (keyword: string) => void;
}

export default function StudyFilterTab({ filters, keyword, setFilters, setKeyword }: FilterTabProps) {
  const { data, isLoading } = useGetFilterOptions();

  if (isLoading) return null;

  return (
    <S.FilterTabContainer>
      <S.DropdownWrapper>
        <SelectDropdown
          items={[...ACCESS_STATUS]}
          description='전체'
          values={filters.status}
          onSelect={(values) =>
            setFilters((prev) => ({
              ...prev,
              status: values,
            }))
          }
        />
        <SelectDropdown
          items={data.languages}
          description='사용 언어'
          values={filters.languages}
          onSelect={(values) =>
            setFilters((prev) => ({
              ...prev,
              languages: values,
            }))
          }
          isMultiSelect
        />
        <SelectDropdown
          items={data.workbooks}
          description='사용 플랫폼'
          values={filters.workbooks}
          onSelect={(values) =>
            setFilters((prev) => ({
              ...prev,
              workbooks: values,
            }))
          }
          isMultiSelect
        />
        <ToggleButton
          size='md'
          shape='round'
          isActive={filters.joinable}
          onToggle={(value) =>
            setFilters((prev) => ({
              ...prev,
              joinable: value,
            }))
          }
        >
          참여 가능한 스터디 보기
        </ToggleButton>
      </S.DropdownWrapper>
      <SearchInput
        placeholder='제목을 검색해주세요'
        value={keyword}
        onChange={setKeyword}
        onSearch={() =>
          setFilters((prev) => ({
            ...prev,
            keyword,
          }))
        }
      />
    </S.FilterTabContainer>
  );
}
