import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Sivua ei löytynyt
        </h2>
        <div>
          <p className="mt-2 text-2xl text-gray-600">Voi ei! 😭</p>
          <p className="mt-2 text-gray-600">
            Hakemaasi sivua ei löytynyt. Ole hyvä ja tarkista osoite ja yritä
            uudelleen.
          </p>
        </div>
        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="mr-2 h-5 w-5" />
            Takaisin etusivulle
          </Link>
        </div>
      </div>
    </div>
  );
}
