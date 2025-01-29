# Next.js 15 AI Template Collection

Kattava kokoelma UI-komponentteja ja tekoälytoiminnallisuuksia, jotka on rakennettu käyttäen Next.js 15 ja suurimmaksi osaksi Vercel AI SDK:ta. Tämä template sisältää valmiita komponentteja GenAI- ja LLM-ominaisuuksien toteuttamiseen web-sovelluksissa.

## Komponenttien yhteensopivuus ilman Next.js

Templaten UI-komponentit ovat helposti siirrettävissä tavallisiin React-sovelluksiin. Huomioi vain seuraavat Next.js-spesifiset ominaisuudet, jotka tulee korvata React-vastineilla:

- next/image → img-elementti tai haluamasi image-komponentti
- next/link → a-elementti tai react-router-dom
- next/navigation → react-router tai vastaava reititysratkaisu

Muista myös poistaa `"use client"` -direktiivi komponentin alusta, mikäli sellainen on.

## Ominaisuudet

### UI-komponentit

- Animoidut UI-komponentit Framer Motionilla
- Responsiiviset Bento Grid -layoutit
- Navigaatiopalkit ja -rakenteet
- Dark mode -tuki
- Mukautetut animaatiot ja siirtymät

### Tekoälyominaisuudet

- **Teksti & Objektien Generointi**

  - Tekstin generointi streamauksella
  - Strukturoidun datan luominen
  - Skeemapohjainen objektien generointi

- **Tekoälychatbotit**

  - Markdown-tuellinen chat-käyttöliittymä
  - Popup-assistentti UI
  - Streamatut vastaukset

- **Tekoälyagentit**

  - Function calling -toteutukset
  - Työkaluintegraatiot
  - Google-haku integraatio Geminillä

- **RAG & Haku**

  - Vektorihaku-toteutukset
  - Embedding-pohjainen haku
  - Dokumenttipohjainen chat-järjestelmä

- **Puhe & Ääni**
  - Puheen muuntaminen tekstiksi ja takaisin puheeksi
  - Automaattinen audio processing -reitti (/api/process-audio)
    - Muuntaa käyttäjän äänityksen tekstiksi (Whisper)
    - Generoi AI-vastauksen tekstiin (GPT-4)
    - Muuntaa vastauksen puheeksi (TTS)
  - Äänen prosessointi

## Teknologiat

- Next.js 15
- Vercel AI SDK 4.0
- Motion
- Tailwind CSS
- Shadcn/ui komponentit
- Supabase

## Aloitus

1. Kloonaa repositorio:

```bash
git clone https://github.com/laguagu/template-for-apps
```

2. Asenna riippuvuudet:

```bash
npm install
```

3. Luo `.env.local` tiedosto `.env.example` pohjalta ja lisää tarvittavat ympäristömuuttujat:

```bash
cp .env.example .env.local
```

4. Semanttisen haun alustus (Mikäli haluat kokeilla RAG toteuksia):

```bash

# Luo Supabase-projekti
1. Mene https://supabase.com
2. Luo uusi projekti
3. Kopioi projektin ja tietokannan URL, sekä anon key .env.local tiedostoon

# Alusta tietokanta
npm run db:generate   # Generoi migraatiot schema.ts tiedostosta
npm run db:migrate    # Suorittaa migraatiot tietokantaan

# Lisää vektorihakufunktio Supabase SQL Editorissa
1. Avaa SQL Editor Supabasessa
2. Kopioi ja suorita functions.ts tiedoston sisältö
```

5. Käynnistä kehityspalvelin:

```bash
npm run dev
```

## Projektin Rakenne

```
app/
├── actions/        # Server Actions
├── api/           # API-reitit
│   ├── chat/             # ChatBot API-reitti
│   └── process-audio/    # Äänen käsittelyn API-reitti (nauhoitus → teksti → puhe)
├── templates/      # Tekoäly- ja UI-templatetet
```

## Esimerkkikomponenttien Sijainnit

Kaikki koodi-esimerkit ja komponentit löytyvät `/app/templates` -kansiosta, paitsi bento-grid UI esimerkki, joka sijaitsee `/app/dashboard` -kansiossa.

Kansiorakenne vastaa suoraan URL-polkuja. Esimerkiksi:

- `http://localhost:3000/templates/motion` → `/app/templates/motion/page.tsx`
- `http://localhost:3000/templates/ai/chatbot` → `/app/templates/ai/chatbot/page.tsx`
- `http://localhost:3000/dashboard` → `/app/dashboard/page.tsx`

## Dokumentaatio

- Tekoälyominaisuudet käyttävät Vercel AI SDK:ta:
  - [Tekstin Generointi](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text)
  - [Strukturoidun Datan Generointi](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data)
- Next.js reititys ja Server Actions:
  - [Reittiryhmät](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
  - [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## License

MIT
