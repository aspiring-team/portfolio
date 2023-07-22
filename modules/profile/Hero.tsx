import Image from "next/image";
import React, { FC, memo } from "react";

type HeroProfileProps = {
  name: string;
};

const HeroProfile: FC<HeroProfileProps> = memo(({ name }) => {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-center md:flex-row">
      <div className="flex flex-col space-y-6 md:w-1/2">
        <div className="flex flex-col space-y-2">
          <h4 className="h4 font-medium">Hello there 👋,</h4>
          <p className="text-5xl font-bold text-black md:text-6xl">
            I’m <span className="text-aspiring-primary">{name}</span>.
          </p>
        </div>
        <p className="p2">
          Software Engineering for over a year and counting. Has an insatiable
          appetite for growth {"&"} constantly seeking new perspectives every
          day.
        </p>
        <div className="flex items-center space-x-2">
          <p className="p2">Select Your Theme 🎨</p>
        </div>
      </div>

      <div className="relative mb-8 aspect-square w-[100%] max-w-[200px] place-self-start overflow-clip rounded-full border border-base-300 md:mb-0 md:w-1/2 md:place-self-end">
        <Image className="object-cover" alt="" src="/favicon.svg" fill />
      </div>
    </div>
  );
});

HeroProfile.displayName = "HeroProfile";

export { HeroProfile };
