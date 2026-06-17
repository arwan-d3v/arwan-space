'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function LiquidNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <div className="liquid-nav px-6 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-teal-300 flex items-center justify-center text-white font-bold shadow-inner relative overflow-hidden">
            {/* Glossy reflection on logo */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/40 rounded-t-full"></div>
            A
          </div>
          <span className="font-semibold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">Arwan'space</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Gateway</Link>
          <Link href="/explore" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Explore</Link>
          <Link href="/services" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Services</Link>

          <Link href="/login" className="ml-4">
            <div className="clay-button text-sm !py-2 !px-5 text-blue-600 hover:text-blue-700">
              Dashboard
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700 p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 liquid-nav p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600 px-2 py-1" onClick={() => setIsOpen(false)}>Gateway</Link>
          <Link href="/explore" className="text-sm font-medium text-slate-700 hover:text-blue-600 px-2 py-1" onClick={() => setIsOpen(false)}>Explore</Link>
          <Link href="/services" className="text-sm font-medium text-slate-700 hover:text-blue-600 px-2 py-1" onClick={() => setIsOpen(false)}>Services</Link>
          <div className="h-px bg-white/40 my-1"></div>
          <Link href="/login" className="px-2" onClick={() => setIsOpen(false)}>
            <div className="clay-button text-sm inline-block text-center w-full !py-2 text-blue-600">
              Dashboard
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
