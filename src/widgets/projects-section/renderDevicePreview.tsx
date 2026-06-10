import type { ReactNode } from "react";

import {
  AccountantPreview,
  ArmApplyPreview,
  CampgroundBookingPreview,
  CryptoAdminPreview,
  DealerPortalPreview,
  HealthDevicePreview,
  MultiGitDesktopPreview,
  NftPlatformPreview,
  ServiceAdminPreview,
  ShopAppPreview,
  StorefrontPreview,
  StrikeArtPreview,
  WebViewAppPreview,
} from "./ui/device-previews";
import type { DevicePreviewId } from "./showcase.const";

const PREVIEW_COMPONENTS: Record<DevicePreviewId, () => ReactNode> = {
  accountant: () => <AccountantPreview />,
  armapply: () => <ArmApplyPreview />,
  campground: () => <CampgroundBookingPreview />,
  health: () => <HealthDevicePreview />,
  storefront: () => <StorefrontPreview />,
  shop: () => <ShopAppPreview />,
  dealer: () => <DealerPortalPreview />,
  "strike-art": () => <StrikeArtPreview />,
  "crypto-admin": () => <CryptoAdminPreview />,
  "nft-platform": () => <NftPlatformPreview />,
  "service-admin": () => <ServiceAdminPreview />,
  "webview-app": () => <WebViewAppPreview />,
  "multigit-desktop": () => <MultiGitDesktopPreview />,
};

export const renderDevicePreview = (previewId: DevicePreviewId): ReactNode =>
  PREVIEW_COMPONENTS[previewId]();
