'use client';

import { useState, useEffect } from 'react';
import NeumPanel from '@/app/components/neum/NeumPanel';
import NeumInput from '@/app/components/neum/NeumInput';
import NeumButton from '@/app/components/neum/NeumButton';
import { Activity, Plus, RefreshCw, Trash2, Edit2 } from 'lucide-react';

export default function AdminTrading() {
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSignals() {
    setLoading(true);
    try {
      const res = await fetch('/api/trading/signals?limit=50');
      const data = await res.json();
      if (Array.isArray(data)) setSignals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSignals();
  }, []);

  const handleDelete = () => {
     alert("Delete not implemented in mock admin panel yet. Requires Supabase service key implementation for DELETE.");
  };

  const handleCreateMock = () => {
    alert("To create a mock signal, use your API key and send a POST request to /api/trading/signals");
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold neum-text-accent flex items-center gap-3">
          <Activity size={32} /> Algorithmic Trade Mgmt
        </h1>
        <div className="flex gap-4">
          <NeumButton onClick={fetchSignals} className="p-3">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </NeumButton>
          <NeumButton onClick={handleCreateMock} className="p-3 flex items-center gap-2">
            <Plus size={20} /> <span className="font-semibold">Mock Signal via API</span>
          </NeumButton>
        </div>
      </div>

      <NeumPanel className="p-6">
        <h2 className="text-xl font-bold mb-6">Recent Signals</h2>

        {loading ? (
           <p className="text-gray-500">Loading signals...</p>
        ) : signals.length === 0 ? (
           <p className="text-gray-500">No signals found in the database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Time</th>
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Pair</th>
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Type</th>
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Price</th>
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                  <th className="py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {signals.map((sig) => (
                  <tr key={sig.id} className="hover:bg-gray-100/50 transition-colors">
                    <td className="py-4 text-sm text-gray-600">{new Date(sig.timestamp).toLocaleString()}</td>
                    <td className="py-4 font-bold text-gray-800">{sig.pair}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        sig.signal_type === 'buy' ? 'bg-green-100 text-green-700' :
                        sig.signal_type === 'sell' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {sig.signal_type}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-gray-700">{sig.price}</td>
                    <td className="py-4 text-sm font-medium text-gray-600 capitalize">{sig.execution_status?.replace('_', ' ')}</td>
                    <td className="py-4">
                       <div className="flex gap-2">
                          <button onClick={handleDelete} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </NeumPanel>

    </div>
  );
}
