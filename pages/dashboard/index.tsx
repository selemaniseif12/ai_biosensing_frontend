import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Progress, Chip } from "@nextui-org/react";

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/stats/overview", apiKey);
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    }
    load();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <p className="text-gray-400">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold">Overview Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Live metrics from your biosensing API.
            </p>
          </div>

          <Chip color="success" variant="flat">
            Live · Connected
          </Chip>
        </div>

        {/* KPI CARDS */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>Total API Requests (24h)</CardHeader>
            <CardBody>
              <p className="text-2xl font-semibold">{stats.totalRequests24h}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Active Customers</CardHeader>
            <CardBody>
              <p className="text-2xl font-semibold">{stats.activeCustomers}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>ML Models</CardHeader>
            <CardBody>
              <p className="text-2xl font-semibold">{stats.mlModels}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Error Rate</CardHeader>
            <CardBody>
              <p className="text-2xl font-semibold">{stats.errorRate}%</p>
              <Progress value={stats.errorRate} color="danger" />
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
