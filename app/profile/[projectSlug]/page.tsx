"use client";
import { Footer, Navbar } from "@/components";
import { PORTFOLIO_DUMMY } from "@/constants";
import { ProjectProfile } from "@/modules";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Editor = dynamic(
  async () => (await import("@/components/editor")).Editor,
  {
    ssr: false,
  }
);

const ProjectDetailPage = ({ params }: { params: { productId: string } }) => {
  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />
      <div className="container flex min-h-[calc(100vh-73px)] flex-col items-center space-y-9 py-10">
        <ProjectProfile />
        <div className="flex w-full justify-center">
          <div className="relative mb-8 aspect-square h-[480px] w-[100%] place-self-start overflow-clip rounded-xl border md:mb-0 ">
            <Image
              className="object-cover"
              alt="project cover"
              src="/favicon.svg"
              fill
            />
          </div>
        </div>
        <section className="flex flex-col space-y-4">
          {PORTFOLIO_DUMMY.sections.map((portfolio) => (
            <section key={portfolio.title}>
              <>
                {portfolio.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="max-w-full"
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
