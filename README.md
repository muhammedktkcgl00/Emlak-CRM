# 🏢 Mini Emlak CRM (Fullstack)

Bu proje, emlak ofisleri için geliştirilmiş mini bir CRM sistemidir.

Amaç:

- Firma için kurumsal bir web sitesi (Ana Sayfa / Hakkımızda / İletişim)
- Ofis içi kullanım için CRM paneli
- İlan ekleme / düzenleme / silme
- Filtreleme ve sayfalama
- JWT tabanlı giriş sistemi

Demo amaçlı hazırlanmıştır. Gerçek kullanım için genişletilebilir.

---

## 🚀 Özellikler

### Frontend
- React + Vite
- Dark / Light Mode
- Responsive (Mobil uyumlu)
- Login ekranı
- CRM Panel

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- CRUD işlemleri

---

## 📁 Proje Yapısı


emlak-crm/
│
├── backend/ → NestJS API
└── frontend/ → React (Vite)


---

## ⚙️ Kurulum

Bu adımlar projeyi **ilk defa indirecek kişiler içindir.**

---

### 1️⃣ Projeyi klonla

```bash
git clone REPO_LINK_BURAYA
cd emlak-crm
2️⃣ Backend kurulumu
cd backend
npm install
3️⃣ Backend .env oluştur

backend klasörü içine .env dosyası oluştur:

DATABASE_URL="postgresql://user:password@localhost:5432/emlakcrm"
JWT_SECRET="supersecret"
PORT=3000
4️⃣ Prisma migrate
npx prisma migrate dev
5️⃣ Backend çalıştır
npm run start:dev
6️⃣ Frontend kurulumu

Yeni terminal aç:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:3000

🔐 Demo Giriş

Email:

admin@demo.com

Şifre:

admin123

👨‍💻 Geliştirici

Muhammed Kütükçüoğlu
Mini CRM Demo – 2026
