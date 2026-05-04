// @ts-nocheck

export const buildAsyncTypes = (key) => ({
  REQUEST: `${key}_REQUEST`,
  SUCCESS: `${key}_SUCCESS`,
  FAILURE: `${key}_FAILURE`,
});

export const authTypes = {
  INIT: "AUTH_INIT",
  LOGIN: buildAsyncTypes("AUTH_LOGIN"),
  REGISTER_CLIENT: buildAsyncTypes("AUTH_REGISTER_CLIENT"),
  RECOVER_PASSWORD: buildAsyncTypes("AUTH_RECOVER_PASSWORD"),
  UPDATE_USER: buildAsyncTypes("AUTH_UPDATE_USER"),
  LOGOUT: "AUTH_LOGOUT",
};

export const dashboardTypes = {
  FETCH_SUMMARY: buildAsyncTypes("DASHBOARD_FETCH_SUMMARY"),
};
