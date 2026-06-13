import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { apiGet } from "@/lib/apiClient";
import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";

export default function CustomersDashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEMPORARY — replace later with real user API key
  const apiKey = "YOUR_TEST_API_KEY_HERE";

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/api/v1/customers", apiKey);
        setCustomers(data);
      } catch (err) {
        console.error("Failed to load customers:", err);
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
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              View tenants, API keys, and usage patterns.
            </p>
          </div>

          <Button color="primary" size="sm">
            New Customer
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading customers...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((c) => (
              <Card key={c.id} className="bg-gray-900 border border-gray-800">
                <CardHeader className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <Chip
                    size="sm"
                    color={c.status === "active" ? "success" : "warning"}
                    variant="flat"
                  >
                    {c.status}
                  </Chip>
                </CardHeader>

                <CardBody className="text-xs text-gray-300 space-y-1">
                  <p>API keys: {c.apiKeys}</p>
                  <p>Requests (24h): {c.requests24h}</p>
                  <p>Primary endpoint: {c.primaryEndpoint}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
