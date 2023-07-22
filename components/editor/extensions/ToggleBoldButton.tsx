import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { BoldIcon } from "@/icons";

const ToggleBoldButton: FC = memo(() => {
  const { toggleBold } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().bold()}
      enabled={toggleBold.enabled()}
      toggle={toggleBold}
      icon={BoldIcon}
    />
  );
});

ToggleBoldButton.displayName = "ToggleBoldButton";
export { ToggleBoldButton };
