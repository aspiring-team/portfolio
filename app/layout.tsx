import "./globals.css";

import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";

import { twMerge } from "tailwind-merge";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  title: "aspiring ai • Complete Your Portfolio Creation In Under 15 Minutes",
  description:
    "Your time is precious, we get it! Let our AI-powered Portfolio Builder fast-track your portfolio creation.",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="winter">
      <body className={twMerge("bg-base-100", inter.className)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
