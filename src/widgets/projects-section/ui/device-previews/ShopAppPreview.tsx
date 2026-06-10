"use client";

import { useState } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";

interface ProductTile {
  id: string;
  tint: string;
  price: string;
  category: "new" | "sale";
}

const PRODUCT_TILES: ProductTile[] = [
  { id: "p1", tint: "#818cf8", price: "$39", category: "new" },
  { id: "p2", tint: "#f0abfc", price: "$54", category: "sale" },
  { id: "p3", tint: "#67e8f9", price: "$27", category: "new" },
  { id: "p4", tint: "#fbbf24", price: "$46", category: "sale" },
];

const CATEGORIES = ["All", "New", "Sale"] as const;

/**
 * Whitelabel mobile shopping app — interactive: category pills filter
 * the grid, tap a product to add to cart, tap hearts to favourite.
 */
export const ShopAppPreview = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [cartCount, setCartCount] = useState(2);
  const [favourites, setFavourites] = useState<Set<string>>(new Set(["p2"]));

  const visibleProducts = PRODUCT_TILES.filter(
    (product) =>
      activeCategory === "All" || product.category === activeCategory.toLowerCase()
  );

  const toggleFavourite = (productId: string) =>
    setFavourites((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });

  return (
    <div className="flex h-full w-full flex-col bg-[#0a0a14] px-3 pb-3 pt-1.5 text-white">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-[11px] font-bold">Shop</p>
        <span className="relative">
          <ShoppingBag className="h-3 w-3 text-white/80" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-fuchsia-400 text-[6px] font-bold text-black">
              {cartCount}
            </span>
          )}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2 py-1.5">
        <Search className="h-2.5 w-2.5 text-white/40" />
        <span className="text-[7.5px] text-white/40">Search products…</span>
      </div>

      <div className="mb-2 flex gap-1.5">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-2 py-0.5 text-[7px] font-bold transition-colors ${
              activeCategory === category
                ? "bg-white text-black"
                : "bg-white/10 text-white/55 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 content-start gap-1.5">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="relative flex h-[88px] flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
          >
            <button
              type="button"
              aria-label="Add to cart"
              onClick={() => setCartCount((count) => count + 1)}
              className="h-[58%] w-full transition-transform active:scale-95"
              style={{ background: `${product.tint}1f` }}
            >
              <span
                className="mx-auto block h-[55%] w-[58%] translate-y-[18%] rounded-md"
                style={{ background: `${product.tint}59` }}
              />
            </button>
            <button
              type="button"
              aria-label="Toggle favourite"
              onClick={() => toggleFavourite(product.id)}
              className="absolute right-1 top-1"
            >
              <Heart
                className={`h-2.5 w-2.5 transition-colors ${
                  favourites.has(product.id)
                    ? "fill-rose-400 text-rose-400"
                    : "text-white/50"
                }`}
              />
            </button>
            <div className="flex flex-1 flex-col justify-center gap-0.5 px-1.5">
              <span className="h-1 w-[75%] rounded bg-white/25" />
              <span className="text-[7.5px] font-bold">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
