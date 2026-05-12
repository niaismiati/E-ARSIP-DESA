import { Mail, Send, Clock, Archive, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCards = [
  { id: 1, label: 'Surat Masuk', value: 28, icon: Mail, color: 'bg-indigo-500' },
  { id: 2, label: 'Surat Keluar', value: 32, icon: Send, color: 'bg-green-500' },
  { id: 3, label: 'Disposisi Baru', value: 5, icon: Clock, color: 'bg-orange-500' },
  { id: 4, label: 'Total Arsip', value: 60, icon: Archive, color: 'bg-purple-500' },
];

const chartData = [
  { bulan: 'Jan', masuk: 15, keluar: 12 },
  { bulan: 'Feb', masuk: 22, keluar: 18 },
  { bulan: 'Mar', masuk: 28, keluar: 25 },
  { bulan: 'Apr', masuk: 35, keluar: 30 },
  { bulan: 'Mei', masuk: 30, keluar: 28 },
  { bulan: 'Jun', masuk: 28, keluar: 32 },
];

const recentLetters = [
  {
    id: 1,
    perihal: 'Undangan Musrenbang Desa',
    asal: 'Dinas PMD Kab. Pekalongan',
    tanggal: '12/06/2024',
    jenis: 'Masuk',
    status: 'Menunggu'
  },
  {
    id: 2,
    perihal: 'Surat Pengantar Nikah',
    asal: 'Warga: Budi Santoso',
    tanggal: '11/06/2024',
    jenis: 'Keluar',
    status: 'Selesai'
  },
  {
    id: 3,
    perihal: 'Laporan Kegiatan Posyandu',
    asal: 'Bidan Desa',
    tanggal: '10/06/2024',
    jenis: 'Masuk',
    status: 'Diproses'
  },
  {
    id: 4,
    perihal: 'Surat Keterangan Domisili',
    asal: 'Warga: Siti Aminah',
    tanggal: '09/06/2024',
    jenis: 'Keluar',
    status: 'Selesai'
  },
  {
    id: 5,
    perihal: 'Undangan Rapat Koordinasi',
    asal: 'Kecamatan Talun',
    tanggal: '08/06/2024',
    jenis: 'Masuk',
    status: 'Selesai'
  },
];

const pendingDispositions = [
  {
    id: 1,
    perihal: 'Undangan Musrenbang Desa',
    asal: 'Dinas PMD Kab. Pekalongan',
    tanggal: '12/06/2024'
  },
  {
    id: 2,
    perihal: 'Pemberitahuan Lomba Desa',
    asal: 'Kecamatan Talun',
    tanggal: '11/06/2024'
  },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Grafik Surat 6 Bulan Terakhir
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="masuk" fill="#4F46E5" name="Surat Masuk" />
              <Bar dataKey="keluar" fill="#2E7D32" name="Surat Keluar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Dispositions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Disposisi Menunggu
          </h3>
          <div className="space-y-3">
            {pendingDispositions.map((disp) => (
              <div key={disp.id} className="border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">{disp.perihal}</p>
                <p className="text-xs text-gray-600 mb-2">{disp.asal}</p>
                <p className="text-xs text-gray-500 mb-3">{disp.tanggal}</p>
                <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1">
                     <CheckCircle className="w-3 h-3" />
                     Setujui
                    </button>
                  <button className="flex-1 bg-red-500 text-white text-xs py-1.5 rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Letters Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Surat Terbaru
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Perihal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Asal/Tujuan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jenis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentLetters.map((letter) => (
                <tr key={letter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{letter.perihal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{letter.asal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{letter.tanggal}</td>
                  <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        letter.jenis === 'Masuk'
                          ? 'bg-indigo-100 text-indigo-800'
                           : 'bg-green-100 text-green-800'
                      }`}>
                      {letter.jenis === 'Masuk' ? <Mail className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                      {letter.jenis}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        letter.status === 'Selesai'
                           ? 'bg-green-100 text-green-800'
                          : letter.status === 'Menunggu'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                       {letter.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
