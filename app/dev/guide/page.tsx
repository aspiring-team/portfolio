"use client";

import { GuideQnA, GuideStart, Navbar } from "@/components";
import { usePortfolioStore } from "@/stores";

export default function Guide() {
  const { started, guideId } = usePortfolioStore();
  return (
    <>
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <main className="container relative flex min-h-[calc(100vh-73px)] flex-col">
        <div className="flex grow flex-col overflow-y-auto py-4">
          <p>x</p>
        </div>

        {!started ? (
          <GuideStart className="sticky bottom-4 mx-auto w-full max-w-2xl" />
        ) : guideId ? (
          <GuideQnA className="sticky bottom-4 mx-auto w-full max-w-2xl" />
        ) : null}
      </main>
    </>
  );
}
