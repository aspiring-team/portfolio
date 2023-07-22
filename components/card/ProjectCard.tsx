import Image from "next/image";
import Link from "next/link";
import React, { FC, memo } from "react";

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const ProjectCard: FC<ProjectCardProps> = memo(
  ({ slug, description, image, title }) => {
    return (
      <div className="flex flex-col-reverse items-start justify-center space-x-0 space-y-4 md:flex-row md:space-x-9 md:space-y-0">
        <div className="mt-4 flex grow flex-col space-y-5 md:mt-0">
          <div className="flex flex-col space-y-3">
            <h6 className="h6 font-bold">{title}</h6>
            <p className="p3">{description}</p>
          </div>
          <Link href={`/profile/${slug}`}>
            <button className="bg-primary-50 btn  w-max rounded-lg text-aspiring-primary-700">
              Read More
            </button>
          </Link>
        </div>

        <div className="relative aspect-square max-h-[360px] w-[100%] place-self-end overflow-clip rounded-xl border border-base-300 md:w-1/2">
          <Image
            className="object-cover"
            alt="cover projects"
            src={image}
            fill
          />
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
