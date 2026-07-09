import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Teresa Griffiths", country: "Google Review", rating: 5, text: "We used this taxi service to get from Yala to Hiriketiya- the driver was so lovely and the ride was very smooth. Highly recommend" },
  { name: "Hayley Richardson", country: "Google Review", rating: 5, text: "Really safe drive! 10/10 recommended." },
];

const ReviewsSection = () => (
  <section className="section-padding bg-muted/30">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">What Our <span className="text-primary">Guests</span> Say</h2>
        <p className="section-subtitle">Real experiences from travelers who chose LKTaxi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-xl p-8 shadow-sm border border-border flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-6 italic">"{r.text}"</p>
            </div>
            <div>
              <p className="font-semibold text-foreground text-base">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.country}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-[#00af87] hover:bg-[#00af87]/90 text-white border-0">
          <a href="https://www.tripadvisor.com/UserReviewEdit-g1102395-d34281680-Lktaxi-Tissamaharama_Southern_Province.html" target="_blank" rel="noopener noreferrer">
            <Star className="w-5 h-5 fill-current" />
            Review on TripAdvisor
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10 hover:text-[#4285F4]">
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
