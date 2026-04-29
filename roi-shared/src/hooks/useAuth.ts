// @ts-nocheck
"use client";

import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";
import { initAuthSession, loginAction, logoutAction, registerClientAction } from "../store/actions";
import { selectAuthError, selectAuthLoading, selectAuthSession, selectIsAuthenticated } from "../store/selectors";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const session = useAppSelector(selectAuthSession);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  return {
    isAuthenticated,
    session,
    loading,
    error,
    initSession: () => dispatch(initAuthSession()),
    login: (credentials) => dispatch(loginAction(credentials)),
    registerClient: (payload) => dispatch(registerClientAction(payload)),
    logout: () => dispatch(logoutAction()),
  };
};

export default useAuth;
