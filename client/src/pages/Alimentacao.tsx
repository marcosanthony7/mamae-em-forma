import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingCart, Utensils, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyMealTabs from "@/components/WeeklyMealTabs";
import MealCard from "@/components/MealCard";
import ShoppingList from "@/components/ShoppingList";
import { useProgress, useMeals, useShoppingCategories, useToggleFavoriteRecipe, useToggleShoppingItem } from "@/hooks/useProgress";
import { getMealImage } from "@/lib/mealImages";

interface AlimentacaoProps {
  onBack?: () => void;
}

export default function Alimentacao({ onBack }: AlimentacaoProps) {
  const [activeDay, setActiveDay] = useState("seg");
  const [activeTab, setActiveTab] = useState("cardapio");

  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: meals, isLoading: mealsLoading } = useMeals();
  const { data: shoppingCategories, isLoading: shoppingLoading } = useShoppingCategories();
  const toggleFavorite = useToggleFavoriteRecipe();
  const toggleShoppingItem = useToggleShoppingItem();

  if (progressLoading || mealsLoading || shoppingLoading || !progress || !meals || !shoppingCategories) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const favorites = new Set(progress.favoriteRecipes);
  const checkedItems = new Set(progress.checkedShoppingItems);
  const currentMeals = meals[activeDay as keyof typeof meals] || meals.seg;

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite.mutate(id);
  };

  const handleShoppingItemToggle = (id: string) => {
    toggleShoppingItem.mutate(id);
  };

  const categoriesWithCheckedState = shoppingCategories.map(category => ({
    ...category,
    items: category.items.map(item => ({
      ...item,
      checked: checkedItems.has(item.id),
    })),
  }));

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {onBack && (
            <Button size="icon" variant="ghost" onClick={onBack} data-testid="btn-back" className="flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">Alimentação</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Guia nutricional pós-parto</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="cardapio" className="flex-1 text-xs sm:text-sm" data-testid="tab-cardapio">
              <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Cardápio
            </TabsTrigger>
            <TabsTrigger value="compras" className="flex-1 text-xs sm:text-sm" data-testid="tab-compras">
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Compras
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24">
          {activeTab === "cardapio" ? (
            <div className="space-y-4 sm:space-y-6">
              <WeeklyMealTabs activeDay={activeDay} onDayChange={setActiveDay} />
              
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                  Refeições de Hoje
                </h2>
                <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {currentMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MealCard
                        id={meal.id}
                        title={meal.title}
                        prepTime={meal.prepTime}
                        tags={meal.tags}
                        imageUrl={getMealImage(meal.id)}
                        isFavorite={favorites.has(meal.id)}
                        onFavorite={handleFavoriteToggle}
                        onClick={(id) => console.log("View recipe:", id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-accent/30 border border-accent-border">
                <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Dica do Dia
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Durante a amamentação, beba pelo menos 2 litros de água por dia. 
                  Mantenha uma garrafinha sempre por perto!
                </p>
              </div>
            </div>
          ) : (
            <ShoppingList
              categories={categoriesWithCheckedState}
              onItemToggle={handleShoppingItemToggle}
              onExport={() => {
                const text = shoppingCategories
                  .map(cat => `${cat.name}:\n${cat.items.map(item => `- ${item.name} (${item.quantity})`).join('\n')}`)
                  .join('\n\n');
                navigator.clipboard.writeText(text);
              }}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
