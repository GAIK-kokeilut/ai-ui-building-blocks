import { AICards } from "@/components/home/ai-cards";
import { UICards } from "@/components/home/ui-cards";
import { UILibraries } from "@/components/home/ui-libaries-section";
import ThemeToggle from "@/components/theme-toggle";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <UICards />
          <AICards />
        </div>
        <UILibraries />
        <ThemeToggle />
      </div>
    </div>
  );
}
