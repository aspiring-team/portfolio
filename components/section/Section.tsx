"use client";

import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import dynamic from "next/dynamic";
import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";
import { usePortfolioStore } from "@/stores";
import { SectionType } from "@/models";

import Image from "next/image";
import { Tooltip } from "../elements";

import { AlignLeftIcon, ImagePlusIcon, AddIcon, StarIcon } from "@/icons";

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
    const { completionLoading, sections, setSections } = usePortfolioStore();
    const { register, handleSubmit, watch } = useForm({
      defaultValues: {
        title: title ?? "",
        image: {} as FileList,
      },
    });

    const [editorContent, setEditorContent] = useState(content ?? "");
    useEffect(() => {
      setEditorContent(content || "<p></p>");
    }, [setEditorContent, content]);

    const submitForm = handleSubmit((val: any) => {
      console.log(val);
      console.log(content);
    });

    const [isEdit, setEdit] = useState(false);
    const handleSave = useCallback(() => {
      setEdit(false);
    }, []);

    const addSection = useCallback(() => {
      const index = sections.findIndex((s) => s.id === id);
      setSections([
        ...sections.slice(0, index + 1),
        {
          id: nanoid(),
          title: "Section Title",
          content: "Section Content",
        },
        ...sections.slice(index + 1),
      ]);
    }, [id, sections, setSections]);

    const previewUrl = !!watch("image")[0]
      ? URL.createObjectURL(watch("image")[0])
      : undefined;

    const addImage = useCallback(() => {
      const index = sections.findIndex((s) => s.id === id);
      setSections([
        ...sections.slice(0, index + 1),
        {
          id: nanoid(),
          image: "",
        },
        ...sections.slice(index + 1),
      ]);
    }, [id, sections, setSections]);

    return (
      <form
        className="flex flex-col-reverse items-start space-y-1 md:flex-row md:items-end md:space-x-3 md:space-y-0"
        onSubmit={submitForm}
        onBlur={handleSave}
      >
        <div className="flex flex-row-reverse md:flex-col md:space-y-3">
          <Tooltip text="Ask AI" icon={StarIcon}>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-6 w-6" />
              <p className="p5 text-gray-700">Ask AI</p>
            </div>
          </Tooltip>

          <div className="mr-20 md:mr-0">
            <Tooltip className="p-1" text="More" icon={AddIcon}>
              <div className="p5 flex flex-col font-semibold text-gray-700">
                <button
                  className="btn btn-ghost flex h-fit min-h-0 items-center justify-start px-2 py-2 normal-case"
                  onClick={addSection}
                >
                  <AlignLeftIcon className="h-5 w-5" />
                  <p>Add Section</p>
                </button>

                <button
                  className="btn btn-ghost flex h-fit min-h-0 items-center justify-start px-2 py-2 normal-case"
                  onClick={addImage}
                >
                  <ImagePlusIcon className="h-5 w-5" />
                  <p>Add Image</p>
                </button>
              </div>
            </Tooltip>
          </div>
        </div>

        <section
          className="flex grow flex-col space-y-1"
          onClick={() => setEdit(true)}
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
                {title && (
                  <p className="p1 font-bold text-gray-900">{watch("title")}</p>
                )}

                {completionLoading ? (
                  <p>{editorContent}</p>
                ) : editorContent ? (
                  <Editor initialContent={editorContent} readOnly />
                ) : null}
              </>
            )
          ) : image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="max-w-full" src={image} alt="cover section" />
          ) : null}

          {typeof image === "string" && (
            <div className="flex w-full grow flex-col">
              <input
                id={`image-${id}`}
                className="hidden"
                accept="image/*"
                type="file"
                {...register("image")}
              />

              {!previewUrl ? (
                <label
                  htmlFor={`image-${id}`}
                  className="btn btn-primary min-h-0 w-full normal-case"
                >
                  Select Image
                </label>
              ) : (
                <div className="relative aspect-video w-full overflow-clip rounded-lg">
                  <Image
                    className="object-cover"
                    src={previewUrl}
                    alt=""
                    fill
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </form>
    );
  }
);

Section.displayName = "Section";
export { Section };
