// @ts-nocheck
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardShell({ children }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
