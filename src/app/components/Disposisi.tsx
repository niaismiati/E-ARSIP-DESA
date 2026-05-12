import { useState, useEffect } from 'react';
import { Search, Plus, Eye, X, CheckCircle, Clock, AlertCircle, FileText, User } from 'lucide-react';

interface DisposisiItem {
  id: number;
  surat_masuk_id: number;
  nomor_surat: string;
  asal_surat: string;
  surat_perihal: string;
  dari_nama: string;
  dari_role: string;
  instruksi: string;
  status: string;
  batas_waktu: string | null;
  created_at: string;
}

export function Disposisi() {
  const [items, setItems] = useState<DisposisiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [detailItem, setDetailItem] = useState<DisposisiItem | null>(null);
  const [filterStatus, setFilterStatus] = useState('');

  const [form, setForm] = useState({
    surat_masuk_id: '',
    instruksi: '',
    batas_waktu: '',
    status: 'Menunggu',
  });

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    loadData();
  }, [search, filterStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterStatus) params.append('status', filterStatus);
      
      const res = await fetch(`/api/disposisi?${params.toString()}`, {
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
    try {
      const res = await fetch('/api/disposisi', {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setForm({ surat_masuk_id: '', instruksi: '', batas_waktu: '', status: 'Menunggu' });
        loadData();
      } else {
        alert(data.message || 'Gagal menyimpan');
      }
    } catch {
      alert('Terjadi kesalahan');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/disposisi/${id}`, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        loadData();
      } else {
        alert(data.message || 'Gagal mengubah status');
      }
    } catch {
      alert('Terjadi kesalahan');
    }
  };

  const fmtDate = (s: string) => {
    if (!s) return '-';
    const d = new Date(s);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Diproses':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
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
          <h2 className="text-2xl font-bold text-gray-900">Disposisi</h2>
          <p className="text-sm text-gray-600">Kelola disposisi surat masuk</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari surat, instruksi..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nomor Surat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Perihal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Petugas</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Instruksi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">Memuat...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">Tidak ada data</td></tr>
            ) : (
              items.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.nomor_surat}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.asal_surat}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.surat_perihal}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.dari_nama}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.instruksi}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setDetailItem(item)} className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status !== 'Selesai' && (
                        <button onClick={() => handleStatusChange(item.id, 'Selesai')} className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded" title="Tandai Selesai">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {detailItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Detail Disposisi</h3>
              <button onClick={() => setDetailItem(null)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm"><span className="text-gray-600">Nomor Surat:</span> <span className="font-medium">{detailItem.nomor_surat}</span></p>
              <p className="text-sm"><span className="text-gray-600">Asal Surat:</span> {detailItem.asal_surat}</p>
              <p className="text-sm"><span className="text-gray-600">Perihal:</span> {detailItem.surat_perihal}</p>
              <p className="text-sm"><span className="text-gray-600">Dari:</span> {detailItem.dari_nama} ({detailItem.dari_role})</p>
              <p className="text-sm"><span className="text-gray-600">Instruksi:</span> {detailItem.instruksi}</p>
              <p className="text-sm"><span className="text-gray-600">Batas Waktu:</span> {detailItem.batas_waktu ? fmtDate(detailItem.batas_waktu) : '-'}</p>
              <p className="text-sm">
                <span className="text-gray-600">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(detailItem.status)}`}>
                  {detailItem.status}
                </span>
              </p>
              <p className="text-sm"><span className="text-gray-600">Dibuat:</span> {fmtDate(detailItem.created_at)}</p>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              {detailItem.status !== 'Selesai' && (
                <button onClick={() => { handleStatusChange(detailItem.id, 'Selesai'); setDetailItem(null); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Tandai Selesai
                </button>
              )}
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
