import { ArrowDown } from "lucide-react";
import StickyNavbar from "./sticky-nav";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StickyNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex items-center justify-center h-screen flex-col">
          <p className="gradient-text">Scrollaa alaspäin</p>
          <ArrowDown className="animate-[bounce_1.5s_ease-in-out_infinite] w-6 h-6 text-gray-600" />
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Section {i + 1}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}
