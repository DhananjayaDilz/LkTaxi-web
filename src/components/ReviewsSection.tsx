import { Star, Quote, Camera, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const clientPhotos = [
  {
    src: "/i.webp",
    title: "Happy Guests Exploring",
    subtitle: "Unforgettable Sri Lanka Tour",
    tag: "Sigiriya Trip",
  },
  {
    src: "/i2.webp",
    title: "Safe & Comfortable Drives",
    subtitle: "Relaxing Journey with LKTaxi",
    tag: "Airport Transfer",
  },
  {
    src: "/i3.webp",
    title: "Island Adventures",
    subtitle: "Scenic Routes & Warm Smiles",
    tag: "Yala Safari",
  },
  {
    src: "/i4.webp",
    title: "Satisfied Travelers",
    subtitle: "Trusted by Visitors Worldwide",
    tag: "Ella Excursion",
  },
];

const reviews = [
  { 
    name: "Teresa Griffiths", 
    country: "Google Review", 
    rating: 5, 
    text: "We used this taxi service to get from Yala to Hiriketiya- the driver was so lovely and the ride was very smooth. Highly recommend" 
  },
  { 
    name: "Hayley Richardson", 
    country: "Google Review", 
    rating: 5, 
    text: "Really safe drive! 10/10 recommended." 
  },
];

const ReviewsSection = () => (
  <section className="section-padding bg-muted/30 relative overflow-hidden">
    {/* Decorative background blur elements */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

    <div className="container mx-auto relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm">
          <Camera className="w-4 h-4" />
          <span>Happy Travelers Gallery</span>
        </div>
        <h2 className="section-title mb-4">What Our <span className="text-primary">Guests</span> Say &amp; Share</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Real experiences and joyous moments captured by travelers who chose LKTaxi to explore the wonders of Sri Lanka
        </p>
      </div>

      {/* Happy Client Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
        {clientPhotos.map((photo, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 aspect-[4/5] sm:aspect-[3/4]"
          >
            {/* Image with zoom micro-animation */}
            <img
              src={photo.src}
              alt={photo.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient overlays for readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Tag badge at top right */}
            <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/30 shadow-sm">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {photo.tag}
              </span>
            </div>

            {/* Caption overlay with glassmorphism on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded backdrop-blur-sm border border-yellow-400/30">
                  Happy Client
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-primary-foreground transition-colors line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-xs text-gray-200/90 line-clamp-1 mt-0.5 opacity-90 group-hover:opacity-100">
                {photo.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Written Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {reviews.map((r) => (
          <div 
            key={r.name} 
            className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-border/60 hover:border-primary/40 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute top-6 right-6 text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
              <Quote className="w-12 h-12" />
            </div>

            <div className="relative z-10">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-6 italic leading-relaxed">"{r.text}"</p>
            </div>
            
            <div className="relative z-10 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-base">{r.name}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{r.country}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-[#00af87] hover:bg-[#00af87]/90 text-white border-0 shadow-md hover:shadow-lg transition-all">
          <a href="https://www.tripadvisor.com/UserReviewEdit-g1102395-d34281680-Lktaxi-Tissamaharama_Southern_Province.html" target="_blank" rel="noopener noreferrer">
            <Star className="w-5 h-5 fill-current" />
            Review on TripAdvisor
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10 hover:text-[#4285F4] shadow-sm hover:shadow-md transition-all">
          <a href="https://www.google.com/search?sca_esv=d40b0936fbbbe394&hl=en&authuser=0&sxsrf=ANbL-n6mw9zSMN5VXgKTdZKjGJRyznhP5w:1776330221404&q=lktaxi+reviews&uds=ALYpb_nyMl5r6GKVFvWMby4eauK5RbvDmNnVKnwFikBNfz-baiqsiiPNiYPgORUzV9nXAMmgFezvBqPcjnPRLyaF4aElwqt3p_yp8X_Qy6w3JJGF4pKyIWhKum1fc6vCXVMw_Ozbsy6bBH8XgJLogfn1IKseNSGD_NbJxxg5HpA4TSxbvmtdhPOud1TIaYkmclgET6hsOJeFu9fasKeXKufzvqlPtZCS62Kg2eLduEQX5WxVFneIAs-YkuTg2Co5ctH-0NnL-dWl0iYRglmfy3zK_hvRDmL5gWWB5PD9YxiZt9nC9YCM0hg3J35pHEE3PFUh4_winPCw8SMtBfv5WHDpH9XSKsj7i98FGeqlSG4Q4NPDZXs3_J0wm0T7kILTdAE9nLLJcAdFFs1oA5ZBQR7caUjjlSIH7Q&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOek6h7-t2eGs1dOgceJuJT8AdMqURp7KzIfDuqwoxIZQCUg70U-5OSL3mVzXPvxN88maDrTx_H1Bd5fxpGHaki4HmiYl&sa=X&ved=2ahUKEwi_0ebegfKTAxUKe_UHHT9kBagQk8gLegQIGBAB&ictx=1&biw=360&bih=705&dpr=3" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Review on Google
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default ReviewsSection;
