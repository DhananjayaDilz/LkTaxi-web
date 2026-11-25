import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

/*
 * Bottom-left floating "Install App" button.
 *
 * Performance notes:
 *  - Zero external animation libraries — pure CSS keyframes + transitions
 *  - All animations use `transform` and `opacity` only → GPU-composited, no layout thrash
 *  - `will-change` applied sparingly and only on the animated elements
 *  - Component is lazy-rendered (returns null until ready)
 *  - No re-renders while idle — state changes only on user interaction
 */

// ── Types ────────────────────────────────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// ── Persistence ──────────────────────────────────────────────────────────────

const DISMISS_KEY = "lktaxi_install_dismissed";
const DISMISS_DAYS = 3;

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

// ── Inline keyframes (injected once) ─────────────────────────────────────────

const STYLE_ID = "lktaxi-install-anims";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
/* FAB entrance */
@keyframes lkt-fab-in {
  0%   { opacity:0; transform:scale(0) rotate(-180deg); }
  60%  { opacity:1; transform:scale(1.15) rotate(10deg); }
  80%  { transform:scale(0.95) rotate(-3deg); }
  100% { transform:scale(1) rotate(0deg); }
}

/* Gentle breathing pulse on the FAB ring */
@keyframes lkt-pulse-ring {
  0%,100% { box-shadow:0 0 0 0 hsla(45,99%,50%,.35); }
  50%     { box-shadow:0 0 0 8px hsla(45,99%,50%,0); }
}

/* Card expand from bottom-left origin */
@keyframes lkt-card-in {
  0%   { opacity:0; transform:scale(0.3) translateY(20px); }
  60%  { opacity:1; transform:scale(1.03) translateY(-2px); }
  100% { transform:scale(1) translateY(0); }
}

/* Card collapse */
@keyframes lkt-card-out {
  0%   { opacity:1; transform:scale(1) translateY(0); }
  100% { opacity:0; transform:scale(0.4) translateY(20px); }
}

/* Download arrow bounce inside card */
@keyframes lkt-arrow-bounce {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(3px); }
}

/* Checkmark draw after install */
@keyframes lkt-check-draw {
  0%   { stroke-dashoffset:24; }
  100% { stroke-dashoffset:0; }
}

/* Success pop */
@keyframes lkt-success-pop {
  0%   { transform:scale(0); opacity:0; }
  50%  { transform:scale(1.3); }
  100% { transform:scale(1); opacity:1; }
}

/* Fade backdrop */
@keyframes lkt-fade-in  { 0% { opacity:0; } 100% { opacity:1; } }
@keyframes lkt-fade-out { 0% { opacity:1; } 100% { opacity:0; } }

/* Step stagger */
@keyframes lkt-step-in {
  0%   { opacity:0; transform:translateX(-12px); }
  100% { opacity:1; transform:translateX(0); }
}

/* Label slide-out from FAB */
@keyframes lkt-label-in {
  0%   { opacity:0; transform:translateX(-8px) scale(0.9); max-width:0; padding-left:0; padding-right:0; }
  100% { opacity:1; transform:translateX(0) scale(1); max-width:160px; padding-left:12px; padding-right:14px; }
}
@keyframes lkt-label-out {
  0%   { opacity:1; transform:translateX(0) scale(1); max-width:160px; padding-left:12px; padding-right:14px; }
  100% { opacity:0; transform:translateX(-8px) scale(0.9); max-width:0; padding-left:0; padding-right:0; }
}
  `;
  document.head.appendChild(style);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function InstallAppBanner() {
  const [visible, setVisible] = useState(false);
  const [scrolledIn, setScrolledIn] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guideClosing, setGuideClosing] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [scrollLabel, setScrollLabel] = useState(false);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup — mobile & tablet only (< 1024px)
  useEffect(() => {
    if (window.innerWidth >= 1024 || isStandalone() || isDismissed()) return;

    injectStyles();

    const handler = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e as BeforeInstallPromptEvent;
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Safari fallback — show after 3s
    const t = setTimeout(() => {
      if (!deferredRef.current) setVisible(true);
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(t);
    };
  }, []);

  // Scroll-triggered: FAB appears after 200px, label shows then auto-hides after 4s
  useEffect(() => {
    if (!visible) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const past = window.scrollY > 200;
        if (past) {
          // Show the FAB on first scroll
          setScrolledIn(true);
          // Show the label pill when scrolling
          if (!expanded) {
            setScrollLabel(true);
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
            scrollTimerRef.current = setTimeout(() => setScrollLabel(false), 4000);
          }
        } else {
          // Hide when back at top (unless card is expanded)
          if (!expanded) {
            setScrolledIn(false);
            setScrollLabel(false);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [visible, expanded]);

  // ── Handlers ───────────────────────────────────────────────────────

  const handleFabClick = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
    }, 250);
  }, []);

  const handleDismiss = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setExpanded(false);
      setClosing(false);
      try {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
      } catch {
        /* noop */
      }
    }, 250);
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredRef.current) {
      await deferredRef.current.prompt();
      const { outcome } = await deferredRef.current.userChoice;
      deferredRef.current = null;
      if (outcome === "accepted") {
        setInstalled(true);
        setTimeout(() => setVisible(false), 2000);
      }
    } else {
      setShowGuide(true);
    }
  }, []);

  const handleCloseGuide = useCallback(() => {
    setGuideClosing(true);
    setTimeout(() => {
      setShowGuide(false);
      setGuideClosing(false);
    }, 250);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────

  if (!visible) return null;

  return (
    <>
      {/* ── Floating Action Button (bottom-left) — mobile/tablet only ── */}
      {!expanded && scrolledIn && (
        <button
          type="button"
          onClick={handleFabClick}
          aria-label="Install LK Taxi app"
          className="fixed bottom-6 left-6 z-50 group lg:hidden"
          style={{
            animation: "lkt-fab-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
            willChange: "transform, opacity",
          }}
        >
          {/* Pulsing ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{ animation: "lkt-pulse-ring 2.5s ease-in-out infinite" }}
          />

          {/* Button body */}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500 shadow-lg shadow-primary/30 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
            <Download className="h-6 w-6 text-primary-foreground drop-shadow-sm" />

            {/* Mini badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#141719] border-2 border-primary shadow-sm">
              <Smartphone className="h-2.5 w-2.5 text-primary" />
            </span>
          </span>

          {/* Scroll-triggered label pill */}
          <span
            className="absolute left-14 top-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#141719]/95 backdrop-blur-sm py-2 text-[11px] font-bold text-white shadow-xl border border-white/10 overflow-hidden pointer-events-none"
            style={{
              animation: scrollLabel
                ? "lkt-label-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both"
                : "lkt-label-out 0.3s ease-in both",
            }}
          >
            <Download className="h-3 w-3 text-primary shrink-0" />
            <span>Get LK Taxi App</span>
          </span>
        </button>
      )}

      {/* ── Expanded install card ──────────────────────────────────── */}
      {expanded && (
        <div
          className="fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] max-w-xs lg:hidden"
          style={{
            transformOrigin: "bottom left",
            animation: closing
              ? "lkt-card-out 0.25s ease-in forwards"
              : "lkt-card-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            willChange: "transform, opacity",
          }}
        >
          <div className="rounded-2xl border border-primary/25 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Gold top accent */}
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

            {/* Header row */}
            <div className="flex items-start gap-3 p-4 pb-2">
              {/* Animated app icon */}
              <div className="shrink-0 relative">
                <div className="h-12 w-12 rounded-2xl bg-[#141719] border border-white/10 flex items-center justify-center shadow-lg">
                  <img
                    src="/lktaxi-sri-lanka-taxi-booking-logo.webp"
                    alt="LK Taxi"
                    className="h-8 w-8 rounded-xl"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                  <Smartphone className="h-2 w-2 text-primary-foreground" />
                </span>
              </div>

              {/* Copy */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-bold text-foreground leading-tight">
                  LK Taxi
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  Add to home screen — book taxis instantly like a native app
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                className="shrink-0 mt-0.5 h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="px-4 pb-4 pt-2 flex gap-2">
              {installed ? (
                /* ── Success state ── */
                <div
                  className="flex-1 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2"
                  style={{ animation: "lkt-success-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                  <svg
                    className="h-5 w-5 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline
                      points="6 12 10 16 18 8"
                      style={{
                        strokeDasharray: 24,
                        animation: "lkt-check-draw 0.5s ease-out 0.2s both",
                      }}
                    />
                  </svg>
                  <span className="text-sm font-semibold text-emerald-600">
                    Installed!
                  </span>
                </div>
              ) : (
                <>
                  {/* Install */}
                  <button
                    type="button"
                    onClick={handleInstall}
                    className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.97] transition-all shadow-md shadow-primary/20"
                  >
                    <Download
                      className="h-4 w-4"
                      style={{ animation: "lkt-arrow-bounce 1.5s ease-in-out infinite" }}
                    />
                    Install App
                  </button>

                  {/* Dismiss */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="h-11 px-4 rounded-xl bg-muted/60 text-muted-foreground font-medium text-sm hover:bg-muted hover:text-foreground transition-colors"
                  >
                    Later
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Safari / fallback instruction overlay ─────────────────── */}
      {showGuide && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center lg:hidden"
          style={{
            animation: guideClosing
              ? "lkt-fade-out 0.25s ease-out forwards"
              : "lkt-fade-in 0.3s ease-out both",
          }}
          onClick={handleCloseGuide}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative w-full max-w-sm mx-4 mb-4 rounded-2xl bg-card shadow-2xl overflow-hidden"
            style={{
              transformOrigin: "bottom left",
              animation: guideClosing
                ? "lkt-card-out 0.25s ease-in forwards"
                : "lkt-card-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl bg-[#141719] flex items-center justify-center shadow-md">
                  <img
                    src="/lktaxi-sri-lanka-taxi-booking-logo.webp"
                    alt="LK Taxi"
                    className="h-7 w-7 rounded-lg"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Add to Home Screen
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    3 quick steps
                  </p>
                </div>
              </div>

              <ol className="space-y-3.5 text-sm text-foreground">
                {[
                  <>
                    Tap the{" "}
                    <strong className="text-primary">Share</strong>{" "}
                    <svg
                      className="inline h-3.5 w-3.5 align-text-bottom"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>{" "}
                    button
                  </>,
                  <>
                    Select{" "}
                    <strong className="text-primary">
                      "Add to Home Screen"
                    </strong>
                  </>,
                  <>
                    Tap{" "}
                    <strong className="text-primary">"Add"</strong> — done!
                  </>,
                ].map((content, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start"
                    style={{
                      animation: `lkt-step-in 0.35s ease-out ${0.15 + i * 0.1}s both`,
                    }}
                  >
                    <span className="shrink-0 h-6 w-6 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-snug">{content}</span>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={handleCloseGuide}
                className="mt-5 w-full h-10 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
