import { FC, memo, useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import { CheckIcon, CloseIcon, MessageQuestionIcon, PencilIcon } from "@/icons";

type QnaItemProps = {
  className?: string;

  question: string;
  answer: string;

  onUpdate: (answer: string) => void;
};

const QnaItem: FC<QnaItemProps> = memo(
  ({ className, question, answer, onUpdate }) => {
    const [isEditing, setEditing] = useState(false);

    const [tempAnswer, setTempAnswer] = useState(answer);
    useEffect(() => setTempAnswer(answer), [answer]);

    return (
      <div className={twMerge("flex items-start", className)}>
        <MessageQuestionIcon />
        <div className="ml-2 flex grow flex-col items-stretch">
          <p className="p3 text-gray-500">{question}</p>

          {tempAnswer && (
            <div className="p3 mt-1 flex items-start text-gray-900">
              {isEditing ? (
                <textarea
                  className="textarea textarea-bordered grow resize-none"
                  placeholder="Answer the question..."
                  value={tempAnswer}
                  onChange={(e) => setTempAnswer(e.currentTarget.value)}
                />
              ) : (
                <p className="grow">{tempAnswer}</p>
              )}

              {isEditing ? (
                <div className="ml-4 space-x-2">
                  <button className="ml-4" onClick={() => setEditing(false)}>
                    <PencilIcon className="h-5 w-5 text-aspiring-primary" />
                  </button>

                  <button className="ml-4" onClick={() => setEditing(false)}>
                    <CloseIcon className="h-5 w-5 text-aspiring-primary" />
                  </button>
                </div>
              ) : (
                <button className="ml-4" onClick={() => setEditing(true)}>
                  <PencilIcon className="h-5 w-5 text-aspiring-primary" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

QnaItem.displayName = "QnaItem";
export { QnaItem };
