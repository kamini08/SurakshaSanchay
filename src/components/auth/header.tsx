import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1
        className={cn(
          "text-2xl font-semibold uppercase text-black-2",
          font.className,
        )}
      >
        SurakshaSanchay 👮
      </h1>
      <p className="text-muted-foreground text-sm text-gray-600 ">{label}</p>
    </div>
  );
};
