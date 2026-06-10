"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, SlidersHorizontal, Users } from "lucide-react";

interface CampgroundListing {
  id: string;
  name: string;
  location: string;
  price: number;
  pin: { top: string; left: string };
}

/** Anonymized listings — mirrors SearchPage DealsCard + MapBadge layout. */
const LISTINGS: CampgroundListing[] = [
  {
    id: "pine",
    name: "Pine Valley Resort",
    location: "Elberta, AL",
    price: 42,
    pin: { top: "38%", left: "68%" },
  },
  {
    id: "lake",
    name: "Lakeview Hollow",
    location: "Traverse City, MI",
    price: 55,
    pin: { top: "22%", left: "34%" },
  },
  {
    id: "summit",
    name: "Summit Meadows",
    location: "Bend, OR",
    price: 36,
    pin: { top: "62%", left: "48%" },
  },
];

const FILTER_PILLS = ["Instant booking", "Pet friendly", "WiFi"] as const;

/**
 * Campground search UI from gs-campground-bookings-frontend — light theme,
 * sticky search bar, filter pills, list + map split with $ price badges.
 */
export const CampgroundBookingPreview = () => {
  const [selectedId, setSelectedId] = useState(LISTINGS[0].id);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(["Instant booking"])
  );
  const selected = LISTINGS.find((item) => item.id === selectedId) ?? LISTINGS[0];

  const toggleFilter = (pill: string) =>
    setActiveFilters((current) => {
      const next = new Set(current);
      if (next.has(pill)) next.delete(pill);
      else next.add(pill);
      return next;
    });

  return (
    <div className="flex h-full w-full flex-col bg-white text-[#1a1a1a]">
      {/* CampgroundSearchBar */}
      <div className="border-b border-[#e2e2e2] px-2 py-1.5">
        <div className="grid grid-cols-[1.2fr_0.9fr_0.7fr_auto] gap-1 rounded-[6px] border border-[#e2e2e2] bg-white p-0.5">
          <div className="flex items-center gap-1 rounded border border-[#e2e2e2] px-1.5 py-1">
            <Search className="h-2 w-2 text-[#6b6b6b]" />
            <span className="text-[6.5px] text-[#6b6b6b]">Destinations</span>
          </div>
          <div className="flex items-center gap-1 rounded border border-[#e2e2e2] px-1.5 py-1">
            <Calendar className="h-2 w-2 text-[#6b6b6b]" />
            <span className="text-[6.5px] text-[#6b6b6b]">Dates</span>
          </div>
          <div className="flex items-center gap-1 rounded border border-[#e2e2e2] px-1.5 py-1">
            <Users className="h-2 w-2 text-[#6b6b6b]" />
            <span className="text-[6.5px] text-[#6b6b6b]">Guests</span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-0.5 rounded bg-[#1a7f4b] px-2 text-[6.5px] font-bold text-white hover:bg-[#156b3f]"
          >
            <Search className="h-2 w-2" />
            Search
          </button>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1">
          <button
            type="button"
            className="flex items-center gap-0.5 rounded-full border border-[#e2e2e2] px-1.5 py-0.5 text-[6px] font-medium text-[#1a1a1a]"
          >
            <SlidersHorizontal className="h-2 w-2" />
            Filters
          </button>
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => toggleFilter(pill)}
              className={`rounded-full px-1.5 py-0.5 text-[6px] font-medium transition-colors ${
                activeFilters.has(pill)
                  ? "bg-[#1a7f4b] text-white"
                  : "border border-[#e2e2e2] text-[#6b6b6b] hover:border-[#1a7f4b]/40"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between text-[6px] text-[#6b6b6b]">
          <span>Showing {LISTINGS.length} campgrounds</span>
          <span>Sort by · Featured</span>
        </div>
      </div>

      {/* List + map split */}
      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] gap-1.5 overflow-hidden p-1.5">
        <div className="flex flex-col gap-1 overflow-hidden">
          {LISTINGS.map((listing) => (
            <button
              key={listing.id}
              type="button"
              onClick={() => setSelectedId(listing.id)}
              className={`flex gap-1.5 rounded-md border p-1 text-left transition-colors ${
                listing.id === selectedId
                  ? "border-[#1a7f4b] bg-[#f0faf4]"
                  : "border-[#e2e2e2] hover:border-[#1a7f4b]/30"
              }`}
            >
              <div className="h-10 w-10 shrink-0 rounded bg-[#e8f0ea]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[7px] font-bold">{listing.name}</p>
                <p className="flex items-center gap-0.5 text-[6px] text-[#6b6b6b]">
                  <MapPin className="h-2 w-2 shrink-0" />
                  {listing.location}
                </p>
                <p className="text-[6.5px] font-bold text-[#1a7f4b]">
                  From ${listing.price}/night
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-md border border-[#e2e2e2] bg-[#e8f0ea]">
          {LISTINGS.map((listing) => (
            <button
              key={listing.id}
              type="button"
              onClick={() => setSelectedId(listing.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-1.5 py-0.5 text-[6px] font-bold shadow-sm transition-all ${
                listing.id === selectedId
                  ? "scale-110 bg-[#1a7f4b] text-white"
                  : "bg-white text-[#1a1a1a] hover:scale-105"
              }`}
              style={{ top: listing.pin.top, left: listing.pin.left }}
            >
              ${listing.price}
            </button>
          ))}

          {selected && (
            <div
              className="absolute z-10 w-[72%] -translate-x-1/2 rounded-md border border-[#e2e2e2] bg-white p-1.5 shadow-md"
              style={{ top: selected.pin.top, left: selected.pin.left, marginTop: "6px" }}
            >
              <p className="text-[6.5px] font-bold">{selected.name}</p>
              <p className="text-[6px] text-[#6b6b6b]">{selected.location}</p>
              <p className="text-[6.5px] font-bold text-[#1a7f4b]">
                ${selected.price}/night
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
