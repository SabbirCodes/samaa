"use client";

import Image from "next/image";
import { motion } from "motion/react";

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Travel Specialist",
    experience:
      "With over 8 years of experience and having traveled to 40+ countries, Sarah crafts tailored travel experiences for our clients.",
  },
  {
    id: 2,
    name: "James Wilson",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Adventure Guide",
    experience:
      "With 12 years of guiding in rugged terrains and a passion for adventure, James takes travelers on unforgettable journeys through the wild.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Cultural Expert",
    experience:
      "With a deep understanding of history and culture, Elena has 15 years of experience curating culturally immersive experiences worldwide.",
  },
  {
    id: 4,
    name: "Jhon Doe",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Luxury Travel Planner",
    experience:
      "With over 10 years of experience and having visited 50+ countries, Jhon creates unforgettable luxury journeys for our clients.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            About Samaa
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                {`Founded in 2006, Samaa was born from a passion for
                authentic travel experiences and a desire to share the world's
                most extraordinary destinations with curious travelers.`}
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small team of travel enthusiasts has grown into
                a global community of explorers, guides, and local experts who
                are dedicated to creating meaningful connections between
                travelers and the places they visit.
              </p>
              <p className="text-gray-700">
                Our mission is simple: to inspire and enable transformative
                travel experiences that respect local cultures, support local
                communities, and preserve the natural environment for future
                generations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Samaa team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Authentic Experiences",
                  description:
                    "We believe in travel that goes beyond the surface, connecting you with local cultures and traditions in meaningful ways.",
                },
                {
                  title: "Responsible Tourism",
                  description:
                    "We're committed to sustainable practices that minimize environmental impact and maximize benefits to local communities.",
                },
                {
                  title: "Exceptional Service",
                  description:
                    "From your first inquiry to your return home, we provide personalized attention and care at every step of your journey.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-amber-500">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg mb-4">
                    <Image
                      src={member.image}
                      alt={`Team member ${member.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-amber-500 mb-2">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.experience}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
