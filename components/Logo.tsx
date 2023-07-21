import { FC, memo } from "react";

import { twMerge } from "tailwind-merge";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = memo(({ className }) => (
  <div className={twMerge("relative aspect-[96/41] w-24", className)}>
    <Image
      className="object-contain"
      alt="aspiring ai logo"
      src="/logo.svg"
      fill
    />
  </div>
));

Logo.displayName = "Logo";
export { Logo };
