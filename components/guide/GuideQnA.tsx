import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { Qna } from "@/models";
import { usePortfolioStore } from "@/stores";
import { SectionQuestions, SectionTitles } from "@/constants";

import { twMerge } from "tailwind-merge";
import { AiBox } from "../AiBox";
import { QnaItem } from "./QnaItem";

import { CheckVerifiedIcon } from "@/icons";

type GuideQnAProps = {
  className?: string;
};

const GuideQnA: FC<GuideQnAProps> = memo(({ className }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const { guides, guideId } = usePortfolioStore();
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
    if (guide.qnas.length >= SectionQuestions[guide.type]!.length - 1) {
      return setQnas(guide.qnas ?? []);
    }

    setQnas([
      ...(guide.qnas ?? []),
      {
        question: SectionQuestions[guide.type]![guide.qnas.length],
        answer: "",
      },
    ]);
  }, [guide]);

  const onAnswer = handleSubmit(({ answer }) => {
    if (!guide || !guide.type) return;

    const questions = SectionQuestions[guide.type!];
    setQnas((qnas) => [
      ...qnas.map((qna, index) =>
        index === qnas.length - 1 ? { question: qna.question, answer } : qna
      ),
      ...(qnas.length < (questions?.length ?? 0)
        ? [
            {
              question: questions![qnas.length],
              answer: "",
            },
          ]
        : []),
    ]);

    reset();
    setTimeout(
      () =>
        boxRef.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
        }),
      200
    );
  });

  const onGenerate = useCallback(() => {}, []);

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
                className="btn btn-ghost no-animation -mx-2 -mb-2 h-fit min-h-0 justify-start rounded p-2 normal-case"
                onClick={onGenerate}
              >
                <CheckVerifiedIcon className="h-5 w-5" />
                <p className="p3 font-normal">Generate response</p>
              </button>
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
