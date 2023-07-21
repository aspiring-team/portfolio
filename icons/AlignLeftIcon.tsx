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
      d="M10.6667 6.66667H2M13.3333 4H2M13.3333 9.33333H2M10.6667 12H2"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

AlignLeftIcon.displayName = "AlignLeftIcon";
export { AlignLeftIcon };
