# 摄影师嘉阳个人作品集网站

这是一个为摄影师嘉阳设计的个人作品集网站，使用Next.js和Tailwind CSS构建。

## 功能特点

- 现代化的UI设计与动画效果
- 响应式布局，适配各种设备
- 使用Framer Motion实现流畅的动画效果
- 使用Tailwind CSS进行样式设计
- 智能图片组件，自动识别图片方向并优化显示

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## 开发说明

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建项目：
```bash
npm run build
```

4. 启动生产环境：
```bash
npm run start
``` 

## 如何修改图片

### 图片组件位置

主要图片组件位于 `components/kokonutui/gallery-section.tsx` 文件中。该组件支持自动识别图片宽高比，默认支持竖屏图片显示。

### 如何添加/替换图片

1. 将新图片放入 `/public/images/` 目录
2. 在 `components/kokonutui/gallery-section.tsx` 文件中找到 `galleryImages` 数组（约在第86-95行）
3. 修改或添加图片条目，例如：

```typescript
const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
  { 
    id: 1, 
    title: "时尚人像", 
    description: "城市风格时尚人像摄影", 
    category: "人像", 
    src: "/images/your-new-image.jpg" 
  },
  // 其他图片...
]);
```

### 宽高比自动识别功能

- 不需要手动设置图片方向，组件会自动检测图片是竖屏还是横屏
- 竖屏图片将使用 `aspect-[3/4]` 比例显示
- 横屏图片将使用 `aspect-[16/9]` 比例显示
- 图片会根据其实际宽高比自动选择合适的背景样式：
  - 横屏图片: `bg-center bg-cover`
  - 竖屏图片: `bg-contain bg-center bg-no-repeat`

其他组件（如项目展示卡片）的图片位于 `components/kokonutui/projects-section.tsx` 文件中。

正文加宽加间距  max-w-none tracking-wide