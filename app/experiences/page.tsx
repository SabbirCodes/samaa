"use client";

import Image from "next/image";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
// import { experiences } from "@/data/experiences";
import { experiencesData } from "@/data/experiences-data";
import Link from "next/link";

const headerVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const descriptionVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 100,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(251, 191, 36, 0.1), 0 10px 10px -5px rgba(251, 191, 36, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const imageVariants = {
  initial: { scale: 1.2, opacity: 0.8 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2 },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.7 },
  },
};

const titleOverlayVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const infoIconVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            variants={headerVariants}
          >
            Unforgettable Experiences
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
            variants={descriptionVariants}
          >
            Discover authentic, immersive experiences that connect you with
            local cultures and create memories to last a lifetime.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {experiencesData.map((experience, index) => (
              <motion.div
                className="bg-white rounded-xl overflow-hidden"
                variants={cardVariants}
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                whileHover="hover"
              >
                <div className="relative group h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 transform group-hover:-translate-y-3 transition-transform duration-300"
                    variants={titleOverlayVariants}
                  >
                    <h2 className="text-2xl font-bold text-white">
                      {experience.title}
                    </h2>
                  </motion.div>
                </div>

                <div className="p-6">
                  <motion.div
                    className="flex flex-wrap gap-4 mb-4"
                    initial="initial"
                    animate="animate"
                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  >
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      variants={infoIconVariants}
                    >
                      <MapPin size={16} className="mr-1 text-amber-400" />
                      {experience.location}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      variants={infoIconVariants}
                    >
                      <Clock size={16} className="mr-1 text-amber-400" />
                      {experience.duration}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      variants={infoIconVariants}
                    >
                      <Users size={16} className="mr-1 text-amber-400" />
                      {experience.groupSize}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      variants={infoIconVariants}
                    >
                      <Calendar size={16} className="mr-1 text-amber-400" />
                      {experience.dates}
                    </motion.div>
                  </motion.div>

                  <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.4, duration: 0.5 },
                    }}
                  >
                    {experience.description}
                  </motion.p>

                  <Link
                    href={`/experiences/${experience.slug}`}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 mt-4 block text-center"
                  >
                    Book This Experience
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
