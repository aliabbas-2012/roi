// @ts-nocheck
import { authTypes } from "../types";

const initialState = {
  isAuthenticated: false,
  session: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.INIT:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload?.token),
        session: action.payload || null,
      };

    case authTypes.LOGIN_SEND_OTP.REQUEST:
    case authTypes.LOGIN_VERIFY_OTP.REQUEST:
    case authTypes.REGISTER_CLIENT.REQUEST:
    case authTypes.RECOVER_PASSWORD.REQUEST:
    case authTypes.UPDATE_USER_PASSWORD.REQUEST:
      return { ...state, loading: true, error: null };

    case authTypes.REGISTER_CLIENT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        session: null,
      };

    case authTypes.LOGIN_SEND_OTP.SUCCESS:
    case authTypes.RECOVER_PASSWORD.SUCCESS:
    case authTypes.UPDATE_USER_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case authTypes.LOGIN_VERIFY_OTP.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        session: action.payload,
      };

    case authTypes.LOGIN_SEND_OTP.FAILURE:
    case authTypes.LOGIN_VERIFY_OTP.FAILURE:
    case authTypes.REGISTER_CLIENT.FAILURE:
    case authTypes.RECOVER_PASSWORD.FAILURE:
    case authTypes.UPDATE_USER_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "Authentication failed.",
        isAuthenticated: false,
      };

    case authTypes.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export { initialState };
export default authReducer;
