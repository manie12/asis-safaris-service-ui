export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}

export interface ResetPasswordPayload {
  email: string;
}

import type { Role } from '@/app/store/useAppStore';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: Role[];
  };
}
