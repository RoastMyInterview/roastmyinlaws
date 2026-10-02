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
  metadataBase: new URL('https://roastmyinlaws.me'),
  title: 'RoastMyInlaws.me | Face Dick Headerson',
  description:
    'Submit your in-law drama, holiday horror stories, and family boundaries to the hot seat. Dick Headerson provides tough love, zero fluff, and instant reality checks.',
  keywords: [
    'in-laws roast',
    'mother-in-law advice',
    'family boundary audit',
    'Dick Headerson',
    'toxic in-laws roast'
  ],
  openGraph: {
    title: 'RoastMyInlaws.me | Face Dick Headerson',
    description:
      'Think you can handle your passive-aggressive in-laws? Face Dick Headerson and see if you survive the hot seat.',
    url: 'https://roastmyinlaws.me',
    siteName: 'RoastMyInlaws.me',
    images: [
      {
        url: 'https://roastmyinterview.me/dick-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Dick Headerson - RoastMyInlaws.me',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoastMyInlaws.me | Face Dick Headerson',
    description:
      'Dick Headerson shreds spineless boundaries and holiday nightmares. Step into the hot seat.',
    images: ['https://roastmyinterview.me/dick-avatar.jpg'],
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
