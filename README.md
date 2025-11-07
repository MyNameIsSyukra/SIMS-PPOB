# 🧠 API Programmer Test – Nutech Integrasi

## 📋 Fitur Utama
- **Registrasi & Login User**
- **Cek Saldo dan Riwayat Transaksi**
- **Top-Up Saldo**
- **Transaksi Layanan Digital (Pulsa, Voucher, dll)**
- **List Banner dan Service**
- **Error Handling dan Validasi Input**
- **Implementasi Raw Query**
- **Postman API Documentation**  https://documenter.getpostman.com/view/47337986/2sB3WsPepn

---

## 🧩 Design Database
<img width="748" height="248" alt="SIMS_PPOB-2025-11-07_21-24 (1)" src="https://github.com/user-attachments/assets/0a959674-1c99-48b2-aa46-2349e4c5450e" />

Database ini terdiri dari empat tabel utama: **User**, **Transaction**, **Service**, dan **Banner**.  
Desain ini dibuat untuk mendukung kebutuhan aplikasi REST API dengan fitur registrasi, login, cek saldo, top-up, serta transaksi layanan digital seperti pulsa dan voucher.

### Tabel dan Hubungan
#### 1. **User**
Menyimpan data pengguna sistem.  
Kolom utama: `user_id`, `first_name`, `last_name`, `email`, `password`, `balance`, `profile_image`.

#### 2. **Transaction**
Mencatat semua aktivitas transaksi pengguna.  
Relasi **many-to-one** ke tabel **User** melalui kolom `User_user_id`.  
Kolom utama: `invoice_number`, `transaction_type`, `description`, `total_amount`, `created_on`.

#### 3. **Service**
Menyimpan daftar layanan digital (pulsa, voucher game, dll).  
Kolom utama: `service_code`, `service_name`, `service_icon`, `service_tariff`.

#### 4. **Banner**
Menyimpan data promosi/banner yang ditampilkan di aplikasi.  
Kolom utama: `banner_id`, `banner_name`, `banner_image`, `description`.

---

## ⚙️ Tech Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM / Query:** Sequelize
- **Documentation:** Postman
- **Deployment:** Google Cloud Platform

---

## 🚀 Startup App

Langkah-langkah untuk menjalankan aplikasi secara lokal:

### 1. Clone Repository
```bash
git clone https://github.com/MyNameIsSyukra/SIMS-PPOB
cd SIMS-PPOB
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=api_programmer_db
```

### 4. Run Database Migration
```bash
npx sequelize-cli db:migrate
```

### 5. 5. Start the Application
Untuk mode development:
```bash
npm run dev
```
Untuk mode production:
```bash
npm start
```
Aplikasi akan berjalan di:
```bash
http://localhost:1234/healthcheck
```
