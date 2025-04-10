import { useEffect, useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { DEFAULT_PROFILE_IMAGE } from '@constants/common/image';
import useUploadUserImage from '@hooks/user/useUploadUserImage';
import Icon from '../Icon';
import S, { ProfileImageStyleProps } from './style';

export interface ProfileImageProps extends ProfileImageStyleProps {
  src?: string;
  upload?: boolean;
  onChange?: (imageUrl: string) => void;
}

export default function ProfileImage({
  src = DEFAULT_PROFILE_IMAGE,
  size = 'md',
  upload = false,
  border = false,
  onChange,
}: ProfileImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadUserImageMutate, isLoading } = useUploadUserImage();
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadUserImageMutate(file, {
      onSuccess: (uploadedImageUrl) => {
        setImageSrc(uploadedImageUrl);
        if (onChange) onChange(uploadedImageUrl);
      },
    });
  };

  return (
    <S.ProfileImageContainer
      size={size}
      border={border}
    >
      <S.ProfileImage
        src={imageSrc}
        alt='유저 프로필 이미지'
      />
      {upload && (
        <>
          <S.UploadButton
            size={size}
            onClick={handleUploadClick}
            disabled={isLoading}
          >
            <Icon
              size='md'
              color='50'
            >
              <BsCamera />
            </Icon>
          </S.UploadButton>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      )}
    </S.ProfileImageContainer>
  );
}
