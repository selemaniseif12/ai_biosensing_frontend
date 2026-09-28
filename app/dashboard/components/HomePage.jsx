"use client";

import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "Dr. Selemani Mziray",
    title: "Full‑Stack API Engineer • Founder • AI‑Driven Biosensing Innovator",
    bio: `
Dr. Selemani Mziray is a Full‑Stack API Engineer and founder working at the intersection of advanced biosensing and AI‑driven software development. His technical foundation includes certification from DeepLearning.AI under Andrew Ng through Coursera, validating his expertise in Python, AI integration, prompt engineering, automation, data analysis, and generative AI. Over time, he built practical experience in LLM‑based applications, API architecture, machine learning, and intelligent automation—accelerated by early adoption of AI assistants for debugging, rapid prototyping, and system design.

This progression led him to establish Piezo – Pico to Femtotechnology Sensors Inc., a company pioneering next‑generation biosensing powered by intelligent API systems. Dr. Mziray developed a proprietary API and machine‑learning pipeline that integrates his patented QCM biosensor technology, enabling rapid, high‑accuracy viral classification and prediction. He also introduced Full‑Stack API Engineering, a course delivered through the company’s API ecosystem to train new‑generation developers in AI‑enhanced engineering workflows.

His work continues to bridge scientific discovery with practical engineering, ensuring that advanced biosensing technologies become accessible, scalable, and impactful across global industries.

Dr. Mziray’s work represents a fusion of AI automation and biosensor science, demonstrating his commitment to innovation, scientific rigor, and practical applications of machine learning in global health, e‑commerce, and institutional systems for both private and government sectors.

---

Scientific Innovation & Patented Biosensing Technology  
US Patent 10,830,738 B2 — High Q‑Factor AT‑Cut Quartz Crystal Microbalance Femtogram Mass Sensor  
https://patentimages.storage.googleapis.com/44/d5/f5/3e1186c38b0a06/US10830738.pdf

US Patent Application 2020/0173898 A1 — Process for Detecting Electrolytes & Biomarkers with Femtogram Resolution  
https://patentimages.storage.googleapis.com/19/a0/98/54abbea587e949/US20200173898A1.pdf

These patented QCM systems enable real‑time detection of viruses, bacteria, troponins, and electrolytes—forming the foundation of the company’s biosensing APIs and machine‑learning training labs.

---

Education & Certifications  
DeepLearning.AI, Coursera — Certification, October 2025, Stanford University, USA  
Data Science Infinity — Certification in Data Analyst Specialist, August 2025, USA  
Northern Alberta Institute of Technology (NAIT) — Diploma in Nanosystem Engineering Technology, 2021–2024, Canada  
Alabama A&M University — Ph.D. in Applied Physics (Materials Science), 2002–2007, USA
    `,
    image: "",
  });

  useEffect(() => {
    const storedImage = localStorage.getItem("profile_image");
    if (storedImage) {
      setProfile((prev) => ({ ...prev, image: storedImage }));
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px",
    lineHeight: "1.6",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  };

  const imageStyle: React.CSSProperties = {
    width: "160px",
    height: "160px",
    borderRadius: "12px",
    objectFit: "cover",
    background: "#eee",
  };

  const bioStyle: React.CSSProperties = {
    whiteSpace: "pre-line",
    marginTop: "12px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Profile</h1>

      <div style={cardStyle}>
        <img
          src={
            profile.image
              ? `data:image/jpeg;base64,${profile.image}`
              : "/default-profile.png"
          }
          alt="Profile"
          style={imageStyle}
        />

        <div>
          <h2>{profile.name}</h2>
          <h4 style={{ color: "#555" }}>{profile.title}</h4>
          <p style={bioStyle}>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}
