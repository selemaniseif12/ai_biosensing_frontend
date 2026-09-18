export default function CustomersPanel({ customers }) {
  if (!customers || customers.length === 0) {
    return (
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Customers</h3>
        <p>No customers found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Customers</h3>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Created</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{customer.id}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{customer.name}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{customer.email}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {new Date(customer.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
