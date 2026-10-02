import { getDailyCode, getTodayDateEST } from '@/lib/daily-code';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const todayEST = getTodayDateEST();
    const code = getDailyCode(todayEST);

    // Send forward-ready email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dick Headerson <onboarding@resend.dev>',
        to: ['safetycaps@gmail.com'],
        subject: `🔥 Today's VIP Passcode: ${code}`,
        html: `
          <div style="background-color: #09090b; padding: 32px 20px; font-family: Arial, sans-serif; color: #f4f4f5; text-align: center;">
            <div style="max-width: 480px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px 24px;">
              
              <!-- LOGO -->
              <div style="margin-bottom: 16px;">
                <div style="background: linear-gradient(135deg, #f97316, #dc2626); width: 50px; height: 50px; border-radius: 14px; margin: 0 auto 12px; line-height: 50px; font-size: 26px;">
                  🔥
                </div>
                <div style="font-size: 22px; font-weight: bold; color: #ffffff;">
                  roastmyinterview<span style="color: #f97316;">.me</span>
                </div>
              </div>

              <!-- EXACT PHRASE WITH SIGNATURE -->
              <h1 style="font-size: 22px; font-weight: 800; margin: 16px 0 10px; color: #ffffff; line-height: 1.2;">
                get roasted with<br />
                <span style="font-family: 'Brush Script MT', 'Lucida Handwriting', cursive; font-size: 34px; font-weight: normal; color: #f97316; display: inline-block; margin-top: 8px;">Dick Headerson</span>
              </h1>

              <p style="font-size: 14px; color: #a1a1aa; line-height: 1.5; margin-bottom: 24px;">
                You've got a free 13-question executive pass. Test your answers against the most ruthless hiring manager on the internet.
              </p>

              <!-- PASSCODE BOX -->
              <div style="background-color: #09090b; border: 2px dashed #f97316; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 1.5px; color: #f97316; margin-bottom: 6px;">
                  Today's VIP Passcode
                </div>
                <div style="font-size: 32px; font-weight: 900; letter-spacing: 3px; color: #fbbf24; font-family: monospace;">
                  ${code}
                </div>
                <div style="font-size: 11px; color: #71717a; margin-top: 6px;">
                  Valid for today: ${todayEST} (Expires midnight EST)
                </div>
              </div>

              <!-- HOW TO USE -->
              <div style="text-align: left; background-color: #27272a; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px; font-size: 13px; color: #d4d4d8; line-height: 1.6;">
                <strong>How to redeem:</strong><br />
                1. Go to <a href="https://roastmyinterview.me" style="color: #f97316; font-weight: bold;">roastmyinterview.me</a><br />
                2. Click <em>"Have an access code?"</em><br />
                3. Paste your code and start the gauntlet.
              </div>

              <!-- CTA BUTTON -->
              <a href="https://roastmyinterview.me" style="display: block; background: #f97316; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 15px; padding: 14px; border-radius: 10px;">
                Launch roastmyinterview.me &rarr;
              </a>

            </div>
          </div>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: result }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, code, date: todayEST, resendId: result.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
