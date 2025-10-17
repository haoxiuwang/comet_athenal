import React, { useRef } from "react"

/**
 * SwipeContainer - 支持上下左右滑动的手势容器
 *
 * Props:
 *  - onSwipeUp / onSwipeDown / onSwipeLeft / onSwipeRight: function
 *  - threshold: number (滑动识别的最小像素距离，默认 50)
 *  - children: ReactNode
 */
export default function SwipeContainer({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  children,
  className = "",
}) {
  const touchStart = useRef({ x: 0, y: 0 })
  const touchEnd = useRef({ x: 0, y: 0 })

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    touchEnd.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = () => {
    const dx = touchEnd.current.x - touchStart.current.x
    const dy = touchEnd.current.y - touchStart.current.y

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return

    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平滑动
      if (dx > 0) onSwipeRight && onSwipeRight()
      else onSwipeLeft && onSwipeLeft()
    } else {
      // 垂直滑动
      if (dy > 0) onSwipeDown && onSwipeDown()
      else onSwipeUp && onSwipeUp()
    }
  }

  return (
    <div
      className={`touch-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
