"use client";

import React, { FC, memo, useCallback, useState } from "react";

import { nanoid } from "nanoid";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage, urlToFile } from "@/utils";
import { usePortfolioStore } from "@/stores";

import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import { CheckIcon, SendIcon } from "@/icons";
import { useRouter } from "next/navigation";

type PublishButtonProps = {
  className?: string;
  disabled?: boolean;
};

const covers = ["/cover/1.png", "/cover/2.png", "/cover/3.png"];

const PublishButton: FC<PublishButtonProps> = memo(
  ({ className, disabled }) => {
    const { replace } = useRouter();
    const { title, sections } = usePortfolioStore();
    const [user, authLoading] = useAuthState(auth);

    const [selectedPicture, setSelectedPicture] = useState(covers[0]);
    const [file, setFile] = useState({} as FileList);

    const indexSelectedPicture = covers.findIndex(
      (pic) => pic === selectedPicture
    );

    const uploadPhoto = () => {
      if (indexSelectedPicture != -1) {
        urlToFile(
          `${window.location.origin}${selectedPicture}`,
          "file.png",
          "image/png"
        ).then((file: File) => {
          // store to firestore
        });
      } else {
        // store to firestore using file variable
      }
    };

    const [loading, setLoading] = useState(false);
    const publish = useCallback(async () => {
      if (authLoading || !user) return;
      setLoading(true);
      try {
        const coverRef = ref(storage, `/covers/${nanoid()}`);
        if (indexSelectedPicture != -1) {
          const file = await urlToFile(
            `${window.location.origin}${selectedPicture}`,
            "cover.png",
            "image/png"
          );
          await uploadBytes(coverRef, file);
        } else {
          await uploadBytes(coverRef, file[0]);
        }
        const coverUrl = await getDownloadURL(coverRef);

        await addDoc(collection(db, "portfolios"), {
          uid: user.uid,
          slug: title.toLowerCase().split(" ").join("-"),
          status: "published",

          title: title,
          cover: coverUrl,
          summary: "",

          section: JSON.stringify(sections),
        });

        replace(
          `/${user.displayName?.toLocaleLowerCase().split(" ").join("-")}`
        );
      } catch (e) {
        process.env.NODE_ENV === "development" && console.log(e);
      } finally {
        setLoading(false);
      }
    }, []);

    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={twMerge(
              "btn btn-primary h-10 min-h-0 rounded-full normal-case",
              className
            )}
            disabled={disabled}
          >
            <SendIcon className="h-4 w-4" />
            <span className="hidden md:block">Publish</span>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay z-10 py-5">
            <Dialog.Content className="DialogContent z-20 w-[90vw] max-w-2xl">
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
                      src={selectedPicture}
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <p className="p1 my-2 text-left font-bold text-gray-900">
                      Select your cover
                    </p>
                    <div className="flex flex-col space-y-3">
                      <div className="flex">
                        {covers.map((src, index) => (
                          <div
                            key={src}
                            onClick={() => setSelectedPicture(src)}
                            className={twMerge([
                              "relative mr-2 aspect-square max-h-[120px] w-[100%] cursor-pointer overflow-clip rounded-xl border border-base-300",
                              indexSelectedPicture == index &&
                                " overflow-hidden",
                            ])}
                          >
                            {indexSelectedPicture == index && (
                              <div className="absolute left-9 top-9 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-aspiring-primary-50">
                                <CheckIcon className="absolute text-aspiring-primary-700" />
                              </div>
                            )}
                            <Image
                              className="object-cover"
                              alt="cover projects"
                              fill
                              src={src}
                            />
                          </div>
                        ))}
                      </div>

                      <label
                        htmlFor="cover"
                        className="btn rounded-[1000px] border border-gray-300 bg-white"
                      >
                        <input
                          onChange={(evt) => {
                            const src = evt?.target?.files?.[0];
                            if (src) {
                              evt?.target?.files && setFile(evt?.target?.files);
                              setSelectedPicture(URL.createObjectURL(src));
                            }
                          }}
                          id="cover"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                        <p>Upload your own cover</p>
                      </label>
                    </div>
                  </div>

                  <div className="my-8 w-full border-2 border-t-gray-300"></div>
                  <div className="flex flex-col text-left text-gray-900">
                    <p className="p1 font-bold">
                      {title || "This is an example title"}
                    </p>
                    <p className="p4 mt-1 font-normal">
                      This section should provide a brief summary of the
                      project, the team, the goal, and any important context
                      needed to understand the rest of the case study.
                    </p>
                  </div>

                  <div className="flex w-full items-end justify-end">
                    <button
                      className="btn btn-primary rounded-[1000px] bg-aspiring-primary text-white"
                      onClick={publish}
                      disabled={loading}
                    >
                      {loading && <span className="loading loading-spinner" />}
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
  }
);

PublishButton.displayName = "PublishButton";

export { PublishButton };
