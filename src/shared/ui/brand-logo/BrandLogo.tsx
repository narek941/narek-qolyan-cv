interface BrandLogoProps {
  className?: string;
  /** Accessible label. Defaults to "Narek Kolyan". */
  label?: string;
}

export const BrandLogo = ({
  className,
  label = "Narek Kolyan",
}: BrandLogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo.png"
    alt={label}
    width={359}
    height={230}
    className={className}
    decoding="async"
  />
);
