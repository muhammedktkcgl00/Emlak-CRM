// frontend/src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom"
import { getAccessToken } from "../auth/authService"

export default function HomePage() {
  const navigate = useNavigate()
  const isAuthed = Boolean(getAccessToken())

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          <div className="card card-pad">
            <p style={{ margin: 0, color: "var(--muted)", fontWeight: 650 }}>
              Satılık • Kiralık • Ticari
            </p>
            <h1 className="hero-title">Bölgede doğru portföy, güvenli süreç yönetimi.</h1>
            <p className="hero-sub">
              Durankaya Emlak olarak portföyleri düzenli takip eder, hızlı geri dönüş sağlar,
              ilanları tek panelden yönetiriz. Bu demo; web sitesi + CRM panel akışını gösterir.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(isAuthed ? "/listings" : "/login")}
              >
                {isAuthed ? "Panele Git" : "CRM Girişi"}
              </button>
              <button className="btn" onClick={() => navigate("/contact")}>
                İletişime Geç
              </button>
              <button className="btn" onClick={() => navigate("/about")}>
                Hakkımızda
              </button>
            </div>

            <div className="chips">
              <span className="chip">NestJS</span>
              <span className="chip">Prisma</span>
              <span className="chip">JWT</span>
              <span className="chip">React</span>
              <span className="chip">Vite</span>
            </div>
          </div>

          <div className="card card-pad">
            <h3 style={{ marginTop: 0, marginBottom: 10 }}>Hızlı Özet</h3>
            <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Portföy & ilan yönetimi</li>
                <li>Filtreleme + arama</li>
                <li>İlan ekle / düzenle / sil</li>
                <li>Durum takibi (Taslak / Yayında / Arşiv)</li>
                <li>Mobil uyumlu kurumsal site</li>
              </ul>
            </div>

            <div style={{ height: 10 }} />
            <div style={{ padding: 12, borderRadius: 14, border: "1px solid var(--border)", background: "var(--chip)" }}>
              <div style={{ fontWeight: 750, marginBottom: 6 }}>Demo Notu</div>
              <div style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: 14 }}>
                İstersen bunu gerçek ofis sitesine çeviririz: hizmet sayfaları, portföy vitrin,
                WhatsApp hızlı iletişim, harita, ekip profilleri.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ margin: "0 0 12px", letterSpacing: "-0.02em" }}>Neler Sunuyoruz?</h2>
        <div className="grid-4">
          <div className="feature">
            <h3>Portföy Yönetimi</h3>
            <p>İlanları ekle, düzenle, arşivle. Ofis içi düzen ve takip.</p>
          </div>
          <div className="feature">
            <h3>Hızlı Filtreleme</h3>
            <p>Tür, durum ve fiyat aralığı ile saniyeler içinde listeyi daralt.</p>
          </div>
          <div className="feature">
            <h3>Kurumsal Web</h3>
            <p>Ana sayfa + hakkımızda + iletişim; marka görünürlüğü için.</p>
          </div>
          <div className="feature">
            <h3>Güvenli Giriş</h3>
            <p>JWT ile korumalı panel. Token yönetimi ve çıkış akışı.</p>
          </div>
        </div>
      </section>
    </div>
  )
}