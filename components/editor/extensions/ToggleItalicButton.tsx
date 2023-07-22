import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { ItalicIcon } from "@/icons";

const ToggleItalicButton: FC = memo(() => {
  const { toggleItalic } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().italic()}
      enabled={toggleItalic.enabled()}
      toggle={toggleItalic}
      icon={ItalicIcon}
    />
  );
});

ToggleItalicButton.displayName = "ToggleItalicButton";
export { ToggleItalicButton };
