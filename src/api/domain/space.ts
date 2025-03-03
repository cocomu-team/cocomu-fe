import { axiosInstance } from '@api/axiosInstance';
import { END_POINTS_V1 } from '@constants/api';
import { SpaceData, SpaceListParams, CreateSpaceData, TestCaseIO } from '@customTypes/space';

export const spaceApi = {
  getInfo: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.PAGE(codingSpaceId));

    return data.result;
  },

  getTab: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.TAB(codingSpaceId));

    return data.result;
  },

  getAllTabs: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.ALL_TABS(codingSpaceId));

    return data.result;
  },

  create: async (createSpaceData: CreateSpaceData) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.CREATE, createSpaceData);

    return data.result;
  },

  start: async (codingSpaceId: string, studyId: string) => {
    await axiosInstance.post(END_POINTS_V1.CODING_SPACE.START(codingSpaceId), studyId);

    return codingSpaceId;
  },

  updateTestCase: async (codingSpaceId: string, testCases: TestCaseIO[]) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.TEST_CASE_UPDATE(codingSpaceId), testCases);

    return data.result;
  },

  getSpaceList: async (studyId: string, params?: SpaceListParams): Promise<SpaceData[]> => {
    const queryParams = params ? { ...params } : {};

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === null || queryParams[key] === undefined) delete queryParams[key];
    });

    const { data } = await axiosInstance.get(END_POINTS_V1.STUDY.SPACE_LIST(studyId), {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      /* paramsSerializer: {
        serialize: (param) => {
          const searchParams = new URLSearchParams();

          Object.entries(param).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((item) => searchParams.append(`${key}[]`, item));
            } else {
              searchParams.append(key, String(value));
            }
          });

          return searchParams.toString();
        },
      }, */
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    });
    const { lastIndex = 0 } = params;

    const startIndex = params?.lastIndex ?? 0;
    const limit = lastIndex === 0 ? 5 : 10;

    return data.result.slice(startIndex, startIndex + limit);
  },
};

export default spaceApi;
