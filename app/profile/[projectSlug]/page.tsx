"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { PortfolioConverter } from "@/models";
import { db } from "@/utils";

import Image from "next/image";
import Error from "next/error";

import { Footer, Navbar } from "@/components";
import { ProjectProfile } from "@/modules";

const Editor = dynamic(
  async () => (await import("@/components/editor")).Editor,
  { ssr: false }
);

const ProjectDetailPage = ({
  params: { projectSlug },
}: {
  params: { projectSlug: string };
}) => {
  const [portfolios, portfoliosLoading] = useCollectionData(
    projectSlug
      ? query(
          collection(db, "portfolios").withConverter(PortfolioConverter),
          where("slug", "==", projectSlug)
        )
      : null
  );

  const portfolio = useMemo(() => {
    if (!portfolios || portfoliosLoading) return undefined;
    return portfolios.find((p) => p.slug === projectSlug);
  }, [portfolios, portfoliosLoading, projectSlug]);

  if (portfoliosLoading || !portfolio) {
    return <span className="loading loading-spinner" />;
  }

  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex min-h-[calc(100vh-73px)] flex-col items-center space-y-9 py-10">
        <ProjectProfile title={portfolio.title} />
        <div className="flex w-full justify-center">
          <div className="relative mb-8 aspect-square h-[480px] w-[100%] place-self-start overflow-clip rounded-xl border md:mb-0 ">
            <Image
              className="object-cover"
              alt="project cover"
              src={portfolio.cover}
              fill
            />
          </div>
        </div>

        <section className="flex flex-col space-y-4">
          {portfolio.sections?.map((portfolio) => (
            <section key={portfolio.title}>
              <>
                {portfolio.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="aspect-video max-w-full rounded-xl object-cover"
                    src={portfolio.image}
                    alt="cover section"
                  />
                ) : (
                  <>
                    <p className="p1 font-bold text-gray-900">
                      {portfolio.title}
                    </p>
                    <Editor initialContent={portfolio.content ?? ""} readOnly />
                  </>
                )}
              </>
            </section>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ProjectDetailPage;
