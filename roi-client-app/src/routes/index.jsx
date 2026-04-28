import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "roi-shared";
import ClientLayout from "../layouts/ClientLayout";
import DashboardPage from "../pages/Dashboard";
import PlansPage from "../pages/Plans";
import InvestmentsPage from "../pages/Investments";
import WithdrawPage from "../pages/Withdraw";
import ReferralsPage from "../pages/Referrals";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<PrivateRoute />}>
        <Route
          element={
            <ClientLayout>
              <Outlet />
            </ClientLayout>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
