import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { CodeSnippetIcon } from "@/icons";

const ToggleCodeButton: FC = memo(() => {
  const { toggleCode } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().code()}
      enabled={toggleCode.enabled()}
      toggle={toggleCode}
      icon={CodeSnippetIcon}
    />
  );
});

ToggleCodeButton.displayName = "ToggleCodeButton";
export { ToggleCodeButton };
