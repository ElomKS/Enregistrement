const USE_MOCK = false;
const API_BASE = "https://enregistrement-sypl.onrender.com/api";
const USERS_URL = `${API_BASE}/users`;
const AUTH_URL = `${API_BASE}/auth`;

let authToken = localStorage.getItem("token") || null;
let authUser = JSON.parse(localStorage.getItem("user") || "null");

export function getAuthToken() { return authToken; }
export function getAuthUser() { return authUser; }

export function setAuth(token, user) {
  authToken = token;
  authUser = user;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  authToken = null;
  authUser = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function login(username, password) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Échec de la connexion.");
  setAuth(data.token, { username: data.username, role: data.role });
  return data;
}

async function apiCall(path, options = {}) {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(`${USERS_URL}${path}`, { headers, ...options });
  if (res.status === 401) { clearAuth(); window.location.reload(); throw new Error("Session expirée."); }
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export function nextRecordNo(users) {
  const max = users.reduce((m, u) => Math.max(m, parseInt(u.recordNo, 10) || 0), 0);
  return String(max + 1).padStart(4, "0");
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export { apiCall, USE_MOCK };
