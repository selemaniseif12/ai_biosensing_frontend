import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";

export default function LogsDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/logs", apiKey);
        setLogs(data);
      } catch (err) {
        console.error("Failed to load logs:", err);
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
            <h1 className="text-3xl font-bold">Logs & Activity Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Authentication events, admin actions, and API access logs.
            </p>
          </div>

          <Chip color="warning" variant="flat">
            Live Logs
          </Chip>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading logs...</p>
        ) : (
          <Card className="bg-gray-900 border border-gray-800">
            <CardHeader>
              <p className="text-sm font-semibold">Recent Events</p>
            </CardHeader>

            <CardBody className="space-y-2 text-xs text-gray-300">
              {logs.map((log) => (
                <div key={log.id} className="flex justify-between">
                  <span>[{log.type}] {log.message}</span>
                  <span>{log.timeAgo}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";

export default function LogsDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/logs", apiKey);
        setLogs(data);
      } catch (err) {
        console.error("Failed to load logs:", err);
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
            <h1 className="text-3xl font-bold">Logs & Activity Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Authentication events, admin actions, and API access logs.
            </p>
          </div>

          <Chip color="warning" variant="flat">
            Live Logs
          </Chip>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading logs...</p>
        ) : (
          <Card className="bg-gray-900 border border-gray-800">
            <CardHeader>
              <p className="text-sm font-semibold">Recent Events</p>
            </CardHeader>

            <CardBody className="space-y-2 text-xs text-gray-300">
              {logs.map((log) => (
                <div key={log.id} className="flex justify-between">
                  <span>[{log.type}] {log.message}</span>
                  <span>{log.timeAgo}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
