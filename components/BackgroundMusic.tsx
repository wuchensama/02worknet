"use client"

import { useEffect, useRef, useState } from 'react'

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      console.log('音频元素未找到')
      return
    }

    console.log('初始化音频元素')
    // 设置初始音量
    audio.volume = 0.1

    // 监听视频播放状态
    const handleVideoPlay = () => {
      console.log('视频开始播放，降低背景音乐音量')
      setIsVideoPlaying(true)
      // 渐隐背景音乐
      const fadeOut = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(0, audio.volume - 0.1)
        } else {
          clearInterval(fadeOut)
        }
      }, 100)
    }

    const handleVideoPause = () => {
      console.log('视频暂停，恢复背景音乐音量')
      setIsVideoPlaying(false)
      // 渐显背景音乐
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.1) {
          audio.volume = Math.min(0.1, audio.volume + 0.1)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)
    }

    // 监听所有视频元素
    const videos = document.querySelectorAll('video')
    console.log(`找到 ${videos.length} 个视频元素`)
    videos.forEach(video => {
      video.addEventListener('play', handleVideoPlay)
      video.addEventListener('pause', handleVideoPause)
      video.addEventListener('ended', handleVideoPause)
    })

    // 尝试播放音乐
    const playMusic = async () => {
      try {
        console.log('尝试播放音乐')
        await audio.play()
        console.log('音乐播放成功')
      } catch (error) {
        console.error('播放失败:', error)
      }
    }

    // 处理滚动事件
    const handleScroll = () => {
      if (!hasScrolled) {
        console.log('检测到页面滚动，尝试播放音乐')
        setHasScrolled(true)
        playMusic()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // 页面加载完成后尝试播放
    if (document.readyState === 'complete') {
      console.log('页面已加载完成，尝试播放音乐')
      playMusic()
    } else {
      console.log('等待页面加载完成')
      window.addEventListener('load', playMusic)
    }

    // 监听用户交互
    const handleInteraction = () => {
      console.log('检测到用户交互，尝试播放音乐')
      playMusic()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
    }

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleInteraction)

    // 添加音频错误监听
    const handleAudioError = (e: Event) => {
      console.error('音频错误:', e)
    }
    audio.addEventListener('error', handleAudioError)

    return () => {
      console.log('清理音频事件监听器')
      videos.forEach(video => {
        video.removeEventListener('play', handleVideoPlay)
        video.removeEventListener('pause', handleVideoPause)
        video.removeEventListener('ended', handleVideoPause)
      })
      window.removeEventListener('load', playMusic)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      audio.removeEventListener('error', handleAudioError)
    }
  }, [hasScrolled])

  return (
    <audio 
      ref={audioRef} 
      src="/music/bgm.mp3" 
      loop 
      preload="auto"
      autoPlay
      controls
      style={{ display: 'none' }}
    />
  )
}

export default BackgroundMusic 