import type { Restaurant } from "../components/RestaurantCard";

type MatRestaurant = {
  name: string;
  image: string;
  url: string;
};

const API_URL = "https://www.matochmat.se/restauranger/boras/lunch/";

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

function getRestaurantName(html: string): string {
  const match = html.match(/Veckans lunchmeny\s+(.+?)(?=Lunch\s|Vecka\s)/);

  if (match) {
    return cleanText(match[1]);
  }

  return "Restaurang";
}

function getImageUrl(html: string): string {
  const imageMatch = html.match(
    /https:\/\/www\.matochmat\.se\/assets\/uploads\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)/i,
  );

  if (imageMatch) {
    return imageMatch[0];
  }

  const metaImage =
    html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    ) ||
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    );

  if (metaImage) {
    return metaImage[1];
  }

  return "";
}

async function getMatRestaurants(): Promise<MatRestaurant[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta restauranger");
  }

  const html = await response.text();

  const regex = /href=["'](\/restauranger\/boras\/lunch\/[^"']+\/)["']/gi;

  const links = [
    ...new Set([...html.matchAll(regex)].map((match) => match[1])),
  ];

  const restaurants = await Promise.all(
    links.map(async (link) => {
      try {
        const response = await fetch(`https://www.matochmat.se${link}`);

        if (!response.ok) {
          return null;
        }

        const html = await response.text();

        const name = getRestaurantName(html);

        const image = getImageUrl(html);

        if (!image) {
          return null;
        }

        return {
          name,
          image,
          url: link,
        };
      } catch (error) {
        console.log("Kunde inte hämta restaurang:", error);

        return null;
      }
    }),
  );

  return restaurants.filter(
    (restaurant): restaurant is MatRestaurant => restaurant !== null,
  );
}

function getCategory(name: string): string {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("pizza")) {
    return "Pizza";
  }

  if (lowerName.includes("burger") || lowerName.includes("burgers")) {
    return "Burger";
  }

  if (lowerName.includes("salad") || lowerName.includes("vegetarian")) {
    return "Sallad";
  }

  return "Alla";
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const restaurants = await getMatRestaurants();

  console.log("Antal restauranger:", restaurants.length);

  return restaurants.map((restaurant, index) => ({
    id: index + 1,
    name: restaurant.name,
    category: getCategory(restaurant.name),
    image: restaurant.image,
    rating: "—",
    price: "—",
    distance: "—",
    openingHours: "Ej angivet",
  }));
}
