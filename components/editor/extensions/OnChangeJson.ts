import { FC, memo, useCallback } from "react";

import { RemirrorJSON } from "@remirror/core-types";
import { useHelpers, useDocChanged } from "@remirror/react-core";

type OnChangeJsonProps = {
  onChange: (json: RemirrorJSON) => void;
};

const OnChangeJson: FC<OnChangeJsonProps> = memo(
  ({ onChange }: OnChangeJsonProps) => {
    const { getJSON } = useHelpers();
    useDocChanged(
      useCallback(
        ({ state }) => {
          const json = getJSON(state);
          onChange(json);
        },
        [onChange, getJSON]
      )
    );
    return null;
  }
);

OnChangeJson.displayName = "OnChangeJson";
export { OnChangeJson };
