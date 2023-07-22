"use client";

import { auth, db } from "@/utils";
import React, { FC, memo, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { Profile, ProfileConverter } from "@/models";

type EditProfileButtonProps = {
  className?: string;
  profile: Profile | undefined;
};

const EditProfileButton: FC<EditProfileButtonProps> = memo(
  ({ className, profile }) => {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        bio:
          profile?.bio ??
          "Software Engineering for over a year and counting. Has an insatiable appetite for growth & constantly seeking new perspectives every day.",
        gmail: profile?.email ?? "",
        linkedinLink: profile?.socials?.linkedin ?? "",
        githubUsername: profile?.socials?.github ?? "",
      },
    });

    useEffect(() => {
      if (profile) {
        reset({
          bio: profile?.bio ?? "",
          gmail: profile?.email ?? "",
          linkedinLink: profile?.socials?.linkedin ?? "",
          githubUsername: profile?.socials?.github ?? "",
        });
      }
    }, [profile]);

    const save = async (val: any) => {
      try {
        await setDoc(
          doc(db, "profiles", user?.uid ?? "").withConverter(ProfileConverter),
          {
            email: user?.email ?? "",
            name: user?.displayName ?? "",
            handle: user?.displayName?.toLowerCase().split(" ").join("-") ?? "",
            bio: val.bio,
            socials: {
              linkedin: val.linkedinLink ?? "",
              github: val.githubUsername ?? "",
            },
          } as Partial<Profile>
        );

        reset();
        alert("Your profile was updated");
        setOpen(false);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again later");
      }
    };

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            className={twMerge(
              "btn btn-primary btn-outline mx-3 h-10 min-h-0 rounded-full normal-case",
              className
            )}
          >
            Edit Profile
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral opacity-50 data-[state=open]:animate-overlay-show" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-base-100 p-6 shadow focus:outline-none data-[state=open]:animate-content-show">
            <Dialog.Title className="h5 text-center font-bold">
              Edit Profile
            </Dialog.Title>

            <Dialog.Description className="p3 mt-2 text-center">
              Change your profile here
            </Dialog.Description>

            <form
              className="flex flex-col space-y-8"
              onSubmit={handleSubmit(save)}
            >
              <textarea
                className="border-1 p2 rounded-xl border border-gray-900 bg-transparent p-3 font-bold"
                placeholder="Bio"
                rows={3}
                maxLength={200}
                {...register("bio")}
              />
              <input
                className="border-1 p2 rounded-xl border border-gray-900 bg-transparent p-3 font-bold"
                placeholder="Gmail"
                maxLength={80}
                {...register("gmail")}
              />
              <input
                className="border-1 p2 rounded-xl border border-gray-900 bg-transparent p-3 font-bold"
                placeholder="LinkedIn Link"
                maxLength={80}
                {...register("linkedinLink")}
              />
              <input
                className="border-1 p2 rounded-xl border border-gray-900 bg-transparent p-3 font-bold"
                placeholder="Github Username"
                maxLength={80}
                {...register("githubUsername")}
              />
              <button
                type="submit"
                className="btn bg-aspiring-primary text-white"
              >
                Save
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

EditProfileButton.displayName = "EditProfileButton";

export { EditProfileButton };
