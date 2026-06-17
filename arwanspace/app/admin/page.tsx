import NeumPanel from '../components/neum/NeumPanel';
import { Users, CreditCard, Activity, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeumPanel className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-800">1,248</h3>
          </div>
          <div className="w-12 h-12 rounded-full neum-inset flex items-center justify-center text-[#7ec8e3]">
            <Users size={24} />
          </div>
        </NeumPanel>

        <NeumPanel className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Subs</p>
            <h3 className="text-3xl font-bold text-gray-800">342</h3>
          </div>
          <div className="w-12 h-12 rounded-full neum-inset flex items-center justify-center text-green-500">
            <CreditCard size={24} />
          </div>
        </NeumPanel>

        <NeumPanel className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly MRR</p>
            <h3 className="text-3xl font-bold text-gray-800">$4,500</h3>
          </div>
          <div className="w-12 h-12 rounded-full neum-inset flex items-center justify-center text-purple-500">
            <Activity size={24} />
          </div>
        </NeumPanel>

        <NeumPanel className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Contacts Today</p>
            <h3 className="text-3xl font-bold text-gray-800">12</h3>
          </div>
          <div className="w-12 h-12 rounded-full neum-inset flex items-center justify-center text-orange-400">
            <MessageSquare size={24} />
          </div>
        </NeumPanel>
      </div>

      {/* Chart Placeholder */}
      <NeumPanel className="p-8 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Subscriptions Growth</h3>
        <div className="h-64 flex items-end gap-4 justify-between pt-10">
          {[40, 55, 45, 70, 60, 85, 100].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2 group">
              <div
                className="w-full bg-[#7ec8e3]/80 rounded-t-lg transition-all group-hover:bg-[#7ec8e3] neum-button"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-500 font-medium">M{i+1}</span>
            </div>
          ))}
        </div>
      </NeumPanel>
    </div>
  );
}
