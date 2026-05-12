import { useState, useEffect } from 'react';
import { Mail, Send, FileText, Folder, BarChart3, Users, User, Settings, Clock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCardsOperator = [
  { id: 'surat-masuk', label: 'Surat Masuk', value: 28, icon: Mail, color: 'bg-blue-500', link: '/surat-masuk' },
  { id: 'surat-keluar', label: 'Surat Keluar', value: 32, icon: Send, color: 'bg-green-500', link: '/surat-keluar' },
  { id: 'disposisi', label: 'Disposisi', value: 5, icon: FileText, color: 'bg-orange-500', link: '/disposisi' },
  { id: 'klasifikasi', label: 'Klasifikasi', value: 15, icon: Folder, color: 'bg-purple-500', link: '/klasifikasi' },
  { id: 'laporan', label: 'Laporan', value: 12, icon: BarChart3, color: 'bg-indigo-500', link: '/laporan' },
  { id: 'pengguna', label: 'Pengguna', value: 3, icon: Users, color: 'bg-teal-500', link: '/pengguna' },
];

const chartData = [
  { bulan: 'Jan', masuk: 15, keluar: 12, disposisi: 8 },
  { bulan: 'Feb', masuk: 22, keluar: 18, disposisi: 10 },
  { bulan: 'Mar', masuk: 28, keluar: 25, disposisi: 15 },
  { bulan: 'Apr', masuk: 35, keluar: 30, disposisi: 20 },
  { bulan: 'Mei', masuk: 30, keluar: 28, disposisi: 18 },
  { bulan: 'Jun', masuk: 28, keluar: 32, disposisi: 22 },
];

const recentDisposisi = [
  { id: 1, perihal: 'Undangan Musrenbang', dari: 'Admin', tanggal: '12/06/2024', status: 'Menunggu' },
  { id: 2, perihal: 'Laporan Posyandu', dari: 'Bidan Desa', tanggal: '11/06/2024', status: 'Diproses' },
];

export function DashboardOperator() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // TODO: Fetch from /api/dashboard/stats
    setStats({ suratMasuk: 28, suratKeluar: 32, disposisi: 5 });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Operator</h2>
        <p className="text-gray-600">Kelola surat dan disposisi harian Desa Karangasem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {statsCardsOperator.map((card) => (
          <a key={card.id} href={card.link} className="group">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 border border-gray-100 hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{card.value || 'Lihat'}</p>
                  <p className="text-sm text-gray-600">{card.label}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Ringkasan Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="masuk" fill="#3B82F6" />
              <Bar dataKey="keluar" fill="#10B981" />
              <Bar dataKey="disposisi" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Disposisi Menunggu</h3>
          <div className="space-y-3">
            {recentDisposisi.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{item.perihal}</p>
                <p className="text-sm text-gray-600">Dari: {item.dari}</p>
                <p className="text-xs text-gray-500">{item.tanggal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
