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
  LOGOUT: "AUTH_LOGOUT",
};

export const dashboardTypes = {
  FETCH_SUMMARY: buildAsyncTypes("DASHBOARD_FETCH_SUMMARY"),
};
