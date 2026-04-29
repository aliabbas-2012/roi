// @ts-nocheck
export const selectAuth = (state) => state.auth;
export const selectAuthSession = (state) => state.auth.session;
export const selectIsAuthenticated = (state) => Boolean(state.auth.isAuthenticated);
export const selectAuthLoading = (state) => Boolean(state.auth.loading);
export const selectAuthError = (state) => state.auth.error;
