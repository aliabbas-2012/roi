// @ts-nocheck
import { getAuthSession, loginApi, logoutApi, registerClientApi } from "../api";
import { authTypes } from "../types";

export const initAuthSession = () => (dispatch) => {
  const session = getAuthSession();
  dispatch({ type: authTypes.INIT, payload: session });
};

export const loginAction =
  ({ email, password, role }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.LOGIN.REQUEST });
    try {
      const data = await loginApi({ email, password, role });
      dispatch({ type: authTypes.LOGIN.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Unable to login.";
      dispatch({ type: authTypes.LOGIN.FAILURE, payload: message });
      throw error;
    }
  };

export const registerClientAction =
  ({ firstName, lastName, email, countryCode, phoneNumber, password }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.REGISTER_CLIENT.REQUEST });
    try {
      const data = await registerClientApi({ firstName, lastName, email, countryCode, phoneNumber, password });
      dispatch({ type: authTypes.REGISTER_CLIENT.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Unable to register.";
      dispatch({ type: authTypes.REGISTER_CLIENT.FAILURE, payload: message });
      throw error;
    }
  };

export const logoutAction = () => async (dispatch) => {
  await logoutApi();
  dispatch({ type: authTypes.LOGOUT });
};
