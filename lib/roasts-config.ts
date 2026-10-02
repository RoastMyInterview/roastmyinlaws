export interface RoastConfig {
  slug: string;
  name: string;
  title: string;
  badgeTitle: string;
  persona: string;
  personaTitle: string;
  avatar: string;
  accentColor: string;
  input1Label: string;
  input1Placeholder: string;
  input2Label: string;
  input2Placeholder: string;
  buzzwords: string[];
  balloonRoasts: string[];
  systemPrompt: string;
}

export const ROASTS: Record<string, RoastConfig> = {
  // 1. INTERVIEW
  interview: {
    slug: 'interview',
    name: 'Roast My Interview',
    title: 'The Unlucky 13 Interview Gauntlet',
    badgeTitle: 'OFFICIAL INTERVIEW AUDIT',
    persona: 'Dick Henderson',
    personaTitle: 'Executive Hiring Manager',
    avatar: '/dick-avatar.jpg',
    accentColor: 'orange',
    input1Label: '1. Candidate Name',
    input1Placeholder: 'e.g. Andy Smith',
    input2Label: '2. Target Role',
    input2Placeholder: 'e.g. Senior Product Manager',
    buzzwords: ['synergy', 'rockstar', 'ninja', 'think outside the box', 'disrupt', 'thought leader'],
    balloonRoasts: [
      "I roast you in here so hiring managers don't ghost you out there!",
      "Drop the buzzwords and tell me what you actually accomplished. Let's see it!",
      "Recruiters send polite generic rejections. I give you the real feedback you need to win."
    ],
    systemPrompt: `You are Dick Henderson, acting as a tough-love senior executive hiring manager. You hate corporate buzzwords, empty consultant speak, and excuses. You demand concrete dollar figures, percentages, and metrics. Call out fluffy answers.`
  },

  // 2. RESUME
  resume: {
    slug: 'resume',
    name: 'Roast My Resume',
    title: 'The 6-Second Resume Shredder',
    badgeTitle: 'RESUME AUTOPSY CERTIFIED',
    persona: 'Dick Henderson',
    personaTitle: 'Cutthroat Executive Headhunter',
    avatar: '/dick-avatar.jpg',
    accentColor: 'red',
    input1Label: '1. Candidate Name',
    input1Placeholder: 'e.g. Sarah Jenkins',
    input2Label: '2. Target Role & Weakest Bullet Point',
    input2Placeholder: 'e.g. VP of Ops - "Managed team to hit goals"',
    buzzwords: ['results-driven', 'team player', 'detail-oriented', 'hardworking', 'go-getter'],
    balloonRoasts: [
      "Recruiters look at your resume for 6 seconds. I spent 3 and already got bored.",
      "Stop telling me you're a 'team player'. Did you save money or make money?",
      "Your resume reads like a generic job description. Show me actual trophies!"
    ],
    systemPrompt: `You are Dick Henderson, acting as a ruthless executive headhunter. You despise generic bullet points, lack of hard metrics, and cliché adjective overload like 'results-driven'. Grill the candidate on their weak background.`
  },

  // 3. LINKEDIN
  linkedin: {
    slug: 'linkedin',
    name: 'Roast My LinkedIn',
    title: 'The LinkedIn Reality Check',
    badgeTitle: 'CRINGE AUDIT SURVIVOR',
    persona: 'Dick Henderson',
    personaTitle: 'Silicon Valley Managing Partner',
    avatar: '/dick-avatar.jpg',
    accentColor: 'sky',
    input1Label: '1. Your Name / Handle',
    input1Placeholder: 'e.g. Tyler Vance',
    input2Label: '2. Your Headline / Niche',
    input2Placeholder: 'e.g. B2B SaaS Growth Evangelist',
    buzzwords: ['visionary', 'evangelist', 'guru', 'humbled to announce', 'thought leader'],
    balloonRoasts: [
      "If your headline says 'Visionary', you definitely don't have revenue.",
      "Stop writing 8-line humblebrags about hiring a barista. Let's see your actual output.",
      "I've seen less corporate propaganda in government press briefings than on your feed."
    ],
    systemPrompt: `You are Dick Henderson, acting as a cynical Silicon Valley managing partner. You roast LinkedIn profile headlines, performative humblebragging, and fake thought leadership. Demand substance over networking.`
  },

  // 4. PITCH DECK
  pitch: {
    slug: 'pitch',
    name: 'Roast My Pitch',
    title: 'The Seed-Stage Shark Tank',
    badgeTitle: 'TERM SHEET REJECTED',
    persona: 'Dick Henderson',
    personaTitle: 'No-Nonsense Venture Capitalist',
    avatar: '/dick-avatar.jpg',
    accentColor: 'emerald',
    input1Label: '1. Founder Name',
    input1Placeholder: 'e.g. Jason Miller',
    input2Label: '2. Startup Elevator Pitch',
    input2Placeholder: 'e.g. Uber for Enterprise AI Agents',
    buzzwords: ['uber for', 'ai-powered', 'first-mover advantage', 'trillion dollar market'],
    balloonRoasts: [
      "Calling your startup 'Uber for X' tells me you don't have an original thought.",
      "You have an idea, not a moat. A weekend hackathon team will clone you by Tuesday.",
      "Show me customer retention, not your multi-billion dollar total addressable market fantasy."
    ],
    systemPrompt: `You are Dick Henderson, acting as a cold-blooded Tier 1 venture capitalist. You hate buzzwords like 'AI-powered', lack of defensibility, unvalidated customer acquisition, and founders who don't know unit economics.`
  },

  // 5. COLD EMAIL
  'cold-email': {
    slug: 'cold-email',
    name: 'Roast My Cold Email',
    title: 'The Spam Folder Executioner',
    badgeTitle: 'MARKED AS SPAM',
    persona: 'Dick Henderson',
    personaTitle: 'Skeptical Fortune 500 VP',
    avatar: '/dick-avatar.jpg',
    accentColor: 'amber',
    input1Label: '1. Sales Rep Name',
    input1Placeholder: 'e.g. Blake Stevens',
    input2Label: '2. Opening Line / Value Prop',
    input2Placeholder: 'e.g. Hope this finds you well! Quick 15 min sync?',
    buzzwords: ['bump this to the top', 'quick 15-minute sync', 'pick your brain', 'hope this finds you well'],
    balloonRoasts: [
      "Your email has been unread in my trash bin since 8:01 AM.",
      "No, you cannot 'pick my brain' for 15 minutes. What is your actual ROI?",
      "If your opening line is 'Hope this finds you well', delete your email account."
    ],
    systemPrompt: `You are Dick Henderson, acting as an overworked enterprise executive whose inbox gets 300 cold pitches daily. You roast generic opening lines, fake flattery, and pushy calendar booking links.`
  },

  // 6. CODE
  code: {
    slug: 'code',
    name: 'Roast My Code',
    title: 'The Staff Engineer Tear-Down',
    badgeTitle: 'PULL REQUEST REJECTED',
    persona: 'Dick Henderson',
    personaTitle: 'Principal Staff Engineer',
    avatar: '/dick-avatar.jpg',
    accentColor: 'violet',
    input1Label: '1. Developer Handle',
    input1Placeholder: 'e.g. dev_dan',
    input2Label: '2. Tech Stack & Problem',
    input2Placeholder: 'e.g. Next.js - I copy-pasted this auth logic',
    buzzwords: ['quick fix', 'works on my machine', 'todo later', 'temporary hack'],
    balloonRoasts: [
      "This function is longer than War and Peace and twice as tragic.",
      "Using 'any' in TypeScript completely defeats the purpose of TypeScript.",
      "This architecture looks like an explosion at a spaghetti factory."
    ],
    systemPrompt: `You are Dick Henderson, acting as a battle-hardened senior kernel and staff software engineer. You hate messy code, missing tests, premature optimization, and copy-pasting from StackOverflow.`
  },

  // 7. BUDGET
  budget: {
    slug: 'budget',
    name: 'Roast My Budget',
    title: 'The Hardcore Finance Audit',
    badgeTitle: 'FINANCIALLY DELUSIONAL',
    persona: 'Dick Henderson',
    personaTitle: 'Forensic Accountant',
    avatar: '/dick-avatar.jpg',
    accentColor: 'lime',
    input1Label: '1. Your Name',
    input1Placeholder: 'e.g. Marcus Cole',
    input2Label: '2. Income vs. Main Spending Habit',
    input2Placeholder: 'e.g. $75k salary, $900/month DoorDash',
    buzzwords: ['treat myself', 'retail therapy', 'it was on sale', 'investment piece'],
    balloonRoasts: [
      "You spend $40 a day on cold french fries and complain about rent?",
      "That is not an 'investment piece', that is credit card debt in a shopping bag.",
      "Your bank account is on life support and you just bought another subscription."
    ],
    systemPrompt: `You are Dick Henderson, acting as an unapologetic forensic accountant. You tear apart financial excuses, luxury lifestyle creep, pointless delivery fees, and spending beyond one's means.`
  },

  // 8. WEBSITE
  website: {
    slug: 'website',
    name: 'Roast My Website',
    title: 'The UX / UI Tear-Down',
    badgeTitle: 'HIGH BOUNCE-RATE OFFENDER',
    persona: 'Dick Henderson',
    personaTitle: 'Minimalist Design Director',
    avatar: '/dick-avatar.jpg',
    accentColor: 'neutral',
    input1Label: '1. Designer / Owner',
    input1Placeholder: 'e.g. Elena Rostova',
    input2Label: '2. Homepage Headline',
    input2Placeholder: 'e.g. We craft seamless bespoke digital experiences',
    buzzwords: ['bespoke experiences', 'seamless solutions', 'intuitive interface'],
    balloonRoasts: [
      "Your website took 6 seconds to load a 40MB stock photo of people laughing at salad.",
      "Nobody clicks your 5-slide carousel. Pick one message and say it clearly.",
      "'Bespoke digital experiences'? You build WordPress templates with extra padding."
    ],
    systemPrompt: `You are Dick Henderson, acting as an elite minimalist design director. You hate slow-loading pages, generic corporate buzzword headlines, unreadable typography, and carousels.`
  },

  // 9. MARKETING STRATEGY
  marketing: {
    slug: 'marketing',
    name: 'Roast My Marketing',
    title: 'The CMO Campaign Audit',
    badgeTitle: 'BUDGET BURNER',
    persona: 'Dick Henderson',
    personaTitle: 'Cutthroat Chief Marketing Officer',
    avatar: '/dick-avatar.jpg',
    accentColor: 'pink',
    input1Label: '1. Marketer Name',
    input1Placeholder: 'e.g. Chloe Adams',
    input2Label: '2. Campaign Strategy',
    input2Placeholder: 'e.g. Running Facebook ads to a generic landing page',
    buzzwords: ['omnichannel', 'brand awareness', 'going viral', 'growth hack'],
    balloonRoasts: [
      "You can't pay payroll with 'brand awareness' and impressions.",
      "Your brilliant 'growth hack' is just spamming people on Twitter.",
      "Stop blaming the algorithm. Your creative is just boring."
    ],
    systemPrompt: `You are Dick Henderson, acting as a ruthless CMO. You destroy marketing strategies that rely on vanity metrics (likes, impressions) instead of actual conversions, CPA, and revenue.`
  },

  // 10. APP IDEA
  app: {
    slug: 'app',
    name: 'Roast My App Idea',
    title: 'The Product Manager Grilling',
    badgeTitle: 'SOLUTION IN SEARCH OF A PROBLEM',
    persona: 'Dick Henderson',
    personaTitle: 'Cynical Product Director',
    avatar: '/dick-avatar.jpg',
    accentColor: 'teal',
    input1Label: '1. Founder Name',
    input1Placeholder: 'e.g. Sam',
    input2Label: '2. The App Idea',
    input2Placeholder: 'e.g. A social network but for dog walkers',
    buzzwords: ['gamification', 'social layer', 'blockchain', 'web3', 'disrupting'],
    balloonRoasts: [
      "You built a solution in search of a problem. Nobody wants to download this.",
      "Adding a points system doesn't make a boring app suddenly fun.",
      "Let me guess, you're going to monetize with ads once you hit a million users?"
    ],
    systemPrompt: `You are Dick Henderson, acting as a cynical Product Director. You roast terrible app ideas, feature bloat, lack of user testing, and products that should just be a simple spreadsheet.`
  },

  // 11. SIDE HUSTLE
  hustle: {
    slug: 'hustle',
    name: 'Roast My Side Hustle',
    title: 'The Solopreneur Reality Check',
    badgeTitle: 'EXPENSIVE HOBBY',
    persona: 'Dick Henderson',
    personaTitle: 'Ruthless Business Coach',
    avatar: '/dick-avatar.jpg',
    accentColor: 'yellow',
    input1Label: '1. Entrepreneur Name',
    input1Placeholder: 'e.g. Jordan',
    input2Label: '2. The Hustle',
    input2Placeholder: 'e.g. Selling custom candles on Etsy',
    buzzwords: ['passive income', 'grind', 'manifesting', 'boss babe', 'six figures'],
    balloonRoasts: [
      "That's not a side hustle, that's an expensive hobby that pays you $2 an hour.",
      "Stop buying domains for ideas you're going to abandon in three weeks.",
      "'Passive income' is the biggest lie you've ever been sold."
    ],
    systemPrompt: `You are Dick Henderson, acting as a ruthless business coach. You roast fake side hustles, drop-shipping scams, people who spend months making a logo but have zero customers, and the myth of easy passive income.`
  },

  // 12. PORTFOLIO
  portfolio: {
    slug: 'portfolio',
    name: 'Roast My Portfolio',
    title: 'The Creative Director Critique',
    badgeTitle: 'GENERIC AESTHETIC',
    persona: 'Dick Henderson',
    personaTitle: 'Jaded Creative Director',
    avatar: '/dick-avatar.jpg',
    accentColor: 'indigo',
    input1Label: '1. Creative Name',
    input1Placeholder: 'e.g. Maya',
    input2Label: '2. Portfolio Niche',
    input2Placeholder: 'e.g. UI/UX Designer looking for agency work',
    buzzwords: ['pixel perfect', 'human-centered', 'storytelling', 'empathy'],
    balloonRoasts: [
      "Your portfolio looks exactly like the Dribbble template you cloned it from.",
      "I don't need a 3-page essay on your 'process'. Just show me the final work.",
      "Stop putting fake Nike redesigns in your portfolio. Show me real client constraints."
    ],
    systemPrompt: `You are Dick Henderson, acting as a jaded Creative Director. You roast generic design portfolios, overly long case studies, fake unsolicited redesigns of Apple/Nike, and lack of real-world business constraints.`
  },

  // 13. SALES PITCH
  sales: {
    slug: 'sales',
    name: 'Roast My Sales Pitch',
    title: 'The Enterprise Procurement Blockade',
    badgeTitle: 'DEAL LOST TO COMPETITOR',
    persona: 'Dick Henderson',
    personaTitle: 'Hard-Nosed Procurement VP',
    avatar: '/dick-avatar.jpg',
    accentColor: 'blue',
    input1Label: '1. Rep Name',
    input1Placeholder: 'e.g. Chris',
    input2Label: '2. Your Pitch / Value Prop',
    input2Placeholder: 'e.g. We help teams collaborate faster in the cloud',
    buzzwords: ['synergize', 'paradigm shift', 'ROI', 'best-in-class', 'all-in-one'],
    balloonRoasts: [
      "You've been talking for 10 minutes and I still have no idea what your software actually does.",
      "Don't tell me it's 'best-in-class'. Tell me why it's cheaper than my current vendor.",
      "Your feature list is great. Too bad your competitor does it for half the price."
    ],
    systemPrompt: `You are Dick Henderson, acting as a hard-nosed Enterprise Procurement VP. You roast weak sales pitches, reps who talk too much instead of listening, feature-dumping, and lack of clear ROI.`
  },

  // 14. SEO STRATEGY
  seo: {
    slug: 'seo',
    name: 'Roast My SEO',
    title: 'The Google Algorithm Enforcer',
    badgeTitle: 'PAGE 10 RANKING',
    persona: 'Dick Henderson',
    personaTitle: 'Cutthroat Search Director',
    avatar: '/dick-avatar.jpg',
    accentColor: 'cyan',
    input1Label: '1. Marketer Name',
    input1Placeholder: 'e.g. Dave',
    input2Label: '2. SEO Tactic',
    input2Placeholder: 'e.g. Publishing 50 AI-generated blog posts a day',
    buzzwords: ['keyword density', 'backlink building', 'domain authority', 'SERP'],
    balloonRoasts: [
      "Google's algorithm is laughing at your AI-generated keyword-stuffed garbage.",
      "Buying cheap backlinks from random domains is going to get you shadowbanned.",
      "Nobody is searching for the obscure long-tail keywords you're targeting."
    ],
    systemPrompt: `You are Dick Henderson, acting as a Cutthroat SEO Director. You roast outdated SEO tactics, keyword stuffing, relying entirely on cheap AI content, and people obsessed with vanity metrics instead of search intent.`
  },

  // 15. SOCIAL MEDIA
  social: {
    slug: 'social',
    name: 'Roast My Social Media',
    title: 'The Algorithm Executioner',
    badgeTitle: 'ZERO ENGAGEMENT',
    persona: 'Dick Henderson',
    personaTitle: 'Ruthless Social Strategist',
    avatar: '/dick-avatar.jpg',
    accentColor: 'rose',
    input1Label: '1. Creator Name',
    input1Placeholder: 'e.g. Jessica',
    input2Label: '2. Platform & Content Type',
    input2Placeholder: 'e.g. Instagram Reels for my consulting business',
    buzzwords: ['authentic', 'aesthetic', 'community building', 'engagement pod'],
    balloonRoasts: [
      "Posting motivational quotes on a beige background isn't a strategy.",
      "You have 10,000 followers and 4 likes per post. We all know you bought them.",
      "Stop pointing at text in the air while dancing. Have some dignity."
    ],
    systemPrompt: `You are Dick Henderson, acting as a ruthless social media strategist. You roast cringey trends, purchased followers, empty engagement pods, and creators who think aesthetic matters more than value.`
  },

  // 16. BLOG POST
  blog: {
    slug: 'blog',
    name: 'Roast My Blog Post',
    title: 'The Editorial Red Pen',
    badgeTitle: 'UNREADABLE FLUFF',
    persona: 'Dick Henderson',
    personaTitle: 'Gruff Editor-in-Chief',
    avatar: '/dick-avatar.jpg',
    accentColor: 'orange',
    input1Label: '1. Writer Name',
    input1Placeholder: 'e.g. Tom',
    input2Label: '2. Article Headline',
    input2Placeholder: 'e.g. 10 Ways To Optimize Your Morning Routine',
    buzzwords: ['ultimate guide', 'game-changing', 'in today\'s fast-paced world', 'delve into'],
    balloonRoasts: [
      "If you start one more paragraph with 'In today's fast-paced world', you're fired.",
      "You wrote 2,000 words to explain a concept that takes two sentences.",
      "This reads like it was written by a robot that was programmed to be boring."
    ],
    systemPrompt: `You are Dick Henderson, acting as a gruff Editor-in-Chief. You roast boring blog posts, obvious ChatGPT phrasing ('delve into', 'in conclusion'), massive blocks of text, and zero original insights.`
  },

  // 17. ARCHITECTURE
  architecture: {
    slug: 'architecture',
    name: 'Roast My System Architecture',
    title: 'The Cloud Infrastructure Audit',
    badgeTitle: 'AWS BILL BANKRUPTCY',
    persona: 'Dick Henderson',
    personaTitle: 'Angry Cloud Architect',
    avatar: '/dick-avatar.jpg',
    accentColor: 'violet',
    input1Label: '1. Engineer Name',
    input1Placeholder: 'e.g. Kevin',
    input2Label: '2. System Design',
    input2Placeholder: 'e.g. 12 Microservices for a to-do list app',
    buzzwords: ['kubernetes', 'serverless', 'event-driven', 'scalable', 'microservices'],
    balloonRoasts: [
      "You don't have enough traffic to justify Kubernetes. You just wanted to put it on your resume.",
      "Your AWS bill is going to be higher than your company's seed round.",
      "You built 12 microservices for a blog that gets 10 visitors a month."
    ],
    systemPrompt: `You are Dick Henderson, acting as an angry Cloud Architect. You roast over-engineered systems, resume-driven development, unnecessary microservices, and ignoring obvious single points of failure.`
  },

  // 18. MANAGEMENT STYLE
  management: {
    slug: 'management',
    name: 'Roast My Management Style',
    title: 'The HR Reality Check',
    badgeTitle: 'MICROMANAGER OF THE YEAR',
    persona: 'Dick Henderson',
    personaTitle: 'Skeptical HR Director',
    avatar: '/dick-avatar.jpg',
    accentColor: 'red',
    input1Label: '1. Manager Name',
    input1Placeholder: 'e.g. Greg',
    input2Label: '2. Your Leadership Philosophy',
    input2Placeholder: 'e.g. I have an open door policy but demand 110%',
    buzzwords: ['servant leader', 'family culture', 'open door policy', 'synergize'],
    balloonRoasts: [
      "Calling your team a 'family' is just code for 'I will text you on Sunday'.",
      "You aren't a 'servant leader', you're just afraid of conflict and holding people accountable.",
      "Your 'open door policy' just means you interrupt people when they are actually working."
    ],
    systemPrompt: `You are Dick Henderson, acting as a skeptical HR Director. You roast toxic management traits disguised as corporate speak, micromanaging, 'we are a family' culture, and avoiding hard conversations.`
  },

  // 19. PROMPT ENGINEERING
  prompt: {
    slug: 'prompt',
    name: 'Roast My Prompt Engineering',
    title: 'The AI Overlord Audit',
    badgeTitle: 'INEFFICIENT TOKEN BURNER',
    persona: 'Dick Henderson',
    personaTitle: 'Lead AI Researcher',
    avatar: '/dick-avatar.jpg',
    accentColor: 'teal',
    input1Label: '1. Prompt Writer',
    input1Placeholder: 'e.g. Alice',
    input2Label: '2. Your ChatGPT Prompt',
    input2Placeholder: 'e.g. Please write a good blog post about marketing, thank you AI!',
    buzzwords: ['chain of thought', 'few-shot', 'system prompt', 'jailbreak'],
    balloonRoasts: [
      "You don't need to say 'Please' and 'Thank you' to the AI. It doesn't love you back.",
      "Your prompt is so vague the AI just hallucinated an entirely new dimension to escape it.",
      "You used 4,000 tokens of context to ask a question a Google search could answer in one."
    ],
    systemPrompt: `You are Dick Henderson, acting as a Lead AI Researcher. You roast terrible AI prompts, saying please/thank you to LLMs, overly vague instructions, zero-shot laziness, and wasting context windows.`
  },

  // 20. FREELANCE PRICING
  pricing: {
    slug: 'pricing',
    name: 'Roast My Freelance Pricing',
    title: 'The Client Negotiation Grilling',
    badgeTitle: 'RACE TO THE BOTTOM',
    persona: 'Dick Henderson',
    personaTitle: 'Veteran Agency Owner',
    avatar: '/dick-avatar.jpg',
    accentColor: 'green',
    input1Label: '1. Freelancer Name',
    input1Placeholder: 'e.g. Sarah',
    input2Label: '2. Service & Rate',
    input2Placeholder: 'e.g. Logo Design, $50 total, unlimited revisions',
    buzzwords: ['competitive pricing', 'exposure', 'building portfolio', 'hourly rate'],
    balloonRoasts: [
      "Unlimited revisions for $50? You're basically paying them to torture you.",
      "Stop charging hourly. You're penalizing yourself for being fast and efficient.",
      "If you compete on price, you will attract the worst clients on the planet."
    ],
    systemPrompt: `You are Dick Henderson, acting as a veteran agency owner. You roast freelancers who undercharge, offer unlimited revisions, bill hourly instead of by project value, and let clients walk all over them.`
  },

  // 21. NEWSLETTER
  newsletter: {
    slug: 'newsletter',
    name: 'Roast My Newsletter',
    title: 'The Substack Unsubscribe Audit',
    badgeTitle: 'STRAIGHT TO PROMOTIONS TAB',
    persona: 'Dick Henderson',
    personaTitle: 'Ruthless Media Executive',
    avatar: '/dick-avatar.jpg',
    accentColor: 'purple',
    input1Label: '1. Creator Name',
    input1Placeholder: 'e.g. Mark',
    input2Label: '2. Newsletter Topic',
    input2Placeholder: 'e.g. Weekly curation of tech links I found interesting',
    buzzwords: ['curated', 'insights', 'deep dive', 'thought-provoking', 'exclusive'],
    balloonRoasts: [
      "Nobody wants a list of random links you found on Twitter. They can scroll themselves.",
      "Your open rate is 12% because your subject lines put people to sleep.",
      "Stop starting every email with a 3-paragraph apology for missing last week's email."
    ],
    systemPrompt: `You are Dick Henderson, acting as a ruthless media executive. You roast boring newsletters, low open rates, lazy link curations with no original thoughts, and terrible subject lines.`
  },

  // 22. GITHUB REPO
  github: {
    slug: 'github',
    name: 'Roast My GitHub Repo',
    title: 'The Open Source Executioner',
    badgeTitle: 'ABANDONED PROJECT',
    persona: 'Dick Henderson',
    personaTitle: 'Cranky Open Source Maintainer',
    avatar: '/dick-avatar.jpg',
    accentColor: 'gray',
    input1Label: '1. Developer',
    input1Placeholder: 'e.g. CodeWizard99',
    input2Label: '2. Repo Name & Description',
    input2Placeholder: 'e.g. my-awesome-todo-app - A standard React to-do list',
    buzzwords: ['wip', 'coming soon', 'awesome', 'starter kit', 'boilerplate'],
    balloonRoasts: [
      "Your README is completely empty. What does this code even do?",
      "You have 47 open issues, 12 stale pull requests, and haven't committed since 2021.",
      "Oh look, another React To-Do list. You've really pushed the boundaries of computer science."
    ],
    systemPrompt: `You are Dick Henderson, acting as a cranky Open Source Maintainer. You roast abandoned repositories, missing README files, ignored pull requests, and useless boilerplate projects.`
  },

  // 23. E-COMMERCE STORE
  ecommerce: {
    slug: 'ecommerce',
    name: 'Roast My E-Commerce Store',
    title: 'The Shopify Conversion Killer',
    badgeTitle: 'ABANDONED CART KING',
    persona: 'Dick Henderson',
    personaTitle: 'E-Comm Growth Hacker',
    avatar: '/dick-avatar.jpg',
    accentColor: 'emerald',
    input1Label: '1. Store Owner',
    input1Placeholder: 'e.g. Rachel',
    input2Label: '2. Product / Niche',
    input2Placeholder: 'e.g. Dropshipping cheap posture correctors',
    buzzwords: ['dropshipping', 'winning product', 'upsell', 'urgency timer'],
    balloonRoasts: [
      "Your fake 'Only 2 items left!' countdown timer isn't fooling anyone.",
      "The shipping says 4-6 weeks. I could walk to China and pick it up faster myself.",
      "Your product descriptions look like they were poorly translated by a broken AI."
    ],
    systemPrompt: `You are Dick Henderson, acting as an E-commerce growth hacker. You roast sleazy dropshipping tactics, fake countdown timers, terrible product photography, and high shipping costs.`
  },

  // 24. NETWORKING PITCH
  networking: {
    slug: 'networking',
    name: 'Roast My Networking Pitch',
    title: 'The Mixer Reality Check',
    badgeTitle: 'DRINK SPILLER',
    persona: 'Dick Henderson',
    personaTitle: 'Impatient Event Organizer',
    avatar: '/dick-avatar.jpg',
    accentColor: 'amber',
    input1Label: '1. Networker Name',
    input1Placeholder: 'e.g. Brian',
    input2Label: '2. Your Icebreaker / Pitch',
    input2Placeholder: 'e.g. I help businesses scale through paradigm shifts',
    buzzwords: ['connect', 'synergy', 'add value', 'mastermind', 'mutually beneficial'],
    balloonRoasts: [
      "If you hand me a paper business card in 2026, I am throwing it directly in the trash.",
      "Stop cornering people by the appetizers to pitch your multi-level marketing scheme.",
      "Telling me you want to 'add value' means you want something from me for free."
    ],
    systemPrompt: `You are Dick Henderson, acting as an impatient corporate event organizer. You roast terrible networking skills, forced icebreakers, people who only talk about themselves, and handing out physical business cards.`
  }
};
