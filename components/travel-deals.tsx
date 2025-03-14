"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, type PanInfo } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Clock, MapPin, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react'

const deals = [
  {
    id: 1,
    title: "Greek Islands Hopping",
    location: "Greece",
    duration: "10 days",
    groupSize: "Max 12 people",
    rating: 4.9,
    reviews: 128,
    originalPrice: 2499,
    discountedPrice: 1999,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 20,
  },
  {
    id: 2,
    title: "Bali Wellness Retreat",
    location: "Indonesia",
    duration: "7 days",
    groupSize: "Max 8 people",
    rating: 4.8,
    reviews: 96,
    originalPrice: 1899,
    discountedPrice: 1599,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 15,
  },
  {
    id: 3,
    title: "Safari Adventure",
    location: "Tanzania",
    duration: "8 days",
    groupSize: "Max 6 people",
    rating: 4.9,
    reviews: 74,
    originalPrice: 3299,
    discountedPrice: 2799,
    image: "https://images.unsplash.com/photo-1613864309738-9102a9e22883?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 15,
  },
  {
    id: 4,
    title: "Japan Cherry Blossom Tour",
    location: "Japan",
    duration: "12 days",
    groupSize: "Max 10 people",
    rating: 4.7,
    reviews: 112,
    originalPrice: 3599,
    discountedPrice: 2999,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 17,
  },
  {
    id: 5,
    title: "Northern Lights Adventure",
    location: "Iceland",
    duration: "6 days",
    groupSize: "Max 8 people",
    rating: 4.9,
    reviews: 86,
    originalPrice: 2899,
    discountedPrice: 2399,
    image: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 17,
  },
  {
    id: 6,
    title: "Machu Picchu Trek",
    location: "Peru",
    duration: "9 days",
    groupSize: "Max 10 people",
    rating: 4.8,
    reviews: 104,
    originalPrice: 2799,
    discountedPrice: 2299,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 18,
  },
];


export default function TravelDeals() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const controls = useAnimation()
  const [dragConstraints, setDragConstraints] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: false,
        once: true,
      },
    })

    tl.fromTo(headingRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    const updateDimensions = () => {
      if (carouselRef.current) {
        // Update cards per view based on screen size
        if (window.innerWidth < 640) {
          setCardsPerView(1)
        } else if (window.innerWidth < 1024) {
          setCardsPerView(2)
        } else if (window.innerWidth < 1280) {
          setCardsPerView(3)
        } else {
          setCardsPerView(4)
        }

        // Calculate card width based on container width and cards per view
        const cardWidth = carouselRef.current.offsetWidth / cardsPerView
        setWidth(cardWidth)

        // Set drag constraints based on number of cards
        const totalWidth = cardWidth * deals.length
        const viewWidth = carouselRef.current.offsetWidth
        setDragConstraints(Math.max(0, totalWidth - viewWidth))
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener("resize", updateDimensions)
    }
  }, [cardsPerView])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      // Swiped right
      prevSlide()
    } else if (offset < -100 || velocity < -500) {
      // Swiped left
      nextSlide()
    }
  }

  const nextSlide = () => {
    if (carouselRef.current) {
      const newIndex = Math.min(activeIndex + cardsPerView, deals.length - cardsPerView)
      setActiveIndex(newIndex)
      controls.start({ x: -newIndex * width })
    }
  }

  const prevSlide = () => {
    if (carouselRef.current) {
      const newIndex = Math.max(activeIndex - cardsPerView, 0)
      setActiveIndex(newIndex)
      controls.start({ x: -newIndex * width })
    }
  }

  return (
    <section id="travel-deals" ref={sectionRef} className="py-20 md:py-32">
  <div className="container mx-auto px-4">
    <div ref={headingRef} className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Special Travel Deals</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Limited-time offers on our most popular travel experiences
      </p>
    </div>

    <div className="relative">
      <div ref={carouselRef} className="overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ right: 0, left: -dragConstraints }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={controls}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        >
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              className="flex-shrink-0 px-2 py-5"
              style={{ width }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="bg-white rounded-xl overflow-hidden h-full shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {deal.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {deal.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-blue-500">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 text-sm font-medium">{deal.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{deal.reviews} reviews</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin size={14} className="mr-2 text-blue-500" />
                      {deal.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock size={14} className="mr-2 text-blue-500" />
                      {deal.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Users size={14} className="mr-2 text-blue-500" />
                      {deal.groupSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 line-through text-sm">${deal.originalPrice}</span>
                      <div className="text-2xl font-bold text-gray-900">${deal.discountedPrice}</div>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full z-10 backdrop-blur-sm"
        aria-label="Previous deals"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full z-10 backdrop-blur-sm"
        aria-label="Next deals"
      >
        <ChevronRight size={24} />
      </button>
    </div>

    <div className="text-center mt-12">
      <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300">
        View All Deals
      </button>
    </div>
  </div>
</section>

  )
}

