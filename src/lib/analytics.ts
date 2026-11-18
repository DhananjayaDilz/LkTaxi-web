/** Record an inquiry action, never a confirmed booking or personal message data. */
export function trackContact(method: "whatsapp" | "phone", source: string) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  analyticsWindow.gtag?.("event", "contact_click", {
    contact_method: method,
    source,
    page_path: window.location.pathname,
  });
}

/** Record when a user opens the floating WhatsApp menu to measure menu-to-click funnel. */
export function trackWhatsAppMenuOpen(source = "WhatsAppButton") {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  analyticsWindow.gtag?.("event", "whatsapp_menu_open", {
    source,
    page_path: window.location.pathname,
  });
}
