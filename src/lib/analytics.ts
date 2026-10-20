declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean | void;
  }
}

/** Report Google Ads conversion event for WhatsApp booking clicks. */
export function reportWhatsAppConversion(url?: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion(url);
  }
}

/** Record an inquiry action, never a confirmed booking or personal message data. */
export function trackContact(method: "whatsapp" | "phone", source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "contact_click", { contact_method: method, source, page_path: window.location.pathname });
  if (method === "whatsapp") {
    reportWhatsAppConversion();
  }
}
