export default function MlTrainingCompare({ v2, v6 }) {
  if (!v2 || !v6) {
    return (
      <div style={{ padding: "10px", fontStyle: "italic" }}>
        No training data loaded yet. Click Execute.
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }}>
      {/* V2 Panel */}
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        background: "#fafafa",
        width: "45%"
      }}>
        <h3>Analyzer V2 (Small Dataset)</h3>
        <pre style={{
          background: "#eee",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto"
        }}>
          {JSON.stringify(v2, null, 2)}
        </pre>
      </div>

      {/* V6 Panel */}
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        background: "#fafafa",
        width: "45%"
      }}>
        <h3>Analyzer V6 (Large Dataset)</h3>
        <pre style={{
          background: "#eee",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto"
        }}>
          {JSON.stringify(v6, null, 2)}
        </pre>
      </div>
    </div>
  );
}
