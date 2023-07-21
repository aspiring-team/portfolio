import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Profile = {
  uid: string;
  email: string;
  handle: string;
  name: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
};

export const ProfileConverter: FirestoreDataConverter<Profile> = {
  toFirestore(profile: WithFieldValue<Profile>): DocumentData {
    return profile;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Profile {
    const data = snapshot.data(options);
    return {
      uid: snapshot.id,
      email: data.email,
      handle: data.handle,
      name: data.handle,
      socials: {
        linkedin: data.socials.linkedin ?? "",
        twitter: data.socials.twitter ?? "",
      },
    };
  },
};
