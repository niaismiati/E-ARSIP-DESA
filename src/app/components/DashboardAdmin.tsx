import { useState, useEffect } from 'react';
import { Mail, Send, Folder, BarChart3, Users, Settings, User, Building2, Shield, Database, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCardsAdmin = [
  { id: 'surat-masuk', label: 'Surat Masuk', value: 28, icon: Mail, color: 'bg-blue-500', link: '/surat-masuk' },
  { id: 'surat-keluar', label: 'Surat Keluar', value: 32, icon: Send, color: 'bg-green-500', link: '/surat-keluar' },
  { id: 'klasifikasi', label: 'Klasifikasi', value: 15, icon: Folder, color: 'bg-purple-500', link: '/klasifikasi' },
  { id: 'laporan', label: 'Laporan', value: 12, icon: BarChart3, color: 'bg-indigo-500', link: '/laporan' },
  { id: 'pengguna', label: 'Pengguna', value: 3, icon: Users, color: 'bg-teal-500', link: '/kelola-user' },
  { id: 'pengaturan', label: 'Pengaturan', value: '', icon: Settings, color: 'bg-gray-500', link: '/pengaturan' },
];

const chartDataAdmin = [
  { bulan: 'Jan', totalSurat: 27, usersActive: 3 },
  { bulan: 'Feb', totalSurat: 40, usersActive: 3 },
  { bulan: 'Mar', totalSurat: 53, usersActive: 3 },
  { bulan: 'Apr', totalSurat: 65, usersActive: 3 },
  { bulan: 'Mei', totalSurat: 58, usersActive: 3 },
  { bulan: 'Jun', totalSurat: 60, usersActive: 3 },
];

const recentUsers = [
  { id: 1, nama: 'Budi Santoso', email: 'budi@desa.id', role: 'Operator', tanggal: '12/06/2024' },
  { id: 2, nama: 'Siti Aminah', email: 'siti@desa.id', role: 'Admin', tanggal: '11/06/2024' },
];

export function DashboardAdmin() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // TODO: Fetch from /api/dashboard/admin-stats
    setStats({ totalUsers: 3, activeUsers: 3, systemHealth: 'OK' });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Admin</h2>
        <p className="text-gray-600">Kelola sistem e-arsip Desa Karangasem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {statsCardsAdmin.map((card) => (
          <a key={card.id} href={card.link} className="group">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 border border-gray-100 hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{card.value || 'Kelola'}</p>
                  <p className="text-sm text-gray-600">{card.label}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Statistik Sistem</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartDataAdmin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSurat" stroke="#3B82F6" />
              <Line type="monotone" dataKey="usersActive" stroke="#10B981" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pengguna Terbaru</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{user.nama}</p>
                <p className="text-sm text-gray-600">{user.role}</p>
                <p className="text-xs text-gray-500">{user.tanggal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <h4 className="font-semibold">Status Sistem</h4>
              <p className="text-sm text-green-600">Semua layanan aktif</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="font-semibold">Database</h4>
              <p className="text-sm text-blue-600">60 dokumen tersimpan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
