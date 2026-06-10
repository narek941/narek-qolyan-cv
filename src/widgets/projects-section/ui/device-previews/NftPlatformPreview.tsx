"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Wallet } from "lucide-react";

const BRAND_BLUE = "#0f43f9";
const INK = "#182f43";

interface PackItem {
  id: string;
  name: string;
  price: string;
  rarity: string;
  gradient: string;
}

const PACKS: PackItem[] = [
  {
    id: "p1",
    name: "Genesis Drop",
    price: "24.99",
    rarity: "Legendary",
    gradient: "from-blue-500/60 to-indigo-600/50",
  },
  {
    id: "p2",
    name: "Urban Collection",
    price: "12.50",
    rarity: "Rare",
    gradient: "from-cyan-400/50 to-blue-500/40",
  },
  {
    id: "p3",
    name: "Starter Pack",
    price: "4.99",
    rarity: "Common",
    gradient: "from-sky-300/50 to-blue-400/40",
  },
  {
    id: "p4",
    name: "Founders Edition",
    price: "49.00",
    rarity: "Epic",
    gradient: "from-violet-500/50 to-blue-600/40",
  },
];

/**
 * Niftable white-label NFT marketplace — from github.com/narek941/NFT.
 * Hero, pack carousel, collection cards, wallet connect CTA.
 */
export const NftPlatformPreview = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState<PackItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const visiblePacks = [
    PACKS[carouselIndex % PACKS.length],
    PACKS[(carouselIndex + 1) % PACKS.length],
    PACKS[(carouselIndex + 2) % PACKS.length],
  ];

  const buyPack = (pack: PackItem) => {
    setCartCount((count) => count + 1);
    setSelectedPack(pack);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white text-[#182f43]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#ebf2f8] bg-white px-2.5 py-1.5">
        <span className="text-[8px] font-bold" style={{ color: BRAND_BLUE }}>
          Collect
        </span>
        <nav className="flex items-center gap-2 text-[6px] font-medium text-[#182f43]/70">
          <span>Collections</span>
          <span>Packs</span>
          <span>Redeem</span>
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="relative flex items-center gap-0.5 rounded-full border border-[#ebf2f8] px-1.5 py-0.5 text-[6px]"
          >
            <ShoppingBag className="h-2 w-2" style={{ color: BRAND_BLUE }} />
            {cartCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full text-[5px] font-bold text-white"
                style={{ background: BRAND_BLUE }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[6px] font-bold text-white"
            style={{ background: BRAND_BLUE }}
          >
            <Wallet className="h-2 w-2" />
            Connect
          </button>
        </div>
      </header>

      <div
        data-lenis-prevent
        className="flex flex-1 flex-col overflow-y-auto"
      >
        {/* Hero */}
        <section className="bg-[#f3faff] px-3 py-2.5 text-center">
          <p className="text-[6px] font-semibold uppercase tracking-[0.2em] text-[#182f43]/50">
            Your
          </p>
          <h1
            className="font-display text-[14px] font-bold leading-none tracking-tight"
            style={{ color: INK }}
          >
            NFTs
          </h1>
          <p className="mt-1 text-[6px] leading-relaxed text-[#182f43]/60">
            White-label marketplace · packs, collections &amp; redeem flows
          </p>
        </section>

        {/* Pack carousel */}
        <section className="px-2 py-2">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[7px] font-bold" style={{ color: INK }}>
              Featured packs
            </p>
            <div className="flex gap-0.5">
              <button
                type="button"
                onClick={() =>
                  setCarouselIndex(
                    (index) => (index - 1 + PACKS.length) % PACKS.length
                  )
                }
                className="rounded border border-[#ebf2f8] p-0.5"
              >
                <ChevronLeft className="h-2 w-2" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCarouselIndex((index) => (index + 1) % PACKS.length)
                }
                className="rounded border border-[#ebf2f8] p-0.5"
              >
                <ChevronRight className="h-2 w-2" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {visiblePacks.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setSelectedPack(pack)}
                className={`overflow-hidden rounded-lg border text-left transition-shadow ${
                  selectedPack?.id === pack.id
                    ? "border-[#0f43f9]/40 shadow-md ring-1 ring-[#0f43f9]/20"
                    : "border-[#ebf2f8] hover:shadow-sm"
                }`}
              >
                <div
                  className={`flex h-10 items-center justify-center bg-gradient-to-br ${pack.gradient}`}
                >
                  <span className="text-[5px] font-bold uppercase tracking-wider text-white/80">
                    {pack.rarity}
                  </span>
                </div>
                <div className="p-1">
                  <p className="truncate text-[6px] font-semibold">{pack.name}</p>
                  <p className="text-[6px] font-bold" style={{ color: BRAND_BLUE }}>
                    ${pack.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Collections row */}
        <section className="mt-auto border-t border-[#ebf2f8] bg-[#f3faff] px-2 py-1.5">
          <p className="mb-1 text-[6.5px] font-bold text-[#182f43]/80">Collections</p>
          <div className="flex gap-1 overflow-x-auto">
            {["Jungle", "Neon City", "Abstract"].map((collection) => (
              <span
                key={collection}
                className="shrink-0 rounded-full border border-[#ebf2f8] bg-white px-2 py-0.5 text-[5.5px] font-medium"
              >
                {collection}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Pack detail overlay */}
      {selectedPack && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/20 p-2 backdrop-blur-[1px]">
          <div className="w-full rounded-lg border border-[#ebf2f8] bg-white p-2 shadow-xl">
            <p className="text-[8px] font-bold">{selectedPack.name}</p>
            <p className="text-[6px] text-[#182f43]/55">{selectedPack.rarity} pack</p>
            <div className="mt-2 flex gap-1">
              <button
                type="button"
                onClick={() => buyPack(selectedPack)}
                className="flex-1 rounded py-1 text-[6px] font-bold text-white"
                style={{ background: BRAND_BLUE }}
              >
                Buy ${selectedPack.price}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPack(null)}
                className="rounded border border-[#ebf2f8] px-2 py-1 text-[6px] text-[#182f43]/60"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
