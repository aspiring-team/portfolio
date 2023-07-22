import { calculateTimestamp } from "@/utils";
import Image from "next/image";
import React, { memo } from "react";

const ProjectProfile = memo(() => {
  return (
    <section className="flex w-full flex-col items-start">
      <div className="flex space-x-2">
        <div className="flex items-center space-x-2">
          <div className="relative aspect-square w-max rounded-full">
            <Image
              className="object-cover"
              alt=" profile pic"
              src="/favicon.svg"
              width={20}
              height={20}
            />
          </div>
          <p className="p4">Deyuna Arham Rusmiland</p>
        </div>
        <div className="p4 flex items-center text-gray-500">
          <p className="mr-2">•</p>
          <p>{calculateTimestamp(new Date("2022-03-25"))} ago</p>
        </div>
      </div>
      <div className="text-gray-900">
        <h4 className="h4 font-bold">Coinread Website Dashboard</h4>
      </div>
    </section>
  );
});

ProjectProfile.displayName = "ProjectProfile";

export { ProjectProfile };
