"use client";

import { HelpCircle, Home, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Settings", href: "/#", icon: Settings },
  { name: "Help", href: "/#", icon: HelpCircle },
];

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    window.addEventListener("toggleSidenav", handleToggle);
    return () => window.removeEventListener("toggleSidenav", handleToggle);
  }, [isOpen]);

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 p-4 text-white transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center rounded-lg p-2 hover:bg-gray-700"
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
