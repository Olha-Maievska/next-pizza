import type { Metadata } from 'next'
import { Header } from '@/shared/components/shared/header'
import { Container } from '@/shared/components/shared'

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
        <Header
          className="border-b-gray-200"
          hasSearch={false}
          hasCart={false}
        />
        {children}
      </Container>
    </main>
  )
}
