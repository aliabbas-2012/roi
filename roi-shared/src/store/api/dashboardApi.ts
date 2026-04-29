// @ts-nocheck
import { apiClient } from "../../utils/api";

export const fetchDashboardSummaryApi = async () => {
  const response = await apiClient.get("/dashboard/summary");
  return response.data;
};
