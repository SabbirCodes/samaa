"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }}
          viewport={{ once: true }}
        >
          <motion.div>
            <h3 className="text-2xl font-bold mb-6">SAMAA</h3>
            <p className="text-gray-400 mb-6">
              Crafting unforgettable journeys to the world's most extraordinary destinations.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div>
            <h4 className="text-lg font-semibold mb-6">Destinations</h4>
            <ul className="space-y-3">
              {["Europe", "Asia", "Africa", "South America", "North America", "Oceania"].map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div>
            <h4 className="text-lg font-semibold mb-6">Travel Styles</h4>
            <ul className="space-y-3">
              {["Luxury", "Adventure", "Cultural", "Wellness", "Family", "Honeymoon"].map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <motion.li className="flex items-start space-x-3">
                <MapPin size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Travel Street, Bangladesh</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3">
                <Phone size={20} className="text-amber-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3">
                <Mail size={20} className="text-amber-400 flex-shrink-0" />
                <span className="text-gray-400">info@samaa.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} Samaa Travel. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
