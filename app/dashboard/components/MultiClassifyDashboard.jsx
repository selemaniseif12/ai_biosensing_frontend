"use client";
import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function MultiClassifyDashboard() {
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(10);

  const [thresholdHz, setThresholdHz] = useState(0.1);

  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartMassData, setChartMassData] = useState([]);

  const [baseFreq, setBaseFreq] = useState(null);
  const [measuredFreq, setMeasuredFreq] = useState(null);

  const handleClassify = async () => {
    try {
      // Step 1: Get biosensing features
      const sim = await axios.get("http://127.0.0.1:8000/simulate");
      const features = sim.data.features;

      setBaseFreq(sim.data.base_frequency_hz);
      setMeasuredFreq(sim.data.measured_frequency_hz);

      // Step 2: Correct V6 endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/classify/v6",
        {
          features,
          input_frequency_mhz: sim.data.input_frequency_mhz || 10.0,
          threshold_hz: thresholdHz
        }
      );

      const probs = response.data.virus_probabilities;
      const masses = response.data.virus_masses_fg;
      const names = response.data.virus_names;

      let fullChart = response.data.chart_data;

      fullChart = fullChart.sort((a, b) => a.virus_id - b.virus_id);

      const filteredChart = fullChart.filter(
        (d) => d.virus_id >= rangeStart && d.virus_id <= rangeEnd
      );

      setChartData(filteredChart);

      const massChart = filteredChart.map((d) => ({
        mass: masses[d.virus_id],
        probability: d.probability
      }));

      setChartMassData(massChart);

      const ids = Object.keys(probs).map((id) => Number(id));

      const filteredRows = ids
        .sort((a, b) => a - b)
        .map((id) => ({
          id,
          name: names[id],
          mass: masses[id],
          prob: probs[id]
        }))
        .filter((v) => v.id >= rangeStart && v.id <= rangeEnd);

      setRows(filteredRows);
    } catch (err) {
      console.error("Error calling classify/v6:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virus Table (ID, Name, Mass, Probability)</h2>

      {/* Input Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label>Virus ID Start:</label>
        <input
          type="number"
          min="1"
          max="100"
          value={rangeStart}
          onChange={(e) => setRangeStart(Number(e.target.value))}
        />

        <label style={{ marginLeft: "20px" }}>Virus ID End:</label>
        <input
          type="number"
          min="1"
          max="100"
          value={rangeEnd}
          onChange={(e) => setRangeEnd(Number(e.target.value))}
        />

        <label style={{ marginLeft: "20px" }}>Threshold (Hz):</label>
        <input
          type="number"
          min={0.00000000000001}
          max={0.9}
          step="0.00000000000001"
          value={thresholdHz}
          onChange={(e) => setThresholdHz(Number(e.target.value))}
          style={{ width: "200px" }}
        />
      </div>

      <button
        style={{ padding: "10px 20px", marginBottom: "20px" }}
        onClick={handleClassify}
      >
        Run Classification
      </button>

      {/* Base + Measured Frequency */}
      {baseFreq !== null && measuredFreq !== null && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Sensor Frequencies</h3>
          <p><strong>Base Frequency (Hz):</strong> {baseFreq}</p>
          <p><strong>Measured Frequency (Hz):</strong> {measuredFreq}</p>
        </div>
      )}

      {/* Chart #1: Probability vs Virus ID */}
      {chartData.length > 0 && (
        <div style={{ marginBottom: "40px", width: "100%", maxWidth: "900px", height: "400px" }}>
          <h3>Virus Probability Chart (Filtered)</h3>
          <Line
            data={{
              labels: chartData.map((d) => d.virus_id),
              datasets: [
                {
                  label: "Probability",
                  data: chartData.map((d) => d.probability),
                  borderColor: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                  pointRadius: 3,
                  borderWidth: 2,
                  tension: 0.2
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Virus ID"
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: "Probability"
                  },
                  min: 0,
                  max: Math.max(...chartData.map((d) => d.probability)) * 1.2
                }
              }
            }}
          />
        </div>
      )}

      {/* Chart #2: Probability vs Mass */}
      {chartMassData.length > 0 && (
        <div style={{ marginBottom: "40px", width: "100%", maxWidth: "900px", height: "400px" }}>
          <h3>Probability vs Mass of Virus</h3>
          <Line
            data={{
              labels: chartMassData.map((d) => d.mass),
              datasets: [
                {
                  label: "Probability",
                  data: chartMassData.map((d) => d.probability),
                  borderColor: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.2)",
                  pointRadius: 3,
                  borderWidth: 2,
                  tension: 0.2
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Mass (fg)"
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: "Probability"
                  },
                  min: 0,
                  max: Math.max(...chartMassData.map((d) => d.probability)) * 1.2
                }
              }
            }}
          />
        </div>
      )}

      {/* Table */}
      <h3>Filtered Virus Table</h3>
      <table border="1" cellPadding="8" style={{ marginBottom: "30px" }}>
        <thead>
          <tr>
            <th>Virus ID</th>
            <th>Virus Name</th>
            <th>Mass (fg)</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.mass}</td>
              <td>{v.prob.toFixed(14)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
