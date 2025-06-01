import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Application de capacité d'accueil",
  description: "Analyse interactive de la capacité d’accueil pour les structures de formation professionnelle en Tunisie",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
