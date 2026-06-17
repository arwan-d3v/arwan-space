import NeumPanel from '../components/neum/NeumPanel';
import NeumButton from '../components/neum/NeumButton';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardHome() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  let role = 'pro';
  if (session?.user?.email?.includes('company')) role = 'company';
  if (session?.user?.email?.includes('student')) role = 'student';
  if (session?.user?.email?.includes('public')) role = 'public';

  const planLimits: Record<string, { max: number | string, current: number }> = {
    public: { max: 0, current: 0 },
    student: { max: 5, current: 2 },
    pro: { max: 'Unlimited', current: 12 },
    company: { max: 'Unlimited', current: 45 },
  };

  const limits = planLimits[role] || planLimits.public;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-100">Welcome Back!</h2>
        {role === 'public' && (
          <Link href="/dashboard/upgrade">
            <NeumButton className="text-[#7ec8e3] font-bold">Upgrade Plan</NeumButton>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeumPanel className="p-6">
          <p className="text-sm font-semibold text-gray-500 uppercase">Your Plan</p>
          <h3 className="text-2xl font-bold text-slate-100 uppercase">{role}</h3>
          {role !== 'company' && role !== 'pro' && (
             <Link href="/dashboard/upgrade" className="text-sm text-[#7ec8e3] hover:underline mt-2 inline-block">View pricing</Link>
          )}
        </NeumPanel>

        <NeumPanel className="p-6">
          <p className="text-sm font-semibold text-gray-500 uppercase">CVs Created</p>
          <h3 className="text-2xl font-bold text-slate-100">
            {limits.current} <span className="text-gray-500 text-lg">/ {limits.max}</span>
          </h3>
        </NeumPanel>

        <NeumPanel className="p-6 flex flex-col justify-center items-center bg-[#7ec8e3]/10">
          <Link href="/dashboard/themes" className="w-full">
            <NeumButton className="w-full py-4 text-[#7ec8e3] font-bold text-lg">
              + Create New CV
            </NeumButton>
          </Link>
        </NeumPanel>
      </div>

      {/* Recent CVs Mock */}
      <NeumPanel className="p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Recent Resumes</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-300 rounded-xl">
            <div>
              <h4 className="font-bold text-slate-100">Frontend Dev Resume</h4>
              <p className="text-xs text-gray-500">Updated 2 days ago • Theme: Aurora</p>
            </div>
            <div className="flex gap-2">
              <NeumButton className="text-sm px-3 py-1.5">Edit</NeumButton>
              <NeumButton className="text-sm px-3 py-1.5 text-blue-500">View Public</NeumButton>
            </div>
          </div>
        </div>
      </NeumPanel>
    </div>
  );
}
