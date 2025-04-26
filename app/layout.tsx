import './globals.css'
import type { Metadata } from 'next'
import Navigation from './navigation'
import FloatingNav from '../components/FloatingNav'
import { Inter } from 'next/font/google'
import Preloader from '@/components/Preloader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '摄影师嘉阳',
  description: '摄影师嘉阳的个人作品集，专注于奢华品牌视觉呈现，提供短视频拍摄、短剧制作、微电影拍摄等服务。',
  openGraph: {
    title: '摄影师嘉阳',
    description: '摄影师嘉阳的个人作品集，专注于奢华品牌视觉呈现，提供短视频拍摄、短剧制作、微电影拍摄等服务。',
    images: [
      {
        url: '/images/47F2EC35-5115-48BF-8E91-8A08C9B35726.JPG',
        width: 1200,
        height: 630,
        alt: '摄影师嘉阳作品展示',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '摄影师嘉阳',
    description: '摄影师嘉阳的个人作品集，专注于奢华品牌视觉呈现，提供短视频拍摄、短剧制作、微电影拍摄等服务。',
    images: ['/images/47F2EC35-5115-48BF-8E91-8A08C9B35726.JPG'],
  },
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