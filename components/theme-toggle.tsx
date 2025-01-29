"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white hover:bg-secondary dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg z-50 hover:scale-110 transition-all duration-200 border-none"
      aria-label="Vaihda teemaa"
    >
      <div className="relative w-6 h-6 grid place-items-center">
        <Sun className="w-6 h-6 transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-yellow-500" />
        <Moon className="w-6 h-6 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-blue-300 absolute" />
      </div>
    </Button>
  );
}

export default ThemeToggle;
