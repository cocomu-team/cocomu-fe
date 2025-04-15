import { FilterData } from './common';
import { UserData } from './user';

export type StudyStatusData = 'PUBLIC' | 'PRIVATE';

export interface studyFilters {
  status: number[];
  languages: number[];
  workbooks: number[];
  joinable: boolean;
}

export interface StudyData {
  id: number;
  joinable: boolean;
  name: string;
  status: string;
  languages: FilterData[];
  workbooks: FilterData[];
  description: string;
  currentUserCount: number;
  totalUserCount: number;
  createdAt: string;
  leader: UserData;
}

export interface StudyFormData extends Record<string, string | number[]> {
  name: string;
  password: string;
  totalUserCount: string;
  languages: number[];
  workbooks: number[];
}

export interface CreateStudyData {
  name: string;
  password: string;
  totalUserCount: number;
  languages: number[];
  workbooks: number[];
  description: string;
}

export interface EditStudyData {
  name: string;
  password: string;
  totalUserCount: number;
  languages: number[];
  workbooks: number[];
  description: string;
  publicStudy: boolean;
}

export interface GetListData {
  page?: number;
  status?: string;
  languages?: string;
  workbooks?: string;
  joinable?: boolean;
  keyword?: string;
}
