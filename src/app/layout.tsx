import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Leka Dashboard — Controle Financeiro Pessoal',
  description: 'Dashboard premium de extrato financeiro com controle de entradas, saídas e parcelas mensais.',
  keywords: ['dashboard', 'financeiro', 'extrato', 'controle', 'parcelas'],
  robots: 'noindex',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9',
            },
          }}
        />
      </body>
    </html>
  )
}
