"use client";

import { FC, memo } from "react";
import { usePathname } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "@/utils";

import { twMerge } from "tailwind-merge";
import Image from "next/image";

import { Logo } from "./Logo";
import { LogInButton } from "./button/LogInButton";
import { SignUpButton } from "./button/SignUpButton";

import { PencilLineIcon, SendIcon } from "@/icons";
import Link from "next/link";
import { PublishButton } from "./button";

type NavbarProps = {
  className?: string;
  publishDisabled?: boolean;
};

const Navbar: FC<NavbarProps> = memo(({ className, publishDisabled }) => {
  const pathname = usePathname();
  const [user, authLoading] = useAuthState(auth);

  return (
    <nav className={twMerge("bg-base-100 py-4", className)}>
      <div className="container flex items-center justify-between">
        <Logo />

        {authLoading ? (
          <div />
        ) : user ? (
          <div className="flex items-center space-x-5">
            {pathname === "/create" ? (
              <PublishButton disabled={publishDisabled} />
            ) : (
              <Link href="/create">
                <button className="btn btn-primary h-10 min-h-0 rounded-full normal-case">
                  <PencilLineIcon className="h-4 w-4" />
                  <span className="hidden md:block">Add Project</span>
                </button>
              </Link>
            )}

            <button
              className="flex cursor-pointer items-center space-x-2"
              onClick={logout}
            >
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
              <p className="p3 hidden font-semibold md:block">
                {user.displayName}
              </p>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <LogInButton />
            <SignUpButton />
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export { Navbar };
