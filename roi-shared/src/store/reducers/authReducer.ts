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

    case authTypes.LOGIN.REQUEST:
    case authTypes.REGISTER_CLIENT.REQUEST:
      return { ...state, loading: true, error: null };

    case authTypes.LOGIN.SUCCESS:
    case authTypes.REGISTER_CLIENT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        session: action.payload,
      };

    case authTypes.LOGIN.FAILURE:
    case authTypes.REGISTER_CLIENT.FAILURE:
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
