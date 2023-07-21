"use client";

import { AlignLeftIcon, ImagePlusIcon } from "@/icons";
import { AddIcon } from "@/icons/AddIcon";
import { StarIcon } from "@/icons/StarIcon";
import React from "react";
import { Tooltip } from "../elements";

type SectionProps = {
  title: string;
  content: string;
  slug: string;
  type?: string;
};

export const Section: React.FC<SectionProps> = ({
  title,
  content,
  slug,
  type,
}) => {
  return (
    <section className="flex flex-col-reverse items-start space-y-1 md:flex-row md:items-end md:space-x-3 md:space-y-0">
      <section className="flex flex-row-reverse md:flex-col md:space-y-3">
        <Tooltip text="Ask AI" icon={StarIcon}>
          <div className="flex space-y-1">
            <StarIcon className="h-6 w-6" />
            <p className="p5 text-gray-700">Ask AI</p>
          </div>
        </Tooltip>
        <div className="mr-20 md:mr-0">
          <Tooltip text="More" icon={AddIcon}>
            <div>
              <div className="flex space-y-1">
                <AlignLeftIcon className="h-6 w-6" />
                <p className="p5 text-gray-700">Add Section</p>
              </div>
              <div className="flex space-y-1">
                <ImagePlusIcon className="h-6 w-6" />
                <p className="p5 text-gray-700">Add Image</p>
              </div>
            </div>
          </Tooltip>
        </div>
      </section>
      <section className="flex flex-col space-y-1">
        <p className="p1 font-bold text-gray-900">{title}</p>
        <p className="p3 text-gray-900">{content}</p>
      </section>
    </section>
  );
};
