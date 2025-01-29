import Header from "./header";
import Sidenav from "./sidenav";

function Page() {
  return (
    <div>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidenav />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="flex items-center justify-center h-[calc(100vh-64px)] container mx-auto">
            <p className="text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent p-4 max-w-2xl">
              Muuta selaimen ikkunan kokoa ja katso kuinka navigointipalkki
              muuttuu
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Page;
