"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { usePortfolioStore } from "@/stores";
import { GuideQnA, GuideStart, Navbar, Section } from "@/components";
import { SectionType } from "@/models";

const Editor = dynamic(
  async () => (await import("@/components/editor/Editor")).Editor,
  {
    ssr: false,
  }
);

export default function CreatePage() {
  // const [portfolioData, setPortfolioData] = useState(PORTFOLIO_DUMMY);
  const { started, sections, guides, guideId } = usePortfolioStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p></p>");
  const isContentEmpty = useMemo(() => content === "<p></p>", [content]);

  return (
    <>
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <main className="container relative flex min-h-[calc(100vh-73px)] flex-col">
        <div className="flex grow flex-col overflow-y-auto py-16">
          <input
            className="h4 resize-y pl-9 font-bold text-gray-900 placeholder:text-gray-500 focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />

          {!guides.length && !sections.length && (
            <Editor
              className="mt-4"
              placeholder="Write your project story..."
              initialContent={content}
              onUpdate={(html) => setContent(html)}
            />
          )}

          {sections.length > 0 && (
            <div className="mt-4 flex flex-col items-stretch space-y-4">
              {sections.map((section) => (
                <Section
                  key={section.id}
                  title={section.title ?? null}
                  content={section.content ?? null}
                  image={section.image ?? null}
                  type={(section.type as SectionType) ?? null}
                />
              ))}
            </div>
          )}
        </div>

        {isContentEmpty ? (
          !started ? (
            <GuideStart className="sticky bottom-4 mx-auto w-full max-w-2xl" />
          ) : guideId ? (
            <GuideQnA className="sticky bottom-4 mx-auto w-full max-w-2xl" />
          ) : null
        ) : null}
      </main>
    </>
  );
}
