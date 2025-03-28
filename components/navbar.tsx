"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const routes = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Experiences", path: "/experiences" },
  { name: "Deals", path: "/deals" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Reset when switching back to home page
    if (pathname === "/") {
      setScrolled(false) // Ensure transparency on home
      window.addEventListener("scroll", handleScroll)
    } else {
      setScrolled(true) // Ensure black navbar on other pages
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname]) // Runs when pathname changes

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 transition-all duration-300 ${
          scrolled ? "bg-gray-400/40 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold uppercase tracking-wider">
            Samaa
          </Link>

          <div className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.path}
                className="text-white hover:text-amber-300 transition-colors relative group"
              >
                {route.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden text-white" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white" aria-label="Close menu">
              <X size={24} />
            </button>

            <div className="flex flex-col space-y-8 items-center">
              {routes.map((route) => (
                <motion.div key={route.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Link
                    href={route.path}
                    className="text-white text-3xl hover:text-amber-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
