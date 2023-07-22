"use client";

import { FC, memo, useEffect, useMemo, useState } from "react";

import { Qna } from "@/models";

import { twMerge } from "tailwind-merge";
import { AiBox } from "../AiBox";

import { usePortfolioStore } from "@/stores";
import { SectionQuestions, SectionTitles } from "@/constants";
import { QnaItem } from "./QnaItem";
import { useForm } from "react-hook-form";

type GuideQnAProps = {
  className?: string;
};

const GuideQnA: FC<GuideQnAProps> = memo(({ className }) => {
  const { guides, guideId } = usePortfolioStore();

  const guide = useMemo(
    () => guides.find((g) => g.id === guideId),
    [guides, guideId]
  );

  const title = useMemo(
    () => (guide?.type ? SectionTitles[guide.type] : undefined),
    [guide?.type]
  );

  const { reset, register, handleSubmit } = useForm({
    defaultValues: { answer: "" },
  });

  const [qnas, setQnas] = useState<Qna[]>([]);
  useEffect(() => {
    if (!guide || !guide.type) return;

    if (guide.qnas.length < (SectionQuestions[guide.type]!.length ?? 0) - 1) {
      setQnas([
        ...(guide?.qnas ?? []),
        {
          question: SectionQuestions[guide.type]!.at(guide.qnas.length)!,
          answer: "",
        },
      ]);
    } else {
      setQnas(guide?.qnas ?? []);
    }
  }, [guide]);

  const onAnswer = handleSubmit(({ answer }) => {
    if (!guide || !guide.type) return;
    setQnas((qnas) => [
      ...qnas.map((qna, index) =>
        index === qnas.length - 1 ? { question: qna.question, answer } : qna
      ),
      ...(qnas.length < (SectionQuestions[guide.type!]!.length ?? 0) - 1
        ? [
            {
              question: SectionQuestions[guide.type!]!.at(qnas.length)!,
              answer: "",
            },
          ]
        : []),
    ]);
    reset();
  });

  return (
    <div className={twMerge("flex flex-col", className)}>
      <AiBox className={twMerge(className)} title={title}>
        <div className="flex flex-col space-y-4">
          {qnas.map((qna) => (
            <QnaItem
              key={qna.question}
              question={qna.question}
              answer={qna.answer}
              onUpdate={() => {}}
            />
          ))}
        </div>
      </AiBox>

      <form className="w-full" onSubmit={onAnswer}>
        <input
          className="input input-bordered mt-3 w-full"
          placeholder="Answer the question..."
          autoComplete="off"
          {...register("answer", { required: true })}
        />
      </form>
    </div>
  );
});

GuideQnA.displayName = "GuideQnA";
export { GuideQnA };
