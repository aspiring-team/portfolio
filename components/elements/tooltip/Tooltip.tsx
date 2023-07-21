import React, { ComponentType, PropsWithChildren } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

type TooltipProps = {
  icon: ComponentType<IconProps>;
  text: string;
  className?: string;
};

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  icon: Icon,
  text,
  children,
  className,
}) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <button className="flex items-center justify-center space-x-1 rounded-full outline-none">
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
            <p className="p3 text-gray-500 md:hidden">{text}</p>
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={twMerge([
              "flex select-none flex-row-reverse rounded-[8px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade md:flex-row",
              className && className,
            ])}
            side="left"
            sideOffset={5}
          >
            {children}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
