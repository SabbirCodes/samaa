"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blog-post";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // Get tag from URL

  // Filter posts based on tag (case-insensitive match in the tags array)
  const filteredPosts = tag
    ? blogPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
    : blogPosts; // Show all posts if no tag is provided

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
            {tag ? `Posts about "${tag}"` : "Samaa Blog"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
          >
            Stories, tips, and guides to inspire your next adventure
          </motion.p>

          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500">
              No posts found for &quot;{tag}&quot;.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  className="bg-white rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {post.tags[0]} {/* Show the first tag */}
                    </div>
                  </div>

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

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

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
          )}
        </div>
      </div>
    </div>
  );
}
