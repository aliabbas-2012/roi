// @ts-nocheck
import ClientLayout from "../layouts/ClientLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardShell({ children }) {
  return (
    <ProtectedRoute requiredRole="client">
      <ClientLayout>{children}</ClientLayout>
    </ProtectedRoute>
  );
}
