export type DevicePreviewId =
  | "accountant"
  | "armapply"
  | "campground"
  | "health"
  | "storefront"
  | "shop"
  | "dealer"
  | "strike-art"
  | "crypto-admin"
  | "nft-platform"
  | "service-admin"
  | "webview-app"
  | "multigit-desktop";

export interface ShowcaseEntry {
  id: string;
  /** Links to `projects.const` for i18n name, description, features, links. */
  projectId: string;
  previewId: DevicePreviewId;
  device: "macbook" | "iphone";
  addressBarText?: string;
  /** MacBook frame: terminal previews hide browser chrome. */
  showBrowserChrome?: boolean;
}

/** Production apps rendered as interactive device frames (no auction / sound player). */
export const SHOWCASE_ENTRIES: ShowcaseEntry[] = [
  {
    id: "accountant",
    projectId: "accounting-platform",
    previewId: "accountant",
    device: "macbook",
    addressBarText: "accounting.services.app",
  },
  {
    id: "armapply",
    projectId: "armapply-telegram-bot",
    previewId: "armapply",
    device: "iphone",
  },
  {
    id: "campground",
    projectId: "rv-rental-platform",
    previewId: "campground",
    device: "macbook",
    addressBarText: "bookings.campsites.app",
  },
  {
    id: "health",
    projectId: "mobile-health-device-app",
    previewId: "health",
    device: "iphone",
  },
  {
    id: "storefront",
    projectId: "mobile-ecommerce-solution",
    previewId: "storefront",
    device: "macbook",
    addressBarText: "store.brand-b.app",
  },
  {
    id: "shop",
    projectId: "mobile-ecommerce-solution",
    previewId: "shop",
    device: "iphone",
  },
  {
    id: "dealer",
    projectId: "dealer-service-portal",
    previewId: "dealer",
    device: "macbook",
    addressBarText: "portal.dealer-hub.app",
  },
  {
    id: "strike-art",
    projectId: "ai-social-media-generator",
    previewId: "strike-art",
    device: "macbook",
    addressBarText: "studio.contentgen.app",
  },
  {
    id: "crypto-admin",
    projectId: "crypto-admin-panel",
    previewId: "crypto-admin",
    device: "macbook",
    addressBarText: "admin.crypto-exchange.app",
  },
  {
    id: "nft-platform",
    projectId: "nft-whitelabel-platform",
    previewId: "nft-platform",
    device: "macbook",
    addressBarText: "marketplace.nft-wl.app",
  },
  {
    id: "service-admin",
    projectId: "service-admin-panel",
    previewId: "service-admin",
    device: "macbook",
    addressBarText: "admin.service-panel.app",
  },
  {
    id: "webview-app",
    projectId: "mobile-webview-app",
    previewId: "webview-app",
    device: "iphone",
  },
  {
    id: "multigit-desktop",
    projectId: "git-cli-tool",
    previewId: "multigit-desktop",
    device: "macbook",
    showBrowserChrome: false,
  },
];

export const showcasedProjectIds = new Set(
  SHOWCASE_ENTRIES.map((entry) => entry.projectId)
);
