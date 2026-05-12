import { Mail, Send, Clock, CheckCircle, Calendar, FileText, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCards = [
  {
    id: 1,
    label: 'Surat Masuk',
    value: 0,
    icon: Mail,
    color: 'bg-indigo-500',
    detail: '0 belum dibaca',
      detailColor: 'text-indigo-600'
  },
   {
      id: 2,
      label: 'Surat Keluar',
      value: 2,
      icon: Send,
      color: 'bg-indigo-500',
      detail: '1 hari ini',
    detailColor: 'text-indigo-600'
    },
  {
    id: 3,
    label: 'Menunggu Disposisi',
    value: 2,
    icon: Clock,
    color: 'bg-orange-500',
    detail: 'Perlu tindakan',
    detailColor: 'text-orange-600'
  },
  {
    id: 4,
    label: 'Disposisi Selesai',
    value: 0,
    icon: CheckCircle,
    color: 'bg-purple-500',
    detail: 'Bulan ini',
    detailColor: 'text-purple-600'
  },
];

const chartData = [
  { bulan: 'Jan', masuk: 20, keluar: 12 },
  { bulan: 'Feb', masuk: 25, keluar: 16 },
  { bulan: 'Mar', masuk: 35, keluar: 22 },
  { bulan: 'Apr', masuk: 18, keluar: 12 },
  { bulan: 'Mei', masuk: 30, keluar: 20 },
  { bulan: 'Jun', masuk: 40, keluar: 30 },
];

const klasifikasiData = [
  { kode: '000', nama: 'Umum', count: 12, color: 'bg-indigo-100 text-indigo-600', icon: '📄' },
  { kode: '100', nama: 'Pemerintahan', count: 18, color: 'bg-indigo-100 text-indigo-600', icon: '📁' },
  { kode: '400', nama: 'Kesejahteraan', count: 15, color: 'bg-yellow-100 text-yellow-600', icon: '🏥' },
  { kode: '800', nama: 'Kepegawaian', count: 7, color: 'bg-purple-100 text-purple-600', icon: '👥' },
  { kode: '900', nama: 'Keuangan', count: 11, color: 'bg-orange-100 text-orange-600', icon: '💰' },
];

const pendingDispositions = [
  {
    id: 1,
    perihal: 'Undangan Musrenbang Desa',
    asal: 'Dinas PMD Kab. Pekalongan',
    tanggal: '01/05/2026',
    jenis: 'Surat Masuk',
    icon: '📬',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 2,
    perihal: 'Pemberitahuan Kegiatan Lomba Desa',
    asal: 'Kecamatan Talun',
    tanggal: '01/05/2026',
    jenis: 'Surat Masuk',
    icon: '📬',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 3,
    perihal: 'Permohonan Bantuan Alat Pertanian',
    asal: 'Kelompok Tani Makmur',
    tanggal: '01/05/2026',
    jenis: 'Surat Masuk',
    icon: '🌾',
     color: 'bg-blue-50 text-indigo-600'
  },
   {
      id: 3,
      perihal: 'Laporan Realisasi APBDes Tahap I',
      asal: 'Sekretaris Desa',
      tanggal: '01/05/2026',
      jenis: 'Surat Keluar',
      icon: '💰',
     color: 'bg-green-50 text-green-600'
    },
];

const recentLetters = [
  {
    id: 1,
    perihal: 'Surat Pengantar Nikah (N1)',
    asal: 'Warga: Siti Aminah',
    tanggal: '02/05/2026',
    jenis: 'Surat Keluar',
    icon: '📄',
     color: 'text-blue-600'
  },
  {
    id: 2,
    perihal: 'Nota Dinas',
    asal: 'Sekretariat Desa',
    tanggal: '02/05/2026',
    jenis: 'Surat Masuk',
    icon: '📬',
    color: 'text-blue-600'
  },
  {
    id: 3,
    perihal: 'Surat Tugas Perangkat Desa',
    asal: 'Kepala Desa',
    tanggal: '02/05/2026',
    jenis: 'Surat Keluar',
    icon: '📄',
     color: 'text-blue-600'
  },
  {
    id: 4,
    perihal: 'Imbauan Kebersihan Lingkungan',
    asal: 'Kepala Desa',
    tanggal: '02/05/2026',
    jenis: 'Surat Masuk',
    icon: '📬',
    color: 'text-blue-600'
  },
];

const activities = [
  {
    id: 1,
    text: 'Operator Desa mengiukan surat Laporan Keuangan Desa',
    time: '5 menit yang lalu',
    icon: '📄',
    color: 'bg-indigo-500'
  },
   {
      id: 2,
      text: 'Anda menyetujui disposisi surat Undangan Musrenbang Desa',
      time: '1 jam yang lalu',
      icon: '✓',
      color: 'bg-indigo-500'
    },
  {
    id: 3,
    text: 'Operator Desa menambahkan surat baru Pemberitahuan Kegiatan',
    time: '2 jam yang lalu',
    icon: '📥',
    color: 'bg-indigo-500'
  },
  {
    id: 4,
    text: 'Anda memberikan disposisi surat Permohonan Bantuan Alat',
    time: '3 jam yang lalu',
    icon: '✏️',
    color: 'bg-orange-500'
  },
];

export function DashboardPimpinan() {
  return (
    <div className="p-6 space-y-6 bg-gray-50">
{/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Selamat datang, Kepala Desa</h2>
          <p className="text-gray-600">Berikut ringkasan arsip surat desa hari ini.</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <div className="text-right">
            <p className="font-medium">Senin, 04 Mei 2026</p>
            <p className="text-sm">09:30 WIB</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">{stat.label}</p>
              <p className={`text-xs ${stat.detailColor} mt-1`}>{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart & Classifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
           <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Grafik Surat (6 Bulan Terakhir)
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm">
                  <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                  Surat Masuk
                </span>
                <span className="flex items-center gap-1 text-sm">
                   <div className="w-3 h-3 bg-green-500 rounded"></div>
                  Surat Keluar
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="masuk" stroke="#4F46E5" strokeWidth={2} />
                <Line type="monotone" dataKey="keluar" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Classifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Ringkasan Arsip Berdasarkan Klasifikasi (Tahun 2026)
              </h3>
              <a href="#" className="text-sm text-blue-600 hover:underline">Lihat semua</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {klasifikasiData.map((item) => (
                <div key={item.kode} className="text-center">
                  <div className={`${item.color} rounded-lg p-4 mb-2`}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <div className="text-xs">Arsip</div>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{item.kode}</p>
                  <p className="text-xs text-gray-500">{item.nama}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terakhir</h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`${activity.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Dispositions & Recent Letters */}
        <div className="space-y-6">
          {/* Pending Dispositions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Disposisi Menunggu Persetujuan
            </h3>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Lihat semua</a>
            </div>
            <div className="space-y-3">
              {recentLetters.map((letter) => (
                <div key={letter.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <span className={`text-xl ${letter.color}`}>{letter.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{letter.perihal}</p>
                    <p className="text-xs text-gray-600">{letter.asal}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{letter.tanggal}</span>
                      <span className={`text-xs ${letter.color} font-medium`}>{letter.jenis}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
