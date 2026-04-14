import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Our Service", href: "/#services" },
  { label: "Our Vehicles", href: "/#vehicles" },
  { label: "Book Safari", href: "/#safari" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.substring(1); // gets "#about"
      if (location.pathname === "/") {
        // We are already on home page, just scroll smoothly
        const id = hash.substring(1); // removes "#"
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href); // update url hash manually
        }
      } else {
        // We are NOT on home page, Navigate to the home page WITH the hash
        navigate(href);
      }
    } else {
      // It's a standard link like "/blogs" or "/"
      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections if we are on the home page
      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }

      const sections = navItems
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => item.href.substring(2)); // get "about", "services", etc.
      
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust 150 based on your header height or offset
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      
      // If we are at the very top, set Home active
      if (window.scrollY < 100 && current === "") {
        current = "home";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/blogs") {
      return location.pathname.startsWith("/blogs");
    }
    
    if (location.pathname === "/") {
      if (href === "/") {
        return activeSection === "home";
      }
      if (href.startsWith("/#")) {
        const hash = href.substring(2);
        return activeSection === hash;
      }
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center gap-2">
          <img src="/LOGO.png" alt="LKTaxi Logo" className="h-12 md:h-14 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-secondary-foreground/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+94705000526" className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Phone className="w-4 h-4" />
            +94 70 5000 526
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="lg:hidden bg-secondary border-t border-secondary">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-secondary-foreground/80"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a href="tel:+94705000526" className="px-4 py-3 text-primary font-semibold text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +94 70 5000 526
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
