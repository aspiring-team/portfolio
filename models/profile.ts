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
  bio: string;
  socials: {
    linkedin?: string;
    github?: string;
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
      name: data.name,
      handle: data.handle,
      bio: data.bio,
      socials: {
        linkedin: data.socials.linkedin ?? "",
        github: data.socials.github ?? "",
      },
    };
  },
};
