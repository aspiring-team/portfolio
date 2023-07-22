"use client";
import React, { useState } from "react";

import { Footer, Help, Navbar, PublishButton, Section } from "@/components";
import { Section as SectionModel, SectionType } from "@/models";
import { PORTFOLIO_DUMMY } from "@/constants";

export default function CreatePage() {
  const [portfolioData, setPortfolioData] = useState(PORTFOLIO_DUMMY);
  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex min-h-[calc(100vh-73px)] flex-col items-center space-y-4 py-10">
        <PublishButton />
        {portfolioData.sections.map((section: SectionModel) => (
          <Section
            key={section.id}
            title={section.title}
            content={section.content}
            id={section.id}
            image={section.image}
            type={
              section.type
                ? SectionType[section.type as keyof typeof SectionType]
                : null
            }
          />
        ))}

        <Help />
      </div>
      <Footer className="mt-auto" />
    </main>
  );
}
