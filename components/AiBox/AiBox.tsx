import { FC, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";
import { StopCircle } from "@/icons";

type AiBoxProps = {
  className?: string;
  onStop?: () => void;
  title?: string;
};

export const AiBox: FC<PropsWithChildren<AiBoxProps>> = ({
  className,
  title,
  onStop,
  children,
}) => (
  <section
    className={twMerge(
      "flex flex-col items-stretch space-y-3 rounded-lg border border-base-300 bg-base-100 px-3.5 py-4 shadow-xs",
      className
    )}
  >
    {title && onStop && (
      <div className="flex items-center">
        {title && <p className="p4 font-bold text-gray-500">{title}</p>}
        {onStop && (
          <button
            className="ml-auto flex items-center space-x-2"
            onClick={onStop}
          >
            <StopCircle className="text-error" />
            <p className="p4 text-error">Stop AI assistant</p>
          </button>
        )}
      </div>
    )}
    {children}
  </section>
);
