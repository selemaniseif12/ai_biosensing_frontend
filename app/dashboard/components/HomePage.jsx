"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <div className="profile-header">
        <Image
          src="/default-profile.png"
          alt="Dr. Selemani Mziray"
          width={180}
          height={180}
          className="profile-image"
        />

        <div className="profile-info">
          <h1>Dr. Selemani Mziray</h1>
          <h3>CEO & Founder — Piezo: Pico to Femtotechnology Sensors Inc.</h3>
        </div>
      </div>

      <div className="profile-bio">
        <p>
          Dr. Selemani Mziray is a Full‑Stack API Engineer and founder working at
          the intersection of advanced biosensing and AI‑driven software
          development. His technical foundation includes certification from
          DeepLearning.AI under Andrew Ng through Coursera, validating his
          expertise in Python, AI integration, prompt engineering, automation,
          data analysis, and generative AI. Over time, he built practical
          experience in LLM‑based applications, API architecture, machine
          learning, and intelligent automation—accelerated by early adoption of
          AI assistants for debugging, rapid prototyping, and system design.
        </p>

        <p>
          This progression led him to establish Piezo – Pico to Femtotechnology
          Sensors Inc., a company pioneering next‑generation biosensing powered
          by intelligent API systems. Dr. Mziray developed a proprietary API and
          machine‑learning pipeline that integrates his patented QCM biosensor
          technology, enabling rapid, high‑accuracy viral classification and
          prediction. He also introduced Full‑Stack API Engineering, a course
          delivered through the company’s API ecosystem to train new‑generation
          developers in AI‑enhanced engineering workflows.
        </p>

        <p>
          His work continues to bridge scientific discovery with practical
          engineering, ensuring that advanced biosensing technologies become
          accessible, scalable, and impactful across global industries.
        </p>

        <p>
          Dr. Mziray’s work represents a fusion of AI automation and biosensor
          science, demonstrating his commitment to innovation, scientific rigor,
          and practical applications of machine learning in global health,
          e‑commerce, and institutional systems for both private and government
          sectors.
        </p>

        <hr />

        <h2>Scientific Innovation & Patented Biosensing Technology</h2>

        <p>
          <strong>US Patent 10,830,738 B2</strong> — High Q‑Factor AT‑Cut Quartz
          Crystal Microbalance Femtogram Mass Sensor  
          <br />
          https://patentimages.storage.googleapis.com/44/d5/f5/3e1186c38b0a06/US10830738.pdf
        </p>

        <p>
          <strong>US Patent Application 2020/0173898 A1</strong> — Process for
          Detecting Electrolytes & Biomarkers with Femtogram Resolution  
          <br />
          https://patentimages.storage.googleapis.com/19/a0/98/54abbea587e949/US20200173898A1.pdf
        </p>

        <p>
          These patented QCM systems enable real‑time detection of viruses,
          bacteria, troponins, and electrolytes—forming the foundation of the
          company’s biosensing APIs and machine‑learning training labs.
        </p>

        <hr />

        <h2>Education & Certifications</h2>

        <ul>
          <li>
            DeepLearning.AI, Coursera — Certification, October 2025, Stanford
            University, USA
          </li>
          <li>
            Data Science Infinity — Certification in Data Analyst Specialist,
            August 2025, USA
          </li>
          <li>
            Northern Alberta Institute of Technology (NAIT) — Diploma in
            Nanosystem Engineering Technology, 2021–2024, Canada
          </li>
          <li>
            Alabama A&M University — Ph.D. in Applied Physics (Materials
            Science), 2002–2007, USA
          </li>
        </ul>
      </div>
    </div>
  );
}
