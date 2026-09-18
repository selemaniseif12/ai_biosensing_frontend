"use client";

import VirusCount from "./dashboard/components/VirusCount.jsx";
import VirusList from "./dashboard/components/VirusList.jsx";

export default function Page() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Main Dashboard</h1>

      <section style={{ marginTop: "40px" }}>
        <VirusCount />
      </section>

      <section style={{ marginTop: "40px" }}>
        <VirusList />
      </section>
    </div>
  );
}
