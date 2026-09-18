"use client";

import { useRouter } from "next/navigation";

export default function GovernmentHomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Piezo Pico to Femtotechnology Sensors Inc.</h1>
      <h2>National Biosensing Infrastructure for Public Health and Security</h2>

      <p>
        Real Time Pathogen Detection. Femtogram Level Sensitivity. API Driven National Surveillance.
        We develop advanced scientific APIs designed to equip government agencies with next‑generation
        biosensing capabilities.
      </p>

      <div style={{ marginTop: "30px", padding: "20px", background: "#f7f7f7", borderRadius: "8px" }}>
        <p>
          Government agencies initiating formal collaboration should begin by accessing the Store to select
          the appropriate consulting package. After subscription, authorized personnel gain access to ML v2
          and ML v6 educational models.
        </p>
      </div>

      <h2>Supporting National Priorities</h2>
      <p>Strengthening public health resilience and biodefense capabilities.</p>

      <h2>Government Applications</h2>
      <ul>
        <li>Real‑time airborne pathogen detection</li>
        <li>Early outbreak alerts</li>
        <li>AI‑driven threat classification</li>
      </ul>

      <h2>Scientific Leadership</h2>
      <p>Led by Dr. Selemani Mziray.</p>

      <h2>Built in Canada. Engineered for National Resilience.</h2>
    </div>
  );
}
