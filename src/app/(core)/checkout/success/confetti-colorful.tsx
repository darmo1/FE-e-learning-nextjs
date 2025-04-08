"use client"

import { useEffect, useRef } from "react"

type ParticleType = "heart" | "star" | "circle" | "square" | "triangle" | "dot"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  type: ParticleType
  speed: number
  velocityX: number
  velocityY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  fadeSpeed: number
  gravity: number
  bounce: number
}

interface CuteConfettiProps {
  duration?: number
  count?: number
}

export function ColorfulConfetti({ duration = 6000, count = 150 }: CuteConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  // const explosionRef = useRef<boolean>(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Vibrant color palette with some Vercel-style colors included
    const colors = [
      // Vibrant colors
      "#FF5252", // red
      "#FF4081", // pink
      "#E040FB", // purple
      "#7C4DFF", // deep purple
      "#536DFE", // indigo
      "#448AFF", // blue
      "#40C4FF", // light blue
      "#18FFFF", // cyan
      "#64FFDA", // teal
      "#69F0AE", // green
      "#B2FF59", // light green
      "#EEFF41", // lime
      "#FFFF00", // yellow
      "#FFD740", // amber
      "#FFAB40", // orange
      "#FF6E40", // deep orange

      // Pastel colors
      "#FFCDD2", // pastel red
      "#F8BBD0", // pastel pink
      "#E1BEE7", // pastel purple
      "#D1C4E9", // pastel deep purple
      "#C5CAE9", // pastel indigo
      "#BBDEFB", // pastel blue

      // Vercel colors for balance
      "#000000", // black
      "#FFFFFF", // white
      "#666666", // gray
    ]

    const particleTypes: ParticleType[] = ["heart", "star", "circle", "square", "triangle", "dot"]

    // Create explosion effect
    const createExplosion = () => {
      const particles: Particle[] = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < count; i++) {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)]
        const size =
          type === "dot"
            ? 3 + Math.random() * 3
            : type === "heart" || type === "star"
              ? 5 + Math.random() * 10
              : 4 + Math.random() * 6

        // Calculate explosion velocity
        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 8

        particles.push({
          x: centerX,
          y: centerY,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
          speed,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          opacity: 0.9,
          fadeSpeed: 0.003 + Math.random() * 0.005,
          gravity: 0.1 + Math.random() * 0.1,
          bounce: 0.6 + Math.random() * 0.2,
        })
      }

      return particles
    }

    // Initialize particles with explosion
    particlesRef.current = createExplosion()

    // Draw heart shape
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      const topCurveHeight = size * 0.3

      // Start at the bottom point
      ctx.moveTo(x, y + size / 2)

      // Draw the left curve
      ctx.bezierCurveTo(x - size / 2, y, x - size / 2, y - topCurveHeight, x, y - size / 2)

      // Draw the right curve
      ctx.bezierCurveTo(x + size / 2, y - topCurveHeight, x + size / 2, y, x, y + size / 2)

      ctx.closePath()
    }

    // Draw star shape
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, spikes = 5) => {
      ctx.beginPath()

      const outerRadius = size / 2
      const innerRadius = size / 4

      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (Math.PI * i) / spikes

        const pointX = x + Math.cos(angle) * radius
        const pointY = y + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }

      ctx.closePath()
    }

    // Draw triangle shape
    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const height = (size * Math.sqrt(3)) / 2

      ctx.beginPath()
      ctx.moveTo(x, y - height / 2)
      ctx.lineTo(x - size / 2, y + height / 2)
      ctx.lineTo(x + size / 2, y + height / 2)
      ctx.closePath()
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Apply gravity and update position
        particle.velocityY += particle.gravity
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.rotation += particle.rotationSpeed

        // Simple bounce effect on bottom
        if (particle.y > canvas.height - 10) {
          particle.velocityY = -particle.velocityY * particle.bounce
          particle.y = canvas.height - 10

          // Reduce horizontal velocity (friction)
          particle.velocityX *= 0.9
        }

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocityX = -particle.velocityX * particle.bounce
        }

        // Fade out
        particle.opacity -= particle.fadeSpeed

        // Remove faded particles
        if (particle.opacity <= 0) {
          particlesRef.current.splice(index, 1)
          return
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        // Draw based on particle type
        ctx.fillStyle = particle.color
        ctx.strokeStyle = particle.color

        switch (particle.type) {
          case "heart":
            drawHeart(ctx, 0, 0, particle.size)
            ctx.fill()
            break

          case "star":
            drawStar(ctx, 0, 0, particle.size)
            ctx.fill()
            break

          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break

          case "square":
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
            break

          case "triangle":
            drawTriangle(ctx, 0, 0, particle.size)
            ctx.fill()
            break

          case "dot":
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
        }

        ctx.restore()
      })

      // Create additional mini-explosions occasionally
      if (Math.random() < 0.02 && particlesRef.current.length < count * 1.5) {
        const miniExplosion = 10 + Math.floor(Math.random() * 20)
        const x = Math.random() * canvas.width
        const y = Math.random() * (canvas.height * 0.6)

        for (let i = 0; i < miniExplosion; i++) {
          const type = particleTypes[Math.floor(Math.random() * particleTypes.length)]
          const size =
            type === "dot"
              ? 2 + Math.random() * 2
              : type === "heart" || type === "star"
                ? 4 + Math.random() * 8
                : 3 + Math.random() * 5

          // Calculate explosion velocity
          const angle = Math.random() * Math.PI * 2
          const speed = 1 + Math.random() * 3

          particlesRef.current.push({
            x,
            y,
            size,
            color: colors[Math.floor(Math.random() * colors.length)],
            type,
            speed,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            opacity: 0.9,
            fadeSpeed: 0.005 + Math.random() * 0.01,
            gravity: 0.05 + Math.random() * 0.05,
            bounce: 0.4 + Math.random() * 0.3,
          })
        }
      }

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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

