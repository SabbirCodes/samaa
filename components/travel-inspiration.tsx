"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Need to Visit",
    excerpt:
      "Discover off-the-beaten-path destinations in Southeast Asia that offer authentic experiences away from the tourist crowds.",
    image: "https://images.unsplash.com/photo-1442544213729-6a15f1611937?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 15, 2025",
    author: "Emma Rodriguez",
    category: "Destinations",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sustainable Travel in 2025",
    excerpt:
      "Learn how to minimize your environmental impact while maximizing your travel experiences with these eco-friendly travel tips.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "May 22, 2025",
    author: "Michael Chen",
    category: "Travel Tips",
  },
  {
    id: 3,
    title: "How to Pack for a Month-Long Trip in Just a Carry-On",
    excerpt:
      "Expert packing tips and tricks to help you travel light without sacrificing comfort or style on extended journeys.",
    image: "https://images.unsplash.com/photo-1536562833330-a59dc2305a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "April 10, 2025",
    author: "Sarah Johnson",
    category: "Travel Tips",
  },
]

export default function TravelInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  return (
    <section id="travel-inspiration" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Travel Inspiration</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories, tips, and guides to inspire your next adventure
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-amber-400 hover:text-amber-600 font-medium"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/blog"
            className="bg-amber-400 text-black hover:bg-amber-500 font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  )
}