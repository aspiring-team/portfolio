"use client";

import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useForm } from "react-hook-form";
import { SectionType } from "@/models";

import { Tooltip } from "../elements";

import { AlignLeftIcon, ImagePlusIcon, AddIcon, StarIcon } from "@/icons";
import { usePortfolioStore } from "@/stores";

const Editor = dynamic(
  async () => (await import("@/components/editor/Editor")).Editor,
  { ssr: false }
);

type SectionProps = {
  id?: string;
  type?: SectionType | null;

  title?: string | null;
  content?: string | null;
  image?: string | null;
};

const Section: FC<SectionProps> = memo(
  ({ id, type, title, content, image }) => {
    const { completionLoading } = usePortfolioStore();
    const { register, handleSubmit, watch } = useForm({
      defaultValues: {
        title: title ?? "",
        image: [] as FileList[],
      },
    });

    const [isEdit, setEdit] = useState(false);
    const [isImage, setImage] = useState(false);

    const [editorContent, setEditorContent] = useState(content ?? "");
    useEffect(() => {
      setEditorContent(content || "<p></p>");
    }, [setEditorContent, content]);

    const submitForm = (val: any) => {
      console.log(val);
      console.log(content);
    };

    const handleSave = useCallback(() => {
      setEdit(false);
    }, []);

    const ref = useRef<any>(null);
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target)) handleSave?.();
      };

      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, [handleSave]);

    return (
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col-reverse items-start space-y-1 md:flex-row md:items-end md:space-x-3 md:space-y-0"
      >
        <div className="flex flex-row-reverse md:flex-col md:space-y-3">
          <Tooltip text="Ask AI" icon={StarIcon}>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-6 w-6" />
              <p className="p5 text-gray-700">Ask AI</p>
            </div>
          </Tooltip>

          <div className="mr-20 md:mr-0">
            <Tooltip text="More" icon={AddIcon}>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-1">
                  <AlignLeftIcon className="h-6 w-6" />
                  <p className="p5 text-gray-700">Add Section</p>
                </div>

                <button
                  onClick={() => setImage(true)}
                  className="flex items-center space-x-1"
                >
                  <ImagePlusIcon className="h-6 w-6" />
                  <p className="p5 text-gray-700">Add Image</p>
                </button>
              </div>
            </Tooltip>
          </div>
        </div>

        <section
          className="flex flex-col space-y-1"
          onClick={() => setEdit(true)}
          ref={ref}
        >
          {title || content ? (
            isEdit ? (
              <>
                <textarea
                  className="p1 flex-shrink-0 resize-none bg-transparent font-bold focus:outline-none"
                  placeholder="Section Title"
                  rows={1}
                  maxLength={80}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                    e.currentTarget.style.height = "1px";
                    e.currentTarget.style.height =
                      e.currentTarget.scrollHeight + "px";
                  }}
                  {...register("title")}
                />

                <Editor
                  initialContent={editorContent}
                  onUpdate={(h) => setEditorContent(h)}
                />
              </>
            ) : (
              <>
                <p className="p1 font-bold text-gray-900">{watch("title")}</p>
                {completionLoading ? (
                  <p>{editorContent}</p>
                ) : (
                  <Editor initialContent={editorContent} readOnly />
                )}
              </>
            )
          ) : image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="max-w-full" src={image} alt="cover section" />
          ) : null}

          {isImage && (
            <div className="flex flex-col space-y-4">
              <input
                accept="image/*"
                id="file"
                {...register("image")}
                type="file"
              />

              <button
                className="btn btn-primary"
                disabled={!(watch("image").length > 0)}
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
        </section>
      </form>
    );
  }
);

Section.displayName = "Section";

export { Section };
