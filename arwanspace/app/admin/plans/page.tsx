import NeumPanel from '../../components/neum/NeumPanel';
import NeumButton from '../../components/neum/NeumButton';
import { type Plan } from '@/types/dashboard';
import { Edit } from 'lucide-react';

const mockPlans: Plan[] = [
  {
    id: "p1", name: "student", display_name: "Student", price_monthly: 3.00, price_yearly: 29.00, is_active: true,
    features: { max_cv: 5, themes: 7, layouts: 5, color_options: 5, custom_domain: false, team_members: 0, stats: "basic", support: "ai+email" }
  },
  {
    id: "p2", name: "pro", display_name: "Pro", price_monthly: 10.00, price_yearly: 96.00, is_active: true,
    features: { max_cv: -1, themes: 27, layouts: -1, color_options: -1, custom_domain: false, team_members: 0, stats: "advanced", support: "ai+chat" }
  },
  {
    id: "p3", name: "company", display_name: "Company", price_monthly: 30.00, price_yearly: 288.00, is_active: true,
    features: { max_cv: -1, themes: 27, layouts: -1, color_options: -1, custom_domain: true, team_members: 7, stats: "advanced", support: "priority" }
  }
];

export default function PlansPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-100">Subscription Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockPlans.map((plan) => (
          <NeumPanel key={plan.id} className="p-8 flex flex-col relative">
            <div className="absolute top-4 right-4">
              <NeumButton className="p-2"><Edit size={16} /></NeumButton>
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-2 uppercase">{plan.display_name}</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold text-[#7ec8e3]">${plan.price_monthly}</span>
              <span className="text-gray-500">/mo</span>
            </div>

            <div className="flex-grow space-y-4 text-sm text-slate-200">
              <div className="flex justify-between border-b border-[#d1d8e0] pb-2">
                <span className="font-medium">Max CVs</span>
                <span>{plan.features.max_cv === -1 ? 'Unlimited' : plan.features.max_cv}</span>
              </div>
              <div className="flex justify-between border-b border-[#d1d8e0] pb-2">
                <span className="font-medium">Themes</span>
                <span>{plan.features.themes}</span>
              </div>
              <div className="flex justify-between border-b border-[#d1d8e0] pb-2">
                <span className="font-medium">Team Members</span>
                <span>{plan.features.team_members}</span>
              </div>
              <div className="flex justify-between border-b border-[#d1d8e0] pb-2">
                <span className="font-medium">Custom Domain</span>
                <span>{plan.features.custom_domain ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </NeumPanel>
        ))}
      </div>
    </div>
  );
}
