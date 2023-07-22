import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { H1Icon } from "@/icons";

const ToggleH1Button: FC = memo(() => {
  const { toggleHeading } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().heading({ level: 1 })}
      enabled={toggleHeading.enabled({ level: 1 })}
      toggle={() => toggleHeading({ level: 1 })}
      icon={H1Icon}
    />
  );
});

ToggleH1Button.displayName = "ToggleH1Button";
export { ToggleH1Button };
