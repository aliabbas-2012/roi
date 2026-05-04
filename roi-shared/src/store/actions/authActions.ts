// @ts-nocheck
import { getAuthSession, loginApi, logoutApi, recoverPasswordApi, registerClientApi, updateUserApi } from "../api";
import { authTypes } from "../types";

export const initAuthSession = () => (dispatch) => {
  return getAuthSession()
    .then((session) => {
      dispatch({ type: authTypes.INIT, payload: session });
      return session;
    })
    .catch(() => {
      dispatch({ type: authTypes.INIT, payload: null });
      return null;
    });
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

export const recoverPasswordAction =
  ({ email, redirectTo }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.RECOVER_PASSWORD.REQUEST });
    try {
      const data = await recoverPasswordApi({ email, redirectTo });
      dispatch({ type: authTypes.RECOVER_PASSWORD.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Unable to send recovery email.";
      dispatch({ type: authTypes.RECOVER_PASSWORD.FAILURE, payload: message });
      throw error;
    }
  };

export const updateUserAction =
  ({ accessToken, email, password }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.UPDATE_USER.REQUEST });
    try {
      const data = await updateUserApi({ accessToken, email, password });
      dispatch({ type: authTypes.UPDATE_USER.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Unable to update user.";
      dispatch({ type: authTypes.UPDATE_USER.FAILURE, payload: message });
      throw error;
    }
  };
