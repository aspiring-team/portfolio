import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const ItalicIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="ItalicIcon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H10M14 20H5M15 4L9 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

ItalicIcon.displayName = "ItalicIcon";
export { ItalicIcon };
