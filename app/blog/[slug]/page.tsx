"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, User, Clock, ArrowLeft, Heart, Bookmark, Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/data/blog-post"
import ShareButton from "@/components/share-button"



export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    // Simulate API call with a delay
    setLoading(true)
    const timer = setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.slug === params.slug)
      setPost(foundPost || null)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.slug])
  

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div>
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Article Not Found</h1>
            <p className="text-xl mb-8">{`The article you're looking for doesn't exist or has been removed.`}</p>
            <button
              onClick={() => router.push("/blog")}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              Browse All Articles
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-amber-400 hover:text-amber-500 mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </Link>

            <div className="bg-amber-300 text-amber-800 text-sm font-medium px-3 py-1 rounded-full inline-block ml-4">
              {post.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                {post.readTime}
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-full ${liked ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"} hover:bg-red-500 hover:text-white transition-colors`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={20} className={liked ? "fill-white" : ""} />
                </button>
                {/* <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Share2 size={20} />
                </button> */}
                <ShareButton blogSlug={post.slug} />

                <button
                  className={`p-2 rounded-full ${bookmarked ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-600"} hover:bg-amber-400 hover:text-white transition-colors`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark size={20} className={bookmarked ? "fill-white" : ""} />
                </button>
              </div>

              <div className="flex space-x-2">
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="blog-content max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag: string, index: number) => (
                <Link
                  key={index}
                  href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <div
                      key={relatedPost.slug}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-amber-400 hover:text-amber-500 text-sm font-medium"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

