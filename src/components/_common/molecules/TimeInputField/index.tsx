import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import S from './style';

interface TimeInputFieldProps {
  label?: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

export default function TimeInputField({ label, value, onChange }: TimeInputFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <S.Container>
        {label && <S.Label>{label}</S.Label>}

        <S.StyledTimePicker
          value={value}
          onChange={onChange}
          ampm={false}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </S.Container>
    </LocalizationProvider>
  );
}
