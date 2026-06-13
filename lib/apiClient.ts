const BASE_URL = "http://127.0.0.1:8000";

export async function apiGet(path: string, apiKey: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`API GET failed: ${res.status}`);
  }

  return res.json();
}
