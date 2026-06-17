import GlassPanel from '../GlassPanel';

export default function HobbiesSection({ hobbies }: { hobbies: string[] }) {
  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobbies" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-blue-300">Interests & Hobbies</h2>
      <GlassPanel className="p-8">
        <div className="flex flex-wrap gap-4">
          {hobbies.map((hobby, index) => (
            <span
              key={index}
              className="clay-button text-slate-700"
            >
              {hobby}
            </span>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}
