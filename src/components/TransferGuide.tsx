import { Link } from "react-router-dom";
import { popularRoutes, getRouteSlug } from "@/data/routes";
import { formatLocationName } from "@/data/locations";

const journeyNotes: Record<string, string> = {
  "colombo-to-ella": "Share your Colombo hotel address and the name of your Ella accommodation. If you want sightseeing stops, include them in your request so the team can quote for your full itinerary.",
  "ella-to-yala": "Tell us whether your destination is a hotel in the Yala area, Tissamaharama, or a safari meeting point. A taxi transfer and a safari jeep booking are separate arrangements; confirm both if you need them.",
  "airport-to-mirissa": "Send your flight number, arrival date and Mirissa accommodation address. For an overnight arrival, check that your hotel can receive you and confirm the pickup date with our team.",
  "kandy-to-sigiriya": "Specify whether you need a transfer to your Sigiriya hotel or a sightseeing trip with a return journey. Tell us about planned stops and waiting time before confirming your quote.",
  "galle-to-tangalle": "Provide the exact addresses of both properties. If you want to stop along the way, include the stops in your request so the price and pickup schedule can be agreed in advance.",
  "airport-to-kandy": "Share your flight number, arrival date, passenger count and Kandy hotel address. Confirm the airport meeting point and what to do if your flight is delayed before you travel.",
  "airport-to-ella": "Send your flight details and Ella hotel address. Tell the team about children, large suitcases and any requested breaks so they can suggest a suitable vehicle and pickup arrangement.",
  "mirissa-to-weligama": "For a hotel-to-hotel transfer, send both property names and your preferred pickup time. Mention surfboards or oversized luggage when asking which vehicle to book.",
  "nuwara-eliya-to-ella": "Tell us if this is a direct hotel transfer or a journey with stops. If you are connecting with another booking, share its time before agreeing your pickup schedule.",
  "negombo-to-sigiriya": "Use your Negombo hotel address as the pickup point, or specify an airport pickup if that is what you need. Include any sightseeing stops and whether you need a one-way or return trip.",
  "bentota-to-galle": "Confirm whether your drop-off is your Galle accommodation or a sightseeing stop. If you need the driver to wait and return, request that as part of the itinerary.",
  "unawatuna-to-mirissa": "Send your accommodation names and luggage count. If either property has special vehicle access instructions, share these with our team before pickup.",
  "udawalawe-to-yala": "Tell us your safari finish time or hotel checkout time and the exact Yala-area drop-off. If you are booking a second safari, allow the team to check the transfer schedule with you.",
  "trincomalee-to-sigiriya": "Send your exact pickup address in the Trincomalee area and your Sigiriya destination. Include meal breaks or other requested stops when you ask for a journey quote.",
  "hikkaduwa-to-bentota": "Share the names of your pickup and drop-off properties, passenger count and bags. Mention any planned stops or a return journey before confirming the fare.",
};

export default function TransferGuide({ location, route }: { location?: string; route?: string }) {
  const related = popularRoutes.filter(r => !location || r.from === location || r.to === location).filter(r => getRouteSlug(r) !== route);
  return <section className="container py-12 max-w-4xl">
    <h2 className="text-2xl font-bold mb-4">Plan your private transfer</h2>
    {route && <p className="text-muted-foreground mb-6 leading-relaxed">{journeyNotes[route]}</p>}
    {location === "airport" && <p className="text-muted-foreground mb-6">Booking a Colombo Airport pickup? Send your flight number, arrival date, destination hotel, passengers and luggage. Confirm your meeting point, waiting arrangements and contact number before departure.</p>}
    <div className="grid sm:grid-cols-2 gap-6 text-sm leading-relaxed">
      <div><h3 className="font-semibold mb-2">Price and travel time</h3><p className="text-muted-foreground">Use the fare calculator with your exact pickup and drop-off to estimate the journey. Ask our team to confirm the final fare, tolls, parking, waiting time and any additional stops before booking. Timing depends on the route and traffic.</p></div>
      <div><h3 className="font-semibold mb-2">Passengers and luggage</h3><p className="text-muted-foreground">Tell us the number of adults, children and suitcases. Ask about child-seat availability and confirm space for large bags or sports equipment before choosing a car or van.</p></div>
    </div>
    <h3 className="font-semibold mt-8 mb-3">Explore transfer routes</h3>
    <ul className="grid sm:grid-cols-2 gap-3">
      {(related.length ? related : popularRoutes).slice(0, 6).map(r => <li key={getRouteSlug(r)}><Link className="text-primary underline underline-offset-4" to={`/taxi/${getRouteSlug(r)}`}>{r.from === "airport" ? "Colombo Airport" : formatLocationName(r.from)} to {formatLocationName(r.to)} taxi</Link></li>)}
    </ul>
  </section>;
}
