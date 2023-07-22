import { FC, memo, useCallback } from "react";

import { LinkExtension } from "remirror/extensions";
import { useExtensionEvent } from "@remirror/react";

const LinkOpener: FC = memo(() => {
  useExtensionEvent(
    LinkExtension,
    "onClick",
    useCallback((_, data) => {
      window?.open(data.href, "_blank");
      return true;
    }, [])
  );
  return null;
});

LinkOpener.displayName = "LinkOpener";
export { LinkOpener };
