import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  PiggyBank,
  Smartphone,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#", label: "Luottokortti" },
  { href: "#", label: "Säästäminen", isNew: true },
  { href: "#", label: "Pankkisovellus" },
  { href: "#", label: "App" },
  { href: "#", label: "Deals" },
  { href: "#", label: "Asiakastuki" },
];

interface NavLinkProps {
  href: string;
  label: string;
  isNew?: boolean;
}

const NavLink = ({ href, label, isNew = false }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      className="text-sm font-medium transition-colors duration-200 hover:text-sweep-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sweep-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 flex items-center"
    >
      {isNew && (
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs mr-2">
          UUSI
        </span>
      )}
      {label}
    </Link>
  </li>
);

export default function Component() {
  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="relative bg-sweep-secondary text-white p-2 text-center text-sm">
        <div className="container mx-auto">
          {
            "UUSI: MoneyBank Määräaikaistili. Jopa 3.20 % vuosikorko säästöillesi! 👉 "
          }
          <Link href="#" className="underline">
            Lue lisää
          </Link>
        </div>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Image
            src="/logos/moneybank.jpg"
            alt="MoneyBank Logo"
            width={120}
            height={40}
            className="h-10 w-auto rounded-full"
          />

          {/* Navigation Links Container */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  label={link.label}
                  isNew={link.isNew}
                />
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Sinulla on valta
              <span className="block text-sweep-primary">MoneyBankissa</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Pankkipalvelut, säästäminen, lainat ja shoppailu yhdessä
              sovelluksessa. Osta ja ansaitse, lainaa ja säästä helposti.
            </p>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-sweep-primary hover:bg-sweep-primary/90"
              >
                ALOITA →
              </Button>
              <div className="flex items-center gap-2">
                <Image
                  src="/logos/moneybank.jpg"
                  alt="App Store"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <Image
                  src="/logos/moneybank.jpg"
                  alt="Play Store"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  100t+ Lataukset
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sweep-primary/20 to-sweep-secondary/20 rounded-full blur-3xl" />
            <Image
              src="/logos/moneybank.jpg"
              alt="Banking App Interface"
              width={400}
              height={800}
              className="relative mx-auto rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-sweep-primary" />
          </div>
          <h3 className="font-medium">Luottokortti</h3>
          <p className="text-sm text-muted-foreground">
            Virtuaalinen Mastercard®, jonka voit aktivoida jopa minuutissa.
          </p>
          <Link
            href="#"
            className="text-sweep-primary hover:underline text-sm inline-block"
          >
            Hae nyt
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <PiggyBank className="w-8 h-8 text-sweep-primary" />
          </div>
          <h3 className="font-medium">Säästäminen</h3>
          <p className="text-sm text-muted-foreground">
            Ansaitse jopa 3,20 % korkoa säästöillesi ja kasvata pääomaasi.
          </p>
          <Link
            href="#"
            className="text-sweep-primary hover:underline text-sm inline-block"
          >
            Katso tarjous
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-sweep-primary" />
          </div>
          <h3 className="font-medium">Pankkisovellus</h3>
          <p className="text-sm text-muted-foreground">
            Luotto- ja pankkikortit kaikkiin tarpeisiin.
          </p>
          <Link
            href="#"
            className="text-sweep-primary hover:underline text-sm inline-block"
          >
            Lue lisää
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <Tag className="w-8 h-8 text-sweep-primary" />
          </div>
          <h3 className="font-medium">Deals</h3>
          <p className="text-sm text-muted-foreground">
            5% takaisin Sweep Deals - ostoksista.
          </p>
          <Link
            href="#"
            className="text-sweep-primary hover:underline text-sm inline-block"
          >
            Selalle etuja
          </Link>
        </div>
      </section>

      {/* Products Intro Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pankki taskussasi ja tuotteet, joita sinä tarvitset.
          </h2>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground">
            <span className="opacity-50">Valitse MoneyBank</span> ja valta on
            sinulla - kerro miten aloitamme.
          </p>
        </div>
      </section>

      {/* Mastercard Credit Card Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2CD19E]/20 to-[#6B5DE3]/20 rounded-full blur-3xl" />
            <Image
              src="/logos/moneybank.jpg"
              alt="MoneyBank App with Credit Card Interface"
              width={500}
              height={700}
              className="relative mx-auto rounded-xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Mastercard®
              <br />
              luottokortti
            </h2>
            <p className="text-lg text-muted-foreground">
              Hae ja aktivoi MoneyBank Mastercard® luottokortti, saat kortin
              käyttöösi jopa muutamassa minuutissa. Ei kuukausi- tai
              vuosimaksuja*, jopa 60 päivää korotonta maksuaikaa ostoksille.
            </p>
            <Button
              variant="link"
              className="text-sweep-primary p-0 h-auto font-normal"
            >
              Lue lisää luottokortista <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-xs text-muted-foreground mt-8">
              Esim. 1.500 € luotto, vaihtuva nimelliskorko 19,50% (tietojen
              mukainen viitekorko 4,50% + 15,00% marginaali) todellinen
              vuosikorko 21,34%. Takaisinmaksu 12 kuukauden maksuerissä 153,59
              €/kk, kulujen osuus 163,12 € kokonaiskustannus 1.663,12 €.
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Bank Card Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Virtuaalinen
              <br />
              pankkikortti
            </h2>
            <p className="text-lg text-muted-foreground">
              Avatessasi MoneyBank-käyttötilin saat samantien käyttöösi täysin
              virtuaalisen Mastercard-pankkikortin, jossa on Apple Pay.
            </p>
            <Button
              variant="link"
              className="text-sweep-primary p-0 h-auto font-normal"
            >
              Lue lisää pankkisovelluksesta{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6B5DE3]/20 to-[#2CD19E]/20 rounded-full blur-3xl" />
            <Image
              src="/logos/moneybank.jpg"
              alt="Virtual Bank Card Interface"
              width={500}
              height={700}
              className="relative mx-auto rounded-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
