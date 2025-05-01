import { axiosInstance } from '@api/axiosInstance';
import { END_POINTS_V1 } from '@constants/api';

import { CreateSpaceData, SpaceListData } from '@customTypes/space';

const spaceApi = {
  getList: async (studyId: string, params: SpaceListData) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.LIST(studyId), {
      params,
    });

    return data.result;
  },

  getWaitingPage: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.WAITING_PAGE(codingSpaceId));

    return data.result;
  },

  getStartingPage: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.STARTING_PAGE(codingSpaceId));

    return data.result;
  },

  getFeedBackPage: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.FEEDBACK_PAGE(codingSpaceId));

    return data.result;
  },

  getFinishPage: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.FINISH_PAGE(codingSpaceId));

    return data.result;
  },

  getFeedbackPage: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.get(END_POINTS_V1.CODING_SPACE.FEEDBACK_PAGE(codingSpaceId));

    return data.result;
  },

  create: async (createSpaceData: CreateSpaceData) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.CREATE, createSpaceData);

    return data.result;
  },

  join: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.JOIN(codingSpaceId));

    return data.result;
  },
};

export default spaceApi;
