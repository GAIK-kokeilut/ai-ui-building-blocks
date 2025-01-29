"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
    window.dispatchEvent(new CustomEvent("toggleSidenav"));
  };

  return (
    <header className="bg-white p-4 shadow md:hidden">
      <button
        onClick={toggleSidenav}
        className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <Menu className="h-6 w-6" />
      </button>
    </header>
  );
}
