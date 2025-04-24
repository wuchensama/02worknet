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
        alt={`CHAUMET巴黎晚宴图片 ${index + 1}`}
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

// CHAUMET巴黎晚宴项目详情页面
export default function ChaumetProject() {
  // 视频播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // 图片数组
  const images = [
    "/images/chaumet/c96a842fdf944da79dd869cca785381e~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
    "/images/chaumet/FB41BCD6-EB54-479D-94CA-333F25B050D8_1_105_c.jpeg",
    "/images/chaumet/1F7C2B39-7550-47E8-A5BD-26C6B2E8BA20_1_105_c.jpeg",
    "/images/chaumet/9751D4C6-4F05-412F-BD06-22FD6E42693B_1_105_c.jpeg",
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
            巴黎 CHAUMET 晚宴
          </h1>
          <p className="text-white/60 font-song text-lg md:text-xl max-w-3xl">
            星光与珠宝的绮梦之约
          </p>
        </motion.div>
        
        {/* 视频部分 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
            <video 
              src="/images/chaumet/chaumet01.mp4"
              poster="/images/chaumet/c96a842fdf944da79dd869cca785381e~tplv-dy-resize-walign-adapt-aq_540_q75.webp"
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
              踏入巴黎 Bagatelle 的巴加特勒城堡，仿佛瞬间穿越进一个被珠宝与星光交织的梦幻世界，这里正在举办 CHAUMET 尚美巴黎的盛大晚宴。这座新古典风格的城堡，自 1905 年马赛尔・普鲁斯特组织派对后，在漫长岁月里一直保持宁静，此次为 CHAUMET 的活动场地，重新焕发出迷人光彩，正规的法国花园、玫瑰园和橘园，都成为了这场盛宴的绝美背景。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-song">
              作为受邀嘉宾，我置身于这场群星荟萃的盛会之中。现场汇聚了来自全球的 VIC 客户，大家一同漫步在绮丽的自然景致间，欣赏 CHAUMET 全新 Le Jardin de CHAUMET 系列珠宝的璀璨风姿。每一件珠宝都宛如一件稀世艺术品，承载着 CHAUMET 作为自然主义珠宝匠的深厚历史渊源。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-song">
              晚宴现场，星光熠熠。高圆圆优雅现身，她佩戴的 CHAUMET 珠宝与自身气质完美融合，尽显东方女性的温婉与高贵；车银优的帅气脸庞在珠宝映衬下更加夺目，散发着独属于少年的青春魅力；宋慧乔则展现出一如既往的优雅甜美，CHAUMET 珠宝为她增添了几分神秘的奢华感。他们的到来，让整个晚宴氛围更加热烈。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 font-song">
              活动中，我们细细聆听 CHAUMET 的故事，感受品牌在历史长河中传承的匠心与创新。全新系列珠宝与城堡的布置交相辉映，在灯光与自然景色的衬托下，璨然涌动，如同一场珠宝与艺术的对话，揭开了 CHAUMET 发展历程中的崭新篇章。这场晚宴不仅是一场珠宝的视觉盛宴，更是一次深入探索 CHAUMET 文化魅力的难忘之旅，让人沉醉其中，流连忘返。
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