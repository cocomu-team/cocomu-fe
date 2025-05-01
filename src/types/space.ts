import { UserRoleData } from './user';

export type SpaceStatusData = 'WAITING' | 'RUNNING' | 'FEEDBACK' | 'FINISH';

export interface SpaceListData {
  status?: string;
  languageIds?: string;
  joinable?: boolean;
  keyword?: string;
  lastId?: number;
}

export interface SpaceLanguageData {
  languageId: number;
  languageName: string;
  languageImageUrl: string;
}

export interface SpaceData {
  id: number;
  joinedMe: boolean;
  name: string;
  language: SpaceLanguageData;
  totalUserCount: number;
  createdAt: string;
  status: string;
  currentUsers: UserRoleData[];
}

export interface SpaceFormData extends Record<string, string | number[]> {
  name: string;
  timerTime: string;
  workbookUrl: string;
  totalUserCount: number[];
  languageId: number[];
  description: string;
}

export interface CreateSpaceData {
  studyId: number;
  name: string;
  timerTime: number;
  workbookUrl: string;
  totalUserCount: number;
  languageId: number;
  description: string;
}
