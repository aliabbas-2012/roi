// @ts-nocheck

export const buildAsyncTypes = (key) => ({
  REQUEST: `${key}_REQUEST`,
  SUCCESS: `${key}_SUCCESS`,
  FAILURE: `${key}_FAILURE`,
});

export const authTypes = {
  INIT: "AUTH_INIT",
  LOGIN_SEND_OTP: buildAsyncTypes("AUTH_LOGIN_SEND_OTP"),
  LOGIN_VERIFY_OTP: buildAsyncTypes("AUTH_LOGIN_VERIFY_OTP"),
  REGISTER_CLIENT: buildAsyncTypes("AUTH_REGISTER_CLIENT"),
  RECOVER_PASSWORD: buildAsyncTypes("AUTH_RECOVER_PASSWORD"),
  UPDATE_USER_PASSWORD: buildAsyncTypes("AUTH_UPDATE_USER_PASSWORD"),
  LOGOUT: "AUTH_LOGOUT",
};

export const dashboardTypes = {
  FETCH_SUMMARY: buildAsyncTypes("DASHBOARD_FETCH_SUMMARY"),
};
