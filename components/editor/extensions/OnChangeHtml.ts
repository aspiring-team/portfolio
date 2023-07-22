import { FC, memo, useCallback } from "react";
import { useHelpers, useDocChanged } from "@remirror/react-core";

type OnChangeHtmlProps = {
  onChange: (html: string) => void;
};

const OnChangeHtml: FC<OnChangeHtmlProps> = memo(
  ({ onChange }: OnChangeHtmlProps) => {
    const { getHTML } = useHelpers();
    useDocChanged(
      useCallback(() => {
        const html = getHTML();
        onChange(html);
      }, [getHTML, onChange])
    );
    return null;
  }
);

OnChangeHtml.displayName = "OnChangeHtml";
export { OnChangeHtml };
