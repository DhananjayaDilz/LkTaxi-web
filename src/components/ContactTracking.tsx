import { useEffect } from "react";
import { trackContact } from "@/lib/analytics";

export default function ContactTracking() {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest?.("a");
      if (!anchor) return;
      if (anchor.href.startsWith("https://wa.me/")) trackContact("whatsapp", "link");
      else if (anchor.href.startsWith("tel:")) trackContact("phone", "link");
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);
  return null;
}
