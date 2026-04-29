// @ts-nocheck
export const selectDashboard = (state) => state.dashboard;
export const selectDashboardSummary = (state) => state.dashboard.summary || {};
export const selectDashboardLoading = (state) => Boolean(state.dashboard.loading);
export const selectDashboardError = (state) => state.dashboard.error;
