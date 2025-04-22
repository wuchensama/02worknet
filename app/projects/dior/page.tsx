import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function DiorProjectPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-20 px-4">
        <Link href="/" className="text-blue-400 mb-8 inline-block">
          &larr; 返回首页
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8">松花湖Dior项目</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-6">
              定格迪奥品牌时装周画面，捕捉光影中的奢华美学。本项目展示了在松花湖举办的Dior时装周的精彩瞬间与画面。
            </p>
            <p className="text-lg mb-6">
              项目详情和更多内容正在完善中...
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/images/dior01/DAF156EA-9E0E-488F-880E-31A2493BC020_1_105_c.jpeg"
              alt="Dior 项目展示"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 