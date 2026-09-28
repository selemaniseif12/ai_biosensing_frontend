"use client";

import React from "react";

export default function HomePage() {
  return (
    <div style={{ padding: "20px" }}>

      {/* Company Name */}
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Piezo‑Pico to Femtotechnology Sensors Inc.
      </h1>

      {/* Mission Statement */}
      <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#007bff" }}>
        Building Custom Commercial APIs for the Future
      </h2>

      {/* Company Introduction */}
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
        Piezo‑Pico to Femtotechnology Sensors Inc. leads the next revolution in
        building commercial APIs for biosensing technology, financial institutions,
        pharmaceutical companies, government agencies, educational institutions,
        and private organizations.
      </p>

      {/* Specialization */}
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "30px" }}>
        We specialize in custom‑designed API architectures tailored to your
        operational needs — from biosensing and machine learning integration to
        enterprise‑grade data systems.
      </p>

      {/* Process */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Our Process</h2>
        <ul>
          <li>
            <strong>Phase 1 — Paid Consultation:</strong> Short interview to define
            goals and specifications.
          </li>
          <li>
            <strong>Phase 2 — Evaluation (Unpaid):</strong> Review and agreement on
            API structure, timeline, and contract.
          </li>
        </ul>
      </section>

      {/* Expertise */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Our Expertise</h2>
        <ul>
          <li>Commercial API development for biosensing, data analytics, and institutional systems.</li>
          <li>Machine learning integration for virus detection and biosensor data classification.</li>
          <li>Custom backend & frontend engineering using Firebase, GitHub, Stripe and Vercel.</li>
          <li>ML training labs & courses accessible through our API (subscription‑based).</li>
          <li>Consulting services for organizations seeking customized API design or scientific/financial solutions.</li>
          <li>Cutting‑edge course development — “Full‑Stack API”, paid through API access.</li>

          {/* Added Expertise */}
          <li>Data analytics using Power BI for enterprise dashboards and reporting.</li>
          <li>SQL‑based data engineering and database optimization.</li>
          <li>LLM‑powered automation and intelligent data processing.</li>
          <li>OpenAI model integration for advanced analytics and automation.</li>
          <li>ChatGPT‑based conversational interfaces and workflow assistants.</li>

          {/* Newly Added Topics */}
          <li>API Integration of Machine Learning sensors based on visible and IR lights.</li>
          <li>API Integration of Machine Learning sensors based on MRI spectroscopies.</li>
          <li>API Integration of Machine Learning sensors based on Piezoelectric sensors.</li>
          <li>API Integration of Machine Learning sensors based on Robotic Sensors.</li>
        </ul>
      </section>

      {/* Biography intentionally removed */}
    </div>
  );
}
