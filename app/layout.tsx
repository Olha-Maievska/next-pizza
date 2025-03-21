import { Nunito } from 'next/font/google'
import { Providers } from '@/shared/components/shared'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=1200" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={nunito.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
