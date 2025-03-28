"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import { blogPosts } from "@/data/blog-post"

export default function BlogPage() {
  // Container variant for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  // Individual card variant
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
          >
            Samaa Blog
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
          >
            Stories, tips, and guides to inspire your next adventure
          </motion.p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                className="bg-white rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 border border-gray-200"
              >
                <motion.div 
                  className="relative h-56 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {post.category}
                  </motion.div>
                </motion.div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-amber-400 hover:text-amber-500 font-medium group"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center"
                      >
                        <span>Read More</span>
                        <ArrowRight size={16} className="ml-2" />
                      </motion.span>
                    </Link>

                    <div className="flex items-center text-gray-600">
                      <BookOpen size={14} className="mr-1" />
                      <span className="text-xs">{post.likes} readers</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}