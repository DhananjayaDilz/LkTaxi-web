import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/LOGO.png" alt="LKTaxi Logo" className="h-10 mb-4" />
          <p className="text-secondary-foreground/60 text-sm">
            Your trusted taxi and travel partner in Sri Lanka. Safe, reliable, and affordable transportation services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-primary mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About Us", "Our Vehicles", "Book Safari", "Contact Us"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(/\s+/g, '')}`} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-primary mb-4">Services</h4>
          <ul className="space-y-2">
            {["Airport Transfer", "Day Tours", "Long Tours", "Hotel Transfer", "Yala Safari"].map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-primary mb-4">Contact Info</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/60">
            <li>379 Jayasirimawatha</li>
            <li>Thissamaharama, Sri Lanka</li>
            <li>
              <a href="tel:+94705000526" className="hover:text-primary transition-colors">+94 70 5000 526</a>
            </li>
            <li>
              <a href="mailto:hi.lktaxi@gmail.com" className="hover:text-primary transition-colors">hi.lktaxi@gmail.com</a>
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 mt-10 pt-6 text-center">
        <p className="text-sm text-secondary-foreground/40">© 2026 LKTaxi Sri Lanka. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
