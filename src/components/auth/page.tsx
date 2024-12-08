import Link from "next/link";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import Image from "next/image";

const Header1 = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Logo */}
        <Link className="flex-shrink-0" href="/">
          <Image
            width={32}
            height={32}
            src={"/images/logo/logo-icon.svg"}
            alt="Logo"
          />
        </Link>

        {/* Navbar Links */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-sm font-medium text-black dark:text-white hover:text-primary">
            Home
          </Link>
          <Link href="/about-us" className="text-sm font-medium text-black dark:text-white hover:text-primary">
            About Us
          </Link>
          <Link href="/services" className="text-sm font-medium text-black dark:text-white hover:text-primary">
            Services
          </Link>
          <Link href="/contact" className="text-sm font-medium text-black dark:text-white hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggler */}
            <DarkModeSwitcher />
          </ul>

          {/* User Profile or Login Link */}
          <Link
            href="/login"
            className="text-sm font-medium text-black dark:text-white hover:text-primary lg:text-base"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header1;