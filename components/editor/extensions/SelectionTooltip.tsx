import {
  CSSProperties,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { getPositioner, PositionerParam } from "@remirror/extension-positioner";
import {
  createMarkPositioner,
  LinkExtension,
  ShortcutHandlerProps,
} from "remirror/extensions";
import { usePositioner } from "@remirror/react-hooks";

import {
  useActive,
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
  useExtensionEvent,
} from "@remirror/react";

import {
  SelectionTooltipButton,
  ToggleBoldButton,
  ToggleCodeButton,
  ToggleItalicButton,
  ToggleStrikethroughButton,
  ToggleUnderlineButton,
} from ".";

import { twMerge } from "tailwind-merge";
import {
  CopyIcon,
  CopyLinkIcon,
  EditIcon,
  GlobeIcon,
  LinkBrokenIcon,
} from "@/icons";

type SelectionTooltipProps = {
  positioner?: PositionerParam;
};

const SelectionTooltip: FC<SelectionTooltipProps> = memo(
  ({ positioner = "selection" }) => {
    const { to, empty } = useCurrentSelection();
    const { focus, removeLink, selectLink, updateLink } = useChainedCommands();
    const active = useActive();

    // State of selection
    const {
      ref: selectRef,
      x: selectX,
      y: selectY,
      width: selectWidth,
      height: selectHeight,
    } = usePositioner(() => getPositioner(positioner), [positioner]);

    // State of cursor (only if contains link)
    const {
      ref: linkRef,
      x: linkX,
      y: linkY,
      width: linkWidth,
      height: linkHeight,
    } = usePositioner(() => createMarkPositioner({ type: "link" }), []);

    // Does the cursor position contains url?
    const url = (useAttrs().link()?.href as string) ?? "";
    const [href, setHref] = useState(url);
    useEffect(() => setHref(url), [url]);

    const [isEditingLink, setEditingLink] = useState(false);
    useEffect(() => setEditingLink(false), [selectRef, linkRef]);

    // Handle link creation via shortcut
    const [linkShortcut, setLinkShortcut] = useState<ShortcutHandlerProps>();
    useExtensionEvent(
      LinkExtension,
      "onShortcut",
      useCallback(
        (props) => {
          if (!isEditingLink) setEditingLink(true);
          return setLinkShortcut(props);
        },
        [isEditingLink]
      )
    );

    // Confirm and submit link edit
    const onEditLink = useCallback(() => {
      setEditingLink(false);
      const range = linkShortcut ?? undefined;

      if (href === "") removeLink();
      else updateLink({ href, auto: false }, range);

      focus(range?.to ?? to).run();
    }, [linkShortcut, href, removeLink, updateLink, focus, to]);

    const onRemoveLink = useCallback(
      () => removeLink().focus().run(),
      [removeLink]
    );

    const onCopyLink = useCallback(() => {
      const link = href.startsWith("http") ? href : `https:${href}`;
      navigator.clipboard.writeText(link);
      toast.success("Copied link to clipboard");
    }, [href]);

    // Element reference as the anchor for tooltip
    const refs = useCallback(
      (elem: HTMLDivElement | null) =>
        linkRef == null
          ? selectRef == null
            ? void 0
            : selectRef(elem)
          : linkRef(elem),
      [linkRef, selectRef]
    );

    // Styling for tooltip element
    const styles = useMemo(
      () =>
        ({
          position: "absolute",
          left: linkRef ? linkX : selectX,
          top: linkRef ? linkY : selectY,
          width: linkRef ? linkWidth : selectWidth,
          height: linkRef ? linkHeight : selectHeight,
        }) as CSSProperties,
      [
        linkRef,
        linkX,
        selectX,
        linkY,
        selectY,
        linkWidth,
        selectWidth,
        linkHeight,
        selectHeight,
      ]
    );

    return (
      <div ref={refs} style={styles}>
        <div
          className={twMerge(
            "absolute top-0 -translate-y-[calc(100%+.5rem)]",
            (isEditingLink || (!selectRef && linkRef)) &&
              "bottom-0 translate-y-[calc(100%+.5rem)]"
          )}
        >
          <div className="flex items-stretch space-x-3 rounded-lg border border-gray-100 bg-white px-3 py-2 shadow">
            {isEditingLink ? (
              <>
                <input
                  className="p3 max-w-[10rem]"
                  placeholder="Type or paste url"
                  autoFocus
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
                  onKeyDown={({ key }) => {
                    if (key === "Enter") onEditLink();
                  }}
                />
              </>
            ) : selectRef ? (
              <>
                <ToggleBoldButton />
                <ToggleItalicButton />
                <ToggleUnderlineButton />
                <ToggleStrikethroughButton />

                <div className="my-1 border-l border-gray-300" />
                <SelectionTooltipButton
                  enabled
                  active={active.link()}
                  icon={CopyLinkIcon}
                  toggle={() => {
                    if (active.link()) onRemoveLink();
                    else setEditingLink(true);
                  }}
                />
                <ToggleCodeButton />
              </>
            ) : href ? (
              <>
                <GlobeIcon className="h-5 w-5 text-gray-500" />
                <a
                  className="p3 ml-2 max-w-[10rem] cursor-pointer truncate font-semibold leading-tight text-primary underline-offset-2 hover:underline"
                  href={href.startsWith("http") ? href : `https:${href}`}
                  target="_blank"
                >
                  {href.split("//").slice(-1)}
                </a>

                <button className="!ml-4" onClick={onCopyLink}>
                  <CopyIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>

                <button
                  onClick={() => {
                    if (empty) selectLink();
                    setEditingLink(true);
                  }}
                >
                  <EditIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>

                <button onClick={() => onRemoveLink()}>
                  <LinkBrokenIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

SelectionTooltip.displayName = "SelectionTooltip";
export { SelectionTooltip };
