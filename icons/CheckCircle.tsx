import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const CheckCircle: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="CheckCircle"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

CheckCircle.displayName = "CheckCircle";
export { CheckCircle };
