"use client";

import { useState } from "react";
import { validateToken } from "./ServiceTokenClient.jsx";

export default function VirusAccessButton({ userId, token }) {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  const serviceName = "virus_list";

  const handleAccess = async () => {
    if (!token) {
      setStatus("Token required");
      return;
    }

    setStatus("Validating token...");

    const isValid = await validateToken(serviceName, token);

    if (!isValid) {
      setStatus("Invalid or inactive token");
      return;
    }

    setStatus("Accessing virus list...");

    // REQUIRED QUERY PARAMETERS
    const from_id = 1;
    const to_id = 999999;

    const response = await fetch(
      `http://127.0.0.1:8000/virus/list?from_id=${from_id}&to_id=${to_id}&token=${token}`
    );

    if (!response.ok) {
      setStatus("Invalid or inactive token");
      return;
    }

    const json = await response.json();
    setData(json);
    setStatus("Access granted");
  };

  return (
    <div>
      <button onClick={handleAccess}>Access Virus List</button>
      <p>{status}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
