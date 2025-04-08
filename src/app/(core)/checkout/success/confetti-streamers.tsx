"use client"

import { useEffect, useRef } from "react"

interface Streamer {
  x: number
  y: number
  length: number
  width: number
  color: string
  angle: number
  speed: number
  rotation: number
  rotationSpeed: number
}

interface ConfettiStreamersProps {
  duration?: number
  count?: number
}

export function ConfettiStreamers({ duration = 4000, count = 60 }: ConfettiStreamersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamersRef = useRef<Streamer[]>([])
  const animationRef = useRef<number>(0)

  // Initialize streamers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Vercel-style colors - subtle grays, blacks, whites
    const colors = [
      "#000000", // black
      "#333333", // dark gray
      "#666666", // medium gray
      "#999999", // light gray
      "#ffffff", // white
    ]

    // Create streamers
    const streamers: Streamer[] = []
    for (let i = 0; i < count; i++) {
      streamers.push({
        x: Math.random() * canvas.width,
        y: -100 - Math.random() * 500, // Start above the viewport
        length: 20 + Math.random() * 30,
        width: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      })
    }

    streamersRef.current = streamers

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw streamers
      streamersRef.current.forEach((streamer) => {
        streamer.y += streamer.speed
        streamer.rotation += streamer.rotationSpeed

        ctx.save()
        ctx.translate(streamer.x, streamer.y)
        ctx.rotate(streamer.rotation)

        ctx.beginPath()
        ctx.strokeStyle = streamer.color
        ctx.lineWidth = streamer.width
        ctx.moveTo(0, 0)

        // Create a curved streamer
        ctx.bezierCurveTo(
          streamer.length * 0.3,
          streamer.length * 0.3,
          streamer.length * 0.7,
          streamer.length * 0.5,
          streamer.length,
          0,
        )

        ctx.stroke()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Stop animation after duration
    const timeout = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }, duration)

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(timeout)
      window.removeEventListener("resize", handleResize)
    }
  }, [count, duration])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ opacity: 0.8 }} />
}

