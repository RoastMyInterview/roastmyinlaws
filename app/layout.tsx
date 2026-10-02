import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://roastmyinterview.me'),
  title: 'RoastMyInterview.me | Face Dick Headerson',
  description:
    'Face tough-love executive hiring manager Dick Headerson. Zero buzzwords, brutal reality checks, and instant termination for corporate jargon.',
  keywords: [
    'mock interview',
    'AI interview roast',
    'Dick Headerson',
    'job interview practice',
    'corporate buzzwords',
    'interview prep'
  ],
  openGraph: {
    title: 'RoastMyInterview.me | Face Dick Headerson',
    description:
      'Think you can survive a mock interview without buzzwords? Face Dick Headerson and see if you get hired or terminated on question 1.',
    url: 'https://roastmyinterview.me',
    siteName: 'RoastMyInterview.me',
    images: [
      {
        url: '/dick-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Dick Headerson - RoastMyInterview.me',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoastMyInterview.me | Face Dick Headerson',
    description:
      'Survive the hot seat with tough-love hiring manager Dick Headerson without corporate buzzwords.',
    images: ['/dick-avatar.jpg'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased selection:bg-orange-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
