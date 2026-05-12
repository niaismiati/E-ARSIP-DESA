const Database = require('better-sqlite3');
const db = new Database('./test.sqlite');
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'kades', 'operator')),
    status TEXT DEFAULT 'Aktif' CHECK(status IN ('Aktif', 'Nonaktif')),
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE klasifikasi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kode TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    keterangan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE surat_masuk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomor_surat TEXT NOT NULL,
    asal_surat TEXT NOT NULL,
    perihal TEXT NOT NULL,
    tanggal_surat DATE NOT NULL,
    tanggal_terima DATE NOT NULL,
    klasifikasi_id INTEGER,
    status TEXT DEFAULT 'Menunggu' CHECK(status IN ('Belum Disposisi', 'Menunggu', 'Diproses', 'Selesai')),
    lampiran TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (klasifikasi_id) REFERENCES klasifikasi(id)
  )
`);

const hashedPassword = require('bcryptjs').hashSync('password123', 10);
const insertUser = db.prepare('INSERT INTO users (nama, email, password, role, status) VALUES (?, ?, ?, ?, ?)');
insertUser.run('Admin Sistem', 'admin@karangasem.desa.id', hashedPassword, 'admin', 'Aktif');
insertUser.run('Kepala Desa Karangasem', 'kades@karangasem.desa.id', hashedPassword, 'kades', 'Aktif');
insertUser.run('Operator Desa Karangasem', 'operator@karangasem.desa.id', hashedPassword, 'operator', 'Aktif');

const users = db.prepare('SELECT * FROM users').all();
console.log('Users:', users.map(u => ({id: u.id, role: u.role})));

const insertKlasifikasi = db.prepare('INSERT INTO klasifikasi (kode, nama, keterangan) VALUES (?, ?, ?)');
insertKlasifikasi.run('000', 'Umum', 'Musrenbang, Laporan, Protokol');
insertKlasifikasi.run('100', 'Pemerintahan', 'Administrasi Desa, Pembagian Wilayah');
insertKlasifikasi.run('400', 'Kesejahteraan', 'Sosial, Pendidikan, Kesehatan');
insertKlasifikasi.run('800', 'Kepegawaian', 'Surat Tugas, Perjalanan Dinas');
insertKlasifikasi.run('900', 'Keuangan', 'APBDes, Laporan Keuangan');

const klasifikasi = db.prepare('SELECT * FROM klasifikasi').all();
console.log('Klasifikasi:', klasifikasi.map(k => ({id: k.id, kode: k.kode})));

const insertSuratMasuk = db.prepare('INSERT INTO surat_masuk (nomor_surat, perihal, asal_surat, klasifikasi_id, tanggal_surat, tanggal_terima, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
insertSuratMasuk.run('005/123/PMD/VI/2024', 'Undangan Musrenbang Desa', 'Dinas PMD Kab. Pekalongan', 1, '2024-06-12', '2024-06-12', 'Menunggu');
insertSuratMasuk.run('042/KEC/TLN/VI/2024', 'Pemberitahuan Lomba Desa', 'Kecamatan Talun', 1, '2024-06-11', '2024-06-11', 'Diproses');
insertSuratMasuk.run('018/BD/VI/2024', 'Laporan Kegiatan Posyandu', 'Bidan Desa', 3, '2024-06-10', '2024-06-10', 'Selesai');

const suratMasuk = db.prepare('SELECT * FROM surat_masuk').all();
console.log('Surat masuk:', suratMasuk.map(s => ({id: s.id, klasifikasi_id: s.klasifikasi_id})));

db.close();
console.log('All tests passed!');
