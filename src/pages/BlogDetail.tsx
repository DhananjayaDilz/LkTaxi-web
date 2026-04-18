import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogsData } from "../data/blogs";
import { ImageGallery } from "../components/blog/ImageGallery";
import { BlogSidebarAd } from "../components/blog/BlogSidebarAd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WHATSAPP_NUMBER } from "@/data/pricing";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<typeof blogsData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Simulate network request
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundPost = blogsData.find((b) => b.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        document.title = `${foundPost.title} | LKTaxi Safari & Tours`;
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800); // 800ms loading effect

    return () => clearTimeout(timer);
  }, [slug]);

  if (notFound) {
    return <Navigate to="/blogs" replace />;
  }

  const handleShare = () => {
    if (post && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-sans transition-all duration-500">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pt-32">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100 max-w-[200px] truncate">
              {isLoading ? <Skeleton className="h-4 w-32 inline-block ml-2" /> : post?.title}
            </span>
          </nav>

          <Link
            to="/blogs"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>

          {isLoading ? (
            // Loading Skeletons
            <div className="animate-in fade-in duration-500">
              <header className="mb-10">
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full max-w-2xl mb-6" />
                <Skeleton className="h-12 w-3/4 mb-6" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </header>

              <Skeleton className="w-full aspect-[16/9] rounded-2xl mb-12" />

              <div className="space-y-4 mb-12">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <br />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : post ? (
            // Actual Content
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-10 text-center sm:text-left">
                <div className="flex gap-2 mb-4 justify-center sm:justify-start flex-wrap">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary font-medium border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </header>

              <figure className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg mb-12 bg-gray-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  loading="eager"
                />
              </figure>

              <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-bold prose-headings:mt-14 prose-headings:mb-6 prose-p:leading-loose prose-p:mb-8 prose-li:my-3 prose-ul:mb-8 prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-md max-w-none text-gray-700 dark:text-gray-300">
                <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-10 border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
                  {post.excerpt}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="tracking-wide" />
              </div>

              <ImageGallery images={post.gallery} />

              {/* Call to Action: Book Your Trip */}
              <div className="mt-16 bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 sm:p-12 text-center border border-primary/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Explore Sri Lanka?</h3>
                <p className="text-gray-600 dark:text-gray-300 md:text-lg mb-8 max-w-2xl mx-auto">
                  Experience the beauty of Sri Lanka with our comfortable vehicles and professional drivers. Let LKTaxi make your journey unforgettable.
                </p>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="text-lg px-10 py-6 rounded-full shadow-xl hover:scale-105 transition-transform">
                    Book Your Trip Now
                  </Button>
                </a>
              </div>

              {/* Share Story Section */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center sm:flex-row flex-col gap-4">
                <p className="text-sm text-gray-500 font-medium">Thank you for reading!</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2 shrink-0 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Share2 className="w-4 h-4" />
                  Share this story
                </Button>
              </div>
            </div>
          ) : null}
        </article>
      </main>

      <BlogSidebarAd />
      <Footer />
    </div>
  );
}
