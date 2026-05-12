import { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, Eye, X, Download, AlertCircle } from 'lucide-react';

interface SuratKeluarItem {
  id: number;
  nomor_surat: string;
  tujuan_surat: string;
perihal: string;
  tanggal_surat: string;
  klasifikasi_kode?: string;
  klasifikasi_nama?: string;
  lampiran: string | null;
  created_at?: string;
}

export function SuratKeluar() {
  const [items, setItems] = useState<SuratKeluarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [detailItem, setDetailItem] = useState<SuratKeluarItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<SuratKeluarItem | null>(null);

  const [form, setForm] = useState({
    nomor_surat: '',
    tujuan_surat: '',
    perihal: '',
    tanggal_surat: '',
    klasifikasi_id: '',
  });

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    loadData();
  }, [search]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await fetch(`/api/surat-keluar${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setItems(data.data);
      else setError(data.message);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    body.append('nomor_surat', form.nomor_surat);
    body.append('tujuan_surat', form.tujuan_surat);
    body.append('perihal', form.perihal);
    body.append('tanggal_surat', form.tanggal_surat);
    if (form.klasifikasi_id) body.append('klasifikasi_id', form.klasifikasi_id);

    try {
      const url = editingId ? `/api/surat-keluar/${editingId}` : '/api/surat-keluar';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setEditingId(null);
        setForm({ nomor_surat: '', tujuan_surat: '', perihal: '', tanggal_surat: '', klasifikasi_id: '' });
        loadData();
      } else {
        alert(data.message || 'Gagal menyimpan');
      }
    } catch {
      alert('Terjadi kesalahan');
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      const res = await fetch(`/api/surat-keluar/${deleteItem.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDeleteItem(null);
        loadData();
      } else {
        alert(data.message || 'Gagal menghapus');
      }
    } catch {
      alert('Terjadi kesalahan');
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ nomor_surat: '', tujuan_surat: '', perihal: '', tanggal_surat: '', klasifikasi_id: '' });
    setShowForm(true);
  };

  const openEdit = (item: SuratKeluarItem) => {
    setEditingId(item.id);
    setForm({
      nomor_surat: item.nomor_surat,
      tujuan_surat: item.tujuan_surat,
      perihal: item.perihal,
      tanggal_surat: item.tanggal_surat,
      klasifikasi_id: '',
    });
    setShowForm(true);
  };

  const fmtDate = (s: string) => {
    if (!s) return '-';
    const d = new Date(s);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Surat Keluar</h2>
          <p className="text-sm text-gray-600">Kelola surat keluar desa</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-5 h-5" /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor, tujuan, perihal..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nomor Surat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tujuan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Perihal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Klasifikasi</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Memuat...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Tidak ada data</td></tr>
            ) : (
              items.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.nomor_surat}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.tujuan_surat}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.perihal}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{fmtDate(item.tanggal_surat)}</td>
                  <td className="px-4 py-3">
                    {item.klasifikasi_kode ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{item.klasifikasi_kode}</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setDetailItem(item)} className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Detail"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteItem(item)} className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">{editingId ? 'Edit' : 'Tambah'} Surat Keluar</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
                <input type="text" value={form.nomor_surat} onChange={(e) => setForm({ ...form, nomor_surat: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Surat</label>
                <input type="text" value={form.tujuan_surat} onChange={(e) => setForm({ ...form, tujuan_surat: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perihal</label>
                <textarea value={form.perihal} onChange={(e) => setForm({ ...form, perihal: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
                <input type="date" value={form.tanggal_surat} onChange={(e) => setForm({ ...form, tanggal_surat: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {detailItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Detail Surat Keluar</h3>
              <button onClick={() => setDetailItem(null)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm"><span className="text-gray-600">Nomor:</span> <span className="font-medium">{detailItem.nomor_surat}</span></p>
              <p className="text-sm"><span className="text-gray-600">Tujuan:</span> {detailItem.tujuan_surat}</p>
              <p className="text-sm"><span className="text-gray-600">Perihal:</span> {detailItem.perihal}</p>
              <p className="text-sm"><span className="text-gray-600">Tanggal:</span> {fmtDate(detailItem.tanggal_surat)}</p>
              <p className="text-sm"><span className="text-gray-600">Klasifikasi:</span> {detailItem.klasifikasi_kode || '-'} {detailItem.klasifikasi_nama || ''}</p>
              {detailItem.lampiran && (
                <a href={`http://localhost:5000${detailItem.lampiran}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline">
                  <Download className="w-4 h-4" />Unduh Lampiran
                </a>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {deleteItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Surat Keluar?</h3>
            <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus surat <strong>{deleteItem.nomor_surat}</strong>?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
