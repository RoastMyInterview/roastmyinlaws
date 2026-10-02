'use client';

import React, { useState, useEffect, useRef } from 'react';

const BALLOON_ROASTS = [
  "“Your mother-in-law rearranges your kitchen because she thinks your marriage lacks structure.”",
  "“‘We just dropped by unexpectedly!’ Translation: We have zero respect for your personal sanctuary.”",
  "“If your boundaries were any softer, your father-in-law would be claiming your living room on his taxes.”",
  "“Passive-aggressive comments about your turkey stuffing aren't critiques, they're territorial warfare.”",
  "“‘That’s just how my mother is!’ No, that’s how a hostage situation begins.”",
  "“You smiled and said thank you when she bought you cleaning supplies for Christmas. Pathetic.”",
  "“Unsolicited parenting advice from someone whose golden child is currently borrowing bail money.”",
  "“You let them invite 40 strangers to your intimate rehearsal dinner. Stand up straight!”"
];

const LIVE_CASUALTIES = [
  "🔥 Dave from Ohio just got shredded for letting his MIL keep an unannounced house key",
  "💀 Sarah from Austin folded when her FIL criticized the family budget in front of the kids",
  "🚨 Marcus in Seattle caught an instant fail: called his spouse's meddling mother 'sweet deep down'",
  "🔥 Jenna from Boston humiliated for agreeing to spend 14 consecutive days at her in-laws' cabin",
  "💀 Kevin from Denver got roasted for laughing off passive-aggressive comments about his career"
];

const INSTANT_FAILS = [
  "they mean well",
  "she means well",
  "he means well",
  "that's just how they are",
  "that's just how she is",
  "keep the peace",
  "pick your battles",
  "blood is thicker than water",
  "respect your elders no matter what"
];

interface Message {
  role: 'dick' | 'user';
  content: string;
}

export default function RoastMyInlaws() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [vipCode, setVipCode] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [vipError, setVipError] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [currentBalloon, setCurrentBalloon] = useState(0);

  const voiceEnabledRef = useRef(true);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_CASUALTIES.length);
    }, 4500);

    const balloonInterval = setInterval(() => {
      setCurrentBalloon((prev) => (prev + 1) % BALLOON_ROASTS.length);
    }, 6000);

    return () => {
      clearInterval(tickerInterval);
      clearInterval(balloonInterval);
    };
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const speakText = (text: string) => {
    if (!voiceEnabledRef.current || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio fallback silent fail
    }
  };

  const handleStart = async (vipStatus = false) => {
    setStarted(true);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Start the RoastMyInlaws hot seat. VIP mode is ${vipStatus ? 'ACTIVE (13 questions)' : 'FREE (3 questions)'}. Welcome me into the hot seat, introduce yourself as Dick Headerson, and demand to know the worst single boundary violation or holiday nightmare my in-laws have ever committed.`
            }
          ],
          niche: 'inlaws',
          isVip: vipStatus
        }),
      });

      const data = await res.json();
      if (data && data.text) {
        setMessages([{ role: 'dick', content: data.text }]);
        speakText(data.text);
      } else {
        const fallback = "I'm Dick Headerson. Take a seat. Don't start sugarcoating your weak boundaries. Tell me the most unhinged, passive-aggressive thing your mother-in-law or father-in-law pulled, and what you pathetically did about it.";
        setMessages([{ role: 'dick', content: fallback }]);
        speakText(fallback);
      }
    } catch {
      const fallback = "I'm Dick Headerson. Sit down and stop making excuses for people who treat your living room like an annex. Tell me your worst in-law nightmare right now.";
      setMessages([{ role: 'dick', content: fallback }]);
      speakText(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const lower = userText.toLowerCase();

    const isInstantFail = INSTANT_FAILS.some((phrase) => lower.includes(phrase));

    const updatedMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    if (isInstantFail) {
      setTimeout(() => {
        const failMessage = "🚨 INSTANT EJECT! Did you actually just say 'they mean well' or 'keep the peace'?! You don't have boundaries, you have a welcome mat stamped onto your forehead. That cowardly mindset is exactly why they show up unannounced and criticize your life choices. Disqualified!";
        setMessages([...updatedMessages, { role: 'dick', content: failMessage }]);
        speakText(failMessage);
        setLoading(false);
      }, 700);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === 'dick' ? 'assistant' : 'user',
            content: m.content
          })),
          niche: 'inlaws',
          isVip
        }),
      });

      const data = await res.json();
      if (data && data.text) {
        setMessages([...updatedMessages, { role: 'dick', content: data.text }]);
        speakText(data.text);
      }
    } catch {
      const fallbackError = "You survived that round only because my connection glitched. Pull yourself together and state your real boundary, not a cowardly compromise.";
      setMessages([...updatedMessages, { role: 'dick', content: fallbackError }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyVip = () => {
    if (!vipCode.trim()) {
      setVipError('Enter a valid VIP code');
      return;
    }

    if (vipCode.trim().toUpperCase().startsWith('VIP-')) {
      setIsVip(true);
      setShowVipModal(false);
      setVipError('');
      if (!started) {
        handleStart(true);
      }
    } else {
      setVipError('Invalid VIP passcode. Check daily code on RoastMy.me');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-orange-500 selection:text-black font-sans">
      {/* Top Banner */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white leading-none">
                RoastMy<span className="text-orange-500">Inlaws</span>.me
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-0.5">
                Chamber #22 • Face Dick Headerson
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isVip ? (
              <button
                onClick={() => setShowVipModal(true)}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-orange-400 border border-orange-500/30 transition-all"
              >
                Have Access Code?
              </button>
            ) : (
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                13-Q VIP Gauntlet Active
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Live Casualties Ticker */}
      <div className="bg-zinc-900/70 border-b border-zinc-800/60 py-1.5 px-4 text-center overflow-hidden">
        <p className="text-xs font-mono text-zinc-300 transition-all duration-500">
          {LIVE_CASUALTIES[tickerIndex]}
        </p>
      </div>

      {/* Main Body */}
      <section className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {!started ? (
          <div className="text-center space-y-6 my-auto">
            {/* Dick Card Preview */}
            <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border-2 border-orange-500/30 max-w-xl mx-auto shadow-2xl relative">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <img
                  src="https://roastmyinterview.me/dick-avatar.jpg"
                  alt="Dick Headerson"
                  className="w-full h-full object-cover rounded-2xl border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                />
                <span className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Lead Host
                </span>
              </div>
              <h2
                style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}
                className="text-4xl text-orange-400 font-black mb-1"
              >
                Dick Headerson
              </h2>
              <p className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 mb-3">
                In-Law Boundary Interrogator
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Did your mother-in-law just critique your parenting, or did your father-in-law drop unannounced at 7:30 AM? Stop smiling through clenched teeth. Take the hot seat and get your spine rebuilt.
              </p>

              {/* Speech balloon */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs italic text-orange-300/90 min-h-[52px] flex items-center justify-center">
                {BALLOON_ROASTS[currentBalloon]}
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleStart(false)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-wider shadow-lg hover:shadow-orange-500/20 transition-all text-sm"
              >
                Start Free 3-Question Roast
              </button>
              <button
                onClick={() => setShowVipModal(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold border border-zinc-800 transition-all text-sm"
              >
                Enter 13-Question VIP Code
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[70vh] bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Chat message stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-orange-500 text-black font-medium'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    {m.role === 'dick' && (
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1.5">
                        Dick Headerson
                      </p>
                    )}
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-xs text-zinc-400">Dick is sharpening his comeback...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Defend your decision or confess your in-law trauma..."
                className="flex-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-black font-black uppercase text-xs rounded-xl transition-all"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </section>

      {/* VIP Modal */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-orange-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-black text-white">Unlock 13-Question VIP Gauntlet</h3>
            <p className="text-xs text-zinc-400">
              Enter today’s daily VIP passcode generated from the RoastMy.me master network.
            </p>
            <input
              type="text"
              value={vipCode}
              onChange={(e) => setVipCode(e.target.value)}
              placeholder="e.g. VIP-4821"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 font-mono focus:outline-none focus:border-orange-500"
            />
            {vipError && <p className="text-xs text-red-500 font-semibold">{vipError}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowVipModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyVip}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-wider"
              >
                Verify & Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-zinc-900 text-center text-[11px] text-zinc-500">
        RoastMyInlaws.me • Powered by Dick Headerson • Sub-brand of RoastMy.me
      </footer>
    </main>
  );
}
