"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { AlignLeftIcon, ImagePlusIcon, AddIcon, StarIcon } from "@/icons";

import dynamic from "next/dynamic";

const Editor = dynamic(async () => (await import("../editor/Editor")).Editor, {
  ssr: false,
});

import { Tooltip } from "../elements";
import { useForm } from "react-hook-form";
import { SectionType } from "@/models";

type SectionProps = {
  title?: string | null;
  content?: string | null;
  id?: string;
  type?: SectionType | null;
  image?: string | null;
};

const Section: React.FC<SectionProps> = memo(
  ({ title, content, id, type, image }) => {
    const { register, handleSubmit, watch } = useForm({
      defaultValues: {
        title: title ?? "",
        image: [] as FileList[],
      },
    });

    const [isEdit, setIsEdit] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [contentVal, setContentVal] = useState(content ?? "");

    const submitForm = (val: any) => {
      console.log(val);
      console.log(content);
    };

    const changeEditable = useCallback((enable: boolean) => {
      setIsEdit(enable);
    }, []);

    const handleSave = useCallback(() => {
      changeEditable(false);
      // submit to the firestore
    }, [changeEditable]);

    const ref = useRef<any>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handleSave && handleSave();
        }
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
        <section className="flex flex-row-reverse md:flex-col md:space-y-3">
          <Tooltip text="Ask AI" icon={StarIcon}>
            <div className="flex space-y-1">
              <StarIcon className="h-6 w-6" />
              <p className="p5 text-gray-700">Ask AI</p>
            </div>
          </Tooltip>
          <div className="mr-20 md:mr-0">
            <Tooltip text="More" icon={AddIcon}>
              <div className="flex flex-col space-y-2">
                <div className="flex space-y-1">
                  <AlignLeftIcon className="h-6 w-6" />
                  <p className="p5 text-gray-700">Add Section</p>
                </div>
                <button
                  onClick={() => setIsImage(true)}
                  className="flex space-y-1"
                >
                  <ImagePlusIcon className="h-6 w-6" />
                  <p className="p5 text-gray-700">Add Image</p>
                </button>
              </div>
            </Tooltip>
          </div>
        </section>
        <section
          className="flex flex-col space-y-1"
          onClick={() => changeEditable(true)}
          ref={ref}
        >
          {title && content ? (
            <>
              {isEdit ? (
                <>
                  <textarea
                    className="h6 flex-shrink-0 resize-none bg-transparent font-bold"
                    placeholder="Title"
                    rows={1}
                    {...register("title")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                      e.currentTarget.style.height = "1px";
                      e.currentTarget.style.height =
                        e.currentTarget.scrollHeight + "px";
                    }}
                    maxLength={80}
                  />
                  <Editor
                    initialContent={contentVal}
                    onUpdate={(h) => setContentVal(h)}
                  />
                </>
              ) : (
                <>
                  <p className="p1 font-bold text-gray-900">{watch("title")}</p>
                  <Editor initialContent={contentVal} readOnly />
                </>
              )}
            </>
          ) : (
            <>
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="max-w-full" src={image} alt="cover section" />
              )}
            </>
          )}
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
