import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen gap-12 ">
      <Header/>
      <main className="flex justify-center mx-auto w-full overflow-hidden bg-[#F2F5F8] ">
        {children}
      </main>
      <Footer />
    </div>
  );
}