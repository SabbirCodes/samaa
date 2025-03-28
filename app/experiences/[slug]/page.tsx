"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Clock,
  Users,
  MapPin,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { experiencesData } from "@/data/experiences-data";



export default function ExperienceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [experience, setExperience] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [openSection, setOpenSection] = useState<string>("highlights")
  const [activeImage, setActiveImage] = useState<number>(0)

  useEffect(() => {
    // Simulate API call with a delay
    setLoading(true)
    const timer = setTimeout(() => {
      const foundExperience = experiencesData.find((exp) => exp.slug === params.slug)
      setExperience(foundExperience || null)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.slug])

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection("")
    } else {
      setOpenSection(section)
    }
  }

  const handleBookNow = () => {
    if (selectedDate) {
      router.push(`/checkout?experience=${experience.slug}&dateId=${selectedDate}`)
    } else {
      alert("Please select a date first")
    }
  }

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

  if (!experience) {
    return (
      <div className="min-h-screen">
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Experience Not Found
            </h1>
            <p className="text-xl mb-8">
              The experience you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              onClick={() => router.push("/experiences")}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              Browse All Experiences
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <Link
            href="/experiences"
            className="inline-flex items-center text-amber-400 hover:text-amber-500 mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all experiences
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={experience.gallery[activeImage] || experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {experience.gallery.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                        activeImage === index ? "ring-2 ring-amber-400" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${experience.title} - image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {experience.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-amber-400">
                  <Star size={20} className="fill-current" />
                  <span className="ml-1 font-medium">{experience.rating}</span>
                </div>
                <span className="text-gray-600">
                  ({experience.reviews} reviews)
                </span>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-1" />
                  {experience.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-1" />
                  {experience.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-1" />
                  {experience.groupSize}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  About This Experience
                </h2>
                <div className="text-gray-700 space-y-4">
                  {experience.fullDescription
                    .split("\n\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("highlights")}
                  >
                    <h2 className="text-xl font-bold">Highlights</h2>
                    {openSection === "highlights" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "highlights" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <ul className="space-y-2">
                        {experience.highlights.map(
                          (highlight: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Check
                                size={18}
                                className="text-amber-400 mr-2 mt-1 flex-shrink-0"
                              />
                              <span>{highlight}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("itinerary")}
                  >
                    <h2 className="text-xl font-bold">Itinerary</h2>
                    {openSection === "itinerary" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "itinerary" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <div className="space-y-4">
                        {experience.itinerary.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border-l-2 border-amber-400 pl-4"
                            >
                              <h3 className="font-bold">{item.time}</h3>
                              <p className="text-gray-600">{item.activity}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("includes")}
                  >
                    <h2 className="text-xl font-bold">What's Included</h2>
                    {openSection === "includes" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "includes" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <ul className="space-y-2">
                        {experience.includes.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Check
                                size={18}
                                className="text-green-500 mr-2 mt-1 flex-shrink-0"
                              />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("excludes")}
                  >
                    <h2 className="text-xl font-bold">What's Not Included</h2>
                    {openSection === "excludes" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "excludes" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <ul className="space-y-2">
                        {experience.excludes.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">✕</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-deep-navy">
                    ${experience.price}
                  </div>
                  <span className="text-sm text-gray-600">per person</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Select a Date</h3>
                  <div className="space-y-2">
                    {experience.availableDates.map((date: any) => (
                      <button
                        key={date.id}
                        className={`w-full p-3 rounded-lg border text-left ${
                          selectedDate === date.id
                            ? "border-amber-400 bg-amber-50"
                            : "border-gray-200 hover:border-amber-200"
                        } ${
                          date.availability === "Sold Out"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          date.availability !== "Sold Out" &&
                          setSelectedDate(date.id)
                        }
                        disabled={date.availability === "Sold Out"}
                      >
                        <div className="flex justify-between">
                          <span>{date.date}</span>
                          <span
                            className={`text-sm ${
                              date.availability === "Limited"
                                ? "text-orange-500"
                                : date.availability === "Sold Out"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {date.availability}
                          </span>
                        </div>
                        {date.availability !== "Sold Out" && (
                          <div className="text-sm mt-1">
                            {date.spots} spots left
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                    !selectedDate ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  onClick={handleBookNow}
                  disabled={!selectedDate}
                >
                  Book Now
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  No payment required to book
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Have questions about this experience?
                  </p>
                  <Link
                    href="/contact"
                    className="text-amber-400 hover:text-amber-500 text-sm font-medium flex items-center"
                  >
                    Contact our travel specialists
                    <ChevronDown
                      size={16}
                      className="ml-1 transform rotate-270"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
