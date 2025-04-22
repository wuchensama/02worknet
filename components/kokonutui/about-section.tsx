"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
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

// 动态装饰组件
function Decoration({
  className,
  delay = 0,
  size = 80,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        rotate: rotate - 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rotate,
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          rotate: [rotate, rotate + 5, rotate],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width: size,
          height: size,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px] border border-white/[0.12]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// 半透明磨砂卡片组件
function GlassCard({
  children,
  className,
  delay = 0,
  borderColor = "border-white/10",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  borderColor?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      viewport={{ once: true }}
      className={cn(
        "relative p-6 md:p-8 rounded-xl overflow-hidden",
        "backdrop-blur-md bg-white/[0.03]",
        "border border-opacity-10",
        borderColor,
        "transition-all duration-300 hover:bg-white/[0.05]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// 关于我板块组件
export default function AboutSection() {
  // 文本动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      }
    }
  };

  return (
    <section className={`relative min-h-screen w-full flex items-center py-24 overflow-hidden bg-[#030303] ${songFont.variable} ${violaFont.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
      
      {/* 装饰元素 */}
      <Decoration
        delay={0.2}
        size={120}
        rotate={8}
        gradient="from-indigo-500/[0.12]"
        className="left-[5%] top-[15%]"
      />
      <Decoration
        delay={0.3}
        size={90}
        rotate={-15}
        gradient="from-rose-500/[0.12]"
        className="right-[8%] top-[70%]"
      />
      <Decoration
        delay={0.4}
        size={70}
        rotate={12}
        gradient="from-amber-500/[0.12]"
        className="left-[12%] bottom-[15%]"
      />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 font-sans">
              Jeyon | 嘉阳
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 mx-auto max-w-5xl">
          {/* 0-1孵化操盘手 */}
          <GlassCard delay={0.3} borderColor="border-indigo-500/30">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-16 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full" />
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
                  「0-1孵化操盘手」
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-song max-w-none tracking-wide">
                  从素人到<span className="font-medium text-white/80">十万粉</span>，单账号月均 <span className="font-medium text-white/80">GMV60w+</span>，<span className="font-medium text-white/80">30+</span> 爆款视频（单条<span className="font-medium text-white/80">100w+</span>播放）
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mt-3 font-song">
                  成熟账号粉丝视觉搭建，合作<span className="font-medium text-white/80">徐志斌</span>、<span className="font-medium text-white/80">秘秘</span>、<span className="font-medium text-white/80">lulu</span>、<span className="font-medium text-white/80">米粒mili</span>、<span className="font-medium text-white/80">张林超</span>等账号拍摄（总粉丝量破亿）
                </p>
              </div>
            </div>
          </GlassCard>
          
          {/* 品牌视觉翻译官 */}
          <GlassCard delay={0.5} borderColor="border-rose-500/30">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-16 bg-gradient-to-b from-rose-400 to-rose-600 rounded-full" />
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
                  「品牌视觉翻译官」
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-song">
                  曾为<span className="font-medium text-white/80">Dior</span>、<span className="font-medium text-white/80">Valentino</span>定格时装周画面，为<span className="font-medium text-white/80">迪丽热巴</span>、<span className="font-medium text-white/80">刘亦菲</span>等一线明星雕刻活动切片。
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mt-3 font-song">
                  足迹横跨<span className="font-medium text-white/80">8国10城</span>，主导<span className="font-medium text-white/80">5次跨国拍摄项目</span>，将多哈皇室的奢华、意大利米兰的时尚底色、巴黎左岸的浪漫风情熔铸成品牌专属的全球化视觉符号。
                </p>
              </div>
            </div>
          </GlassCard>
          
          {/* 技术流创作者 */}
          <GlassCard delay={0.7} borderColor="border-amber-500/30">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
                  「技术流创作者」
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-song max-w-none tracking-wide">
                  <span className="font-medium text-white/80 max-w-none tracking-wide">达芬奇官方认证调色师</span>，精通<span className="font-medium text-white/80 max-w-none tracking-wide">Sony/Cannon</span>电影及前后期全流程、无人机航拍系统。
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mt-3 font-song">
                  <span className="font-medium text-white/80 max-w-none tracking-wide">7年行业深耕</span>，镜头的终极命题，是让每一帧成为品牌的美学资产。
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* 品牌数据 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <div className="text-white/60 text-sm bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
            服务超过<span className="font-medium text-white/80">15个国际品牌</span>
          </div>
          <div className="text-white/60 text-sm bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
            孵化账号总粉丝量破<span className="font-medium text-white/80">500万</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 