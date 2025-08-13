/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users, Check } from "lucide-react"
import { dealsData } from "@/data/deals-data"

// Component that depends on useSearchParams
function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dealId = searchParams.get("dealId")
  const dateId = searchParams.get("dateId")

  const [deal, setDeal] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Find deal and date from URL params
  useState(() => {
    // Simulate API call with a delay
    setLoading(true)
    const timer = setTimeout(() => {
      if (dealId && dateId) {
        const foundDeal = dealsData.find((d) => d.slug === dealId)
        if (foundDeal) {
          const foundDate = foundDeal.dates.find((d: any) => d.id.toString() === dateId)
          setDeal(foundDeal)
          setSelectedDate(foundDate)
        }
      }
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push("/booking-confirmation?success=true")
      }, 2000)
    }, 1200)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    )
  }

  if (!deal || !selectedDate) {
    return (
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Invalid Booking</h1>
        <p className="text-xl mb-8">The deal or date you selected is not valid.</p>
        <button
          onClick={() => router.push("/deals")}
          className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
        >
          Browse All Deals
        </button>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Complete Your Booking</h1>

      {isSuccess ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-gray-600 mb-4">
              {`Thank you for your booking. We're redirecting you to the confirmation page...`}
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400 mx-auto"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Traveler Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="travelers" className="block text-sm font-medium mb-2">
                  Number of Travelers
                </label>
                <select
                  id="travelers"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Dietary requirements, accessibility needs, etc."
                ></textarea>
              </div>

              <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
              <p className="text-gray-600 mb-6">
                No payment is required at this time. We will contact you to confirm your booking and arrange
                payment.
              </p>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Complete Booking"
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
              </div>

              <h3 className="font-bold text-lg mb-2">{deal.title}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2 text-amber-400" />
                  {deal.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2 text-amber-400" />
                  {selectedDate.startDate} - {selectedDate.endDate}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-2 text-amber-400" />
                  {deal.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={14} className="mr-2 text-amber-400" />
                  {formData.travelers} {formData.travelers === 1 ? "Traveler" : "Travelers"}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Price per person</span>
                  <span>${selectedDate.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Travelers</span>
                  <span>x {formData.travelers}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${selectedDate.price * formData.travelers}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="flex items-start mb-2">
                  <Check size={14} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  Free cancellation up to 30 days before departure
                </p>
                <p className="flex items-start">
                  <Check size={14} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  No payment required today
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Loading state component for suspense fallback
function CheckoutLoading() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Complete Your Booking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-xl shadow-md animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-100 rounded w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-100 rounded w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
            
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 mt-8"></div>
            <div className="h-16 bg-gray-100 rounded w-full mb-8"></div>
            
            <div className="h-12 bg-amber-200 rounded w-full"></div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            <div className="space-y-4 mb-4">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="h-5 bg-gray-100 rounded w-full mb-2"></div>
              <div className="h-5 bg-gray-100 rounded w-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Main component with Suspense
export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <Suspense fallback={<CheckoutLoading />}>
            <CheckoutContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}