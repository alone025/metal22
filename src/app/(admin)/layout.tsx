import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';
import 'src/app/globals.css';
import React from 'react';
import AdminHeader from 'src/app/(admin)/dashboard/_components/AdminHeader';
import { Toaster } from 'components//ui/sonner';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Маркас комплект',
  description: 'Металлопрокат в любых объемах',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: 'white',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <AdminHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
