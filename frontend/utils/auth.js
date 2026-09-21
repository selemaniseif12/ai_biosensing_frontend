// Save admin token
export function setAdminToken(token) {
  localStorage.setItem("admin_token", token);
}

// Get admin token
export function getAdminToken() {
  return localStorage.getItem("admin_token");
}

// Remove admin token
export function clearAdminToken() {
  localStorage.removeItem("admin_token");
}
