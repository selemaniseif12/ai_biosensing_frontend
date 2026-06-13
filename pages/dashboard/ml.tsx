import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";

export default function MLDashboard() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/ml/models", apiKey);
        setModels(data);
      } catch (err) {
        console.error("Failed to load ML models:", err);
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
            <h1 className="text-3xl font-bold">ML Models Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Monitor deployed models, drift, and prediction activity.
            </p>
          </div>

          <Button size="sm" color="primary">
            Deploy New Model
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading ML models...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <Card key={m.name} className="bg-gray-900 border border-gray-800">
                <CardHeader className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{m.name}</p>
                  <Chip
                    size="sm"
                    color={m.status === "healthy" ? "success" : "warning"}
                    variant="flat"
                  >
                    {m.status}
                  </Chip>
                </CardHeader>

                <CardBody className="text-xs text-gray-300 space-y-1">
                  <p>Requests (24h): {m.requests24h}</p>
                  <p>Avg inference time: {m.avgInferenceMs} ms</p>
                  <p>Drift score: {m.driftScore}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
