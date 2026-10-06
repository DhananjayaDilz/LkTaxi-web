/**
 * Unique, route-specific content for each transfer route page.
 * Eliminates thin/duplicate content by providing real distances, times, and travel tips.
 */
export interface RouteContent {
  distance: string;
  duration: string;
  priceRange: string;
  description: string;
  scenicHighlights: string[];
  travelTips: string[];
  faqs: { q: string; a: string }[];
}

export const routeContent: Record<string, RouteContent> = {
  "colombo-to-ella": {
    distance: "220 km",
    duration: "6-7 hours",
    priceRange: "LKR 22,000-30,000",
    description:
      "The Colombo to Ella route takes you from Sri Lanka's bustling capital through the Southern Expressway before climbing into the misty central highlands. The landscape transforms dramatically — from coastal plains and rubber plantations to emerald tea fields and mountain valleys. Many travelers add stops at Kitulgala for white-water rafting or Ravana Falls near Ella.",
    scenicHighlights: [
      "Kitulgala — white-water rafting on the Kelani River",
      "Tea plantations around Nuwara Eliya",
      "Ravana Falls — a 25-metre waterfall just outside Ella",
      "Rolling green hills and mountain passes above 1,000 metres",
    ],
    travelTips: [
      "Request an early morning pickup (6-7 AM) to arrive in Ella before dark",
      "Ask your driver to take the scenic route via Nuwara Eliya if you have extra time",
      "The road after Welimada has many hairpin bends — take motion sickness medication if needed",
    ],
    faqs: [
      { q: "Is the road from Colombo to Ella safe?", a: "Yes. The road is paved throughout. LKTaxi drivers are experienced with this route and drive at a safe, comfortable pace. The mountain sections have tight bends but are well-maintained." },
      { q: "Can I stop at Kitulgala on the way?", a: "Yes. Kitulgala is roughly halfway and is a popular stop for white-water rafting. Tell your driver in advance so they can plan the itinerary." },
      { q: "What vehicle is best for Colombo to Ella?", a: "A sedan is fine for 1-3 passengers with standard luggage. For families or groups of 4+, we recommend a spacious van for extra comfort on the long journey." },
    ],
  },
  "ella-to-yala": {
    distance: "130 km",
    duration: "3-3.5 hours",
    priceRange: "LKR 12,000-16,000",
    description:
      "The Ella to Yala transfer descends from the cool highlands through winding mountain roads before reaching the dry lowlands of southern Sri Lanka. The route passes through Wellawaya and Tissamaharama — the gateway town to Yala National Park. Many travelers combine this transfer with a safari booking for the next morning.",
    scenicHighlights: [
      "Descent from Ella Gap with valley views",
      "Buduruwagala ancient rock carvings (optional detour)",
      "Dry-zone landscape change as you approach Yala",
      "Tissa Wewa lake in Tissamaharama",
    ],
    travelTips: [
      "Arrive in Tissa by afternoon so you can rest before a 5:00 AM safari pickup",
      "LKTaxi can arrange your Yala safari jeep — ask when booking your transfer",
      "If you want to see Buduruwagala (ancient Buddha carvings), request a 30-minute detour",
    ],
    faqs: [
      { q: "Should I book my safari when booking this transfer?", a: "Yes. LKTaxi can arrange both your Ella-to-Tissa transfer and your Yala safari jeep. Booking together ensures your safari guide knows your arrival time." },
      { q: "Where should I stay near Yala?", a: "Most travelers stay in Tissamaharama (20 min from Yala gates). There are also safari camps closer to the park for a more immersive experience." },
    ],
  },
  "airport-to-mirissa": {
    distance: "190 km",
    duration: "3-3.5 hours",
    priceRange: "LKR 18,000-24,000",
    description:
      "The airport to Mirissa transfer is one of the most popular routes for tourists heading straight to the southern beaches. Using the Southern Expressway, the journey bypasses Colombo traffic entirely and reaches the coast in about 3 hours. Mirissa is famous for whale watching, surfing, and beautiful sandy beaches.",
    scenicHighlights: [
      "Southern Expressway through palm-lined countryside",
      "First glimpse of the Indian Ocean at Matara",
      "Coconut Tree Hill viewpoint in Mirissa",
      "Stilt fishermen along the southern coast",
    ],
    travelTips: [
      "Share your flight number so your driver can track delays",
      "If arriving on a late-night flight, confirm your hotel can accept late check-ins",
      "The Southern Expressway has rest stops with clean facilities and food",
    ],
    faqs: [
      { q: "Is it worth going straight to Mirissa from the airport?", a: "Yes. If your priority is beach time and whale watching, going directly to Mirissa saves a night in Colombo. The 3-hour drive is comfortable in an air-conditioned car." },
      { q: "Can we stop for food on the way?", a: "Yes. There are several rest stops on the Southern Expressway with restaurants and facilities. Your driver can also recommend good local restaurants along the route." },
    ],
  },
  "kandy-to-sigiriya": {
    distance: "90 km",
    duration: "2-2.5 hours",
    priceRange: "LKR 10,000-14,000",
    description:
      "The Kandy to Sigiriya route travels through Sri Lanka's Cultural Triangle, passing through lush countryside, small villages, and agricultural landscapes. This transfer is often part of a day trip from Kandy that includes climbing Sigiriya Rock Fortress and visiting Dambulla Cave Temple before returning.",
    scenicHighlights: [
      "Matale spice gardens — optional stop for a spice tour",
      "Countryside villages and paddy fields",
      "Dambulla Cave Temple (20 min before Sigiriya)",
      "First sight of Sigiriya Rock from the approach road",
    ],
    travelTips: [
      "Start early (6:00-7:00 AM) to climb Sigiriya in cooler morning temperatures",
      "A round trip including Dambulla can be done comfortably in one day",
      "Tell your driver if you want to stop at a spice garden in Matale",
    ],
    faqs: [
      { q: "Can I do Sigiriya as a day trip from Kandy?", a: "Yes. Leave Kandy by 6:00 AM, climb Sigiriya by 9:00 AM, visit Dambulla Cave Temple in the afternoon, and return to Kandy by evening." },
      { q: "Is it better to stay near Sigiriya?", a: "If you also plan to visit Polonnaruwa and Minneriya, staying one night near Sigiriya makes the itinerary less rushed." },
    ],
  },
  "galle-to-tangalle": {
    distance: "75 km",
    duration: "1.5-2 hours",
    priceRange: "LKR 8,000-12,000",
    description:
      "The coastal road from Galle to Tangalle follows Sri Lanka's stunning southern coastline, passing through picturesque beach towns, fishing villages, and coconut groves. This is one of the most scenic coastal drives in the country, with the Indian Ocean constantly visible to your left.",
    scenicHighlights: [
      "Galle Fort lighthouse and harbour",
      "Unawatuna and Jungle Beach",
      "Mirissa and Coconut Tree Hill",
      "Pristine beaches near Tangalle",
    ],
    travelTips: [
      "This route passes through Mirissa and Weligama — great for lunch stops",
      "Ask your driver to take the coastal road (not the highway) for the best views",
      "Tangalle beaches are wilder and less crowded than Mirissa or Unawatuna",
    ],
    faqs: [
      { q: "Which beaches should I stop at between Galle and Tangalle?", a: "Unawatuna (15 min from Galle), Mirissa (1 hour), and Weligama are all worth a stop. Your LKTaxi driver can customise the journey based on your interests." },
      { q: "Is Tangalle better than Mirissa?", a: "Tangalle is quieter and more secluded — perfect if you prefer uncrowded beaches. Mirissa has more restaurants, nightlife, and whale watching." },
    ],
  },
  "airport-to-kandy": {
    distance: "110 km",
    duration: "3.5-4 hours",
    priceRange: "LKR 18,000-25,000",
    description:
      "The airport to Kandy transfer takes you from the coastal lowlands up into Sri Lanka's central highlands. The route uses the Central Expressway for a faster journey, or the scenic old Kadugannawa road that winds through mountains and rubber estates. Kandy, the cultural capital, rewards you with the Temple of the Tooth, botanical gardens, and cool mountain air.",
    scenicHighlights: [
      "Central Expressway through lush green countryside",
      "Mountain views as you approach the highlands",
      "Kadugannawa Pass (scenic old route)",
      "First view of Kandy Lake surrounded by hills",
    ],
    travelTips: [
      "Share your flight number for real-time tracking and meet-and-greet at arrivals",
      "The faster route via expressway takes 2.5-3 hours",
      "The scenic route via Kadugannawa adds 30-45 minutes but has stunning mountain views",
    ],
    faqs: [
      { q: "Can I stop at Pinnawala Elephant Orphanage on the way?", a: "Yes. Pinnawala is along the route from the airport to Kandy. Feeding times are at 9:15 AM and 1:15 PM — time your pickup accordingly." },
      { q: "Which route is better — expressway or old road?", a: "The expressway is faster (2.5-3 hours). The old road via Kadugannawa is scenic but adds 30-45 minutes. If you are tired after a long flight, the expressway is recommended." },
    ],
  },
  "airport-to-ella": {
    distance: "250 km",
    duration: "6-7 hours",
    priceRange: "LKR 25,000-35,000",
    description:
      "The airport to Ella transfer is a long but rewarding journey that takes you from sea level to the misty heights of Sri Lanka's hill country. The route crosses the Southern Expressway or central corridors before climbing through tea plantations and mountain passes to reach Ella at 1,041 metres. An overnight stop in Kandy or Nuwara Eliya is recommended but not required.",
    scenicHighlights: [
      "Transition from lowlands to highlands",
      "Endless tea plantations and waterfalls",
      "Mountain passes with panoramic views",
      "Arrival in Ella with views of Ella Gap",
    ],
    travelTips: [
      "This is a long drive — consider breaking it with an overnight in Kandy",
      "Request snack and bathroom stops (your driver will suggest good points)",
      "An early morning flight arrival gives you the best chance of reaching Ella before dark",
    ],
    faqs: [
      { q: "Can I go directly from the airport to Ella?", a: "Yes, it's possible in one day (6-7 hours). However, if you arrive on a late flight, we recommend an overnight in Negombo or Colombo and departing early the next morning." },
      { q: "Should I stop in Kandy on the way?", a: "If you have time, an overnight in Kandy breaks the journey nicely. You can visit the Temple of the Tooth, then continue to Ella the next day via the scenic Nuwara Eliya route." },
    ],
  },
  "mirissa-to-weligama": {
    distance: "7 km",
    duration: "10-15 minutes",
    priceRange: "LKR 2,000-3,000",
    description:
      "Mirissa to Weligama is a short coastal transfer between two popular beach towns on Sri Lanka's southern coast. Weligama is known for its gentle surf waves and stilt fishermen, while Mirissa offers whale watching and a lively beach scene. Despite the short distance, a private taxi is the most comfortable option, especially with luggage.",
    scenicHighlights: [
      "Coastal road with ocean views",
      "Stilt fishermen along the route",
      "Taprobane Island visible from Weligama bay",
    ],
    travelTips: [
      "This is a very short transfer — your driver can wait if you need a quick hotel change",
      "Mention surfboards or oversized luggage when booking",
    ],
    faqs: [
      { q: "Is it worth taking a taxi from Mirissa to Weligama?", a: "For luggage transfers between hotels, yes. A taxi is quick and comfortable. For a day trip without luggage, a tuk-tuk works fine for this short distance." },
    ],
  },
  "nuwara-eliya-to-ella": {
    distance: "55 km",
    duration: "1.5-2 hours",
    priceRange: "LKR 6,000-9,000",
    description:
      "The Nuwara Eliya to Ella route is one of the most scenic drives in Sri Lanka, passing through endless tea plantations, waterfalls, and misty mountain valleys. The road winds through the heart of Sri Lanka's tea country, offering views that rival the famous scenic train journey. This transfer can also include stops at working tea factories.",
    scenicHighlights: [
      "Vast tea plantations on both sides of the road",
      "Waterfall stops along the route",
      "Mountain passes with panoramic valley views",
      "Traditional Tamil tea-plucker villages",
    ],
    travelTips: [
      "Ask your driver to stop at a tea factory for a tour and tasting",
      "This route parallels the famous scenic train — if you couldn't get train tickets, the road is equally beautiful",
      "The road has many curves — take motion sickness precautions if needed",
    ],
    faqs: [
      { q: "Is the road from Nuwara Eliya to Ella scenic?", a: "Extremely scenic. It passes through the best tea country in Sri Lanka with views rivalling the famous train journey. Many travelers prefer the road for its flexibility to stop anywhere." },
      { q: "Can I stop at a tea factory?", a: "Yes. Several working tea factories along this route offer tours and tastings. Pedro Tea Factory near Nuwara Eliya is the most popular, but your driver may know smaller, less touristy options." },
    ],
  },
  "negombo-to-sigiriya": {
    distance: "155 km",
    duration: "3.5-4 hours",
    priceRange: "LKR 14,000-18,000",
    description:
      "The Negombo to Sigiriya route takes you from the coast into Sri Lanka's Cultural Triangle. Starting from this popular first-night stop near the airport, the journey passes through Kurunegala and Dambulla before reaching Sigiriya Rock Fortress. It's a popular transfer for travelers starting their Sri Lanka itinerary.",
    scenicHighlights: [
      "Transition from coastal to dry-zone landscapes",
      "Kurunegala Rock — elephant-shaped rock formation",
      "Dambulla Cave Temple (20 min before Sigiriya)",
      "Approach road to Sigiriya with rock visible in the distance",
    ],
    travelTips: [
      "An early start from Negombo gets you to Sigiriya in time for a morning climb",
      "Combine with Dambulla Cave Temple visit in the afternoon",
      "Spice gardens in Matale offer an optional detour if time allows",
    ],
    faqs: [
      { q: "Is it better to go to Sigiriya from Negombo or Colombo?", a: "Negombo is slightly closer and avoids Colombo city traffic. If you stayed in Negombo after your flight, it makes sense to head directly to Sigiriya." },
      { q: "Can I visit Dambulla on the way?", a: "Dambulla is only 20 minutes before Sigiriya on this route. However, most visitors climb Sigiriya first (early morning) and visit Dambulla in the afternoon." },
    ],
  },
  "bentota-to-galle": {
    distance: "55 km",
    duration: "1-1.5 hours",
    priceRange: "LKR 6,000-9,000",
    description:
      "The Bentota to Galle coastal route takes you along Sri Lanka's southwest coastline, passing through charming beach towns, fishing villages, and coconut plantations. The drive culminates at the magnificent Galle Fort — a UNESCO World Heritage Site with colonial architecture, boutique shops, and sunset fort-wall walks.",
    scenicHighlights: [
      "Ambalangoda — traditional mask-carving workshops",
      "Hikkaduwa coral viewing area",
      "Coastal fishing villages",
      "Arrival at historic Galle Fort",
    ],
    travelTips: [
      "Take the coastal road (not the highway) for the best views and stops",
      "Stop at Ambalangoda for traditional devil masks — great souvenirs",
      "Arrive in Galle by late afternoon for a sunset walk on the fort walls",
    ],
    faqs: [
      { q: "Should I take the highway or coastal road?", a: "The coastal road is more scenic and only adds 15-20 minutes. It passes through Hikkaduwa, Ambalangoda, and fishing villages. The highway is faster but misses the scenery." },
      { q: "Is Galle Fort worth a full day?", a: "You can see the main sights in 2-3 hours, but spending a half day allows you to explore the boutique shops, cafes, and museum at a relaxed pace." },
    ],
  },
  "unawatuna-to-mirissa": {
    distance: "35 km",
    duration: "40-50 minutes",
    priceRange: "LKR 4,000-6,000",
    description:
      "The Unawatuna to Mirissa transfer follows the southern coastal road, passing through Weligama and several small fishing villages. Both are popular beach destinations but with different vibes — Unawatuna is quieter and more sheltered, while Mirissa is livelier with whale-watching opportunities.",
    scenicHighlights: [
      "Coastal road with Indian Ocean views",
      "Weligama Bay and stilt fishermen",
      "Coconut Tree Hill viewpoint (Mirissa)",
    ],
    travelTips: [
      "Stop in Weligama for lunch or a quick surf lesson",
      "If moving hotels, mention your luggage count when booking",
    ],
    faqs: [
      { q: "Which is better, Unawatuna or Mirissa?", a: "Unawatuna has a calmer bay perfect for swimming. Mirissa has whale watching (Nov-Apr), better surfing, and livelier nightlife. Many travelers visit both." },
    ],
  },
  "udawalawe-to-yala": {
    distance: "100 km",
    duration: "2-3 hours",
    priceRange: "LKR 10,000-14,000",
    description:
      "The Udawalawe to Yala transfer takes you between Sri Lanka's two most popular national parks. After seeing elephants in Udawalawe, head east to Yala for the chance to spot leopards. The route passes through dry-zone scrubland and small towns, arriving at Tissamaharama — the base for Yala safaris.",
    scenicHighlights: [
      "Dry-zone landscape and scrubland",
      "Small southern towns and rural life",
      "Tissa Wewa lake on arrival",
    ],
    travelTips: [
      "Coordinate your Udawalawe safari finish time with this transfer",
      "Arrive in Tissa by afternoon to rest before an early Yala safari",
      "LKTaxi can book both your Udawalawe and Yala safaris",
    ],
    faqs: [
      { q: "Can I do Udawalawe and Yala safaris on consecutive days?", a: "Yes. This is a popular combination — elephants at Udawalawe one day, then transfer to Tissa and do a leopard safari at Yala the next morning." },
    ],
  },
  "trincomalee-to-sigiriya": {
    distance: "120 km",
    duration: "3-4 hours",
    priceRange: "LKR 12,000-16,000",
    description:
      "The Trincomalee to Sigiriya route connects the northeast coast with the Cultural Triangle. The drive passes through dry-zone forests and agricultural land, with occasional wild elephant sightings possible near Habarana. This transfer is ideal for combining east coast beaches with Cultural Triangle sightseeing.",
    scenicHighlights: [
      "Dry-zone forests and paddy fields",
      "Possible wild elephant sightings near Habarana",
      "Minneriya or Kaudulla tank (seasonal elephant gathering)",
      "Approach to Sigiriya through flat central plains",
    ],
    travelTips: [
      "The road passes near Minneriya National Park — ask about elephant gatherings (June-September)",
      "Start early if you want to climb Sigiriya the same afternoon",
    ],
    faqs: [
      { q: "Can I see wild elephants on this route?", a: "Possibly. The road passes near Habarana where wild elephants sometimes cross. During June-September, the famous 'Gathering' at Minneriya is nearby." },
    ],
  },
  "hikkaduwa-to-bentota": {
    distance: "25 km",
    duration: "30-45 minutes",
    priceRange: "LKR 3,000-5,000",
    description:
      "A short, scenic coastal transfer between two popular west coast beach towns. Hikkaduwa is known for its coral reefs and lively atmosphere, while Bentota offers a more upscale, resort-oriented experience with water sports on the Bentota River.",
    scenicHighlights: [
      "Coastal road through fishing villages",
      "Balapitiya mangrove river area",
      "Bentota Beach arrival",
    ],
    travelTips: [
      "Consider a brief stop at the Balapitiya river for a mangrove boat tour",
      "This short transfer is best combined with other activities or stops",
    ],
    faqs: [
      { q: "Is Bentota better than Hikkaduwa?", a: "They're different experiences. Hikkaduwa is more backpacker-friendly with coral reefs. Bentota is more upscale with luxury resorts and river-based water sports." },
    ],
  },
};
