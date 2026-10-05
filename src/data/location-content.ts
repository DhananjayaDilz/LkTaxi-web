import { Location } from "./locations";

export interface LocationContent {
  intro: string;
  highlights: string[];
  travelTip: string;
  nearbyAttractions: string[];
  faqs: { q: string; a: string }[];
}

/**
 * Unique, destination-specific content for each location page.
 * Google penalises thin/duplicate pages — every entry here must be distinct.
 */
export const locationContent: Partial<Record<Location, LocationContent>> = {
  colombo: {
    intro:
      "Colombo is Sri Lanka's commercial capital and the gateway for most visitors arriving by air. From the vibrant Pettah Market to the serene Gangaramaya Temple and the modern Colombo Lotus Tower, the city blends colonial heritage with contemporary energy. LKTaxi provides comfortable private transfers across Colombo — whether you need to reach your hotel from Bandaranaike International Airport, travel between the Fort and Mount Lavinia, or head out to Negombo, Kandy, or the southern coast.",
    highlights: [
      "Airport to Colombo city center: ~45-60 min, LKR 8,000-12,000",
      "Popular stops: Gangaramaya Temple, Galle Face Green, Colombo Lotus Tower",
      "Air-conditioned sedans and vans available 24/7",
      "WhatsApp your flight number for meet-and-greet at arrivals",
    ],
    travelTip:
      "Colombo traffic peaks between 7-9 AM and 5-7 PM on weekdays. If you are heading to Ella or Kandy, request an early morning pickup to beat the city rush.",
    nearbyAttractions: ["Negombo Beach", "Kelaniya Temple", "Mount Lavinia Beach", "Beira Lake"],
    faqs: [
      { q: "How long is the taxi ride from Colombo Airport to the city?", a: "The drive from Bandaranaike International Airport (CMB) to central Colombo takes approximately 45-60 minutes depending on traffic. During off-peak hours it can be as fast as 35 minutes." },
      { q: "Can I book a taxi from Colombo to Ella?", a: "Yes. The Colombo to Ella route takes about 6-7 hours via the Southern Expressway. LKTaxi provides comfortable sedans and vans with experienced drivers who know the scenic stops along the way." },
    ],
  },
  ella: {
    intro:
      "Ella is a small hill-country town in Sri Lanka's central highlands, famous for the Nine Arch Bridge, Ella Rock, and Little Adam's Peak. Surrounded by rolling tea plantations and misty valleys, Ella is a must-visit for hikers, train enthusiasts, and anyone seeking cooler mountain air. LKTaxi connects Ella to Colombo, Kandy, Nuwara Eliya, Yala, and other major destinations with reliable private transfers.",
    highlights: [
      "Colombo to Ella: ~6-7 hours, starting from LKR 22,000",
      "Must-see: Nine Arch Bridge, Ella Rock, Ravana Falls",
      "Best season: January-March and July-September",
      "Ella is a popular starting point for Yala National Park safaris",
    ],
    travelTip:
      "The Ella-Kandy train is one of the world's most scenic railway journeys. Combine it with a private taxi for the segments where trains are fully booked or inconvenient.",
    nearbyAttractions: ["Ravana Falls", "Dowa Rock Temple", "Demodara Nine Arch Bridge", "Lipton's Seat"],
    faqs: [
      { q: "What is the best way to get from Colombo to Ella?", a: "A private taxi is the most comfortable option — 6-7 hours door to door with flexible stops. The alternative is the scenic train via Kandy and Nuwara Eliya (8-10 hours with transfers)." },
      { q: "How far is Ella from Yala National Park?", a: "Ella to Yala (Tissamaharama) is approximately 130 km and takes about 3 hours by private taxi. LKTaxi can arrange your transfer and safari booking together." },
    ],
  },
  kandy: {
    intro:
      "Kandy is Sri Lanka's cultural capital, home to the sacred Temple of the Tooth Relic and surrounded by lush hills and the picturesque Kandy Lake. The city hosts the famous Esala Perahera festival every August. LKTaxi offers private transfers to Kandy from the airport, Colombo, Sigiriya, Ella, and other key destinations. Our drivers can include stops at the Pinnawala Elephant Orphanage or the Royal Botanical Gardens in Peradeniya.",
    highlights: [
      "Airport to Kandy: ~3.5-4 hours, starting from LKR 18,000",
      "Must-see: Temple of the Tooth, Royal Botanical Gardens, Kandy Lake",
      "Best for: Cultural Triangle day trips, tea factory tours",
      "Combine with Sigiriya or Dambulla for a 2-day Cultural Triangle tour",
    ],
    travelTip:
      "The road from Colombo to Kandy via the expressway takes about 2.5 hours. The older Kadugannawa route is slower but passes through beautiful mountain scenery.",
    nearbyAttractions: ["Pinnawala Elephant Orphanage", "Peradeniya Botanical Gardens", "Hanthana Mountain", "Bahirawakanda Temple"],
    faqs: [
      { q: "How long does it take to reach Kandy from Colombo Airport?", a: "A private taxi from Bandaranaike International Airport to Kandy takes approximately 3.5-4 hours via the Central Expressway. We provide meet-and-greet at arrivals." },
      { q: "Can I visit Sigiriya as a day trip from Kandy?", a: "Yes. Kandy to Sigiriya is about 2.5 hours each way. An early morning departure allows you to climb the rock, visit Dambulla Cave Temple, and return to Kandy by evening." },
    ],
  },
  airport: {
    intro:
      "Bandaranaike International Airport (CMB) in Katunayake is Sri Lanka's main international gateway. Whether you are arriving or departing, LKTaxi provides reliable airport pickup and drop-off services to any destination in Sri Lanka. We monitor your flight in real time and meet you at the arrivals hall with a name board — no waiting, no hassle.",
    highlights: [
      "Airport to Negombo: ~15 min, LKR 3,500-5,000",
      "Airport to Colombo: ~45-60 min, LKR 8,000-12,000",
      "Airport to Kandy: ~3.5-4 hours, LKR 18,000-25,000",
      "Flight monitoring and meet-and-greet included in all pickups",
    ],
    travelTip:
      "Share your flight number when booking so we can track your arrival. For late-night flights, your driver will be waiting regardless of delays — no extra charge for flight delays.",
    nearbyAttractions: ["Negombo Beach", "Negombo Fish Market", "Dutch Canal", "St. Mary's Church Negombo"],
    faqs: [
      { q: "Do you meet passengers at arrivals?", a: "Yes. Your driver will be at the arrivals exit with a name board. We track your flight and adjust pickup time automatically for early or delayed arrivals." },
      { q: "What if my flight is delayed?", a: "We monitor all incoming flights. Your driver adjusts to your actual arrival time at no extra cost. Simply send us your flight number when booking." },
    ],
  },
  sigiriya: {
    intro:
      "Sigiriya Rock Fortress — the ancient Lion Rock — is Sri Lanka's most iconic UNESCO World Heritage Site. Rising 180 metres above the central plains, this 5th-century palace features stunning frescoes, the Mirror Wall, and panoramic views from the summit. LKTaxi provides private transfers to Sigiriya from Colombo, the airport, Kandy, Dambulla, and other destinations.",
    highlights: [
      "Colombo to Sigiriya: ~4-5 hours, starting from LKR 16,000",
      "Must-see: Lion Gate, Frescoes, Water Gardens, Summit Ruins",
      "Best time to climb: Early morning (6:30-9:00 AM) or late afternoon",
      "Often combined with Dambulla Cave Temple (20 min away)",
    ],
    travelTip:
      "Arrive early to avoid the midday heat and crowds. The climb is about 1,200 steps and takes 1.5-2 hours at a comfortable pace.",
    nearbyAttractions: ["Dambulla Cave Temple", "Pidurangala Rock", "Minneriya National Park", "Polonnaruwa Ancient City"],
    faqs: [
      { q: "How do I get to Sigiriya from Colombo?", a: "A private taxi from Colombo to Sigiriya takes 4-5 hours. LKTaxi can arrange a day trip or multi-day Cultural Triangle tour including Sigiriya, Dambulla, and Polonnaruwa." },
      { q: "Can I visit Sigiriya and Dambulla in one day?", a: "Yes. Dambulla Cave Temple is only 20 minutes from Sigiriya. Most travelers visit Sigiriya in the morning and Dambulla in the afternoon." },
    ],
  },
  galle: {
    intro:
      "Galle is a coastal city in southern Sri Lanka, famous for the historic Galle Fort — a UNESCO World Heritage Site built by the Portuguese and fortified by the Dutch. Inside the fort walls you will find boutique shops, art galleries, cafes, and colonial architecture. LKTaxi provides private transfers to Galle from Colombo, the airport, Mirissa, Unawatuna, and other destinations along the southern coast.",
    highlights: [
      "Colombo to Galle: ~2-2.5 hours via Southern Expressway",
      "Must-see: Galle Fort, Lighthouse, Flag Rock, Maritime Museum",
      "Beach towns nearby: Unawatuna (10 min), Hikkaduwa (20 min)",
      "Walking the fort walls at sunset is a highlight of any Sri Lanka trip",
    ],
    travelTip:
      "The Southern Expressway makes Galle an easy day trip from Colombo. If you are heading further south to Mirissa or Tangalle, Galle makes a perfect lunch stop.",
    nearbyAttractions: ["Unawatuna Beach", "Japanese Peace Pagoda", "Jungle Beach", "Koggala Lake"],
    faqs: [
      { q: "How far is Galle from Colombo?", a: "Galle is approximately 120 km from Colombo. Via the Southern Expressway, the drive takes about 2-2.5 hours by private taxi." },
      { q: "Is Galle Fort worth visiting?", a: "Absolutely. Galle Fort is one of Sri Lanka's most photographed landmarks. Allow 2-3 hours to explore the fort walls, lighthouse, shops, and cafes inside." },
    ],
  },
  mirissa: {
    intro:
      "Mirissa is a tropical beach town on Sri Lanka's southern coast, beloved by surfers, sunbathers, and whale-watching enthusiasts. Between November and April, blue whales and dolphins can be spotted just offshore. LKTaxi connects Mirissa to Colombo Airport, Galle, Ella, Yala, and other popular destinations with comfortable private transfers.",
    highlights: [
      "Airport to Mirissa: ~3-3.5 hours via Southern Expressway",
      "Best for: Whale watching (Nov-Apr), surfing, beach relaxation",
      "Nearby: Weligama (10 min), Galle (45 min), Tangalle (1 hour)",
      "Popular with backpackers and honeymooners alike",
    ],
    travelTip:
      "Whale-watching boats depart at 6:30 AM — book your hotel in Mirissa the night before. LKTaxi can arrange your airport-to-Mirissa transfer to arrive the previous evening.",
    nearbyAttractions: ["Coconut Tree Hill", "Parrot Rock", "Weligama Bay", "Stilt Fishermen"],
    faqs: [
      { q: "How do I get to Mirissa from the airport?", a: "A private taxi from Colombo Airport to Mirissa takes approximately 3-3.5 hours via the Southern Expressway. LKTaxi provides door-to-door service to your hotel." },
      { q: "When is the best time for whale watching in Mirissa?", a: "The whale-watching season runs from November to April, with peak sightings in February and March. Blue whales and spinner dolphins are commonly seen." },
    ],
  },
  negombo: {
    intro:
      "Negombo is the closest beach town to Bandaranaike International Airport, making it a popular first or last stop for travelers. Known for its long sandy beach, vibrant fish market, and Dutch colonial canal system, Negombo offers a relaxed introduction to Sri Lanka. LKTaxi provides quick airport transfers and connections to Colombo, Kandy, and Sigiriya.",
    highlights: [
      "Airport to Negombo: ~15 minutes, LKR 3,500-5,000",
      "Best for: First-night stay after a long flight",
      "Don't miss: Negombo Fish Market (early morning), Dutch Canal boat rides",
      "Gateway to the Cultural Triangle and Hill Country",
    ],
    travelTip:
      "Negombo is ideal for your first night in Sri Lanka. Rest after your flight, visit the fish market the next morning, then head to Sigiriya or Kandy.",
    nearbyAttractions: ["Negombo Lagoon", "Angurukaramulla Temple", "St. Mary's Church", "Hamilton Canal"],
    faqs: [
      { q: "How far is Negombo from the airport?", a: "Negombo is only about 10 km from Bandaranaike International Airport — the drive takes approximately 15-20 minutes depending on traffic." },
      { q: "Is Negombo worth staying for more than one night?", a: "Negombo is mainly used as a transit stop. One night is usually sufficient before heading to more exciting destinations like Sigiriya, Kandy, or Ella." },
    ],
  },
  "nuwara-eliya": {
    intro:
      "Nuwara Eliya — known as 'Little England' — sits at 1,868 metres in Sri Lanka's central highlands. Surrounded by tea plantations, waterfalls, and cool misty air, it is a refreshing escape from the tropical heat. LKTaxi provides private transfers to Nuwara Eliya from Kandy, Ella, Colombo, and the airport.",
    highlights: [
      "Kandy to Nuwara Eliya: ~2.5-3 hours through tea country",
      "Must-see: Gregory Lake, Horton Plains, Pedro Tea Factory",
      "Average temperature: 15-20°C year-round — bring a jacket!",
      "Best time: April (Sinhala New Year celebrations and flower season)",
    ],
    travelTip:
      "Nuwara Eliya gets cold at night — temperatures can drop to 10°C. Pack warm layers even if you are arriving from a beach destination.",
    nearbyAttractions: ["Horton Plains & World's End", "Gregory Lake", "Pedro Tea Estate", "Seetha Amman Temple"],
    faqs: [
      { q: "How do I get to Nuwara Eliya?", a: "The most scenic route is by private taxi from Kandy (2.5-3 hours) through rolling tea plantations. LKTaxi can include a stop at a working tea factory along the way." },
      { q: "Is Nuwara Eliya cold?", a: "Yes, compared to the rest of Sri Lanka. Daytime temperatures range from 15-20°C and nights can drop to 10°C. Bring warm clothing." },
    ],
  },
  yala: {
    intro:
      "Yala National Park is Sri Lanka's premier wildlife destination, famous for having the highest density of leopards per square kilometre in the world. Located in the southeast near Tissamaharama, Yala also hosts elephants, sloth bears, crocodiles, and over 215 bird species. LKTaxi arranges private transfers to Yala and can connect you with trusted safari jeep operators.",
    highlights: [
      "Colombo to Yala: ~5-6 hours, starting from LKR 25,000",
      "Peak leopard season: February-July (dry season)",
      "Safari options: Half-day, full-day, and shared jeep tours",
      "Ella to Yala: ~3 hours — a popular next stop after the hill country",
    ],
    travelTip:
      "Book your safari jeep in advance during peak season (Feb-Jul). Morning safaris starting at 5:30 AM have the best chance of leopard sightings.",
    nearbyAttractions: ["Tissamaharama Lake", "Kirinda Beach", "Bundala National Park", "Kataragama Temple"],
    faqs: [
      { q: "What is the best time to visit Yala?", a: "February to July is peak dry season — animals gather at waterholes and leopard sightings are at their highest. Avoid September-October when Block 1 closes for conservation." },
      { q: "How much does a Yala safari cost?", a: "A half-day private safari costs approximately Rs. 15,000-16,000 for the jeep plus USD 17-25 park entrance fees per person. Full-day safaris are Rs. 30,000-32,000." },
    ],
  },
  dambulla: {
    intro:
      "Dambulla is home to the magnificent Dambulla Cave Temple (also known as the Golden Temple), a UNESCO World Heritage Site featuring five caves filled with over 150 Buddha statues and stunning ceiling frescoes. Located in the Cultural Triangle, Dambulla is only 20 minutes from Sigiriya, making it easy to visit both in a single day.",
    highlights: [
      "Colombo to Dambulla: ~4 hours via the Colombo-Kandy highway",
      "Must-see: Five cave temples with 150+ Buddha statues",
      "Often combined with Sigiriya Rock Fortress (20 min away)",
      "The Golden Temple entrance is a massive golden Buddha statue",
    ],
    travelTip:
      "Visit Dambulla in the afternoon after climbing Sigiriya in the cooler morning hours. The caves are shaded and comfortable even in the midday heat.",
    nearbyAttractions: ["Sigiriya Rock Fortress", "Nalanda Gedige", "Pidurangala Rock", "Kandalama Lake"],
    faqs: [
      { q: "How long does it take to visit Dambulla Cave Temple?", a: "Allow about 1.5-2 hours to climb the hill and explore all five caves. The climb is moderate — much easier than Sigiriya." },
      { q: "Can I visit Dambulla and Sigiriya in one day?", a: "Yes, they are only 20 minutes apart. Most visitors climb Sigiriya early morning and visit Dambulla Cave Temple in the afternoon." },
    ],
  },
  anuradhapura: {
    intro:
      "Anuradhapura is one of the ancient capitals of Sri Lanka and a UNESCO World Heritage Site. The city's Sacred City features massive dagobas (stupas), ancient monasteries, and the sacred Sri Maha Bodhi tree — said to be the oldest historically documented tree in the world. LKTaxi provides private transfers to Anuradhapura from Colombo, Sigiriya, Trincomalee, and other destinations.",
    highlights: [
      "Colombo to Anuradhapura: ~4-5 hours",
      "Must-see: Sri Maha Bodhi, Ruwanwelisaya Dagoba, Jetavanaramaya",
      "Best explored by car — the ancient city covers a large area",
      "Combine with Mihintale (13 km away) for a complete pilgrimage",
    ],
    travelTip:
      "The ancient city is spread over a large area — a private car with driver is the most practical way to explore. Cycling is also popular for the fitter traveler.",
    nearbyAttractions: ["Mihintale", "Isurumuniya Temple", "Thuparamaya", "Abhayagiri Monastery"],
    faqs: [
      { q: "How many days do I need for Anuradhapura?", a: "One full day is sufficient to see the main sights. If you want to include Mihintale and explore in depth, consider two days." },
      { q: "Is Anuradhapura worth visiting?", a: "Absolutely. It is one of the best-preserved ancient cities in South Asia, with ruins dating back over 2,000 years. A must for history lovers." },
    ],
  },
  polonnaruwa: {
    intro:
      "Polonnaruwa is the second ancient capital of Sri Lanka, a UNESCO World Heritage Site renowned for its well-preserved ruins from the 12th century. The ancient city features the famous Gal Vihara rock-carved Buddha statues, the Royal Palace of King Parakramabahu, and the beautifully preserved Quadrangle. LKTaxi provides transfers from Sigiriya, Dambulla, Kandy, and Colombo.",
    highlights: [
      "Sigiriya to Polonnaruwa: ~1.5-2 hours",
      "Must-see: Gal Vihara, Royal Palace, Vatadage, Parakrama Samudra",
      "Best explored by bicycle within the ancient city",
      "The Gal Vihara Buddha statues are among the finest in the world",
    ],
    travelTip:
      "Rent a bicycle at the entrance to the ancient city — the ruins are spread over several kilometres and cycling is the best way to explore at your own pace.",
    nearbyAttractions: ["Parakrama Samudra (ancient reservoir)", "Medirigiriya Vatadage", "Minneriya National Park"],
    faqs: [
      { q: "How do I get to Polonnaruwa?", a: "A private taxi from Sigiriya takes about 1.5-2 hours. From Colombo, the drive is approximately 5-6 hours. LKTaxi can include Polonnaruwa in a Cultural Triangle tour." },
      { q: "Which is better, Anuradhapura or Polonnaruwa?", a: "Both are worth visiting but different. Polonnaruwa is more compact and the ruins are better preserved. Anuradhapura is larger and more sacred. If you have time, visit both." },
    ],
  },
  trincomalee: {
    intro:
      "Trincomalee is a port city on Sri Lanka's northeast coast, known for its stunning natural harbour, pristine beaches, and excellent whale-watching opportunities. Pigeon Island is one of Sri Lanka's best snorkelling spots, and Nilaveli Beach is consistently rated among the finest in the country. LKTaxi connects Trincomalee to Sigiriya, Kandy, Colombo, and the Cultural Triangle.",
    highlights: [
      "Sigiriya to Trincomalee: ~3-4 hours",
      "Best for: Beaches, snorkelling at Pigeon Island (May-Oct)",
      "Whale watching season: March-August (sperm whales)",
      "Historic Koneswaram Temple overlooks the harbour",
    ],
    travelTip:
      "The east coast has opposite weather to the south and west — visit Trincomalee from May to October when the weather is dry and the seas are calm for snorkelling.",
    nearbyAttractions: ["Pigeon Island", "Nilaveli Beach", "Koneswaram Temple", "Fort Frederick"],
    faqs: [
      { q: "When is the best time to visit Trincomalee?", a: "May to October is ideal — dry weather, calm seas for swimming and snorkelling. The west and south coasts get monsoon rains during this period, making Trinco the perfect alternative." },
      { q: "How far is Trincomalee from Sigiriya?", a: "Trincomalee is approximately 120 km from Sigiriya — about 3-4 hours by private taxi. LKTaxi can arrange this as part of a Cultural Triangle itinerary." },
    ],
  },
  "arugam-bay": {
    intro:
      "Arugam Bay is Sri Lanka's premier surfing destination, located on the southeast coast. Known for its world-class point break, laid-back vibe, and beautiful lagoons, it attracts surfers and beach lovers from around the world. LKTaxi provides transfers from Ella, Colombo, Yala, and Batticaloa to Arugam Bay.",
    highlights: [
      "Ella to Arugam Bay: ~3-4 hours",
      "Best surfing season: April-October",
      "Main point break, Whiskey Point, and Peanut Farm for all levels",
      "Kumana National Park nearby for wildlife lovers",
    ],
    travelTip:
      "The road to Arugam Bay from Ella passes through beautiful rural countryside. April to October is surf season — outside this period the seas can be rough.",
    nearbyAttractions: ["Kumana National Park", "Whiskey Point", "Pottuvil Lagoon", "Elephant Rock"],
    faqs: [
      { q: "How do I get to Arugam Bay?", a: "The most common route is from Ella (3-4 hours by taxi). From Colombo, it takes about 7-8 hours. There is no rail connection — a private taxi is the most practical option." },
      { q: "Is Arugam Bay only for surfers?", a: "Not at all. The area offers beautiful beaches, lagoon safaris, Kumana National Park for birdwatching, and a relaxed beach town atmosphere perfect for all travelers." },
    ],
  },
  tissamaharama: {
    intro:
      "Tissamaharama (Tissa) is the gateway town to Yala National Park, located in Sri Lanka's deep south. It is home to the scenic Tissa Wewa lake and ancient Buddhist sites. Most travelers use Tissa as a base for early-morning Yala safaris. LKTaxi is based in Tissamaharama, making us the local experts for transfers and safari arrangements.",
    highlights: [
      "Ella to Tissa: ~3 hours",
      "Safari jeep arrangements for Yala available through LKTaxi",
      "Stay overnight in Tissa for 5:30 AM safari departures",
      "LKTaxi headquarters — our drivers know every road in the region",
    ],
    travelTip:
      "Book your Tissa hotel near the lake for a scenic stay. LKTaxi can pick you up from your hotel at 4:30-5:00 AM for your early-morning safari.",
    nearbyAttractions: ["Yala National Park", "Tissa Wewa Lake", "Kataragama Temple", "Kirinda Beach"],
    faqs: [
      { q: "Why should I stay in Tissamaharama?", a: "Tissa is the closest town to Yala National Park (20 min). Staying here allows you to be at the park gates by 5:30 AM for the best wildlife sightings." },
      { q: "Is LKTaxi based in Tissamaharama?", a: "Yes. LKTaxi is headquartered in Tissamaharama, giving us unmatched local knowledge of the southern region, Yala safari routes, and the best local drivers." },
    ],
  },
  udawalawe: {
    intro:
      "Udawalawe National Park is Sri Lanka's best destination for guaranteed elephant sightings. Unlike in other parks, elephants here roam in large herds across open grasslands, making them easy to spot year-round. The Elephant Transit Home — a rehabilitation centre for orphaned baby elephants — is another must-visit. LKTaxi provides transfers from Ella, Colombo, Yala, and other destinations.",
    highlights: [
      "Colombo to Udawalawe: ~4-5 hours",
      "Elephant sightings virtually guaranteed year-round",
      "Elephant Transit Home feeding times: 9 AM, 12 PM, 3 PM, 6 PM",
      "Often combined with Yala in a wildlife-focused itinerary",
    ],
    travelTip:
      "Unlike Yala, Udawalawe doesn't close seasonally and elephant sightings are almost guaranteed. Visit the Elephant Transit Home at feeding time for an unforgettable experience.",
    nearbyAttractions: ["Elephant Transit Home", "Udawalawe Reservoir", "Nonagama", "Mini World's End"],
    faqs: [
      { q: "Will I definitely see elephants at Udawalawe?", a: "Yes. Udawalawe has one of the highest densities of Asian elephants in the world. Sightings are virtually guaranteed on every safari, any time of year." },
      { q: "Udawalawe vs Yala — which is better?", a: "Udawalawe is best for elephant sightings (guaranteed). Yala is best for leopards. Many travelers do both — they are about 2-3 hours apart." },
    ],
  },
  weligama: {
    intro:
      "Weligama is a charming coastal town on Sri Lanka's south coast, famous for its beginner-friendly surfing, stilt fishermen, and the beautiful Taprobane Island just offshore. Located between Galle and Mirissa, Weligama is a great base for exploring the southern coast. LKTaxi provides transfers from the airport, Colombo, Ella, and nearby beach towns.",
    highlights: [
      "Airport to Weligama: ~3 hours via Southern Expressway",
      "Best for: Learning to surf, stilt fishermen photography",
      "Taprobane Island is visible from the bay",
      "Mirissa whale-watching boats just 10 minutes away",
    ],
    travelTip:
      "Weligama Bay has gentle waves ideal for beginner surfers. Surf schools line the beach with affordable lessons — book directly on the sand.",
    nearbyAttractions: ["Taprobane Island", "Mirissa Beach", "Stilt Fishermen", "Coconut Tree Hill"],
    faqs: [
      { q: "Is Weligama good for surfing beginners?", a: "Yes. Weligama Bay is one of the best places in Sri Lanka to learn surfing, with gentle consistent waves and multiple surf schools on the beach." },
      { q: "How far is Weligama from Mirissa?", a: "Weligama and Mirissa are only about 7 km apart — approximately 10-15 minutes by taxi. Many travelers visit both during their stay." },
    ],
  },
  unawatuna: {
    intro:
      "Unawatuna is a popular beach destination just 6 km from Galle Fort, known for its crescent-shaped bay, coral reefs, and relaxed atmosphere. The beach is sheltered by a natural reef making it ideal for swimming and snorkelling. The Japanese Peace Pagoda on the hilltop offers panoramic views of the bay.",
    highlights: [
      "Galle to Unawatuna: ~10 minutes",
      "Protected bay — safe swimming and good snorkelling",
      "Japanese Peace Pagoda (30-minute hike) with stunning views",
      "Jungle Beach — a hidden gem accessible by a short walk",
    ],
    travelTip:
      "Walk from Unawatuna to Jungle Beach through the headland trail — it takes about 15 minutes and leads to a secluded beach that's perfect for snorkelling.",
    nearbyAttractions: ["Jungle Beach", "Japanese Peace Pagoda", "Galle Fort", "Rumassala Hill"],
    faqs: [
      { q: "Is Unawatuna safe for swimming?", a: "Yes. Unawatuna Bay is protected by a natural coral reef, making the water calm and safe for swimming, especially compared to more exposed beaches." },
      { q: "How do I get from Unawatuna to Mirissa?", a: "A private taxi from Unawatuna to Mirissa takes about 40-50 minutes along the scenic coastal road. LKTaxi can arrange this transfer with stops along the way." },
    ],
  },
  hikkaduwa: {
    intro:
      "Hikkaduwa is a vibrant beach town on Sri Lanka's southwest coast, known for coral reefs, sea turtles, and lively nightlife. The Hikkaduwa Coral Sanctuary — viewable from a glass-bottom boat — is one of the island's best marine attractions. LKTaxi provides transfers from Colombo, the airport, Galle, and other coastal destinations.",
    highlights: [
      "Colombo to Hikkaduwa: ~2 hours via Southern Expressway",
      "Coral Sanctuary with glass-bottom boat tours",
      "Sea turtles can be seen at the beach (best Jan-Apr)",
      "Active nightlife scene with beachside bars",
    ],
    travelTip:
      "The coral viewing area is close to shore — you can snorkel directly to see the corals and tropical fish, or take a glass-bottom boat if you prefer staying dry.",
    nearbyAttractions: ["Hikkaduwa Coral Sanctuary", "Sea Turtle Hatchery", "Tsunami Museum", "Seenigama Devalaya"],
    faqs: [
      { q: "Can you see sea turtles at Hikkaduwa?", a: "Yes. Green sea turtles frequently come close to shore at the coral reef area. The best time to see them is during the calm season from January to April." },
      { q: "Is Hikkaduwa good for snorkelling?", a: "Yes. The coral sanctuary area has shallow, clear water with colourful fish. It's one of the most accessible snorkelling spots in Sri Lanka." },
    ],
  },
  bentota: {
    intro:
      "Bentota is a luxury beach resort town on Sri Lanka's west coast, known for its golden beaches, water sports, and the Bentota River for boat safaris. The town offers a more upscale alternative to the backpacker-heavy southern beaches. LKTaxi provides transfers from Colombo, the airport, Galle, and other destinations.",
    highlights: [
      "Colombo to Bentota: ~1.5-2 hours via Southern Expressway",
      "Water sports: jet skiing, windsurfing, banana boat rides",
      "Bentota River boat safari for birdwatching and mangroves",
      "Brief Garden — Geoffrey Bawa's famous landscape garden",
    ],
    travelTip:
      "Bentota is perfect for a relaxing beach stay before or after more active sightseeing. The river safari is a peaceful way to spend a morning.",
    nearbyAttractions: ["Brief Garden", "Bentota Beach", "Kosgoda Turtle Hatchery", "Lunuganga Estate"],
    faqs: [
      { q: "Is Bentota good for families?", a: "Yes. Bentota offers a wide range of family-friendly resorts, calm swimming beaches, and activities like river safaris and turtle hatchery visits." },
      { q: "What water sports are available in Bentota?", a: "Bentota is the water sports capital of Sri Lanka — offering jet skiing, windsurfing, wakeboarding, banana boat rides, and deep-sea fishing." },
    ],
  },
  tangalle: {
    intro:
      "Tangalle is a quiet coastal town in southern Sri Lanka with some of the island's most beautiful and uncrowded beaches. Unlike the busier Mirissa and Unawatuna, Tangalle offers a more secluded, off-the-beaten-path experience. The beaches are long and wild — perfect for those seeking peace and natural beauty.",
    highlights: [
      "Colombo to Tangalle: ~4 hours via Southern Expressway",
      "Less crowded than Mirissa, Unawatuna, or Hikkaduwa",
      "Beautiful beaches: Silent Beach, Goyambokka, Medaketiya",
      "Close to Yala and Udawalawe for wildlife day trips",
    ],
    travelTip:
      "Tangalle is an excellent base for visiting Yala National Park (1.5-2 hours) while enjoying a quieter beach experience compared to Mirissa.",
    nearbyAttractions: ["Hummanaya Blow Hole", "Mulgirigala Rock Temple", "Rekawa Turtle Beach", "Silent Beach"],
    faqs: [
      { q: "Is Tangalle worth visiting?", a: "Yes, especially if you prefer quiet, uncrowded beaches. Tangalle offers a more authentic, peaceful experience compared to the busier south coast towns." },
      { q: "How far is Tangalle from Yala?", a: "Tangalle to Yala is approximately 80 km — about 1.5-2 hours by private taxi. It's a great base for combining beach relaxation with wildlife safaris." },
    ],
  },
  hambantota: {
    intro:
      "Hambantota is a coastal town in southern Sri Lanka, known for its proximity to Yala and Bundala National Parks. The Hambantota salt pans, the new Magampura Port, and the Hambantota Bird Sanctuary attract nature lovers. LKTaxi provides transfers to Hambantota from Colombo, Ella, Tangalle, and other destinations.",
    highlights: [
      "Colombo to Hambantota: ~4-5 hours",
      "Gateway to Bundala National Park (flamingos and migratory birds)",
      "Close to Yala National Park, Tangalle, and Tissamaharama",
      "Hambantota salt pans attract diverse birdlife",
    ],
    travelTip:
      "Bundala National Park near Hambantota is excellent for birdwatching and much less crowded than Yala. Visit during the migratory season (September-March) for flamingos.",
    nearbyAttractions: ["Bundala National Park", "Hambantota Salt Pans", "Ridiyagama Safari Park", "Ussangoda National Park"],
    faqs: [
      { q: "Is Hambantota worth visiting?", a: "Hambantota is mainly a transit point for Yala and Bundala. The Bundala bird sanctuary is well worth a half-day visit, especially for birdwatchers." },
      { q: "How far is Hambantota from Yala?", a: "Hambantota is approximately 30 km from the Yala park entrance — about 40-50 minutes by taxi." },
    ],
  },
  pasikudah: {
    intro:
      "Pasikudah is an east-coast beach destination known for its shallow, turquoise waters and long stretch of soft sand. The bay's calm, shallow waters extend far from shore, making it one of the safest swimming beaches in Sri Lanka. Several luxury resorts line the coast. LKTaxi provides transfers from Trincomalee, Sigiriya, Colombo, and Batticaloa.",
    highlights: [
      "Colombo to Pasikudah: ~6-7 hours",
      "Extremely shallow, calm water ideal for children",
      "Best season: April to September",
      "Less crowded alternative to south coast beaches",
    ],
    travelTip:
      "Pasikudah is best visited from April to September when the east coast has dry, sunny weather. The water is incredibly shallow — you can walk out 50+ metres.",
    nearbyAttractions: ["Kalkudah Beach", "Batticaloa Fort", "Batticaloa Lagoon", "Passekudah Reef"],
    faqs: [
      { q: "When is the best time to visit Pasikudah?", a: "April to September is best — dry weather, calm seas, and excellent swimming conditions. This is the opposite season to the west and south coasts." },
      { q: "Is Pasikudah good for families?", a: "Yes. The extremely shallow water that extends far from shore makes Pasikudah one of the safest family beaches in Sri Lanka." },
    ],
  },
  batticaloa: {
    intro:
      "Batticaloa is a historic city on Sri Lanka's east coast, known for its lagoon, colonial Dutch Fort, and the mysterious 'singing fish' phenomenon. Less touristy than the south coast, Batticaloa offers an authentic experience of eastern Sri Lankan culture. LKTaxi provides transfers from Trincomalee, Colombo, Pasikudah, and Arugam Bay.",
    highlights: [
      "Colombo to Batticaloa: ~6-7 hours",
      "Dutch Fort on an island in Batticaloa Lagoon",
      "Kallady Bridge — famous landmark connecting the fort island",
      "Nearby Pasikudah beach (30 min) for swimming",
    ],
    travelTip:
      "Visit the Batticaloa Lagoon at dusk when locals fish and the sunset reflects off the water. The 'singing fish' are best heard on full moon nights near the Kallady Bridge.",
    nearbyAttractions: ["Batticaloa Fort", "Kallady Bridge", "Pasikudah Beach", "Batticaloa Lagoon"],
    faqs: [
      { q: "What are the singing fish of Batticaloa?", a: "A mysterious musical humming sound can sometimes be heard from the Batticaloa Lagoon on calm full-moon nights. It's believed to be caused by marine organisms, though the exact source is debated." },
      { q: "Is Batticaloa worth visiting?", a: "Yes, if you enjoy off-the-beaten-path destinations. It's less touristy than the south coast, with authentic culture, a historic fort, and nearby Pasikudah beach." },
    ],
  },
  wilpattu: {
    intro:
      "Wilpattu National Park is Sri Lanka's largest national park, located in the northwest of the island. Known for its unique natural lakes called 'villus', Wilpattu is less crowded than Yala but offers excellent chances of spotting leopards, sloth bears, and elephants in a more serene setting. LKTaxi provides transfers from Colombo, Anuradhapura, and Negombo.",
    highlights: [
      "Colombo to Wilpattu: ~4 hours",
      "Less crowded alternative to Yala for leopard sightings",
      "Unique 'villu' (natural lake) ecosystem",
      "Best season: February to October",
    ],
    travelTip:
      "Wilpattu sees far fewer jeeps than Yala — if you prefer a quieter, more intimate wildlife experience, choose Wilpattu over Yala.",
    nearbyAttractions: ["Anuradhapura Ancient City", "Kalpitiya (dolphin watching)", "Puttalam Lagoon"],
    faqs: [
      { q: "Wilpattu vs Yala — which is better for leopards?", a: "Both parks have good leopard populations. Yala has higher density and easier sightings, but Wilpattu offers a much quieter, more private experience with fewer tourist jeeps." },
      { q: "How do I get to Wilpattu?", a: "A private taxi from Colombo to Wilpattu takes about 4 hours. From Anuradhapura, it's about 1 hour. LKTaxi can arrange your transfer and safari booking together." },
    ],
  },
  kitulgala: {
    intro:
      "Kitulgala is Sri Lanka's adventure capital, famous for white-water rafting on the Kelani River. It's also the filming location of 'The Bridge on the River Kwai'. Surrounded by lush rainforest, Kitulgala offers rafting, canyoning, jungle trekking, and birdwatching. LKTaxi provides transfers from Colombo, Kandy, Nuwara Eliya, and other destinations.",
    highlights: [
      "Colombo to Kitulgala: ~3 hours",
      "White-water rafting on Kelani River (Grade 2-3 rapids)",
      "Filming location of 'The Bridge on the River Kwai'",
      "Rainforest birdwatching — endemic species like Sri Lanka Blue Magpie",
    ],
    travelTip:
      "Kitulgala can be visited as a day trip from Colombo or as a stop on the way to Nuwara Eliya or Kandy. The rafting is suitable for beginners and thrilling for experienced rafters.",
    nearbyAttractions: ["Kelani River", "Belilena Cave", "Makandawa Rainforest", "Roeberry Tea Estate"],
    faqs: [
      { q: "Is white-water rafting in Kitulgala safe?", a: "Yes. The rapids are Grade 2-3 (moderate) with professional guides. Life jackets and helmets are provided. It's suitable for beginners and non-swimmers." },
      { q: "Can I visit Kitulgala on the way to Kandy?", a: "Yes. Kitulgala is between Colombo and Nuwara Eliya/Kandy. LKTaxi can include a rafting stop on your transfer." },
    ],
  },
  haputale: {
    intro:
      "Haputale is a small hill station perched on a ridge in Sri Lanka's central highlands, offering breathtaking views of both the south coast and the hill country. Less touristy than Ella or Nuwara Eliya, Haputale is home to the famous Lipton's Seat viewpoint and the Dambatenne Tea Factory. LKTaxi provides transfers from Ella, Nuwara Eliya, Colombo, and other destinations.",
    highlights: [
      "Ella to Haputale: ~45 minutes",
      "Lipton's Seat — panoramic viewpoint at 1,968 metres",
      "Dambatenne Tea Factory — working factory tours",
      "Less crowded and more authentic than Ella or Nuwara Eliya",
    ],
    travelTip:
      "Visit Lipton's Seat at dawn for the best views before the mist rolls in. The tuk-tuk ride up is part of the adventure, but your LKTaxi driver can take you to the starting point.",
    nearbyAttractions: ["Lipton's Seat", "Dambatenne Tea Factory", "Adisham Bungalow", "Bambarakanda Falls"],
    faqs: [
      { q: "Is Haputale worth visiting?", a: "Yes, especially if you want a quieter alternative to Ella. Lipton's Seat offers one of the most spectacular panoramic views in Sri Lanka." },
      { q: "How do I get to Lipton's Seat?", a: "LKTaxi can drive you to the Dambatenne Tea Factory. From there, it's a tuk-tuk or 7km hike to Lipton's Seat at the top of the ridge." },
    ],
  },
  bandarawela: {
    intro:
      "Bandarawela is a peaceful hill-country town between Ella and Haputale, known for its cool climate, tea plantations, and colonial-era architecture. It's a quieter alternative to the more popular Ella, with excellent walking trails and a traditional market. LKTaxi provides transfers from Ella, Colombo, Kandy, and other destinations.",
    highlights: [
      "Ella to Bandarawela: ~20 minutes",
      "Cool, comfortable climate year-round (18-25°C)",
      "Traditional weekly market and colonial architecture",
      "Excellent hiking trails through tea estates",
    ],
    travelTip:
      "Bandarawela makes a great base for exploring the Ella region while staying somewhere quieter and more authentic. The town has fewer tourists but equally stunning surroundings.",
    nearbyAttractions: ["Dhowa Rock Temple", "Bandarawela Market", "Diyaluma Falls (nearby)", "Ella Rock"],
    faqs: [
      { q: "Is Bandarawela worth staying at?", a: "Yes, if you prefer a quieter base for exploring the hill country. It's only 20 minutes from Ella but has a more authentic, less touristy feel." },
      { q: "What is the weather like in Bandarawela?", a: "Bandarawela has a pleasant year-round climate of 18-25°C during the day. It can get cool at night, so bring a light jacket." },
    ],
  },
  badulla: {
    intro:
      "Badulla is the capital of Uva Province and the terminus of the famous Kandy-Ella scenic railway. The town is surrounded by mountains and waterfalls, including Dunhinda Falls — one of Sri Lanka's most beautiful. Less touristy than Ella, Badulla offers an authentic hill-country experience. LKTaxi provides transfers from Ella, Colombo, Kandy, and other destinations.",
    highlights: [
      "Ella to Badulla: ~30 minutes",
      "Dunhinda Falls — one of Sri Lanka's most spectacular waterfalls",
      "End point of the famous Kandy-Ella scenic train",
      "Authentic Uva Province culture and cuisine",
    ],
    travelTip:
      "If you want to ride the scenic train from Kandy, booking to Badulla (instead of Ella) is often easier as seats are more available for the full journey.",
    nearbyAttractions: ["Dunhinda Falls", "Muthiyangana Temple", "Bogoda Wooden Bridge", "Namunukula Mountain"],
    faqs: [
      { q: "Is Badulla worth visiting?", a: "Yes, especially for Dunhinda Falls — a 63-metre waterfall in a rainforest setting. Badulla also offers a glimpse of authentic Sri Lankan hill-country life." },
      { q: "Can I take the scenic train to Badulla?", a: "Yes. The Kandy-Badulla train is one of the world's most scenic railway journeys. Badulla is the last stop — Ella is 30 minutes before." },
    ],
  },
  "ella-rock": {
    intro:
      "Ella Rock is a popular hiking destination in Sri Lanka's hill country, rising to 1,041 metres above sea level. The 4-6 km trail passes through tea plantations and forest, rewarding hikers with breathtaking panoramic views of Ella Gap, the southern plains, and surrounding mountains. LKTaxi can arrange your transfer to the trailhead and pick you up after your hike.",
    highlights: [
      "Hike duration: 3-5 hours round trip",
      "Trail starts near Ella railway station",
      "Best time to start: 6:00-7:00 AM for sunrise views",
      "Moderate difficulty — suitable for fit beginners",
    ],
    travelTip:
      "Start early to catch the sunrise from the summit and avoid the midday heat. Bring water, snacks, and sunscreen. A local guide is recommended as the trail can be confusing.",
    nearbyAttractions: ["Little Adam's Peak", "Nine Arch Bridge", "Ravana Falls", "Demodara Loop"],
    faqs: [
      { q: "How difficult is the Ella Rock hike?", a: "Ella Rock is a moderate hike — 3-5 hours round trip with some steep sections. Reasonable fitness is needed, but it's not technically difficult. A guide helps with the confusing trail." },
      { q: "Can LKTaxi arrange a guide for Ella Rock?", a: "We can recommend trusted local guides in Ella and arrange your transfer to and from the trailhead. Contact us on WhatsApp for arrangements." },
    ],
  },
  "little-adams-peak": {
    intro:
      "Little Adam's Peak is one of the easiest and most rewarding hikes in Ella, taking about 45-60 minutes to reach the summit. Named after the larger Adam's Peak in the central highlands, this viewpoint offers stunning 360-degree views of Ella Gap, tea plantations, and rolling green hills. The trail is well-maintained and suitable for all fitness levels.",
    highlights: [
      "Hike duration: 45-60 minutes to the summit",
      "Easy trail suitable for all fitness levels",
      "Stunning 360-degree views from the top",
      "Best at sunrise or sunset for golden light",
    ],
    travelTip:
      "Little Adam's Peak is the easiest hike in Ella and perfect for families. Visit at sunrise for the best light and fewer crowds. The trail starts at 98 Acres Resort.",
    nearbyAttractions: ["Ella Rock", "Nine Arch Bridge", "Ravana Falls", "Ravana Cave"],
    faqs: [
      { q: "How hard is Little Adam's Peak?", a: "Very easy. It's a gentle 45-60 minute walk suitable for children and elderly visitors. The path is well-maintained with steps in the steeper sections." },
      { q: "What can I see from Little Adam's Peak?", a: "You get a full 360-degree panorama of Ella Gap, the surrounding tea plantations, Ella Rock, and on clear days you can see all the way to the southern coast." },
    ],
  },
  kalutara: {
    intro:
      "Kalutara is a coastal town south of Colombo, known for the iconic Kalutara Bodhiya — a massive white dagoba visible from the highway. The town sits where the Kalu Ganga river meets the sea, creating a scenic natural setting. LKTaxi provides transfers from Colombo, the airport, Bentota, and Galle.",
    highlights: [
      "Colombo to Kalutara: ~1 hour via Southern Expressway",
      "Kalutara Bodhiya — landmark white dagoba",
      "Kalu Ganga river and beautiful mangrove ecosystem",
      "Gateway to the southern beach towns",
    ],
    travelTip:
      "Kalutara is often a quick stop on the way south. The Bodhiya is worth a 15-minute visit — it's one of the few hollow dagobas in the world.",
    nearbyAttractions: ["Kalutara Bodhiya", "Kalutara Beach", "Brief Garden", "Richmond Castle"],
    faqs: [
      { q: "Is Kalutara worth stopping at?", a: "As a quick stop on the way to Bentota or Galle, yes. The Kalutara Bodhiya is a unique hollow dagoba worth a brief visit." },
      { q: "How far is Kalutara from Colombo?", a: "Kalutara is about 40 km south of Colombo — approximately 1 hour by private taxi via the Southern Expressway." },
    ],
  },
};
