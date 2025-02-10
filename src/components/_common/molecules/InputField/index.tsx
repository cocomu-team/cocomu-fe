import { ComponentProps, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import S from './style';

interface InputFieldProps extends ComponentProps<'input'> {
  label?: string;
  description?: string;
  error?: string;
}

export default function InputField({ type = 'text', label, description, error, ...props }: InputFieldProps) {
  const [isVisible, setIsVisible] = useState(type !== 'password');

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <S.InputContainer>
      {label && <S.Label disabled={props.disabled}>{label}</S.Label>}

      <S.InputWrapper>
        <S.Input
          type={isVisible ? 'text' : type}
          placeholder={description}
          isError={!!error}
          {...props}
        />
        {type === 'password' && props.value && (
          <S.Icon onClick={toggleVisibility}>{isVisible ? <BsEye size={16} /> : <BsEyeSlash size={16} />}</S.Icon>
        )}
      </S.InputWrapper>

      {error && <S.ErrorText role='alert'>{error}</S.ErrorText>}
    </S.InputContainer>
  );
}
