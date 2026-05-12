import { useState } from 'react';
import { Settings, User, Bell, Lock, Database, Download, Upload, Trash2, Save } from 'lucide-react';

interface AppSettings {
  tema: string;
 notifications: boolean;
  autoLogout: number;
  backupOtomatis: string;
}

export function Pengaturan() {
  const [settings, setSettings] = useState<AppSettings>({
    tema: 'light',
    notifications: true,
    autoLogout: 30,
    backupOtomatis: 'minggu',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Simpan ke localStorage untuk demo
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setMessage('Pengaturan berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Gagal menyimpan pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify({
        settings,
        exportDate: new Date().toISOString(),
      }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `e-arsip-pengaturan-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Gagal_export data');
    }
  };

return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pengaturan</h2>
          <p className="text-sm text-gray-600">Konfigurasi aplikasi</p>
        </div>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          {message}
        </div>
      )}

      {/* Tema */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tampilan</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tema Tampilan</label>
            <select
              value={settings.tema}
              onChange={(e) => setSettings({ ...settings, tema: e.target.value })}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
              <option value="system">Ikuti Sistem</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifikasi</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Aktifkan Notifikasi</p>
              <p className="text-xs text-gray-500">Terima notifikasi untuk surat masuk terbaru</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Keamanan */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Keamanan</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto Logout</label>
            <select
              value={settings.autoLogout}
              onChange={(e) => setSettings({ ...settings, autoLogout: parseInt(e.target.value) })}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="15">15 menit</option>
              <option value="30">30 menit</option>
              <option value="60">1 jam</option>
              <option value="120">2 jam</option>
              <option value="0">Tidak pernah</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Otomatis logout setelah tidak aktif</p>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Backup & Restore</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backup Otomatis</label>
            <select
              value={settings.backupOtomatis}
              onChange={(e) => setSettings({ ...settings, backupOtomatis: e.target.value })}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="harian">Harian</option>
              <option value="minggu">Mingguan</option>
              <option value="bulan">Bulanan</option>
              <option value="tidak">Tidak Aktif</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Import Data
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Zona Berbahaya</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Hapus Cache</p>
              <p className="text-xs text-gray-500">Hapus data cache sementara</p>
            </div>
            <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              Hapus Cache
            </button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <p className="text-sm font-medium text-gray-700">Reset Aplikasi</p>
              <p className="text-xs text-gray-500">Kembalikan semua pengaturan ke default</p>
            </div>
            <button
              onClick={() => {
                if (confirm('Yakin ingin reset aplikasi? Semua pengaturan akan dikembalikan ke default.')) {
                  setSettings({
                    tema: 'light',
                    notifications: true,
                    autoLogout: 30,
                    backupOtomatis: 'minggu',
                  });
                  alert('Pengaturan telah direset ke default');
                }
              }}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Simpan */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>
    </div>
  );
}
