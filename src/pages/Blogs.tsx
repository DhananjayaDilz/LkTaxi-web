import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogsData } from "../data/blogs";
import { SectionTitle } from "../components/blog/SectionTitle";
import { BlogCard } from "../components/blog/BlogCard";

export default function Blogs() {
  // Set SEO metadata and scroll on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Sri Lanka Travel Blog — Safari Tips, Taxi Guides & Destination Guides | LKTaxi";

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta(
      'meta[name="description"]',
      "Expert Sri Lanka travel guides: Yala safari tips, Colombo airport taxi, leopard spotting, hill country tours and more. Plan your Sri Lanka trip with LKTaxi's local knowledge."
    );
    setMeta('meta[property="og:title"]', "Sri Lanka Travel Blog — Safari & Taxi Tips | LKTaxi");
    setMeta('meta[property="og:description"]', "Expert guides for foreign tourists: Yala safari, airport transfers, Sri Lanka itineraries and wildlife tips from LKTaxi.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 font-sans">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pt-32">
        <section className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Travel Blogs"
            subtitle="Discover Sri Lanka's hidden gems, ultimate travel guides, wildlife wonders, and insider tips from local experts."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {blogsData.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {blogsData.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-500">More blogs coming soon!</h3>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
