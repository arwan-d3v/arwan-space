import GlassPanel from '../GlassPanel';

export default function HobbiesSection({ hobbies }: { hobbies: string[] }) {
  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobbies" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 pl-4 border-l-4 border-[#b7e1fa]">Interests & Hobbies</h2>
      <GlassPanel className="p-8">
        <div className="flex flex-wrap gap-3">
          {hobbies.map((hobby, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/10 text-slate-100 font-medium rounded-full border border-white/10 shadow-sm hover:bg-white/5 transition-colors"
            >
              {hobby}
            </span>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}
