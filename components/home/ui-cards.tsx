import { Template } from "@/lib/types/template";
import { Check, LayoutGrid, Menu, Sparkles } from "lucide-react";
import AnimatedText from "../animated-text";
import { TemplateCard } from "./template-card";

export const uiTemplates: Template[] = [
  {
    title: "Grid Layoutit",
    description: "Responsiiviset grid-layoutit",
    icon: <LayoutGrid className="w-6 h-6" />,
    route: "/dashboard",
    link: true,
    tags: ["Layout", "Grid", "Responsiivinen"],
    subTemplates: [
      {
        title: "Animated Bento Grid",
        description: "Sivujen väliset siirtymät",
        route: "/dashboard/",
      },
      {
        title: "Simple Bento Grid",
        description: "Scrollaus-animaatiot",
        route: "/dashboard/bento-grid",
      },
    ],
  },
  {
    title: "Animaatiot",
    description: "Framer Motion -animaatiot",
    icon: <Sparkles className="w-6 h-6" />,
    route: "/templates/motion",
    tags: ["Animaatio", "Motion"],
    subTemplates: [
      {
        title: "Parallax",
        description: "Skrollaus parallax-animaatio",
        route: "/templates/motion/parallax",
      },
      {
        title: "Scroll Trigger",
        description: "Scrollaus-animaatiot",
        route: "/templates/motion/",
      },
      {
        title: "Multiple animations",
        description: "Monenlaista animaatiota",
        route: "/templates/motion/animations",
      },
    ],
  },
  {
    title: "Navigaatio",
    description: "Erilaisia navigaatiopalkkeja ja -rakenteita",
    icon: <Menu className="w-6 h-6" />,
    route: "/templates/navigation",
    tags: ["Navigaatio", "Layout", "Menu"],
    subTemplates: [
      {
        title: "Sticky Top Navbar",
        description: "Ylös kiinnittyvä navigaatiopalkki",
        route: "/templates/navigation/sticky",
      },
      {
        title: "Responsive Side Navbar",
        description: "Sivunavigaatio dashboardeille",
        route: "/templates/navigation/sidenav",
      },
    ],
  },
  {
    title: "Valmiita pohjia",
    description: "Valmiitta layout-pohjia ja sivurakenteita",
    icon: <Check className="w-6 h-6" />,
    route: "/templates/components",
    tags: ["UI", "Layout"],
    subTemplates: [
      {
        title: "MoneyBank",
        description: "MoneyBank layout-pohja",
        route: "/templates/pages/moneybank",
      },
      {
        title: "Arvolaskuri",
        description: "ÄlyäHanke Hero section",
        route: "/templates/pages/arvolaskuri",
      },
      {
        title: "Lomakkeet | Linkki🔗",
        description:
          "Shadcn form builder sivun avulla voi tehdä lomakkeita helposti",
        route: "https://shadcn-form-build.vercel.app/",
      },
    ],
  },
];

export function UICards() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedText
            text="UI Template Galleria"
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500"
          ></AnimatedText>
          <AnimatedText
            text="Valmiita UI-komponentteja ja layout-pohjia"
            className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto"
            delay={0.2}
          ></AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uiTemplates.map((template) => (
            <TemplateCard key={template.title} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
