import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Progress, Chip } from "@nextui-org/react";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/analytics", apiKey);
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
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
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Latency, throughput, and error analytics from your biosensing API.
            </p>
          </div>

          <Chip color="primary" variant="flat">
            Live Analytics
          </Chip>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading analytics...</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Latency Card */}
            <Card className="bg-gray-900 border border-gray-800 lg:col-span-2">
              <CardHeader>
                <p className="text-sm font-semibold">Latency Distribution</p>
              </CardHeader>
              <CardBody className="space-y-3 text-xs text-gray-300">
                <p>p50: {analytics.latency.p50} ms</p>
                <Progress value={analytics.latency.p50} color="success" />

                <p>p95: {analytics.latency.p95} ms</p>
                <Progress value={analytics.latency.p95} color="warning" />

                <p>p99: {analytics.latency.p99} ms</p>
                <Progress value={analytics.latency.p99} color="danger" />
              </CardBody>
            </Card>

            {/* Error Codes Card */}
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <p className="text-sm font-semibold">Top Error Codes</p>
              </CardHeader>
              <CardBody className="space-y-2 text-xs text-gray-300">
                {analytics.errors.map((err: any) => (
                  <div key={err.code} className="flex justify-between">
                    <span>{err.code}</span>
                    <span>{err.count}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
