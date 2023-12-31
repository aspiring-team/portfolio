"use client";
import { FC, memo, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, login } from "@/utils";

import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { Profile, ProfileConverter } from "@/models";

type SignUpButtonpProps = {
  className?: string;
  cta?: boolean;
};

const SignUpButton: FC<SignUpButtonpProps> = memo(
  ({ className, cta = false }) => {
    const [user, authLoading] = useAuthState(auth);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          asChild
          onClick={(e) => {
            if (authLoading || user) {
              e.preventDefault();
              router.push("/create");
            }
          }}
        >
          <button
            className={twMerge(
              "btn btn-primary h-10 min-h-0 rounded-full normal-case",
              className
            )}
          >
            {user ? "Add Project" : <>Sign Up {cta && "for Free"}</>}
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral opacity-50 data-[state=open]:animate-overlay-show" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-base-100 p-6 shadow focus:outline-none data-[state=open]:animate-content-show">
            <Dialog.Title className="h5 text-center font-bold">
              Welcome to <span className="text-primary">aspiring!</span>
            </Dialog.Title>

            <Dialog.Description className="p3 mt-2 text-center">
              Accelerate your portfolio building with aspiring 💙
            </Dialog.Description>

            <button
              className="btn btn-outline mt-4 w-full normal-case"
              onClick={async () => {
                const user = await login();
                if (user) {
                  await setDoc(
                    doc(db, "profiles", user?.user?.uid ?? "").withConverter(
                      ProfileConverter
                    ),
                    {
                      email: user?.user?.email ?? "",
                      name: user?.user?.displayName ?? "",
                      handle:
                        user?.user?.displayName
                          ?.toLowerCase()
                          .split(" ")
                          .join("-") ?? "",
                      bio: "",
                      socials: {
                        linkedin: "",
                        github: "",
                      },
                    } as Partial<Profile>
                  );
                  router.push(`/u/${user?.user?.uid}`);
                }
                setOpen(false);
              }}
            >
              <Image alt="" src="/icons/google.svg" width={24} height={24} />
              <p className="p3 font-semibold">Sign up with Google</p>
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

SignUpButton.displayName = "SignUpButton";
export { SignUpButton };
