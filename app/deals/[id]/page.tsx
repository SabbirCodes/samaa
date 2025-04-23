/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { dealsData } from "@/data/deals-data";

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string>("highlights");

  useEffect(() => {
    // Simulate API call with a delay
    setLoading(true);
    const timer = setTimeout(() => {
      const foundDeal = dealsData.find((d) => d.slug === params.id);
      setDeal(foundDeal || null);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [params.id]);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection("");
    } else {
      setOpenSection(section);
    }
  };

  const handleBookNow = () => {
    if (selectedDate) {
      router.push(`/checkout?dealId=${deal.slug}&dateId=${selectedDate}`);
    } else {
      alert("Please select a date first");
    }
  };

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

  if (!deal) {
    return (
      <div className="min-h-screen">
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Deal Not Found
            </h1>
            <p className="text-xl mb-8">
              {`The deal you're looking for doesn't exist or has been removed.`}
            </p>
            <button
              onClick={() => router.push("/deals")}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              Browse All Deals
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover"
                />
                {deal.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                    {deal.discount}% OFF
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {deal.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-amber-400">
                  <Star size={20} className="fill-current" />
                  <span className="ml-1 font-medium">{deal.rating}</span>
                </div>
                <span className="text-gray-600">({deal.reviews} reviews)</span>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-1" />
                  {deal.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-1" />
                  {deal.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-1" />
                  {deal.groupSize}
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8">{deal.description}</p>

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
                        {deal.highlights.map(
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
                        {deal.itinerary.map((day: any) => (
                          <div
                            key={day.day}
                            className="border-l-2 border-amber-400 pl-4"
                          >
                            <h3 className="font-bold">
                              Day {day.day}: {day.title}
                            </h3>
                            <p className="text-gray-600">{day.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("includes")}
                  >
                    <h2 className="text-xl font-bold">{`What's Included`}</h2>
                    {openSection === "includes" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "includes" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <ul className="space-y-2">
                        {deal.includes.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Check
                              size={18}
                              className="text-green-500 mr-2 mt-1 flex-shrink-0"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => toggleSection("excludes")}
                  >
                    <h2 className="text-xl font-bold">{`What's Not Included`}</h2>
                    {openSection === "excludes" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>

                  {openSection === "excludes" && (
                    <div className="bg-white p-4 rounded-b-lg shadow-sm mt-1">
                      <ul className="space-y-2">
                        {deal.excludes.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <div className="mb-4">
                  <span className="text-gray-400 line-through text-lg">
                    ${deal.originalPrice}
                  </span>
                  <div className="text-3xl font-bold text-deep-navy">
                    ${deal.discountedPrice}
                  </div>
                  <span className="text-sm text-gray-600">per person</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Select a Date</h3>
                  <div className="space-y-2">
                    {deal.dates.map((date: any) => (
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
                          <span>
                            {date.startDate} - {date.endDate}
                          </span>
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
                        {date.price !== deal.discountedPrice && (
                          <div className="text-sm mt-1">
                            ${date.price} per person
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
