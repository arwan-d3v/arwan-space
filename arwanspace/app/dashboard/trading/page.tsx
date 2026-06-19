'use client';

import { useEffect, useState } from 'react';
import NeumPanel from '@/app/components/neum/NeumPanel';
import NeumButton from '@/app/components/neum/NeumButton';
import { Activity, Wallet, AlertCircle, ArrowUpRight, ArrowDownRight, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function TradingDashboard() {
  const [account, setAccount] = useState<any>(null);
  const [signals, setSignals] = useState<any[]>([]);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch Account Data
  useEffect(() => {
    async function fetchAccount() {
      try {
        const res = await fetch('/api/trading/account');
        const data = await res.json();
        setAccount(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAccount(false);
      }
    }
    fetchAccount();
  }, []);

  // Poll Signals Data
  useEffect(() => {
    async function fetchSignals() {
      try {
        const res = await fetch('/api/trading/signals');
        const data = await res.json();
        if (Array.isArray(data)) {
          setSignals(data);
          setLastUpdated(new Date());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSignals(false);
      }
    }

    fetchSignals();
    const interval = setInterval(fetchSignals, 10000); // 10 seconds polling

    return () => clearInterval(interval);
  }, []);

  const handleDeposit = () => {
    alert('Deposit feature is a mock for now.');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold neum-text-accent flex items-center gap-3">
          <Activity size={32} /> Algorithmic Trading
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
           <RefreshCw size={14} className={loadingSignals ? 'animate-spin' : ''} />
           Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Account & Stats */}
        <div className="space-y-8">
          <NeumPanel className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Wallet size={24} className="text-blue-500" /> Trading Account
            </h2>
            {loadingAccount ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : account ? (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Balance</p>
                  <p className="text-4xl font-extrabold font-mono text-slate-800">${account.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="neum-pressed p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase">P/L</p>
                    <p className={`text-lg font-bold font-mono ${account.profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {account.profit_loss >= 0 ? '+' : ''}${account.profit_loss?.toLocaleString()}
                    </p>
                  </div>
                  <div className="neum-pressed p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase">Open Pos</p>
                    <p className="text-lg font-bold font-mono text-slate-700">{account.open_positions}</p>
                  </div>
                </div>
                <NeumButton onClick={handleDeposit} className="w-full py-3 justify-center text-blue-600 font-bold">
                  Deposit Funds
                </NeumButton>
              </div>
            ) : (
               <p className="text-gray-500">Failed to load account.</p>
            )}
          </NeumPanel>

          <NeumPanel className="p-6">
            <h3 className="font-bold text-lg mb-4">Trading System Status</h3>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">MT5 Integration</span>
                 <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-semibold text-xs flex items-center gap-1"><CheckCircle size={12}/> Active</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">AI Signal Engine</span>
                 <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-semibold text-xs flex items-center gap-1"><CheckCircle size={12}/> Online</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">Auto Execution</span>
                 <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md font-semibold text-xs">Simulated</span>
               </div>
            </div>
          </NeumPanel>
        </div>

        {/* Right Column: Live Signals */}
        <div className="col-span-1 lg:col-span-2">
          <NeumPanel className="p-6 h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity size={24} className="text-purple-500" /> Live Trade Signals
            </h2>

            {loadingSignals ? (
              <div className="animate-pulse space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl w-full"></div>
                ))}
              </div>
            ) : signals.length > 0 ? (
              <div className="space-y-4">
                {signals.map((sig) => (
                  <div key={sig.id} className="neum-pressed p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center">

                    {/* Signal Info */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Pair</p>
                        <p className="font-bold text-lg text-slate-800">{sig.pair}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Type</p>
                        <div className="flex items-center gap-1 mt-1">
                          {sig.signal_type === 'buy' ? (
                            <span className="flex items-center text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded text-sm"><ArrowUpRight size={16}/> BUY</span>
                          ) : sig.signal_type === 'sell' ? (
                            <span className="flex items-center text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded text-sm"><ArrowDownRight size={16}/> SELL</span>
                          ) : (
                            <span className="text-gray-600 font-bold bg-gray-200 px-2 py-0.5 rounded text-sm">HOLD</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Price</p>
                        <p className="font-mono font-semibold text-slate-700">{sig.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Status</p>
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium text-slate-600">
                           {sig.execution_status === 'pending' && <span className="text-yellow-600 flex items-center gap-1"><AlertCircle size={14}/> Pending</span>}
                           {sig.execution_status === 'sent_to_mt5' && <span className="text-blue-600 flex items-center gap-1"><Send size={14}/> MT5 Sent</span>}
                           {sig.execution_status === 'closed' && <span className="text-gray-500 flex items-center gap-1"><CheckCircle size={14}/> Closed</span>}
                        </div>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    {sig.detail_line && sig.detail_line.length > 0 && (
                      <div className="w-full md:w-32 h-16 ml-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={sig.detail_line}>
                            <YAxis domain={['auto', 'auto']} hide />
                            <Tooltip contentStyle={{ fontSize: '10px', padding: '2px', borderRadius: '4px' }} labelStyle={{display: 'none'}} />
                            <Line
                               type="monotone"
                               dataKey="value"
                               stroke={sig.signal_type === 'buy' ? '#10b981' : sig.signal_type === 'sell' ? '#ef4444' : '#6b7280'}
                               strokeWidth={2}
                               dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Activity size={48} className="mx-auto mb-4 opacity-20" />
                <p>Waiting for incoming signals...</p>
              </div>
            )}

          </NeumPanel>
        </div>
      </div>
    </div>
  );
}
