// frontend/src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div>© {year} Durankaya Emlak</div>
        <div>Mini CRM Demo — Panel + Portföy Yönetimi</div>
      </div>
    </footer>
  )
}