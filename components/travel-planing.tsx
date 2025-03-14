"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  Users,
  Plane,
  Hotel,
  Car,
  Compass,
} from "lucide-react";

export default function TravelPlanning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("flights");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: false,
        once: true,
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="travel-planning" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Plan Your Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All the tools you need to create your perfect trip
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 pb-4">
            {[
              { id: "flights", label: "Flights", icon: Plane },
              { id: "hotels", label: "Hotels", icon: Hotel },
              { id: "cars", label: "Car Rental", icon: Car },
              { id: "activities", label: "Activities", icon: Compass },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-4 px-6 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-gray-400 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "flights" && (
              <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                {/* Trip Type Selection */}
                <div className="flex flex-wrap gap-4">
                  {["Round Trip", "One Way", "Multi-City"].map(
                    (type, index) => (
                      <label
                        key={index}
                        className="flex items-center cursor-pointer text-gray-700"
                      >
                        <input
                          type="radio"
                          name="trip-type"
                          className="mr-2 accent-amber-500"
                          defaultChecked={index === 0}
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>

                {/* From & To Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "From", placeholder: "City or Airport" },
                    { label: "To", placeholder: "City or Airport" },
                  ].map(({ label, placeholder }, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder={placeholder}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dates & Passengers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Departure", type: "date", icon: Calendar },
                    { label: "Return", type: "date", icon: Calendar },
                    { label: "Passengers", type: "select", icon: Users },
                  ].map(({ label, type, icon: Icon }, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        {type === "select" ? (
                          <select className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                            <option>1 Adult</option>
                            <option>2 Adults</option>
                            <option>3 Adults</option>
                            <option>4 Adults</option>
                          </select>
                        ) : (
                          <input
                            type={type}
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search Button */}
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                  Search Flights
                </button>
              </div>
            )}

            {activeTab === "hotels" && (
              <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                {/* Destination Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="City, Region or Specific Hotel"
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Check-in & Check-out */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Check-in", type: "date", icon: Calendar },
                    { label: "Check-out", type: "date", icon: Calendar },
                  ].map(({ label, type, icon: Icon }, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={type}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Guests & Rooms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Guests",
                      icon: Users,
                      options: ["1 Adult", "2 Adults", "3 Adults", "4+ Adults"],
                    },
                    {
                      label: "Rooms",
                      icon: Hotel,
                      options: ["1 Room", "2 Rooms", "3 Rooms", "4+ Rooms"],
                    },
                  ].map(({ label, icon: Icon, options }, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <select className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                          {options.map((option, idx) => (
                            <option key={idx}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search Button */}
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                  Search Hotels
                </button>
              </div>
            )}

            {activeTab === "cars" && (
              <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                {/* Pick-up Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Pick-up & Drop-off Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Pick-up Date", type: "date", icon: Calendar },
                    { label: "Drop-off Date", type: "date", icon: Calendar },
                  ].map(({ label, type, icon: Icon }, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={type}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search Button */}
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                  Search Car Rentals
                </button>
              </div>
            )}

            {activeTab === "activities" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="City or Region"
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Date</label>
                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="date"
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Activity Type
                    </label>
                    <div className="relative">
                      <Compass
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <select className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                        <option>All Activities</option>
                        <option>Adventure</option>
                        <option>Cultural</option>
                        <option>Food & Drink</option>
                        <option>Wellness</option>
                        <option>Wildlife</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  Find Activities
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
