// ServiceTokenClient.jsx

// Store token in localStorage under its service name
export function storeToken(serviceName, token) {
  localStorage.setItem(`service_token_${serviceName}`, token);
}

// Retrieve stored token
export function getStoredToken(serviceName) {
  return localStorage.getItem(`service_token_${serviceName}`);
}

// Issue a new token from backend
export async function issueToken(serviceName, userId) {
  try {
    const response = await fetch("http://127.0.0.1:8000/tokens/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_name: serviceName,
        user_id: userId
      })
    });

    const data = await response.json();

    if (data.token) {
      storeToken(serviceName, data.token);
      return data.token;
    }

    throw new Error("Token issue failed");
  } catch (error) {
    console.error("Error issuing token:", error);
    return null;
  }
}

// ⭐ NEW — Validate an existing token
export async function validateToken(serviceName, token) {
  try {
    const response = await fetch("http://127.0.0.1:8000/tokens/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_name: serviceName,
        token: token
      })
    });

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}
