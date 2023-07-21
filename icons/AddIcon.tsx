import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const AddIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0003 6.16663V17.8333M6.16699 12H17.8337"
      stroke="#667085"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

AddIcon.displayName = "AddIcon";
export { AddIcon };
