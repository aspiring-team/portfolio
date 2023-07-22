"use client";
import React from "react";

import { Footer, Help, Navbar, Section } from "@/components";
import { SectionType } from "@/models";

export default function CreatePage() {
  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex h-[calc(100vh-73px)] flex-col items-center space-y-16 py-10">
        <Section
          title="Introduction"
          content="[This section should provide a brief summary of the project, the team, the goal, and any important context needed to understand the rest of the case study.]"
          slug="introduction"
          type={SectionType.Introduction}
        />
        <Help />
      </div>
      <Footer className="mt-auto" />
    </main>
  );
}
