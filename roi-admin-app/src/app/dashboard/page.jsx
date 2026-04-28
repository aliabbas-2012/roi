import DashboardPage from "../../pages/Dashboard";
import DashboardShell from "../dashboard-shell";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardPage />
    </DashboardShell>
  );
}
