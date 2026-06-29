export const BOTTOM_TABS = {
    Home: "Home",
    Forge: "Forge",
    Rankings: "Rankings",   
}


interface Idea {
  id: string
  startupName: string
  tagline: string
  description: string
  votes: number
  aiscore: number
  createdAt: string
}

// ─── Mock global leaderboard ─────────────────────────────────────────────────

export const GLOBAL_TOP5: Idea[] = [
  {
    id: 'g1',
    startupName: 'Project Helios',
    tagline: 'Decentralized Solar Credit Marketplace',
    description:
      'A peer-to-peer platform enabling homeowners to tokenize and trade surplus solar energy directly with local businesses. Using blockchain rails, homeowners earn real-time credits for every kilowatt-hour they feed into the local grid — credits that local cafés, gyms, and retailers can purchase at a discount. No utility middleman, no opaque billing, just transparent energy commerce at the neighborhood level.',
    votes: 1492,
    aiscore: 94,
    createdAt: '2024-01-01',
  },
  {
    id: 'g2',
    startupName: 'NeuralLink for Senior Care',
    tagline: 'Non-invasive BCI for elderly mobility',
    description:
      "Non-invasive brain-computer interface to assist mobility and communication for elderly care patients. The headband-style device reads motor-intent signals and translates them into wheelchair commands, smart-home controls, and text-to-speech output — no surgery, no implants. Designed in partnership with occupational therapists, it adapts to each patient's neural signature over the first 72 hours of use.",
    votes: 984,
    aiscore: 91,
    createdAt: '2024-01-02',
  },
  {
    id: 'g3',
    startupName: 'AquaHarvest Vertical Towers',
    tagline: 'Urban hydroponic food systems',
    description:
      "Hydroponic systems designed for compact urban balconies to solve local food deserts in metropolitan areas. Each 60 cm × 60 cm tower grows up to 36 plants simultaneously, consuming 95 % less water than soil farming and zero pesticides. An embedded sensor node monitors pH, humidity, and nutrient levels, pushing weekly harvest forecasts to the companion app so residents always know what's ready to pick.",
    votes: 871,
    aiscore: 88,
    createdAt: '2024-01-03',
  },
  {
    id: 'g4',
    startupName: 'Eco-Packaging AI Optimizer',
    tagline: 'AI that redesigns shipping waste',
    description:
      "Artificial intelligence that redesigns shipping containers to minimize waste and maximize volume efficiency. The model ingests a product's 3-D geometry and fragility rating, then auto-generates the minimal bounding box with integrated void-fill topology — cutting cardboard use by an average of 34 % and reducing dimensional-weight charges that e-commerce sellers pay carriers.",
    votes: 654,
    aiscore: 85,
    createdAt: '2024-01-04',
  },
  {
    id: 'g5',
    startupName: 'Modular Smartphone Kit',
    tagline: 'Standardized hardware you can upgrade',
    description:
      "Standardized hardware components that allow users to easily upgrade or repair mobile devices at home. A magnetic bus connector links swappable camera modules, battery slabs, and display panels — all sourced from a certified third-party ecosystem. Right-to-repair meets consumer electronics: replace only what breaks, upgrade only what matters, keep the rest.",
    votes: 512,
    aiscore: 82,
    createdAt: '2024-01-05',
  },
]