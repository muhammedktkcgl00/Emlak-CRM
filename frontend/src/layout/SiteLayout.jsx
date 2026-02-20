import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { clearTokens, getAccessToken } from "../auth/authService"

function Sun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
function Moon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 14.6A8.5 8.5 0 1 1 9.4 3a7 7 0 0 0 11.6 11.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function Menu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function SiteLayout() {
  const navigate = useNavigate()
  const token = getAccessToken()

  const initialTheme = useMemo(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved
    return "dark"
  }, [])
  const [theme, setTheme] = useState(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  function logout() {
    clearTokens()
    setMenuOpen(false)
    navigate("/")
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            Durankaya Emlak
          </Link>

          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Ana Sayfa
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              Hakkımızda
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              İletişim
            </NavLink>
          </nav>

          <div className="header-right">
            <button
              className="icon-btn"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Tema"
              title="Tema"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            {token ? (
              <>
                <NavLink to="/listings" className="btn btn-primary">
                  Panele Git
                </NavLink>
                <button onClick={logout} className="btn">
                  Çıkış
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary">
                Giriş Yap
              </NavLink>
            )}
          </div>

          <button className="icon-btn hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">
            <Menu />
          </button>
        </div>

        {menuOpen ? (
          <div className="mobile-panel">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
              Ana Sayfa
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
              Hakkımızda
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
              İletişim
            </NavLink>

            <div className="sep" />

            <button className="btn" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {token ? (
              <>
                <NavLink to="/listings" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                  Panele Git
                </NavLink>
                <button className="btn" onClick={logout}>
                  Çıkış
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                Giriş Yap
              </NavLink>
            )}
          </div>
        ) : null}
      </header>

      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Durankaya Emlak • CRM</div>
          <div>İzmir • +90 5xx xxx xx xx • info@durankaya.com</div>
        </div>
      </footer>
    </>
  )
}