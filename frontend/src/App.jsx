// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SiteLayout from "./components/SiteLayout"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import ListingsPage from "./pages/ListingsPage"

import { getAccessToken } from "./auth/authService"

function ProtectedRoute({ children }) {
  const token = getAccessToken()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <ListingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}