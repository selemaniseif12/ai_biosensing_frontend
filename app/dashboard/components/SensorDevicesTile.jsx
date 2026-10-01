import Link from "next/link";

export default function SensorDevicesTile() {
  return (
    <Link href="/sensor-devices" className="dashboard-tile">
      <div className="tile-content">
        <h2 className="tile-title">Sensor Devices</h2>
        <p className="tile-subtitle">View device specs and legal information</p>
      </div>
    </Link>
  );
}
