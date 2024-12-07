"use client";
import Link from "next/link";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";

const Header1 = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <h2 className="text-title-md2 font-semibold text-nuetral 400">SurakshaSanchay</h2>
        
        {/* Dark Mode Switcher */}
        <DarkModeSwitcher />
      </div>
    </header>
  );
};

export default Header1;