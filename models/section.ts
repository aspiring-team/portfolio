export type Section = {
  slug: string;
  type?: SectionType;

  title?: string;
  content?: string;
  image?: string;
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
