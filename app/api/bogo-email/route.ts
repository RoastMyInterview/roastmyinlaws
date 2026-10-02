import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // 1. Send the Master Code to the Customer (Your admin alert has been removed!)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dick Headerson <onboarding@resend.dev>',
        to: [email],
        subject: '🎁 Your 8 FREE VIP Gauntlet Passes',
        html: `
          <div style="background-color: #09090b; padding: 32px 20px; font-family: Arial, sans-serif; color: #f4f4f5; text-align: center;">
            <div style="max-width: 480px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px 24px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 16px;">You actually paid me $10. Impressive.</h2>
              <p style="font-size: 15px; color: #a1a1aa; line-height: 1.5; margin-bottom: 24px;">
                As promised, here is your Master Code. Forward this email or text this code to <strong>up to 8 of your friends</strong> so I can tear their resumes to shreds too.
              </p>
              
              <div style="background-color: #09090b; border: 2px dashed #f59e0b; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 1.5px; color: #f59e0b; margin-bottom: 6px;">
                  100% Free Promo Code
                </div>
                <div style="font-size: 32px; font-weight: 900; letter-spacing: 3px; color: #fbbf24; font-family: monospace;">
                  ROASTMYFRIEND
                </div>
              </div>

              <p style="font-size: 14px; color: #a1a1aa; margin-bottom: 24px;">
                Tell them to go to <a href="https://roastmyinterview.me" style="color: #f59e0b;">roastmyinterview.me</a>, click the VIP button, and enter this code at checkout so it becomes completely free.
              </p>

              <p style="font-size: 14px; color: #71717a;">Now go away,</p>
              <p style="font-family: 'Brush Script MT', 'Lucida Handwriting', cursive; font-size: 28px; color: #f97316; margin-top: 4px;">Dick Headerson</p>
            </div>
          </div>
        `
      })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // If the email system crashes, we can add error-only alerting here later.
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}
