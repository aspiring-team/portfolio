import { StopCircle } from "@/icons";
import React, { PropsWithChildren } from "react";

type AiBoxProps = {
  onStop?: () => void;
  title: string;
};

export const AiBox: React.FC<PropsWithChildren<AiBoxProps>> = ({
  onStop,
  title,
  children,
}) => {
  return (
    <section className="flex flex-col space-y-3 rounded-lg border border-gray-200 px-3.5 py-4 shadow-xs">
      <section className="flex justify-between">
        <p className="p4 font-bold text-gray-500">{title}</p>
        <button className="flex items-center space-x-2" onClick={onStop}>
          <StopCircle className="text-error" />
          <p className="p4 text-error">Stop AI assistant</p>
        </button>
      </section>
      {children}
    </section>
  );
};
