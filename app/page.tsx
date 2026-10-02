'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  RotateCcw, Target, ShieldAlert, FileText, UserX, Facebook, Twitter,
  Linkedin, Instagram, Share2, Skull, AlertOctagon, Download, FlameKindling,
  Trophy, ChevronRight, ChevronLeft, KeyRound, CheckCircle2, Flame,
  Timer, Gift, X, Info, HelpCircle, Volume2, VolumeX, Smile, Briefcase,
  Sparkles, Crown, BarChart3, Copy, Swords, MessageCircle, RefreshCw,
  Building2, Smartphone, Zap, ChevronDown, ChevronUp, FileWarning,
  MessageSquare, Radio
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const DICK_AVATAR = 'https://roastmyinterview.me/dick-avatar.jpg';

const BALLOON_ROASTS = [
  "I roast you in here so hiring managers don't ghost you out there!",
  "Drop the buzzwords and tell me what you actually accomplished. Let's see it!",
  "Recruiters send polite generic rejections. I give you the real feedback you need to win.",
  "If you say 'synergy', you're fired. If you give me real numbers, you get hired.",
  "Let's turn your corporate speak into an irresistible, metric-driven pitch!",
  "You're better than a buzzword-stuffed resume. Step up and prove it to me.",
  "Zero fluff. High energy. Let's see if you can pass the ultimate interview test!",
  "Real confidence starts when fake corporate jargon stops. Show me what you've got!",
  "I'm here to give you the honest feedback your former boss was too polite to say.",
  "Drop the 'rockstar' title. Show me a real problem-solver who delivers results.",
  "Most candidates talk for 4 minutes and say nothing. Let's practice saying everything in 2 crisp sentences.",
  "Three questions between you and executive-grade interview confidence. Let's go!",
  "You want that promotion? Stop speaking like a LinkedIn post and speak like a leader.",
  "I push hard because the job market doesn't grade on a curve. Let's sharpen your pitch.",
  "Every time you say 'think outside the box', a recruiter closes your resume. Let's fix that.",
  "Tough love is the fastest shortcut to passing real executive interviews.",
  "Don't practice until you get it right. Practice with me until you can't get it wrong!",
  "Give me concrete metrics, clear accountability, and zero fluff. Let's do this!"
];

const LIVE_CASUALTIES = [
  "⚡ Someone at Google just got fired for using 'bandwidth' (12s ago)",
  "🔥 Designer went from 12/100 to 88/100 after fixing their pitch (24s ago)",
  "💀 Product Manager in Austin scored 4/100 for saying 'synergy' (28s ago)",
  "🚀 Startup Founder scored 92/100 by actually explaining their metrics (35s ago)",
  "🚨 Candidate terminated for claiming to be a '10x rockstar' (45s ago)",
  "🔥 Engineer in NY jumped from 5/100 to 85/100 after Dick's feedback (1m ago)",
  "⚡ Scrum Master in Seattle failed question 2 on basic accountability (1m ago)",
  "🏆 Sales Lead hit 95/100 by keeping answers under 2 sentences (2m ago)"
];

const BAD_WORDS_REGEX = /\b(fuck|shit|bitch|asshole|cunt|dickhead|pussy|whore|slut|faggot|nigg|cock|penis|vagina|bastard|twat)\b/i;

interface WallItem {
  name: string;
  role: string;
  score: number;
  verdict: string;
  timeAgo: string;
}

const INITIAL_WALL_OF_SHAME: WallItem[] = [
  { name: 'Brad T.', role: 'Senior Product Lead', score: 14, verdict: 'Told him his 5-year roadmap belongs in a kindergarten art show.', timeAgo: '4m ago' },
  { name: 'Sarah K.', role: 'VP of Marketing', score: 8, verdict: 'Fired in 45 seconds for saying "synergy" with a straight face.', timeAgo: '12m ago' },
  { name: 'Devon M.', role: 'Full Stack Engineer', score: 27, verdict: 'Claimed to be a "10x rockstar". Turned out to be a 0.1x karaoke singer.', timeAgo: '28m ago' },
  { name: 'Alex R.', role: 'Scrum Master', score: 19, verdict: 'Agile enthusiast who could not stand up to basic accounting questions.', timeAgo: '41m ago' },
  { name: 'Taylor B.', role: 'Chief of Staff', score: 6, verdict: 'Gave a 4-minute non-answer. Dick fell asleep and woke up disgusted.', timeAgo: '1h ago' },
];

const INITIAL_HALL_OF_FAME: WallItem[] = [
  { name: 'Elena V.', role: 'Staff Infrastructure Eng', score: 94, verdict: 'Refused to use Kubernetes for a static site. Rare sign of human intelligence.', timeAgo: '2h ago' },
  { name: 'Marcus L.', role: 'Director of Product', score: 91, verdict: 'Answered a question in two crisp sentences instead of a corporate TED Talk.', timeAgo: '5h ago' },
  { name: 'Chloe D.', role: 'Senior Analyst', score: 88, verdict: 'Called out my trick question. Disrespectful, but mathematically accurate.', timeAgo: '8h ago' },
];

const COMPANY_WARS = [
  { name: 'Management Consultancies', avgScore: 11, players: '1,420 victims', verdict: 'Synergy overdose & zero concrete metrics.' },
  { name: 'Seed-Stage Startups', avgScore: 15, players: '2,890 victims', verdict: 'Pre-revenue swagger, post-revenue panic.' },
  { name: 'Big Tech / FAANG', avgScore: 24, players: '3,840 victims', verdict: 'Cannot answer simple questions without 12 acronyms.' },
  { name: 'Growth Marketing Agencies', avgScore: 8, players: '1,730 victims', verdict: 'Called themselves "growth ninjas". Fired on question 1.' },
  { name: 'Investment Banking', avgScore: 19, players: '960 victims', verdict: 'Total meltdown when asked what they actually build.' }
];

const MAX_FREE_ATTEMPTS = 1;

export default function Home() {
  const [userName, setUserName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [linkedinBio, setLinkedinBio] = useState('');
  const [showViralOptions, setShowViralOptions] = useState(false);

  const [started, setStarted] = useState(false);
  const [autoFailed, setAutoFailed] = useState(false);
  const [buzzwordFlashing, setBuzzwordFlashing] = useState(false);
  const [activeTab, setActiveTab] = useState<'fame' | 'shame' | 'companies'>('fame');
  const [wallFeed, setWallFeed] = useState<WallItem[]>(INITIAL_WALL_OF_SHAME);
  const [freeAttempts, setFreeAttempts] = useState(0);
  const [scorecardStep, setScorecardStep] = useState(0);
  const [badgeFormat, setBadgeFormat] = useState<'badge' | 'story' | 'receipts'>('badge');
  const [casualtyIndex, setCasualtyIndex] = useState(0);

  const [isVipMode, setIsVipMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [showBalloon, setShowBalloon] = useState(true);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const voiceEnabledRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const toggleVoice = () => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      voiceEnabledRef.current = next;
      if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const [balloonIndex, setBalloonIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);

  const [challengerInfo, setChallengerInfo] = useState<{ name: string; score: string; role: string; rawScore: number } | null>(null);

  const [showVipModal, setShowVipModal] = useState(false);
  const [vipCodeInput, setVipCodeInput] = useState('');
  const [vipError, setVipError] = useState('');
  const [vipLoading, setVipLoading] = useState(false);
  const [vipSuccess, setVipSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCasualtyIndex((prev) => (prev + 1) % LIVE_CASUALTIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const playBuzzerAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const defaultTitle = 'RoastMyInterview.me | Face Dick Headerson';
      const alertTitles = [
        "🔥 Don't chicken out now! ",
        "👀 Hiring managers are watching... ",
        "💀 Your resume is crying for help... ",
        "💼 The hot seat is still warm... ",
        "🚨 Corporate jargon detected... ",
        "⏳ Your mock interview is waiting... "
      ];
      
      let scrollTimer: any = null;
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const randomPhrase = alertTitles[Math.floor(Math.random() * alertTitles.length)];
          let scrollText = randomPhrase + "    •    ";
          scrollTimer = setInterval(() => {
            scrollText = scrollText.substring(1) + scrollText[0];
            document.title = scrollText;
          }, 280);
        } else {
          if (scrollTimer) clearInterval(scrollTimer);
          document.title = defaultTitle;
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      const params = new URLSearchParams(window.location.search);
      const challengerName = params.get('challenger');
      const challengerScore = params.get('score');
      const challengerRole = params.get('role');
      const modeParam = params.get('mode') || params.get('vip');

      if (modeParam === 'vip' || modeParam === 'true') {
        setIsVipMode(true);
      }

      if (challengerName) {
        const roleVal = challengerRole || 'Product Manager';
        const scoreVal = challengerScore ? (challengerScore.includes('/') ? challengerScore : `${challengerScore}/100`) : '14/100';
        const numScore = parseInt(scoreVal.replace(/[^0-9]/g, ''), 10) || 14;
        setChallengerInfo({
          name: challengerName,
          score: scoreVal,
          role: roleVal,
          rawScore: numScore
        });
        setJobTitle(roleVal);
      }

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (scrollTimer) clearInterval(scrollTimer);
      };
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('rmi_free_attempt_v2');
    if (saved) setFreeAttempts(parseInt(saved, 10) || 0);
  }, []);

  const chat: any = useChat({ api: '/api/chat' } as any);
  const messages: any[] = chat.messages || [];
  const status: string = chat.status || '';
  const setMessages = chat.setMessages;
  const isStreaming = status === 'streaming' || status === 'submitted';

  const getMessageText = (message: any): string => {
    if (typeof message.content === 'string' && message.content.trim()) return message.content;
    if (Array.isArray(message.parts)) {
      return message.parts
        .filter((p: any) => p && p.type === 'text' && typeof p.text === 'string')
        .map((p: any) => p.text)
        .join('');
    }
    return '';
  };

  const isInterviewOver = useMemo(() => {
    if (autoFailed) return true;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') {
        const text = getMessageText(messages[i]).toLowerCase();
        if (text.includes('scorecard') || text.includes('autopsy') || text.includes('final score:')) {
          return true;
        }
      }
    }
    return false;
  }, [messages, autoFailed]);

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/[\*\#\_\~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/🚨|💀|🗣️|🚩|💡|🎖️|👑|📊|⚔️️|🏢|⚡|📱/g, '')
      .trim();
  };

  const speakText = (text: string) => {
    if (!voiceEnabledRef.current || typeof window === 'undefined' || !window.speechSynthesis) return;
    const clean = cleanTextForSpeech(text);
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.pitch = 0.1;
    utterance.rate = 0.75;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const grumpyVoice = voices.find(v => 
        (v.lang === 'en-US' && v.name.includes('Alex')) ||
        (v.lang === 'en-US' && v.name.includes('Mark')) ||
        (v.lang === 'en-US' && v.name.includes('Aaron')) ||
        (v.lang === 'en-US' && v.name.includes('Male'))
      ) || voices.find(v => v.lang.startsWith('en-US')) || voices[0];
      if (grumpyVoice) utterance.voice = grumpyVoice;
    }

    (window as any)._currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (started) return;
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setBalloonIndex((prev) => {
          let nextIdx = 0;
          do {
            nextIdx = Math.floor(Math.random() * BALLOON_ROASTS.length);
          } while (nextIdx === prev && BALLOON_ROASTS.length > 1);
          return nextIdx;
        });
        setIsFlipping(false);
      }, 75);
    }, 3500);
    return () => clearInterval(interval);
  }, [started]);

  const handleBalloonClick = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (!introPlayed) {
      setIntroPlayed(true);
      speakText("Listen up. Real recruiters smile, say great job, and then ghost you. I give you the brutal, unfiltered reality check you actually need to get hired. Drop the corporate buzzwords, step into the hot seat, and let's see what you're made of.");
    } else {
      let nextIdx = 0;
      do {
        nextIdx = Math.floor(Math.random() * BALLOON_ROASTS.length);
      } while (nextIdx === balloonIndex && BALLOON_ROASTS.length > 1);
      speakText(BALLOON_ROASTS[nextIdx]);
      setIsFlipping(true);
      setTimeout(() => {
        setBalloonIndex(nextIdx);
        setIsFlipping(false);
      }, 75);
    }
  };

  useEffect(() => {
    if (isStreaming) {
      window.speechSynthesis?.cancel();
    } else if (!isStreaming && messages.length > 0 && voiceEnabledRef.current) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant') {
        const rawText = getMessageText(lastMsg);
        if (!rawText.includes("### Dick Headerson's Official Scorecard") && !rawText.includes('The Autopsy')) {
          speakText(rawText);
        }
      }
    }
  }, [isStreaming, messages.length]);

  useEffect(() => {
    if (isInterviewOver && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [isInterviewOver, timeLeft]);

  const append = async (msg: { role?: string; content?: string; text?: string }) => {
    const textContent = msg.content || msg.text || '';
    if (msg.role === 'assistant' && typeof setMessages === 'function') {
      setMessages((prev: any[]) => [
        ...(prev || []),
        { id: Date.now().toString(), role: 'assistant', content: textContent, parts: [{ type: 'text', text: textContent }] },
      ]);
      return;
    }
    if (typeof chat.sendMessage === 'function') {
      try { await chat.sendMessage({ text: textContent }); return; }
      catch {
        try { await chat.sendMessage(textContent); return; }
        catch { await chat.sendMessage({ role: msg.role || 'user', content: textContent }); return; }
      }
    }
    if (typeof chat.append === 'function') {
      await chat.append({ role: msg.role || 'user', content: textContent });
    }
  };

  const parsedScorecard = useMemo(() => {
    if (!isInterviewOver) return null;
    const lastAssistantMessage = [...messages].reverse().find((m) => m.role === 'assistant');
    if (!lastAssistantMessage) return null;
    const fullText = getMessageText(lastAssistantMessage);

    const hasScorecard = fullText.toLowerCase().includes('scorecard') || fullText.toLowerCase().includes('autopsy');
    if (!hasScorecard) return null;

    const scoreMatch = fullText.match(/Final Score:?\*?\*?\s*([^\n\r]+)/i);
    const decisionMatch = fullText.match(/Hiring Decision:?\*?\*?\s*([^\n\r]+)/i);
    const autopsyMatch = fullText.match(/The Autopsy\*?\*?\s*([\s\S]*?)(?=###|🗣️|What You Said|🚩|Red Flags|$)/i);
    const translationMatch = fullText.match(/(?:What You Said vs\.? What Dick Heard|What Dick actually heard)\*?\*?\s*([\s\S]*?)(?=###|🚩|Red Flags|💡|The Script Doctor|$)/i);
    const redFlagsMatch = fullText.match(/Red Flags Identified\*?\*?\s*([\s\S]*?)(?=###|💡|The Script Doctor|---|Official Evaluation|$)/i);
    const scriptDoctorMatch = fullText.match(/The Script Doctor[^\n]*\*?\*?\s*([\s\S]*?)(?=---|Official Evaluation|$)/i);

    const splitIdx = fullText.search(/(?:---|##\s*🔥?.*Scorecard)/i);
    const introRoast = splitIdx > 20 ? fullText.slice(0, splitIdx).trim() : '';

    const extractedScoreStr = scoreMatch ? scoreMatch[1].replace(/[\[\]]/g, '').trim() : '14/100';
    const numericScore = parseInt(extractedScoreStr.replace(/[^0-9]/g, ''), 10) || 14;

    return {
      introRoast,
      finalScore: extractedScoreStr,
      numericScore,
      decision: decisionMatch ? decisionMatch[1].replace(/[\[\]]/g, '').trim() : 'NEEDS SHARPENING',
      autopsy: autopsyMatch ? autopsyMatch[1].trim() : '',
      translation: translationMatch ? translationMatch[1].trim() : '',
      redFlags: redFlagsMatch ? redFlagsMatch[1].trim() : '',
      scriptDoctor: scriptDoctorMatch ? scriptDoctorMatch[1].trim() : '',
      raw: fullText,
    };
  }, [messages, isInterviewOver]);

  const headToHeadResult = useMemo(() => {
    if (!challengerInfo || !parsedScorecard) return null;
    const userScore = autoFailed ? 0 : parsedScorecard.numericScore;
    const rivalScore = challengerInfo.rawScore;
    return {
      won: userScore > rivalScore,
      tied: userScore === rivalScore,
      diff: Math.abs(userScore - rivalScore),
      userScore,
      rivalScore,
      challengerName: challengerInfo.name,
      challengerRole: challengerInfo.role
    };
  }, [challengerInfo, parsedScorecard, autoFailed]);

  useEffect(() => {
    if (isInterviewOver && userName && jobTitle) {
      const newScore = autoFailed ? 0 : Math.floor(Math.random() * 25) + 5;
      const newVerdict = autoFailed
        ? 'Instant termination for illegal buzzword deployment.'
        : 'Dick gave them an honest reality check to fix their pitch.';

      setWallFeed((prev) => [
        { name: userName, role: jobTitle + (companyName ? ` @ ${companyName}` : ''), score: newScore, verdict: newVerdict, timeAgo: 'Just now' },
        ...prev.slice(0, 5),
      ]);
    }
  }, [isInterviewOver, autoFailed, userName, jobTitle, companyName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming, scorecardStep]);

  useEffect(() => {
    if (started && !isStreaming && !isInterviewOver) {
      inputRef.current?.focus();
    }
  }, [started, isStreaming, isInterviewOver]);

  const handleStart = (forceVip = false) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }

    const vipActive = forceVip || isVipMode;

    if (!jobTitle.trim() || !userName.trim()) {
      alert('Please enter your name and target job title first!');
      return;
    }

    if (BAD_WORDS_REGEX.test(userName.toLowerCase())) {
      alert("Let's keep it professional. Please use an appropriate name or nickname.");
      return;
    }

    if (!vipActive && freeAttempts >= MAX_FREE_ATTEMPTS) {
      setShowLimitModal(true);
      return;
    }

    if (!vipActive) {
      const nextCount = freeAttempts + 1;
      setFreeAttempts(nextCount);
      localStorage.setItem('rmi_free_attempt_v2', nextCount.toString());
    }

    setStarted(true);
    const randomRejections = Math.floor(Math.random() * (1000000 - 10 + 1) + 10).toLocaleString();

    const challengerContext = challengerInfo
      ? ` My rival ${challengerInfo.name} challenged me after scoring ${challengerInfo.score} for ${challengerInfo.role}. Call out that I am here to beat ${challengerInfo.name}'s score.`
      : '';

    const bioContext = linkedinBio.trim()
      ? ` My current public headline/bio is: "${linkedinBio.trim()}". In your very first sentence, savage and roast this headline before asking Question 1.`
      : '';

    const companyContext = companyName.trim()
      ? ` I currently work at or represent: "${companyName.trim()}". Hold me accountable to that company's reputation.`
      : '';

    if (vipActive) {
      append({
        role: 'user',
        content: `My name is ${userName.trim()} and my target role is: ${jobTitle.trim()}.${companyContext}${bioContext}${challengerContext} You are Dick Headerson, a tough-love senior executive hiring manager. You ask exactly 13 brutal questions total (The Unlucky 13 Gauntlet), one at a time.\n\nDELIVERABLE MILESTONES:\n- At Question 4 (after answer 4): In your response, provide '### 📊 Milestone Report #1 (Pacing & Fluff Audit)', then immediately ask Question 5.\n- At Question 8 (after answer 8): In your response, provide '### 📊 Milestone Report #2 (Substance vs Jargon Ratio)', then immediately ask Question 9.\n- After answer 13: Do NOT ask another question; provide Dick Headerson's Official Scorecard.\n\nIntroduce yourself now, address me by name, state you've rejected ${randomRejections} applicants, dare me to survive the Unlucky 13 questions with checkpoints at Q4 and Q8, and ask Question 1.`,
      });
    } else {
      append({
        role: 'user',
        content: `My name is ${userName.trim()} and my target role is: ${jobTitle.trim()}.${companyContext}${bioContext}${challengerContext} You are Dick Headerson, a tough-love senior executive hiring manager. You hate buzzwords, corporate jargon, and vague answers. You ask exactly 3 brutal questions total, one at a time. After my answer to question 3, do not ask another question; provide Dick Headerson's Official Scorecard with actionable constructive advice. Introduce yourself now, address me by name, set a high-energy tough-love tone, and ask Question 1.`,
      });
    }
  };

  const handleVerifyVipCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVipError('');
    if (!vipCodeInput.trim()) return;

    setVipLoading(true);
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: vipCodeInput.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        setVipSuccess(true);
        setIsVipMode(true);
      } else {
        setVipError(data.message || 'Invalid passcode for today.');
      }
    } catch {
      setVipError('Error checking passcode. Please try again.');
    } finally {
      setVipLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStreaming || isInterviewOver) return;
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }

    const textarea = inputRef.current;
    if (!textarea || !textarea.value.trim()) return;
    const value = textarea.value.trim();
    textarea.style.height = 'auto';

    const triggerWords = [
      'synergy', 'rockstar', 'ninja', 'think outside the box', 'disrupt',
      'thought leader', 'circle back', 'deep dive', 'dive deep', 'diving deep',
      'move the needle', 'bandwidth', 'low-hanging fruit', 'touch base', 'paradigm shift',
      'hyper-growth', 'holistic approach', 'wheelhouse'
    ];
    const lowerValue = value.toLowerCase();
    const hitBuzzword = triggerWords.find((word) => lowerValue.includes(word));

    if (hitBuzzword) {
      playBuzzerAudio();
      setBuzzwordFlashing(true);
      setTimeout(() => setBuzzwordFlashing(false), 1400);

      append({ role: 'user', content: value });
      setAutoFailed(true);
      setTimeout(() => {
        append({
          role: 'assistant',
          content: `🚨 **BUZZWORD TRIGGERED: EMERGENCY TERMINATION** 🚨\n\nDid you just say *"${hitBuzzword}"* with a straight face? \n\nI stop interviews dead in their tracks because real recruiters will silently toss your application in the trash the second they hear consultant jargon. You have genuine experience, ${userName}—stop hiding behind empty buzzwords.\n\n### Dick Headerson's Official Scorecard\n* **Final Score:** 0/100\n* **Hiring Decision:** INSTANT TERMINATION\n* **Fatal Error:** Deployed the illegal corporate buzzword "${hitBuzzword}".\n* **The Autopsy:** Candidate resorted to corporate autopilot rather than answering with concrete, measurable outcomes.\n* **The Fix:** Delete every generic corporate phrase from your memory. Speak plainly, give numbers, and try again!`,
        });
      }, 500);
      return;
    }

    append({ role: 'user', content: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLTextAreaElement).closest('form')?.requestSubmit();
    }
  };

  const linkDownload = (url: string) => {
    const link = document.createElement('a');
    link.download = `Dick_Headerson_${badgeFormat}_${userName.replace(/\s+/g, '_')}.png`;
    link.href = url;
    link.click();
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#09090b',
        scale: 2.5,
      });
      linkDownload(canvas.toDataURL('image/png'));
    } catch {
      alert('Failed to generate image. Take a screenshot instead!');
    }
  };

  const copyBadgeToClipboard = async () => {
    if (!certificateRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#09090b',
        scale: 2.5,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          alert('Badge copied to clipboard! Paste directly into Slack, Discord, or WhatsApp (Ctrl+V / Cmd+V).');
        } catch {
          linkDownload(canvas.toDataURL('image/png'));
        }
      });
    } catch {
      alert('Failed to copy. Use Save Image instead!');
    }
  };

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://roastmyinterview.me';
    if (userName && parsedScorecard?.finalScore) {
      const cleanScore = parsedScorecard.finalScore.replace(/[^0-9\/]/g, '');
      return `https://roastmyinterview.me?challenger=${encodeURIComponent(userName)}&score=${encodeURIComponent(cleanScore)}&role=${encodeURIComponent(jobTitle || 'Candidate')}`;
    }
    return 'https://roastmyinterview.me';
  }, [userName, parsedScorecard, jobTitle]);

  const handleNativeShare = async () => {
    const shareTextContent = parsedScorecard?.finalScore
      ? headToHeadResult
        ? `I took ${headToHeadResult.challengerName}'s interview challenge on RoastMyInterview.me! They scored ${headToHeadResult.rivalScore}, I scored ${headToHeadResult.userScore}. Think you can beat us?`
        : `I just faced Dick Headerson for a ${jobTitle || 'job'} interview and scored ${parsedScorecard.finalScore}. Can you survive the hot seat?`
      : `Think you can survive a mock interview with Dick Headerson without corporate buzzwords? Step into the hot seat:`;

    const shareData = {
      title: 'RoastMyInterview.me | Face Dick Headerson',
      text: shareTextContent,
      url: shareUrl,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Challenge link copied to clipboard! Send to your colleagues or group chat.');
    }
  };

  const handleReplyToChallengerWhatsApp = () => {
    if (!headToHeadResult) return;
    const { challengerName, userScore, rivalScore, won, tied } = headToHeadResult;
    let message = won
      ? `Hey ${challengerName}! I accepted your challenge on RoastMyInterview.me. You scored ${rivalScore}/100, but I crushed you with ${userScore}/100! 🏆 Try to beat me: ${shareUrl}`
      : tied
        ? `Hey ${challengerName}! We tied with ${userScore}/100 on RoastMyInterview.me. Rematch now: ${shareUrl}`
        : `Hey ${challengerName}! You beat me with ${rivalScore}/100 to my ${userScore}/100 on RoastMyInterview.me. Coming back for revenge: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareText = autoFailed
    ? `I instantly failed an AI job interview because I slipped and used a corporate buzzword. See how fast you get caught:`
    : headToHeadResult
      ? `I faced Dick Headerson after ${headToHeadResult.challengerName} challenged me. I scored ${headToHeadResult.userScore}/100 vs ${headToHeadResult.rivalScore}/100. Can you beat me?`
      : `I just faced tough-love executive Dick Headerson for a ${jobTitle || 'job'} interview. Can you beat my score?`;

  const handleWallShare = (platform: string) => {
    const scoreText = autoFailed ? '0/100 (Instant Buzzword Failure)' : (parsedScorecard?.finalScore || '14/100');
    const decisionText = autoFailed ? 'INSTANT TERMINATION' : (parsedScorecard?.decision || 'NEEDS SHARPENING');
    const candidateRole = jobTitle.trim() || 'Candidate';
    const companyTag = companyName.trim() ? ` representing ${companyName.trim()}` : '';

    if (platform === 'slack') {
      const slackSnippet = `:rotating_light: *${userName || 'A colleague'} just survived the hot seat with Dick Headerson!*\n• *Target Role:* ${candidateRole}\n• *Score:* ${scoreText}\n• *Verdict:* ${decisionText}\n• *Offense:* Banned from using empty corporate jargon.\n\nThink anyone on this team has thicker skin? Step up to the hot seat: ${shareUrl}`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(slackSnippet);
        alert('📋 Pre-formatted Slack / Teams message copied to clipboard!\n\nJust paste (Ctrl+V / Cmd+V) into your team’s #watercooler, #random, or group chat.');
      }
    }
    else if (platform === 'facebook') {
      const fbPostText = `Dick Headerson just roasted my mock interview for ${candidateRole} with a ${scoreText}.\n\nTagging every colleague who says 'synergy', 'bandwidth', or 'circle back' in meetings: step up to the hot seat and see if you can beat my score: ${shareUrl}`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(fbPostText);
        alert('🔥 Facebook Call-Out caption copied to clipboard!\n\nOpening Facebook now—paste it into your post and tag your coworkers!');
      }
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    }
    else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    }
    else if (platform === 'linkedin') {
      const linkedInPostText = `Humbled to announce that I just survived the mock interview hot seat with Dick Headerson for ${candidateRole}${companyTag} on RoastMyInterview.me.\n\n📊 Final Score: ${scoreText}\n🚨 Hiring Verdict: ${decisionText}\n\nDick's tough-love rule: zero consultant jargon, zero generic corporate fluff, only real metrics. Slip and say 'synergy' or 'deep dive', and you get terminated on the spot.\n\nThink you can beat my score without hiding behind buzzwords? Step up:\n${shareUrl}`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(linkedInPostText);
        alert('🔥 Humble-Roast post copied to clipboard!\n\nOpening LinkedIn composer—simply hit Paste (Ctrl+V / Cmd+V).');
      }
      window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
    }
    else if (platform === 'whatsapp') {
      if (headToHeadResult) handleReplyToChallengerWhatsApp();
      else window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
    else if (platform === 'instagram') {
      const igCaption = `Dick Headerson just roasted my mock interview for ${candidateRole} with a ${scoreText}. Hiring Verdict: ${decisionText}.\n\nThink you can survive without using consultant buzzwords? Link in bio or visit roastmyinterview.me\n\n#RoastMyInterview #DickHeaderson #CorporateHumor #JobSearch #MockInterview`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(igCaption);
        alert('📸 Instagram Caption Copied!\n\n💡 PRO TIP: Save your 9:16 Pink Slip below and post to IG Stories with an "Add Yours" sticker titled "Your worst interview score" to trigger a chain reaction!');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-100">
      
      {/* =============================== */}
      {/* CINEMATIC 8-SECOND INTRO LAYER  */}
      {/* =============================== */}
      <style dangerouslySetInnerHTML={{ __html: `
        .intro-layer { position: fixed; inset: 0; background-color: #000; z-index: 9999; display: flex; justify-content: center; align-items: center; pointer-events: none; overflow: hidden; animation: fadeOutIntro 1.5s forwards; animation-delay: 8s; }
        .chair-bg { position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.8; filter: grayscale(20%) contrast(120%); z-index: 1; }
        .neon-box { position: absolute; top: 32%; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center; border: 4px solid #550022; border-radius: 20px; padding: 2vw 4vw; z-index: 2; font-family: 'Arial Rounded MT Bold', 'Nunito', sans-serif; animation: boxTurnOn 8s linear forwards; white-space: nowrap; max-width: 90vw;}
        .neon-text { font-size: 5.5vw; font-weight: 900; line-height: 1; letter-spacing: 0.05em; }
        .neon-cyan { color: #004455; animation: cyanTurnOn 8s linear forwards; }
        .neon-orange { color: #552200; animation: orangeTurnOn 8s linear forwards; }
        @media (min-width: 768px) {
          .neon-box { top: 8%; padding: 15px 40px; border-width: 6px; border-radius: 30px; }
          .neon-text { font-size: 3.5rem; }
        }
        @keyframes boxTurnOn { 0%, 75% { border-color: #550022; box-shadow: none; } 76% { border-color: #ff2a7a; box-shadow: 0 0 10px #ff2a7a, inset 0 0 10px #ff2a7a; } 77% { border-color: #550022; box-shadow: none; } 79% { border-color: #ff2a7a; box-shadow: 0 0 20px #ff2a7a, inset 0 0 20px #ff2a7a; } 80% { border-color: #550022; box-shadow: none; } 82%, 100% { border-color: #ffe6f0; box-shadow: 0 0 15px #ff2a7a, inset 0 0 15px #ff2a7a, 0 0 30px #ff2a7a, inset 0 0 30px #ff2a7a, 0 0 60px #ff2a7a; } }
        @keyframes cyanTurnOn { 0%, 75% { color: #004455; text-shadow: none; } 76% { color: #e6ffff; text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff; } 77% { color: #004455; text-shadow: none; } 79% { color: #e6ffff; text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff; } 80% { color: #004455; text-shadow: none; } 82%, 100% { color: #ffffff; text-shadow: 0 0 5px #fff, 0 0 15px #00e5ff, 0 0 30px #00e5ff, 0 0 60px #00e5ff; } }
        @keyframes orangeTurnOn { 0%, 75% { color: #552200; text-shadow: none; } 76% { color: #fffae6; text-shadow: 0 0 10px #ff8c00, 0 0 20px #ff8c00; } 77% { color: #552200; text-shadow: none; } 79% { color: #fffae6; text-shadow: 0 0 10px #ff8c00, 0 0 20px #ff8c00; } 80% { color: #552200; text-shadow: none; } 82%, 100% { color: #ffffff; text-shadow: 0 0 5px #fff, 0 0 15px #ff8c00, 0 0 30px #ff8c00, 0 0 60px #ff8c00; } }
        .spotlight-hole { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 0vw; height: 0vw; border-radius: 50%; box-shadow: 0 0 0 200vw #000, inset 0 0 0px #000; z-index: 3; animation: openHole 8s cubic-bezier(0.3, 0.05, 0.4, 1) forwards; }
        .main-content { opacity: 0; animation: fadeInContent 2s forwards; animation-delay: 8.5s; }
        @keyframes openHole { 0% { width: 0vw; height: 0vw; box-shadow: 0 0 0 200vw #000, inset 0 0 50px #000; } 20% { width: 15vw; height: 15vw; box-shadow: 0 0 80px 200vw #000, inset 0 0 60px #000; } 70% { width: 45vw; height: 45vw; box-shadow: 0 0 150px 200vw #000, inset 0 0 30px #000; } 100% { width: 150vw; height: 150vw; box-shadow: 0 0 0px 200vw #000, inset 0 0 0px #000; } }
        @keyframes fadeOutIntro { to { opacity: 0; visibility: hidden; } }
        @keyframes fadeInContent { to { opacity: 1; } }
      `}} />

      <div className="intro-layer">
        <div className="neon-box">
          <div className="neon-text">
            <span className="neon-cyan">ROASTMYINTERVIEW</span><span className="neon-orange">.ME</span>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop" alt="Comfy leather hot seat" className="chair-bg" />
        <div className="spotlight-hole"></div>
      </div>

      <div className="main-content flex flex-col w-full h-full">

        {/* BUZZWORD FLASH OVERLAY */}
        {buzzwordFlashing && (
          <div className="fixed inset-0 z-[200] pointer-events-none bg-red-600/40 animate-pulse border-8 border-red-500" />
        )}

        {/* CODE ACCEPTED POPUP */}
        {vipSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="relative w-full max-w-sm rounded-3xl border border-emerald-500/50 bg-zinc-900 p-6 shadow-2xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/50">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Code Accepted!</h3>
              <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
                VIP 13-Question Gauntlet unlocked. Enter your name and job title below to begin.
              </p>
              <button
                onClick={() => {
                  setVipSuccess(false);
                  setShowVipModal(false);
                  setVipCodeInput('');
                  setTimeout(() => {
                    nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    nameInputRef.current?.focus();
                  }, 300);
                }}
                className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-black text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95"
              >
                Close &amp; Enter Details
              </button>
            </div>
          </div>
        )}

        {/* LIMIT MODAL */}
        {showLimitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-3xl border border-amber-500/60 bg-zinc-900 p-6 shadow-2xl text-left">
              <button onClick={() => setShowLimitModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-6 w-6 text-amber-400" />
                <h3 className="text-lg sm:text-xl font-black text-white">Free Interview Completed!</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed">
                You&apos;ve completed your free mock roast. Upgrade to the <strong>Unlucky 13 Gauntlet</strong> with <strong>2 milestone reports</strong> (Q4 &amp; Q8) for $10 USD. Includes 8 individual free VIP invite passes!
              </p>
              <div className="space-y-2.5">
                <a
                  href="https://buy.stripe.com/7sYfZa1CR02l69egwh6Na00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-xs sm:text-sm font-black text-black hover:from-amber-400 hover:to-orange-400 transition shadow-lg shadow-amber-500/20"
                >
                  <Crown className="h-4 w-4" />
                  <span>Get VIP Pass + 8 Free Invites ($10 USD)</span>
                </a>
                <button
                  onClick={() => { setShowLimitModal(false); setShowVipModal(true); }}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-xs sm:text-sm font-bold text-zinc-300 hover:bg-zinc-700 transition"
                >
                  I have a Guest Passcode
                </button>
                <div className="pt-2 text-center border-t border-zinc-800 mt-3">
                  <button
                    onClick={() => {
                      localStorage.removeItem('rmi_free_attempt_v2');
                      setFreeAttempts(0);
                      setShowLimitModal(false);
                      alert('Free attempt reset! You can now start the interview.');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-orange-400 transition underline underline-offset-4"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reset Free Attempt (Tester Mode)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WHY MODAL */}
        {showWhyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl text-left">
              <button onClick={() => setShowWhyModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-amber-500" /> 
                Why Use RoastMyInterview.me?
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <p><strong className="text-white">1. Real recruiters lie to you.</strong><br/>They send automated polite rejections. Dick explains where your pitch actually failed.</p>
                <p><strong className="text-white">2. Kill buzzwords permanently.</strong><br/>Corporate jargon triggers immediate emergency termination.</p>
                <p><strong className="text-white">3. Build unflappable composure.</strong><br/>If you survive Dick, talking to a real executive interviewer feels easy.</p>
              </div>
              <button onClick={() => setShowWhyModal(false)} className="mt-6 w-full rounded-xl bg-zinc-100 py-3 text-xs sm:text-sm font-bold text-black hover:bg-white transition-all shadow-lg">
                I&apos;m ready to level up
              </button>
            </div>
          </div>
        )}

        {/* FLOATING PROMO BALLOON */}
        {showBalloon && !started && (
          <div className="hidden sm:block fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-8 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm rounded-2xl border border-amber-500/50 bg-zinc-900/95 p-4 shadow-2xl shadow-amber-500/20 backdrop-blur">
            <button onClick={() => setShowBalloon(false)} className="absolute top-3 right-3 text-zinc-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-[11px] font-black tracking-wider uppercase text-amber-400">VIP Gauntlet Bundle</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed mb-2.5">
              Unlock the <strong>13-Question Gauntlet</strong> with <strong>2 Milestone Checkpoints</strong> (Q4 &amp; Q8) + 8 individual guest invite passes!
            </p>
            <a 
              href="https://buy.stripe.com/7sYfZa1CR02l69egwh6Na00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-center text-xs font-black text-black hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20 transition-all"
            >
              Unlock VIP + 8 Free Passes ($10 USD) &rarr;
            </a>
          </div>
        )}

        {/* ONBOARDING HERO SCREEN */}
        {!started ? (
          <div className="min-h-screen w-full px-3 sm:px-6 pb-12 flex flex-col items-center justify-start">
            
            {/* Top Navigation Controls */}
            <div className="w-full flex justify-center py-2.5 mb-3 border-b border-zinc-800/70">
              <div className="w-full max-w-xl flex items-center justify-between gap-1.5 sm:gap-2 px-1">
                
                {/* BRANDING HUB LINK */}
                <a href="https://roastmy.me" className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/20 transition-all">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">RoastMy.me Hub</span>
                  <span className="inline sm:hidden">Hub</span>
                </a>

                {/* RIGHT CONTROLS */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={toggleVoice}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold backdrop-blur transition-all",
                      voiceEnabled
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20 hover:bg-emerald-500/25"
                        : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    )}
                  >
                    {voiceEnabled ? <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> : <VolumeX className="h-3.5 w-3.5 text-zinc-500" />}
                    <span className="hidden sm:inline">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
                  </button>

                  {isVipMode ? (
                    <div className="flex items-center gap-1 rounded-full border border-amber-500/50 bg-amber-500/20 px-2.5 py-1.5 text-xs font-bold text-amber-300">
                      <Crown className="h-3.5 w-3.5 text-amber-400" />
                      <span>VIP (13-Q)</span>
                    </div>
                  ) : (
                    <a
                      href="https://buy.stripe.com/7sYfZa1CR02l69egwh6Na00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-amber-400 backdrop-blur transition-all hover:border-amber-400 hover:bg-amber-500/20"
                    >
                      <Crown className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">VIP 13-Q + 8 Friends ($10 USD)</span>
                      <span className="inline sm:hidden">VIP ($10)</span>
                    </a>
                  )}

                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-orange-300 backdrop-blur transition-all hover:border-orange-400 hover:text-white shadow-sm shadow-orange-500/20"
                  >
                    <Swords className="h-3.5 w-3.5 text-orange-400" />
                    <span className="hidden sm:inline">Challenge a Friend</span>
                    <span className="inline sm:hidden">Challenge</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full max-w-xl text-center">
              
              {/* LIVE CASUALTY TICKER */}
              <div className="w-full rounded-full border border-red-500/30 bg-red-950/30 px-3 py-1.5 flex items-center justify-center gap-2 text-[11px] text-zinc-300 mb-4 animate-in fade-in">
                <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse flex-shrink-0" />
                <span className="truncate">{LIVE_CASUALTIES[casualtyIndex]}</span>
              </div>

              {challengerInfo && (
                <div className="w-full rounded-2xl border-2 border-amber-500/90 bg-gradient-to-r from-amber-950/80 via-zinc-900/95 to-orange-950/80 p-3.5 text-center shadow-2xl shadow-orange-500/25 animate-in slide-in-from-top-4 mb-4">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 mb-1">
                    <Swords className="h-4 w-4 text-amber-400 animate-pulse" />
                    <span>{challengerInfo.name.toUpperCase()} HAS CHALLENGED YOU!</span>
                  </div>
                  <p className="text-sm sm:text-base font-extrabold text-white">
                    <strong className="text-orange-400">{challengerInfo.name}</strong> scored{' '}
                    <strong className="text-amber-300 font-black text-lg">{challengerInfo.score}</strong> for{' '}
                    <strong className="text-sky-300">{challengerInfo.role}</strong>.
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">
                    Enter your name below. Can you beat {challengerInfo.name}&apos;s score without using buzzwords?
                  </p>
                </div>
              )}

              {/* AVATAR & BALLOON */}
              <div className="relative mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-3.5 w-full max-w-xl mb-4">
                <div className="order-2 md:order-1 flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    "relative flex h-24 w-24 md:h-36 md:w-36 items-center justify-center rounded-3xl bg-zinc-900 shadow-2xl overflow-hidden border-2 transition-all duration-300",
                    !introPlayed ? "border-emerald-500/40 shadow-emerald-500/20" : "border-orange-500/40 shadow-orange-500/30"
                  )}>
                    <img src={DICK_AVATAR} alt="Dick Headerson" className="h-full w-full object-cover" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 mt-2">
                    <UserX className="h-3.5 w-3.5" />
                    <span>VP of Roasting:</span>
                    <span style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className="text-base text-orange-300 ml-0.5">Dick Headerson</span>
                  </div>
                </div>

                <div
                  onClick={handleBalloonClick}
                  className={cn(
                    "order-1 md:order-2 relative flex-1 max-w-sm md:max-w-md cursor-pointer select-none rounded-2xl border-2 bg-gradient-to-br from-zinc-900 via-zinc-900 px-4 py-3 text-center shadow-xl backdrop-blur transition-all duration-200 hover:scale-[1.015]",
                    !introPlayed 
                      ? "border-emerald-500/70 to-emerald-950/30 shadow-emerald-500/10" 
                      : "border-amber-500/70 to-amber-950/40 shadow-amber-500/20 hover:border-amber-400",
                    isFlipping ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-in zoom-in-95"
                  )}
                >
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-snug italic">
                    {!introPlayed ? (
                      "Welcome to the Hot Seat. Click below if you want to know what you're really getting into."
                    ) : challengerInfo ? (
                      `"${challengerInfo.name} scored ${challengerInfo.score} for ${challengerInfo.role} and challenged you to beat them. Let's see if you have more substance!"`
                    ) : (
                      `"${BALLOON_ROASTS[balloonIndex]}"`
                    )}
                  </p>

                  {!introPlayed ? (
                    <div className="flex items-center justify-center gap-2 mt-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider py-2 px-5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all mx-auto w-fit">
                      <Volume2 className="h-4 w-4 animate-pulse" />
                      <span>▶ Hear Dick&apos;s Challenge</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 mt-1.5 text-amber-400 font-black text-[11px] uppercase tracking-wider">
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Tap for another roast</span>
                    </div>
                  )}
                </div>
              </div>

              {/* LOCKED STICKY HEADER (Pins directly to top as soon as it hits screen edge on both mobile and laptop) */}
              <div className="sticky top-0 z-50 w-full py-3 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 shadow-2xl shadow-black/80 text-center transition-all">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-none">
                  RoastMyInterview<span className="text-orange-500">.me</span>
                </h1>
                <p className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest mt-1">Part of the RoastMy.me Network</p>
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto flex items-center justify-center flex-wrap gap-1">
                  <span>Face</span>
                  <span style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className="text-xl text-orange-400 px-0.5">
                    Dick Headerson
                  </span>
                  <span className="text-zinc-600 px-1">•</span>
                  <span className="text-zinc-300 font-medium">Tough love. Zero buzzwords. Real feedback.</span>
                </p>

                {/* SHORT & SWEET SALES PITCH: FOR PLAY & FOR REAL */}
                <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur text-left shadow-xl">
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800/80 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Why Use RoastMyInterview?
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Short &amp; Sweet</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1. For Play */}
                    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-3.5 flex flex-col justify-between hover:border-orange-500/40 transition">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-base">😈</span>
                          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-orange-400">1. For Play (Pure Fun)</h4>
                        </div>
                        <ul className="text-xs text-zinc-300 space-y-1.5 leading-relaxed">
                          <li>• <strong>Roast a buddy&apos;s pitch:</strong> Drop in that friend who calls themselves a &quot;visionary leader&quot; and watch them get humbled.</li>
                          <li>• <strong>Group chat receipts:</strong> Screenshot savage pink slips and ego-checking grades (D-) to share with colleagues.</li>
                        </ul>
                      </div>
                      <div className="mt-3 pt-2 border-t border-orange-500/10 text-[10px] font-bold text-orange-300 uppercase tracking-wider">
                        &rarr; Hilarious watercooler entertainment
                      </div>
                    </div>

                    {/* 2. For Real */}
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 flex flex-col justify-between hover:border-emerald-500/40 transition">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-base">💼</span>
                          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-emerald-400">2. For Real (Career Medicine)</h4>
                        </div>
                        <ul className="text-xs text-zinc-300 space-y-1.5 leading-relaxed">
                          <li>• <strong>The brutal truth:</strong> Recruiters smile, say &quot;great job,&quot; and silently ghost you. Dick tells you what they actually think.</li>
                          <li>• <strong>Kill interview killers:</strong> Eradicate fluffy filler words (&quot;synergy&quot;, &quot;bandwidth&quot;) and build unflappable executive composure.</li>
                        </ul>
                      </div>
                      <div className="mt-3 pt-2 border-t border-emerald-500/10 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                        &rarr; The fastest cure to interview ghosting
                      </div>
                    </div>
                  </div>
                </div>

                {/* HOT SEAT CARD WITH VIRAL EXPANSIONS */}
                <div className="w-full rounded-3xl border-2 border-orange-500/70 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 p-4 sm:p-7 shadow-2xl shadow-orange-500/20 text-left relative overflow-hidden backdrop-blur">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
                      <span className="text-xs sm:text-base font-black tracking-wider uppercase text-white">
                        {challengerInfo ? `Beat ${challengerInfo.name}` : 'Step Up to the Hot Seat'}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-orange-400/90 uppercase tracking-wider bg-orange-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-orange-500/20">
                      {isVipMode ? 'Unlucky 13 VIP Gauntlet' : 'Free 3-Question Roast'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                        <UserX className="h-4 w-4" /> 1. Candidate Name
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. Andy Smith"
                        className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-950 px-3.5 py-3 text-sm sm:text-base font-bold text-white placeholder-zinc-500 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" /> 2. Target Job / Industry
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        placeholder="e.g. Senior Product Manager"
                        className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-950 px-3.5 py-3 text-sm sm:text-base font-bold text-white placeholder-zinc-500 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  {/* VIRAL BONUS EXPANSION */}
                  <div className="mt-3 border-t border-zinc-800/80 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowViralOptions(!showViralOptions)}
                      className="flex items-center justify-between w-full text-xs font-bold text-amber-400/90 hover:text-amber-300 transition py-1"
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                        <span>+ Add LinkedIn Headline Roast &amp; Company Wars (Optional)</span>
                      </span>
                      {showViralOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {showViralOptions && (
                      <div className="mt-3 space-y-3 animate-in fade-in">
                        <div>
                          <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5 text-orange-400" /> Current Company / Employer
                          </label>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. McKinsey, Google, Seed Startup"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-white placeholder-zinc-600 outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> LinkedIn Headline / Bio (Dick will roast it first)
                          </label>
                          <input
                            type="text"
                            value={linkedinBio}
                            onChange={(e) => setLinkedinBio(e.target.value)}
                            placeholder="e.g. Visionary Growth Hacker &amp; Cross-Functional Catalyst"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-white placeholder-zinc-600 outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <button
                      onClick={() => handleStart()}
                      className={cn(
                        'flex w-full items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-black transition-all shadow-xl',
                        isVipMode
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-black shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 hover:scale-[1.01] active:scale-[0.99]'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/30 hover:from-orange-400 hover:to-red-500 hover:scale-[1.01] active:scale-[0.99]'
                      )}
                    >
                      {challengerInfo ? (
                        <>
                          <Swords className="h-5 w-5 text-white" />
                          <span>Accept Challenge (Beat {challengerInfo.score}) &rarr;</span>
                        </>
                      ) : isVipMode ? (
                        <>
                          <Crown className="h-5 w-5 text-black" />
                          <span>Start 13 Questions + Checkpoints &rarr;</span>
                        </>
                      ) : (
                        <>
                          <Flame className="h-5 w-5" />
                          <span>Start Free 3-Question Interview Roast &rarr;</span>
                        </>
                      )}
                    </button>

                    {!isVipMode && (
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-500/80">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>No credit card required</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* LEADERBOARDS & COMPANY WARS */}
                <div className="w-full pt-2 text-left">
                  <div className="flex items-center gap-3 mb-3 border-b border-zinc-800 pb-2 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('fame')}
                      className={cn(
                        'text-xs font-bold uppercase tracking-wider pb-1 transition-all flex items-center gap-1.5 whitespace-nowrap',
                        activeTab === 'fame' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'
                      )}
                    >
                      <Trophy className="h-3.5 w-3.5" /> Hall of Fame (85+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('shame')}
                      className={cn(
                        'text-xs font-bold uppercase tracking-wider pb-1 transition-all flex items-center gap-1.5 whitespace-nowrap',
                        activeTab === 'shame' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-zinc-500 hover:text-zinc-300'
                      )}
                    >
                      <FlameKindling className="h-3.5 w-3.5" /> Wall of Shame (0–30)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('companies')}
                      className={cn(
                        'text-xs font-bold uppercase tracking-wider pb-1 transition-all flex items-center gap-1.5 whitespace-nowrap',
                        activeTab === 'companies' ? 'text-amber-400 border-b-2 border-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                      )}
                    >
                      <Building2 className="h-3.5 w-3.5" /> 🏢 Company Wars
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {activeTab === 'companies' ? (
                      COMPANY_WARS.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col gap-1 text-xs">
                          <div className="flex items-center justify-between text-zinc-400">
                            <span className="font-semibold text-zinc-200">{item.name} <span className="text-[10px] text-zinc-500">({item.players})</span></span>
                            <span className="font-bold px-2 py-0.5 rounded border text-[11px] text-amber-400 bg-amber-500/10 border-amber-500/20">
                              Avg: {item.avgScore}/100
                            </span>
                          </div>
                          <p className="text-zinc-400 italic">&quot;{item.verdict}&quot;</p>
                        </div>
                      ))
                    ) : (
                      (activeTab === 'fame' ? INITIAL_HALL_OF_FAME : wallFeed).map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col gap-1 text-xs">
                          <div className="flex items-center justify-between text-zinc-400">
                            <span className="font-semibold text-zinc-200">
                              {item.name} <span className="font-normal text-zinc-500">for {item.role}</span>
                            </span>
                            <span className={cn(
                              'font-bold px-2 py-0.5 rounded border text-[11px]',
                              activeTab === 'fame' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-orange-400 bg-orange-500/10 border-orange-500/20'
                            )}>
                              Score: {item.score}/100
                            </span>
                          </div>
                          <p className="text-zinc-300 italic">&quot;{item.verdict}&quot;</p>
                          <span className="text-[10px] text-zinc-600">{item.timeAgo}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* PASSCODE ENTRY */}
                <div className="pt-1">
                  {!showVipModal ? (
                    <button
                      type="button"
                      onClick={() => setShowVipModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 transition"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      <span>{isVipMode ? 'VIP Active — Change passcode' : 'Have an access code?'}</span>
                    </button>
                  ) : (
                    <form onSubmit={handleVerifyVipCode} className="mx-auto w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 space-y-2 text-left animate-in fade-in">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-300 flex items-center gap-1">
                          <KeyRound className="h-3.5 w-3.5 text-amber-400" /> Enter Passcode:
                        </span>
                        <button type="button" onClick={() => { setShowVipModal(false); setVipError(''); }} className="text-[11px] text-zinc-500 hover:text-zinc-300">
                          Cancel
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={vipCodeInput}
                          onChange={(e) => setVipCodeInput(e.target.value.toUpperCase())}
                          placeholder="Paste code here"
                          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-mono uppercase text-amber-300 placeholder-zinc-600 outline-none focus:border-amber-500"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={vipLoading || !vipCodeInput.trim()}
                          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-50 transition"
                        >
                          {vipLoading ? 'Checking...' : 'Unlock'}
                        </button>
                      </div>
                      {vipError && <p className="text-[11px] text-red-400">{vipError}</p>}
                    </form>
                  )}
                </div>

                <footer className="w-full py-8 border-t border-zinc-800/80 mt-10 text-center text-xs text-zinc-500 space-y-3">
                  <div className="mb-2">
                    <a href="https://roastmy.me" className="inline-flex items-center gap-1 font-bold text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-widest text-[10px]">
                      <Flame className="h-3.5 w-3.5" /> Part of RoastMy.me
                    </a>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    <span>© 2026 RoastMyInterview.me</span>
                    <a href="/terms" className="hover:text-zinc-300 transition">Terms of Service</a>
                    <a href="/privacy" className="hover:text-zinc-300 transition">Privacy Policy</a>
                    <a href="mailto:support@roastmyinterview.me" className="hover:text-zinc-300 transition">Contact</a>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        ) : (
          /* ACTIVE AUDIT / ROAST FLOW */
          <div className="flex h-screen max-w-full flex-col bg-zinc-950 overflow-x-hidden">
            <header className={cn(
              'flex items-center justify-between border-b px-3 py-2.5 sm:px-6 sm:py-3.5 transition-colors max-w-full overflow-hidden flex-shrink-0',
              autoFailed ? 'border-red-900/50 bg-red-950/20' : 'border-zinc-800 bg-zinc-950'
            )}>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2">
                <a href="https://roastmy.me" title="Back to RoastMy.me Hub" className="mr-1 sm:mr-2 flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </a>
                <div className={cn(
                  'flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl shadow-lg overflow-hidden border border-zinc-700 flex-shrink-0',
                  autoFailed ? 'border-red-500' : 'border-orange-500/50'
                )}>
                  <img src={DICK_AVATAR} alt="Dick Headerson" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h1 style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className="text-xl sm:text-2xl text-orange-400 leading-none mt-0.5 truncate">
                    Dick Headerson
                  </h1>
                  <p className={cn('text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5 truncate', autoFailed ? 'text-red-400' : 'text-zinc-400')}>
                    {isVipMode ? 'Unlucky 13 Gauntlet' : 'Senior Hiring Manager'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <button
                  onClick={toggleVoice}
                  className={cn(
                    "flex items-center gap-1 rounded-lg border px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-medium backdrop-blur transition-all",
                    voiceEnabled ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300" : "border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:text-white"
                  )}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-zinc-500" />}
                  <span className="hidden md:inline">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
                </button>
                <button
                  onClick={handleNativeShare}
                  className="flex items-center gap-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-bold text-orange-300 transition-all hover:bg-orange-500/20"
                >
                  <Swords className="h-4 w-4 text-orange-400" />
                  <span className="hidden sm:inline">Challenge</span>
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto overflow-x-hidden relative max-w-full">
              <div className="relative z-10 mx-auto max-w-2xl space-y-5 px-3 py-4 sm:px-6 sm:py-6 w-full">
                {messages.map((message: any, index: number) => {
                  const text = getMessageText(message);
                  if (!text) return null;
                  const isUser = message.role === 'user';
                  const isLastMessage = index === messages.length - 1;

                  const userDisplayText = isUser && (text.includes('You are Dick Headerson') || text.startsWith('My name is'))
                    ? `Hi Dick, I'm ${userName.trim()}${companyName ? ` from ${companyName.trim()}` : ''} and I'm ready for the ${jobTitle.trim()} interview.`
                    : text;

                  if (!isUser && isInterviewOver && isLastMessage && !isStreaming && parsedScorecard) {
                    return (
                      <div key={message.id || index} className="flex flex-col items-start gap-3.5 w-full">
                        <div className="flex items-center justify-between w-full ml-1">
                          <div className="flex items-center gap-2">
                            <span style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className="text-xl sm:text-2xl text-orange-400">Dick Headerson</span>
                            <span className="text-[10px] sm:text-xs text-zinc-500 mt-1">• Final Evaluation</span>
                          </div>
                        </div>

                        {parsedScorecard.introRoast && (
                          <div className="w-full rounded-2xl rounded-tl-sm bg-zinc-800 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-zinc-100 break-words">
                            <ReactMarkdown>{parsedScorecard.introRoast}</ReactMarkdown>
                          </div>
                        )}

                        {/* SCORECARD CARDS */}
                        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3.5 sm:p-5 shadow-2xl backdrop-blur overflow-hidden">
                          <div className="grid grid-cols-4 gap-1 sm:gap-2 border-b border-zinc-800 pb-3 text-center">
                            {[
                              { title: 'The Autopsy', icon: '💀' },
                              { title: 'Translation', icon: '🗣️' },
                              { title: 'The Fix', icon: '💡' },
                              { title: 'Badge / Story', icon: '🎖️' },
                            ].map((step, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setScorecardStep(idx)}
                                className={cn(
                                  'flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition-all',
                                  scorecardStep === idx ? 'bg-orange-500/10 text-orange-400 font-bold border border-orange-500/30' : 'text-zinc-500 hover:text-zinc-300'
                                )}
                              >
                                <span className="text-sm sm:text-base">{step.icon}</span>
                                <span className="text-[10px] sm:text-xs hidden sm:inline">{step.title}</span>
                                <span className="text-[10px] sm:hidden">{idx + 1}</span>
                              </button>
                            ))}
                          </div>

                          {scorecardStep === 0 && (
                            <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                              <div className="flex items-center justify-between rounded-xl bg-orange-500/10 border border-orange-500/20 px-3.5 py-2">
                                <span className="text-xs sm:text-sm font-semibold text-zinc-300">Verdict: <strong className="text-amber-400">{parsedScorecard.decision}</strong></span>
                                <span className="text-xs sm:text-sm font-black text-orange-400">Score: {parsedScorecard.finalScore}</span>
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                <span>💀</span> The Executive Autopsy
                              </h4>
                              <div className="text-sm sm:text-base leading-relaxed text-zinc-300 prose prose-invert prose-sm sm:prose-base max-w-none break-words">
                                <ReactMarkdown>{parsedScorecard.autopsy || parsedScorecard.raw}</ReactMarkdown>
                              </div>
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={() => setScorecardStep(1)}
                                  className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition"
                                >
                                  Next: What Dick Heard <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {scorecardStep === 1 && (
                            <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                <span>🗣️</span> What You Said vs. What Dick Heard
                              </h4>
                              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 sm:p-4 text-xs sm:text-sm text-zinc-300 leading-relaxed prose prose-invert prose-sm max-w-none break-words">
                                <ReactMarkdown>{parsedScorecard.translation || 'No translation available.'}</ReactMarkdown>
                              </div>
                              <div className="pt-2 flex items-center justify-between">
                                <button onClick={() => setScorecardStep(0)} className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-300">
                                  &larr; Back
                                </button>
                                <button
                                  onClick={() => setScorecardStep(2)}
                                  className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition"
                                >
                                  Next: The Fix <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {scorecardStep === 2 && (
                            <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                <span>🚩</span> Red Flags &amp; <span>💡</span> The Script Doctor
                              </h4>
                              {parsedScorecard.redFlags && (
                                <div className="rounded-xl border border-red-950/50 bg-red-950/20 p-3 sm:p-4 text-xs sm:text-sm text-zinc-300 prose prose-invert prose-sm max-w-none break-words">
                                  <ReactMarkdown>{parsedScorecard.redFlags}</ReactMarkdown>
                                </div>
                              )}
                              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 sm:p-4 text-xs sm:text-sm text-zinc-300 prose prose-invert prose-sm max-w-none break-words">
                                <ReactMarkdown>{parsedScorecard.scriptDoctor || 'Focus on concrete metrics and simple language.'}</ReactMarkdown>
                              </div>
                              <div className="pt-2 flex items-center justify-between">
                                <button onClick={() => setScorecardStep(1)} className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-300">
                                  &larr; Back
                                </button>
                                <button
                                  onClick={() => setScorecardStep(3)}
                                  className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition"
                                >
                                  View Scorecard Badge <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {scorecardStep === 3 && (
                            <div className="mt-4 flex flex-col items-center gap-4 animate-in fade-in duration-300 w-full overflow-hidden">
                              {/* THREE-WAY FORMAT TOGGLE */}
                              <div className="flex flex-wrap items-center justify-center gap-1.5 bg-zinc-800/80 p-1.5 rounded-xl text-xs font-bold w-full max-w-sm">
                                <button
                                  type="button"
                                  onClick={() => setBadgeFormat('badge')}
                                  className={cn("px-2.5 py-1.5 rounded-lg transition text-[11px]", badgeFormat === 'badge' ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white")}
                                >
                                  Scorecard
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setBadgeFormat('story')}
                                  className={cn("flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition text-[11px]", badgeFormat === 'story' ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white")}
                                >
                                  <Smartphone className="h-3 w-3" />
                                  <span>9:16 Pink Slip</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setBadgeFormat('receipts')}
                                  className={cn("px-2.5 py-1.5 rounded-lg transition text-[11px]", badgeFormat === 'receipts' ? "bg-amber-500 text-black font-black" : "text-zinc-400 hover:text-white")}
                                >
                                  1:1 Receipts Meme
                                </button>
                              </div>

                              {/* CERTIFICATE/MEME/STORY RENDER CONTAINER */}
                              <div
                                ref={certificateRef}
                                className={cn(
                                  "relative overflow-hidden rounded-2xl border transition-all text-left",
                                  badgeFormat === 'story'
                                    ? "w-[300px] h-[533px] sm:w-[320px] sm:h-[568px] p-5 flex flex-col justify-between border-red-500/50 bg-gradient-to-b from-zinc-950 via-zinc-900 to-red-950/40 shadow-2xl shadow-red-950/60"
                                    : badgeFormat === 'receipts'
                                      ? "w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] p-4 flex flex-col justify-between border-amber-500/40 bg-zinc-950 shadow-2xl shadow-amber-950/40"
                                      : "w-full max-w-[340px] sm:max-w-sm p-4 sm:p-5 border-orange-500/30 bg-zinc-950 shadow-2xl shadow-orange-950/40"
                                )}
                              >
                                {/* HR PINK SLIP (9:16 STORY) */}
                                {badgeFormat === 'story' && (
                                  <>
                                    <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
                                      <div className="flex items-center gap-1.5">
                                        <FileWarning className="h-4 w-4 text-red-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-red-400">Official HR Citation</span>
                                      </div>
                                      <span className="text-[9px] font-mono text-zinc-500">{new Date().toLocaleDateString()}</span>
                                    </div>

                                    {/* RED TERMINATED WATERMARK STAMP */}
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="border-4 border-red-500/40 text-red-500/40 px-4 py-1 text-3xl sm:text-4xl font-black uppercase tracking-widest -rotate-24 select-none rounded-xl">
                                        TERMINATED
                                      </div>
                                    </div>

                                    <div className="relative z-10 text-center my-auto">
                                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Notice of Rejection Issued To</p>
                                      <h3 className="text-xl font-black text-white mt-0.5">{userName}</h3>
                                      <p className="text-xs text-red-400 font-semibold">{jobTitle} {companyName ? `• ${companyName}` : ''}</p>

                                      <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-center">
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Score &amp; Offense</p>
                                        <p className="text-4xl font-black text-red-400 leading-tight mt-0.5">{parsedScorecard.finalScore}</p>
                                        <p className="text-[10px] font-black uppercase tracking-wider text-red-300 mt-1">
                                          {parsedScorecard.decision}
                                        </p>
                                      </div>

                                      <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-left">
                                        <p className="text-[8px] font-bold uppercase text-zinc-500">Dick&apos;s Autopsy Note:</p>
                                        <p className="text-[10.5px] italic text-zinc-300 mt-0.5 line-clamp-3">
                                          &quot;{parsedScorecard.introRoast || 'Candidate collapsed under simple pressure testing and deployed illegal corporate jargon.'}&quot;
                                        </p>
                                      </div>
                                    </div>

                                    <div className="relative z-10 border-t border-zinc-800 pt-2 flex items-center justify-between text-[9px] text-zinc-500">
                                      <span>roastmyinterview.me</span>
                                      <span className="font-mono text-red-400 font-bold">AUDIT CITATION #RMI-{Math.floor(Math.random() * 90000 + 10000)}</span>
                                    </div>
                                  </>
                                )}

                                {/* 1:1 SQUARE MEME CARD (THE RECEIPTS) */}
                                {badgeFormat === 'receipts' && (
                                  <>
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">The Interview Receipts</span>
                                      <span className="text-[10px] font-black text-orange-400">Score: {parsedScorecard.finalScore}</span>
                                    </div>

                                    <div className="my-auto space-y-2">
                                      <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2.5 text-xs">
                                        <p className="text-[9px] font-bold uppercase text-zinc-400">What You Thought You Said:</p>
                                        <p className="text-xs text-white font-medium mt-0.5 line-clamp-2">
                                          {userName} applying for {jobTitle}: &quot;I drive strategic value and synergize cross-functional stakeholders.&quot;
                                        </p>
                                      </div>

                                      <div className="rounded-lg border border-orange-500/30 bg-orange-950/30 p-2.5 text-xs">
                                        <p className="text-[9px] font-bold uppercase text-orange-400">What Dick Actually Heard:</p>
                                        <p className="text-xs text-zinc-200 italic mt-0.5 line-clamp-3">
                                          &quot;{parsedScorecard.translation ? parsedScorecard.translation.slice(0, 140) + '...' : 'I talk a lot of consultant nonsense because I don’t have actual numbers to back up my resume.'}&quot;
                                        </p>
                                      </div>
                                    </div>

                                    <div className="border-t border-zinc-800 pt-1.5 flex items-center justify-between text-[9px] text-zinc-500">
                                      <span className="font-bold text-white">roastmyinterview.me</span>
                                      <span className="text-orange-400 font-semibold">{parsedScorecard.decision}</span>
                                    </div>
                                  </>
                                )}

                                {/* CLASSIC SCORECARD BADGE */}
                                {badgeFormat === 'badge' && (
                                  <>
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                                      <div className="flex items-center gap-1.5">
                                        <Flame className="h-4 w-4 text-orange-500" />
                                        <span className="text-[11px] font-bold tracking-tight text-white">
                                          RoastMyInterview<span className="text-orange-500">.me</span>
                                        </span>
                                      </div>
                                      <span className="text-[10px] font-mono text-zinc-500">{new Date().toLocaleDateString()}</span>
                                    </div>

                                    <div className="mt-3.5 flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Candidate</p>
                                        <h4 className="text-base font-extrabold text-white leading-tight">{userName}</h4>
                                        <p className="text-xs text-orange-400/90 font-medium">{jobTitle} {companyName ? `• ${companyName}` : ''}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Final Score</p>
                                        <p className="text-xl font-black text-orange-500 leading-tight">
                                          {parsedScorecard.finalScore}
                                        </p>
                                      </div>
                                    </div>

                                    {headToHeadResult && (
                                      <div className={cn(
                                        "mt-3 rounded-lg border px-3 py-1.5 text-center text-xs font-black uppercase tracking-wider",
                                        headToHeadResult.won ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-red-500/40 bg-red-500/10 text-red-300"
                                      )}>
                                        {headToHeadResult.won ? `VICTORY OVER ${headToHeadResult.challengerName.toUpperCase()}` : `CHALLENGED BY ${headToHeadResult.challengerName.toUpperCase()}`}
                                      </div>
                                    )}

                                    <div className="mt-3 rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-1.5 flex items-center justify-between">
                                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Verdict:</span>
                                      <span className="text-xs font-black uppercase tracking-wider text-amber-300 truncate ml-2">
                                        {parsedScorecard.decision}
                                      </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-2 text-[9px] text-zinc-500">
                                      <span className="flex items-center">
                                        Audited by 
                                        <span style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className="text-lg text-orange-500 ml-1.5 -mt-0.5">
                                          Dick Headerson
                                        </span>
                                      </span>
                                      <span className="font-mono text-orange-400 font-semibold text-[8px] sm:text-[9px]">
                                        {isVipMode ? 'UNLUCKY 13' : 'OFFICIAL'}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* SHARE BUTTONS SUITE */}
                              <div className="flex flex-col gap-2.5 w-full max-w-sm">
                                <button
                                  onClick={() => handleWallShare('slack')}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-xs sm:text-sm font-black text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-[0.98]"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span>Drop into Coworker Slack / Teams</span>
                                </button>

                                <button
                                  onClick={() => handleWallShare('linkedin')}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-3 text-xs sm:text-sm font-black text-white shadow-lg shadow-sky-600/25 hover:from-sky-500 hover:to-blue-500 transition-all active:scale-[0.98]"
                                >
                                  <Linkedin className="h-4 w-4 fill-white" />
                                  <span>Post Humble-Roast to LinkedIn</span>
                                </button>

                                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                  <button
                                    onClick={copyBadgeToClipboard}
                                    className="flex items-center justify-center gap-1 rounded-xl bg-orange-500 py-2 sm:py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition"
                                  >
                                    <Copy className="h-3.5 w-3.5" /> <span className="truncate">Badge</span>
                                  </button>
                                  <button
                                    onClick={downloadCertificate}
                                    className="flex items-center justify-center gap-1 rounded-xl border border-zinc-700 bg-zinc-800 py-2 sm:py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition"
                                  >
                                    <Download className="h-3.5 w-3.5" /> <span className="truncate">Save File</span>
                                  </button>
                                  <button
                                    onClick={handleNativeShare}
                                    className="flex items-center justify-center gap-1 rounded-xl border border-amber-500/40 bg-amber-500/10 py-2 sm:py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
                                  >
                                    <Swords className="h-3.5 w-3.5" /> <span className="truncate">Challenge</span>
                                  </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 pt-0.5">
                                  <button onClick={() => handleWallShare('whatsapp')} title="WhatsApp" className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition">
                                    <MessageCircle className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => handleWallShare('facebook')} title="Tag a Coworker on Facebook" className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition">
                                    <Facebook className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => handleWallShare('instagram')} title="Instagram Story Prompt &amp; Caption" className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-pink-400 transition">
                                    <Instagram className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => handleWallShare('twitter')} title="X (Twitter)" className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition">
                                    <Twitter className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => handleWallShare('linkedin')} title="LinkedIn" className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-sky-400 transition">
                                    <Linkedin className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-xs">
                                  <button onClick={() => setScorecardStep(2)} className="text-zinc-500 hover:text-zinc-300">
                                    &larr; Review Fix
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={message.id || index} className={cn('flex flex-col w-full', isUser ? 'items-end' : 'items-start')}>
                      {!isUser ? (
                        <div className="flex items-center gap-2 mb-1 ml-11 sm:ml-14">
                          <span style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }} className={cn('text-lg sm:text-xl', autoFailed ? 'text-red-400' : 'text-orange-400')}>
                            Dick Headerson
                          </span>
                          <button
                            type="button"
                            onClick={() => speakText(text)}
                            title="Replay audio"
                            className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 hover:border-orange-500/40 hover:text-orange-300 transition-all active:scale-95"
                          >
                            <Volume2 className="h-3 w-3 text-orange-400" />
                            <span>Replay</span>
                          </button>
                        </div>
                      ) : (
                        <span className="mb-1 mr-2 text-xs font-semibold text-zinc-400">{userName || 'You'}</span>
                      )}

                      <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
                        {!isUser && (
                          <div className={cn(
                            'mr-2.5 mt-0.5 flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-lg overflow-hidden border border-zinc-700',
                            autoFailed ? 'border-red-500' : 'border-orange-500/50'
                          )}>
                            <img src={DICK_AVATAR} alt="Dick" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div
                          className={cn(
                            'max-w-[85%] sm:max-w-[82%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm leading-relaxed break-words overflow-hidden',
                            isUser
                              ? isVipMode ? 'rounded-br-md bg-amber-500 text-black font-medium' : 'rounded-br-md bg-orange-500 text-white font-medium'
                              : autoFailed && message.id === messages[messages.length - 1].id
                                ? 'rounded-bl-md bg-red-950/80 border border-red-900 text-red-50'
                                : 'rounded-bl-md bg-zinc-800 text-zinc-100'
                          )}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{userDisplayText}</p>
                          ) : (
                            <div className={cn(
                              'prose prose-sm max-w-none break-words overflow-hidden prose-p:my-1 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:mb-1.5 prose-headings:mt-2.5 prose-strong:text-white',
                              autoFailed && message.id === messages[messages.length - 1].id
                                ? 'prose-invert prose-h2:text-red-400 prose-h3:text-red-400 prose-strong:text-red-200'
                                : 'prose-invert prose-h2:text-sm prose-h2:text-orange-400'
                            )}>
                              <ReactMarkdown>{text}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isStreaming && !autoFailed && (
                  <div className="flex justify-start">
                    <div className="mr-2.5 mt-0.5 flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl border border-orange-500/50 shadow-lg overflow-hidden">
                      <img src={DICK_AVATAR} alt="Dick" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-zinc-800 px-3.5 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </main>

            {!isInterviewOver && (
              <div className="border-t border-zinc-800 bg-zinc-950 p-2.5 sm:p-4 w-full max-w-full flex-shrink-0">
                <div className="mx-auto max-w-2xl w-full">
                  <form onSubmit={handleSubmit} className="relative flex w-full items-end gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/50 p-1.5 pl-3 sm:pl-4 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      disabled={isStreaming}
                      onKeyDown={handleKeyDown}
                      placeholder={isStreaming ? 'Dick is typing...' : 'Defend your resume or type your answer...'}
                      className="max-h-28 min-h-[40px] sm:min-h-[44px] flex-1 min-w-0 resize-none self-center bg-transparent py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-zinc-500 outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isStreaming}
                      className={cn(
                        "flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
                        isVipMode ? "bg-gradient-to-br from-amber-500 to-orange-600 text-black" : "bg-gradient-to-br from-orange-500 to-red-600 text-white"
                      )}
                    >
                      <Flame className="h-5 w-5" />
                    </button>
                  </form>
                  <p className="mt-1.5 text-center text-[10px] text-zinc-600">
                    Press Enter to send, Shift+Enter for new line. Speak with real numbers and metrics.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
