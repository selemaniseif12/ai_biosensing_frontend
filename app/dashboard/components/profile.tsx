"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/app/profile/image`;

    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile image");
        }
        return res.json(); // backend returns JSON with Base64
      })
      .then((data) => {
        if (data.image) {
          const base64Image = `data:image/jpeg;base64,${data.image}`;
          setImage(base64Image);
        }
      })
      .catch((err) => console.error("Error loading profile image:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dr. Selemani Mziray: CEO & Founder — Piezo‑Pico to Femtotechnology Sensors Inc.
      </h1>

      <div className="flex flex-col items-center">
        {image && (
          <img
            src={image}
            alt="Profile"
            className="w-64 h-64 rounded-xl shadow-lg mb-6 object-cover"
          />
        )}
      </div>

      <div className="space-y-6 text-lg leading-relaxed">

        <p>
          Dr. Selemani Mziray is a Full‑Stack API Engineer and founder working at the intersection of advanced biosensing and AI‑driven software development. His technical foundation includes AI certification from DeepLearning.AI under Andrew Ng (Coursera verification: https://coursera.org/verify/DZA9TFVEOAQO), validating his skills in Python, AI integration, data analysis, and generative AI.
          He built practical expertise in LLM‑based applications, API architecture, machine learning, and automation—accelerated by early use of AI assistants for debugging and rapid prototyping. This progression led him to establish Piezo – Pico to Femtotechnology Sensors Inc., a company pioneering next‑generation biosensing with intelligent API systems.
          He developed a proprietary API and machine‑learning pipeline that integrates his patented QCM biosensor technology to deliver rapid, high‑accuracy viral classification and prediction. He also introduced Full‑Stack API Engineering, a course delivered through the company’s API ecosystem.
          Dr. Mziray’s work reflects a strong fusion of AI engineering and biosensor science, demonstrating his commitment to innovation, scientific rigor, and the practical application of machine learning in global health.
        </p>

        <h2 className="text-2xl font-semibold">
          Scientific Innovation & Patented Biosensing Technology
        </h2>

        <p>
          US Patent 10,830,738 B2 — High Q‑Factor AT‑Cut Quartz Crystal
          Microbalance Femtogram Mass Sensor<br />
          US Patent Application 2020/0173898 A1 — Process for Detecting
          Electrolytes & Biomarkers with Femtogram Resolution
        </p>

        <p>
          These patented QCM systems enable real‑time detection of viruses,
          bacteria, troponins, and electrolytes — forming the foundation of the
          company’s biosensing APIs and ML training labs.
        </p>

        <h2 className="text-2xl font-semibold">
          API Engineering, Automation & Data Systems
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Commercial API development for biosensing, analytics, and institutional systems</li>
          <li>Machine learning pipelines for virus detection & biosensor data classification</li>
          <li>Backend & frontend engineering using Firebase, GitHub, Stripe and Vercel</li>
          <li>Subscription‑based ML training labs for QCM data and infectious‑disease classification</li>
          <li>SQL‑based data engineering and optimized relational databases</li>
          <li>Power BI dashboards for enterprise analytics</li>
          <li>LLM‑powered automation, OpenAI model integration, and ChatGPT workflow assistants</li>
          <li>Full‑Stack API course development accessible via API‑key subscription</li>
        </ul>

        <p>
          He also built the company’s internal biosensing datasets and ML
          training databases derived from QCM frequency‑noise signatures —
          directly leveraging his patented sensor technology.
        </p>

        <h2 className="text-2xl font-semibold">
          Consulting Background & Academic Expertise
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>COMSOL Multiphysics modeling of thermometric materials</li>
          <li>Predictive modeling for material performance</li>
          <li>Biosensor data analysis for virus detection — work that led to his patents</li>
          <li>Multidisciplinary engineering collaboration in nanosystems and materials analytics</li>
        </ul>

        <p>
          His academic and professional training includes:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>PhD in Applied Physics (Materials Science)</strong> — Alabama A&M University, Huntsville, Alabama, USA
          </li>
          <li>
            <strong>Diploma in Nanosystem Engineering Technology</strong> — Northern Alberta Institute of Technology (NAIT), Edmonton, Alberta, Canada
          </li>
          <li>
            DeepLearning.AI Specialist Certification (Coursera) — LLMs, Python, Prompt Engineering, Automation, APIs, AI Agents
          </li>
          <li>
            Data Science Infinity Certification — Data Analytics using Python & SQL
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Vision & Mission</h2>

        <p>
          Dr. Mziray’s mission is to build APIs that connect science, data, and
          intelligence, enabling organizations to deploy biosensing, automation,
          and machine learning at scale.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          “We build APIs that connect science, data, and intelligence —
          transforming ideas into deployable technology.”
        </blockquote>

        <h2 className="text-2xl font-semibold mt-10">Selected Publications</h2>

        <ul className="list-disc pl-6 space-y-3 text-blue-700">
          <li>
            <a href="https://patentimages.storage.googleapis.com/44/d5/f5/3e1186c38b0a06/US10830738.pdf" target="_blank">
              US Patent 10830738 — Piezoelectric Biosensing Technology
            </a>
          </li>
          <li>
            <a href="https://patentimages.storage.googleapis.com/19/a0/98/54abbea587e949/US20200173898A1.pdf" target="_blank">
              US Patent Application 20200173898 — Advanced QCM Biosensing
            </a>
          </li>
          <li>
            <a href="https://paperity.org/p/352894092/review-on-ultra-sensitive-qcm-mass-sensor-and-microfluidic-for-diagnostic-point-of-care" target="_blank">
              Review on Ultra‑Sensitive QCM Mass Sensors & Microfluidics
            </a>
          </li>
          <li>
            <a href="https://sci-hub.sidesgame.com/10.1002/er.3584" target="_blank">
              Evaluation of Efficiency Factors & Internal Resistance of Thermoelectric Materials
            </a>
          </li>
          <li>
            <a href="https://sci-hub.sidesgame.com/10.1016/j.matlet.2003.08.023#google_vignette" target="_blank">
              Materials Letters — Piezoelectric Thin‑Film Sensor Study
            </a>
          </li>
          <li>
            <a href="https://sci-hub.sidesgame.com/10.1080/00150190490891300" target="_blank">
              Ferroelectrics Journal — QCM Frequency Response Analysis
            </a>
          </li>
          <li>
            <a href="https://selemaniseif12.github.io/dsi-project-report/" target="_blank">
              DSI Project Report — Biosensing & ML Integration
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/posts/selemani-mziray-751010343_insights-according-to-market-research-future-ugcPost-7397086027779313665-Vutj/" target="_blank">
              Market Research Insights — Biosensing Industry Trends
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/posts/selemani-mziray-751010343_stock-market-analysis-of-four-major-banks-ugcPost-7396019047533912064-UDvd/" target="_blank">
              Stock Market Analysis — Financial Modeling Insights
            </a>
          </li>
        </ul>

      </div>
    </div>
  );
}
