import { SectionObjectives } from "@/constants";
import { Guide } from "@/models";

export const buildSectionPrompt = ({ type, qnas }: Guide) =>
  `
This is a conversation about a software engineering project.
Based on the conversation, you are tasked to write a paragraph from the '${type}' section of a portfolio case study article.
${SectionObjectives[type!]}

${qnas.map((qna) => `Q: ${qna.question}\nA:${qna.answer}\n\n`)}

This is the content of the '${type}' section in HTML format:
`.trim();
