import { Plus, Edit, Trash2, X, User } from 'lucide-react';
import { useState } from 'react';

interface UserData {
  id: number;
  nama: string;
  email: string;
  role: string;
  status: string;
}

const initialUsers: UserData[] = [
  {
    id: 1,
    nama: 'Operator Desa Karangasem',
    email: 'operator@karangasem.desa.id',
    role: 'Operator',
    status: 'Aktif'
  },
  {
    id: 2,
    nama: 'Kepala Desa Karangasem',
    email: 'kades@karangasem.desa.id',
    role: 'Kepala Desa',
    status: 'Aktif'
  },
  {
    id: 3,
    nama: 'Admin Sistem',
    email: 'admin@karangasem.desa.id',
    role: 'Admin',
    status: 'Aktif'
  }
];

export function KelolaUser() {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'operator'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserData = {
      id: users.length + 1,
      nama: formData.nama,
      email: formData.email,
      role: formData.role === 'operator' ? 'Operator' : formData.role === 'kades' ? 'Kepala Desa' : 'Admin',
      status: 'Aktif'
    };
    setUsers([...users, newUser]);
    setShowModal(false);
    setFormData({ nama: '', email: '', password: '', role: 'operator' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus pengguna ini?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-gray-700 text-white';
      case 'Kepala Desa':
        return 'bg-indigo-700 text-white';
      default:
        return 'bg-green-700 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-gray-900">Kelola Pengguna</h2>
         <button
           onClick={() => setShowModal(true)}
           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
         >
           <Plus className="w-5 h-5" />
           Tambah Pengguna
         </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-indigo-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Pengguna */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Tambah Pengguna</h3>
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
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="operator">Operator</option>
                  <option value="kades">Kepala Desa</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                   className="flex-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
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
