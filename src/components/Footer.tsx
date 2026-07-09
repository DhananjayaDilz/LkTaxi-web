import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/LOGO.png" alt="LKTaxi — Sri Lanka taxi booking and Yala safari service" className="h-10 mb-4" />
          <p className="text-secondary-foreground/60 text-sm">
            Your trusted taxi and travel partner in Sri Lanka. Safe, reliable, and affordable private transportation for foreign tourists since 2024.
          </p>
        </div>

        {/* Popular Destinations */}
        <div>
          <h4 className="font-bold text-primary mb-4">Popular Destinations</h4>
          <ul className="space-y-2">
            {[
              { label: "Colombo Taxi", to: "/taxi/colombo" },
              { label: "Ella Taxi", to: "/taxi/ella" },
              { label: "Kandy Taxi", to: "/taxi/kandy" },
              { label: "Airport Transfer", to: "/taxi/airport" },
              { label: "Galle Taxi", to: "/taxi/galle" },
              { label: "Mirissa Taxi", to: "/taxi/mirissa" },
              { label: "Sigiriya Taxi", to: "/taxi/sigiriya" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-primary mb-4">Services</h4>
          <ul className="space-y-2">
            {[
              { label: "Airport Transfer", to: "/taxi/airport" },
              { label: "Day Tours", href: "/#services" },
              { label: "Long Distance Taxi", href: "/#services" },
              { label: "Hotel Transfer", href: "/#services" },
              { label: "Yala Safari Booking", href: "/#safari" },
              { label: "Travel Blog", to: "/blogs" },
            ].map((s) => (
              <li key={s.label}>
                {'to' in s && s.to ? (
                  <Link to={s.to} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                    {s.label}
                  </Link>
                ) : (
                  <a href={s.href} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-primary mb-4">Contact Info</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/60">
            <li>379 Jayasirimawatha</li>
            <li>Tissamaharama, Sri Lanka</li>
            <li>
              <a href="tel:+94705000526" className="hover:text-primary transition-colors">+94 70 5000 526</a>
            </li>
            <li>
              <a href="mailto:hi.lktaxi@gmail.com" className="hover:text-primary transition-colors">hi.lktaxi@gmail.com</a>
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="https://www.facebook.com/lktaxi" target="_blank" rel="noopener noreferrer" aria-label="LKTaxi Facebook Page" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/lktaxi" target="_blank" rel="noopener noreferrer" aria-label="LKTaxi Instagram Profile" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@lktaxi" target="_blank" rel="noopener noreferrer" aria-label="LKTaxi YouTube Channel" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 mt-10 pt-6 text-center">
        <p className="text-sm text-secondary-foreground/40">© 2026 LKTaxi Sri Lanka. All rights reserved. | Private Taxi & Safari Booking Service</p>
      </div>
    </div>
  </footer>
);

export default Footer;
