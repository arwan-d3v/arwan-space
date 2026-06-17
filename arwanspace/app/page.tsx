import Link from 'next/link';
import BackgroundParallax from './components/BackgroundParallax';
import GlassPanel from './components/GlassPanel';
import { FileText, User, ArrowRight } from 'lucide-react';

export default function GatewayPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundParallax />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <GlassPanel className="w-full max-w-2xl mx-auto p-8 md:p-12 text-center space-y-10 animate-fade-in-up">

          {/* Logo & Tagline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm">
              Arwan&apos;space
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-md mx-auto leading-relaxed">
              Your Professional Hub & Digital Ecosystem
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <Link href="/resume" className="group">
              <GlassPanel className="p-8 h-full flex flex-col items-center justify-center space-y-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-white/60 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#b7e1fa]/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#b7e1fa] transition-all">
                  <FileText className="w-8 h-8 text-gray-800" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Resume</h2>
                  <p className="text-sm text-gray-600 font-medium">Continue Explore</p>
                </div>
              </GlassPanel>
            </Link>

            <Link href="/login" className="group">
              <GlassPanel className="p-8 h-full flex flex-col items-center justify-center space-y-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-white/60 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#f7a072]/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f7a072]/80 transition-all">
                  <User className="w-8 h-8 text-gray-800" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">I&apos;m Member</h2>
                  <p className="text-sm text-gray-600 font-medium">Login SSO</p>
                </div>
              </GlassPanel>
            </Link>
          </div>

          {/* Link Explore */}
          <div className="pt-6 border-t border-white/20">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-[#f7a072] group transition-colors px-6 py-2 rounded-full hover:bg-white/30"
            >
              Looking Arwan&apos;space ecosystem
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </GlassPanel>
      </main>
    </div>
  );
}
