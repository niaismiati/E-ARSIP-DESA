import { Plus, Search, Edit, Trash2, FileText, X, Mail, Clock, Filter } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface Surat {
  id: number;
  nomor: string;
  asal: string;
  perihal: string;
  tanggal: string;
  klasifikasi: string;
  status: string;
}

const initialData: Surat[] = [
  {
    id: 1,
    nomor: '005/123/PMD/V/2026',
    asal: 'Dinas PMD Kab. Pekalongan',
    perihal: 'Undangan Musrenbang Desa',
    tanggal: '01/05/2026',
    klasifikasi: '000 - Umum',
    status: 'Menunggu'
  },
  {
    id: 2,
    nomor: '042/KEC/TLN/V/2026',
    asal: 'Kecamatan Talun',
    perihal: 'Pemberitahuan Lomba Desa',
    tanggal: '01/05/2026',
    klasifikasi: '000 - Umum',
    status: 'Diproses'
  },
  {
    id: 3,
    nomor: '018/BD/V/2026',
    asal: 'Bidan Desa',
    perihal: 'Laporan Kegiatan Posyandu',
    tanggal: '01/05/2026',
    klasifikasi: '400 - Kesejahteraan',
    status: 'Selesai'
  }
];

export function SuratMasuk() {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nomor: '',
    asal: '',
    perihal: '',
    tanggalSurat: '',
    tanggalTerima: '',
    klasifikasi: ''
  });
  const [lampiranFile, setLampiranFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [klasifikasiList, setKlasifikasiList] = useState<{id: string, kode: string, nama: string}[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ klasifikasi: '', asal: '', status: '' });

  // Fetch klasifikasi
  const fetchKlasifikasi = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/klasifikasi', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setKlasifikasiList(data.data);
      }
    } catch (err) {
      console.error('Gagal load klasifikasi:', err);
    }
  }, []);

  // Fetch surat with filters
  const fetchSurat = useCallback(async (queryParams?: Record<string, string>) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token tidak ditemukan. Silakan login ulang.');
        return;
      }
      const params = new URLSearchParams(queryParams || {});
      const url = `/api/surat-masuk${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSuratList((data.data as any[]).map((s): Surat => ({
          id: s.id,
          nomor: s.nomor_surat,
          asal: s.asal_surat,
          perihal: s.perihal,
          tanggal: new Date(s.tanggal_terima).toLocaleDateString('id-ID'),
          klasifikasi: s.klasifikasi ? `${s.klasifikasi.kode} - ${s.klasifikasi.nama}` : 'Umum',
          status: s.status || 'Menunggu'
        })));
        setError('');
      } else {
        setError(data.message || 'Gagal load data');
      }
    } catch (err) {
      setError('Gagal load surat masuk: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKlasifikasi();
    fetchSurat({ search: searchTerm, ...filters });
  }, [fetchKlasifikasi, fetchSurat, searchTerm, filters]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLampiranFile(e.target.files[0]);
    }
  };

  const handleEdit = (surat: Surat) => {
    setEditingId(surat.id);
    setFormData({
      nomor: surat.nomor,
      asal: surat.asal,
      perihal: surat.perihal,
      tanggalSurat: new Date(surat.tanggal).toISOString().split('T')[0], 
      tanggalTerima: new Date(surat.tanggal).toISOString().split('T')[0],
      klasifikasi: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nomor || !formData.asal || !formData.perihal || !formData.tanggalSurat || !formData.tanggalTerima) {
      setError('Semua field * wajib diisi');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Silakan login ulang');
      
      const formDataToSend = new FormData();
      formDataToSend.append('nomor_surat', formData.nomor);
      formDataToSend.append('asal_surat', formData.asal);
      formDataToSend.append('perihal', formData.perihal);
      formDataToSend.append('tanggal_surat', formData.tanggalSurat);
      formDataToSend.append('tanggal_terima', formData.tanggalTerima);
      formDataToSend.append('klasifikasi_id', formData.klasifikasi);
      if (lampiranFile) formDataToSend.append('lampiran', lampiranFile);
      
      const url = editingId ? `/api/surat-masuk/${editingId}` : '/api/surat-masuk';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });
      const data = await response.json();
      if (data.success) {
        await fetchSurat({ search: searchTerm, ...filters });
        setShowModal(false);
        setEditingId(null);
        setFormData({
          nomor: '', asal: '', perihal: '', tanggalSurat: '', tanggalTerima: '', klasifikasi: ''
        });
        setLampiranFile(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Gagal: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus surat ini?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/surat-masuk/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        await fetchSurat({ search: searchTerm, ...filters });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Gagal hapus: ' + (err as Error).message);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchSurat({ search: searchTerm, ...newFilters });
  };

  const onSearchChange = (term: string) => {
    setSearchTerm(term);
    fetchSurat({ search: term, ...filters });
  };

  const filteredSurat = suratList;

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Surat Masuk</h2>
            <p className="text-sm text-gray-600">Kelola data surat masuk yang diterima</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tambah Surat Masuk
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari surat masuk..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm">
            <option value="">Semua Klasifikasi</option>
            <option value="000">000 - Umum</option>
            <option value="100">100 - Pemerintahan</option>
            <option value="400">400 - Kesejahteraan</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm">
            <option value="">Semua Asal Surat</option>
            <option value="dinas">Dinas</option>
            <option value="kecamatan">Kecamatan</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm">
            <option value="">Semua Status</option>
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nomor Surat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Asal Surat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Perihal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Klasifikasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSurat.map((surat, index) => (
                <tr key={surat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{surat.nomor}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{surat.asal}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{surat.perihal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{surat.tanggal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{surat.klasifikasi}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      surat.status === 'Selesai'
                        ? 'bg-green-100 text-green-800'
                        : surat.status === 'Menunggu'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {surat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-indigo-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(surat.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Surat */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Tambah Surat Masuk</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Surat
                </label>
                <input
                  type="text"
                  value={formData.nomor}
                  onChange={(e) => setFormData({...formData, nomor: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asal Surat
                </label>
                <input
                  type="text"
                  value={formData.asal}
                  onChange={(e) => setFormData({...formData, asal: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Perihal
                </label>
                <textarea
                  value={formData.perihal}
                  onChange={(e) => setFormData({...formData, perihal: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Surat
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalSurat}
                    onChange={(e) => setFormData({...formData, tanggalSurat: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Terima
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalTerima}
                    onChange={(e) => setFormData({...formData, tanggalTerima: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Klasifikasi
                </label>
                <select
                  value={formData.klasifikasi}
                  onChange={(e) => setFormData({...formData, klasifikasi: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none"
                >
                  <option value="000">000 - Umum</option>
                  <option value="100">100 - Pemerintahan</option>
                  <option value="400">400 - Kesejahteraan</option>
                  <option value="800">800 - Kepegawaian</option>
                  <option value="900">900 - Keuangan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lampiran (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Opsional, maksimal 5MB</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}