import { AiBox, Section } from "@/components";
import { PenToolPlusIcon } from "@/icons";
import { SectionType } from "@/models";

export default function Home() {
  return (
    <main className="container flex flex-col space-y-4">
      <Section
        title="Introduction"
        content="[This section should provide a brief summary of the project, the team, the goal, and any important context needed to understand the rest of the case study.]"
        slug="abc"
        type={SectionType.Introduction}
      />
      <Section
        title="Problem Statement"
        content="[Here, describe the specific problem that the project was designed to address. This could include technical issues, business problems, user experience issues, etc.]"
        slug="abc"
        type={SectionType.ProblemStatement}
      />

      <AiBox title="Edit or Generate">
        <section className="flex flex-col space-y-3">
          <div className="flex space-x-2">
            <PenToolPlusIcon className="h-5 w-5 text-aspiring-primary" />
            <p className="p3 text-gray-900">Make Longer</p>
          </div>
        </section>
      </AiBox>
    </main>
  );
}
