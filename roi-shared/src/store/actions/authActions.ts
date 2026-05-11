// @ts-nocheck
import {
  getAuthSession,
  logoutApi,
  recoverPasswordApi,
  registerClientApi,
  sendLoginEmailOtpApi,
  updatePasswordFromRecoveryApi,
  verifyLoginEmailOtpApi,
  verifyPasswordForLoginApi,
} from "../api";
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

/** Password check + send email OTP; does not set session. Caller redirects to OTP page. */
export const loginAction =
  ({ email, password, role }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.LOGIN_SEND_OTP.REQUEST });
    try {
      await verifyPasswordForLoginApi({ email, password, role });
      await sendLoginEmailOtpApi({ email });
      dispatch({ type: authTypes.LOGIN_SEND_OTP.SUCCESS, payload: { email, role } });
      return { email, role, otpSent: true };
    } catch (error) {
      const message = error?.message || "Unable to login.";
      dispatch({ type: authTypes.LOGIN_SEND_OTP.FAILURE, payload: message });
      throw error;
    }
  };

export const loginVerifyOtpAction =
  ({ email, token, role }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.LOGIN_VERIFY_OTP.REQUEST });
    try {
      const data = await verifyLoginEmailOtpApi({ email, token, role });
      dispatch({ type: authTypes.LOGIN_VERIFY_OTP.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Invalid or expired code.";
      dispatch({ type: authTypes.LOGIN_VERIFY_OTP.FAILURE, payload: message });
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

export const updatePasswordFromRecoveryAction =
  ({ accessToken, password }) =>
  async (dispatch) => {
    dispatch({ type: authTypes.UPDATE_USER_PASSWORD.REQUEST });
    try {
      const data = await updatePasswordFromRecoveryApi({ accessToken, password });
      dispatch({ type: authTypes.UPDATE_USER_PASSWORD.SUCCESS, payload: data });
      return data;
    } catch (error) {
      const message = error?.message || "Unable to update password.";
      dispatch({ type: authTypes.UPDATE_USER_PASSWORD.FAILURE, payload: message });
      throw error;
    }
  };
