import { useParams } from "react-router-dom";
import LocationPage from "./LocationPage";
import RoutePage from "./RoutePage";

/**
 * Smart router that distinguishes between location pages (e.g., /taxi/colombo)
 * and route pages (e.g., /taxi/colombo-to-ella) based on the URL slug pattern.
 * Route slugs always contain "-to-" which separates the origin and destination.
 */
const TaxiPageRouter = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <LocationPage />;
  }

  // Route pages use "from-to-destination" pattern
  if (slug.includes("-to-")) {
    return <RoutePage />;
  }

  // Otherwise it's a location page
  return <LocationPage />;
};

export default TaxiPageRouter;
