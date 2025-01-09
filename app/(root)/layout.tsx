import type { Metadata } from 'next'
import { Header } from '@/shared/components/shared/header'
import { Suspense } from 'react'
import { Footer } from '@/shared/components/shared'

export const metadata: Metadata = {
  title: 'Next Pizza | Home',
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Suspense>
        <Header hasCart hasSearch />
      </Suspense>
      <main>
        {children}
        {modal}
      </main>
      <Footer />
    </div>
  )
}
