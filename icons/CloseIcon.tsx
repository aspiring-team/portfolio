import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const CloseIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

CloseIcon.displayName = "CloseIcon";
export { CloseIcon };
