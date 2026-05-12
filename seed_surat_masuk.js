const db = require('./e-arsip-desa/config/database.js');
const klasifikasiIds = db.prepare('SELECT id FROM klasifikasi LIMIT 3').all().map(k => k.id);

db.prepare('DELETE FROM surat_masuk').run();

const suratData = [
  { nomor_surat: '001/PMD/05/2026', asal_surat: 'Dinas PMD', perihal: 'Undangan Musrenbang', klasifikasi_id: klasifikasiIds[0], tanggal_surat: '2026-05-01', status: 'Belum Disposisi' },
  { nomor_surat: '002/KEC/05/2026', asal_surat: 'Kecamatan', perihal: 'Pemberitahuan Lomba', klasifikasi_id: klasifikasiIds[1], tanggal_surat: '2026-05-02', status: 'Belum Disposisi' },
  { nomor_surat: '003/BD/05/2026', asal_surat: 'Bidan Desa', perihal: 'Laporan Posyandu', klasifikasi_id: klasifikasiIds[2], tanggal_surat: '2026-05-03', status: 'Selesai' },
];

suratData.forEach(data => {
  db.prepare('INSERT INTO surat_masuk (nomor_surat, perihal, asal_surat, klasifikasi_id, tanggal_surat, status, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)').run(
    data.nomor_surat, data.perihal, data.asal_surat, data.klasifikasi_id, data.tanggal_surat, data.status
  );
});

console.log('✅ Added 3 surat masuk with 2026 dates and klasifikasi');
console.log('Count:', db.prepare('SELECT COUNT(*) as c FROM surat_masuk WHERE strftime(\'%Y\', tanggal_surat) = \'2026\'').get().c);

