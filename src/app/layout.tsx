import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chronos',
  description: 'Home of the Chronos project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
