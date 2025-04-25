import './globals.css'
import type { Metadata } from 'next'
import Navigation from './navigation'
import FloatingNav from '../components/FloatingNav'
import { Inter } from 'next/font/google'
import Preloader from '@/components/Preloader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '摄影师嘉阳',
  description: '专注于品牌视觉创作与内容运营的摄影师',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Preloader />
        <Navigation />
        <FloatingNav />
        {children}
      </body>
    </html>
  )
} 