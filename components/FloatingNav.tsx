"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// 导航按钮组件
const NavButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean, 
  onClick: () => void, 
  children: React.ReactNode 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-300 whitespace-nowrap",
        active 
          ? "bg-white/15 text-white font-medium" 
          : "text-white/70 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </button>
  )
}

// 联系按钮组件
const ContactButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/20 whitespace-nowrap"
    >
      联系我
    </button>
  )
}

// 悬浮导航栏组件
const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)
  
  const sections = [
    { id: "about", name: "关于我" },
    { id: "projects", name: "项目" },
    { id: "creators", name: "短视频" },
    { id: "shorts", name: "短剧" },
    { id: "gallery", name: "写真" },
    { id: "contact", name: "联系我" }
  ] as const
  
  // 监听滚动位置来控制导航栏显示和当前活动部分
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const aboutSection = document.getElementById("about")
      
      // 当滚动到关于我部分时显示导航栏
      if (aboutSection && scrollY >= aboutSection.offsetTop - 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      
      // 判断当前活动部分
      let currentSection = ""
      const viewportMiddle = scrollY + window.innerHeight / 2
      
      // 检查项目部分
      const projectsTitle = document.querySelector('#projects h2')
      const projectsButton = document.querySelector('#projects button')
      if (projectsTitle && projectsButton) {
        const projectsStart = projectsTitle.getBoundingClientRect().top + scrollY
        const projectsEnd = projectsButton.getBoundingClientRect().bottom + scrollY
        
        // 检查是否在品牌视觉部分
        const brandVisualTitle = document.querySelector('#projects h3:first-of-type')
        if (brandVisualTitle) {
          const brandVisualStart = brandVisualTitle.getBoundingClientRect().top + scrollY
          const creatorsTitle = document.querySelector('[data-section-target="creators-title"]')
          const brandVisualEnd = creatorsTitle ? creatorsTitle.getBoundingClientRect().top + scrollY : projectsEnd
          
          if (viewportMiddle >= brandVisualStart && viewportMiddle < brandVisualEnd) {
            currentSection = "项目"
          }
        }
      }
      
      // 检查短视频部分
      const creatorsTitle = document.querySelector('[data-section-target="creators-title"]')
      const creatorsCards = document.querySelectorAll('#creators .grid > div')
      if (creatorsTitle && creatorsCards.length > 0) {
        const creatorsStart = creatorsTitle.getBoundingClientRect().top + scrollY
        const creatorsEnd = creatorsCards[2].getBoundingClientRect().bottom + scrollY
        if (viewportMiddle >= creatorsStart && viewportMiddle <= creatorsEnd) {
          currentSection = "短视频"
        }
      }
      
      // 检查短剧部分
      const shortsTitle = document.querySelector('[data-section-target="shorts-title"]')
      const shortsButton = document.querySelector('#shorts button')
      if (shortsTitle && shortsButton) {
        const shortsStart = shortsTitle.getBoundingClientRect().top + scrollY
        const shortsEnd = shortsButton.getBoundingClientRect().bottom + scrollY
        if (viewportMiddle >= shortsStart && viewportMiddle <= shortsEnd) {
          currentSection = "短剧"
        }
      }
      
      // 检查其他部分
      if (!currentSection) {
        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (element) {
            const sectionTop = element.offsetTop
            const sectionBottom = sectionTop + element.offsetHeight
            if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
              currentSection = section.name
              break
            }
          }
        }
      }
      
      setActiveSection(currentSection)
    }
    
    // 使用节流函数来优化滚动性能
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", throttledScroll)
    handleScroll() // 初始检查
    
    return () => {
      window.removeEventListener("scroll", throttledScroll)
    }
  }, [])
  
  // 处理导航点击
  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      let scrollTarget = section
      let offset = 100
      
      // 对特定区域做特殊处理
      if (sectionId === "projects") {
        // 项目按钮跳转位置需要往上移动二分之一页面高度
        offset = 100
        const windowHeight = window.innerHeight
        const extraOffset = windowHeight / 2 // 二分之一页面高度
        offset -= extraOffset
      } else if (sectionId === "creators") {
        // 短视频按钮跳转位置需要往上移动八分之一页面高度
        offset = 100
        const windowHeight = window.innerHeight
        const extraOffset = windowHeight / 8 // 八分之一页面高度
        offset -= extraOffset
      } else if (sectionId === "gallery") {
        // 写真按钮跳转位置需要往上移动五分之一页面高度
        offset = 100
        const windowHeight = window.innerHeight
        const extraOffset = windowHeight / 5 // 五分之一页面高度
        offset -= extraOffset
      } else if (sectionId === "contact") {
        // 联系我按钮跳转位置需要往上移动四分之一页面高度
        offset = 100
        const windowHeight = window.innerHeight
        const extraOffset = windowHeight / 4 // 四分之一页面高度
        offset -= extraOffset
      }
      
      // 计算滚动位置
      const scrollPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset
      
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      })

      // 如果是联系我按钮，滚动完成后复制微信号
      if (sectionId === "contact") {
        setTimeout(() => {
          const weChatId = "wuchensama"
          navigator.clipboard.writeText(weChatId).then(() => {
            // 显示复制成功的提示
            const toast = document.createElement('div')
            toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-50 text-sm backdrop-blur-sm'
            toast.textContent = `已复制微信号：${weChatId}`
            document.body.appendChild(toast)
            
            // 3秒后移除提示
            setTimeout(() => {
              document.body.removeChild(toast)
            }, 3000)
          })
        }, 500) // 等待滚动动画完成
      }
    }
  }
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-0 right-0 mx-auto z-50 max-w-[90%] w-fit px-3 py-2 rounded-full backdrop-blur-lg bg-black/40 border border-white/10 shadow-xl"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(10, 10, 10, 0.7))"
          }}
        >
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar pb-1 -mb-1">
            <NavButton 
              active={activeSection === "关于我"} 
              onClick={() => handleNavClick("about")}
            >
              关于我
            </NavButton>
            
            <NavButton 
              active={activeSection === "项目"} 
              onClick={() => handleNavClick("projects")}
            >
              项目
            </NavButton>
            
            <NavButton 
              active={activeSection === "短视频"} 
              onClick={() => handleNavClick("creators")}
            >
              短视频
            </NavButton>
            
            <NavButton 
              active={activeSection === "短剧"} 
              onClick={() => handleNavClick("shorts")}
            >
              短剧
            </NavButton>
            
            <NavButton 
              active={activeSection === "写真"} 
              onClick={() => handleNavClick("gallery")}
            >
              写真
            </NavButton>
            
            <div className="h-4 w-px bg-white/10 mx-0.5 md:mx-1 flex-shrink-0"></div>
            
            <ContactButton 
              onClick={() => handleNavClick("contact")}
            />
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  )
}

export default FloatingNav 