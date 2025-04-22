"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

// 使用与其他组件相同的字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 服务项目组件
function ServiceCategory({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h5 className="text-white/80 font-medium mb-5">{title}</h5>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="text-white/60 text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
}

// 联系方式组件
export default function ContactSection() {
  // 服务类别数据
  const services = [
    {
      title: "品牌视觉",
      items: ["品牌形象片", "时尚摄影", "产品摄影", "视觉策划"]
    },    
    {
      title: "短视频拍摄",
      items: ["抖音短视频", "自媒体Vlog", "社交媒体内容", "达人账号孵化"]
    },
    {
      title: "技术服务",
      items: ["后期调色", "航拍服务", "电影级拍摄", "视觉创意指导"]
    }
  ];

  return (
    <section className={`relative w-full py-32 overflow-hidden bg-[#0a0a0a] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] to-[#050505]" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 联系方式部分 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-40"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-12 text-center md:text-left">
            联系我
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-white/60 font-song text-sm md:text-base max-w-xl mb-8 max-w-none tracking-wide">
                专业的镜头语言与您的品牌理念相融合，打造独一无二的视觉作品。期待与您的合作，共创视觉艺术之美。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">jiayang2543697731@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">+86 176 **** 0656</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">微信：wuchensama</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">杭州市滨江区长河路</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full text-sm font-medium hover:from-orange-600 hover:to-amber-700 transition-all duration-300">
                联系我
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* 服务类别部分 - 参考图片布局 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-6 md:pt-12 pb-4 md:pb-8 border-t border-white/10"
        >
          {/* 移动端垂直排列，电脑端左右分栏布局 */}
          <div className="flex flex-col md:flex-row md:gap-12 md:justify-between">
            {/* 左侧：服务标题和描述（在移动端位于顶部） */}
            <div className="mb-4 md:mb-0 md:w-1/4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-2 md:mb-4">
                服务
              </h2>
              <p className="text-white/60 font-song text-xs md:text-sm mb-4 max-w-none tracking-wide">
                提供专业的视觉内容创作服务，从创意到执行，为您的品牌塑造独特形象。
              </p>
            </div>
            
            {/* 右侧：三个服务类别（在移动端位于下方并排） */}
            <div className="grid grid-cols-3 gap-2 md:gap-6 md:w-2/3 md:justify-self-end">
              <div>
                <h5 className="text-sm md:text-lg text-white/90 font-medium mb-2 md:mb-4">品牌视觉</h5>
                <ul className="space-y-0.5 md:space-y-2">
                  <li className="text-white/60 text-[6.5px] md:text-sm">品牌形象片</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">时尚摄影</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">产品摄影</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">视觉策划</li>
                </ul>
              </div>

              <div>
                <h5 className="text-sm md:text-lg text-white/90 font-medium mb-2 md:mb-4">短视频拍摄</h5>
                <ul className="space-y-0.5 md:space-y-2">
                  <li className="text-white/60 text-[6.5px] md:text-sm">抖音短视频</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">自媒体Vlog</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">社交媒体内容</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">达人账号孵化</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm md:text-lg text-white/90 font-medium mb-2 md:mb-4">技术服务</h5>
                <ul className="space-y-0.5 md:space-y-2">
                  <li className="text-white/60 text-[6.5px] md:text-sm">后期调色</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">航拍服务</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">电影级拍摄</li>
                  <li className="text-white/60 text-[6.5px] md:text-sm">视觉创意指导</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 底部信息 */}
        <div className="mt-10 text-center border-t border-white/10 pt-6">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} 摄影师嘉阳. 保留所有权利. | © Photographer Jeyon.
          </p>
        </div>
      </div>
    </section>
  )
} 