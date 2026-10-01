export default function SensorDevices() {
  return (
    <div className="sensor-devices-container">

      <img
        src="/images/sensor-device.png"
        alt="Sensor Device"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />

      <p>
        Sensor devices are used to collect environmental and biological data
        from various locations. They provide real‑time monitoring and support
        machine learning models that detect anomalies and predict risks.
      </p>

      <p>
        These devices operate autonomously and transmit data securely to the
        backend for processing. They are designed for reliability, low power
        consumption, and high accuracy.
      </p>

      <p>
        Future versions will include enhanced connectivity, improved battery
        life, and additional sensing capabilities.
      </p>

    </div>
  );
}
