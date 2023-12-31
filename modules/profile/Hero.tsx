"use client";
import { EditProfileButton } from "@/components";
import { Profile, ProfileConverter } from "@/models";
import { auth } from "@/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type HeroProfileProps = {
  profile: Profile | undefined;
};

const HeroProfile: FC<HeroProfileProps> = memo(({ profile }) => {
  const [user] = useAuthState(auth);

  const params = useParams();

  return (
    <div className="flex w-full flex-col-reverse items-center justify-center md:flex-row">
      <div className="flex flex-col space-y-6 md:w-1/2">
        <div className="flex flex-col space-y-2">
          <h4 className="h4 font-medium">Hello there 👋,</h4>
          <p className="text-5xl font-bold text-black md:text-6xl">
            I’m{" "}
            <span className="text-aspiring-primary">
              {profile?.name?.split(" ")[0] ?? ""}
            </span>
            .
          </p>
        </div>
        <p className="p2">
          {profile?.bio ??
            "Software Engineering for over a year and counting. Has an insatiable appetite for growth & constantly seeking new perspectives every day."}
        </p>
        {params?.uid == user?.uid && <EditProfileButton profile={profile} />}
      </div>

      <div className="relative mb-8 aspect-square w-[100%] max-w-[200px] place-self-start overflow-clip rounded-full border border-base-300 md:mb-0 md:w-1/2 md:place-self-end">
        <Image
          className="object-cover"
          alt="profile pic"
          src={
            params?.uid == user?.uid
              ? user?.photoURL ?? "/favicon.svg"
              : "/favicon.svg"
          }
          fill
        />
      </div>
    </div>
  );
});

HeroProfile.displayName = "HeroProfile";

export { HeroProfile };
