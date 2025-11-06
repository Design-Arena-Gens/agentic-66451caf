import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fashion Hub - Premium Clothing Store',
  description: 'Discover the latest trends in fashion. Shop premium clothing for men and women.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
