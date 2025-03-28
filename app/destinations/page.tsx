"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { destinationsData } from "@/data/destination-data";



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
    boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.1), 0 10px 10px -5px rgba(251, 191, 36, 0.04)",
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
    transition: { duration: 1.2 }
  },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.7 }
  }
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const highlightVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.3
    }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function DestinationsPage() {
  return (
    <div 
      className="min-h-screen"
    >
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            variants={headerVariants}
          >
            Explore Our Destinations
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
            variants={descriptionVariants}
          >
            Discover handpicked destinations that will take your breath away and
            create memories to last a lifetime.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
            {destinationsData.map((destination, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden group"
                variants={cardVariants}
                // whileHover="hover"
                // custom={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                whileHover="hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <motion.div 
                  className="p-6"
                  variants={contentVariants}
                >
                  <motion.h2 
                    className="text-2xl font-bold mb-1"
                    variants={itemVariants}
                  >
                    {destination.name}
                  </motion.h2>
                  <motion.p 
                    className="text-amber-400 mb-4"
                    variants={itemVariants}
                  >
                    {destination.country}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 mb-6"
                    variants={itemVariants}
                  >
                    {destination.description}
                  </motion.p>

                  <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <motion.h3 
                      className="text-lg font-semibold mb-3"
                      variants={itemVariants}
                    >
                      Highlights:
                    </motion.h3>
                    <motion.ul 
                      className="space-y-2"
                      initial="initial"
                      animate="animate"
                      variants={contentVariants}
                    >
                      {destination.highlights.map((highlight, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start"
                          variants={highlightVariants}
                          custom={index}
                        >
                          <span className="text-amber-400 mr-2">•</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full"
                    >
                      Explore More
                    </Link>
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}