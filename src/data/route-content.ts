/**
 * Unique, route-specific content for each transfer route page.
 * Eliminates thin/duplicate content by providing real distances, times, and travel tips.
 */
export interface RouteContent {
  distance: string;
  duration: string;
  description: string;
  scenicHighlights: string[];
  travelTips: string[];
  faqs: { q: string; a: string }[];
}

export const routeContent: Record<string, RouteContent> = {
  "colombo-to-ella": {
    distance: "220 km",
    duration: "6-7 hours",
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
      { q: "Why choose a private Srilankan taxi over the public train or bus?", a: "While the scenic train is popular, tickets frequently sell out weeks in advance and luggage space is very tight. A private Srilankan taxi provides door-to-door hotel pickup, air conditioning, ample boot space, and the flexibility to stop at Kitulgala or waterfalls whenever you like." },
    ],
  },
  "ella-to-yala": {
    distance: "130 km",
    duration: "3-3.5 hours",
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
      { q: "Can I book a return taxi Lanka ride after my safari?", a: "Yes. Many travelers book a taxi Lanka return ride from Yala or Tissamaharama onwards to Mirissa, Galle, or back to Colombo Airport. Simply let us know your onwards itinerary when inquiring on WhatsApp." },
    ],
  },
  "airport-to-mirissa": {
    distance: "190 km",
    duration: "3-3.5 hours",
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
      { q: "How do I book a reliable taxi Lanka airport transfer?", a: "You can pre-book your taxi Lanka transfer with LKTaxi via WhatsApp before your flight. Share your flight number and hotel address, and your driver will meet you directly at the Colombo Airport arrival lobby with a nameboard." },
    ],
  },
  "kandy-to-sigiriya": {
    distance: "90 km",
    duration: "2-2.5 hours",
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
      { q: "Why hire a private Srilankan taxi driver for Sigiriya?", a: "Hiring a private Srilankan taxi gives you the freedom to set your own morning departure, stop at Matale spice gardens and Dambulla Cave Temple on the way, and keep your luggage safely stored in the air-conditioned vehicle while exploring." },
    ],
  },
  "galle-to-tangalle": {
    distance: "75 km",
    duration: "1.5-2 hours",
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
      { q: "Is taxi Sri Lanka service available 24/7 for Kandy airport pickups?", a: "Yes. Our taxi Sri Lanka transfer service operates 24 hours a day, 7 days a week. Whether your flight arrives at 2:00 AM or midday, a reserved air-conditioned vehicle and professional driver will be waiting for you." },
    ],
  },
  "airport-to-ella": {
    distance: "250 km",
    duration: "6-7 hours",
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
  "airport-to-colombo": {
    distance: "35 km",
    duration: "45-60 minutes",
    description:
      "Direct private transfer from Bandaranaike International Airport (CMB) to central Colombo hotels via the Katunayake Expressway (E03). Avoid public transport queues with a meet-and-greet in arrivals and a comfortable air-conditioned ride.",
    scenicHighlights: [
      "Expressway drive through tropical greenery",
      "Kelani River bridge crossing",
      "Colombo city skyline and Lotus Tower view on approach",
    ],
    travelTips: [
      "Share your flight number for free real-time flight tracking and arrivals hall meet-and-greet",
      "Expressway tolls are included in your quote",
      "During off-peak hours travel takes ~35 minutes; rush hour (8-9 AM, 5-7 PM) can take ~60 minutes",
    ],
    faqs: [
      { q: "How long is the taxi ride from Colombo airport to the city?", a: "Via the Katunayake Expressway, it takes 45-60 minutes depending on Colombo city traffic." },
      { q: "Where will my driver meet me at the airport?", a: "Your driver will wait in the arrivals lobby holding a name board with your name." },
    ],
  },
  "airport-to-negombo": {
    distance: "12 km",
    duration: "20-25 minutes",
    description:
      "A quick, convenient private transfer from Bandaranaike International Airport to Negombo beach hotels and guest houses. The ideal first stop after a long flight to relax by the Indian Ocean before exploring Sri Lanka.",
    scenicHighlights: [
      "Negombo lagoon outskirts",
      "Coastal fishing community scenes",
      "Negombo golden beach road",
    ],
    travelTips: [
      "Negombo is only 15-20 minutes from the airport — ideal for late night flight arrivals",
      "Pre-book so your driver is ready the moment you clear customs and baggage claim",
    ],
    faqs: [
      { q: "Is Negombo close to Colombo airport?", a: "Yes, Negombo is only 12 km north of Bandaranaike International Airport, making it the closest beach destination." },
      { q: "Can I book a late-night arrival transfer to Negombo?", a: "Yes, LKTaxi operates 24/7 with flight tracking for flights landing at any hour." },
    ],
  },
  "airport-to-bentota": {
    distance: "110 km",
    duration: "1.5-2 hours",
    description:
      "Direct private taxi from Colombo Airport to Bentota via the Southern Expressway (E01). Bentota is famous for golden sand beaches, luxury seaside resorts, and river water sports.",
    scenicHighlights: [
      "Southern Expressway crossing lush countryside",
      "Bentota River estuary",
      "South-west coastal palms",
    ],
    travelTips: [
      "The expressway bypasses city traffic for a fast, relaxed transfer",
      "Request a stop at the Madu River mangrove boat safari if arriving during daylight",
    ],
    faqs: [
      { q: "How far is Bentota from Colombo airport?", a: "Bentota is approximately 110 km south of the airport, taking about 1.5 to 2 hours via the Southern Expressway." },
    ],
  },
  "airport-to-hikkaduwa": {
    distance: "145 km",
    duration: "2-2.5 hours",
    description:
      "Private airport transfer from CMB to Hikkaduwa beach. Known for vibrant coral reefs, surfing beaches, and sea turtle sanctuaries, Hikkaduwa is easily reached via the Southern Expressway.",
    scenicHighlights: [
      "Southern Expressway countryside",
      "Hikkaduwa marine sanctuary coastal approach",
      "Coconut palm groves",
    ],
    travelTips: [
      "Highway exits allow quick access directly to Hikkaduwa town and Narigama beach",
      "Tell us if you have surfboards or extra luggage so we dispatch an appropriate van",
    ],
    faqs: [
      { q: "Can LKTaxi transport surfboards to Hikkaduwa?", a: "Yes, we have spacious KDH flat-roof and high-roof vans with ample room for surfboards and luggage." },
    ],
  },
  "airport-to-galle": {
    distance: "155 km",
    duration: "2-2.5 hours",
    description:
      "Seamless airport transfer from Colombo International Airport to historic Galle Fort and surrounding beach bays. The Southern Expressway ensures a smooth, high-speed journey from the airport.",
    scenicHighlights: [
      "Scenic southern lowlands",
      "Distant view of Rumassala hill",
      "UNESCO World Heritage Galle Fort entrance",
    ],
    travelTips: [
      "Galle Fort has narrow pedestrian streets — inform us of your hotel name so your driver drops you at the nearest gate",
      "Ideal starting point for exploring the south coast",
    ],
    faqs: [
      { q: "How long does a taxi take from Colombo airport to Galle Fort?", a: "It takes about 2 to 2.5 hours via the Southern Expressway." },
    ],
  },
  "airport-to-unawatuna": {
    distance: "160 km",
    duration: "2-2.5 hours",
    description:
      "Private door-to-door taxi from Colombo Airport to Unawatuna Bay. Unawatuna is one of Sri Lanka's most beloved beaches, featuring calm turquoise waters, beachside dining, and diving centers.",
    scenicHighlights: [
      "Southern Expressway route",
      "Rumassala Sanctuary hillside",
      "Unawatuna crescent bay",
    ],
    travelTips: [
      "The highway exit at Pinnaduwa/Galle leads straight to Unawatuna in under 15 minutes from the exit",
      "Great family beach destination with calm swimming conditions",
    ],
    faqs: [
      { q: "Is the transfer to Unawatuna direct?", a: "Yes, our driver picks you up inside arrivals and drives directly to your Unawatuna hotel without shared stops." },
    ],
  },
  "airport-to-weligama": {
    distance: "175 km",
    duration: "2.5-3 hours",
    description:
      "Private taxi transfer from Colombo Airport to Weligama surf bay. Weligama is world-renowned for beginner-friendly surf breaks, stilt fishermen, and relaxed beach vibes.",
    scenicHighlights: [
      "Southern Expressway landscapes",
      "Weligama bay panoramic view",
      "Taprobane Island in the bay",
    ],
    travelTips: [
      "Early morning arrivals reach Weligama in time for afternoon surf sessions",
      "Mention surfboards or group luggage for van recommendations",
    ],
    faqs: [
      { q: "How much is travel time to Weligama from CMB airport?", a: "Travel time is typically 2.5 to 3 hours along the Southern Expressway." },
    ],
  },
  "airport-to-tangalle": {
    distance: "215 km",
    duration: "3-3.5 hours",
    description:
      "Private transfer from Colombo Airport to Tangalle's secluded coves and luxury resorts in the deep south. The Southern Expressway extension makes Tangalle accessible directly from the airport.",
    scenicHighlights: [
      "Southern Expressway passing Matara",
      "Goyambokka and Silent Beach coastal roads",
      "Dry zone nature transitions",
    ],
    travelTips: [
      "Tangalle has pristine, tranquil beaches — a great retreat to start your holiday",
      "Driver will take the Southern Expressway all the way to the Barawakumbuka or Beliatta exit",
    ],
    faqs: [
      { q: "Is the expressway open all the way to Tangalle?", a: "Yes, the Southern Expressway extension runs directly toward Tangalle/Beliatta, cutting travel time drastically." },
    ],
  },
  "airport-to-yala": {
    distance: "260 km",
    duration: "4-4.5 hours",
    description:
      "Direct private taxi from Colombo Airport to Yala National Park and Tissamaharama safari hotels. Combine your arrival transfer with a pre-booked 4x4 private Yala safari.",
    scenicHighlights: [
      "Southern lowlands and salt pans near Hambantota",
      "Tissa Wewa lake at sunset",
      "Wildlife sightings near park boundaries",
    ],
    travelTips: [
      "If arriving on an early morning flight, you can reach Tissa by afternoon and be ready for a next-morning safari",
      "LKTaxi can bundle your transfer and safari jeep booking seamlessly",
    ],
    faqs: [
      { q: "Can I go directly from Colombo Airport to Yala in one day?", a: "Yes, via the Southern Expressway it takes approximately 4 to 4.5 hours door-to-door." },
    ],
  },
  "airport-to-sigiriya": {
    distance: "150 km",
    duration: "3.5-4 hours",
    description:
      "Private airport transfer from Colombo Airport to Sigiriya in the Cultural Triangle. Reach the iconic Lion Rock fortress and Dambulla cave temple comfortably with an experienced driver.",
    scenicHighlights: [
      "Central plains and coconut plantations",
      "Kurunegala rock formations",
      "First view of Sigiriya Rock on approach",
    ],
    travelTips: [
      "The route uses the Central Expressway to Mirigama/Kurunegala, significantly reducing travel time",
      "Consider stopping at Dambulla Cave Temple along the way",
    ],
    faqs: [
      { q: "How long is the drive from the airport to Sigiriya?", a: "The drive takes roughly 3.5 to 4 hours with modern expressway connections." },
    ],
  },
  "colombo-to-galle": {
    distance: "125 km",
    duration: "2 hours",
    description:
      "Fast, comfortable private transfer from Colombo hotels to Galle Fort and the southern coastline. Take the Southern Expressway for maximum convenience.",
    scenicHighlights: [
      "Expressway views of rubber and paddy plantations",
      "Approach to Galle harbour and Dutch colonial ramparts",
    ],
    travelTips: [
      "Door-to-door hotel pickup in Colombo avoids the chaos of Colombo Fort train station",
      "Great for day tours or hotel relocations",
    ],
    faqs: [
      { q: "How long is the taxi ride from Colombo to Galle?", a: "Via the Southern Expressway, it takes just about 1.5 to 2 hours." },
    ],
  },
  "colombo-to-mirissa": {
    distance: "150 km",
    duration: "2-2.5 hours",
    description:
      "Private transfer connecting Colombo to Mirissa beach. Ideal for travelers heading to the south coast for whale watching, surfing, and beach cafes.",
    scenicHighlights: [
      "Southern Expressway scenery",
      "Coconut palm groves",
      "Mirissa bay coastline",
    ],
    travelTips: [
      "Depart Colombo early to arrive in Mirissa with daylight to spare for the beach",
      "Custom stops available upon request",
    ],
    faqs: [
      { q: "Can we stop for lunch between Colombo and Mirissa?", a: "Yes, your private driver can stop at expressway service areas or scenic coastal restaurants." },
    ],
  },
  "mirissa-to-yala": {
    distance: "145 km",
    duration: "2.5-3 hours",
    description:
      "Transfer from Mirissa beach to Yala National Park (Tissamaharama). The classic tourist circuit route transitioning from south coast beaches to Sri Lanka's premier leopard safari park.",
    scenicHighlights: [
      "Tangalle coastline",
      "Hambantota coastal road",
      "Tissamaharama ancient reservoirs",
    ],
    travelTips: [
      "Finish your morning in Mirissa, check out around 11:00 AM, and arrive in Tissamaharama in time to rest before your morning safari",
      "LKTaxi is based in Tissamaharama for immediate safari support",
    ],
    faqs: [
      { q: "Is the road between Mirissa and Yala good?", a: "Yes, the Southern Expressway extension or coastal highway is smooth and well-maintained." },
    ],
  },
  "galle-to-yala": {
    distance: "170 km",
    duration: "3-3.5 hours",
    description:
      "Private transfer from Galle Fort to Yala National Park and Tissamaharama. Travel comfortably from the colonial south coast to the wilderness of the deep south.",
    scenicHighlights: [
      "Scenic southern highway",
      "Rural southern paddy fields",
      "Birdlife around Tissa Wewa",
    ],
    travelTips: [
      "Book your Yala safari jeep together with this transfer for discounted package pricing",
      "Optional detours include Bundala National Park or Kalametiya Bird Sanctuary",
    ],
    faqs: [
      { q: "How far is Yala from Galle?", a: "Galle to Yala is about 170 km and takes approximately 3 to 3.5 hours." },
    ],
  },
  "ella-to-mirissa": {
    distance: "175 km",
    duration: "3.5-4 hours",
    description:
      "Scenic hill country descent from Ella to Mirissa beach on the southern coast. Enjoy dramatic mountain passes transitioning into sunny coastal highways.",
    scenicHighlights: [
      "Ella Gap descent and Ravana Falls",
      "Wellawaya tea and forest scenery",
      "Southern Expressway stretch to Weligama/Mirissa",
    ],
    travelTips: [
      "Stop at Ravana Falls for photos on the way down from Ella",
      "Take motion sickness medication if winding mountain roads affect you",
    ],
    faqs: [
      { q: "Can we see Ravana Falls on the way from Ella to Mirissa?", a: "Yes, Ravana Falls is located directly along the main road descending from Ella." },
    ],
  },
  "kandy-to-ella": {
    distance: "140 km",
    duration: "3.5-4.5 hours",
    description:
      "Spectacular highland transfer from Kandy to Ella via Nuwara Eliya. Pass mist-shrouded tea plantations, roaring waterfalls, and colonial hill stations.",
    scenicHighlights: [
      "Ramboda Falls and mountain viewpoints",
      "Nuwara Eliya colonial architecture and Gregory Lake",
      "Endless emerald Ceylon tea estates",
    ],
    travelTips: [
      "If train tickets for the Kandy-Ella railway are sold out, a private taxi is faster and allows stops at tea factories and waterfalls",
      "Bring a warm layer for the cooler high-altitude passes near Nuwara Eliya",
    ],
    faqs: [
      { q: "Is a taxi faster than the Kandy to Ella train?", a: "Yes, a private taxi takes 3.5 to 4.5 hours door-to-door, whereas the train takes 6 to 7 hours plus station transfer time." },
      { q: "Can we stop at a tea factory along the way?", a: "Absolutely. We recommend stops at Damro Labookellie or Pedro Tea Estate for factory tours." },
    ],
  },
};
