import PublicLabel from "../components/PublicLabel";

export default function Cart() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>
        Cart <PublicLabel />
      </h2>

      <p>This is your public cart dashboard.</p>
    </div>
  );
}
