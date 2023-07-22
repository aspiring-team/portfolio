import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { H3Icon } from "@/icons";

const ToggleH3Button: FC = memo(() => {
  const { toggleHeading } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().heading({ level: 3 })}
      enabled={toggleHeading.enabled({ level: 3 })}
      toggle={() => toggleHeading({ level: 3 })}
      icon={H3Icon}
    />
  );
});

ToggleH3Button.displayName = "ToggleH3Button";
export { ToggleH3Button };
