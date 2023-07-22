import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const BoldIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="BoldIcon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12H14C16.2091 12 18 10.2091 18 8C18 5.79086 16.2091 4 14 4H6V12ZM6 12H15C17.2091 12 19 13.7909 19 16C19 18.2091 17.2091 20 15 20H6V12Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

BoldIcon.displayName = "BoldIcon";
export { BoldIcon };
