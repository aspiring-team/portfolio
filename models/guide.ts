import { SectionType } from ".";

export type Guide = {
  id: string;
  type?: SectionType;

  qnas: Qna[];
  history: string[];
};

export type Qna = {
  question: string;
  answer: string;
};
