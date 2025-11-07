import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen gap-24">
      <Header/>
      <main className="mx-auto w-[1050px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}