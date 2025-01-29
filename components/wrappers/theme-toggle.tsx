import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThemeToggleLink({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link
        href="/"
        className="fixed top-4 right-4 z-[9999] inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
        aria-label="Back to Home"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      {children}
    </>
  );
}
