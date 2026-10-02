import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const authHeader = req.headers.get('authorization');
    const userAgent = req.headers.get('user-agent') || '';
    const cronSchedule = req.headers.get('x-vercel-cron-schedule');
    const testKey = url.searchParams.get('key');
    const cronSecret = process.env.CRON_SECRET;

    const isVercelCron = userAgent.includes('vercel-cron') || Boolean(cronSchedule);
    const isBearerValid = Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
    const isManualTest = testKey === 'VIP-BOSS';

    if (!isVercelCron && !isBearerValid && !isManualTest) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bot or external ping blocked.' },
        { status: 401 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY is missing in Vercel Environment Variables' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const today = new Date();
    const code = getCodeForDate(today);
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, error: 'ADMIN_EMAIL is missing in Vercel Environment Variables' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `RoastMyInlaws <${fromEmail}>`,
      to: [adminEmail],
      subject: `🔥 Today's Dick Headerson VIP Passcode: ${code}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dick Headerson's Daily VIP Code</h2>
          <p>Here is today's daily passcode to unlock the 13-Question VIP Gauntlet for RoastMyInlaws.me:</p>
          <h1 style="color: #f97316; font-family: monospace; background: #f4f4f5; padding: 10px; border-radius: 8px;">${code}</h1>
          <p>This code is valid for today only (UTC time).</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, code, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
