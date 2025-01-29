"use client";

import { ExternalLink, Library } from "lucide-react";
import Link from "next/link";

function UILibraries() {
  const libraries = [
    {
      title: "shadcn/ui",
      description:
        "Beautifully designed components that you can copy and paste into your apps. Made with Tailwind CSS. Open source.",
      route: "https://ui.shadcn.com/",
    },
    {
      title: "Magic UI",
      description:
        "50+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion. Perfect companion for shadcn/ui.",
      route: "https://magicui.design/docs/components/marquee",
    },
    {
      title: "Aceternity UI",
      description:
        "Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
      route: "https://ui.aceternity.com/components",
    },
    {
      title: "Motion Primitives",
      description:
        "Beautifully designed motions components. Easy copy-paste. Customizable. Open Source. Built for engineers and designers.",
      route: "https://motion-primitives.com/",
    },
    {
      title: "Origin UI",
      description:
        "Origin UI is an extensive collection of copy-and-paste components for quickly building app UIs. It‘s free, open-source, and ready to drop into your projects.",
      route: "https://originui.com/",
    },
  ];

  return (
    <div className="mx-auto px-12 py-12">
      <div className="text-center mb-8 backdrop-blur-sm mx-auto w-fit p-12 border border-opacity-30 border-white rounded-full">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Library className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 border-b border-blue-600 border-opacity-50">
            UI Komponentti Kirjastot
          </h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Hyödyllisiä UI-kirjastoja ja valmiita komponentteja
              React-projekteihin
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              (Kuvaus tekstit otettu suoraan kirjastojen sivuilta)
            </p>
          </div>
          <div className="max-w-2xl mx-auto p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm text-blue-800 dark:text-blue-200">
            <strong>Huom!</strong> Useat näistä kirjastoista on rakennettu
            ShadCN:n päälle tai hyödyntävät sitä. Komponenttien toimivuus
            saattaa vaatia ShadCN:n asennuksen projektiisi.
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {libraries.map((lib) => (
          <Link
            key={lib.title}
            href={lib.route}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm hover:shadow-md dark:shadow-lg/10 transition-all duration-200 border border-gray-100 dark:border-gray-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {lib.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {lib.description}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { UILibraries };
