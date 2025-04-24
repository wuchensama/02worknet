"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef, TouchEvent } from "react"
import localFont from "next/font/local"
import Link from "next/link"

// 使用与其他组件相同的字体
const songFont = localFont({
  src: "../../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 瀑布流图片组件
const MasonryImage = ({ src, index, onClick }: { src: string, index: number, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className="w-full mb-4 overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={src} 
        alt={`宝格丽75周年图片 ${index + 1}`}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
      />
    </motion.div>
  );
};

// 灯箱组件用于查看大图
const Lightbox = ({ 
  images, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[], 
  currentIndex: number, 
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // 处理滑动事件
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      onNext();
    }
    
    if (isRightSwipe) {
      onPrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative max-w-full max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img 
            key={currentIndex}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]} 
            alt={`放大图片 ${currentIndex + 1}`} 
            className="max-w-full max-h-[85vh] object-contain" 
          />
          
          {/* 左右切换按钮 */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* 关闭按钮 */}
          <button 
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* 图片计数 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// 宝格丽75周年项目详情页面
export default function BvlgariProject() {
  // 视频播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // 图片数组
  const images = [
    "/images/baogeli75liuyifei/B3A14EDB-3B1B-4C8E-8130-6264211D70B9_1_105_c.jpeg",
    "/images/baogeli75liuyifei/EB39F360-8044-4477-8B1A-234F9A72F67A_1_105_c.jpeg",
    "/images/baogeli75liuyifei/7B312ACF-9A15-4CDF-9A98-A360FE44E5F4_1_105_c.jpeg",
    "/images/baogeli75liuyifei/B297AD58-530F-4D2D-BF0B-2329752D47B7_1_105_c.jpeg",
    "/images/baogeli75liuyifei/3F9DBFFE-BFE6-43E1-BD1A-75CB03137CFE_1_105_c.jpeg",
    "/images/baogeli75liuyifei/85B30B02-B45A-4262-BF77-49513256EECB_1_105_c.jpeg",
  ];
  
  // 分成两列显示
  const leftColumnImages = images.filter((_, i) => i % 2 === 0);
  const rightColumnImages = images.filter((_, i) => i % 2 === 1);
  
  // 打开/关闭灯箱
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
  };
  
  // 切换图片
  const goToPrevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // 找到图片在完整数组中的索引
  const getFullImageIndex = (columnIndex: number, isRightColumn: boolean) => {
    if (isRightColumn) {
      return columnIndex * 2 + 1;
    }
    return columnIndex * 2;
  };
  
  return (
    <section className={`relative min-h-screen w-full py-12 overflow-hidden bg-[#0a0a0a] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 - 与首页保持一致的设计 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] right-0 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-purple-500/20 via-amber-600/10 to-transparent blur-[120px] opacity-60" />
        <div className="absolute -bottom-[30%] left-0 w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-purple-700/10 via-amber-500/5 to-transparent blur-[100px] opacity-40" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-4xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white/90 leading-tight mb-4">
            宝格丽75周年&刘亦菲
          </h1>
          <p className="text-white/60 font-song text-lg md:text-xl max-w-3xl">
            宝格丽 75 周年灵蛇展：璀璨之夜，星耀灵蛇
          </p>
        </motion.div>
        
        {/* 视频部分 - 第一个视频 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
            <video 
              src="/images/baogeli75liuyifei/baogeli01.mp4"
              poster="/images/baogeli75liuyifei/B3A14EDB-3B1B-4C8E-8130-6264211D70B9_1_105_c.jpeg"
              controls
              autoPlay
              playsInline
              loop
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </motion.div>
        
        {/* 正文内容 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 max-w-none tracking-wide"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-song">
              踏入BVLGARI 75 周年灵蛇展的现场，仿若进入一个被灵蛇元素编织的奢华梦境。从场馆入口蜿蜒盘旋的灵蛇雕塑，到展厅内陈列的灵蛇主题珠宝，每一处细节都诉说着宝格丽与灵蛇文化跨越时空的不解之缘，彰显着品牌大胆华丽、独具匠心的风格。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-song">
              作为受邀嘉宾，我有幸见证了这场星光熠熠的盛典。当 "神仙姐姐" 刘亦菲身着一袭优雅礼服，佩戴着宝格丽灵蛇系列珠宝款款走来时，全场瞬间被点亮。她的美与宝格丽珠宝的璀璨交相辉映，将灵蛇的神秘魅惑与女性的柔美坚韧完美融合，让人不禁屏息赞叹。正如她所言，宝格丽的风格华丽而大胆，迸发的力量呼之欲出，将女性多面迷人的魅力展现得淋漓尽致。而她也凭借出众的气质与魅力，当之无愧地被官宣成为宝格丽全球代言人，这一组合，堪称天作之合。
            </p>
          </div>
        </motion.div>
        
        {/* 第二个视频 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
            <video 
              src="/images/baogeli75liuyifei/01e41c7009b6520c01037103870f15fd9e_258.mp4"
              controls
              playsInline
              muted
              loop
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </motion.div>
        
        {/* 继续正文内容 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 max-w-none tracking-wide"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-song">
              杨洋的现身同样引发热烈欢呼。他佩戴宝格丽男士珠宝，举手投足间尽显优雅绅士风范，硬朗帅气的形象与宝格丽珠宝的精致奢华相得益彰，诠释出宝格丽珠宝在男性魅力塑造上的独特魅力。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 font-song">
              在这场盛大的灵蛇展中，200 多件宝格丽灵蛇主题珠宝作品陈列其中，每一件都凝聚着匠人的精湛工艺与创意巧思。灵蛇造型或缠绕于腕间，或盘踞于颈上，灵动的姿态、闪耀的宝石，仿佛赋予了珠宝鲜活的生命力，诉说着一段段关于宝格丽的传奇故事。宝格丽品牌方精心安排的互动环节与高端晚宴，更是让整场活动锦上添花。在觥筹交错间，与众多时尚名流畅谈宝格丽的魅力，感受着品牌 75 年来的深厚底蕴与创新精神。
            </p>
          </div>
        </motion.div>
        
        {/* 图片瀑布流 - 两列布局 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-8 text-center font-song">Photography</h2>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* 左列 */}
            <div className="flex flex-col">
              {leftColumnImages.map((src, idx) => (
                <MasonryImage 
                  key={`left-${idx}`} 
                  src={src} 
                  index={idx} 
                  onClick={() => openLightbox(getFullImageIndex(idx, false))}
                />
              ))}
            </div>
            
            {/* 右列 */}
            <div className="flex flex-col">
              {rightColumnImages.map((src, idx) => (
                <MasonryImage 
                  key={`right-${idx}`} 
                  src={src} 
                  index={idx} 
                  onClick={() => openLightbox(getFullImageIndex(idx, true))}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* 底部导航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex justify-between items-center pt-10 border-t border-white/10"
        >
          <Link href="/" className="flex items-center text-white/60 hover:text-white transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span>返回首页</span>
          </Link>
          
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} 摄影师嘉阳
          </div>
        </motion.div>
      </div>
      
      {/* 灯箱 */}
      {showLightbox && (
        <Lightbox 
          images={images} 
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrev={goToPrevImage}
          onNext={goToNextImage}
        />
      )}

      {/* 固定在左下角的返回按钮 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed left-6 bottom-6 z-50"
      >
        <Link 
          href="/#brand-projects" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M11 17l-5-5m0 0l5-5m-5 5h12" 
            />
          </svg>
        </Link>
      </motion.div>
    </section>
  )
} 