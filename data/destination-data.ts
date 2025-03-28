export interface Destination {
  slug: string;
  name: string;
  country: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit?: string;
  longDescription?: string;
  experiences?: string[];
  travelTips?: string[];
}

export const destinationsData = [
  {
    slug: "santorini-greece",
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic white-washed buildings with blue domes overlooking the Aegean Sea.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Stunning sunset views from Oia",
      "Black sand beaches",
      "Ancient ruins of Akrotiri",
      "Local wine tasting experiences",
    ],
    bestTimeToVisit: "May-October",
    longDescription:
      "Santorini is a beautiful island in Greece, known for its stunning sunsets, dramatic views, and whitewashed buildings with blue domes. Its unique volcanic history and picturesque landscapes make it a popular tourist destination. Visitors can explore ancient ruins, enjoy local wines, and relax on black sand beaches. Santorini’s charm is undeniable, with its romantic atmosphere perfect for couples and adventurers alike.",
    experiences: [
      "Watching the sunset in Oia",
      "Exploring the ancient ruins of Akrotiri",
      "Swimming at the black sand beaches",
      "Tasting local wines at traditional wineries",
      "Dining in cliff-side restaurants overlooking the sea",
    ],
    travelTips: [
      "Wear comfortable shoes for exploring the island's hilly terrain",
      "Make restaurant reservations for sunset views",
      "Rent a scooter to explore the island at your own pace",
      "Visit the ancient ruins early in the morning to avoid crowds",
      "Stay hydrated and use sunscreen, as it gets hot during summer",
    ],
  },
  {
    slug: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    description:
      "Japan's former capital, known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Fushimi Inari Shrine with thousands of torii gates",
      "Arashiyama Bamboo Grove",
      "Historic Gion district",
      "Beautiful cherry blossoms in spring",
      "Kinkaku-ji (Golden Pavilion)",
    ],
    bestTimeToVisit: "March-May and October-November",
    longDescription:
      "Kyoto, once the capital of Japan for over a thousand years, is a city that seamlessly blends ancient traditions with modern life. With over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites, Kyoto represents the heart of traditional Japanese culture. The city is renowned for its classical gardens, traditional wooden architecture, and the elusive geiko (Kyoto's geisha) who still practice ancient arts of hospitality in the historic Gion district.",
    experiences: [
      "Participating in a traditional tea ceremony",
      "Staying in a ryokan (traditional Japanese inn)",
      "Witnessing a geiko performance",
      "Exploring Nishiki Market for local delicacies",
      "Meditating in a Zen garden",
    ],
    travelTips: [
      "Purchase a bus pass for easy transportation around the city",
      "Visit popular sites early in the morning to avoid crowds",
      "Dress modestly when visiting temples and shrines",
      "Learn a few basic Japanese phrases",
      "Try kaiseki cuisine, Kyoto's traditional multi-course meal",
    ],
  },
  {
    slug: "machu-picchu-peru",
    name: "Machu Picchu",
    country: "Peru",
    description: "Mysterious Incan citadel set high in the Andes Mountains.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Sunrise at the Sun Gate",
      "Huayna Picchu hike",
      "Inca Trail experience",
      "Ancient stone architecture",
    ],
  },
  {
    slug: "bali-indonesia",
    name: "Bali",
    country: "Indonesia",
    description:
      "Tropical paradise with lush rice terraces, sacred temples, and pristine beaches.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Ubud Monkey Forest",
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Surfing at Kuta Beach",
    ],
  },
  {
    slug: "marrakech-morocco",
    name: "Marrakech",
    country: "Morocco",
    description:
      "Vibrant markets, stunning palaces, and rich cultural heritage in this ancient city.",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Jemaa el-Fnaa square",
      "Bahia Palace",
      "Majorelle Garden",
      "Shopping in the souks",
    ],
  },
  {
    slug: "reykjavik-iceland",
    name: "Reykjavik",
    country: "Iceland",
    description:
      "Gateway to dramatic landscapes of volcanoes, geysers, hot springs and lava fields.",
    image:
      "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Northern Lights viewing",
      "Blue Lagoon geothermal spa",
      "Golden Circle tour",
      "Whale watching",
    ],
  },
  {
    slug: "venice-italy",
    name: "Venice",
    country: "Italy",
    description:
      "Romantic canals, historic architecture, and charming gondola rides.",
    image:
      "https://images.unsplash.com/photo-1545157000-85f257f7b040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "St. Mark's Basilica",
      "Gondola ride through the Grand Canal",
      "Rialto Bridge",
      "Murano glass workshops",
    ],
  },
  {
    slug: "cappadocia-turkey",
    name: "Cappadocia",
    country: "Turkey",
    description:
      "A surreal landscape of fairy chimneys, ancient cave dwellings, and hot air balloon rides.",
    image:
      "https://images.unsplash.com/photo-1604156787928-a5e83b3544f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Hot air balloon rides at sunrise",
      "Göreme Open-Air Museum",
      "Underground cities of Derinkuyu",
      "Hiking in Rose Valley",
    ],
  },
  {
    slug: "dubai-uae",
    name: "Dubai",
    country: "United Arab Emirates",
    description:
      "A futuristic metropolis with skyscrapers, luxury shopping, and desert adventures.",
    image:
      "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari and dune bashing",
      "Palm Jumeirah and Atlantis",
      "Dubai Mall and fountain show",
    ],
  },
  {
    slug: "prague-czech-republic",
    name: "Prague",
    country: "Czech Republic",
    description:
      "A fairy-tale city with stunning medieval architecture and rich history.",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Charles Bridge",
      "Prague Castle",
      "Old Town Square and Astronomical Clock",
      "Boat cruise on the Vltava River",
    ],
  },
  {
    slug: "sydney-australia",
    name: "Sydney",
    country: "Australia",
    description:
      "A vibrant city with iconic landmarks, beautiful beaches, and a lively atmosphere.",
    image:
      "https://images.unsplash.com/photo-1612953293239-4befdc359b72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Sydney Opera House",
      "Harbour Bridge climb",
      "Bondi Beach",
      "Taronga Zoo",
    ],
  },
  {
    slug: "cape-town-south-africa",
    name: "Cape Town",
    country: "South Africa",
    description:
      "A stunning coastal city with breathtaking landscapes and rich cultural heritage.",
    image:
      "https://images.unsplash.com/photo-1588455471455-4b28e9ab3cd5?q=80&w=2131&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      "Table Mountain cableway",
      "Boulders Beach penguin colony",
      "Cape of Good Hope",
      "Robben Island tour",
    ],
  },
];
