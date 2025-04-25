"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

// 使用与hero-geometric相同的字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 短片展示组件
export default function ShortFilmsSection() {
  return (
    <section id="films" className={`relative w-full py-24 overflow-hidden bg-[#050505] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#030303]" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 max-w-5xl mx-auto px-6 md:px-10 lg:px-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-2 h-16 rounded-full bg-gradient-to-b from-blue-400 to-teal-600"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 leading-tight">
              微电影
            </h2>
          </div>
          <p className="text-white/60 mt-6 max-w-3xl font-song text-sm md:text-base leading-relaxed">
            拍摄了多部原创微电影和广告短片，包括《<span className="font-medium text-white/80">逃出荒野</span>》、《<span className="font-medium text-white/80">归途</span>》和《<span className="font-medium text-white/80">夏至未至</span>》等作品，展现了丰富的视觉叙事风格。
          </p>
        </motion.div>
        
        {/* 这里可以后续添加短片内容 */}
      </div>
    </section>
  )
} 