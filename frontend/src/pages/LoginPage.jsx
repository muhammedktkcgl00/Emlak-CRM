// frontend/src/pages/LoginPage.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, saveTokens } from "../auth/authService"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("admin@demo.com")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await login(email, password)
      saveTokens(data)
      navigate("/listings")
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Giriş başarısız. Bilgileri kontrol et."
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
          <div className="card-pad">
            <h1 className="hero-title" style={{ fontSize: 34, marginBottom: 6 }}>
              CRM Girişi
            </h1>
            <p className="hero-sub" style={{ marginBottom: 14 }}>
              Ofis paneline erişmek için giriş yapın.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <div className="label">Şifre</div>
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              {error ? <div className="alert">{error}</div> : null}

              <button className="btn btn-primary" disabled={loading} type="submit">
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>

              <p className="small-note">
                Demo amaçlıdır. İstersen kullanıcı/rol yönetimi (OWNER/MANAGER/AGENT) ekranı da ekleriz.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}