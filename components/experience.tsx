"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const images = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "experience image",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "experience image",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "experience image",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1572431468264-b577dbd64808?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "experience image",
  },
];


export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    tl.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0.8 },
      { scale: 1, opacity: 1 }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container 2xl:max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            className="text-white"
            style={{ y, opacity }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Unforgettable Experiences
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              We curate extraordinary experiences that connect you with local
              cultures, natural wonders, and hidden gems around the world. Our
              expert guides ensure every moment of your journey is authentic and
              memorable.
            </p>

            <div className="space-y-4">
              {[
                "Authentic Cultural Immersion",
                "Expert Local Guides",
                "Sustainable Travel",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <p className="text-white">{item}</p>
                </motion.div>
              ))}
            </div>

            <Link href={"/experiences"}
              className="inline-block mt-8 bg-amber-400 hover:scale-105 active:scale-95 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              Explore Experiences
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden rounded-lg h-48 md:h-64"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={image.img}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
