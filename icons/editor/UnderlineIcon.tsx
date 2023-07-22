import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const UnderlineIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="UnderlineIcon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 21H20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

UnderlineIcon.displayName = "UnderlineIcon";
export { UnderlineIcon };
