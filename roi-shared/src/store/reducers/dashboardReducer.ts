// @ts-nocheck
import { dashboardTypes } from "../types";

const initialState = {
  summary: null,
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardTypes.FETCH_SUMMARY.REQUEST:
      return { ...state, loading: true, error: null };
    case dashboardTypes.FETCH_SUMMARY.SUCCESS:
      return { ...state, loading: false, summary: action.payload, error: null };
    case dashboardTypes.FETCH_SUMMARY.FAILURE:
      return { ...state, loading: false, error: action.payload || "Unable to fetch summary." };
    default:
      return state;
  }
};

export { initialState };
export default dashboardReducer;
