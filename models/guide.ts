import { SectionType } from ".";

export type Guide = {
  slug: string;
  type?: SectionType;

  qna: Qna[];
  history: string[];
};

export type Qna = {
  question: string;
  answer: string;
};
