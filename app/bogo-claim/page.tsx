'use client';

import { useState, useEffect } from 'react';
import {
  Crown,
  CheckCircle2,
  Copy,
  Share2,
  MessageCircle,
  Flame,
  ArrowRight,
  Gift,
  UserCheck,
  ExternalLink
} from 'lucide-react';

export default function BogoClaimPage() {
  const [masterCode, setMasterCode] = useState('VIP20');
  const [friendPasses, setFriendPasses] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);

      // Check if codes already exist in localStorage, otherwise generate 8 unique guest passes
      const storedPasses = localStorage.getItem('rmi_friend_passes');
      if (storedPasses) {
        try {
          setFriendPasses(JSON.parse(storedPasses));
        } catch {
          generateAndStorePasses();
        }
      } else {
        generateAndStorePasses();
      }
    }
  }, []);

  const generateAndStorePasses = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const passes: string[] = [];
    for (let i = 0; i < 8; i++) {
      let code = 'PASS-';
      for (let j = 0; j < 6; j++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      passes.push(code);
    }
    setFriendPasses(passes);
    localStorage.setItem('rmi_friend_passes', JSON.stringify(passes));
  };

  const copyIndividualPass = (pass: string, index: number) => {
    const shareText = `Here is your free VIP pass to face Dick Headerson for a mock interview: https://roastmyinterview.me?code=${pass} (Use passcode: ${pass})`;
    navigator.clipboard.writeText(shareText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllPasses = () => {
    const formatted = friendPasses
      .map(
        (pass, i) =>
          `Pass #${i + 1}: ${pass} -> https://roastmyinterview.me?code=${pass}`
      )
      .join('\n');
    const fullText = `🔥 8 Free VIP Passes to RoastMyInterview.me:\n\n${formatted}\n\nEnter any code on the homepage to unlock the 20-Question Executive Gauntlet!`;

    navigator.clipboard.writeText(fullText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const shareViaWhatsApp = (pass: string) => {
    const text = encodeURIComponent(
      `I got you a free VIP pass to test your interview skills with Dick Headerson! Use code ${pass} at https://roastmyinterview.me?code=${pass}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 sm:px-6 py-10 relative overflow-x-hidden flex flex-col items-center justify-start text-white">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* SUCCESS BADGE */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Payment Verified • Order Completed</span>
        </div>

        {/* HEADER */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            You&apos;re In The <span className="text-amber-400">VIP Room</span>.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
            Your 20-Question Executive Gauntlet is unlocked, and your 8 free friend passes are ready for distribution.
          </p>
        </div>

        {/* SECTION 1: BUYER'S IMMEDIATE LAUNCH */}
        <div className="rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/15 via-zinc-900 to-zinc-900 p-6 sm:p-8 text-left shadow-2xl shadow-amber-500/10 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40">
                <Crown className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-none">
                  Your Master Access Pass
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Includes 20 deep questions &amp; 3 quarterly checkpoint audits
                </p>
              </div>
            </div>
            <span className="font-mono text-sm font-black bg-zinc-950 px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300">
              {masterCode}
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed mb-6">
            Ready to face Dick Headerson? Click below to launch your session with executive tough-love feedback and milestone reports.
          </p>

          <a
            href="/?mode=vip"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-6 py-4 text-sm font-black text-black shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Flame className="h-4 w-4 text-black" />
            <span>Launch My 20-Question Gauntlet Now &rarr;</span>
          </a>
        </div>

        {/* SECTION 2: 8 FREE FRIEND PASSES */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 text-left shadow-xl backdrop-blur space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-orange-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  8 Free Friend Passes Included ($80 Value)
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Send these codes to friends, coworkers, or your Slack channels.
              </p>
            </div>

            <button
              onClick={copyAllPasses}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-300 hover:bg-orange-500/20 transition-all self-start sm:self-auto"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{allCopied ? 'All 8 Copied!' : 'Copy All 8 Passes'}</span>
            </button>
          </div>

          {/* PASS LIST GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {friendPasses.map((pass, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-zinc-500">
                    {index + 1}
                  </span>
                  <span className="font-mono font-bold text-amber-300">
                    {pass}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => shareViaWhatsApp(pass)}
                    title="Send via WhatsApp"
                    className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => copyIndividualPass(pass, index)}
                    title="Copy Invite Link"
                    className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{copiedIndex === index ? 'Copied!' : 'Link'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 text-center pt-2">
            Each pass gives 1 candidate complete access to the 20-question gauntlet with milestone reports.
          </p>
        </div>

        {/* FOOTER LINK */}
        <div className="pt-2 text-center">
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition underline underline-offset-4"
          >
            &larr; Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
