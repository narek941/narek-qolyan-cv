"use client";

import { useState } from "react";
import { Palette, ShoppingCart } from "lucide-react";

interface BrandTheme {
  label: string;
  accent: string;
  heroFrom: string;
  heroTo: string;
}

/** Whitelabel theme presets — no client names, palette only. */
const BRAND_THEMES: BrandTheme[] = [
  { label: "Indigo", accent: "#6366f1", heroFrom: "rgba(99,102,241,0.3)", heroTo: "rgba(217,70,239,0.25)" },
  { label: "Emerald", accent: "#10b981", heroFrom: "rgba(16,185,129,0.3)", heroTo: "rgba(6,182,212,0.25)" },
  { label: "Amber", accent: "#f59e0b", heroFrom: "rgba(245,158,11,0.3)", heroTo: "rgba(244,63,94,0.25)" },
];

const PRODUCT_PRICES = [38, 57, 29, 64];

/**
 * Whitelabel Hydrogen storefront — interactive: cycle the brand theme
 * (the real app's WHITELABEL_BRAND switch) and add items to the cart.
 */
export const StorefrontPreview = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const theme = BRAND_THEMES[themeIndex];

  return (
    <div className="flex h-full w-full flex-col bg-[#0f0f13] text-white">
      {/* Store nav */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-display text-[9px] font-bold tracking-wide" style={{ color: theme.accent }}>
          STOREFRONT
        </span>
        <div className="flex items-center gap-2 text-[7px] text-white/50">
          <span>Parts</span>
          <span>Accessories</span>
          <span>Support</span>
          <span className="relative">
            <ShoppingCart className="h-2.5 w-2.5 text-white/80" />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full text-[5px] font-bold text-black"
                style={{ background: theme.accent }}
              >
                {cartCount}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Hero band with the whitelabel switch */}
      <div
        className="relative flex h-[32%] items-center justify-between px-3 transition-colors duration-500"
        style={{ background: `linear-gradient(90deg, ${theme.heroFrom}, ${theme.heroTo})` }}
      >
        <div>
          <p className="text-[9px] font-bold">Headless storefront</p>
          <p className="text-[7px] text-white/55">Hydrogen · GraphQL</p>
        </div>
        <button
          type="button"
          onClick={() => setThemeIndex((index) => (index + 1) % BRAND_THEMES.length)}
          className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 transition-colors hover:bg-white/20"
        >
          <Palette className="h-2.5 w-2.5" style={{ color: theme.accent }} />
          <span className="text-[7px] text-white/70">Theme: {theme.label}</span>
        </button>
      </div>

      {/* Product grid — click to add to cart */}
      <div className="grid flex-1 grid-cols-4 gap-1.5 p-2">
        {PRODUCT_PRICES.map((price, productIndex) => (
          <button
            key={productIndex}
            type="button"
            onClick={() => setCartCount((count) => count + 1)}
            className="flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/[0.04] text-left transition-transform hover:scale-[1.04] active:scale-95"
          >
            <div className="h-[55%] w-full transition-colors duration-500" style={{ background: `${theme.accent}22` }}>
              <div
                className="mx-auto mt-[14%] h-[45%] w-[55%] rounded transition-colors duration-500"
                style={{ background: `${theme.accent}66` }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5 px-1.5">
              <span className="h-1 w-[80%] rounded bg-white/25" />
              <span className="text-[7px] font-bold text-white/80">$ {price}.00</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
