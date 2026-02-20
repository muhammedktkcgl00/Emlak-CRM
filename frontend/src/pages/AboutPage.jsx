// frontend/src/pages/AboutPage.jsx
export default function AboutPage() {
  return (
    <div className="container">
      <section className="section">
        <div className="card card-pad">
          <h1 className="hero-title" style={{ marginBottom: 8 }}>
            Hakkımızda
          </h1>
          <p className="hero-sub">
            Durankaya Emlak; satılık, kiralık ve ticari portföylerde danışmanlık sunar.
            Şeffaf süreç, doğru fiyatlandırma ve hızlı iletişimle çalışır.
          </p>

          <div style={{ height: 16 }} />
          <div className="grid-4">
            <div className="feature">
              <h3>Doğru Eşleşme</h3>
              <p>İhtiyaca uygun portföy, net kriterlerle seçilir.</p>
            </div>
            <div className="feature">
              <h3>Şeffaf Süreç</h3>
              <p>Yer gösterimden sözleşmeye kadar takip ve bilgilendirme.</p>
            </div>
            <div className="feature">
              <h3>Hızlı İletişim</h3>
              <p>Geri dönüşleri geciktirmeden yönetiriz.</p>
            </div>
            <div className="feature">
              <h3>CRM Disiplini</h3>
              <p>İlan/portföy düzeni ve raporlama için panel kullanırız.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}