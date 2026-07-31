import { AuthGate } from "@/components/auth/auth-gate";
import { DashboardContent } from "./dashboard-content";

export default function Home() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}
