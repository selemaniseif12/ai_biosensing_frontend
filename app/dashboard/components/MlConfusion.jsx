"use client";
export default function MlConfusion({ data }) {
  if (!data) {
    return (
      <div style={{ padding: "10px", fontStyle: "italic" }}>
        No confusion matrix loaded yet. Click Execute.
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "8px",
      background: "#fafafa",
      maxWidth: "600px"
    }}>
      <h3>Confusion Matrix</h3>

      <pre style={{
        background: "#eee",
        padding: "10px",
        borderRadius: "5px",
        overflowX: "auto"
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
