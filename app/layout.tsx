import './globals.css';
import Script from 'next/script';
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
        {/* Google Tag Manager script */}
        <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MBSW5999');`
        }} />
      </head>
      <body className="font-inter antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MBSW5999" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {/* End Google Tag Manager (noscript) */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
