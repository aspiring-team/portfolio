"use client";
import { Profile } from "@/models";
import { auth } from "@/utils";
import Image from "next/image";
import React, { FC, memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type SocialLinksProps = {
  profile: Profile | undefined;
};

const SocialLinks: FC<SocialLinksProps> = memo(({ profile }) => {
  const [user] = useAuthState(auth);
  return (
    <section className="flex flex-col space-y-5 bg-aspiring-primary-25 px-4 py-16 md:px-28">
      <div className="flex flex-col space-y-2">
        <p className="p2">Like what you see?</p>
        <p className="text-xl font-bold md:text-2xl">
          Get in touch with{" "}
          <span className="text-primary">
            {user?.displayName?.split(" ")[0] ?? ""}
          </span>
          . ☕️
        </p>
      </div>
      <div className="flex items-center space-x-6">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${profile?.email}`}
          target="_blank"
          className="flex items-center space-x-2"
        >
          <Image
            alt="social gmail"
            width={32}
            height={32}
            src="/icons/gmail.svg"
          />

          <p className="p3">Email</p>
        </a>
        <a
          href={profile?.socials?.linkedin ?? ""}
          target="_blank"
          className="flex items-center space-x-2"
        >
          <Image
            alt="social linkedin"
            width={32}
            height={32}
            src="/icons/linkedin.svg"
          />
          <p className="p3">Linkedin</p>
        </a>
        <a
          href={profile?.socials?.github ?? ""}
          target="_blank"
          className="flex items-center space-x-2"
        >
          <Image
            alt="social github"
            width={32}
            height={32}
            src="/icons/github.svg"
          />
          <p className="p3">Github</p>
        </a>
      </div>
    </section>
  );
});

SocialLinks.displayName = "SocialLinks";

export { SocialLinks };
