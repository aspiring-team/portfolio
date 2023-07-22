import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const CheckIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

CheckIcon.displayName = "CheckIcon";
export { CheckIcon };
