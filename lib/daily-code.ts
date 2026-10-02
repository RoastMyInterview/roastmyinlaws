// Deterministic daily rotating VIP code for RoastMyInterview
export function getTodayDateEST(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date()); // Returns YYYY-MM-DD in EST
}

export function getDailyCode(dateStr: string = getTodayDateEST()): string {
  const salt = process.env.DAILY_CODE_SALT || 'dick-headerson-secret-salt-99';
  const seedStr = `${dateStr}-${salt}`;

  // Universal hash that runs safely on Edge, Node, and browser
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const words = [
    'HARDPASS',
    'HEADERSON',
    'ROASTED',
    'FIRED',
    'GAUNTLET',
    'SYNERGY',
    'VIPACCESS',
    'REJECTED',
    'AUTOFAIL',
    'ENDURANCE',
  ];

  const word = words[positiveHash % words.length];
  const num = (positiveHash % 900) + 100; // 3-digit number between 100 and 999

  return `${word}-${num}`;
}

export function isValidDailyCode(code: string): boolean {
  if (!code) return false;
  return code.trim().toUpperCase() === getDailyCode();
}
