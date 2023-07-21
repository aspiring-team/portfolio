import { SectionType } from "@/models";

export const SectionObjectives = {
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
