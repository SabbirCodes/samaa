"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import gsap from "gsap"

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(".loader-text span", {
      y: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    })

    tl.to(".loader-text span", {
      y: -100,
      stagger: 0.05,
      duration: 0.8,
      ease: "power4.in",
      delay: 0.5,
    })

    tl.to(".loader", {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => setLoading(false),
    })

    return () => {
      tl.kill()
    }
  }, [])

  if (!loading) return null

  return (
    <motion.div
      className="loader fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
    >
      <div className="loader-text overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-bold text-white flex">
          {"SAMAA".split("").map((letter, index) => (
            <span key={index} className="inline-block transform translate-y-full">
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </motion.div>
  )
}

