import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const HeadingIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="HeadingIcon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4V20M18 4V20M8 4H4M18 12L6 12M8 20H4M20 20H16M20 4H16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

HeadingIcon.displayName = "HeadingIcon";
export { HeadingIcon };
