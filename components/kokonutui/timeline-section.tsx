"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
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

// 示例经历数据
const experiences = [
  { year: "2017", title: "职业生涯起点", description: "开始专业摄影之旅，探索视觉创作的无限可能" },
  { year: "2018", title: "首个品牌合作", description: "与国内知名时尚品牌合作，开启商业摄影生涯" },
  { year: "2019", title: "技术突破", description: "获得达芬奇调色认证，掌握专业后期制作流程" },
  { year: "2020", title: "国际视野", description: "首次与国际奢侈品牌合作，作品登上海外媒体" },
  { year: "2021", title: "明星合作", description: "与多位一线明星合作拍摄，作品获广泛关注" },
  { year: "2022", title: "技术升级", description: "引入电影级设备，提升作品质感与表现力" },
  { year: "2023", title: "品牌孵化", description: "开始为品牌提供从0到1的视觉策略与内容创作" },
];

const GlowElement = ({ size = 400, color = "indigo", delay = 0 }: { size?: number, color?: string, delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none will-change-transform`}
    style={{ 
      width: size, 
      height: size, 
      background: `radial-gradient(circle, ${color === "indigo" ? "#4F46E5" : "#EC4899"} 0%, rgba(0,0,0,0) 70%)`,
      transform: 'translateZ(0)', // 添加硬件加速
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 0.3, delay }}
  />
);

// 时间点组件 - 刻度尺样式
function TimelineYearMark({
  year,
  index,
  isActive,
  isHovered,
  activeYear,
  onClick,
}: {
  year: number;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  activeYear: number;
  onClick: () => void;
}) {
  // 计算年份距离当前激活年份的距离
  const distance = Math.abs(index - activeYear);
  // 基于距离计算透明度
  const opacity = 1 - Math.min(distance * 0.25, 0.9);
  // 计算缩放比例
  const scale = isActive ? 1 : Math.max(0.6, 1 - distance * 0.1);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-start cursor-pointer transition-transform",
        isActive ? "text-white" : "text-white/50",
      )}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)', // 添加硬件加速
      }}
      onClick={onClick}
    >
      {/* 刻度线 */}
      <motion.div
        className={cn("h-8 w-1 rounded-full mx-5 mb-2",
          isActive ? "bg-indigo-400" : "bg-white/30"
        )}
        animate={{
          opacity: isActive ? 1 : isHovered ? 0.8 : opacity,
          scale: isActive ? 1 : isHovered ? 0.9 : scale,
          backgroundColor: isActive 
            ? "rgb(129, 140, 248)" 
            : isHovered 
              ? "rgb(199, 210, 254)" 
              : "rgb(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* 年份文字 */}
      <motion.span
        className={cn(
          "text-lg font-medium transition-colors",
          isActive ? "text-indigo-400" : "text-white/60"
        )}
        animate={{
          opacity: isActive ? 1 : isHovered ? 0.9 : opacity,
          scale: isActive ? 1.05 : isHovered ? 1 : scale,
          color: isActive 
            ? "rgb(129, 140, 248)" 
            : isHovered 
              ? "rgb(255, 255, 255, 0.8)" 
              : "rgb(255, 255, 255, 0.6)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {year}
      </motion.span>
    </div>
  );
}

// 内容卡片组件
function ContentCard({
  experience,
  index,
  activeYear,
  isMobile,
}: {
  experience: Experience;
  index: number;
  activeYear: number;
  isMobile: boolean;
}) {
  // 计算当前卡片的位置状态
  const isPast = index < activeYear;
  const isCurrent = index === activeYear;
  const isFuture = index > activeYear;
  
  // 计算与当前激活年份的距离
  const distance = Math.abs(index - activeYear);
  const opacity = distance === 0 ? 1 : Math.max(0.4, 1 - distance * 0.3);
  const scale = distance === 0 ? 1 : Math.max(0.85, 1 - distance * 0.05);

  // 使用memo缓存styles以提高性能
  const cardStyles = useMemo(() => ({
    opacity,
    scale,
    willChange: 'transform, opacity',
    transform: 'translateZ(0)', // 添加硬件加速
  }), [opacity, scale]);

  return (
    <motion.div
      className={cn(
        "rounded-2xl max-w-xl mx-auto shadow-lg transition-colors relative overflow-hidden mb-8",
        isCurrent
          ? "bg-gradient-to-br from-indigo-900/80 to-black/80 border border-indigo-500/40"
          : "bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800/40 hover:border-indigo-500/20"
      )}
      style={cardStyles}
      animate={{
        y: isCurrent ? -5 : 0,
      }}
      transition={{ 
        duration: isMobile ? 0.2 : 0.3, 
        ease: "easeOut" 
      }}
      whileHover={{
        scale: isMobile ? 1.01 : 1.03,
        transition: { duration: isMobile ? 0.1 : 0.2 }
      }}
      whileTap={{ scale: isMobile ? 1 : 0.98 }}
    >
      {/* 添加背景渐变效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
      
      <div className="flex flex-col p-5 md:p-6 space-y-4 relative z-20">
        <div className="flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center backdrop-blur-sm">
            <Icon name={experience.icon} className="w-6 h-6 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-white/90 mb-0.5">{experience.title}</h3>
            <p className="text-sm text-indigo-300">{experience.company}</p>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed ml-1">
          {experience.description}
        </p>
        {experience.link && (
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:text-indigo-200 text-sm inline-flex items-center transition-colors mt-1 ml-1"
          >
            查看作品
            <Icon name="arrow-right" className="w-4 h-4 ml-1.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// 定义 Experience 接口
interface Experience {
  year: number;
  title: string;
  company: string;
  description: string;
  icon: string;
  link?: string;
}

// 简单的 Icon 组件实现
const Icon = ({ name, className }: { name: string, className?: string }) => {
  // 简单实现，使用图标的名称作为内容
  return (
    <span className={className}>
      {name === "arrow-right" ? "→" : name}
    </span>
  );
};

// 时间线部分组件
export default function TimelineSection() {
  // 年份选中状态
  const [activeYear, setActiveYear] = useState(4); // 默认选中2021年（索引4）
  const [hoveredYear, setHoveredYear] = useState<number | null>(null); // 拖动时悬停的年份
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastDragX = useRef<number | null>(null);
  const dragSpeed = useRef(0);
  const dragTime = useRef(Date.now());
  const [isMobile, setIsMobile] = useState(false); // 添加移动设备检测状态
  const [isLowPerformance, setIsLowPerformance] = useState(false); // 添加低性能设备检测
  
  // 缓存experience数据以避免重新渲染
  const experiences = useMemo(() => [
    {
      year: 2017,
      title: "摄影爱好者",
      company: "大学社团",
      description: "开始接触摄影，购买了第一台单反相机，加入学校摄影社，学习基础摄影技巧和构图",
      icon: "camera",
    },
    {
      year: 2018,
      title: "校园摄影师",
      company: "校园媒体",
      description: "为校园活动提供摄影服务，作品发表在校园杂志和官网上",
      icon: "image",
    },
    {
      year: 2019,
      title: "自由摄影师",
      company: "个人工作室",
      description: "开始接单拍摄人像和产品摄影，建立个人作品集和品牌",
      icon: "user",
      link: "#",
    },
    {
      year: 2020,
      title: "商业摄影项目",
      company: "多个品牌合作",
      description: "与多个本地品牌合作，提供产品摄影和广告摄影服务",
      icon: "shopping-bag",
      link: "#",
    },
    {
      year: 2021,
      title: "风景摄影集出版",
      company: "地理杂志",
      description: "完成国内多地的风景摄影创作，作品被地理杂志收录并出版专辑",
      icon: "mountain",
      link: "#",
    },
    {
      year: 2022,
      title: "摄影艺术展",
      company: "城市艺术馆",
      description: "举办个人首次摄影艺术展，展出城市建筑和人文题材作品",
      icon: "museum",
      link: "#",
    },
    {
      year: 2023,
      title: "国际摄影比赛",
      company: "Sony世界摄影大赛",
      description: "参加国际摄影比赛并获得类别优胜奖，作品在多个国家巡展",
      icon: "award",
      link: "#",
    },
  ], []);

  // 滚动到中间的函数
  const scrollToCenter = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    // 使用requestAnimationFrame优化滚动性能
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const yearElements = container.querySelectorAll(".year-mark");
      if (yearElements.length <= index || index < 0) return;
      
      const yearElement = yearElements[index] as HTMLElement;
      if (!yearElement) return; // 添加检查确保元素存在
      
      const containerWidth = container.offsetWidth;
      const yearElementLeft = yearElement.offsetLeft;
      const yearElementWidth = yearElement.offsetWidth;
      
      // 计算使年份居中的滚动位置
      const scrollPosition = yearElementLeft - containerWidth / 2 + yearElementWidth / 2;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: isMobile ? "auto" : "smooth" // 移动设备上使用即时滚动，无过渡效果
      });
    });
  };

  // 获取当前拖动位置下的年份索引
  const getYearIndexAtPosition = (x: number) => {
    if (!scrollContainerRef.current) return activeYear;
    
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = activeYear;
    let closestDistance = Number.MAX_VALUE;
    
    yearRefs.current.forEach((yearRef, index) => {
      if (!yearRef) return;
      
      const yearRect = yearRef.getBoundingClientRect();
      const yearCenter = yearRect.left + yearRect.width / 2;
      const distance = Math.abs(containerCenter - yearCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  };

  // 处理拖动结束
  const handleDragEnd = () => {
    if (!scrollContainerRef.current) return;
    
    // 应用惯性滚动
    const now = Date.now();
    const elapsed = now - dragTime.current;
    
    if (elapsed < 100 && Math.abs(dragSpeed.current) > 1.5) {
      // 计算惯性滚动距离
      const momentum = dragSpeed.current * 10;
      const targetScroll = scrollContainerRef.current.scrollLeft - momentum;
      
      // 应用平滑滚动
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
      
      // 给惯性滚动一些时间再确定最终位置
      setTimeout(() => {
        determineActiveYear();
      }, 300);
    } else {
      determineActiveYear();
    }
    
    // 重置速度和时间
    dragSpeed.current = 0;
    lastDragX.current = null;
  };
  
  // 根据当前滚动位置确定激活的年份
  const determineActiveYear = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const containerCenter = container.scrollLeft + containerWidth / 2;
    
    // 找到最接近中心的年份
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;
    
    const yearElements = container.querySelectorAll(".year-mark");
    yearElements.forEach((yearElement, index) => {
      const el = yearElement as HTMLElement;
      if (!el) return; // 添加检查确保元素存在
      
      const yearCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(containerCenter - yearCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    // 更新选中的年份
    setActiveYear(closestIndex);
    setHoveredYear(null);
    // 滚动到中心
    scrollToCenter(closestIndex);
  };

  // 鼠标/触摸拖动处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    // 阻止默认行为，避免文本选择
    e.preventDefault();
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
    
    // 重置拖动数据
    lastDragX.current = e.pageX;
    dragTime.current = Date.now();
    dragSpeed.current = 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    
    // 阻止默认行为，避免滚动冲突
    e.preventDefault();
    
    setIsDragging(true);
    const touchX = e.touches[0].pageX;
    setStartX(touchX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // 重置拖动数据
    lastDragX.current = touchX;
    dragTime.current = Date.now();
    dragSpeed.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    // 阻止默认行为
    e.preventDefault();
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    // 减小滚动系数，从2减为1.2，使运动更平滑
    const walk = (x - startX) * 1.2;
    
    // 更新容器滚动位置
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // 计算拖动速度
    const now = Date.now();
    const elapsed = now - dragTime.current;
    
    if (lastDragX.current !== null && elapsed > 0) {
      dragSpeed.current = (lastDragX.current - e.pageX) / elapsed;
      dragTime.current = now;
      lastDragX.current = e.pageX;
    }
    
    // 更新当前悬停的年份 - 改为直接更新而不是使用节流
    const hoveredIndex = getYearIndexAtPosition(e.clientX);
    // 移除节流延迟，直接更新状态
    setHoveredYear(hoveredIndex);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    // 阻止默认行为，防止页面滚动
    e.preventDefault();
    
    const touchX = e.touches[0].pageX;
    const x = touchX - scrollContainerRef.current.offsetLeft;
    // 减小滚动系数，使运动更平滑
    const walk = (x - startX) * 1.2;
    
    // 更新容器滚动位置
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // 计算拖动速度
    const now = Date.now();
    const elapsed = now - dragTime.current;
    
    if (lastDragX.current !== null && elapsed > 0) {
      dragSpeed.current = (lastDragX.current - touchX) / elapsed;
      dragTime.current = now;
      lastDragX.current = touchX;
    }
    
    // 更新当前悬停的年份 - 改为直接更新而不是使用节流
    const hoveredIndex = getYearIndexAtPosition(touchX);
    // 移除节流延迟，直接更新状态
    setHoveredYear(hoveredIndex);
  };

  const handleDragStop = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = 'auto';
      
      // 处理拖动结束，包括惯性处理
      handleDragEnd();
    }
  };

  // 处理年份点击事件 - 选择或取消选择
  const handleYearClick = (index: number) => {
    // 如果已经是激活的年份，则取消选择（设置为-1表示没有选中）
    if (index === activeYear) {
      setActiveYear(-1);
      setHoveredYear(null);
    } else {
      // 否则选择点击的年份
      setActiveYear(index);
      setHoveredYear(null);
      scrollToCenter(index);
    }
  };

  // 修复滚动处理 - 确保在拖动结束和滚动时正确更新年份
  useEffect(() => {
    // 添加滚动事件监听器
    const handleScroll = () => {
      if (!isDragging && scrollContainerRef.current) {
        // 清除之前的定时器
        clearTimeout((scrollContainerRef.current as any)?.scrollTimer);
        // 设置新的定时器，延迟执行determineActiveYear
        (scrollContainerRef.current as any).scrollTimer = setTimeout(() => {
          determineActiveYear();
        }, 100);
      }
    };

    // 添加滚动事件监听
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      // 清除事件监听和定时器
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        clearTimeout((scrollContainerRef.current as any)?.scrollTimer);
      }
    };
  }, [isDragging]);

  // 组件挂载后滚动到默认选中的年份
  useEffect(() => {
    // 等待DOM渲染完成
    const timer = setTimeout(() => {
      if (activeYear >= 0) { // 确保activeYear有效
        scrollToCenter(activeYear);
      }
    }, 100);

    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 检测是否为低性能设备
    const checkPerformance = () => {
      // 检测设备性能的简单方法
      const isSlowDevice = 
        // 检查是否为移动设备
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        // 或窗口较小（可能是性能较低的设备）
        window.innerWidth < 600 ||
        // 或设备像素比较高但屏幕较小（如高分辨率手机）
        (window.devicePixelRatio > 2 && window.innerWidth < 1024);
      
      setIsLowPerformance(isSlowDevice);
    };
    
    // 初始检测
    checkMobile();
    checkPerformance();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      checkMobile();
      checkPerformance();
    });

    // 添加全局鼠标事件监听
    document.addEventListener('mouseup', handleDragStop, { passive: false });
    document.addEventListener('touchend', handleDragStop, { passive: false });
    
    // 添加窗口失焦事件处理，防止拖动状态卡住
    window.addEventListener('blur', handleDragStop);
    
    return () => {
      clearTimeout(timer); // 清除定时器
      document.removeEventListener('mouseup', handleDragStop);
      document.removeEventListener('touchend', handleDragStop);
      window.removeEventListener('blur', handleDragStop);
      window.removeEventListener('resize', checkMobile);
      
      // 清除定时器
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, [activeYear]);

  // 为低性能设备计算优化的动画参数
  const getOptimizedDuration = (baseDuration: number) => {
    if (isLowPerformance) return baseDuration * 0.5; // 减少50%的动画时间
    if (isMobile) return baseDuration * 0.7; // 减少30%的动画时间
    return baseDuration;
  };

  // 获取当前显示的年份（优先显示拖动中悬停的年份）
  const displayYear = hoveredYear !== null ? hoveredYear : activeYear;

  return (
    <section className={`relative w-full py-20 overflow-hidden ${songFont.variable} ${violaFont.variable}`}>
      {/* 背景渐变 - 更平滑的渐变过渡 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#080808]/90 to-[#0a0a0a]/80" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      
      {/* 上方融合过渡区 */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#080808]/95 pointer-events-none" />
      
      {/* 下方融合过渡区 - 增强与精选项目部分的融合 */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#0c0c0c] via-[#080808]/70 to-transparent pointer-events-none" />
      
      {/* 添加额外的深色底部融合层 */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0c0c0c] to-transparent opacity-90 pointer-events-none" />
      
      {/* 装饰元素组 - 重新排列位置并添加动画效果 */}
      {/* 右侧元素 */}
      <motion.div 
        className="absolute right-[-5%] md:right-[3%] top-[60%] md:top-[65%]" 
        style={{ opacity: 0.45 }}
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 0.45, x: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2
        }}
        whileInView={{
          y: [0, 3, -2, 4, 0],
          rotate: [-15, -14.5, -15.2, -14.8, -15]
        }}
        viewport={{ once: true }}
      >
        <div style={{ width: 450, height: 120 }} className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-rose-500/[0.15] backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
        </div>
      </motion.div>
      
      {/* 左上元素 */}
      <motion.div 
        className="absolute left-[-5%] md:left-[8%] top-[15%] md:top-[25%]" 
        style={{ opacity: 0.35 }}
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        animate={{ opacity: 0.35, x: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          delay: 0.5
        }}
        whileInView={{
          y: [0, 4, 1, -2, 0],
          rotate: [10, 10.5, 9.8, 10.3, 10]
        }}
        viewport={{ once: true }}
      >
        <div style={{ width: 280, height: 80 }} className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-indigo-500/[0.15] backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
        </div>
      </motion.div>
      
      {/* 右上元素 */}
      <motion.div 
        className="absolute right-[-10%] md:right-[-3%] top-[5%] md:top-[12%]" 
        style={{ opacity: 0.25 }}
        initial={{ opacity: 0, x: 60, y: -20, scale: 0.7 }}
        animate={{ opacity: 0.25, x: 0, y: 0, scale: 1 }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
          delay: 0.3
        }}
        whileInView={{
          y: [0, -3, 2, -1, 0],
          rotate: [-5, -4.5, -5.5, -4.8, -5]
        }}
        viewport={{ once: true }}
      >
        <div style={{ width: 600, height: 140 }} className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-blue-500/[0.15] backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.08)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"></div>
        </div>
      </motion.div>
      
      {/* 左下元素 */}
      <motion.div 
        className="absolute left-[-10%] md:left-[-2%] bottom-[10%] md:bottom-[15%]" 
        style={{ opacity: 0.3 }}
        initial={{ opacity: 0, x: -40, y: 20, scale: 0.8 }}
        animate={{ opacity: 0.3, x: 0, y: 0, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
          delay: 0.7
        }}
        whileInView={{
          y: [0, 2, -3, 1, 0],
          rotate: [20, 19.5, 20.5, 19.8, 20]
        }}
        viewport={{ once: true }}
      >
        <div style={{ width: 380, height: 100 }} className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-purple-500/[0.15] backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.08)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"></div>
        </div>
      </motion.div>
      
      {/* 中部元素 */}
      <motion.div 
        className="absolute right-[40%] md:right-[35%] top-[40%] md:top-[30%]" 
        style={{ opacity: 0.2 }}
        initial={{ opacity: 0, y: 30, scale: 0.7 }}
        animate={{ opacity: 0.2, y: 0, scale: 1 }}
        transition={{
          duration: 1.6,
          ease: "easeOut",
          delay: 0.9
        }}
        whileInView={{
          y: [0, -2, 3, -1, 0],
          rotate: [-25, -24.5, -25.5, -24.8, -25]
        }}
        viewport={{ once: true }}
      >
        <div style={{ width: 320, height: 90 }} className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.08)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"></div>
        </div>
      </motion.div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-12">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: getOptimizedDuration(0.8),
              ease: isLowPerformance ? "easeOut" : "easeInOut" 
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              创作历程
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: getOptimizedDuration(0.8), 
              delay: isLowPerformance ? 0 : 0.1,
              ease: isLowPerformance ? "easeOut" : "easeInOut"
            }}
            viewport={{ once: true }}
            className="text-white/60 max-w-lg mx-auto font-song"
          >
            多年的职业摄影之路，每一步都是成长与突破
          </motion.p>
        </div>
        
        {/* 内容区域 - 使用AnimatePresence实现平滑过渡 */}
        <div className="mb-16 relative h-[120px]">
          <AnimatePresence mode="wait" initial={false}>
            {experiences.map((exp, idx) => (
              displayYear === idx && (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30, position: 'absolute', width: '100%' }}
                  animate={{ opacity: 1, y: 0, position: 'absolute', width: '100%' }}
                  exit={{ opacity: 0, y: -30, position: 'absolute', width: '100%' }}
                  transition={{ 
                    duration: getOptimizedDuration(0.3), 
                    ease: "easeOut" 
                  }}
                  className="max-w-2xl mx-auto"
                  style={{ willChange: "transform, opacity" }} // 添加硬件加速提示
                >
                  <ContentCard 
                    experience={exp}
                    index={idx}
                    activeYear={displayYear}
                    isMobile={isMobile || isLowPerformance} // 将低性能设备也当作移动设备处理
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* 时间轴刻度尺整体容器 */}
        <div className="relative mx-auto max-w-6xl select-none">
          {/* 主刻度线背景 - 整个宽度的线 */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent top-[70px]" />
          
          {/* 中心指示器 - 调整位置与年份文本对齐 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[50px] w-[2px] h-[50px] md:h-[70px] bg-gradient-to-b from-indigo-500 via-indigo-500/30 to-transparent z-10">
            {/* 移除装饰波浪线 */}
          </div>
          
          {/* 滚动容器 - 应用整体渐隐蒙版 */}
          <div 
            ref={scrollContainerRef}
            className="relative overflow-x-auto scrollbar-none touch-pan-x h-[170px] cursor-grab active:cursor-grabbing will-change-transform"
            onScroll={() => {
              // 延迟选择，避免滚动时频繁触发
              if (!isDragging) {
                clearTimeout((scrollContainerRef.current as any)?.scrollTimer);
                (scrollContainerRef.current as any).scrollTimer = setTimeout(handleDragEnd, 100);
              }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)',
              willChange: 'scroll-position'
            }}
          >
            {/* 水平刻度线 - 覆盖整个区域 */}
            <div className="absolute w-full top-[70px]" style={{ width: '200%' }}>
              {/* 彩色渐变波浪线 */}
              <svg className="w-full h-5" preserveAspectRatio="none" viewBox="0 0 1000 20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(129, 140, 248, 0.3)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(244, 114, 182, 0.3)" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,10 Q250,15 500,10 Q750,5 1000,10" 
                  fill="none" 
                  stroke="url(#timelineGradient)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* 添加小刻度线 - 减少移动设备上的刻度线数量 */}
              <div className="absolute top-0 left-0 w-full">
                {Array.from({ length: isMobile ? 100 : 200 }).map((_, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "absolute w-[1px] h-3",
                      i % 10 === 0 ? "bg-indigo-400/30 h-4" : "bg-white/20"
                    )}
                    style={{
                      left: `${i * (isMobile ? 1 : 0.5)}%`,
                      transform: i % 10 === 0 ? 'scaleY(1.2)' : `scaleY(${0.7 + Math.sin(i * 0.3) * 0.3})`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* 年份标记容器 - 移除这里的蒙版应用到上层容器 */}
            <div 
              className="flex items-center px-[40vw] pt-4 min-w-max"
            >
              {experiences.map((exp, idx) => {
                // 计算与当前选中项的距离
                const distance = idx - displayYear;
                
                // 计算每个年份之间的距离 - 调整为合适的值以显示5个
                const spaceBetween = "w-[16vw] md:w-[12vw] inline-block";
                
                return (
                  <div 
                    key={idx} 
                    className={`${spaceBetween} year-mark`}
                    ref={(el) => { yearRefs.current[idx] = el; }}
                  >
                    <TimelineYearMark
                      year={exp.year}
                      index={idx}
                      isActive={displayYear === idx}
                      isHovered={hoveredYear === idx}
                      activeYear={displayYear}
                      onClick={() => handleYearClick(idx)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS样式 - 隐藏滚动条 */}
      <style jsx global>{`
        /* 隐藏滚动条 */
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .scrollbar-none::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        /* 添加一些全局动效 */
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .timeline-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
        
        /* 优化移动设备性能 */
        @media (max-width: 768px) {
          .transition-all, .motion-div {
            transition-duration: 80ms !important; /* 进一步缩短过渡时间 */
          }
          
          /* 减少移动设备上的动画效果 */
          .animate-pulse {
            animation: none !important;
          }
        }
        
        /* 低性能设备额外优化 */
        .low-performance-mode {
          .transition-all, .motion-div {
            transition-duration: 50ms !important;
          }
          
          .animate-presence > div {
            transition-property: opacity !important;
          }
        }
        
        /* 对所有动画元素使用GPU加速 */
        .motion-div, .animate-presence > div, .motion-safe\:animate-fade, .motion-safe\:animate-slide-up {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
} 