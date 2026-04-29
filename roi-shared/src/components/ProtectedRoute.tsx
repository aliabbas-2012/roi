// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { initAuthSession } from "../store/actions";
import { selectIsAuthenticated } from "../store/selectors";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(initAuthSession());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    setAllowed(true);
  }, [isAuthenticated, router]);

  if (!allowed) return null;

  return children;
};

export default ProtectedRoute;
