import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/path';
import { ACCESS_STATUS_MAP } from '@constants/common/option';

import { StudyData } from '@customTypes/study';

import { formatDate } from '@utils/formatDate';
import { stripHtmlTags } from '@utils/textParser';

import Tag from '@components/_common/atoms/Tag';
import UserProfile from '@components/_common/molecules/UserProfile';
import ImageTagList from '@components/_common/molecules/ImageTagList';
import TagList from '@components/_common/molecules/TagList';

import S from './style';

export default function StudyCard({
  id,
  joinable,
  name,
  status,
  languages,
  workbooks,
  description,
  currentUserCount,
  totalUserCount,
  createdAt,
  leader,
}: StudyData) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (joinable) {
      navigate(ROUTES.STUDY.PARTICIPATION({ studyId: id }));
      return;
    }
    navigate(ROUTES.STUDY.DETAIL({ studyId: id }));
  };

  return (
    <S.CardContainer onClick={handleCardClick}>
      <S.Header>
        <Tag color={status === 'PUBLIC' ? 'analogous' : 'triadic'}>{ACCESS_STATUS_MAP[status]}</Tag>
        <S.Date>{formatDate(createdAt)}</S.Date>
      </S.Header>

      <S.Body>
        <S.Title>{name}</S.Title>
        <S.Description>{stripHtmlTags(description)}</S.Description>
        <TagList
          items={workbooks}
          color='gray'
        />
        <ImageTagList items={languages} />
      </S.Body>

      <S.Footer>
        <UserProfile
          user={leader}
          size='sm'
        />
        <S.ParticipantInfo>
          <BsPerson size={20} />
          {`${currentUserCount} / ${totalUserCount}`}
        </S.ParticipantInfo>
      </S.Footer>
    </S.CardContainer>
  );
}
