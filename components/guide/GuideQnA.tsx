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

import { useCompletion } from "ai/react";
import { useForm } from "react-hook-form";

import { Qna, SectionType } from "@/models";
import { usePortfolioStore } from "@/stores";
import {
  SectionObjectives,
  SectionQuestions,
  SectionTitles,
} from "@/constants";
import { buildSectionPrompt } from "@/utils";

import { twMerge } from "tailwind-merge";
import { AiBox } from "../AiBox";
import { QnaItem } from "./QnaItem";

import { ArrowCircleRightIcon, CheckVerifiedIcon, RefreshIcon } from "@/icons";
import { nanoid } from "nanoid";

type GuideQnAProps = {
  className?: string;
};

const GuideQnA: FC<GuideQnAProps> = memo(({ className }) => {
  const {
    guides,
    guideId,
    appendGuide,
    updateGuide,
    selectGuide,
    appendSection,
    updateSection,
    setCompletionLoading,
  } = usePortfolioStore();

  const guide = useMemo(
    () => guides.find((g) => g.id === guideId),
    [guides, guideId]
  );

  const { reset, register, handleSubmit } = useForm({
    defaultValues: { answer: "" },
  });

  const title = useMemo(
    () => (guide?.type ? SectionTitles[guide.type] : undefined),
    [guide?.type]
  );

  const [qnas, setQnas] = useState<Qna[]>([]);
  const isAnswered = useMemo(
    () =>
      !guide ||
      !guide.type ||
      (qnas.length === SectionQuestions[guide.type]!.length &&
        !!qnas.at(-1)?.answer),
    [guide, qnas]
  );

  useEffect(() => {
    if (!guide || !guide.type) return;

    const questions = SectionQuestions[guide.type!];
    if (guide.qnas.length >= questions!.length - 1) {
      return setQnas(guide.qnas ?? []);
    }

    setQnas([
      ...(guide.qnas ?? []),
      { question: questions![guide.qnas.length], answer: "" },
    ]);
  }, [guide]);

  const boxRef = useRef<HTMLDivElement>(null);
  const scroll = useCallback(() => {
    setTimeout(() => {
      boxRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }, []);

  const onAnswer = handleSubmit(({ answer }) => {
    if (!guide || !guide.type) return;

    const questions = SectionQuestions[guide.type!];
    setQnas((qnas) => [
      ...qnas.map((qna, index) =>
        index === qnas.length - 1 ? { question: qna.question, answer } : qna
      ),
      ...(qnas.length < (questions?.length ?? 0)
        ? [{ question: questions![qnas.length], answer: "" }]
        : []),
    ]);

    reset();
    scroll();
  });

  const {
    completion,
    complete,
    isLoading: completionLoading,
  } = useCompletion({
    api: "/api/guide/section",
  });

  useEffect(() => {
    if (!guide || !guide.type || !completion) return;
    updateSection(guide.id, {
      id: guide.id,
      title: SectionTitles[guide.type]!,
      content: completion,
    });
  }, [completion, guide, updateSection]);

  const onSave = useCallback(
    async (completion: string) => {
      if (!guide || !guide.type) return;

      updateGuide(guide?.id, { qnas, history: [...guide.history, completion] });
      scroll();
    },
    [guide, qnas, scroll, updateGuide]
  );

  const onGenerate = useCallback(async () => {
    if (!guide || !guide.type) return;
    setCompletionLoading(true);

    const completion = await complete(buildSectionPrompt(guide));
    if (completion) onSave(completion);

    setCompletionLoading(false);
  }, [complete, guide, onSave, setCompletionLoading]);

  const onNext = useCallback(() => {
    const id = nanoid();
    const type = Object.values(SectionType)[guides.length];
    appendSection({
      id,
      type,
      title: SectionTitles[type],
      content: SectionObjectives[type],
    });
    appendGuide({
      id,
      type,
      qnas: [],
      history: [],
    });
    selectGuide(id);
  }, [appendGuide, appendSection, guides.length, selectGuide]);

  return (
    <div className={twMerge("flex flex-col", className)}>
      <AiBox
        className={twMerge("max-h-[16rem] overflow-auto", className)}
        title={title}
      >
        <div className="flex flex-col" ref={boxRef}>
          <div className="flex flex-col space-y-4">
            {qnas.map((qna, index) => (
              <QnaItem
                key={qna.question}
                question={qna.question}
                answer={qna.answer}
                onUpdate={(answer) => {
                  setQnas((qnas) =>
                    qnas.map((q, i) =>
                      i === index ? { question: q.question, answer } : q
                    )
                  );
                }}
              />
            ))}
          </div>

          {isAnswered && (
            <div className="mt-8 flex flex-col">
              <p className="p4 text-gray-500">
                What action would you like to take?
              </p>

              <button
                className="btn btn-ghost no-animation mt-2 h-fit min-h-0 justify-start rounded p-2 normal-case"
                disabled={completionLoading}
                onClick={onGenerate}
              >
                {guide?.history.length ? (
                  <RefreshIcon className="h-5 w-5" />
                ) : (
                  <CheckVerifiedIcon className="h-5 w-5" />
                )}

                <p className="p3 font-normal">
                  {guide?.history.length
                    ? "Regenerate response"
                    : "Generate response"}
                </p>
              </button>

              {(guide?.history.length ?? 0) > 0 &&
                (guide?.history.length ?? 0) <
                  Object.keys(SectionType).length && (
                  <button
                    className="btn btn-ghost no-animation h-fit min-h-0 justify-start rounded p-2 normal-case"
                    onClick={onNext}
                  >
                    <ArrowCircleRightIcon className="h-5 w-5" />
                    <p className="p3 font-normal">
                      Proceed with guidance for the next section
                    </p>
                  </button>
                )}
            </div>
          )}
        </div>
      </AiBox>

      {!isAnswered && (
        <form className="w-full" onSubmit={onAnswer}>
          <input
            className="input input-bordered mt-3 w-full"
            placeholder="Answer the question..."
            autoComplete="off"
            {...register("answer", { required: true })}
          />
        </form>
      )}
    </div>
  );
});

GuideQnA.displayName = "GuideQnA";
export { GuideQnA };
