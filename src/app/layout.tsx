import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Header } from '#/components/layout';
import { cn } from '#/lib/utils';

const lato = Lato({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JibChain',
  description: 'Jibchain PoC'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(lato.className, 'flex flex-col')}>
        <Header />
        <main className='flex flex-col flex-1'>{children}</main>
      </body>
    </html>
  );
}
