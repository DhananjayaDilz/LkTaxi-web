import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateWhatsAppURL } from "@/data/pricing";

const serviceOptions = ["Airport Transfer", "Day Tours", "Long Tours", "Hotel Transfer", "Yala Safari", "Custom Ride"];

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const msg = `📩 *Contact Inquiry - LKTaxi*\n\n👤 Name: ${name}\n📧 Email: ${email}\n🛎️ Service: ${service}\n💬 Message: ${message}`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Contact <span className="text-primary">Us</span></h2>
          <p className="section-subtitle">Get in touch for bookings, inquiries, or custom travel plans</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info + Map */}
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Address", value: "379 Jayasirimawatha, Thissamaharama, Sri Lanka" },
                { icon: Phone, label: "Phone", value: "+94 70 5000 526", href: "tel:+94705000526" },
                { icon: Mail, label: "Email", value: "hi.lktaxi@gmail.com", href: "mailto:hi.lktaxi@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden h-64 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.5!2d81.2878!3d6.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTcnMDAuMCJOIDgxwrAxNyczMC4wIkU!5e0!3m2!1sen!2slk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LKTaxi Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border">
            <h3 className="font-bold text-xl text-foreground mb-6">Send us a message</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Select Service</label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Message</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your travel plans..." rows={4} />
              </div>
              <Button onClick={handleSend} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
                <Send className="w-4 h-4 mr-2" /> Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
