import ClientLayout from "../layouts/ClientLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardShell({ children }) {
  return (
    <ProtectedRoute>
      <ClientLayout>{children}</ClientLayout>
    </ProtectedRoute>
  );
}
