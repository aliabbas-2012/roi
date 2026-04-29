// @ts-nocheck
import { fetchDashboardSummaryApi } from "../api";
import { dashboardTypes } from "../types";

export const fetchDashboardSummaryAction = () => async (dispatch) => {
  dispatch({ type: dashboardTypes.FETCH_SUMMARY.REQUEST });
  try {
    const data = await fetchDashboardSummaryApi();
    dispatch({ type: dashboardTypes.FETCH_SUMMARY.SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error?.message || "Unable to fetch dashboard summary.";
    dispatch({ type: dashboardTypes.FETCH_SUMMARY.FAILURE, payload: message });
    throw error;
  }
};
