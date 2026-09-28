"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dr. Selemani Mziray — CEO & Founder  
        <br />
        Piezo‑Pico to Femtotechnology Sensors Inc.
      </h1>

      {/* ⭐ Updated layout: text fills right side and below image */}
      <div className="flex flex-col md:flex-row items-start md:gap-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <Image
            src="/profile.png"
            alt="Profile"
            width={220}
            height={220}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>

        {/* ⭐ Text now expands fully using flex-1 */}
        <div className="flex-1 text-lg leading-relaxed space-y-6">
          <p>
            Dr. Selemani Mziray is a Full‑Stack API Engineer and founder working
            at the intersection of advanced biosensing and AI‑driven software
            development. His technical foundation includes certification from
            DeepLearning.AI under Andrew Ng through Coursera, validating his
            expertise in Python, AI integration, prompt engineering, automation,
            data analysis, and generative AI.
          </p>

          <p>
            He has built extensive practical experience in LLM‑based
            applications, API architecture, machine learning, and intelligent
            automation—accelerated by early adoption of AI assistants for
            debugging, rapid prototyping, and system design. This progression
            led him to establish Piezo – Pico to Femtotechnology Sensors Inc., a
            company pioneering next‑generation biosensing powered by intelligent
            API systems.
          </p>

          <p>
            Dr. Mziray developed a proprietary API and machine‑learning pipeline
            that integrates his patented QCM biosensor technology, enabling
            rapid, high‑accuracy viral classification and prediction. He also
            introduced <em>Full‑Stack API Engineering</em>, a course delivered
            through the company’s API ecosystem to train new‑generation
            developers in AI‑enhanced engineering workflows.
          </p>

          <p>
            His work represents a strong fusion of AI automation and biosensor
            science, demonstrating his commitment to innovation, scientific
            rigor, and practical applications of machine learning across global
            health, e‑commerce, and institutional systems for both private and
            government sectors.
          </p>

          <h2 className="text-2xl font-semibold">
            Scientific Innovation & Patented Biosensing Technology
          </h2>

          <p>
            <strong>US Patent 10,830,738 B2</strong> — High Q‑Factor AT‑Cut
            Quartz Crystal Microbalance Femtogram Mass Sensor  
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
        </div>
      </div>

      {/* EDUCATION SECTION */}
      <div className="mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Education & Certifications
        </h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold">
              DeepLearning.AI — Coursera (October 2025)
            </h3>
            <p>Certification in AI & Deep Learning</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Data Science Infinity (August 2025)
            </h3>
            <p>Certification in Data Analyst Specialist</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Northern Alberta Institute of Technology (NAIT), 2021–2024
            </h3>
            <p>Diploma in Nanosystem Engineering Technology</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Alabama A&M University, 2002–2007
            </h3>
            <p>Ph.D. in Applied Physics – Materials Science</p>
          </div>
        </div>
      </div>
    </div>
  );
}
