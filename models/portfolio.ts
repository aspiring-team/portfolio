import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
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

export const PortfolioConverter: FirestoreDataConverter<Portfolio> = {
  toFirestore(portfolio: WithFieldValue<Portfolio>): DocumentData {
    return portfolio;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Portfolio {
    const data = snapshot.data(options);
    return {
      slug: data.slug,
      uid: data.uid,
      status: data.status,
      title: data.title,
      cover: data.cover,
      summary: data.summary,
      sections: JSON.parse(data.section) as Section[],
    };
  },
};
