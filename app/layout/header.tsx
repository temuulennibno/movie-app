"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Logo } from "../icons/logo";
import { MoonIcon } from "../icons/moon-icon";
import { SunIcon } from "../icons/sun-icon";
import { GenreSelector } from "./genre-selector";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-[11.5px]">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex gap-3">
            <GenreSelector />
            <div></div>
          </div>
          <div>
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
              className="p-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80 bg-white dark:bg-black"
            >
              {theme === "light" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
