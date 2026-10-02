import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  // Seamlessly routes social crawlers and preview bots to Dick's avatar with 0 compile dependencies
  return NextResponse.redirect(new URL('/dick-avatar.jpg', url.origin));
}
