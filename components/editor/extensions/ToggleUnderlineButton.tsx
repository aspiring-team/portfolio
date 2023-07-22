import { FC, memo } from "react";
import { useActive, useCommands } from "@remirror/react";
import { SelectionTooltipButton } from ".";
import { UnderlineIcon } from "@/icons";

const ToggleUnderlineButton: FC = memo(() => {
  const { toggleUnderline } = useCommands();
  return (
    <SelectionTooltipButton
      active={useActive().underline()}
      enabled={toggleUnderline.enabled()}
      toggle={toggleUnderline}
      icon={UnderlineIcon}
    />
  );
});

ToggleUnderlineButton.displayName = "ToggleUnderlineButton";
export { ToggleUnderlineButton };
