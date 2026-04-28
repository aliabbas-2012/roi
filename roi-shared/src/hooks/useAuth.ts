// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(Boolean(window.localStorage.getItem("roi_mock_token")));
    }
  }, []);

  return {
    isAuthenticated,
    login: () => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("roi_mock_token", "token");
        setIsAuthenticated(true);
      }
    },
    logout: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("roi_mock_token");
        setIsAuthenticated(false);
      }
    },
  };
};

export default useAuth;
