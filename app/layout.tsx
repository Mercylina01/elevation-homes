import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Elevation Homes - Quality Furniture Store | Mukono, Uganda',
  description: 'Elevation Homes offers handcrafted household furniture in Mukono, Uganda. Browse our wide selection of quality furniture and order online.',
  keywords: 'furniture, household furniture, Mukono, Uganda, custom furniture, home decor',
  openGraph: {
    title: 'Elevation Homes - Premium Furniture Store',
    description: 'Discover quality handcrafted furniture at Elevation Homes in Mukono, Uganda',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
