"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dr. Selemani Mziray — CEO &amp; Founder
        <br />
        Piezo-Pico to Femtotechnology Sensors Inc.
      </h1>

      <div className="flex flex-col md:flex-row items-start md:gap-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <Image
            src="/profile.png"
            alt="Dr. Selemani Mziray"
            width={220}
            height={220}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>

        <div className="flex-1 text-lg leading-relaxed space-y-6">
          <p>
            Dr. Selemani Mziray is a full-stack API engineer, researcher, and
            founder working at the intersection of advanced biosensing and
            AI-driven software development. His learning and professional
            development include training in AI and deep learning through
            DeepLearning.AI on Coursera, as well as practical study in data
            analysis, Python, machine-learning integration, automation, and
            generative AI.
          </p>

          <p>
            He applies this technical foundation to API architecture,
            machine-learning workflows, and intelligent software systems. This
            work supports his broader goal of connecting scientific sensor
            technology with practical digital tools through Piezo-Pico to
            Femtotechnology Sensors Inc.
          </p>

          <p>
            Dr. Mziray is developing software and machine-learning workflows to
            work alongside his patented quartz crystal microbalance (QCM)
            biosensor technology. His work explores how sensor measurements
            and computational methods can support the analysis and
            classification of biological signals. He also developed the
            <em> Full-Stack API Engineering </em>
            course through the company’s API ecosystem to support training in
            modern, AI-assisted engineering practices.
          </p>

          <p>
            His profile brings together applied physics, materials science,
            nanosystem engineering, biosensor research, and software
            development. This interdisciplinary background informs his
            interest in technology for healthcare research, early-warning
            applications, infectious-disease surveillance, and institutional
            systems.
          </p>

          <h2 className="text-2xl font-semibold">
            Scientific Innovation &amp; Patented Biosensing Technology
          </h2>

          <p>
            <strong>US Patent 10,830,738 B2</strong> — High Q-Factor AT-Cut
            Quartz Crystal Microbalance Femtogram Mass Sensor
            <br />
            <a
              href="https://patentimages.storage.googleapis.com/44/d5/f5/3e1186c38b0a06/US10830738.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Patent PDF
            </a>
          </p>

          <p>
            <strong>US Patent Application 2020/0173898 A1</strong> — Process
            for Detecting Electrolytes &amp; Biomarkers with Femtogram Resolution
            <br />
            <a
              href="https://patentimages.storage.googleapis.com/19/a0/98/54abbea587e949/US20200173898A1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Patent Application PDF
            </a>
          </p>

          <p>
            These patent records describe QCM sensor approaches intended for
            sensitive measurement of biological and chemical indicators. They
            form part of the technical foundation for the company’s continuing
            exploration of biosensing applications and machine-learning tools.
          </p>
        </div>
      </div>

      {/* EDUCATION AND PROFESSIONAL EXPERIENCE */}
      <section className="mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Education and Professional Experience
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-2xl font-semibold">
            Research Associate — University of Alberta
          </h3>
          <p className="text-base font-medium text-gray-600">2008–2020</p>

          <p className="text-lg leading-relaxed">
            From 2008 to 2020, Dr. Mziray worked as a Research Associate at the
            University of Alberta, investigating sensor technologies with the
            potential to detect airborne infectious pathogens before exposure
            leads to infection. This work focused on the scientific challenge
            of identifying relevant biological signals early and advancing
            sensitive biosensing approaches for public-health applications.
          </p>

          <p className="text-lg leading-relaxed">
            His research interests connected sensor design, materials science,
            and biomarker detection. The intended applications included early
            recognition of indicators associated with cardiac health risks,
            including biomarkers relevant to heart failure, and the detection
            of viral indicators at an early stage. This research direction
            helped shape his continuing work in QCM biosensors and computational
            methods for interpreting sensor data.
          </p>

          <p className="text-lg leading-relaxed">
            Two key patent records associated with his biosensing innovation are
            presented in the section above: a granted US patent for a high
            Q-factor quartz crystal microbalance femtogram mass sensor and a US
            patent application concerning the detection of electrolytes and
            biomarkers with femtogram resolution. Together, these records
            illustrate the connection between his research background and his
            ongoing efforts to develop sensitive sensor technologies for
            biomedical applications.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Education and Certifications</h3>

          <div>
            <h4 className="text-xl font-semibold">
              DeepLearning.AI — Coursera (October 2025)
            </h4>
            <p className="text-lg leading-relaxed">
              Certification in AI and Deep Learning, complementing his research
              background with contemporary approaches to artificial
              intelligence and machine learning.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">
              Data Science Infinity (August 2025)
            </h4>
            <p className="text-lg leading-relaxed">
              Certification in Data Analyst Specialist, supporting continued
              development in data analysis and evidence-informed technical
              work.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">
              Northern Alberta Institute of Technology (NAIT), 2021–2024
            </h4>
            <p className="text-lg leading-relaxed">
              Diploma in Nanosystem Engineering Technology, further developing
              his applied engineering knowledge in small-scale systems and
              technology.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">
              Alabama A&amp;M University, 2002–2007
            </h4>
            <p className="text-lg leading-relaxed">
              Ph.D. in Applied Physics — Materials Science. This academic
              foundation supports his interdisciplinary work across materials,
              sensor technologies, and applied scientific research.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
