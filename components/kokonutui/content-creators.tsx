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

// 达人展示组件
export default function ContentCreatorsSection() {
  return (
    <section id="creators" className={`relative w-full py-24 overflow-hidden bg-[#0c0c0c] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] to-[#080808]" />
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
            <div className="w-2 h-16 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 leading-tight">
              达人合作
            </h2>
          </div>
          <p className="text-white/60 mt-6 max-w-3xl font-song text-sm md:text-base leading-relaxed">
            <span className="font-medium text-white/80">合作过徐志斌</span>、<span className="font-medium text-white/80">秘秘</span>、<span className="font-medium text-white/80">lulu</span>、<span className="font-medium text-white/80">米粒mili</span>、<span className="font-medium text-white/80">张林超</span>等账号拍摄（总粉丝量破亿），创作出<span className="font-medium text-white/80">30+</span>百万流量爆款视频。
          </p>
        </motion.div>
        
        {/* 这里可以后续添加达人内容 */}
      </div>
    </section>
  )
} 