import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Pizza | Home',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
