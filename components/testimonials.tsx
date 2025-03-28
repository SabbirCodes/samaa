"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      "Our safari in Tanzania was absolutely life-changing. From the moment we landed, Samaa took care of everything. Our guide was incredibly knowledgeable, and we saw the Big Five within the first three days! The accommodations were luxurious yet authentic, and the sunset dinners in the bush were magical.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    trip: "Tanzania Wildlife Safari",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "London, UK",
    quote:
      "I've traveled with many companies over the years, but Samaa truly stands out. Their attention to detail on our Japan tour was impeccable. They arranged private access to temples, tea ceremonies with masters, and even helped us navigate Tokyo like locals. It was the perfect balance of structure and freedom.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    trip: "Japan Cultural Immersion",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    quote:
      "As a solo female traveler, safety and authentic experiences are my top priorities. Samaa delivered on both beyond my expectations during my trip to Morocco. From the bustling markets of Marrakech to the peaceful silence of the Sahara, every moment was thoughtfully curated and genuinely special.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    trip: "Morocco Desert Adventure",
  },
  {
    id: 4,
    name: "Jhon Doe",
    location: "Toronto, Canada",
    quote:
      "Our family of five had specific needs for our Greek Islands vacation, and Samaa created the perfect itinerary. The kids were engaged with age-appropriate activities while we adults enjoyed the history, food, and stunning views. The private yacht day around Santorini was a highlight we'll never forget!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    trip: "Greek Islands Family Tour",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-950 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Traveler Stories
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Authentic experiences from our global community of adventurers
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover rounded-full"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Verified
                  </div>
                </div>

                <div>
                  <Quote className="text-amber-400 mb-4" size={32} />
                  <p className="text-lg italic mb-6">
                    {testimonials[current].quote}
                  </p>
                  <div>
                    <h4 className="text-xl font-semibold">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-amber-400 mb-1">
                      {testimonials[current].location}
                    </p>
                    <p className="text-sm text-gray-400">
                      Trip: {testimonials[current].trip}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    current === index ? "bg-amber-400" : "bg-white/30"
                  } transition-colors`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-medium mb-6">
            Join thousands of satisfied travelers
          </p>
          <motion.button
            className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href={"/contact"}>
            Start Your Adventure
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
