Baik, saya akan **memperbarui identitas desa** sesuai data yang Anda berikan, lalu **menggabungkan semua prompt** menjadi **1 dokumen lengkap** yang siap copy-paste ke Figma.

---

# 📄 DOKUMEN PROMPT FIGMA LENGKAP (SATU FILE)

> **Copy-paste seluruh teks di bawah ini ke Figma AI atau berikan ke desainer sebagai brief spesifikasi.**

---

## 🎨 PROMPT UNTUK FIGMA MAKER (UI/UX DESIGNER)

> **Anda adalah UI/UX Designer Senior. Buatkan desain lengkap website E-Arsip Desa untuk Desa Karangasem di Figma dengan spesifikasi di bawah ini.**

---

## 📋 IDENTITAS APLIKASI

| Item | Value |
|------|-------|
| **Nama Aplikasi** | E-Arsip Desa |
| **Nama Desa** | Desa Karangasem |
| **Kecamatan** | Talun |
| **Kabupaten** | Pekalongan |
| **Provinsi** | Jawa Tengah |
| **Kode Desa** | 33.26.05.2009 |
| **Alamat** | Jl. Karangasem Talun, Karangasem, Kec. Talun, Kab. Pekalongan, Jawa Tengah |

---

## 🎯 TUJUAN APLIKASI

Mengelola surat masuk, surat keluar, disposisi, dan klasifikasi surat secara digital untuk **Desa Karangasem, Kecamatan Talun, Kabupaten Pekalongan**.

---

## 👥 PENGGUNA (3 ROLE)

| Role | Warna | Hak Akses |
|------|-------|-----------|
| **Operator** | Hijau (`#2E7D32`) | Input surat, buat disposisi, lihat semua surat |
| **Kepala Desa** | Biru (`#1E3A8A`) | Setujui disposisi, lihat dashboard & laporan |
| **Admin** | Abu-abu gelap (`#374151`) | Kelola pengguna, pengaturan desa, semua akses |

---

## 🎨 DESIGN SYSTEM

### Warna

| Jenis | Kode | Penggunaan |
|-------|------|------------|
| **Primer** | `#2E7D32` | Tombol utama, sidebar aktif, header |
| **Sekunder** | `#F3F4F6` | Background card, sidebar |
| **Teks Gelap** | `#111827` | Judul, teks utama |
| **Teks Abu** | `#6B7280` | Label, subjudul |
| **Sukses** | `#10B981` | Status "Selesai" |
| **Peringatan** | `#F59E0B` | Status "Menunggu" |
| **Danger** | `#EF4444` | Tombol hapus, status error |
| **Info** | `#3B82F6` | Status "Diproses" |
| **Background** | `#F9FAFB` | Halaman utama |
| **Card** | `#FFFFFF` | Card putih |

### Tipografi

| Elemen | Font | Ukuran | Weight |
|--------|------|--------|--------|
| Judul Halaman | Inter | 24px | Bold |
| Subjudul | Inter | 18px | SemiBold |
| Teks Body | Inter | 14px | Regular |
| Label Form | Inter | 12px | Medium |
| Nomor Surat | Monospace | 14px | Regular |
| Nama Desa (sidebar) | Inter | 12px | Medium |

### Spacing & Radius

| Property | Value |
|----------|-------|
| Grid | 8px |
| Padding card | 16px |
| Border radius | 8px (card), 4px (button), 12px (modal) |
| Shadow | `0 1px 3px rgba(0,0,0,0.1)` |

### Logo Desa Karangasem

**Deskripsi Logo (Placeholder di Figma):**
- Bentuk: Gapura / Candi / Pohon beringin sederhana
- Warna: Hijau `#2E7D32` + Putih
- Background: Lingkaran putih dengan border hijau
- Ukuran: 40x40px (sidebar), 80x80px (login), 32x32px (header)

**Atau gunakan icon dari library Figma:**
- Cari icon: `Government`, `Village`, `Gate`

---

## 📄 DAFTAR HALAMAN (12 HALAMAN)

### Halaman 1: Login (`/login`)

**Deskripsi:**
- Halaman pertama saat membuka aplikasi
- Background: hijau muda/abu-abu dengan ilustrasi arsip atau kantor desa
- **Logo Desa Karangasem** di atas form (80x80px)
- **Nama Desa** di bawah logo: "Desa Karangasem"

**Form elements:**
| Field | Type |
|-------|------|
| Email | Text input (placeholder: email@desa.id) |
| Password | Password |

**Tombol:** "Masuk" (hijau, lebar penuh)

**Informasi desa di footer:**
```
Desa Karangasem, Kec. Talun, Kab. Pekalongan, Jawa Tengah
```

---

### Halaman 2: Dashboard Kepala Desa (`/dashboard/kades`)

**Header:**
- Selamat datang, [Nama Kepala Desa]
- Foto profil (avatar)
- Nama desa: "Desa Karangasem" (badge kecil)

**Sidebar Kiri:**
```
┌─────────────────────┐
│  🏛️ Logo (40x40)    │
│  E-Arsip Desa       │
│  Desa Karangasem    │ ← Nama desa
├─────────────────────┤
│  📊 Dashboard       │
│  📬 Surat Masuk     │
│  📤 Surat Keluar    │
│  📋 Disposisi Saya  │
│  📁 Klasifikasi     │
│  📈 Laporan         │
│  ⚙️ Pengaturan      │
├─────────────────────┤
│  Desa Karangasem    │
│  Kec. Talun         │ ← Footer sidebar
│  Kab. Pekalongan    │
│  Jawa Tengah        │
└─────────────────────┘
```

**Konten Utama:**

**Baris 1 – Card Statistik (4 card):**
| Card 1 | Card 2 | Card 3 | Card 4 |
|--------|--------|--------|--------|
| 📥 28 | 📤 32 | ⏳ 5 | ✓ 60 |
| Surat Masuk | Surat Keluar | Disposisi Baru | Total Arsip |

**Baris 2 – Grafik Surat (6 Bulan Terakhir):**
- Chart bar (biru untuk masuk, hijau untuk keluar)
- Sumbu X: Jan, Feb, Mar, Apr, Mei, Jun
- Sumbu Y: 0, 10, 20, 30, 40, 50

**Baris 3 – Tabel Surat Terbaru (5 baris):**
| Perihal | Asal/Tujuan | Tanggal | Jenis |
|---------|-------------|---------|-------|
| Undangan Musrenbang Desa | Dinas PMD Kab. Pekalongan | 12/06/2024 | 📥 Masuk |
| Surat Pengantar Nikah | Warga: Budi Santoso | 11/06/2024 | 📤 Keluar |

**Baris 4 (side right) – Disposisi Menunggu:**
- Undangan Musrenbang Desa (Dinas PMD) → [Setujui] [Tolak]
- Pemberitahuan Lomba Desa (Kecamatan Talun) → [Setujui] [Tolak]

---

### Halaman 3: Surat Masuk (`/surat-masuk`)

**Filter Bar:**
| Filter | Type |
|--------|------|
| 🔍 Cari surat... | Search input |
| Status Disposisi | Dropdown |
| Klasifikasi | Dropdown |

**Tombol:** "+ Tambah Surat Masuk" (hijau)

**Tabel Surat Masuk (kolom):**
| No | Nomor Surat | Asal Surat | Perihal | Tanggal | Klasifikasi | Status | Aksi |
|----|-------------|------------|---------|---------|-------------|--------|------|
| 1 | 005/123/PMD/VI/2024 | Dinas PMD Kab. Pekalongan | Undangan Musrenbang | 12/06/2024 | 000 - Umum | ⏳ Menunggu | ✏️ 🗑️ 📋 |

**Status Badge:**
- Belum Disposisi → 🟡 Kuning
- Menunggu → 🟠 Oranye
- Diproses → 🔵 Biru
- Selesai → 🟢 Hijau

---

### Halaman 4: Form Tambah Surat Masuk (Modal)

**Form fields:**
| Field | Type |
|-------|------|
| Nomor Surat | Text input |
| Asal Surat | Text input |
| Perihal | Textarea |
| Tanggal Surat | Date picker |
| Tanggal Terima | Date picker |
| Klasifikasi | Select dropdown |
| Lampiran (PDF) | File upload (max 5MB) |

**Tombol:** Simpan (hijau), Batal (abu-abu)

---

### Halaman 5: Surat Keluar (`/surat-keluar`)

**Layout 2 kolom:**
- **Kiri (40%):** Form Tambah Surat Keluar
- **Kanan (60%):** Tabel Daftar Surat Keluar

**Form Surat Keluar:**
| Field | Type | Keterangan |
|-------|------|-------------|
| Nomor Surat | Text + tombol 🔄 | Bisa auto/manual |
| Tanggal Surat | Date picker | - |
| Tujuan Surat | Text input | - |
| Perihal | Textarea | - |
| Klasifikasi | Select dropdown | - |
| Lampiran | File upload (PDF) | - |

**Checkbox:** ☑️ Generate otomatis (rekomendasi)

**Preview nomor surat (jika auto):**
```
📄 001 / 470 / KS / 06 / 2024
   │    │    │    │      │
   │    │    │    │      └─ Tahun
   │    │    │    └──────── Bulan (Juni)
   │    │    └───────────── Inisial Desa (Karangasem → KS)
   │    └────────────────── Kode Surat
   └─────────────────────── Nomor Urut
```

---

### Halaman 6: Klasifikasi Surat (`/klasifikasi`)

**Tombol:** "+ Tambah Klasifikasi" (hijau)

**Tabel Klasifikasi (5 data default + bisa tambah):**
| Kode | Nama Klasifikasi | Keterangan | Aksi |
|------|-----------------|------------|------|
| 000 | Umum | Musrenbang, Laporan, Protokol | ✏️ 🗑️ |
| 100 | Pemerintahan | Administrasi Desa, Pembagian Wilayah | ✏️ 🗑️ |
| 400 | Kesejahteraan | Sosial, Pendidikan, Kesehatan | ✏️ 🗑️ |
| 800 | Kepegawaian | Surat Tugas, Perjalanan Dinas | ✏️ 🗑️ |
| 900 | Keuangan | APBDes, Laporan Keuangan | ✏️ 🗑️ |

**Form Tambah Klasifikasi (Modal):**
| Field | Type |
|-------|------|
| Kode | Text (3 digit) |
| Nama Klasifikasi | Text |
| Keterangan | Textarea |

---

### Halaman 7: Disposisi (Operator) – `/disposisi/operator`

**Tabel Surat yang perlu disposisi:**
| No | Nomor Surat | Asal Surat | Perihal | Aksi |
|----|-------------|------------|---------|------|
| 1 | 005/123/PMD/VI/2024 | Dinas PMD Kab. Pekalongan | Undangan Musrenbang | 📋 Buat Disposisi |

**Modal Buat Disposisi:**
| Field | Type |
|-------|------|
| Surat Masuk | Readonly |
| Kepada | Select (Kepala Desa Karangasem) |
| Instruksi | Textarea |
| Batas Waktu | Date picker (opsional) |

---

### Halaman 8: Disposisi (Kepala Desa) – `/disposisi/kades`

**Tabel Disposisi Menunggu:**
| No | Tanggal | Nomor Surat | Perihal | Instruksi | Aksi |
|----|---------|-------------|---------|-----------|------|
| 1 | 12/06/2024 | 005/123/PMD/VI/2024 | Undangan Musrenbang | Mohon paraf | ✅ Setujui ❌ Tolak |

**Modal Setujui:**
- Catatan (textarea opsional)
- Tombol: Setujui (hijau), Tolak (merah)

**Riwayat Disposisi Selesai (tabel di bawah):**
| Tanggal | Surat | Status | Catatan |
|---------|-------|--------|---------|
| 10/06/2024 | Surat Pengantar Nikah | Selesai | Disetujui |

---

### Halaman 9: Laporan (`/laporan`)

**Filter:**
| Filter | Type |
|--------|------|
| Periode | Select (Bulan/Tahun) |
| Jenis Laporan | Select (Semua/Masuk/Keluar) |

**Tombol:** Tampilkan | Cetak PDF | Ekspor Excel

**Header Laporan (menggunakan data Desa Karangasem):**
```
┌─────────────────────────────────────────────────┐
│  [LOGO]     PEMERINTAH DESA KARANGASEM          │
│  60x60px    Kecamatan Talun                     │
│             Kabupaten Pekalongan                │
│             Jawa Tengah                         │
│             ─────────────────────────────────── │
│             LAPORAN ARSIP SURAT DESA            │
│             Periode: Januari - Juni 2024        │
└─────────────────────────────────────────────────┘
```

**Tabel Rekap Surat:**
| Klasifikasi | Surat Masuk | Surat Keluar | Total |
|-------------|-------------|--------------|-------|
| 000 - Umum | 12 | 8 | 20 |
| 100 - Pemerintahan | 18 | 6 | 24 |
| **TOTAL** | **63** | **38** | **101** |

---

### Halaman 10: Pengaturan – Pengguna (`/pengaturan/pengguna`) – [ADMIN only]

**Tombol:** "+ Tambah Pengguna" (hijau)

**Tabel Pengguna:**
| No | Nama | Email | Role | Status | Aksi |
|----|------|-------|------|--------|------|
| 1 | Operator Desa Karangasem | operator@karangasem.desa.id | Operator | Aktif | ✏️ 🗑️ |
| 2 | Kepala Desa Karangasem | kades@karangasem.desa.id | Kepala Desa | Aktif | ✏️ 🗑️ |
| 3 | Admin Sistem | admin@karangasem.desa.id | Admin | Aktif | ✏️ 🗑️ |

**Modal Tambah Pengguna:**
| Field | Type |
|-------|------|
| Nama Lengkap | Text |
| Email | Email |
| Password | Password (min 6) |
| Role | Select |

---

### Halaman 11: Pengaturan – Profil Saya (`/pengaturan/profil`) – [SEMUA ROLE]

**Form:**
| Field | Type | Value |
|-------|------|-------|
| Nama Lengkap | Text | (sesuai login) |
| Email | Email (readonly) | (sesuai login) |
| Jabatan | Text (readonly) | Operator/Kades/Admin |
| Desa | Text (readonly) | Desa Karangasem |
| Avatar | File upload | (opsional) |

**Ubah Password:**
| Field | Type |
|-------|------|
| Password Lama | Password |
| Password Baru | Password |
| Konfirmasi Password | Password |

---

### Halaman 12: Pengaturan – Profil Desa (`/pengaturan/desa`) – [ADMIN only] ✨ BARU

**Form Identitas Desa Karangasem:**

| Field | Type | Nilai Default (Desa Karangasem) |
|-------|------|--------------------------------|
| **Logo Desa** | Upload gambar | Logo gapura/sawah |
| **Nama Desa** | Text input | Desa Karangasem |
| **Kecamatan** | Text input | Talun |
| **Kabupaten** | Text input | Pekalongan |
| **Provinsi** | Text input | Jawa Tengah |
| **Kode Desa** | Text input | 33.26.05.2009 |
| **Alamat Kantor** | Textarea | Jl. Karangasem Talun, Karangasem, Kec. Talun, Kab. Pekalongan, Jawa Tengah |
| **No. Telepon** | Text input | (isi sesuai) |
| **Email Desa** | Email input | desa@karangasem.desa.id |

**Tombol:** 📸 Upload Logo | 💾 Simpan Perubahan (hijau) | 🔄 Reset ke Default

---

**Form Format Nomor Surat (Bisa Diubah Admin):**

| Field | Type | Nilai Default |
|-------|------|---------------|
| **Format Nomor Surat** | Select | `{nomor}/{kode}/{inisial}/{bulan}/{tahun}` |
| **Inisial Desa** | Text (3 huruf) | `KS` (Karangasem) |
| **Kode Surat Default** | Select | `470` |
| **Separator** | Select | `/` |
| **Panjang Nomor Urut** | Select | `3 digit (001)` |

**Preview:**
```
📄 001 / 470 / KS / 06 / 2024
   │    │    │    │      │
   │    │    │    │      └─ 2024
   │    │    │    └──────── Juni
   │    │    └───────────── KS (Karangasem)
   │    └────────────────── Kode Surat
   └─────────────────────── Nomor urut 001
```

**Tombol:** 💾 Simpan Format | 🧪 Test Generate

---

## 📱 RESPONSIVE BREAKPOINTS

| Device | Breakpoint | Perubahan |
|--------|------------|-----------|
| **Desktop** | > 1024px | Sidebar full, tabel normal |
| **Tablet** | 768px - 1024px | Sidebar collapsed (icon only) |
| **Mobile** | < 768px | Sidebar bottom nav, card 2x2 |

---

## 🧩 KOMPONEN UI YANG HARUS DIBUAT (COMPONENT LIBRARY)

1. **Button** – Primary (hijau), Secondary, Danger, Outline
2. **Input Field** – Text, Email, Password, Date, File upload
3. **Select Dropdown** – Klasifikasi, Status, Role
4. **Table** – Header sticky, hover, action buttons
5. **Card Statistik** – Icon + label + value
6. **Badge** – Status warna-warni
7. **Modal** – Tambah/edit/konfirmasi
8. **Sidebar Menu** – Collapsible, active state
9. **Pagination** – Prev, Next, halaman aktif
10. **Toast Notification** – Sukses/gagal
11. **Loading Skeleton**
12. **Empty State** – "Belum ada data"

---

## 🔗 FLOW PROTOTYPE

```
Login (Desa Karangasem)
    ↓
Dashboard (sesuai role)
    ↓
┌───────────────────────────────────────┐
│ Surat Masuk → Tambah → Edit → Hapus  │
│ Surat Keluar → Tambah (auto format)   │
│ Disposisi → Operator → Kades → Approve│
│ Klasifikasi → Tambah kode baru        │
│ Laporan → Filter → Cetak PDF          │
│ Pengaturan → Profil Desa (ubah identitas)│
└───────────────────────────────────────┘
```

---

## ✅ CHECKLIST FINAL SEBELUM EXPORT FIGMA

- [ ] Logo Desa Karangasem muncul di sidebar & login
- [ ] Nama desa "Desa Karangasem" muncul di sidebar footer
- [ ] Alamat desa (Jl. Karangasem Talun, Kab. Pekalongan) muncul di footer
- [ ] Profil Desa bisa diubah (form identitas desa)
- [ ] Format nomor surat bisa diubah (admin)
- [ ] Semua 12 halaman selesai
- [ ] Component library reusable
- [ ] Responsive di 3 breakpoint

---

## 📤 OUTPUT YANG DIHARAPKAN

| No | Output |
|----|--------|
| 1 | **12 halaman desain** (sesuai daftar) |
| 2 | **Component library** dengan Auto Layout |
| 3 | **Prototype link** untuk simulasi klik |
| 4 | **Export PDF** untuk cetak blueprint |

---

**Mulai buat desain di Figma sekarang!** 🚀

---

## 📌 CATATAN PENUTUP

Dengan prompt di atas, desain Figma Anda akan:

| Fitur | Status |
|-------|--------|
| Nama desa "Desa Karangasem" | ✅ Tampil di sidebar, login, footer |
| Alamat desa (Talun, Pekalongan, Jateng) | ✅ Tampil di footer laporan |
| Kode desa (33.26.05.2009) | ✅ Tampil di profil desa |
| Logo bisa diubah | ✅ Ada upload button |
| Format nomor surat bisa diubah | ✅ Ada pengaturan khusus |
| Identitas desa bisa diubah | ✅ Admin bisa edit kapan saja |

**Desa Karangasem, Kecamatan Talun, Kabupaten Pekalongan, Jawa Tengah** sekarang menjadi **studi kasus utama** dalam desain ini.

Apakah ada lagi yang ingin ditambahkan atau diubah?