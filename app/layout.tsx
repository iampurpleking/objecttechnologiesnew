import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'Object Technologies - Digital Marketing & Software Innovation',
  description: 'Empowering businesses with cutting-edge digital marketing and software development solutions.',
  keywords: 'digital marketing, software development, web development, mobile apps, SEO, social media marketing',
  authors: [{ name: 'Object Technologies' }],
  openGraph: {
    title: 'Object Technologies - Digital Marketing & Software Innovation',
    description: 'Empowering businesses with cutting-edge digital marketing and software development solutions.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-inter antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
