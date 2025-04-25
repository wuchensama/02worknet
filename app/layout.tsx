import './globals.css'
import type { Metadata } from 'next'
import Navigation from './navigation'
import FloatingNav from '../components/FloatingNav'

export const metadata: Metadata = {
  title: '摄影师嘉阳 - 奢华品牌视觉专家',
  description: '专注于奢华品牌视觉创作与内容运营的摄影师',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navigation />
        <FloatingNav />
        {children}
      </body>
    </html>
  )
} 