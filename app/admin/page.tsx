"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* -----------------------------
   TYPES (Fix TS errors)
------------------------------ */
type Consultation = {
  id: number;
  student_name?: string;
  datetime?: string;
  platform?: string;
};

type TeamStat = {
  team_id: number;
  team_name?: string;
  total?: number;
  upcoming?: number;
  completed?: number;
};

type PlatformStat = {
  platform: string;
  total?: number;
};

type PaymentStats = {
  total_payments: number;
  total_amount: number;
  pending: number;
  completed: number;
};

export default function AdminDashboardOverview() {
  /* -----------------------------
     FIX: Proper typing for all states
  ------------------------------ */
  const [upcoming, setUpcoming] = useState<Consultation[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStat[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStat[]>([]);
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    total_payments: 0,
    total_amount: 0,
    pending: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/consultations/overview");
      const data = await res.json();

      setUpcoming(data?.upcoming ?? []);
      setTeamStats(data?.team_stats ?? []);
      setPlatformStats(data?.platform_stats ?? []);
      setPaymentStats(
        data?.payment_stats ?? {
          total_payments: 0,
          total_amount: 0,
          pending: 0,
          completed: 0,
        }
      );
    } catch (err) {
      console.error("Failed to load admin overview:", err);

      setUpcoming([]);
      setTeamStats([]);
      setPlatformStats([]);
      setPaymentStats({
        total_payments: 0,
        total_amount: 0,
        pending: 0,
        completed: 0,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard Overview</h1>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/admin/consultations/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Consultation
        </Link>

        <Link
          href="/admin/consultations"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View All Consultations
        </Link>

        <Link
          href="/admin/consultations/calendar"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Calendar View
        </Link>
      </div>

      {/* Upcoming Consultations */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Upcoming Consultations (Next 7 Days)
        </h2>

        {!upcoming || upcoming.length === 0 ? (
          <p>No upcoming consultations.</p>
        ) : (
          <div className="border rounded p-4 bg-white shadow">
            {upcoming.map((c) => (
              <div key={c.id} className="border-b py-2">
                <p className="font-semibold">
                  {c.student_name ?? "Unknown Student"}
                </p>
                <p>
                  {c.datetime
                    ? new Date(c.datetime).toLocaleString()
                    : "No date"}
                </p>
                <p className="capitalize">{c.platform ?? "Unknown platform"}</p>
                <Link
                  href={`/admin/consultations/${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Workload */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Team Workload</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamStats.length === 0 ? (
            <p>No team statistics available.</p>
          ) : (
            teamStats.map((t) => (
              <div key={t.team_id} className="border rounded p-4 bg-white shadow">
                <h3 className="font-bold">{t.team_name ?? "Unknown Team"}</h3>
                <p>Total Consultations: {t.total ?? 0}</p>
                <p>Upcoming: {t.upcoming ?? 0}</p>
                <p>Completed: {t.completed ?? 0}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Platform Usage */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Platform Usage</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {platformStats.length === 0 ? (
            <p>No platform usage data available.</p>
          ) : (
            platformStats.map((p) => (
              <div key={p.platform} className="border rounded p-4 bg-white shadow">
                <h3 className="font-bold capitalize">{p.platform ?? "Unknown"}</h3>
                <p>Total: {p.total ?? 0}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>

        <div className="border rounded p-4 bg-white shadow">
          <p>Total Payments: {paymentStats.total_payments}</p>
          <p>Total Amount: ${paymentStats.total_amount}</p>
          <p>Pending: {paymentStats.pending}</p>
          <p>Completed: {paymentStats.completed}</p>
        </div>
      </div>
    </div>
  );
}
