"use client"

import { useEffect, useState } from "react"
import { MdAirplanemodeActive } from "react-icons/md";
import { motion, AnimatePresence } from "motion/react"

export default function GoTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.90}}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-black/70 hover:bg-black text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-300 group"
          aria-label="Go to top"
        >
          <MdAirplanemodeActive  
            size={24} 
            className="transform group-hover:translate-y-[-4px] transition-transform duration-300" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}