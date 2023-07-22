import { FC, memo } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils";

import Image from "next/image";

type ProjectProfileProps = {
  title: string;
};

const ProjectProfile: FC<ProjectProfileProps> = memo(({ title }) => {
  const [user] = useAuthState(auth);
  return (
    <section className="flex w-full flex-col items-start">
      <div className="flex space-x-2">
        <div className="flex items-center space-x-2">
          {user?.photoURL && (
            <div className="relative aspect-square w-max overflow-clip rounded-full">
              <Image
                className="object-cover"
                alt="avatar"
                src={user?.photoURL ?? ""}
                width={20}
                height={20}
              />
            </div>
          )}

          <p className="p4">{user?.displayName}</p>
        </div>
      </div>

      <h1 className="h4 mt-4 font-bold text-gray-900">{title}</h1>
    </section>
  );
});

ProjectProfile.displayName = "ProjectProfile";
export { ProjectProfile };
