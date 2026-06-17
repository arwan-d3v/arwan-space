import NeumPanel from '../../components/neum/NeumPanel';
import NeumButton from '../../components/neum/NeumButton';
import { Edit2, ShieldAlert } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'public', status: 'Inactive' },
  { id: 2, name: 'Alice', email: 'alice@student.com', role: 'student', status: 'Active' },
  { id: 3, name: 'Bob', email: 'bob@pro.com', role: 'pro', status: 'Active' },
  { id: 4, name: 'Tech Corp', email: 'admin@company.com', role: 'company', status: 'Active' },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-100">User Management</h2>
        <NeumButton>Add New User</NeumButton>
      </div>

      <NeumPanel className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#d1d8e0]">
              <th className="p-4 font-semibold text-slate-200">Name</th>
              <th className="p-4 font-semibold text-slate-200">Email</th>
              <th className="p-4 font-semibold text-slate-200">Role</th>
              <th className="p-4 font-semibold text-slate-200">Sub Status</th>
              <th className="p-4 font-semibold text-slate-200 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, i) => (
              <tr key={user.id} className={i !== mockUsers.length - 1 ? 'border-b border-[#d1d8e0]' : ''}>
                <td className="p-4 font-medium text-slate-100">{user.name}</td>
                <td className="p-4 text-slate-300">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    user.role === 'company' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'pro' ? 'bg-blue-100 text-blue-700' :
                    user.role === 'student' ? 'bg-green-100 text-green-700' :
                    'bg-gray-200 text-slate-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{user.status}</td>
                <td className="p-4 flex justify-center gap-2">
                  <NeumButton className="p-2" title="Edit Role"><Edit2 size={16} /></NeumButton>
                  <NeumButton className="p-2 text-red-500" title="Impersonate"><ShieldAlert size={16} /></NeumButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NeumPanel>
    </div>
  );
}
