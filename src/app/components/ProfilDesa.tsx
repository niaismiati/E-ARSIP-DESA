import { Building2, Upload, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function ProfilDesa() {
  const [formData, setFormData] = useState({
    namaDesa: 'Desa Karangasem',
    kecamatan: 'Talun',
    kabupaten: 'Pekalongan',
    provinsi: 'Jawa Tengah',
    kodeDesa: '33.26.05.2009',
    alamat: 'Jl. Karangasem Talun, Karangasem, Kec. Talun, Kab. Pekalongan, Jawa Tengah',
    telepon: '(0285) 123456',
    email: 'desa@karangasem.desa.id',
    inisialDesa: 'KS',
    kodeSurat: '470',
    separator: '/',
    panjangNomor: '3'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profil desa berhasil diperbarui!');
  };

  const handleReset = () => {
    if (confirm('Yakin ingin reset ke pengaturan default?')) {
      setFormData({
        namaDesa: 'Desa Karangasem',
        kecamatan: 'Talun',
        kabupaten: 'Pekalongan',
        provinsi: 'Jawa Tengah',
        kodeDesa: '33.26.05.2009',
        alamat: 'Jl. Karangasem Talun, Karangasem, Kec. Talun, Kab. Pekalongan, Jawa Tengah',
        telepon: '(0285) 123456',
        email: 'desa@karangasem.desa.id',
        inisialDesa: 'KS',
        kodeSurat: '470',
        separator: '/',
        panjangNomor: '3'
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profil Desa</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Desa */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Identitas Desa</h3>

          {/* Logo Desa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Desa
            </label>
            <div className="flex items-center gap-4">
               <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <button
                type="button"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Format: PNG/JPG, Maksimal 2MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Desa
              </label>
              <input
                type="text"
                value={formData.namaDesa}
                onChange={(e) => setFormData({...formData, namaDesa: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kecamatan
              </label>
              <input
                type="text"
                value={formData.kecamatan}
                onChange={(e) => setFormData({...formData, kecamatan: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kabupaten
              </label>
              <input
                type="text"
                value={formData.kabupaten}
                onChange={(e) => setFormData({...formData, kabupaten: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provinsi
              </label>
              <input
                type="text"
                value={formData.provinsi}
                onChange={(e) => setFormData({...formData, provinsi: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode Desa
              </label>
              <input
                type="text"
                value={formData.kodeDesa}
                onChange={(e) => setFormData({...formData, kodeDesa: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon
              </label>
              <input
                type="tel"
                value={formData.telepon}
                onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Desa
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Kantor Desa
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({...formData, alamat: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Format Nomor Surat */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Format Nomor Surat</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inisial Desa (3 huruf)
              </label>
              <input
                type="text"
                value={formData.inisialDesa}
                onChange={(e) => setFormData({...formData, inisialDesa: e.target.value.toUpperCase()})}
                maxLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode Surat Default
              </label>
              <input
                type="text"
                value={formData.kodeSurat}
                onChange={(e) => setFormData({...formData, kodeSurat: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Separator
              </label>
              <select
                value={formData.separator}
                onChange={(e) => setFormData({...formData, separator: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="/">/</option>
                <option value="-">-</option>
                <option value=".">.</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Panjang Nomor Urut
              </label>
              <select
                value={formData.panjangNomor}
                onChange={(e) => setFormData({...formData, panjangNomor: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="3">3 digit (001)</option>
                <option value="4">4 digit (0001)</option>
                <option value="5">5 digit (00001)</option>
              </select>
            </div>
          </div>

          {/* Preview Nomor Surat */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview Nomor Surat:</p>
            <p className="font-mono text-lg text-gray-900">
              001 {formData.separator} {formData.kodeSurat} {formData.separator} {formData.inisialDesa} {formData.separator} 06 {formData.separator} 2024
            </p>
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              <p>001 - Nomor urut</p>
              <p>{formData.kodeSurat} - Kode surat</p>
              <p>{formData.inisialDesa} - Inisial {formData.namaDesa}</p>
              <p>06 - Bulan (Juni)</p>
              <p>2024 - Tahun</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
             className="bg-indigo-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Save className="w-5 h-5" />
            Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Reset ke Default
          </button>
        </div>
      </form>
    </div>
  );
}
