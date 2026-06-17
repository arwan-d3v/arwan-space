'use client';

import { type ServiceCategory } from '@/types/services';
import GlassPanel from '@/app/components/GlassPanel';

interface CategoryNavProps {
  categories: { id: ServiceCategory; label: string }[];
  activeCategory: ServiceCategory;
  onSelect: (category: ServiceCategory) => void;
}

export default function CategoryNav({ categories, activeCategory, onSelect }: CategoryNavProps) {
  return (
    <div className="sticky top-4 z-40 w-full overflow-x-auto pb-4 custom-scrollbar hide-scrollbar">
      <div className="flex gap-3 px-4 min-w-max mx-auto justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
              activeCategory === cat.id
                ? 'bg-white/60 border-white text-gray-900 shadow-md backdrop-blur-xl'
                : 'bg-white/20 border-white/30 text-gray-700 hover:bg-white/40 backdrop-blur-md'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
