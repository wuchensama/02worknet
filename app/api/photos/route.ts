import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

// 将fs回调函数转换为Promise
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// 图片类型
interface PhotoItem {
  id: string
  src: string
  alt: string
  category: string
  width: number
  height: number
}

// 获取图片尺寸 (这里模拟，实际应用中可以使用image-size等库)
const getImageDimensions = async (filePath: string): Promise<{width: number, height: number}> => {
  // 在实际应用中，这里会分析图片文件获取真实尺寸
  // 简化处理：根据文件名判断是否宽幅图片
  const isWide = filePath.toLowerCase().includes('wide') || 
                 filePath.toLowerCase().includes('landscape');
  
  if (isWide) {
    return { width: 16, height: 9 }; // 宽幅
  } else {
    return { width: 3, height: 4 }; // 竖图
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category') || 'all'
  
  try {
    const photoItems: PhotoItem[] = []
    const directories = ['all'] // 始终包含'all'目录
    
    // 如果分类不是'all'，则添加特定分类目录
    if (category !== 'all') {
      directories.push(category)
    } else {
      // 如果是'all'，添加所有子目录
      const allDirs = ['stars', 'bloggers', 'creative', 'scenes']
      directories.push(...allDirs)
    }
    
    // 处理每个目录
    for (const dir of directories) {
      const dirPath = path.join(process.cwd(), 'public', 'images', 'photo', dir)
      let files: string[] = []
      
      try {
        files = await readdir(dirPath)
      } catch (err) {
        console.error(`读取目录失败 ${dirPath}:`, err)
        continue
      }
      
      // 处理每个文件
      for (const file of files) {
        // 只处理图片文件
        if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) continue
        
        const filePath = path.join(dirPath, file)
        const fileStat = await stat(filePath)
        
        // 确保是文件
        if (!fileStat.isFile()) continue
        
        // 获取相对路径作为URL
        const relativePath = path.join('/images/photo', dir, file).replace(/\\/g, '/')
        
        // 获取图片尺寸
        const dimensions = await getImageDimensions(file)
        
        // 创建文件名作为alt文本
        const alt = file.split('.')[0].replace(/-|_/g, ' ')
        
        // 避免重复添加
        const isDuplicate = photoItems.some(item => item.src === relativePath)
        if (!isDuplicate) {
          photoItems.push({
            id: `${dir}-${file}`,
            src: relativePath,
            alt,
            category: dir,
            width: dimensions.width,
            height: dimensions.height
          })
        }
      }
    }
    
    return NextResponse.json(photoItems)
  } catch (error) {
    console.error('获取照片失败:', error)
    return NextResponse.json({ error: '获取照片失败' }, { status: 500 })
  }
} 