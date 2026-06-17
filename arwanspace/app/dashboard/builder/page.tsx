'use client';

import { useState } from 'react';
import NeumPanel from '../../components/neum/NeumPanel';
import NeumButton from '../../components/neum/NeumButton';
import NeumInput from '../../components/neum/NeumInput';

export default function CVBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    summary: '',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">CV Builder</h2>
        <div className="flex gap-2">
          <NeumButton className="px-4 py-2" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</NeumButton>
          <NeumButton className="px-4 py-2 text-[#7ec8e3]" onClick={() => setStep(Math.min(6, step + 1))}>Next</NeumButton>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between px-4 mb-8">
        {[1,2,3,4,5,6].map(s => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${s === step ? 'neum-inset text-[#7ec8e3]' : s < step ? 'neum-button text-green-500' : 'neum-button text-gray-400'}`}>
            {s}
          </div>
        ))}
      </div>

      <NeumPanel className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
              <NeumInput
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Professional Title</label>
              <NeumInput
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Summary</label>
              <textarea
                value={formData.summary}
                onChange={e => setFormData({...formData, summary: e.target.value})}
                className="w-full px-4 py-3 neum-inset focus:outline-none focus:ring-2 focus:ring-[#7ec8e3]/50 text-gray-700 placeholder-gray-400 bg-transparent resize-y min-h-[120px] rounded-xl"
                placeholder="Passionate developer..."
              />
            </div>
          </div>
        )}

        {step > 1 && step < 6 && (
           <div className="text-center py-12">
             <h3 className="text-xl font-bold text-gray-800 mb-2">Step {step} Module</h3>
             <p className="text-gray-500">Form fields for this section would go here.</p>
           </div>
        )}

        {step === 6 && (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-sm">✓</div>
            <h3 className="text-2xl font-bold text-gray-800">Ready to Publish</h3>
            <p className="text-gray-500 max-w-md mx-auto">Your CV data has been saved. You can now generate a public link to share it with the world.</p>
            <NeumButton className="mx-auto mt-4 px-8 py-3 bg-[#7ec8e3]/20 text-[#7ec8e3] font-bold">Publish CV</NeumButton>
          </div>
        )}
      </NeumPanel>
    </div>
  );
}
