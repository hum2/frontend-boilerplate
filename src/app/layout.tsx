import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { DIProvider } from '@/di/provider';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';
import { loadMasterData } from '@/fetcher/masterData';
import { MasterDataProvider } from '@/contexts/MasterDataContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Project Boilerplate',
    description: 'Next.js project boilerplate with TypeScript and Tailwind CSS',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { resourceTypes, resourceTypes2, resourceTypes3 } = await loadMasterData();

    return (
        <html lang="ja">
            <body className={inter.className}>
                <DIProvider>
                    <MasterDataProvider value={resourceTypes}>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </MasterDataProvider>
                </DIProvider>
            </body>
        </html>
    );
}
