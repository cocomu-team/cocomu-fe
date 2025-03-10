import ConfirmModal from '@components/Modal/Confirm';
import Login from '@components/Modal/Login';
import PasswordInput from '@components/Modal/PasswordInput';
import Waiting from '@components/Modal/Waiting';
import TestCaseModal from '@components/Modal/TestCase';
import LeaveModal from '@components/Modal/Leave';
import { TestCaseData } from './space';

export interface WaitingProps {
  label?: string;
  description?: string;
  navigate?: () => void;
  onClose?: () => void;
}

export interface ConfirmProps {
  isSpace?: boolean;
  studyId?: string;
  codingSpaceId?: string;
  name?: string;
  navigate?: (id: number) => void;
  onClose?: () => void;
}

export interface PasswordInputProps {
  studyId?: string;
  navigate?: (id: number) => void;
  onClose?: () => void;
}

export interface LoginProps {
  onClose?: () => void;
}

export interface TestCaseProps {
  codingSpaceId?: string;
  isEditable?: boolean;
  testCases?: TestCaseData[];
  onClose?: () => void;
}

export interface LeaveProps {
  studyId?: string;
  name?: string;
  onClose?: () => void;
}

interface ModalConfig<T> {
  Component: React.FC<T>;
  disableOutsideClick?: boolean;
}

export const MODAL_COMPONENTS: {
  waiting: ModalConfig<WaitingProps>;
  confirm: ModalConfig<ConfirmProps>;
  passwordInput: ModalConfig<PasswordInputProps>;
  testCase: ModalConfig<TestCaseProps>;
  login: ModalConfig<LoginProps>;
  leave: ModalConfig<LeaveProps>;
} = {
  waiting: { Component: Waiting, disableOutsideClick: true },
  confirm: { Component: ConfirmModal },
  passwordInput: { Component: PasswordInput },
  testCase: { Component: TestCaseModal },
  login: { Component: Login },
  leave: { Component: LeaveModal },
};
