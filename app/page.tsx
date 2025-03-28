import Hero from "@/components/hero"
import Destinations from "@/components/destinations"
import Experience from "@/components/experience"
import Testimonials from "@/components/testimonials"
import Loader from "@/components/loader"
import TravelInspiration from "@/components/travel-inspiration"
import TravelDeals from "@/components/travel-deals"
import TravelPlanning from "@/components/travel-planing"



export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Loader />
      <Hero />
      <Destinations />
      <Experience />
      <TravelDeals />
      {/* <TravelPlanning /> */}
      <TravelInspiration />
      <Testimonials />
    </main>
  )
}

