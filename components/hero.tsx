"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        {/* Video or Image Background */}
        {isMobile ? (
          <Image
            src="/hero-photo.avif"
            alt="Breathtaking fores"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        ref={textRef}
        className="relative h-full flex flex-col justify-center items-center text-center px-4"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1,duration: 0.8, ease: "easeOut" }}
        >
          Explore Without Boundaries
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.8, ease: "easeOut" }}
        >
          Discover extraordinary destinations, authentic experiences, and create
          memories that last a lifetime
        </motion.p>


        <motion.form
          className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-full p-2 mb-10 flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
          onSubmit={handleSearch}
        >
          <div className="flex-1 flex items-center space-x-4 px-4 py-2">
            <Search className="text-white/70" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="hidden sm:block active:scale-95 bg-amber-400 hover:bg-amber-500 text-white cursor-pointer font-semibold py-3 px-8 rounded-full transition-all duration-300 mt-2 md:mt-0"
          >
            Find Adventures
          </button>
        </motion.form>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.8, ease: "easeOut" }}
        >
          {[
            "Beach Getaways",
            "Mountain Escapes",
            "Cultural Journeys",
            "Wildlife Safaris",
            "City Breaks",
          ].map((category, index) => (
            <Link
              key={index}
              href={`/destinations?category=${category
                .toLowerCase()
                .replace(" ", "-")}`}
              className="bg-white/20 hover:bg-white/50 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300"
            >
              {category}
            </Link>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.9, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
