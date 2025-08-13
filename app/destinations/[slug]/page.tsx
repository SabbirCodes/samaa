"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { destinationsData } from "@/data/destination-data";
import { Destination } from "@/data/destination-data";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.2 },
  },
};

const headerVariants = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2 },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

export default function DestinationDetail() {
  const params = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params && params.slug) {
      const foundDestination = destinationsData.find(
        (dest) => dest.slug === params.slug
      );
      if (foundDestination) {
        setDestination(foundDestination);
      }
      setLoading(false);
    }
  }, [params]);

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
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Destination not found</h1>
        <Link
          href="/destinations"
          className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container 2xl:max-w-[1400px] mx-auto px-4">
        <motion.div className="mb-6" variants={headerVariants}>
          <Link
            href="/destinations"
            className="inline-flex items-center text-amber-400 hover:text-amber-500 mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Destinations
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold">{destination.name}</h1>
          <p className="text-xl text-amber-400">{destination.country}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2" variants={imageVariants}>
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            variants={contentVariants}
          >
            <motion.h2
              className="text-2xl font-bold mb-4"
              variants={itemVariants}
            >
              Overview
            </motion.h2>
            <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
              {destination.description}
            </motion.p>

            <motion.div className="mb-6" variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-3">Highlights:</h3>
              <ul className="space-y-2">
                {destination.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                    custom={index}
                  >
                    <span className="text-amber-400 mr-2">•</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="mb-6" variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-3">
                Best Time to Visit:
              </h3>
              <p className="text-gray-600">
                {destination.bestTimeToVisit || "All year round"}
              </p>
            </motion.div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full"
            >
              <Link href={`/checkout?dealId=${destination.slug}&dateId=1`}>
              
              Book This Trip
              </Link>
            </motion.button>
          </motion.div>
        </div>

        <motion.div className="mt-12" variants={contentVariants}>
          <h2 className="text-3xl font-bold mb-6">Detailed Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">
                About {destination.name}
              </h3>
              <p className="text-gray-600">
                {destination.longDescription ||
                  `${destination.name} is a remarkable destination located in ${destination.country}. 
                  Known for its stunning landscapes and unique cultural experiences, 
                  it offers travelers an unforgettable journey through one of the world's 
                  most beautiful regions.`}
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">Local Experiences</h3>
              <ul className="space-y-3">
                {(
                  destination.experiences || [
                    "Explore local markets and taste regional cuisine",
                    "Visit historical landmarks and learn about local history",
                    "Participate in cultural events and festivals",
                    "Connect with locals and learn about their way of life",
                  ]
                ).map((experience, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span>{experience}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-white rounded-xl p-6 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold mb-4">Travel Tips</h3>
            <ul className="space-y-3">
              {(
                destination.travelTips || [
                  "Pack appropriate clothing for the local climate",
                  "Learn a few basic phrases in the local language",
                  "Respect local customs and traditions",
                  "Stay hydrated and wear sun protection",
                  "Keep important documents secure and make digital copies",
                ]
              ).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div className="mt-12 text-center" variants={contentVariants}>
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience {destination.name}?
          </h2>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full text-lg"
          >
            <Link href={'/contact'}>
            
            Start Planning Your Trip
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
