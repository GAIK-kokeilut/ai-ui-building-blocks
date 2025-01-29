import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  BarChart3,
  Boxes,
  Code2,
  CreditCard,
  DollarSign,
  GanttChartSquare,
  Users,
} from "lucide-react";

export default function BentoGridPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bento Grid Template</h1>
        <p className="text-muted-foreground">
          Example of Bento Grid template using shadcn/ui components
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Tilastokortit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Kokonaismyynti
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231.89 €</div>
            <p className="text-xs text-muted-foreground">
              +20.1% edellisestä kuukaudesta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tilaukset</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% edellisestä kuukaudesta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Aktiiviset käyttäjät
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% edellisestä kuukaudesta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktiivisuus</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 edellisestä tuntista
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Isommat kortit */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Analytiikka</CardTitle>
            <CardDescription>
              Käyttäjien aktiivisuus viimeisen 7 päivän ajalta.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Tähän voit lisätä kaavion */}
            <div className="h-96 flex items-center justify-center bg-muted/10">
              <BarChart3 className="size-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Kaaviopaikka</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Viimeisimmät tapahtumat</CardTitle>
            <CardDescription>
              Yhteensä 10 tapahtumaa käsitelty tänään
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Esimerkki tapahtumia */}
              <div className="flex items-center">
                <span className="relative flex size-2 bg-green-500 rounded-full mr-4"></span>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Uusi tilaus vastaanotettu
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Asiakas: Matti Meikäläinen
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  Juuri nyt
                </div>
              </div>
              <div className="flex items-center">
                <span className="relative flex size-2 bg-yellow-500 rounded-full mr-4"></span>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Järjestelmäpäivitys
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Versio 2.1.0 julkaistu
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  2h sitten
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ominaisuuskortit */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Boxes className="size-8 text-primary" />
            <CardTitle className="mt-4">Modulaarinen rakenne</CardTitle>
            <CardDescription>
              Käytä uudelleenkäytettäviä komponentteja rakentaaksesi
              sovelluksesi nopeasti
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Code2 className="size-8 text-primary" />
            <CardTitle className="mt-4">Kehittäjäystävällinen</CardTitle>
            <CardDescription>
              Selkeä dokumentaatio ja helppo integroida olemassa oleviin
              projekteihin
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <GanttChartSquare className="size-8 text-primary" />
            <CardTitle className="mt-4">Mukautettava UI</CardTitle>
            <CardDescription>
              Täysin muokattavissa oleva käyttöliittymä Tailwind CSS:n avulla
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
