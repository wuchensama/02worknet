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
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                    <span className="text-orange-400 text-sm mb-2">{image.category}</span>
                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{image.alt}</h3>
                  </div>
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
        isActive ? "ring-2 ring-orange-500 opacity-100" : "opacity-60 hover:opacity-80"
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
  const [activeCategory, setActiveCategory] = useState("全部");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 加载图片数据
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        // 调用API获取照片
        let apiUrl = '/api/photos';
        if (activeCategory !== "全部") {
          // 转换分类名称为英文路径
          const categoryMap: Record<string, string> = {
            "明星": "stars",
            "博主": "bloggers",
            "创作": "creative",
            "花絮": "scenes",
            "全部": "all"
          };
          
          const categoryPath = categoryMap[activeCategory] || activeCategory.toLowerCase();
          apiUrl += `?category=${categoryPath}`;
        }
        
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
  }, [activeCategory]);
  
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
  
  // 所有分类
  const categories = ["全部", "明星", "博主", "创作", "花絮"];
  
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10 justify-center"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <CategoryFilter
                category={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* 主图片展示区 */}
        {isLoading ? (
          <div className="relative w-full overflow-hidden rounded-xl bg-black/20 mb-6 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : galleryImages.length > 0 ? (
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 主图预览 */}
            <div 
              className="relative w-full overflow-hidden rounded-xl bg-transparent mb-6 flex items-center justify-center transition-all duration-500 min-h-[300px] md:min-h-[80vh] cursor-pointer"
              onClick={openLightbox}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <div className="absolute inset-0 bg-transparent"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={currentImage?.src} 
                      alt={currentImage?.alt || "照片预览"} 
                      className="max-h-full max-w-full object-contain z-10 transition-all duration-500"
                      style={{
                        height: "100%",
                        width: "auto",
                        maxWidth: "100%",
                        objectFit: "contain"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                      <span className="text-orange-400 text-sm mb-2">{currentImage?.category}</span>
                      <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{currentImage?.alt}</h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* 左右导航按钮 */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                  disabled={!hasPrevImage}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                    !hasPrevImage && "opacity-30 cursor-not-allowed"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  disabled={!hasNextImage}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors focus:outline-none",
                    !hasNextImage && "opacity-30 cursor-not-allowed"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 缩略图导航 - 响应式瀑布流布局：手机4列，电脑5列，限制显示三排并添加渐隐效果 */}
            <div className="hidden md:block relative">
              {/* 电脑版 - 5列瀑布流 */}
              <div className="grid grid-cols-5 gap-3 mt-6" style={{ maxHeight: '330px', overflow: 'hidden' }}>
                {[0, 1, 2, 3, 4].map(columnIndex => (
                  <div key={columnIndex} className="flex flex-col gap-3">
                    {galleryImages
                      .filter((_, index) => index % 5 === columnIndex)
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
              {/* 渐隐蒙版 - 位于第三排的位置 */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="md:hidden relative">
              {/* 手机版 - 4列瀑布流 */}
              <div className="grid grid-cols-4 gap-1 mt-4" style={{ maxHeight: '260px', overflow: 'hidden' }}>
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
              {/* 渐隐蒙版 - 位于第三排的位置 */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 font-song">这个分类下暂时没有照片</p>
            <p className="text-white/40 text-sm mt-2">
              请将照片添加到 public/images/photo/{activeCategory === "全部" ? "all" : 
              activeCategory === "明星" ? "stars" : 
              activeCategory === "博主" ? "bloggers" : 
              activeCategory === "创作" ? "creative" : 
              "scenes"} 目录
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