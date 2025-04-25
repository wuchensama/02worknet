"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
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

// 定义作品集图片类型
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

// 分类标签组件
const CategoryFilter = ({ category, isActive, onClick }: { category: string, isActive: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm rounded-full transition-all duration-300",
        isActive
          ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
      )}
    >
      {category}
    </button>
  );
};

// 照片灯箱组件
const ImageLightbox = ({ 
  image, 
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
  current,
  total
}: { 
  image: GalleryImage | null, 
  isOpen: boolean,
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
  hasNext: boolean,
  hasPrev: boolean,
  current: number,
  total: number
}) => {
  if (!image) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-full overflow-hidden rounded-xl bg-transparent flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="absolute inset-0 bg-transparent"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="max-h-[80vh] max-w-full object-contain z-10 transition-all duration-500" 
                    style={{
                      height: "auto",
                      width: "auto",
                      maxHeight: "80vh",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* 导航按钮 */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                  !hasPrev && "opacity-30 cursor-not-allowed"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                  !hasNext && "opacity-30 cursor-not-allowed"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white/80 hover:text-white transition-colors"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* 图片计数 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-3 py-1 rounded-full text-sm">
              {current} / {total}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 预览缩略图
const ThumbnailImage = ({ 
  image, 
  isActive, 
  onClick 
}: { 
  image: GalleryImage, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300",
        isActive ? "opacity-100 brightness-110" : "opacity-50 hover:opacity-70"
      )}
      onClick={onClick}
      style={{ 
        aspectRatio: `${image.width} / ${image.height}`,
        width: '100%'
      }}
    >
      <img 
        src={image.src} 
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// 艺术写真作品图库组件
export default function GallerySection() {
  // 状态
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 加载图片数据
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        // 调用API获取照片 - 始终获取所有照片
        const apiUrl = '/api/photos';
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // 淡出当前图片
        if (galleryImages.length > 0) {
          setGalleryImages([]);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // 转换API数据到组件数据格式
        const mappedData = data.map((item: any) => ({
          id: item.id,
          src: item.src,
          alt: item.alt,
          category: convertCategoryName(item.category),
          width: item.width,
          height: item.height
        }));
        
        // 淡入新图片
        setGalleryImages(mappedData);
        setActiveIndex(0); // 重置索引
      } catch (error) {
        console.error("加载照片失败", error);
        // 如果API调用失败，使用默认数据
        setGalleryImages([
          { id: "1", src: "/images/1Q3A8728.jpg", alt: "时尚人像", category: "人像", width: 3, height: 4 },
          { id: "2", src: "/images/landscape1.jpg", alt: "自然风光", category: "风景", width: 16, height: 9 },
          { id: "3", src: "/images/creative1.jpg", alt: "光影探索", category: "创意", width: 4, height: 3 },
          { id: "4", src: "/images/architecture1.jpg", alt: "建筑风格", category: "建筑", width: 3, height: 4 },
          { id: "5", src: "/images/portrait2.jpg", alt: "街头掠影", category: "人像", width: 3, height: 4 },
          { id: "6", src: "/images/landscape2.jpg", alt: "海景日落", category: "风景", width: 16, height: 9 },
          { id: "7", src: "/images/creative2.jpg", alt: "抽象构成", category: "创意", width: 1, height: 1 },
          { id: "8", src: "/images/architecture2.jpg", alt: "古典建筑", category: "建筑", width: 3, height: 2 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotos();
  }, []);
  
  // 转换英文分类为中文分类
  const convertCategoryName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      "all": "全部",
      "stars": "明星",
      "bloggers": "博主",
      "creative": "创作",
      "scenes": "花絮"
    };
    
    return categoryMap[category] || category;
  };
  
  // 当前显示的图片
  const currentImage = galleryImages[activeIndex] || null;
  
  // 前后导航
  const hasPrevImage = activeIndex > 0;
  const hasNextImage = activeIndex < galleryImages.length - 1;
  
  const goToPrev = () => {
    if (hasPrevImage) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (hasNextImage) {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  // 打开/关闭灯箱
  const openLightbox = () => {
    setShowLightbox(true);
  };
  
  const closeLightbox = () => {
    setShowLightbox(false);
  };
  
  return (
    <section id="gallery" className={`relative w-full py-24 overflow-hidden bg-[#000000] ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 max-w-5xl mx-auto px-6 md:px-10 lg:px-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-2 h-16 rounded-full bg-gradient-to-b from-rose-400 to-rose-600"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 leading-tight">
              写真作品
            </h2>
          </div>
        </motion.div>
        
        {/* 主要内容 - 当前照片和略缩图 */}
        {!isLoading && galleryImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* 当前照片预览 */}
            <div
              className="relative w-full rounded-xl overflow-hidden mb-8 cursor-pointer"
              onClick={openLightbox}
              style={{
                height: "60vh",
                maxHeight: "600px"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/5 z-10"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={currentImage?.src || ''} 
                    alt={currentImage?.alt || ''} 
                    className="w-full h-full object-contain transition-transform duration-1000 hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* 导航按钮 */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                  disabled={!hasPrevImage}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                    !hasPrevImage && "opacity-0 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  disabled={!hasNextImage}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                    !hasNextImage && "opacity-0 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 电脑版 - 横向滚动略缩图 */}
            <div className="hidden md:flex overflow-x-auto scrollbar-hide space-x-2 pb-4">
              {galleryImages.map((image, index) => (
                <ThumbnailImage
                  key={image.id}
                  image={image}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            {/* 手机版 - 4列瀑布流 */}
            <div className="md:hidden relative">
              <div className="grid grid-cols-4 gap-1 mt-4" style={{ maxHeight: '400px', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[0, 1, 2, 3].map(columnIndex => (
                  <div key={columnIndex} className="flex flex-col gap-1">
                    {galleryImages
                      .filter((_, index) => index % 4 === columnIndex)
                      .map((image) => (
                        <ThumbnailImage
                          key={image.id}
                          image={image}
                          isActive={galleryImages.indexOf(image) === activeIndex}
                          onClick={() => setActiveIndex(galleryImages.indexOf(image))}
                        />
                      ))}
                  </div>
                ))}
              </div>
              <style jsx global>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* 渐隐蒙版 - 位于第四排的位置 */}
              <div className="absolute bottom-[-3px] left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 font-song">暂时没有照片</p>
            <p className="text-white/40 text-sm mt-2">
              请将照片添加到 public/images/photo 目录
            </p>
          </div>
        )}
      </div>
      
      {/* 灯箱 */}
      <ImageLightbox 
        image={currentImage}
        isOpen={showLightbox}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
        hasPrev={hasPrevImage}
        hasNext={hasNextImage}
        current={activeIndex + 1}
        total={galleryImages.length}
      />
    </section>
  )
} 