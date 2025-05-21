import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { DIProvider } from '@/di/provider';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Project Boilerplate',
    description: 'Next.js project boilerplate with TypeScript and Tailwind CSS',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <DIProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </DIProvider>
            </body>
        </html>
    );
}
