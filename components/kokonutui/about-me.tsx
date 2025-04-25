"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import Image from "next/image"
import { useEffect, useState } from "react"

// 引入新意吉祥宋字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

// 动态装饰组件
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// 技能进度条组件
function SkillProgress({
  name,
  percentage,
  delay,
  gradient,
}: {
  name: string
  percentage: number
  delay: number
  gradient: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 text-sm">{name}</span>
        <span className="text-white/60 text-sm">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          className={cn("h-full rounded-full", gradient)}
        />
      </div>
    </motion.div>
  )
}

// 品牌轮播组件
function BrandCarousel({
  images,
  delay,
}: {
  images: string[]
  delay: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className="absolute inset-0"
    >
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            scale: currentIndex === index ? 1 : 0.95,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="brand"
            fill
            className="object-cover rounded-2xl opacity-20"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// 时间轴组件
function TimelineItem({
  year,
  company,
  delay,
}: {
  year: string
  company: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative pl-4 md:pl-6 pb-3 md:pb-6 last:pb-0"
    >
      <div className="absolute left-0 top-2 w-2 md:w-3 h-2 md:h-3 rounded-full bg-white/20 border border-white/30" />
      <div className="absolute left-[3px] md:left-[5px] top-4 md:top-5 bottom-0 w-[1px] bg-white/10" />
      <div className="text-white/40 text-[10px] md:text-xs mb-0.5 md:mb-1">{year}</div>
      <div className="text-white/80 text-sm md:text-base font-song">{company}</div>
    </motion.div>
  )
}

// 卡片组件
function Card({
  title,
  description,
  gradient,
  delay,
  children,
  logo,
  backgroundImage,
  carouselImages,
  hideDescriptionOnMobile,
}: {
  title: string
  description: string
  gradient: string
  delay: number
  children?: React.ReactNode
  logo?: string
  backgroundImage?: {
    portrait: string
  }
  carouselImages?: string[]
  hideDescriptionOnMobile?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative group h-full"
    >
      <div className={cn(
        "relative p-4 md:p-6 rounded-2xl backdrop-blur-xl",
        "border border-white/[0.08]",
        "bg-gradient-to-br from-white/[0.05] to-transparent",
        "hover:border-white/[0.15] transition-all duration-300",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
        gradient,
        "aspect-[3/4] w-full h-full"
      )}>
        {backgroundImage && (
          <Image
            src={backgroundImage.portrait}
            alt="background"
            fill
            className="object-cover rounded-2xl opacity-20"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        )}
        {carouselImages && (
          <BrandCarousel images={carouselImages} delay={delay} />
        )}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            {logo && (
              <Image
                src={logo}
                alt="logo"
                width={20}
                height={20}
                className="rounded-full flex-shrink-0"
              />
            )}
            <div className="relative w-full overflow-hidden">
              <h3 className="text-base md:text-xl font-medium text-white whitespace-nowrap">
                {title}
              </h3>
              {!carouselImages && !backgroundImage && title !== "浙江工商职业技术学院" && (
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030303] to-transparent" />
              )}
            </div>
          </div>
          <p className={cn(
            "text-white/60 text-xs md:text-sm leading-relaxed mb-2 md:mb-4",
            hideDescriptionOnMobile && "hidden md:block"
          )}>{description}</p>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutMe() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const cards = [
    {
      title: "合作品牌",
      description: "曾为多个品牌拍摄国际时装周，为Valentino、Dior、Chanel、CHAUMET等多个品牌拍摄VIC活动以及明星现场",
      gradient: "from-rose-500/[0.15] to-transparent",
      carouselImages: [
        "/images/cardlunbo/77AC7AEA-5FF8-4F53-8536-125CD42CBFC2_1_105_c.jpeg",
        "/images/cardlunbo/C18C80B0-327B-4C32-97B9-3517709653FC_1_105_c.jpeg",
        "/images/cardlunbo/7B312ACF-9A15-4CDF-9A98-A360FE44E5F4_1_105_c.jpeg",
        "/images/cardlunbo/5D6F4F38-F62C-4016-991B-A40D99EE0DEC_1_105_c.jpeg",
        "/images/cardlunbo/DAF156EA-9E0E-488F-880E-31A2493BC020_1_105_c.jpeg",
        "/images/cardlunbo/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg",
      ],
    },
    {
      title: "从业经历",
      description: "7年经历，专注品牌活动和达人拍摄",
      gradient: "from-indigo-500/[0.15] to-transparent",
      hideDescriptionOnMobile: true,
    },
    {
      title: "浙江工商职业技术学院",
      description: "影视摄制与动画编辑",
      gradient: "from-violet-500/[0.15] to-transparent",
      logo: "/images/zhegongshang.webp",
    },
    {
      title: "跨国项目",
      description: "主导5次跨国项目，覆盖中国、法国、卡塔尔、意大利等多个国家",
      gradient: "from-cyan-500/[0.15] to-transparent",
      logo: "/images/traveler-1.svg",
      backgroundImage: {
        portrait: "/images/IMG_9044.PNG",
      },
    },
  ]

  return (
    <section id="about" className={`relative min-h-screen w-full flex items-center py-24 overflow-hidden bg-[#030303] ${songFont.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#040404] to-[#0a0a0a]" />
      
      {/* 动态背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.08]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.08]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.08]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.08]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.08]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            关于我
          </h2>
          
          <div className="text-white/60 text-sm md:text-base leading-relaxed font-song space-y-4">
            <p>Hi，我是嘉阳，这是我的作品集网站</p>
            <p>我有7年从业经历，包括了抖音、服装、达人、品牌活动等</p>
            <p>有参与的宣传片上线学习强国，也打造过非常多破百万的爆款视频。</p>
            <p>有从零到一孵化过账号，也于非常多百万粉博主甚至明星共同创作。</p>
            <p>深耕技术却不执拗于专业，以技术赋能创意，希望能与你合作。</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              {...card}
              delay={0.8 + index * 0.2}
            >
              {card.title === "浙江工商职业技术学院" && (
                <div className="mt-2 md:mt-4 space-y-2 md:space-y-4">
                  <SkillProgress 
                    name="摄影/短视频" 
                    percentage={90} 
                    delay={1.2}
                    gradient="bg-gradient-to-r from-blue-400/90 to-indigo-400/90"
                  />
                  <SkillProgress 
                    name="流量运营起号" 
                    percentage={85} 
                    delay={1.4}
                    gradient="bg-gradient-to-r from-rose-400/90 to-pink-400/90"
                  />
                  <SkillProgress 
                    name="电影/TVC" 
                    percentage={80} 
                    delay={1.6}
                    gradient="bg-gradient-to-r from-violet-400/90 to-purple-400/90"
                  />
                </div>
              )}
              {card.title === "从业经历" && (
                <div className="mt-4">
                  <TimelineItem
                    year="2022-2024"
                    company="杭州星涵（米粒mili）"
                    delay={1.2}
                  />
                  <TimelineItem
                    year="2020-2021"
                    company="杭州高禾传媒（张林超）"
                    delay={1.4}
                  />
                  <TimelineItem
                    year="2019-2020"
                    company="宁波思华年影视"
                    delay={1.6}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-text {
          animation: scroll-text 20s linear infinite;
        }
        .animate-scroll-text:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
} 