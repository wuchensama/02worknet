export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export const metadata = {
  title: '艺术写真 - 摄影师嘉阳',
  description: '探索光影之美，捕捉瞬间的永恒',
} 