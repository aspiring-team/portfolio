import { FC, memo } from "react";

import { twMerge } from "tailwind-merge";
import Image from "next/image";

type HeroSectionProps = {
  className?: string;
};

const HeroSection: FC<HeroSectionProps> = memo(({ className }) => (
  <section className={twMerge("relative overflow-clip", className)}>
    <div className="absolute left-0 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 bg-primary blur-[48rem]" />
    <div className="absolute right-0 top-0 h-1/4 w-1/4 -translate-y-1/2 translate-x-1/2 bg-primary blur-[48rem]" />

    <div className="container relative grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="flex flex-col items-start text-gray-700">
        <p className="h6 font-medium">Blink and It&apos;s Done! 🎉</p>
        <h1 className="h5 mt-1 font-bold tracking-normal">
          Complete Your <span className="text-primary">Portfolio</span> Creation
          <br />
          In Under 15 Minutes
        </h1>
        <p className="p2 mt-3">
          Your time is precious, we get it! Let our AI-powered Portfolio Builder
          fast-track your portfolio creation.
        </p>

        <button className="btn btn-primary mt-3 h-10 min-h-0 rounded-full normal-case">
          Sign Up for Free
        </button>
      </div>

      <div className="relative grid grid-cols-2 grid-rows-2 gap-8">
        <div className="relative aspect-square w-[90%] place-self-end overflow-clip rounded-tl-full border border-base-300">
          <Image className="object-cover" alt="" src="/favicon.svg" fill />
        </div>
        <div className="relative aspect-square w-[80%] self-end overflow-clip rounded-tr-full border border-base-300">
          <Image className="object-cover" alt="" src="/favicon.svg" fill />
        </div>
        <div className="relative aspect-square w-full overflow-clip rounded-bl-full border border-base-300">
          <Image className="object-cover" alt="" src="/favicon.svg" fill />
        </div>
        <div className="relative aspect-square w-[90%] overflow-clip rounded-br-full border border-base-300">
          <Image className="object-cover" alt="" src="/favicon.svg" fill />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5rem] border-white bg-primary p-4">
          <svg
            width="32"
            height="35"
            viewBox="0 0 32 35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0L20.3215 12.7734L32 17.5L20.3215 22.2266L16 35L11.6785 22.2266L0 17.5L11.6785 12.7734L16 0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
));

HeroSection.displayName = "HeroSection";
export { HeroSection };
