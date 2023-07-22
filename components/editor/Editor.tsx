"use client";

import { FC, memo, useEffect } from "react";
import styles from "./Editor.module.css";

// import "remirror/styles/all.css";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import {
  wysiwygPreset,
  PlaceholderExtension,
  ImageExtension,
} from "remirror/extensions";
import { OnChangeHtml, SelectionTooltip } from "./extensions";

import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "@/hooks";

type EditorProps = {
  className?: string;

  placeholder?: string;
  readOnly?: boolean;

  initialContent?: string;
  onUpdate?: (html: string) => void;
};

const Editor: FC<EditorProps> = memo(
  ({
    className,
    placeholder = "Enter some text...",
    readOnly = false,
    initialContent,
    onUpdate = () => {},
  }) => {
    const { manager, state, setState } = useRemirror({
      extensions: () => [
        new ImageExtension({ enableResizing: true }),
        new PlaceholderExtension({ placeholder }),
        ...wysiwygPreset(),
      ],
      content: initialContent || "",
      stringHandler: "html",
      selection: "start",
    });

    useEffect(() => {
      setState(manager.createState({ content: initialContent }));
    }, [initialContent, manager, setState]);

    const debouncedOnUpdate = useDebouncedCallback(onUpdate, 200);

    return (
      <div className={twMerge(styles.editor, className)}>
        <Remirror
          classNames={["flex-1 overflow-y-auto focus:outline-none"]}
          manager={manager}
          initialContent={state}
          editable={!readOnly}
        >
          <EditorComponent />

          {/* Custom extensions */}
          {!readOnly && (
            <>
              <OnChangeHtml onChange={debouncedOnUpdate} />
              <SelectionTooltip />
            </>
          )}
        </Remirror>
      </div>
    );
  }
);

Editor.displayName = "Editor";
export { Editor };
