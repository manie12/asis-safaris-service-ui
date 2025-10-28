import { create } from 'zustand';

import { DEFAULT_COUNTRY_CODE } from '../config/constants';

export type Role = 'guest' | 'traveler' | 'staff' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
};

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

type TenantState = {
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
};

type UIState = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export type AppStore = {
  auth: AuthState;
  tenant: TenantState;
  ui: UIState;
};

export const useAppStore = create<AppStore>((set) => ({
  auth: {
    token: null,
    user: null,
    setSession: (token, user) =>
      set((state) => ({
        auth: {
          ...state.auth,
          token,
          user,
        },
      })),
    clearSession: () =>
      set((state) => ({
        auth: {
          ...state.auth,
          token: null,
          user: null,
        },
      })),
  },
  tenant: {
    countryCode: DEFAULT_COUNTRY_CODE,
    setCountryCode: (countryCode) =>
      set((state) => ({
        tenant: {
          ...state.tenant,
          countryCode,
        },
      })),
  },
  ui: {
    isSidebarOpen: false,
    toggleSidebar: () =>
      set((state) => ({
        ui: {
          ...state.ui,
          isSidebarOpen: !state.ui.isSidebarOpen,
        },
      })),
  },
}));

export const appStore = {
  getState: useAppStore.getState,
  setState: useAppStore.setState,
  subscribe: useAppStore.subscribe,
};
