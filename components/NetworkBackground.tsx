"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

interface NetworkBackgroundProps {
  color?: string
}

export function NetworkBackground({ color = "rgba(255, 255, 255, 0.5)" }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const [isClient, setIsClient] = useState(false)

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true)
    
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Initialize particles
    initParticles()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])
  
  // Initialize particles
  const initParticles = () => {
    // Adjust particle count based on screen size for better mobile performance
    const isMobile = window.innerWidth < 768;
    const baseParticleCount = isMobile ? 50 : 150;
    const densityFactor = isMobile ? 12000 : 8000;
    
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / densityFactor), baseParticleCount);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower movement on mobile
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower movement on mobile
        size: Math.random() * 3 + (isMobile ? 1 : 2), // Smaller particles on mobile
        color: getRandomColor()
      });
    }
    
    setParticles(newParticles);
  };
  
  // Get random color
  const getRandomColor = () => {
    const colors = [
      'rgba(255, 255, 255, 0.9)',    // White (more visible)
      'rgba(100, 149, 237, 0.9)',    // Cornflower blue
      'rgba(135, 206, 250, 0.9)',    // Light sky blue
      'rgba(147, 112, 219, 0.9)',    // Medium purple
      'rgba(138, 43, 226, 0.9)',     // Blue violet
      'rgba(75, 0, 130, 0.9)',       // Indigo
      'rgba(123, 104, 238, 0.9)',    // Medium slate blue
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  // Animation effect
  useEffect(() => {
    if (!isClient || particles.length === 0) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      const updatedParticles = [...particles]
      
      for (let i = 0; i < updatedParticles.length; i++) {
        const p = updatedParticles[i]
        
        // Move particles
        p.x += p.vx
        p.y += p.vy
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        // Draw particle with glow effect
        ctx.beginPath()
        
        // Create a radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 2
        )
        
        // Extract color components
        const colorMatch = p.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (colorMatch) {
          const r = parseInt(colorMatch[1])
          const g = parseInt(colorMatch[2])
          const b = parseInt(colorMatch[3])
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Draw the core of the particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        
        // Mouse interaction
        const dx = mousePosition.x - p.x
        const dy = mousePosition.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - dist) / 100
          p.vx -= Math.cos(angle) * force * 0.1
          p.vy -= Math.sin(angle) * force * 0.1
        }
        
        // Connect particles with lines
        for (let j = i + 1; j < updatedParticles.length; j++) {
          const p2 = updatedParticles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - dist / 150)})` // More visible lines
            ctx.lineWidth = 1 // Thicker lines
            ctx.stroke()
          }
        }
      }
      
      setParticles(updatedParticles)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isClient, dimensions, mousePosition, particles])
  
  if (!isClient) {
    return null
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }} // Full opacity
    />
  )
} 