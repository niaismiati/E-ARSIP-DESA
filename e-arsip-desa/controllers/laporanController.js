const db = require('../config/database');

exports.getRekap = (req, res) => {
  try {
    const { tahun, bulan, jenis } = req.query;
    const currentYear = new Date().getFullYear();
    const targetTahun = tahun || currentYear;

    let whereClause = '';
    const params = [];

    if (tahun) {
      whereClause += ` AND strftime('%Y', tanggal_surat) = ?`;
      params.push(String(tahun));
    }
    if (bulan) {
      whereClause += ` AND strftime('%m', tanggal_surat) = ?`;
      params.push(String(bulan).padStart(2, '0'));
    }

    // Get all klasifikasi
    const klasifikasiList = db.prepare('SELECT * FROM klasifikasi ORDER BY kode ASC').all();

    const result = klasifikasiList.map(k => {
      let masukCount = 0;
      let keluarCount = 0;

      if (!jenis || jenis === 'masuk' || jenis === 'semua') {
        const m = db.prepare(`
          SELECT COUNT(*) as total FROM surat_masuk
          WHERE klasifikasi_id = ? ${whereClause}
        `).get(k.id, ...params);
        masukCount = m.total;
      }

      if (!jenis || jenis === 'keluar' || jenis === 'semua') {
        const kq = db.prepare(`
          SELECT COUNT(*) as total FROM surat_keluar
          WHERE klasifikasi_id = ? ${whereClause}
        `).get(k.id, ...params);
        keluarCount = kq.total;
      }

      return {
        klasifikasi_id: k.id,
        kode: k.kode,
        nama: k.nama,
        surat_masuk: masukCount,
        surat_keluar: keluarCount,
        total: masukCount + keluarCount
      };
    }).filter(item => item.total > 0);

    const totalMasuk = result.reduce((sum, r) => sum + r.surat_masuk, 0);
    const totalKeluar = result.reduce((sum, r) => sum + r.surat_keluar, 0);
    const grandTotal = totalMasuk + totalKeluar;

    res.json({
      success: true,
      data: {
        periode: {
          tahun: parseInt(targetTahun),
          bulan: bulan ? parseInt(bulan) : null
        },
        rekap: result,
        total: {
          surat_masuk: totalMasuk,
          surat_keluar: totalKeluar,
          grand_total: grandTotal
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStatistikBulanan = (req, res) => {
  try {
    const { tahun } = req.query;
    const targetTahun = tahun || new Date().getFullYear();

    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const result = months.map((nama, index) => {
      const monthNum = String(index + 1).padStart(2, '0');

      const masuk = db.prepare(`
        SELECT COUNT(*) as total FROM surat_masuk
        WHERE strftime('%Y', tanggal_surat) = ? AND strftime('%m', tanggal_surat) = ?
      `).get(String(targetTahun), monthNum);

      const keluar = db.prepare(`
        SELECT COUNT(*) as total FROM surat_keluar
        WHERE strftime('%Y', tanggal_surat) = ? AND strftime('%m', tanggal_surat) = ?
      `).get(String(targetTahun), monthNum);

      return {
        bulan: nama,
        masuk: masuk.total,
        keluar: keluar.total
      };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

