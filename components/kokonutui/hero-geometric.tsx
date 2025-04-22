"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

// 引入新意吉祥宋字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf", // 字体文件路径
  variable: "--font-song",
})

// 引入Violableness字体
const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf", // 字体文件路径
  variable: "--font-viola",
})

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
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// 强调文本组件
function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-white/70">{children}</span>;
}

// 向下滚动箭头组件
function ScrollDownArrow() {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          width="24" 
          height="60" 
          viewBox="0 0 24 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 0L12 56M12 56L22 46M12 56L2 46" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="stroke-gradient"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  badge = "Kokonut UI",
  title1 = "Elevate Your",
  title2 = "Digital Vision",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
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
  
  // 文本分行动画配置
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8, // 在标题后显示
      }
    }
  };
  
  const textLineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      }
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] ${songFont.variable} ${violaFont.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Image src="/logo/xiangji.svg" alt="摄影师嘉阳" width={20} height={20} />
            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 text-3xl sm:text-5xl md:text-7xl",
                  violaFont.className,
                )}
              >
                {title2}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mt-5 inline-block pt-5">{title1}</span>
            </h1>
          </motion.div>

          <motion.div 
            className="mt-11 pt-10 md:pt-10 mb-8 text-white/40 text-sm sm:text-base md:text-lg font-normal tracking-wide max-w-xl mx-auto px-4 font-song"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="mb-3" variants={textLineVariants}>
              Hi，我是 <Highlight>Jeyon</Highlight> 
            </motion.p>
            <motion.p className="mb-3" variants={textLineVariants}>
              专注达人流量孵化以及品牌视觉呈现
            </motion.p>
            <motion.p className="mb-3" variants={textLineVariants}>
              曾拍摄 <Highlight>刘亦菲</Highlight>、<Highlight>迪丽热巴</Highlight> 等一线明星
            </motion.p>
            <motion.p variants={textLineVariants}>
              合作过 <Highlight>Dior</Highlight>/<Highlight>Valentino</Highlight> 等国际高奢品牌
            </motion.p>
          </motion.div>
        </div>
      </div>

      <ScrollDownArrow />

      <style jsx global>{`
        .stroke-gradient {
          stroke: url(#arrowGradient);
        }
      `}</style>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffadc2" />
            <stop offset="50%" stopColor="#ffd1db" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
} 