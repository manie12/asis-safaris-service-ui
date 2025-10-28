import type { AppStore } from './useAppStore';

export const selectAuth = (state: AppStore) => state.auth;
export const selectToken = (state: AppStore) => state.auth.token;
export const selectUser = (state: AppStore) => state.auth.user;
export const selectTenantCountry = (state: AppStore) => state.tenant.countryCode;
export const selectRoles = (state: AppStore) => state.auth.user?.roles ?? [];
export const selectIsSidebarOpen = (state: AppStore) => state.ui.isSidebarOpen;
