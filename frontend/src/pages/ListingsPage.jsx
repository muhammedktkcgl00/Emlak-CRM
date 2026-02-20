// frontend/src/pages/ListingsPage.jsx
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../api/http"
import { clearTokens } from "../auth/authService"

const STATUS_OPTIONS = ["DRAFT", "PUBLISHED", "ARCHIVED"]
const LISTING_TYPES = ["LAND", "HOUSE", "COMMERCIAL"]

const TYPE_LABELS = {
  LAND: "Arsa",
  HOUSE: "Ev",
  COMMERCIAL: "Ticari",
}

const STATUS_LABELS = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  ARCHIVED: "Arşiv",
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

function toQueryString(params) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    const s = String(v).trim()
    if (s === "") return
    sp.set(k, s)
  })
  const qs = sp.toString()
  return qs ? `?${qs}` : ""
}

function formatPriceTR(value) {
  if (value === null || value === undefined) return "-"
  const n = Number(value)
  if (!Number.isFinite(n)) return "-"
  return new Intl.NumberFormat("tr-TR").format(n)
}

export default function ListingsPage() {
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // filters
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // modal
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState("create") // create | edit
  const [editingId, setEditingId] = useState(null)

  // form
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("DRAFT")
  const [type, setType] = useState(LISTING_TYPES[0])

  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const canSubmit = useMemo(() => {
    const p = Number(price)
    return (
      title.trim().length >= 2 &&
      Number.isFinite(p) &&
      p >= 0 &&
      STATUS_OPTIONS.includes(status) &&
      LISTING_TYPES.includes(type)
    )
  }, [title, price, status, type])

  async function load() {
    setError("")
    setLoading(true)
    try {
      const qs = toQueryString({
        search,
        type: typeFilter || undefined,
        status: statusFilter || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      })

      const res = await http.get(`/listings${qs}`)
      setItems(res.data || [])
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Liste alınamadı. Token geçersiz olabilir."
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, typeFilter, statusFilter, minPrice, maxPrice])

  function handleLogout() {
    clearTokens()
    navigate("/")
  }

  function openCreate() {
    setMode("create")
    setEditingId(null)
    setTitle("")
    setPrice("")
    setStatus("DRAFT")
    setType(LISTING_TYPES[0])
    setOpen(true)
  }

  function openEdit(item) {
    setMode("edit")
    setEditingId(item.id)
    setTitle(item.title ?? "")
    setPrice(String(item.price ?? ""))
    setStatus(item.status ?? "DRAFT")
    setType(item.type ?? LISTING_TYPES[0])
    setOpen(true)
  }

  function closeModal() {
    if (saving) return
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setSaving(true)
    setError("")
    try {
      const payload = {
        title: title.trim(),
        price: Number(price),
        status,
        type,
      }

      if (mode === "create") {
        await http.post("/listings", payload)
      } else {
        await http.put(`/listings/${editingId}`, payload)
      }

      setOpen(false)
      await load()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Kaydetme başarısız."
      setError(String(msg))
    } finally {
      setSaving(false)
    }
  }

  function confirmDelete(id) {
    setDeleteId(id)
  }

  async function doDelete() {
    if (!deleteId) return
    setError("")
    try {
      await http.delete(`/listings/${deleteId}`)
      setDeleteId(null)
      await load()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Silme başarısız."
      setError(String(msg))
    }
  }

  function resetFilters() {
    setSearch("")
    setTypeFilter("")
    setStatusFilter("")
    setMinPrice("")
    setMaxPrice("")
  }

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageItems = items.slice(startIndex, endIndex)

  useEffect(() => {
    if (page !== safePage) setPage(safePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage])

  return (
    <div className="container">
      <div className="panel-shell">
        <div className="panel-head">
          <div>
            <h1 className="panel-title">İlanlar</h1>
            <p className="panel-sub">Filtrele, ekle, düzenle ve sil. (CRM Panel)</p>
          </div>

          <div className="panel-actions">
            <button className="btn btn-primary" onClick={openCreate}>
              + Yeni İlan
            </button>
            <button className="btn" onClick={load}>
              Yenile
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Çıkış
            </button>
          </div>
        </div>

        <div className="card card-pad">
          <div className="filters">
            <div className="field">
              <div className="label">Ara</div>
              <input
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Başlık / açıklama / adres..."
              />
            </div>

            <div className="field">
              <div className="label">Tür</div>
              <select
                className="input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Hepsi</option>
                {LISTING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <div className="label">Durum</div>
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Hepsi</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s] ?? s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <div className="label">Min Fiyat</div>
              <input
                className="input"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                inputMode="numeric"
              />
            </div>

            <div className="field">
              <div className="label">Max Fiyat</div>
              <input
                className="input"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="9999999"
                inputMode="numeric"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn" onClick={resetFilters} disabled={loading}>
                Filtreleri sıfırla
              </button>
            </div>
          </div>
        </div>

        <div className="pager">
          <div>
            Toplam: <b style={{ color: "var(--text)" }}>{total}</b> kayıt
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div className="field" style={{ minWidth: 140 }}>
              <div className="label">Sayfa başı</div>
              <select
                className="input"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPage(1)
                }}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1 || loading}
            >
              ◀ Önceki
            </button>

            <div className="btn" style={{ cursor: "default" }}>
              {safePage} / {totalPages}
            </div>

            <button
              className="btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages || loading}
            >
              Sonraki ▶
            </button>
          </div>
        </div>

        {loading ? <p style={{ color: "var(--muted)" }}>Yükleniyor...</p> : null}
        {error ? <div className="alert">{error}</div> : null}

        {!loading ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Başlık</th>
                  <th>Tür</th>
                  <th>Fiyat</th>
                  <th>Durum</th>
                  <th className="t-right">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ color: "var(--muted)" }}>
                      Sonuç yok.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((x) => (
                    <tr key={x.id}>
                      <td className="mono" title={x.id}>
                        {x.id}
                      </td>
                      <td>{x.title}</td>
                      <td>{TYPE_LABELS[x.type] ?? x.type}</td>
                      <td>{formatPriceTR(x.price)}</td>
                      <td>{STATUS_LABELS[x.status] ?? x.status}</td>
                      <td className="t-right">
                        <button className="btn" onClick={() => openEdit(x)}>
                          Düzenle
                        </button>{" "}
                        <button className="btn btn-danger" onClick={() => confirmDelete(x.id)}>
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Modal Create/Edit */}
        {open ? (
          <div className="modal-overlay" onMouseDown={closeModal}>
            <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="modal-header">
                <div style={{ fontWeight: 900 }}>
                  {mode === "create" ? "Yeni İlan" : "İlanı Düzenle"}
                </div>
                <button className="icon-btn" onClick={closeModal} title="Kapat">
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                  <div className="field">
                    <div className="label">Başlık</div>
                    <input
                      className="input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Örn: Satılık arsa"
                    />
                  </div>

                  <div className="field">
                    <div className="label">Tür</div>
                    <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                      {LISTING_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {TYPE_LABELS[t] ?? t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <div className="label">Fiyat</div>
                    <input
                      className="input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Örn: 2500000"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="field">
                    <div className="label">Durum</div>
                    <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s] ?? s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="btn" onClick={closeModal} disabled={saving}>
                      İptal
                    </button>
                    <button
                      type="submit"
                      className={canSubmit ? "btn btn-primary" : "btn"}
                      disabled={!canSubmit || saving}
                      style={!canSubmit ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
                    >
                      {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                  </div>

                  <p className="small-note">
                    Not: Backend enum gönderiyoruz. UI sadece Türkçe gösteriyor.
                  </p>
                </form>
              </div>
            </div>
          </div>
        ) : null}

        {/* Delete confirm */}
        {deleteId ? (
          <div className="modal-overlay" onMouseDown={() => setDeleteId(null)}>
            <div className="modal" style={{ maxWidth: 520 }} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="modal-header">
                <div style={{ fontWeight: 900 }}>Silinsin mi?</div>
                <button className="icon-btn" onClick={() => setDeleteId(null)} title="Kapat">
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p style={{ marginTop: 0, color: "var(--muted)" }}>
                  Bu ilan kalıcı olarak silinecek.
                </p>

                <div className="modal-actions">
                  <button className="btn" onClick={() => setDeleteId(null)}>
                    Vazgeç
                  </button>
                  <button className="btn btn-danger" onClick={doDelete}>
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}