import { SectionType } from ".";

export type Guide = {
  slug: string;
  type?: SectionType;

  qnas: Qna[];
  history: string[];
};

export type Qna = {
  question: string;
  answer: string;
};
