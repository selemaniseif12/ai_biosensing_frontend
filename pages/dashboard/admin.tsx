import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Button, Chip } from "@nextui-org/react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/admin/stats", apiKey);
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold">Administrative Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage users, roles, API keys, and platform configuration.
            </p>
          </div>

          <Button size="sm" color="primary">
            Invite Admin
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading admin stats...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Admins */}
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <p className="text-sm font-semibold">Admins</p>
              </CardHeader>
              <CardBody className="text-xs text-gray-300 space-y-1">
                <p>Super admins: {stats.admins.super}</p>
                <p>Org admins: {stats.admins.org}</p>
                <p>Pending invites: {stats.admins.pendingInvites}</p>
              </CardBody>
            </Card>

            {/* API Keys */}
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <p className="text-sm font-semibold">API Keys</p>
              </CardHeader>
              <CardBody className="text-xs text-gray-300 space-y-1">
                <p>Active: {stats.apiKeys.active}</p>
                <p>Revoked: {stats.apiKeys.revoked}</p>
              </CardBody>
            </Card>

            {/* Security */}
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <p className="text-sm font-semibold">Security</p>
              </CardHeader>
              <CardBody className="text-xs text-gray-300 space-y-1">
                <p>2FA enforced: {stats.security.twoFactorEnabled ? "Yes" : "No"}</p>
                <p>Last audit: {stats.security.lastAuditDaysAgo} days ago</p>

                <Chip
                  size="sm"
                  color={stats.security.compliant ? "success" : "danger"}
                  variant="flat"
                >
                  {stats.security.compliant ? "Compliant" : "Non‑compliant"}
                </Chip>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
