import { Section } from ".";

export type Portfolio = {
  uid: string;
  slug: string;
  status: "draft" | "published" | "archived";

  title: string;
  cover: string;
  summary: string;

  section?: string;
  sections?: Section[];
};
