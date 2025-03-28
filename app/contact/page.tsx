"use client"

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container 2xl:max-w-[1400px] mx-auto px-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
          >
            Contact Us
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
          >
            Have questions about our destinations or ready to plan your next adventure? Our travel specialists are here to help.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400" placeholder="How can we help you?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows={6} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400" placeholder="Tell us about your travel plans or questions..."></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  type="submit" 
                  className="flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-white border border-gray-300 rounded-xl p-8 mb-8">
                {[{
                  icon: <MapPin size={24} className="text-amber-400" />, 
                  title: "Our Address", 
                  details: "123 Travel Street, Comilla City, Bangladesh"
                }, {
                  icon: <Mail size={24} className="text-amber-400" />, 
                  title: "Email Us", 
                  details: "info@Samma.com | bookings@Samma.com"
                }, {
                  icon: <Phone size={24} className="text-amber-400" />, 
                  title: "Call Us", 
                  details: "+1 (555) 123-4567 | +1 (555) 987-6543"
                }].map((info, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start mb-6" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="mr-4 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
