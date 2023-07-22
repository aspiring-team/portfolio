"use client";

import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Navbar, ProjectCard } from "@/components";
import { HeroProfile, SocialLinks } from "@/modules";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils";
import { PortfolioConverter, ProfileConverter } from "@/models";
import { collection, query, where } from "firebase/firestore";
import Image from "next/image";

const ProfilePage = ({ params: { uid } }: { params: { uid: string } }) => {
  const [user] = useAuthState(auth);
  const [profile, loadingProfile] = useDocumentData(
    uid ? doc(db, "profiles", uid).withConverter(ProfileConverter) : null
  );

  const [portfolios, loadingPorto] = useCollectionData(
    uid
      ? query(
          collection(db, "portfolios").withConverter(PortfolioConverter),
          where("uid", "==", uid)
        )
      : null
  );

  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex min-h-[calc(100vh-73px)] flex-col items-center space-y-16 py-10">
        {loadingPorto || loadingProfile ? (
          <span className="loading loading-spinner" />
        ) : (
          <>
            <HeroProfile profile={profile} />

            <div className="w-full space-y-6 border-t-2 border-gray-300 pt-24">
              <h6 className="h6 font-bold text-black">
                {uid == user?.uid ? "My Projects" : "Projects"}
              </h6>
              <div className="flex flex-col space-y-10 md:space-y-24">
                {portfolios && portfolios?.length > 0 ? (
                  portfolios?.map((p) => (
                    <ProjectCard
                      key={p.slug}
                      uid={p.uid}
                      slug={p.slug}
                      image={p.cover}
                      title={p.title}
                      description={p.summary}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center md:flex-row">
                    <Image
                      src="/coming-soon.svg"
                      alt="No Projects"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h6 className="h6 font-bold text-black">
                        {uid == user?.uid
                          ? "Post your projects!"
                          : "Currently, there are no project here."}
                      </h6>
                      {uid == user?.uid && (
                        <p className="p2 mt-1 text-black">
                          Highlight your projects in this dedicated space.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <SocialLinks profile={profile} />
    </main>
  );
};

export default ProfilePage;
