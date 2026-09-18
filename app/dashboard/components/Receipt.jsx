export default function Receipt({ receipt }) {
  if (!receipt) return null;

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        marginBottom: "12px",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>Receipt #{receipt.id}</h3>

      <p><strong>Amount:</strong> ${receipt.amount}</p>
      <p><strong>Date:</strong> {receipt.date}</p>
      <p><strong>Description:</strong> {receipt.description}</p>

      {receipt.items && (
        <div style={{ marginTop: "10px" }}>
          <strong>Items:</strong>
          <ul>
            {receipt.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
