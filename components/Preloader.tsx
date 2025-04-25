"use client"

import { useEffect } from 'react'

const Preloader = () => {
  useEffect(() => {
    // 预加载视频
    const preloadVideos = () => {
      const videoElements = document.querySelectorAll('video')
      videoElements.forEach(video => {
        if (video.preload !== 'none') {
          video.preload = 'auto'
        }
      })
    }

    // 预加载图片
    const preloadImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (!img.complete) {
          const imgSrc = img.src
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'image'
          link.href = imgSrc
          document.head.appendChild(link)
        }
      })
    }

    // 延迟执行预加载，避免影响首屏加载
    const preloadTimer = setTimeout(() => {
      preloadVideos()
      preloadImages()
    }, 2000)

    return () => {
      clearTimeout(preloadTimer)
    }
  }, [])

  return null
}

export default Preloader 