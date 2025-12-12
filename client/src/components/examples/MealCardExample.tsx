import { useState } from "react";
import MealCard from "../MealCard";

export default function MealCardExample() {
  const [favorites, setFavorites] = useState<string[]>(["2"]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-background grid grid-cols-2 gap-4 max-w-md">
      <MealCard
        id="1"
        title="Smoothie Energético de Banana e Aveia"
        prepTime="5 min"
        tags={["Rápida", "Energética"]}
        onFavorite={toggleFavorite}
        isFavorite={favorites.includes("1")}
        onClick={(id) => console.log("Clicked:", id)}
      />
      <MealCard
        id="2"
        title="Salada Proteica"
        prepTime="15 min"
        tags={["Proteína", "Leve"]}
        onFavorite={toggleFavorite}
        isFavorite={favorites.includes("2")}
        onClick={(id) => console.log("Clicked:", id)}
      />
    </div>
  );
}
