import React from "react";
import Logo from "../logo";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "../theme-switcher";

const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
      <Logo />
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
