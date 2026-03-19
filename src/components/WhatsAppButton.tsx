import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/pricing";

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
  >
    <MessageCircle className="w-7 h-7 text-background fill-background" />
  </a>
);

export default WhatsAppButton;
