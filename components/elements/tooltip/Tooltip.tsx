"use client";

import { ComponentType, FC, PropsWithChildren, useState } from "react";

import { twMerge } from "tailwind-merge";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type TooltipProps = {
  className?: string;
  icon?: ComponentType<IconProps>;
  text: string;
};

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  className,
  text,
  icon: Icon,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0} open={open} onOpenChange={setOpen}>
        <RadixTooltip.Trigger asChild>
          <button
            className="flex items-center justify-center space-x-1 rounded-full outline-none"
            onClick={() => setOpen(true)}
          >
            {Icon && <Icon className="h-5 w-5 md:h-6 md:w-6" />}
            <p className="p3 text-gray-500 md:hidden">{text}</p>
          </button>
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={twMerge([
              "flex select-none flex-row-reverse rounded-[8px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-lg will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade md:flex-row",
              className,
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
