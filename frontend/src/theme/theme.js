// frontend/src/theme/theme.js

const KEY = "emlakcrm_theme"

export function getTheme() {
  const saved = localStorage.getItem(KEY)
  if (saved === "light" || saved === "dark") return saved
  // system preference fallback
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
}

export function setTheme(theme) {
  localStorage.setItem(KEY, theme)
  applyTheme(theme)
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || getTheme()
  const next = current === "dark" ? "light" : "dark"
  setTheme(next)
  return next
}