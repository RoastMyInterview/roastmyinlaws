'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ROASTS } from '@/lib/roasts-config';
import { 
  Flame, Crown, ArrowLeft, Send, RotateCcw, Loader2,
  Briefcase, FileText, Share2, HeartCrack, TrendingUp, DollarSign,
  Building2, Swords, Megaphone, Palette, Terminal, Cpu, Laptop,
  Mail, PenTool, Rocket
} from 'lucide-react';

function getRoomBadge(slug?: string) {
  if (!slug) return { icon: Swords, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
  
  const s = slug.toLowerCase();
  if (s.includes('interview')) return { icon: Briefcase, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  if (s.includes('resume') || s.includes('cv')) return { icon: FileText, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
  if (s.includes('linkedin') || s.includes('social')) return { icon: Share2, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
  if (s.includes('code') || s.includes('dev') || s.includes('github')) return { icon: Terminal, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (s.includes('dating') || s.includes('tinder')) return { icon: HeartCrack, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  if (s.includes('pitch') || s.includes('startup') || s.includes('vc')) return { icon: TrendingUp, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
  if (s.includes('crypto') || s.includes('finance') || s.includes('budget') || s.includes('pricing') || s.includes('ecommerce')) return { icon: DollarSign, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
  if (s.includes('marketing') || s.includes('copy')) return { icon: Megaphone, color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
  if (s.includes('design') || s.includes('portfolio') || s.includes('ui')) return { icon: Palette, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
  if (s.includes('executive') || s.includes('management') || s.includes('sales') || s.includes('networking')) return { icon: Building2, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
  if (s.includes('ai') || s.includes('prompt')) return { icon: Cpu, color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' };
  if (s.includes('system') || s.includes('backend') || s.includes('product') || s.includes('architecture') || s.includes('app')) return { icon: Laptop, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' };
  if (s.includes('email') || s.includes('cold') || s.includes('newsletter')) return { icon: Mail, color: 'text-gray-400 bg-gray-500/10 border-gray-500/30' };
  if (s.includes('write') || s.includes('blog')) return { icon: PenTool, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
  if (s.includes('hustle')) return { icon: Rocket, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };

  return { icon: Swords, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function RoastRoomPage() {
  const params = useParams();
  const slug = (params?.roast as string) || '';

  const roastList = Object.values(ROASTS) as any[];
  const roast = roastList.find((r) => r.slug === slug) || ROASTS[slug] || roastList[0];

  const initialGreeting = roast?.balloonRoasts?.[0] || "Alright, let's see what you've got. Don't waste my time.";

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialGreeting }
  ]);
  
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [chatInput, setChatInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle the initial 2-input form submission
  const handleInitialRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input1.trim() || !input2.trim() || loading) return;

    setHasSubmittedForm(true);
    setLoading(true);

    const firstUserMessage = `Here is my info.\n${roast.input1Label}: ${input1}\n${roast.input2Label}: ${input2}\n\nRoast me based on this.`;
    const newMessages: Message[] = [...messages, { role: 'user', content: firstUserMessage }];
    setMessages(newMessages);

    await fetchRoast(newMessages);
  };

  // Handle normal back-and-forth chat
  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userText = chatInput.trim();
    setChatInput('');
    setLoading(true);

    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);

    await fetchRoast(newMessages);
  };

  const fetchRoast = async (newMessages: Message[]) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          roastSlug: roast?.slug || slug,
          persona: roast?.persona || 'Dick Henderson',
        }),
      });

      if (!res.ok) throw new Error('Failed to get roast response');

      const data = await res.json();
      const reply = data.reply || data.content || data.message || "Is that really the best you've got?";
      
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "You broke my radar with that answer. Try again with something sharper." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: initialGreeting }]);
    setHasSubmittedForm(false);
    setInput1('');
    setInput2('');
    setChatInput('');
  };

  if (!roast) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Roast Room Not Found</h1>
        <Link href="/" className="text-orange-400 underline">Return to Arcade</Link>
      </div>
    );
  }

  const badge = getRoomBadge(roast.slug);
  const IconComponent = badge.icon;

  return (
    <div className="min-h-[100dvh] w-full bg-zinc-950 text-white flex flex-col items-center px-4 sm:px-6 pb-6 relative">
      <header className="sticky top-0 z-40 w-full flex justify-center bg-zinc-950/85 backdrop-blur-md py-3.5 mb-4 border-b border-zinc-800/80 shadow-sm shadow-black/20">
        <div className="w-full max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade Lobby</span>
          </Link>

          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-bold tracking-tight">
              {roast.name}
            </span>
          </div>

          <a href="https://buy.stripe.com/7sYfZa1CR02l69egwh6Na00" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition">
            <Crown className="h-3 w-3" />
            <span className="hidden sm:inline">VIP Pass</span>
          </a>
        </div>
      </header>

      <div className="w-full max-w-2xl bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-lg shadow-black/20">
        <div className={`h-16 w-16 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-inner ${badge.color}`}>
          <IconComponent className="h-8 w-8" />
        </div>
        <div className="overflow-hidden flex-1">
          <h2 className="text-base sm:text-lg font-black text-white truncate">
            {roast.persona}
          </h2>
          <p className="text-xs text-orange-400 font-medium truncate">
            {roast.personaTitle}
          </p>
        </div>
        <button onClick={handleReset} title="Restart Room" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="w-full max-w-2xl flex-1 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 overflow-y-auto space-y-4 min-h-[350px] max-h-[60vh] shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-br-none shadow-md shadow-orange-900/20' : 'bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 rounded-bl-none shadow-md shadow-black/20'}`}>
              {msg.role === 'assistant' && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1.5">
                  <IconComponent className="h-3 w-3" />
                  {roast.persona}
                </div>
              )}
              {/* Hide the system prompt context from the user's chat bubbles */}
              <p className="whitespace-pre-wrap">
                {msg.content.includes('Here is my info.') 
                  ? "Here is my info. Let's hear it." 
                  : msg.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800/90 text-zinc-400 border border-zinc-700/60 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-2 shadow-md shadow-black/20">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-orange-400" />
              <span>{roast.persona} is typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* DYNAMIC BOTTOM BAR: Shows initial 2 inputs OR normal chat box */}
      {!hasSubmittedForm ? (
        <form onSubmit={handleInitialRoast} className="w-full max-w-2xl mt-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1 block">{roast.input1Label}</label>
              <input required type="text" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder={roast.input1Placeholder} disabled={loading} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-orange-500 transition" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1 block">{roast.input2Label}</label>
              <input required type="text" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder={roast.input2Placeholder} disabled={loading} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-orange-500 transition" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
            Roast Me <Flame className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleChat} className="w-full max-w-2xl mt-4 flex items-center gap-2 mb-2">
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={`Reply to ${roast.persona}...`} disabled={loading} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 shadow-inner" />
          <button type="submit" disabled={loading || !chatInput.trim()} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-black font-bold px-4 py-3 rounded-xl transition flex items-center justify-center shadow-lg active:scale-95">
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
