import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const AlignLeftIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 10H3M20 6H3M20 14H3M16 18H3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

AlignLeftIcon.displayName = "AlignLeftIcon";
export { AlignLeftIcon };
