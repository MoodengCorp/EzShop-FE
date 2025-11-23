import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Separator } from '@/components/ui/separator'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="w-screen my-5">
        <Separator className="shadow-2xl"/>
      </div>
      <main className="mx-auto w-full">{children}</main>
      <Footer />
    </div>
  )
}
