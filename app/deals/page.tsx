"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, MapPin, Star, Users } from "lucide-react";

import { dealsData } from "@/data/deals-data";



export default function DealsPage() {
  const router = useRouter();

  const handleBookNow = (slug: string) => {
    router.push(`/deals/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Special Travel Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
            Limited-time offers on our most popular travel experiences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealsData.map((deal) => (
              <div
                key={deal.slug}
                className="bg-white group rounded-xl overflow-hidden hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300"
              >
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {deal.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {deal.discount}% OFF
                    </div>
                  )}

                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-amber-400">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {deal.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      {deal.reviews} reviews
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2 text-amber-400" />
                      {deal.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2 text-amber-400" />
                      {deal.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2 text-amber-400" />
                      {deal.groupSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 line-through text-sm">
                        ${deal.originalPrice}
                      </span>
                      <div className="text-2xl font-bold text-deep-navy">
                        ${deal.discountedPrice}
                      </div>
                      <span className="text-xs text-gray-600">per person</span>
                    </div>

                    <button
                      className="bg-amber-400 hover:bg-amber-500 hover:scale-105 active:scale-95 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      onClick={() => handleBookNow(deal.slug)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
