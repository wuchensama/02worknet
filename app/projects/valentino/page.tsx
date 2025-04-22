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
        alt={`Valentino高定展图片 ${index + 1}`}
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

// Valentino项目详情页面
export default function ValentinoProject() {
  // 视频播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // 图片数组
  const images = [
    "/images/kataer01/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg",
    "/images/kataer01/9A5F4B24-1911-48F6-B6A2-9C563B391781_1_105_c.jpeg",
    "/images/kataer01/BE9972EE-4F03-4311-927C-708F62CCED56_1_105_c.jpeg",
    "/images/kataer01/E32AD3DD-4BD3-4290-8DDB-A49A893331E8_1_105_c.jpeg",
    "/images/kataer01/C840D2A9-EB52-47AC-BB32-7563DED90FA0_1_105_c.jpeg",
    "/images/kataer01/7B027E22-EE09-488D-BC39-056A7048CAC8.jpeg",
    "/images/kataer01/E0B19C99-44DF-452B-8138-0B792B5D73C3.jpeg",
    "/images/kataer01/FD1331CB-EE8D-4256-893C-ED6FF1288400_1_105_c.jpeg",
    "/images/kataer01/5A37165B-EA91-42D6-B43A-FB4A5A16B2FB_1_105_c.jpeg",
    "/images/kataer01/7B016585-B05B-4E81-B233-40EA40F13E07_1_105_c.jpeg",
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
        <div className="absolute -top-[30%] right-0 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-rose-500/20 via-amber-600/10 to-transparent blur-[120px] opacity-60" />
        <div className="absolute -bottom-[30%] left-0 w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-rose-700/10 via-amber-500/5 to-transparent blur-[100px] opacity-40" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 - 直接从这里开始 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white/90 leading-tight mb-4">
            Vanlentino高定展
          </h1>
          <p className="text-white/60 font-song text-lg md:text-xl max-w-3xl">
            在卡塔尔多哈体验不一样的奢华
          </p>
        </motion.div>
        
        {/* 视频部分 - 优化为更明显的位置 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
            <video 
              src="/images/kataer01/valentino.mp4"
              poster="/images/kataer01/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg"
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
              卡塔尔王妃御用的"华伦天奴"真的让人爱不释手、这次受邀出席多哈的华伦天奴高定展、200多件的高定作品让我目不暇接、这些裙子似乎都会说话、每一件裙子都有一段故事、或浪漫、或唯美、或天马行空、总之充满着无限可能，也让我叹为观止。
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 font-song">
              Vanlentino品牌方的安排除了细致周到外，还有就是专属卡塔尔国家的"豪横"，只有皇室可用的豪华餐厅举行晚宴、意大利最顶级的接待团队，还有……关于华伦天奴未完待续的故事
            </p>
          </div>
        </motion.div>
        
        {/* 图片瀑布流 - 两列布局 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
        
        {/* 底部导航 - 保留返回首页按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
    </section>
  )
} 