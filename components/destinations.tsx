"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, type PanInfo } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic white-washed buildings with blue domes overlooking the Aegean Sea.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description:
      "Ancient temples, traditional gardens, and cherry blossoms in spring.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Machu Picchu",
    country: "Peru",
    description: "Mysterious Incan citadel set high in the Andes Mountains.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    description:
      "Tropical paradise with lush rice terraces, sacred temples, and pristine beaches.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Marrakech",
    country: "Morocco",
    description:
      "Vibrant markets, stunning palaces, and rich cultural heritage in this ancient city.",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Reykjavik",
    country: "Iceland",
    description:
      "Gateway to dramatic landscapes of volcanoes, geysers, hot springs and lava fields.",
    image:
      "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Destinations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const controls = useAnimation();
  const [dragConstraints, setDragConstraints] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: false,
        once: true,
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const updateDimensions = () => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.offsetWidth / cardsPerView;
        setWidth(cardWidth);

        // Set drag constraints based on number of cards
        const totalWidth = cardWidth * destinations.length;
        const viewWidth = carouselRef.current.offsetWidth;
        setDragConstraints(Math.max(0, totalWidth - viewWidth));
      }

      // Update cards per view based on screen size
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", updateDimensions);
    };
  }, [cardsPerView]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      // Swiped right
      prevSlide();
    } else if (offset < -100 || velocity < -500) {
      // Swiped left
      nextSlide();
    }
  };

  const nextSlide = () => {
    if (carouselRef.current) {
      const newIndex = Math.min(
        activeIndex + cardsPerView,
        destinations.length - cardsPerView
      );
      setActiveIndex(newIndex);
      controls.start({ x: -newIndex * width });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const newIndex = Math.max(activeIndex - cardsPerView, 0);
      setActiveIndex(newIndex);
      controls.start({ x: -newIndex * width });
    }
  };

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Destinations
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover handpicked destinations that will take your breath away
          </p>
        </div>

        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden py-5">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ right: 0, left: -dragConstraints }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              animate={controls}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  className="destination-card relative group overflow-hidden rounded-lg cursor-pointer flex-shrink-0 px-2"
                  style={{ width }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-[400px] overflow-hidden rounded-lg">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                      <h3 className="text-2xl text-white font-bold mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-amber-300 mb-3">
                        {destination.country}
                      </p>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full z-10 backdrop-blur-sm"
            aria-label="Previous destinations"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full z-10 backdrop-blur-sm"
            aria-label="Next destinations"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-12">
          <motion.button
            className="bg-amber-400 text-black cursor-pointer hover:bg-amber-500 font-semibold py-3 px-8 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.90 }}
          >
            View All Destinations
          </motion.button>
        </div>
      </div>
    </section>
  );
}
