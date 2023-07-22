import { nanoid } from "nanoid";
import { Section, SectionType } from "@/models";

export const SectionTitles: { [key in SectionType]?: string } = {
  [SectionType.Introduction]: "Introduction",
  [SectionType.ProblemStatement]: "Problem Statement",
  [SectionType.Objectives]: "Objectives",
  [SectionType.RolesResponsibilities]: "Roles and Responsibilities",
  [SectionType.Process]: "Process",
  [SectionType.ChallengesSolutions]: "Challenges and Solutions",
  [SectionType.Results]: "Results",
  [SectionType.LearningsReflections]: "Learnings and Reflections",
};

export const SectionObjectives: { [key in SectionType]?: string } = {
  [SectionType.Introduction]:
    "This section should provide a brief summary of the project, the team, the goal, and any important context needed to understand the rest of the case study.",
  [SectionType.ProblemStatement]:
    "This section should describe the specific problem that the project was designed to address. This could include technical issues, business problems, user experience issues, etc.",
  [SectionType.Objectives]:
    "This section should clearly outline what you and your team hoped to achieve with the project. This section can also include any key metrics that were used to measure success.",
  [SectionType.RolesResponsibilities]:
    "This section should describe your specific role and responsibilities within the project. This is particularly important if you were part of a larger team.",
  [SectionType.Process]:
    "This section should detail the process you followed to address the problem, including any specific methodologies or frameworks used. This could include things like Agile or Scrum, or more specific technical approaches.",
  [SectionType.ChallengesSolutions]:
    "This section should describe any significant challenges you faced during the project and how you overcame them, showcasing your problem-solving skills.",
  [SectionType.Results]:
    "This section should share the outcomes of the project. Did it meet the objectives set out at the start? Provide quantifiable results if possible, such as improved performance metrics, cost savings, increased user engagement, etc.",
  [SectionType.LearningsReflections]:
    "This section should reflect on the project as a whole. What did you learn? What would you do differently next time? How has this project contributed to your development as a software engineer?",
};

export const SectionQuestions: { [key in SectionType]?: string[] } = {
  [SectionType.Introduction]: [
    "What is the name of the project?",
    "Who were the key participants in the project?",
    "What was the timeline or schedule of the project?",
    "Can you summarize the project in a few sentences?",
  ],
  [SectionType.ProblemStatement]: [
    "What was the specific problem that the project was designed to address?",
    "How was this problem affecting the business or users?",
    "Were there any specific requirements or constraints you had to consider during this project?",
  ],
  [SectionType.Objectives]: [
    "What were the primary goals of the project?",
    "What were the key performance indicators (KPIs) or success metrics for the project?",
    "How were these goals aligned with the business or user needs?",
  ],
  [SectionType.RolesResponsibilities]: [
    "What was your specific role in the project?",
    "What responsibilities did you have?",
    "How did you collaborate with other team members or stakeholders?",
  ],
  [SectionType.Process]: [
    "What project management methodologies or techniques did you apply in this project?",
    "How did you plan and organize the work?",
    "What tools or technologies did you use during development?",
  ],
  [SectionType.ChallengesSolutions]: [
    "What were the major challenges or roadblocks you faced during the project?",
    "How did you overcome these challenges?",
    "How did these solutions contribute to the overall success of the project?",
  ],
  [SectionType.Results]: [
    "What were the final outcomes of the project?",
    "How did the project perform against the initial KPIs or success metrics?",
    "Can you quantify the impact of the project on the business or users?",
  ],
  [SectionType.LearningsReflections]: [
    "What were the key learnings from this project?",
    "How has this project contributed to your growth as a software engineer?",
    "If you were to do this project again, what would you do differently?",
  ],
};

export const SectionTemplate: Section[] = (
  Object.keys(SectionType) as (keyof typeof SectionType)[]
).map((type) => ({
  id: nanoid(),
  type: SectionType[type],
  title: SectionTitles[SectionType[type]],
  content: `[${SectionObjectives[SectionType[type]]}]`,
}));
