import { axiosInstance } from '@api/axiosInstance';
import { END_POINTS_V1 } from '@constants/api';

import { CreateSpaceData, SpaceListData, TestCaseIO, Execution } from '@customTypes/space';

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

  enter: async (codingSpaceId: string) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.ENTER(codingSpaceId));

    return data.result;
  },

  start: async (codingSpaceId: string) => {
    await axiosInstance.post(END_POINTS_V1.CODING_SPACE.START(codingSpaceId));
  },

  feedback: async (codingSpaceId: string) => {
    await axiosInstance.post(END_POINTS_V1.CODING_SPACE.FEEDBACK(codingSpaceId));
  },

  finish: async (codingSpaceId: string) => {
    await axiosInstance.post(END_POINTS_V1.CODING_SPACE.FINISH(codingSpaceId));
  },

  updateTestCase: async (codingSpaceId: string, testCases: TestCaseIO) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.TEST_CASE_UPDATE(codingSpaceId), testCases);

    return data.result;
  },

  delete: async (codingSpaceId: string) => {
    await axiosInstance.delete(END_POINTS_V1.CODING_SPACE.DELETE(codingSpaceId));
  },

  deleteTestCase: async (codingSpaceId: string, testCasesId: string) => {
    const { data } = await axiosInstance.delete(
      END_POINTS_V1.CODING_SPACE.TEST_CASE_DELETE(codingSpaceId, testCasesId),
    );

    return data.result;
  },

  excution: async (excution: Execution) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.EXECUTOR.EXECUTION, excution);

    return data;
  },

  codesave: async (codingSpaceId: string, code: { code: string }) => {
    const { data } = await axiosInstance.post(END_POINTS_V1.CODING_SPACE.SAVE(codingSpaceId), code);

    return data.result;
  },
};

export default spaceApi;
