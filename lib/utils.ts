import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkGoogleAPIKey() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return {
      isValid: false,
      error: "GOOGLE_GENERATIVE_AI_API_KEY puuttuu .env.local tiedostosta",
    };
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "x-goog-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        isValid: false,
        error: `API-avain ei ole kelvollinen: ${error.error?.message || "Tuntematon virhe"}`,
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: "API-avaimen tarkistus epäonnistui",
    };
  }
}

export const preprocessDocument = (content: string): string => {
  return content
    .toLowerCase() // muuta kaikki pieniksi kirjaimiksi
    .replace(/\s+/g, " ") // standardoi välilyönnit
    .trim(); // poista tyhjät alusta ja lopusta
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugLog = (label: string, data: any) => {
  console.log(`\n[DEBUG] ${label}:`);
  console.dir(data, { depth: null });
  console.log("-".repeat(50));
};
