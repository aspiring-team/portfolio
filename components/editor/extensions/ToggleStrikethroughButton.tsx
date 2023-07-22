import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { StrikethroughIcon } from "@/icons";

const ToggleStrikethroughButton: FC = memo(() => {
  const { toggleStrike } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().strike()}
      enabled={toggleStrike.enabled()}
      toggle={toggleStrike}
      icon={StrikethroughIcon}
    />
  );
});

ToggleStrikethroughButton.displayName = "ToggleStrikethroughButton";
export { ToggleStrikethroughButton };
