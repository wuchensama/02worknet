"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import localFont from "next/font/local"
import { useState } from "react"

// 使用与hero-geometric相同的字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 项目卡片组件
function ProjectCard({
  image,
  title,
  description,
  tags,
  delay,
}: {
  image: string
  title: string
  description: string
  tags: string[]
  delay: number
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 决定是否使用图片而不是背景色
  const useImage = image && !image.includes("project");
  
  // 获取页面链接 - 对于Valentino项目使用特定链接
  const getProjectLink = () => {
    if (title.includes("Valentino")) {
      return "/projects/valentino";
    }
    // 其他项目可以添加更多条件判断
    return "#";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-[3/4] w-full">
          {/* 图片或占位背景 */}
          {useImage ? (
            <img 
              src={image} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              title.includes("Valentino") ? "from-rose-800/40 to-rose-950/70" :
              title.includes("dior") ? "from-blue-800/40 to-blue-950/70" :
              title.includes("达人") ? "from-purple-800/40 to-purple-950/70" :
              "from-amber-800/40 to-amber-950/70"
            )} />
          )}
          
          {/* 保持渐变蒙版，确保在图片之上 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          
          {/* 内容区域 */}
          <div className="absolute bottom-0 left-0 z-20 p-5 w-full">
            <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-white/70 font-song mb-3 line-clamp-2">
              {description}
            </p>
            
            {/* 标签和详情按钮并排排列 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              
              {/* 扁平线条风按钮，字体更小，与标签并排 */}
              <a href={getProjectLink()}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center text-xs text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span className="border-b border-orange-400 pb-0.5 mr-1">查看详情</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// 分类标题组件
function CategoryTitle({ title, colorClass }: { title: string, colorClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-8 md:mb-12 max-w-4xl"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className={cn("w-2 h-16 rounded-full", colorClass)} />
        <h3 className="text-3xl md:text-4xl font-bold text-white/90">
          「{title}」
        </h3>
      </div>
    </motion.div>
  );
}

// 精选项目板块组件
export default function ProjectsSection() {
  // 品牌翻译官项目
  const brandProjects = [
    {
      image: "/images/kataer01/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg",
      title: "卡塔尔Valentino拍摄",
      description: "受邀参加多哈Valentino高定展，拍摄华伦天奴王妃御用的高定与晚宴",
      tags: ["Valentino", "品牌拍摄"],
    },
    {
      image: "/images/project2.jpg",
      title: "松花湖dior",
      description: "定格迪奥品牌时装周画面，捕捉光影中的奢华美学",
      tags: ["Dior", "品牌拍摄"],
    },
    {
      image: "/images/project3.jpg",
      title: "明星活动拍摄",
      description: "为一线明星雕刻专属活动切片，打造个人专属视觉语言",
      tags: ["明星", "活动拍摄"],
    },
  ];
  
  // 孵化操盘手项目
  const incubationProjects = [
    {
      image: "/images/project4.jpg",
      title: "达人账号孵化",
      description: "从素人到十万粉，打造独特账号调性与内容策略",
      tags: ["账号孵化", "内容策略"],
    },
    {
      image: "/images/project5.jpg",
      title: "爆款内容创作",
      description: "单条破百万播放的爆款视频创作与优化方案",
      tags: ["爆款", "短视频"],
    },
    {
      image: "/images/project6.jpg",
      title: "KOL视觉升级",
      description: "为成熟账号提供视觉升级方案，提升品牌调性",
      tags: ["KOL", "视觉升级"],
    },
  ];
  
  // 技术流创作项目
  const technicalProjects = [
    {
      image: "/images/project7.jpg",
      title: "企业宣传片拍摄",
      description: "专业电影级设备与技术打造企业形象宣传片",
      tags: ["宣传片", "企业形象"],
    },
    {
      image: "/images/project8.jpg",
      title: "航拍艺术创作",
      description: "无人机航拍系统捕捉独特视角的艺术影像",
      tags: ["航拍", "艺术创作"],
    },
    {
      image: "/images/project9.jpg",
      title: "专业调色服务",
      description: "达芬奇认证调色师提供的专业影像调色服务",
      tags: ["调色", "后期制作"],
    },
  ];

  return (
    <section className={`relative min-h-screen w-full flex flex-col py-32 overflow-hidden bg-[#0c0c0c] ${songFont.variable} ${violaFont.variable}`}>
      {/* 暖色调背景渐变 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] right-0 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-orange-500/20 via-amber-600/10 to-transparent blur-[120px] opacity-60" />
        <div className="absolute -bottom-[30%] left-0 w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-orange-700/10 via-amber-500/5 to-transparent blur-[100px] opacity-40" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <h2 className="text-7xl md:text-8xl font-serif text-white/90 leading-tight mb-8">
            精选项目
          </h2>
          <p className="text-white/60 max-w-xl font-song text-sm md:text-base">
            镜头记录奢华，艺术塑造品牌。每一个项目都是独特视觉语言的呈现，将品牌理念通过光影与色彩完美诠释。
          </p>
        </motion.div>
        
        {/* 品牌视觉翻译官部分 */}
        <div className="mb-24">
          <CategoryTitle 
            title="品牌视觉" 
            colorClass="bg-gradient-to-b from-rose-400 to-rose-600" 
          />
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              曾为<span className="font-medium text-white/80">Dior</span>、<span className="font-medium text-white/80">Valentino</span>定格时装周画面，为<span className="font-medium text-white/80">迪丽热巴</span>、<span className="font-medium text-white/80">刘亦菲</span>等一线明星雕刻活动切片。足迹横跨<span className="font-medium text-white/80">8国10城</span>，主导<span className="font-medium text-white/80">5次跨国拍摄项目</span>，将多哈皇室的奢华、意大利米兰的时尚底色、巴黎左岸的浪漫风情熔铸成品牌专属的全球化视觉符号。
            </p>
          </div>
          
          {/* 品牌项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {brandProjects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
        
        {/* 0-1孵化操盘手部分 */}
        <div className="mb-24">
          <CategoryTitle 
            title="0-1孵化运营" 
            colorClass="bg-gradient-to-b from-indigo-400 to-indigo-600" 
          />
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              从素人到<span className="font-medium text-white/80">十万粉</span>，单账号月均<span className="font-medium text-white/80">GMV60w+</span>，<span className="font-medium text-white/80">30+</span>爆款视频（单条<span className="font-medium text-white/80">100w+</span>播放）。成熟账号粉丝视觉搭建，合作<span className="font-medium text-white/80">徐志斌</span>、<span className="font-medium text-white/80">秘秘</span>、<span className="font-medium text-white/80">lulu</span>、<span className="font-medium text-white/80">米粒mili</span>、<span className="font-medium text-white/80">张林超</span>等账号拍摄（总粉丝量破亿）
            </p>
          </div>
          
          {/* 孵化项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {incubationProjects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
        
        {/* 技术流创作者部分 */}
        <div className="mb-24">
          <CategoryTitle 
            title="技术流创作" 
            colorClass="bg-gradient-to-b from-amber-400 to-amber-600" 
          />
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              <span className="font-medium text-white/80">达芬奇官方认证调色师</span>，精通<span className="font-medium text-white/80">Sony/Cannon</span>电影及前后期全流程、无人机航拍系统。<span className="font-medium text-white/80">7年行业深耕</span>，镜头的终极命题，是让每一帧成为品牌的美学资产。
            </p>
          </div>
          
          {/* 技术项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {technicalProjects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
        
        {/* 数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 justify-center mb-24 mt-16"
        >
          <div className="text-white/70 text-sm md:text-base bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
            服务超过<span className="font-medium text-white ml-1">15个国际品牌</span>
          </div>
          <div className="text-white/70 text-sm md:text-base bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
            孵化账号总粉丝量破<span className="font-medium text-white ml-1">500万</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 