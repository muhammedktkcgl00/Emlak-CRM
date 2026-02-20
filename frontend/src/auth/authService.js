import http from "../api/http"

export async function login(email, password) {
  const res = await http.post("/auth/login", { email, password })
  // Beklenen: { accessToken, refreshToken }
  return res.data
}

export function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem("accessToken", accessToken)
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
}

export function clearTokens() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"))
}

// alias (HomePage/App için)
export function getAccessToken() {
  return localStorage.getItem("accessToken")
}

