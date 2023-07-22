import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const H1Icon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="H1Icon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.66667 5V11.6667M4.66667 5H6.33333M4.66667 5H3M4.66667 11.6667V18.3333M4.66667 11.6667L14.6667 11.6667M4.66667 18.3333H6.33333M4.66667 18.3333H3M14.6667 5V11.6667M14.6667 5H16.3333M14.6667 5H13M14.6667 11.6667V18.3333M14.6667 18.3333H16.3333M14.6667 18.3333H13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.7681 19V18.248L19.9253 18.1016V13.0723L18.7485 13.082V12.3594L21.1509 11.8906V18.1016L22.3081 18.248V19H18.7681Z"
      fill="currentColor"
    />
  </svg>
));

H1Icon.displayName = "H1Icon";
export { H1Icon };
