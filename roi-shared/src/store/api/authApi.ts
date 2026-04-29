// @ts-nocheck
import { apiClient } from "../../utils/api";
import { getSession } from "../../utils/mockAuth";

export const getAuthSession = () => getSession();

export const loginApi = async ({ email, password, role }) => {
  const response = await apiClient.post("/auth/login", { email, password, role });
  return response.data;
};

export const registerClientApi = async ({ firstName, lastName, email, countryCode, phoneNumber, password }) => {
  const response = await apiClient.post("/auth/register/client", {
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
