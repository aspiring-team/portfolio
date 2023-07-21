"use client";
import { FC, memo, useCallback } from "react";
import { usePathname } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/utils";

import { twMerge } from "tailwind-merge";
import Image from "next/image";

import { Logo } from "./Logo";
import { PencilLineIcon, SendIcon } from "@/icons";

type NavbarProps = {
  className?: string;
};

const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const pathname = usePathname();
  const [user, authLoading] = useAuthState(auth);

  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((e) => {
      process.env.NODE_ENV === "development" && console.log(e);
    });
  }, []);

  return (
    <nav className={twMerge("bg-base-100 py-4", className)}>
      <div className="container flex items-center justify-between">
        <Logo />

        {authLoading ? (
          <div />
        ) : user ? (
          <div className="flex items-center space-x-5">
            {pathname === "/create" ? (
              <button className="btn btn-primary h-10 min-h-0 rounded-full normal-case">
                <SendIcon className="h-4 w-4" />
                Publish
              </button>
            ) : (
              <button className="btn btn-primary h-10 min-h-0 rounded-full normal-case">
                <PencilLineIcon className="h-4 w-4" />
                Add Project
              </button>
            )}

            <div className="flex items-center space-x-2">
              <div className="relative aspect-square w-8 overflow-clip rounded-full bg-neutral">
                {user.photoURL ? (
                  <Image
                    className="object-contain"
                    alt="avatar"
                    src={user.photoURL}
                    fill
                  />
                ) : (
                  <p className="p3 m-auto bg-neutral-content">
                    {user.displayName?.[0]}
                  </p>
                )}
              </div>
              <p className="p3 font-semibold">{user.displayName}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              className="btn btn-primary btn-outline h-10 min-h-0 rounded-full normal-case"
              onClick={login}
            >
              Log in
            </button>

            <button
              className="btn btn-primary !h-10 min-h-0 rounded-full normal-case"
              onClick={login}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export { Navbar };
