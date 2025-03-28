"use client";

import { useRef, useState, useEffect } from "react";
import { Calendar, MapPin, Users, Plane, Hotel, Loader2 } from 'lucide-react';

// Types for our API responses
interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

interface HotelResult {
  id: string;
  name: string;
  address: string;
  stars: number;
  price: number;
  image: string;
  amenities: string[];
}

export default function TravelPlanning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("flights");
  
  // Form state
  const [tripType, setTripType] = useState("Round Trip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");
  
  const [hotelDestination, setHotelDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1 Adult");
  const [rooms, setRooms] = useState("1 Room");
  
  // API results
  const [airports, setAirports] = useState<Airport[]>([]);
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Airport[]>([]);
  const [hotelSuggestions, setHotelSuggestions] = useState<string[]>([]);
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch airports data on component mount
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        // In a real app, you would fetch from an actual API
        const response = await fetch('/api/airports');
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error("Error fetching airports:", error);
        // Use mock data if API fails
        setAirports(mockAirports);
      }
    };
    
    fetchAirports();
  }, []);

  // Handle airport search for origin
  const handleOriginSearch = (query: string) => {
    setOrigin(query);
    if (query.length > 1) {
      const filtered = airports.filter(airport => 
        airport.name.toLowerCase().includes(query.toLowerCase()) || 
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
      );
      setOriginSuggestions(filtered.slice(0, 5));
    } else {
      setOriginSuggestions([]);
    }
  };

  // Handle airport search for destination
  const handleDestinationSearch = (query: string) => {
    setDestination(query);
    if (query.length > 1) {
      const filtered = airports.filter(airport => 
        airport.name.toLowerCase().includes(query.toLowerCase()) || 
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
      );
      setDestinationSuggestions(filtered.slice(0, 5));
    } else {
      setDestinationSuggestions([]);
    }
  };

  // Handle hotel destination search
  const handleHotelDestinationSearch = (query: string) => {
    setHotelDestination(query);
    if (query.length > 1) {
      // In a real app, you would fetch from an actual API
      const suggestions = mockCities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      );
      setHotelSuggestions(suggestions.slice(0, 5));
    } else {
      setHotelSuggestions([]);
    }
  };

  // Search flights
  const searchFlights = async () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsLoadingFlights(true);
    setShowResults(true);
    
    try {
      // In a real app, you would fetch from an actual API with proper parameters
      // const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`);
      // const data = await response.json();
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data
      setFlights(mockFlights);
    } catch (error) {
      console.error("Error searching flights:", error);
      setFlights([]);
    } finally {
      setIsLoadingFlights(false);
    }
  };

  // Search hotels
  const searchHotels = async () => {
    if (!hotelDestination || !checkInDate || !checkOutDate) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsLoadingHotels(true);
    setShowResults(true);
    
    try {
      // In a real app, you would fetch from an actual API with proper parameters
      // const response = await fetch(`/api/hotels?destination=${hotelDestination}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}&rooms=${rooms}`);
      // const data = await response.json();
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data
      setHotels(mockHotels);
    } catch (error) {
      console.error("Error searching hotels:", error);
      setHotels([]);
    } finally {
      setIsLoadingHotels(false);
    }
  };

  return (
    <section id="travel-planning" ref={sectionRef} className="py-20 md:py-32 bg-gray-200">
      <div className="container 2xl:max-w-[1400px] mx-auto px-4">
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
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-4 px-6 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-gray-400 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowResults(false);
                }}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "flights" && (
              <>
                <div className="space-y-6 p-6">
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
                            className="mr-2"
                            checked={tripType === type}
                            onChange={() => setTripType(type)}
                          />
                          <span>{type}</span>
                        </label>
                      )
                    )}
                  </div>

                  {/* From & To Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        From
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="City or Airport"
                          value={origin}
                          onChange={(e) => handleOriginSearch(e.target.value)}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        {originSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {originSuggestions.map((airport) => (
                              <div
                                key={airport.code}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setOrigin(`${airport.city} (${airport.code})`);
                                  setOriginSuggestions([]);
                                }}
                              >
                                <div className="font-medium">{airport.city} ({airport.code})</div>
                                <div className="text-xs text-gray-500">{airport.name}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        To
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="City or Airport"
                          value={destination}
                          onChange={(e) => handleDestinationSearch(e.target.value)}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        {destinationSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {destinationSuggestions.map((airport) => (
                              <div
                                key={airport.code}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setDestination(`${airport.city} (${airport.code})`);
                                  setDestinationSuggestions([]);
                                }}
                              >
                                <div className="font-medium">{airport.city} ({airport.code})</div>
                                <div className="text-xs text-gray-500">{airport.name}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dates & Passengers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Departure
                      </label>
                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Return
                      </label>
                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={departureDate || new Date().toISOString().split('T')[0]}
                          disabled={tripType === "One Way"}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Passengers
                      </label>
                      <div className="relative">
                        <Users
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <select 
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                        >
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>3 Adults</option>
                          <option>4 Adults</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                    onClick={searchFlights}
                    disabled={isLoadingFlights}
                  >
                    {isLoadingFlights ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Search Flights"
                    )}
                  </button>
                </div>

                {/* Flight Results */}
                {showResults && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Flight Results</h3>
                    {isLoadingFlights ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 size={40} className="animate-spin text-amber-500" />
                      </div>
                    ) : flights.length > 0 ? (
                      <div className="space-y-4">
                        {flights.map((flight) => (
                          <div key={flight.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                              <div className="mb-2 md:mb-0">
                                <div className="font-bold">{flight.airline}</div>
                                <div className="text-sm text-gray-500">Flight {flight.flightNumber}</div>
                              </div>
                              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                                <div className="text-center">
                                  <div className="font-bold">{flight.departureTime}</div>
                                  <div className="text-sm">{flight.departureAirport}</div>
                                </div>
                                <div className="text-center text-gray-500">
                                  <div className="text-xs">{flight.duration}</div>
                                  <div className="w-20 h-px bg-gray-300 my-1 mx-auto"></div>
                                  <div className="text-xs">Direct</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold">{flight.arrivalTime}</div>
                                  <div className="text-sm">{flight.arrivalAirport}</div>
                                </div>
                                <div className="ml-0 md:ml-auto">
                                  <div className="font-bold text-lg">${flight.price}</div>
                                  <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium py-1 px-4 rounded transition-colors">
                                    Select
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No flights found. Please try different search criteria.
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === "hotels" && (
              <>
                <div className="space-y-6 p-6">
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
                        value={hotelDestination}
                        onChange={(e) => handleHotelDestinationSearch(e.target.value)}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {hotelSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          {hotelSuggestions.map((city, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setHotelDestination(city);
                                setHotelSuggestions([]);
                              }}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Check-in & Check-out */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Check-in
                      </label>
                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Check-out
                      </label>
                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          min={checkInDate || new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests & Rooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Guests
                      </label>
                      <div className="relative">
                        <Users
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <select 
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                        >
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>3 Adults</option>
                          <option>4+ Adults</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Rooms
                      </label>
                      <div className="relative">
                        <Hotel
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <select 
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
                          value={rooms}
                          onChange={(e) => setRooms(e.target.value)}
                        >
                          <option>1 Room</option>
                          <option>2 Rooms</option>
                          <option>3 Rooms</option>
                          <option>4+ Rooms</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                    onClick={searchHotels}
                    disabled={isLoadingHotels}
                  >
                    {isLoadingHotels ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Search Hotels"
                    )}
                  </button>
                </div>

                {/* Hotel Results */}
                {showResults && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Hotel Results</h3>
                    {isLoadingHotels ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 size={40} className="animate-spin text-amber-500" />
                      </div>
                    ) : hotels.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hotels.map((hotel) => (
                          <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={hotel.image || "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                                alt={hotel.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-lg">{hotel.name}</h4>
                                  <p className="text-sm text-gray-500">{hotel.address}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg">${hotel.price}</div>
                                  <div className="text-xs text-gray-500">per night</div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="flex mb-2">
                                  {Array.from({ length: hotel.stars }).map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {hotel.amenities.slice(0, 3).map((amenity, i) => (
                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                  {hotel.amenities.length > 3 && (
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                      +{hotel.amenities.length - 3} more
                                    </span>
                                  )}
                                </div>
                                <button className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium py-2 px-4 rounded transition-colors">
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No hotels found. Please try different search criteria.
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Travel Insurance",
              description: "Protect your journey with comprehensive coverage for unexpected events.",
              icon: "🛡️",
            },
            {
              title: "24/7 Support",
              description: "Our travel experts are available around the clock to assist with any issues.",
              icon: "🌐",
            },
            {
              title: "Best Price Guarantee",
              description: "Find a lower price? We'll match it and give you an additional 10% off.",
              icon: "💰",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mock data for airports
const mockAirports: Airport[] = [
  { code: "DAC", name: "Hazrat Shahjalal International Airport", city: "Dhaka", country: "Bangladesh" },
  { code: "CGP", name: "Shah Amanat International Airport", city: "Chittagong", country: "Bangladesh" },
  { code: "ZYL", name: "Osmani International Airport", city: "Sylhet", country: "Bangladesh" },
  { code: "RJH", name: "Shah Makhdum Airport", city: "Rajshahi", country: "Bangladesh" },
  { code: "SPD", name: "Saidpur Airport", city: "Saidpur", country: "Bangladesh" },
  { code: "BZL", name: "Barisal Airport", city: "Barisal", country: "Bangladesh" },
  { code: "CXB", name: "Cox's Bazar Airport", city: "Cox's Bazar", country: "Bangladesh" },
  { code: "JSR", name: "Jashore Airport", city: "Jashore", country: "Bangladesh" },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
    { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
    { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
    { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
    { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA" },
    { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
    { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
    { code: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore" },
    { code: "FCO", name: "Leonardo da Vinci International Airport", city: "Rome", country: "Italy" },
    { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico" },
    { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA" },
    { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA" },
    { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
    { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
    { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
    { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
    { code: "AMS", name: "Amsterdam Schiphol Airport", city: "Amsterdam", country: "Netherlands" },
    { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong" },
    { code: "GRU", name: "São Paulo-Guarulhos International Airport", city: "São Paulo", country: "Brazil" },
    { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
    { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
    { code: "BCN", name: "Barcelona-El Prat Airport", city: "Barcelona", country: "Spain" },
    { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India" },
    { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
    { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
    { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
    { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
    { code: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina" },
    { code: "DME", name: "Domodedovo International Airport", city: "Moscow", country: "Russia" },
    { code: "GIG", name: "Rio de Janeiro-Galeão International Airport", city: "Rio de Janeiro", country: "Brazil" },
    { code: "SVO", name: "Sheremetyevo International Airport", city: "Moscow", country: "Russia" },
    { code: "JNB", name: "O. R. Tambo International Airport", city: "Johannesburg", country: "South Africa" },
    { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia" },
    { code: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines" },
    { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa" },
    { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },
    { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria" },
    { code: "OSL", name: "Oslo Gardermoen Airport", city: "Oslo", country: "Norway" },
    { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden" },
    { code: "HEL", name: "Helsinki-Vantaa Airport", city: "Helsinki", country: "Finland" },
    { code: "LIS", name: "Humberto Delgado Airport", city: "Lisbon", country: "Portugal" },
    { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
    { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },
    { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
    { code: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland" },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
    { code: "TLV", name: "Ben Gurion Airport", city: "Tel Aviv", country: "Israel" },
    { code: "MIA", name: "Miami International Airport", city: "Miami", country: "USA" },
    { code: "PHX", name: "Phoenix Sky Harbor International Airport", city: "Phoenix", country: "USA" },
    { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "USA" },
    { code: "DEN", name: "Denver International Airport", city: "Denver", country: "USA" },
    { code: "BOS", name: "Logan International Airport", city: "Boston", country: "USA" },
    { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },
    { code: "SCL", name: "Comodoro Arturo Merino Benítez International Airport", city: "Santiago", country: "Chile" },
    { code: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia" },
    { code: "PTY", name: "Tocumen International Airport", city: "Panama City", country: "Panama" },
    { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia" },
    { code: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia" },
    { code: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam" },
    { code: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam" },
    { code: "CUN", name: "Cancún International Airport", city: "Cancún", country: "Mexico" }
  ];
  

// Mock data for cities
const mockCities: string[] = [
  "New York", "London", "Paris", "Tokyo", "Dubai", 
  "Singapore", "Rome", "Barcelona", "Sydney", "Hong Kong",
  "Bangkok", "Amsterdam", "Berlin", "Madrid", "Vienna"
];

// Mock data for flights
const mockFlights: Flight[] = [
  {
    id: "f1",
    airline: "Delta Airlines",
    flightNumber: "DL1234",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "08:00 AM",
    arrivalTime: "11:30 AM",
    duration: "5h 30m",
    price: 349
  },
  {
    id: "f2",
    airline: "American Airlines",
    flightNumber: "AA5678",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "10:15 AM",
    arrivalTime: "01:45 PM",
    duration: "5h 30m",
    price: 329
  },
  {
    id: "f3",
    airline: "United Airlines",
    flightNumber: "UA9012",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "02:30 PM",
    arrivalTime: "06:00 PM",
    duration: "5h 30m",
    price: 389
  },
  {
    id: "f4",
    airline: "JetBlue",
    flightNumber: "B6345",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "07:45 PM",
    arrivalTime: "11:15 PM",
    duration: "5h 30m",
    price: 299
  }
];

// Mock data for hotels
const mockHotels: HotelResult[] = [
  {
    id: "h1",
    name: "Grand Plaza Hotel",
    address: "123 Main St, Downtown",
    stars: 5,
    price: 299,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service"]
  },
  {
    id: "h2",
    name: "Seaside Resort",
    address: "456 Beach Rd, Oceanfront",
    stars: 4,
    price: 199,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Pool", "Beach Access", "Restaurant", "Bar"]
  },
  {
    id: "h3",
    name: "City Center Inn",
    address: "789 Urban Ave, Midtown",
    stars: 3,
    price: 129,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Breakfast Included", "Parking"]
  },
  {
    id: "h4",
    name: "Luxury Suites",
    address: "101 Exclusive Blvd, Uptown",
    stars: 5,
    price: 399,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Concierge"]
  }
];
