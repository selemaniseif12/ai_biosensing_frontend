"use client";
import { useState } from "react";

export default function MLv2({ token }) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const runMLv2 = async () => {
        setLoading(true);
        setResult(null);

        const response = await fetch("http://localhost/ml/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                payload: {
                    sample: input
                }
            })
        });

        const data = await response.json();
        setResult(data.result || data);
        setLoading(false);
    };

    return (
        <div className="mlv2-ui">
            <h2>ML v2 Model</h2>

            <textarea
                placeholder="Enter sample data"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={runMLv2} disabled={loading}>
                {loading ? "Processing..." : "Run ML v2"}
            </button>

            {result && (
                <div className="result-box">
                    <h3>Result</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
