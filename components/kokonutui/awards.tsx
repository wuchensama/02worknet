"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import Image from "next/image"

// 使用相同的字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 奖项数据
const awards = [
  {
    title: "金凤凰国际电影节",
    category: "最佳短片",
    year: "2023",
    work: "《逃出荒野》",
    icon: "/images/awards/phoenix.svg",
  },
  {
    title: "亚洲新媒体影响力",
    category: "年度内容创作",
    year: "2022",
    work: "《夏至未至》系列",
    icon: "/images/awards/asia.svg",
  },
  {
    title: "创意传播大奖",
    category: "最佳视觉叙事",
    year: "2023",
    work: "《归途》",
    icon: "/images/awards/creative.svg",
  },
  {
    title: "新锐导演计划",
    category: "入选作品",
    year: "2022",
    work: "短片合集",
    icon: "/images/awards/director.svg",
  },
]

// 奖项展示组件
export default function AwardsSection() {
  return (
    <section id="awards" className={`relative w-full py-24 overflow-hidden bg-gradient-to-b from-[#050505] to-[#080808] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 leading-tight">
            荣誉与奖项
          </h2>
          <p className="text-white/60 mt-6 max-w-3xl mx-auto font-song text-sm md:text-base leading-relaxed">
            我们的作品获得多个国内外电影节和创意内容奖项的认可，见证了我们对创意和制作品质的不懈追求。
          </p>
        </motion.div>
        
        {/* 奖项列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg mr-4">
                  {award.icon && (
                    <div className="relative w-6 h-6">
                      <Image 
                        src={award.icon} 
                        alt={award.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white/90 text-lg font-medium">{award.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{award.category} · {award.year}</p>
                  <p className="text-white/50 text-sm mt-3 font-song">{award.work}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 