'use client';

import { useState } from 'react';
import NeumPanel from '../../components/neum/NeumPanel';
import NeumButton from '../../components/neum/NeumButton';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const plans = [
  { id: 'student', name: 'Student', price: 3, features: ['5 CVs Max', '7 Themes', 'Basic Stats'] },
  { id: 'pro', name: 'Pro', price: 10, features: ['Unlimited CVs', '27 Themes', 'Advanced Stats'] },
  { id: 'company', name: 'Company', price: 30, features: ['Unlimited Everything', 'Custom Domain', 'Team Members (Up to 7)'] },
];

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    // Simulate API call for mock payment
    await new Promise(r => setTimeout(r, 1500));
    setLoading(null);
    alert(`Successfully subscribed to ${planId.toUpperCase()} plan!`);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center pt-8">
        <h2 className="text-4xl font-bold text-gray-800">Upgrade Your Plan</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">Unlock premium themes, advanced analytics, and custom domains to supercharge your personal branding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map(plan => (
          <NeumPanel key={plan.id} className="p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-widest mb-4">{plan.name}</h3>
            <div className="mb-8 flex items-baseline justify-center">
              <span className="text-4xl font-bold text-[#7ec8e3]">${plan.price}</span>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <ul className="space-y-4 mb-8 w-full text-left flex-grow">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-500 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium">{feat}</span>
                </li>
              ))}
            </ul>

            <NeumButton
              className="w-full py-4 text-[#7ec8e3] font-bold text-lg"
              onClick={() => handleSubscribe(plan.id)}
              disabled={!!loading}
            >
              {loading === plan.id ? <Loader2 className="animate-spin mx-auto" /> : `Choose ${plan.name}`}
            </NeumButton>
          </NeumPanel>
        ))}
      </div>
    </div>
  );
}
