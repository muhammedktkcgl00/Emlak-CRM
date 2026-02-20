// frontend/src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom"
import { toggleTheme } from "../theme/theme"
import { clearTokens, getAccessToken } from "../auth/authService"

export default function Navbar() {
  const navigate = useNavigate()
  const token = getAccessToken()
  const isAuthed = Boolean(token)

  function onToggleTheme() {
    toggleTheme()
  }

  function goPanelOrLogin() {
    if (isAuthed) navigate("/listings")
    else navigate("/login")
  }

  function logout() {
    clearTokens()
    navigate("/")
  }

  // mobile drawer state (pure CSS-ish with checkbox)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="brand-badge" />
          <div>Durankaya Emlak</div>
        </div>

        <nav className="nav-links">
          <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/">
            Ana Sayfa
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/about">
            Hakkımızda
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/contact">
            İletişim
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onToggleTheme} title="Tema değiştir">
            🌙
          </button>

          <button className="btn btn-primary" onClick={goPanelOrLogin}>
            {isAuthed ? "Panele Git" : "Giriş Yap"}
          </button>

          {isAuthed ? (
            <button className="btn btn-danger" onClick={logout}>
              Çıkış
            </button>
          ) : null}

          {/* Hamburger */}
          <details className="burger">
            <summary className="icon-btn" title="Menü" style={{ listStyle: "none" }}>
              ☰
            </summary>

            <div className="mobile-drawer">
              <div className="drawer-inner container">
                <div className="drawer-row">
                  <NavLink to="/" className="nav-link">
                    Ana Sayfa
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    Hakkımızda
                  </NavLink>
                  <NavLink to="/contact" className="nav-link">
                    İletişim
                  </NavLink>
                </div>

                <div className="drawer-actions">
                  <button className="icon-btn" onClick={onToggleTheme} title="Tema değiştir">
                    🌙
                  </button>
                  <button className="btn btn-primary" onClick={goPanelOrLogin}>
                    {isAuthed ? "Panele Git" : "Giriş Yap"}
                  </button>
                  {isAuthed ? (
                    <button className="btn btn-danger" onClick={logout}>
                      Çıkış
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}