"use client";

import { FC, memo, useCallback } from "react";
import { nanoid } from "nanoid";

import { SectionType } from "@/models";
import { SectionObjectives, SectionTemplate, SectionTitles } from "@/constants";
import { usePortfolioStore } from "@/stores";

import { twMerge } from "tailwind-merge";
import { AiBox } from "../AiBox";

import { AlignLeftIcon, StarIcon } from "@/icons";

type GuideStartProps = {
  className?: string;
};

const GuideStart: FC<GuideStartProps> = memo(({ className }) => {
  const { setStarted, setSections, appendSection, appendGuide, selectGuide } =
    usePortfolioStore();

  const onTemplate = useCallback(() => {
    setSections(SectionTemplate);
    setStarted(true);
  }, [setSections, setStarted]);

  const onGuide = useCallback(() => {
    const id = nanoid();
    appendSection({
      id,
      type: SectionType.Introduction,
      title: SectionTitles[SectionType.Introduction],
      content: SectionObjectives[SectionType.Introduction],
    });

    appendGuide({
      id,
      type: SectionType.Introduction,
      qnas: [],
      history: [],
    });
    selectGuide(id);
    setStarted(true);
  }, [appendGuide, appendSection, selectGuide, setStarted]);

  return (
    <AiBox className={twMerge("p-2", className)}>
      <div className="flex flex-col">
        <button
          className="btn btn-ghost no-animation h-fit min-h-0 justify-start rounded p-2 normal-case"
          onClick={onTemplate}
        >
          <AlignLeftIcon className="h-5 w-5" />
          <p className="p3 font-normal">Add portfolio template</p>
        </button>

        <button
          className="btn btn-ghost no-animation h-fit min-h-0 justify-start rounded p-2 normal-case"
          onClick={onGuide}
        >
          <StarIcon className="h-5 w-5" />
          <p className="p3 font-normal">Let AI guide the writing</p>
        </button>
      </div>
    </AiBox>
  );
});

GuideStart.displayName = "GuideStart";
export { GuideStart };
