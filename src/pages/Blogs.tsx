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
    
    document.title = "Travel Blogs | LKTaxi Safari & Tours";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore Sri Lanka's best travel experiences, from wild safaris in Yala to ancient cities and lush tea plantations. Read our expert travel blogs."
      );
    }
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
