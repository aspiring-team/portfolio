export type Section = {
  id: string;
  type?: SectionType | string | null;
  title?: string | null;
  content?: string | null;
  image?: string | null;
};

export enum SectionType {
  Introduction = "introduction",
  ProblemStatement = "problem-statement",
  Objectives = "objectives",
  RolesResponsibilities = "roles-responsibilities",
  Process = "process",
  ChallengesSolutions = "challenges-solutions",
  Results = "results",
  LearningsReflections = "learnings-reflections",
}
