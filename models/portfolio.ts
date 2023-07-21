export type Portfolio = {
  slug: string;
  uid: string;
  status: "draft" | "published" | "archived";
  title: string;
  cover: string;
  summary: string;
  section: string | Section[];
};

export type Section = {
  id: string;
  title?: string;
  content?: string;
  image?: string;
};
