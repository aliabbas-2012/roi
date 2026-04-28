import ProfilePage from "../../pages/Profile";
import DashboardShell from "../dashboard-shell";

export default function Page() {
  return (
    <DashboardShell>
      <ProfilePage />
    </DashboardShell>
  );
}
