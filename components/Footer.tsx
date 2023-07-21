import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

type FooterProps = {
  className?: string;
};

const Footer: FC<FooterProps> = memo(({ className }) => {
  return (
    <footer
      className={twMerge(
        "border-t border-base-300 bg-base-100 py-4",
        className
      )}
    >
      <p className="container p3 text-center text-base-content">
        © 2023 aspiring. All rights reserved.
      </p>
    </footer>
  );
});

Footer.displayName = "Footer";
export { Footer };
