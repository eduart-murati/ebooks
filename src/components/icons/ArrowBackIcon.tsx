import type { SVGProps } from "react";

interface ArrowBackIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ArrowBackIcon = ({ size = "1em", ...props }: ArrowBackIconProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

