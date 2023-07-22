import { ComponentType, FC, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

type SelectionTooltipButtonProps = {
  active: boolean;
  enabled: boolean;
  toggle: () => void;
  icon: ComponentType<IconProps>;
};

const SelectionTooltipButton: FC<SelectionTooltipButtonProps> = memo(
  ({ active, enabled, toggle, icon: Icon }) => {
    const handleSelect = useCallback(() => {
      if (enabled) toggle();
    }, [enabled, toggle]);

    return (
      <button
        className={twMerge(
          "rounded p-1 hover:bg-primary-100",
          active && "bg-primary-50"
        )}
        type="button"
        disabled={!enabled}
        onClick={handleSelect}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon
          className={twMerge("h-5 w-5 text-gray-500", active && "text-black")}
        />
      </button>
    );
  }
);

SelectionTooltipButton.displayName = "SelectionTooltipButton";
export { SelectionTooltipButton };
