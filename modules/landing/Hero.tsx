"use client";

import { FC, memo, useState } from "react";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { SignUpButton } from "@/components";

type HeroSectionProps = {
  className?: string;
};

const HeroSection: FC<HeroSectionProps> = memo(({ className }) => {
  const [heroPict, setHeroPict] = useState("/images/hero.webp");
  const [heroPopupPict, setHeroPopupPict] = useState("/images/hero-popup.webp");
  return (
    <section className={twMerge("relative overflow-clip", className)}>
      <div className="container relative flex h-full items-center justify-center gap-8">
        <div className="mb-14 flex flex-col items-center text-gray-700">
          <div className="relative flex">
            <p className="h6 font-medium">Powered by</p>
            <Image
              src="/icons/cohere.svg"
              alt="powered by cohere"
              width={120}
              height={24}
              className="ml-2"
            />
          </div>
          <h1 className="h3 mt-1 text-center font-bold">
            Create with Speed. Hired with Ease.
          </h1>
          <p className="p2 mt-3 max-w-xl text-center">
            Your time is precious, we get it! Let our AI-powered Portfolio
            Builder fast-track your portfolio creation.
          </p>
          <SignUpButton className="mt-3" cta />
          <div className="absolute bottom-0 z-10 flex w-full justify-center">
            <div className="relative aspect-square h-[160px] w-[90%] overflow-clip lg:h-[200px]">
              <Image
                className="object-contain"
                alt="hero"
                src={heroPict}
                fill
                onError={() => {
                  setHeroPict("/images/hero.png");
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-10 right-0 z-20 mr-4 flex w-full justify-end md:mr-0 xl:mr-6">
            <div className="relative aspect-square h-[80px] w-[60%] overflow-clip lg:h-[100px]">
              <Image
                className="object-contain"
                alt="hero"
                src={heroPopupPict}
                fill
                onError={() => {
                  setHeroPopupPict("/images/hero-popup.png");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export { HeroSection };
