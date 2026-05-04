// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { initAuthSession } from "../store/actions";
import { selectAuthSession, selectIsAuthenticated } from "../store/selectors";

const ProtectedRoute = ({ children, requiredRole }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const session = useAppSelector(selectAuthSession);

  useEffect(() => {
    dispatch(initAuthSession()).finally(() => setHydrated(true));
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (requiredRole && session?.user?.role !== requiredRole) {
      router.replace("/unauthorized");
      return;
    }
    setAllowed(true);
  }, [hydrated, isAuthenticated, requiredRole, router, session?.user?.role]);

  if (!allowed) return null;

  return children;
};

export default ProtectedRoute;
