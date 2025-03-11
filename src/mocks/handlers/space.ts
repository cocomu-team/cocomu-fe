import { http, HttpResponse } from 'msw';
import {
  completeSpaceErrorResponse,
  completeSpaceResponse,
  updateTestCaseErrorResponse,
  updateTestCaseResponse,
} from '@mocks/data/space';
import { BASE_URL, END_POINTS_V1, HTTP_STATUS_CODE } from '@constants/api';
import { CreateSpaceData, TestCaseIO } from '@customTypes/space';
import { joinSpaceErrorResponse, joinSpaceResponse } from '@mocks/data/space/joinSpaceData';
import { getSpaceListErrorResponse, getSpaceListResponse } from '@mocks/data/space/getSpaceListData';
import { enterSpaceErrorResponse, enterSpaceResponse } from '@mocks/data/space/enterSpaceData';
import { getWaitingPageErrorResponse, getWaitingPageResponse } from '@mocks/data/space/getWaitingPageData';
import { createSpaceErrorResponse, createSpaceResponse } from '@mocks/data/space/createSpaceData';
import { startSpaceErrorResponse, startSpaceResponse } from '@mocks/data/space/startSpaceData';

export const spaceHandlers = [
  http.get(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.LIST(':studyId')}`, async ({ params }) => {
    const { studyId } = params;

    if (!studyId) {
      return new HttpResponse(JSON.stringify(getSpaceListErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(getSpaceListResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.CREATE}`, async ({ request }) => {
    const body = (await request.json()) as CreateSpaceData;

    if (
      !body.studyId ||
      !body.name ||
      !body.timerTime ||
      !body.workbookUrl ||
      !body.totalUserCount ||
      !body.languageId ||
      !body.description ||
      !body.testcases
    ) {
      return new HttpResponse(JSON.stringify(createSpaceErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(createSpaceResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.JOIN(':codingSpaceId')}`, async ({ params }) => {
    const { codingSpaceId } = params;

    if (!codingSpaceId) {
      return new HttpResponse(JSON.stringify(joinSpaceErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(joinSpaceResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.ENTER(':codingSpaceId')}`, async ({ params }) => {
    const { codingSpaceId } = params;

    if (!codingSpaceId) {
      return new HttpResponse(JSON.stringify(enterSpaceErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(enterSpaceResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.WAITING_PAGE(':codingSpaceId')}`, async ({ params }) => {
    const { codingSpaceId } = params;

    if (!codingSpaceId) {
      return new HttpResponse(JSON.stringify(getWaitingPageErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(getWaitingPageResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.START(':codingSpaceId')}`, async ({ params }) => {
    const { codingSpaceId } = params;

    if (!codingSpaceId) {
      return new HttpResponse(JSON.stringify(startSpaceErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(startSpaceResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(
    `${BASE_URL}${END_POINTS_V1.CODING_SPACE.TEST_CASE_UPDATE(':codingSpaceId')}`,
    async ({ params, request }) => {
      const { codingSpaceId } = params;
      const body = (await request.json()) as TestCaseIO[];

      if (!codingSpaceId || !body) {
        return new HttpResponse(JSON.stringify(updateTestCaseErrorResponse), {
          status: HTTP_STATUS_CODE.BAD_REQUEST,
        });
      }

      return new HttpResponse(JSON.stringify(updateTestCaseResponse), {
        status: HTTP_STATUS_CODE.SUCCESS,
      });
    },
  ),
  http.get(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.LIST(':studyId')}`, async ({ request, params }) => {
    const { studyId } = params;
    if (!studyId || Number.isNaN(Number(studyId))) {
      return new HttpResponse(JSON.stringify(getSpaceListErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    const url = new URL(request.url);
    const lastId = parseInt(url.searchParams.get('lastId'), 10) || 0;
    const limit = 20;
    const totalSpaceData = getSpaceListResponse.result.codingSpaces;

    let filteredData = totalSpaceData;
    if (lastId) {
      filteredData = totalSpaceData.filter((item) => item.id > lastId);
    }

    const partialSpaceData = filteredData.slice(0, limit);

    const response = {
      ...getSpaceListResponse,
      result: partialSpaceData,
    };

    return new HttpResponse(JSON.stringify(response), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),

  http.post(`${BASE_URL}${END_POINTS_V1.CODING_SPACE.FINISH(':codingSpaceId')}`, async ({ params, request }) => {
    const body = await request.json();
    const { codingSpaceId } = params;

    if (!body || !codingSpaceId) {
      return new HttpResponse(JSON.stringify(completeSpaceErrorResponse), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(completeSpaceResponse), {
      status: HTTP_STATUS_CODE.SUCCESS,
    });
  }),
];
