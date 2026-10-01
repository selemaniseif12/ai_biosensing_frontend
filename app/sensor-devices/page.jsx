"use client";
import { useEffect, useState } from "react";

export default function SensorDevicesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.piezo-sensors.com/sensor-devices/")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">{data.title}</h1>

      <img
        src={data.image_url}
        alt="Sensor Device"
        className="sensor-image"
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
