import { NextResponse } from 'next/server';

// This must be the exact same math formula used in the email script!
function getCodeForDate(d: Date): string {
  const dateStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveNum = (Math.abs(hash) % 9000) + 1000;
  return `VIP-${positiveNum}`;
}

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, message: 'Invalid passcode entered.' },
        { status: 400 }
      );
    }

    const cleanInput = code.trim().toUpperCase();

    // CHECK MULTIPLE DAYS (Fixes the UTC Timezone Bug)
    const today = new Date();
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const validCodes = [
      getCodeForDate(today),
      getCodeForDate(yesterday),
      getCodeForDate(tomorrow)
    ];

    // If what they typed matches the generated code for today, yesterday, or tomorrow, let them in!
    if (validCodes.includes(cleanInput)) {
      return NextResponse.json({ valid: true });
    }

    return NextResponse.json(
      { valid: false, message: 'Invalid passcode for today.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: 'Error checking passcode. Please try again.' },
      { status: 500 }
    );
  }
}
