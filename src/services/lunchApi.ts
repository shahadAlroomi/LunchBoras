export type LunchItem = {
  name: string;
  price: string;
};

export type Lunch = {
  restaurant: string;
  day: string;
  week: number;
  items: LunchItem[];
};

const API_URL = "https://www.matochmat.se/restauranger/boras/lunch/";

const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

function getToday(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
  })
    .format(new Date())
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());

  tempDate.setHours(0, 0, 0, 0);

  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const week1 = new Date(tempDate.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

function cleanText(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function getRestaurantLinks(html: string): string[] {
  const links: string[] = [];

  const regex = /href=["'](\/restauranger\/boras\/lunch\/[^"']+\/)["']/gi;

  let match;

  while ((match = regex.exec(html)) !== null) {
    const url = match[1];

    if (!links.includes(url)) {
      links.push(url);
    }
  }

  return links;
}

function getRestaurantName(text: string): string {
  const match = text.match(/Veckans lunchmeny\s+(.+?)(?=Lunch\s|Vecka\s)/);

  if (match) {
    return cleanText(match[1]);
  }

  return "Restaurang";
}

function getDayText(text: string, day: string): string {
  const dayIndex = text.indexOf(day);

  if (dayIndex === -1) {
    return "";
  }

  const nextDays = days
    .filter((nextDay) => nextDay !== day)
    .map((nextDay) => text.indexOf(nextDay, dayIndex + day.length))
    .filter((index) => index !== -1)
    .sort((a, b) => a - b);

  const nextDayIndex = nextDays[0];

  return text.substring(dayIndex, nextDayIndex || dayIndex + 3000);
}

function getLunchItems(text: string): LunchItem[] {
  const clean = cleanText(text);

  const priceRegex = /(\d{2,3})\s*kr/g;

  const matches = [...clean.matchAll(priceRegex)];

  if (matches.length === 0) {
    return [
      {
        name: clean
          .replace(
            /^(Måndag|Tisdag|Onsdag|Torsdag|Fredag)\s+\d{1,2}\/\d{1,2}\s*/,
            "",
          )
          .trim(),
        price: "Pris saknas",
      },
    ];
  }

  const items: LunchItem[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    const price = `${match[1]} kr`;

    const start =
      i === 0 ? 0 : matches[i - 1].index! + matches[i - 1][0].length;

    const end = match.index!;

    let name = clean.substring(start, end).trim();

    // Ta bort datumet från början av första rätten
    name = name.replace(
      /^(Måndag|Tisdag|Onsdag|Torsdag|Fredag)\s+\d{1,2}\/\d{1,2}\s*/,
      "",
    );

    name = name.replace(/^\d{2,3}\s*kr/, "").trim();

    if (name) {
      items.push({
        name,
        price,
      });
    }
  }

  return items;
}

async function getRestaurantLunch(
  url: string,
  day: string,
  week: number,
): Promise<Lunch | null> {
  try {
    const response = await fetch(`https://www.matochmat.se${url}`);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const restaurant = getRestaurantName(text);

    const dayText = getDayText(text, day);

    if (!dayText) {
      return null;
    }

    const items = getLunchItems(dayText);

    if (items.length === 0) {
      return null;
    }

    return {
      restaurant,
      day,
      week,
      items,
    };
  } catch (error) {
    console.log("Restaurant error:", url, error);

    return null;
  }
}

export async function getLunches(): Promise<Lunch[]> {
  const response = await fetch(API_URL);

  console.log("Mat och Mat status:", response.status);

  if (!response.ok) {
    throw new Error("Kunde inte hämta restauranger");
  }

  const html = await response.text();

  console.log("Borås lunch HTML:", html.length);

  const links = getRestaurantLinks(html);

  console.log("Antal restauranger:", links.length);

  const today = getToday();

  console.log("Dagens dag:", today);

  const weekNumber = getWeekNumber(new Date());

  console.log("Vecka:", weekNumber);

  const results = await Promise.all(
    links.map((url) => getRestaurantLunch(url, today, weekNumber)),
  );

  const lunches = results.filter((lunch): lunch is Lunch => lunch !== null);

  console.log("Lunchdata:", lunches);

  return lunches;
}
