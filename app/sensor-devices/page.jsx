"use client";
import { useEffect, useState } from "react";

export default function SensorDevicesPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sensor-devices/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load sensor device data");
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="page-container">

      {/* NO HEADERS AT ALL */}

      <img
        src={data.image_url}
        alt="Sensor Device"
        className="sensor-image"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />

      <div className="content-section">
        {data.content.map((paragraph, index) => (
          <p key={index} className="paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
