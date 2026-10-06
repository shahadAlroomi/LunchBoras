import type { Restaurant } from "../components/RestaurantCard";

type ApiRestaurant = {
  id: number;
  tags?: {
    name?: string;
    cuisine?: string;
    opening_hours?: string;
  };
};

const query = `
[out:json];
node["amenity"="restaurant"](57.65,12.85,57.75,13.05);
out;
`;

const API_URL =
  `https://overpass-api.de/api/interpreter?data=` + encodeURIComponent(query);

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta restauranger");
  }

  const data = await response.json();

  return (data.elements as ApiRestaurant[])
    .filter((restaurant) => restaurant.tags?.name)
    .map((restaurant) => {
      const cuisine = restaurant.tags?.cuisine?.toLowerCase() || "";

      let category = "Alla";

      if (cuisine.includes("pizza")) {
        category = "Pizza";
      } else if (cuisine.includes("burger")) {
        category = "Burger";
      } else if (cuisine.includes("salad") || cuisine.includes("vegetarian")) {
        category = "Sallad";
      }

      return {
        id: restaurant.id,
        name: restaurant.tags!.name!,
        category,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        rating: "—",
        price: "—",
        distance: "—",
        openingHours: restaurant.tags?.opening_hours || "Ej angivet",
      };
    });
}
