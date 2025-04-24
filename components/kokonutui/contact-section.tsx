"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import { useState } from "react"

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
  
  // 微信复制状态
  const [copied, setCopied] = useState(false);
  
  // 复制微信号函数
  const copyWechat = () => {
    navigator.clipboard.writeText("wuchensama")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('复制失败: ', err);
      });
  };

  return (
    <section className={`relative w-full py-32 overflow-hidden bg-[#0a0a0a] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-3 mix-blend-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
        {/* 联系方式部分 - 苹果风格设计 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-40"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 px-6 md:px-10 lg:px-16"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-2 h-16 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 leading-tight">
            联系我
          </h2>
            </div>
          </motion.div>

          {/* 精致卡片设计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 mx-6 md:mx-10 lg:mx-16 relative"
          >
            {/* 背景装饰元素 */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="grid md:grid-cols-2 overflow-hidden relative z-10">
              {/* 左侧：照片 */}
              <div className="aspect-square md:aspect-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5 z-10"></div>
                <motion.img 
                  src="/images/47F2EC35-5115-48BF-8E91-8A08C9B35726.JPG" 
                  alt="摄影师嘉阳" 
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-6 z-20 md:hidden">
                  <motion.h3 
                    className="text-xl font-medium text-white mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    嘉阳
                  </motion.h3>
                  <motion.p 
                    className="text-white/70 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    专业摄影师 / 视觉创意指导
                  </motion.p>
                </div>
              </div>
              
              {/* 右侧：联系信息 */}
              <div className="relative bg-white/[0.02] border-l border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.08] backdrop-blur-md z-0"></div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 h-full">
                  <motion.h3 
                    className="text-2xl font-medium text-white/90 mb-2 hidden md:block"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    嘉阳
                  </motion.h3>
                  <motion.p 
                    className="text-white/60 text-sm mb-10 hidden md:block"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    专业摄影师 / 视觉创意指导
                  </motion.p>
                  
                  {/* 手机版介绍文字 */}
                  <motion.p 
                    className="text-white/80 text-sm mb-6 md:hidden font-[var(--font-song)]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    “ 和我聊聊，开启创意视觉新探索。”
                  </motion.p>
                  
                  {/* 手机版按钮 */}
                  <div className="md:hidden grid grid-cols-2 gap-3 mb-4">
                    <motion.a 
                      href="mailto:jiayang2543697731@gmail.com"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center py-2.5 bg-white/5 rounded-full text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-white/80" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="relative z-10 text-sm">发送邮件</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.a>
                    
                    <motion.button
                      onClick={copyWechat}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center py-2.5 bg-white/5 rounded-full text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                    >
                      <svg className="h-4 w-4 mr-1.5 text-white/80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.69 11.52c-.47 0-.84-.38-.84-.86 0-.47.37-.85.84-.85.48 0 .84.38.84.85 0 .48-.37.86-.84.86zm4.34 0c-.47 0-.85-.38-.85-.86 0-.47.38-.85.85-.85.48 0 .84.38.84.85 0 .48-.36.86-.84.86zm2.24 5.67c-.36 0-.72-.07-1.08-.2l-1.1.57-.3-.9a4.8 4.8 0 01-1.98-3.83c0-2.66 2.13-4.81 4.76-4.81 2.62 0 4.76 2.15 4.76 4.81 0 2.67-2.14 4.82-4.76 4.82zm-7.41-9.8c-3.18 0-5.76 2.59-5.76 5.8 0 1.79.84 3.38 2.16 4.43l-.4 1.18 1.34-.67c.67.17 1.38.25 2.1.25.15 0 .3 0 .44-.02a3.47 3.47 0 01-.12-.82c0-2.83 2.42-5.13 5.4-5.13.14 0 .28 0 .42.02-.37-3.03-3.05-5.4-6.14-5.4z" />
                      </svg>
                      <span className="relative z-10 text-sm">微信联系</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.button>
                  </div>
                  
                  {/* 已复制提示 */}
                  {copied && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-50 text-sm backdrop-blur-sm">
                      已复制微信号：wuchensama
                    </div>
                  )}
                  
                  {/* 电脑版联系信息 */}
                  <div className="hidden md:block space-y-6 mb-12">
                    <motion.div 
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 group-hover:text-white/80 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300">jiayang2543697731@gmail.com</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 group-hover:text-white/80 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300">+86 176 **** 0656</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                        <svg className="h-5 w-5 text-white/40 group-hover:text-white/80 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.69 11.52c-.47 0-.84-.38-.84-.86 0-.47.37-.85.84-.85.48 0 .84.38.84.85 0 .48-.37.86-.84.86zm4.34 0c-.47 0-.85-.38-.85-.86 0-.47.38-.85.85-.85.48 0 .84.38.84.85 0 .48-.36.86-.84.86zm2.24 5.67c-.36 0-.72-.07-1.08-.2l-1.1.57-.3-.9a4.8 4.8 0 01-1.98-3.83c0-2.66 2.13-4.81 4.76-4.81 2.62 0 4.76 2.15 4.76 4.81 0 2.67-2.14 4.82-4.76 4.82zm-7.41-9.8c-3.18 0-5.76 2.59-5.76 5.8 0 1.79.84 3.38 2.16 4.43l-.4 1.18 1.34-.67c.67.17 1.38.25 2.1.25.15 0 .3 0 .44-.02a3.47 3.47 0 01-.12-.82c0-2.83 2.42-5.13 5.4-5.13.14 0 .28 0 .42.02-.37-3.03-3.05-5.4-6.14-5.4z" />
                  </svg>
                </div>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300">微信：wuchensama</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 group-hover:text-white/80 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300">杭州市滨江区长河路</span>
                    </motion.div>
                  </div>
                  
                  {/* 电脑版按钮 */}
                  <div className="hidden md:block space-y-4">
                    <motion.a 
                      href="mailto:jiayang2543697731@gmail.com"
                      whileHover={{ scale: 1.02, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center w-full py-4 bg-white/5 rounded-full text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">发送邮件</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.a>
                    
                    <motion.button
                      onClick={copyWechat}
                      whileHover={{ scale: 1.02, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center w-full py-4 bg-white/5 rounded-full text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">微信联系</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* 数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 justify-center mb-12 mt-16"
        >
          <div className="text-white/70 text-sm md:text-base bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
            服务超过<span className="font-medium text-white ml-1">15个国际品牌</span>
          </div>
        </motion.div>
        
        {/* 品牌Logo墙 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mt-8 mb-16"
        >
          {/* 使用特定的手机版布局 - 每行5个logo，交错排列，3行，只对手机版有效 */}
          <div className="grid grid-cols-5 md:hidden gap-4 mb-8">
            {/* 第一行 - 5个logo */}
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/louis-vuitton@logotyp.us.svg" 
                alt="LV" 
                className="h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/chanel@logotyp.us.svg" 
                alt="CHANEL" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/dior@logotyp.us.svg" 
                alt="DIOR" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/tiffany@logotyp.us.svg" 
                alt="TIFFANY" 
                className="h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/76cb5526-40d5-4e46-b45c-a4f0be4962c4.png" 
                alt="TONYWORD" 
                className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>

            {/* 第二行 - 5个logo，稍微缩进 */}
            <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300 ml-2">
              <img 
                src="/images/logos/bf9fae69-f6e6-401c-887a-99c42a98a6be.png" 
                alt="ROGER VIVIER" 
                className="h-10 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-14 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/35d825f3-90a5-4da1-a9f9-563b8c8f0472.png" 
                alt="VALENTINO" 
                className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/armani-jeans@logotyp.us.svg" 
                alt="ARMANI" 
                className="h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/52e99263-dbc7-44ce-b7e7-4d9028994589.png" 
                alt="BALMAIN" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300 mr-2">
              <img 
                src="/images/logos/afe58897-476a-404d-854a-861109be210d.png" 
                alt="CHAUMET" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>

            {/* 第三行 - 5个logo */}
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/3a276e2d-9325-440f-8253-e47aee080d0e.png" 
                alt="ELIE SAAB" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/db52e183-4b7b-4ea5-ae12-35d38f87f549.png" 
                alt="YSL" 
                className="h-7 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/23d859cf-cca5-4b97-85b9-92bb548c2922.png" 
                alt="ERMANNO" 
                className="h-10 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/3293f9bd-2daa-4d76-9f94-fa574a3bef10.png" 
                alt="GRAFF" 
                className="h-10 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
              />
            </div>
            <div className="flex items-center justify-center h-10 hover:scale-110 transition-all duration-300">
              <img 
                src="/images/logos/cartier@logotyp.us.svg" 
                alt="CARTIER" 
                className="h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
          </div>
          
          {/* 保留原来的桌面版布局 - 对手机版隐藏 */}
          <div className="hidden md:block">
            {/* Logo容器-第一行 */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-10 mb-10">
              {/* 第一行品牌logo */}
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/louis-vuitton@logotyp.us.svg" 
                  alt="LV" 
                  className="h-9 md:h-10 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/chanel@logotyp.us.svg" 
                  alt="CHANEL" 
                  className="h-8 md:h-9 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/dior@logotyp.us.svg" 
                  alt="DIOR" 
                  className="h-8 md:h-9 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/tiffany@logotyp.us.svg" 
                  alt="TIFFANY" 
                  className="h-10 md:h-11 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/76cb5526-40d5-4e46-b45c-a4f0be4962c4.png" 
                  alt="TONYWORD" 
                  className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/bf9fae69-f6e6-401c-887a-99c42a98a6be.png" 
                  alt="ROGER VIVIER" 
                  className="h-16 md:h-19 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/35d825f3-90a5-4da1-a9f9-563b8c8f0472.png" 
                  alt="VALENTINO" 
                  className="h-18 md:h-21 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/armani-jeans@logotyp.us.svg" 
                  alt="ARMANI" 
                  className="h-18 md:h-20 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            </div>
            
            {/* Logo容器-第二行 */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6 md:gap-10">
              {/* 第二行品牌logo */}
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/52e99263-dbc7-44ce-b7e7-4d9028994589.png" 
                  alt="BALMAIN" 
                  className="h-10 md:h-12 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/afe58897-476a-404d-854a-861109be210d.png" 
                  alt="CHAUMET" 
                  className="h-7 md:h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/3a276e2d-9325-440f-8253-e47aee080d0e.png" 
                  alt="ELIE SAAB" 
                  className="h-8 md:h-10 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-12 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/db52e183-4b7b-4ea5-ae12-35d38f87f549.png" 
                  alt="YSL" 
                  className="h-7 md:h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-16 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/23d859cf-cca5-4b97-85b9-92bb548c2922.png" 
                  alt="ERMANNO" 
                  className="h-15 md:h-18 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-16 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/3293f9bd-2daa-4d76-9f94-fa574a3bef10.png" 
                  alt="GRAFF" 
                  className="h-15 md:h-18 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" 
                />
              </div>
              <div className="flex items-center justify-center h-16 hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/cartier@logotyp.us.svg" 
                  alt="CARTIER" 
                  className="h-11 md:h-13 w-auto invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 服务类别部分 - 三列排版 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-6 md:pt-12 pb-4 md:pb-8 border-t border-white/10"
        >
          {/* 标题部分 - 左对齐 */}
          <div className="mb-10 px-6 md:px-10 lg:px-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 leading-tight mb-3 md:mb-4 text-left pl-[25px]">
                服务
              </h2>
            <p className="text-white/60 text-sm md:text-base mb-0 text-left pl-[25px]">
              提供专业的视觉内容创作服务
              </p>
            </div>
            
          {/* 三列服务类别 - 所有文字居中对齐 */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-16 px-6 md:px-10 lg:px-16">
            {/* 左列 - 文字居中 */}
            <div className="flex flex-col items-center">
              <h5 className="text-sm md:text-lg text-white/90 font-medium mb-4 md:mb-6 text-center">品牌视觉</h5>
              <ul className="space-y-2 md:space-y-3 text-center">
                <li className="text-white/60 text-[10px] md:text-sm">品牌形象片</li>
                <li className="text-white/60 text-[10px] md:text-sm">时尚摄影</li>
                <li className="text-white/60 text-[10px] md:text-sm">产品摄影</li>
                <li className="text-white/60 text-[10px] md:text-sm">视觉策划</li>
                </ul>
              </div>

            {/* 中列 - 文字居中 */}
            <div className="flex flex-col items-center">
              <h5 className="text-sm md:text-lg text-white/90 font-medium mb-4 md:mb-6 text-center">短视频拍摄</h5>
              <ul className="space-y-2 md:space-y-3 text-center">
                <li className="text-white/60 text-[10px] md:text-sm">抖音短视频</li>
                <li className="text-white/60 text-[10px] md:text-sm">自媒体Vlog</li>
                <li className="text-white/60 text-[10px] md:text-sm">社交媒体内容</li>
                <li className="text-white/60 text-[10px] md:text-sm">达人账号孵化</li>
                </ul>
              </div>
              
            {/* 右列 - 文字居中 */}
            <div className="flex flex-col items-center">
              <h5 className="text-sm md:text-lg text-white/90 font-medium mb-4 md:mb-6 text-center">技术服务</h5>
              <ul className="space-y-2 md:space-y-3 text-center">
                <li className="text-white/60 text-[10px] md:text-sm">后期调色</li>
                <li className="text-white/60 text-[10px] md:text-sm">航拍服务</li>
                <li className="text-white/60 text-[10px] md:text-sm">电影级拍摄</li>
                <li className="text-white/60 text-[10px] md:text-sm">视觉创意指导</li>
                </ul>
            </div>
          </div>
        </motion.div>
        
        {/* 底部信息 */}
        <div className="mt-16 text-center border-t border-white/10 pt-6">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} 摄影师嘉阳. 保留所有权利. | © Photographer Jeyon.
          </p>
        </div>
      </div>
    </section>
  )
} 