export async function refreshToken(type: "public" | "admin") {
  const key = type === "public" ? "access_token" : "admin_token";
  const oldToken = localStorage.getItem(key);

  if (!oldToken) return null;

  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oldToken}`
      }
    });

    const data = await res.json();

    if (data.valid) {
      localStorage.setItem(key, data.token);
      return data.token;
    }

    return null;
  } catch {
    return null;
  }
}
