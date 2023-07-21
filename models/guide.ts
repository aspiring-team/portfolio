export type Guide = {
  sectionSlug: string;
  type: string;
  qna: Qna[];
  history: string[];
};

export type Qna = {
  question: string;
  answer: string;
};
