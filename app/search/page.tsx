"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin } from "lucide-react"
// import { searchData } from "@/data/search-data"
import { destinationsData } from "@/data/destination-data"


export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    setLoading(true)
    const timer = setTimeout(() => {
      // Filter mock data based on search query
      const filteredResults = destinationsData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.country.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with new search query
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
    // Trigger the search effect
    const event = new Event("popstate")
    window.dispatchEvent(event)
  }

  return (
    <div className="min-h-screen">

      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container 2xl:max-w-[1400px] mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Search Results</h1>

          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full pl-10 outline-none pr-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-r-lg transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : (
            <>
              <p className="text-center mb-8">
                {results.length === 0
                  ? `No results found for "${query}"`
                  : `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.type === "deal" && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Special Deal
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin size={14} className="mr-1 text-amber-400" />
                        {item.country}
                      </div>

                      <h2 className="text-2xl font-bold mb-3">{item.name}</h2>
                      <p className="text-gray-600 mb-6">{item.description}</p>

                      {item.type === "deal" && (
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-2xl font-bold text-deep-navy">${item.price}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                      )}

                      <Link
                        href={`/${item.type}s/${item.slug}`}
                        className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full transition-all duration-300"
                      >
                        {item.type === "destination"
                          ? "Explore"
                          : item.type === "experience"
                            ? "Book Experience"
                            : "View Deal"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

