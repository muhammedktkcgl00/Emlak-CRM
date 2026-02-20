// frontend/src/pages/ContactPage.jsx
export default function ContactPage() {
  return (
    <div className="container">
      <section className="section">
        <div className="card card-pad">
          <h1 className="hero-title" style={{ marginBottom: 8 }}>
            İletişim
          </h1>
          <p className="hero-sub">
            Teklif, portföy soruları veya iş birliği için bize ulaşabilirsiniz.
          </p>

          <div style={{ height: 16 }} />

          <div className="grid-4">
            <div className="feature">
              <h3>Telefon</h3>
              <p>+90 (5xx) xxx xx xx</p>
            </div>
            <div className="feature">
              <h3>E-posta</h3>
              <p>info@durankayaemlak.com</p>
            </div>
            <div className="feature">
              <h3>Adres</h3>
              <p>İzmir / Türkiye</p>
            </div>
            <div className="feature">
              <h3>Çalışma Saatleri</h3>
              <p>Hafta içi 09:00 – 18:00</p>
            </div>
          </div>

          <div style={{ height: 14 }} />
          <div style={{ padding: 14, borderRadius: 16, border: "1px solid var(--border)", background: "var(--chip)" }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>İpucu</div>
            <div style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              Buraya istersen form ekleriz (isim/telefon/mesaj) + WhatsApp hızlı bağlantı + Google Maps.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}