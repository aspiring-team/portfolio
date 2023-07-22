import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { H2Icon } from "@/icons";

const ToggleH2Button: FC = memo(() => {
  const { toggleHeading } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().heading({ level: 2 })}
      enabled={toggleHeading.enabled({ level: 2 })}
      toggle={() => toggleHeading({ level: 2 })}
      icon={H2Icon}
    />
  );
});

ToggleH2Button.displayName = "ToggleH2Button";
export { ToggleH2Button };
