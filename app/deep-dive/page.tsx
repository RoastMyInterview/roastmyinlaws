'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Flame, ArrowRight } from 'lucide-react';

export default function DeepDiveRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/?mode=vip');
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 text-white flex flex-col items-center justify-center text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/20 border-2 border-amber-500/50 mb-5 shadow-2xl shadow-amber-500/20 animate-pulse">
        <Crown className="h-10 w-10 text-amber-400" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
        Launching 13-Question <span className="text-amber-400">Unlucky 13 Gauntlet</span>...
      </h1>

      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
        Transferring your session to the unified executive coach engine with 2 milestone progress reports (Q4 &amp; Q8).
      </p>

      <a
        href="/?mode=vip"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-6 py-3 text-xs font-black text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition"
      >
        <Flame className="h-4 w-4 text-black" />
        <span>Click Here If Not Redirected Automatically</span>
        <ArrowRight className="h-4 w-4 text-black" />
      </a>
    </div>
  );
}
