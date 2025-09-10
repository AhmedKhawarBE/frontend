"use client"

import { useState, useEffect } from "react"

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMouse)
    return () => window.removeEventListener("mousemove", updateMouse)
  }, [])

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none transition duration-300 ease-out"
      style={{
        background: `radial-gradient(500px at ${position.x}px ${position.y}px, rgba(239, 68, 68, 0.15), transparent 80%)`,
      }}
    />
  )
}
