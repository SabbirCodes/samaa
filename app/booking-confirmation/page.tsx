"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, Mail, Phone, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const success = searchParams.get("success") === "true"
  const [bookingDetails, setBookingDetails] = useState({
    bookingNumber: "WL" + Math.floor(100000 + Math.random() * 900000),
    trip: "Greek Islands Hopping",
    dates: "May 15, 2023 - May 24, 2023",
    travelers: 2,
    totalAmount: "$3,998",
    contactEmail: "support@wanderlust.com",
    contactPhone: "+1 (555) 123-4567",
  })

  useEffect(() => {
    if (!success) {
      router.push("/")
    }
  }, [success, router])

  if (!success) {
    return null
  }

  return (
    <div className="min-h-screen">

      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-amber-400 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <Check className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-black/80">Your adventure is waiting for you</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Booking Number</p>
                    <p className="font-bold">{bookingDetails.bookingNumber}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Trip</p>
                    <p className="font-bold">{bookingDetails.trip}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Dates</p>
                    <p className="font-bold">{bookingDetails.dates}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Travelers</p>
                    <p className="font-bold">{bookingDetails.travelers}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <p className="text-gray-500 text-sm">Total Amount</p>
                    <p className="font-bold">{bookingDetails.totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Check your email</p>
                      <p className="text-gray-600">
                        We've sent a confirmation email with all the details of your booking.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Our team will contact you</p>
                      <p className="text-gray-600">
                        A travel specialist will reach out within 24 hours to discuss payment and any questions you may
                        have.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Get ready for your trip</p>
                      <p className="text-gray-600">
                        We'll send you a detailed itinerary and travel tips closer to your departure date.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Mail className="text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-gray-600">{bookingDetails.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-600">{bookingDetails.contactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  <Download className="mr-2" size={18} />
                  Download Confirmation
                </button>
                <button className="flex-1 flex items-center justify-center border border-amber-400 text-amber-400 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  <Share2 className="mr-2" size={18} />
                  Share Booking
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-white hover:bg-gray-50 text-deep-navy font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

