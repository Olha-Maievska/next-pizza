import type { Metadata } from 'next'
import { Header } from '@/shared/components/shared/header'
import { Container } from '@/shared/components/shared'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Next Pizza | Checkout',
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header
            className="border-b-gray-200"
            hasSearch={false}
            hasCart={false}
          />
        </Suspense>
        {children}
      </Container>
    </main>
  )
}
