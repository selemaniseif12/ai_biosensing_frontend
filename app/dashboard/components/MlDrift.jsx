"use client";
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function MlDrift() {
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(100);
  const [threshold, setThreshold] = useState(0.1);

  const [timeData, setTimeData] = useState([]);
  const [freqData, setFreqData] = useState([]);
  const [driftData, setDriftData] = useState([]);

  const [baseFreq, setBaseFreq] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(null);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const initSweep = async () => {
    try {
      const res = await fetch(
        `${API}/sensor/live_init?start_time=${startTime}&stop_time=${stopTime}`
      );
      const data = await res.json();
      setBaseFreq(data.base_frequency_hz);
    } catch {
      console.error("Init sweep failed");
    }
  };

  const startLiveSweep = async () => {
    await initSweep();
    setTimeData([]);
    setFreqData([]);
    setDriftData([]);
    setCurrentFreq(null);
    setRunning(true);
  };

  const stopLiveSweep = () => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!running) return;

    const fetchTick = async () => {
      try {
        const res = await fetch(
          `${API}/sensor/live_tick?threshold=${threshold}`
        );
        const data = await res.json();

        if (data.done) {
          setCurrentFreq(data.measured_frequency_hz);
          stopLiveSweep();
          return;
        }

        setTimeData((prev) => [...prev, data.time_s]);
        setFreqData((prev) => [...prev, data.measured_frequency_hz]);
        setDriftData((prev) => [...prev, data.drift_hz]);
        setCurrentFreq(data.measured_frequency_hz);

        if (baseFreq === null) {
          setBaseFreq(data.base_frequency_hz);
        }
      } catch {
        console.error("Tick fetch failed");
      }
    };

    intervalRef.current = setInterval(fetchTick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, threshold]);

  return (
    <div style={{ padding: "20px" }}>
      {/* EDUCATIONAL BLOCK */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          lineHeight: "1.6"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          ML Drift Demonstration: Understanding the Base Frequency 1693999.683456560131 Hz
        </h2>

        {/* PATENT LINKS */}
        <div style={{ marginBottom: "20px", marginTop: "10px" }}>
          <a
            href="https://patentimages.storage.googleapis.com/44/d5/f5/3e1186c38b0a06/US10830738.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              marginRight: "10px"
            }}
          >
            View Patent: US 10,830,738 B2
          </a>

          <a
            href="https://patentimages.storage.googleapis.com/19/a0/98/54abbea587e949/US20200173898A1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            View Patent: US 2020/0173898 A1
          </a>
        </div>

        {/* SCIENTIFIC PARAGRAPHS */}
        <p>
          The MLDrift demonstration simulates femtogram‑scale frequency noise using a tuned AT‑cut quartz model. 
          This simulation is inspired by the real‑world behavior of ultrasensitive QCM sensors described in the inventor’s patents. 
          In the patented systems, the AT‑cut quartz resonators operate near 1.694 MHz, and the measured frequency noise routinely 
          falls in the 10⁻⁸ to 10⁻¹² MHz regime. These values correspond to femtogram‑scale mass changes, electrolyte fluctuations, 
          and troponin binding events. The simulation in this demo mirrors that behavior by generating micro‑drift steps and damping 
          factors that approximate the Allan deviation and Sauerbrey mass‑sensitivity relationships described in the patents.
        </p>

        <p>
          In the first patent (US 10,830,738 B2), the QCM disks with center‑dot electrodes demonstrate extremely high Q‑factors 
          and frequency stability. The Allan deviation curves (e.g., FIG. 7A) show noise floors approaching 10⁻¹³, and detection 
          limits (FIG. 7B) reaching sub‑microhertz resolution. These real measurements validate the drift model used in the demo: 
          small, stochastic frequency steps with exponential damping. The simulation’s cumulative drift behavior is directly inspired 
          by the way real QCM sensors accumulate femtogram mass on the electrode surface, producing measurable shifts in oscillation frequency.
        </p>

        <p>
          In the second patent (US 2020/0173898 A1), the probe system demonstrates how electrolytes (Na⁺, Mg²⁺, Ca²⁺, K⁺) produce 
          distinct frequency‑noise signatures between 1–2 MHz, stabilizing into predictable drift curves. The figures (FIG. 7A–12B) 
          show how ionic concentration changes produce frequency shifts on the order of 10⁻⁸ to 10⁻¹⁰ MHz, matching the drift magnitudes 
          used in the MLDrift simulation. The demo’s drift‑step tuning function mimics this behavior by adjusting drift amplitude based 
          on the sweep window, similar to how real QCM sensors respond differently depending on ionic strength, viscosity, and electrode loading.
        </p>

        <p>
          Together, these patented results justify the simulation model used in MLDrift: a controlled, stochastic drift pattern with 
          damping, bounded by femtogram‑scale noise levels. The demo is not intended to replicate the full complexity of the patented 
          QCM systems, but it provides a realistic visualization of how frequency drift evolves in high‑Q quartz sensors under femtogram 
          mass loading and electrolyte interaction.
        </p>

        <h3 style={{ marginTop: "25px" }}>Threshold Adjustment Guidance</h3>

        <p>Experiment with threshold values:</p>

        <p style={{ fontFamily: "monospace", marginLeft: "20px" }}>
          0.1<br />
          0.01<br />
          0.001<br />
          0.0001<br />
          0.00001<br />
          0.000001<br />
          0.0000001<br />
          0.00000001<br />
          0.000000001<br />
          0.0000000001
        </p>

        <p>
          Each reduction reveals deeper drift behavior and exposes subtle mass‑based perturbations.
        </p>
      </div>

      {/* LIVE SWEEP CONTROLS */}
      <h2>Live Frequency vs Time</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Start Time (s): </label>
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stop Time (s): </label>
        <input
          type="number"
          value={stopTime}
          onChange={(e) => setStopTime(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Threshold (Hz): </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <button
        onClick={startLiveSweep}
        disabled={running}
        style={{
          padding: "10px 20px",
          backgroundColor: running ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: running ? "default" : "pointer",
          marginTop: "10px",
          marginRight: "10px"
        }}
      >
        Start Live Sweep
      </button>

      <button
        onClick={stopLiveSweep}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Stop
      </button>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <p>
          <strong>Base Frequency (Hz): </strong>
          {baseFreq !== null ? baseFreq.toFixed(12) : "-"}
        </p>

        <p>
          <strong>Measured Frequency (Hz): </strong>
          {currentFreq !== null ? currentFreq.toFixed(12) : "-"}
        </p>
      </div>

      {/* CHARTS */}
      {freqData.length > 0 && (
        <>
          <h3>Frequency Samples (Hz)</h3>
          <Line
            data={{
              labels: timeData,
              datasets: [
                {
                  label: `Frequency (Hz) - threshold ${threshold}`,
                  data: freqData,
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.3)",
                  borderWidth: 2,
                  tension: 0.3,
                  pointRadius: 0
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: { title: { display: true, text: "Frequency (Hz)" } },
                x: { title: { display: true, text: "Time (s)" } }
              }
            }}
          />

          <h3 style={{ marginTop: "40px" }}>Drifted Frequency (Hz)</h3>

          <Line
            data={{
              labels: timeData,
              datasets: [
                {
                  label: "Drift (Hz)",
                  data: driftData,
                  borderColor: "orange",
                  backgroundColor: "rgba(255, 159, 64, 0.3)",
                  borderWidth: 2,
                  tension: 0.3,
                  pointRadius: 0
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: { title: { display: true, text: "Drift (Hz)" } },
                x: { title: { display: true, text: "Time (s)" } }
              }
            }}
          />

          {/* TABLES */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px"
            }}
          >
            {/* LEFT TABLE */}
            <div style={{ flex: 1 }}>
              <h3>Time vs Measured Frequency</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px"
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Time (s)
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Measured Frequency (Hz)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeData.map((t, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {t}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {freqData[i].toFixed(12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT TABLE */}
            <div style={{ flex: 1 }}>
              <h3>Time vs Drift Frequency</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px"
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Time (s)
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Drift Frequency (Hz)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeData.map((t, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {t}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {driftData[i].toFixed(12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
