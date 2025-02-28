import { BsSearch } from 'react-icons/bs';
import Icon from '../Icon';
import S from './style';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchInput({ placeholder = '', value, onChange, onSearch }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <S.Container>
      <S.SearchIcon onClick={onSearch}>
        <Icon
          size='md'
          color='700'
        >
          <BsSearch />
        </Icon>
      </S.SearchIcon>
      <S.Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </S.Container>
  );
}
