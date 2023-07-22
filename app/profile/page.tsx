"use client";
import React from "react";

import { Navbar, ProjectCard } from "@/components";
import { HeroProfile, SocialLinks } from "@/modules";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils";
import { ProfileConverter } from "@/models";

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  const [profile] = useDocumentData(
    user?.uid
      ? doc(db, "profiles", user.uid).withConverter(ProfileConverter)
      : null
  );

  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex min-h-[calc(100vh-73px)] flex-col items-center space-y-16 py-10">
        <HeroProfile profile={profile} />

        <div className="w-full space-y-6 border-t-2 border-gray-300 pt-24">
          <h6 className="h6 font-bold text-black">My Projects</h6>
          <div className="flex flex-col space-y-10 md:space-y-24">
            <ProjectCard
              id="d2o2GUU7oEySvV63cs4az"
              image="/favicon.svg"
              title={`Coinread Website Dashboard`}
              description={`Coinread is a multi-feature online platform to optimize data accuracy and user experience in obtaining and tracking cryptocurrency information.`}
            />
          </div>
        </div>
      </div>
      <SocialLinks profile={profile} />
    </main>
  );
};

export default ProfilePage;
