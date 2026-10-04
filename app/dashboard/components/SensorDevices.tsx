"use client";
import { useEffect, useState } from "react";

type SensorDeviceData = {
  title: string;
  image_url: string;
  content: string[];
};

export default function SensorDevices() {
  const [data, setData] = useState<SensorDeviceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ai-biosensing-backend-trial2.onrender.com/sensor-devices/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load sensor device data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!data) {
    return <div>Loading Sensor Devices...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>{data.title}</h2>

      <img
        src={data.image_url}
        alt="Sensor Device"
        style={{
          maxWidth: "350px",
          marginBottom: "20px",
          borderRadius: "10px",
          display: "block",
        }}
      />

      {data.content.map((paragraph, index) => (
        <p key={index} style={{ marginBottom: "16px" }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
