import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const CodeSnippetIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    data-testid="CodeSnippetIcon"
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 18L22 12L16 6M8 6L2 12L8 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

CodeSnippetIcon.displayName = "CodeSnippetIcon";
export { CodeSnippetIcon };
