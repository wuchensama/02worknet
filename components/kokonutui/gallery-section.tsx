"use client"

import { useState, useRef, useEffect } from "react"
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
  id: number;
  title: string;
  description: string;
  category: string;
  src: string;
  orientation?: 'portrait' | 'landscape'; // 图片方向，默认为"portrait"（竖屏）
}

// 图片预加载和方向检测函数
const detectImageOrientation = (src: string): Promise<'portrait' | 'landscape'> => {
  return new Promise((resolve) => {
    const img = new globalThis.Image();
    img.onload = () => {
      // 如果宽度大于高度，则为横屏图片，否则为竖屏图片
      resolve(img.width > img.height ? 'landscape' : 'portrait');
    };
    img.onerror = () => {
      // 加载失败时默认为竖屏
      resolve('portrait');
    };
    img.src = src;
  });
};

// 图片幻灯片导航按钮
function SlideNavButton({ direction, onClick, disabled }: { direction: 'prev' | 'next', onClick: () => void, disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        "bg-black/30 backdrop-blur-sm border border-white/10",
        "text-white/70 hover:text-white transition-colors",
        "focus:outline-none",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {direction === 'prev' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

// 缩略图组件
function Thumbnail({ image, isActive, onClick }: { image: GalleryImage, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300",
        "h-16 md:h-20",
        isActive ? "ring-2 ring-orange-500 opacity-100" : "opacity-60 hover:opacity-80"
      )}
      onClick={onClick}
    >
      {/* 占位渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      
      {/* 图片（实际项目中替换为真实图片） */}
      {image.src && (
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{backgroundImage: `url(${image.src})`}} 
        />
      )}
    </div>
  );
}

// 过滤分类标签
function CategoryFilter({ category, isActive, onClick }: { category: string, isActive: boolean, onClick: () => void }) {
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
}

// 艺术写真作品图库组件
export default function GallerySection() {
  // 示例图片集（在实际项目中可以替换为真实数据）
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    { id: 1, title: "时尚人像", description: "城市风格时尚人像摄影", category: "人像", src: "/images/1Q3A8728.jpg" },
    { id: 2, title: "自然风光", description: "山水之间的自然之美", category: "风景", src: "/images/landscape1.jpg" },
    { id: 3, title: "光影探索", description: "光与影的艺术表达", category: "创意", src: "/images/creative1.jpg" },
    { id: 4, title: "建筑风格", description: "城市建筑的几何美学", category: "建筑", src: "/images/architecture1.jpg" },
    { id: 5, title: "街头掠影", description: "城市街头的瞬间捕捉", category: "人像", src: "/images/portrait2.jpg" },
    { id: 6, title: "海景日落", description: "海边日落的绚丽色彩", category: "风景", src: "/images/landscape2.jpg" },
    { id: 7, title: "抽象构成", description: "色彩与形状的抽象表达", category: "创意", src: "/images/creative2.jpg" },
    { id: 8, title: "古典建筑", description: "古典建筑的历史之美", category: "建筑", src: "/images/architecture2.jpg" },
  ]);

  // 预加载图片并检测方向
  useEffect(() => {
    const detectOrientations = async () => {
      const updatedImages = await Promise.all(
        galleryImages.map(async (image) => {
          if (!image.orientation && image.src) {
            const orientation = await detectImageOrientation(image.src);
            return { ...image, orientation };
          }
          return image;
        })
      );
      setGalleryImages(updatedImages);
    };

    detectOrientations();
  }, []);

  // 所有分类
  const categories = ["全部", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  // 状态管理
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);
  
  // 处理分类过滤
  useEffect(() => {
    if (activeCategory === "全部") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
    setActiveIndex(0); // 重置当前活动图片索引
  }, [activeCategory, galleryImages]);
  
  // 导航控制
  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : prev));
  };
  
  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredImages.length]);
  
  // 获取当前活动图片
  const activeImage = filteredImages[activeIndex];
  
  return (
    <section className={`relative w-full py-24 overflow-hidden bg-[#000000] ${songFont.variable} ${violaFont.variable}`}>
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
          className="mb-16 md:mb-20 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-4">
            艺术写真作品
          </h2>
          <p className="text-white/60 font-song text-sm md:text-base">
            通过镜头捕捉瞬间，用光影讲述故事，每一帧都是独特的艺术表达
          </p>
        </motion.div>
        
        {/* 分类过滤栏 */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((category, index) => (
            <CategoryFilter
              key={index}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
        
        {/* 主图片展示区 */}
        <div className="max-w-5xl mx-auto">
          {/* 根据图片方向动态调整容器，但不限制其大小 */}
          <div 
            className={cn(
              "relative w-full overflow-hidden rounded-xl bg-black/20 mb-6 flex items-center justify-center",
              // 移除固定宽高比，使用弹性布局
              "transition-all duration-500 min-h-[300px] md:min-h-[500px]"
            )}
          >
            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-full h-full"
                >
                  {/* 占位背景（实际项目中替换为真实图片） */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  
                  {/* 图片（使用实际图片大小） */}
                  {activeImage.src && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={activeImage.src}
                        alt={activeImage.title}
                        className={cn(
                          "max-h-full max-w-full object-contain z-10",
                          "transition-all duration-500"
                        )}
                      />
                      
                      {/* 图片信息覆盖 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                        <span className="text-orange-400 text-sm mb-2">{activeImage.category}</span>
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{activeImage.title}</h3>
                        <p className="text-white/70 text-sm md:text-base font-song">{activeImage.description}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* 导航按钮 */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
              <SlideNavButton 
                direction="prev" 
                onClick={handlePrev} 
                disabled={activeIndex === 0} 
              />
              <SlideNavButton 
                direction="next" 
                onClick={handleNext} 
                disabled={activeIndex === filteredImages.length - 1} 
              />
            </div>
          </div>
          
          {/* 缩略图滑条 */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredImages.map((image, index) => (
              <Thumbnail
                key={image.id}
                image={image}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* 相片数量统计 */}
        <div className="text-center mt-8 text-white/50 text-sm">
          {filteredImages.length > 0 ? (
            <p>当前展示 {activeIndex + 1} / {filteredImages.length} 张照片</p>
          ) : (
            <p>没有找到符合条件的照片</p>
          )}
        </div>
      </div>
    </section>
  );
} 