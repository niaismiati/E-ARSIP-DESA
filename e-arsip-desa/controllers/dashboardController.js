const db = require('../config/database');

exports.getStats = (req, res) => {
  try {
    const suratMasukTotal = db.prepare('SELECT COUNT(*) as total FROM surat_masuk').get();
    const suratKeluarTotal = db.prepare('SELECT COUNT(*) as total FROM surat_keluar').get();
    const disposisiBaru = db.prepare("SELECT COUNT(*) as total FROM disposisi WHERE status = 'Menunggu'").get();
    const totalArsip = db.prepare('SELECT COUNT(*) as total FROM (SELECT id FROM surat_masuk UNION ALL SELECT id FROM surat_keluar)').get();

    res.json({
      success: true,
      data: {
        surat_masuk: suratMasukTotal.total,
        surat_keluar: suratKeluarTotal.total,
        disposisi_baru: disposisiBaru.total,
        total_arsip: totalArsip.total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getChartData = (req, res) => {
  try {
    const now = new Date();
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const monthName = d.toLocaleString('id-ID', { month: 'short' });

      const masuk = db.prepare(`
        SELECT COUNT(*) as total FROM surat_masuk
        WHERE strftime('%Y', tanggal_surat) = ? AND strftime('%m', tanggal_surat) = ?
      `).get(String(year), month);

      const keluar = db.prepare(`
        SELECT COUNT(*) as total FROM surat_keluar
        WHERE strftime('%Y', tanggal_surat) = ? AND strftime('%m', tanggal_surat) = ?
      `).get(String(year), month);

      result.push({
        bulan: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        masuk: masuk.total,
        keluar: keluar.total
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecentLetters = (req, res) => {
  try {
    const masuk = db.prepare(`
      SELECT sm.id, sm.perihal, sm.asal_surat as asal_tujuan, sm.tanggal_surat as tanggal, 'Masuk' as jenis, sm.status
      FROM surat_masuk sm
      ORDER BY sm.created_at DESC
      LIMIT 5
    `).all();

    const keluar = db.prepare(`
      SELECT sk.id, sk.perihal, sk.tujuan_surat as asal_tujuan, sk.tanggal_surat as tanggal, 'Keluar' as jenis, 'Selesai' as status
      FROM surat_keluar sk
      ORDER BY sk.created_at DESC
      LIMIT 5
    `).all();

    const combined = [...masuk, ...keluar]
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, 5);

    res.json({ success: true, data: combined });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPendingDisposisi = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT d.id, d.instruksi, d.status, d.created_at, d.batas_waktu,
        sm.id as surat_masuk_id, sm.nomor_surat, sm.perihal, sm.asal_surat, sm.tanggal_terima,
        dari.nama as dari_nama
      FROM disposisi d
      JOIN surat_masuk sm ON d.surat_masuk_id = sm.id
      JOIN users dari ON d.dari_user_id = dari.id
      WHERE d.status = 'Menunggu'
      ORDER BY d.created_at DESC
      LIMIT 5
    `).all();

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getKlasifikasiSummary = (req, res) => {
  try {
    const klasifikasiList = db.prepare('SELECT id, kode, nama FROM klasifikasi ORDER BY kode ASC').all();

    const result = klasifikasiList.map(k => {
      const masuk = db.prepare('SELECT COUNT(*) as total FROM surat_masuk WHERE klasifikasi_id = ?').get(k.id);
      const keluar = db.prepare('SELECT COUNT(*) as total FROM surat_keluar WHERE klasifikasi_id = ?').get(k.id);

      return {
        kode: k.kode,
        nama: k.nama,
        count: masuk.total + keluar.total
      };
    }).filter(k => k.count > 0);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAktivitas = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT a.*, u.nama as user_nama
      FROM aktivitas a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `).all();

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

