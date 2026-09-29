import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Realistic Smartphone Selfie Engine',
  description: 'Mobile-first prompt engine generating physically coherent, everyday Saudi smartphone selfie prompts for ChatGPT Images and Gemini.',
  openGraph: {
    title: 'Realistic Smartphone Selfie Engine',
    description: 'Mobile-first prompt engine generating physically coherent, everyday Saudi smartphone selfie prompts for ChatGPT Images and Gemini.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realistic Smartphone Selfie Engine',
    description: 'Mobile-first prompt engine generating physically coherent, everyday Saudi smartphone selfie prompts for ChatGPT Images and Gemini.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090d16',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body suppressHydrationWarning className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}


