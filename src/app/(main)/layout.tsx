import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';
import 'src/app/globals.css';
import React, { Suspense } from 'react';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { YandexMetrika } from 'src/YandexMetrika';
import Script from 'next/script';
import Tabbar from 'src/components/Tabbar';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Маркас комплект',
  description: 'Металлопрокат в любых объемах',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: 'white',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(96820503, "init", {
        clickmap:true, 
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`}
        </Script>
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
        <Script src="//widgets.mango-office.ru/site/32348" async />
        <Header />
        {children}
        <Tabbar/>
        <Footer />
      </body>
    </html>
  );
}
