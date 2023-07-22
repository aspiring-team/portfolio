"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

type PublishButtonProps = {
  className?: string;
};

const PublishButton: FC<PublishButtonProps> = memo(({ className }) => {
  const coverImage = ["/cover/1.png", "/cover/2.png", "/cover/3.png"];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={twMerge(
            "btn btn-primary btn-outline h-10 min-h-0 rounded-full normal-case",
            className
          )}
        >
          Publish
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay z-10 py-5">
          <Dialog.Content className="DialogContent z-20 w-[90vw] max-w-md">
            <Dialog.Title className="h5 text-left font-bold text-gray-900">
              Project Preview
            </Dialog.Title>
            <Dialog.Description className="p3 relative mt-5  text-center">
              <section className="flex flex-col items-center justify-center space-y-8">
                <div className="relative mr-2 aspect-square max-h-[320px] w-[100%] overflow-clip rounded-xl border border-base-300">
                  <Image
                    className="object-cover"
                    alt="cover picked"
                    fill
                    src={"/cover/1.png"}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="p1 my-2 text-left font-bold text-gray-900">
                    Select your cover
                  </p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex">
                      {coverImage.map((src) => (
                        <div
                          key={src}
                          className="relative mr-2 aspect-square max-h-[120px] w-[100%] overflow-clip rounded-xl border border-base-300"
                        >
                          <Image
                            className="object-cover"
                            alt="cover projects"
                            fill
                            src={src}
                          />
                        </div>
                      ))}
                    </div>
                    <button className="btn rounded-[1000px] border border-gray-300 bg-white">
                      Upload your own cover
                    </button>
                  </div>
                </div>
                <div className="my-8 w-full border-2 border-t-gray-300"></div>
                <div className="flex flex-col text-left text-gray-900">
                  <p className="p1 font-bold">This is an example title</p>
                  <p className="p4 mt-1 font-normal">
                    This section should provide a brief summary of the project,
                    the team, the goal, and any important context needed to
                    understand the rest of the case study.
                  </p>
                </div>
                <div className="flex w-full items-end justify-end">
                  <button className="btn btn-primary rounded-[1000px] bg-aspiring-primary text-white">
                    Publish Now
                  </button>
                </div>
              </section>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

PublishButton.displayName = "PublishButton";

export { PublishButton };
