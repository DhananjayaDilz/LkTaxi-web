import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackContact, reportWhatsAppConversion } from "@/lib/analytics";

describe("analytics tracking", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.gtag_report_conversion = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls gtag_report_conversion and tracks contact_click on whatsapp contact", () => {
    trackContact("whatsapp", "HeroSection");

    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "contact_click",
      expect.objectContaining({
        contact_method: "whatsapp",
        source: "HeroSection",
      })
    );
    expect(window.gtag_report_conversion).toHaveBeenCalledTimes(1);
  });

  it("tracks contact_click on phone contact without calling gtag_report_conversion", () => {
    trackContact("phone", "Header");

    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "contact_click",
      expect.objectContaining({
        contact_method: "phone",
        source: "Header",
      })
    );
    expect(window.gtag_report_conversion).not.toHaveBeenCalled();
  });

  it("calls reportWhatsAppConversion directly with optional url", () => {
    reportWhatsAppConversion("https://wa.me/test");
    expect(window.gtag_report_conversion).toHaveBeenCalledWith("https://wa.me/test");
  });

  it("handles missing gtag and gtag_report_conversion gracefully without throwing", () => {
    delete (window as { gtag?: unknown }).gtag;
    delete (window as { gtag_report_conversion?: unknown }).gtag_report_conversion;

    expect(() => trackContact("whatsapp", "BookingForm")).not.toThrow();
  });
});
