import { useQuery } from '@tanstack/react-query';

import QUERY_KEYS from '@constants/queryKeys';
import userApi from '@api/domain/user';

export default function useGetUserInfo({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_DETAIL],
    queryFn: async () => userApi.get(),
    enabled,
  });
}
