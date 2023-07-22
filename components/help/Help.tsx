import React, { memo } from "react";

import { SectionType } from "@/models";
import { getAiHelpOptions } from "@/utils";
import { AiBox } from "../AiBox";

const Help = memo(() => {
  return (
    <AiBox title="Edit or Generate" className="w-full max-w-2xl">
      <div className="flex flex-col">
        {getAiHelpOptions({
          id: "",
          content:
            "[This section should provide a brief summary of the project, the team, the goal, and any important context needed to understand the rest of the case study.]",
          image: "",
          title: "",
          type: SectionType.Introduction,
        }).map(({ action, icon: Icon, label }) => (
          <button
            key={label}
            onClick={action}
            className="btn btn-ghost no-animation h-fit min-h-0 justify-start rounded p-2 normal-case"
          >
            <Icon className="text-primary" />
            <p className="p3 font-normal">{label}</p>
          </button>
        ))}
      </div>
    </AiBox>
  );
});

Help.displayName = "Help";

export { Help };
