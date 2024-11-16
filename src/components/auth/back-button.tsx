"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className=" w-full font-normal text-black-2 "
      size="sm"
      asChild
    >
      <Link className="" href={href}>
        {label}
      </Link>
    </Button>
  );
};
