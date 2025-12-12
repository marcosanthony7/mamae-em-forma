import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

interface ShoppingCategory {
  name: string;
  items: ShoppingItem[];
}

interface ShoppingListProps {
  categories: ShoppingCategory[];
  onItemToggle?: (itemId: string) => void;
  onExport?: () => void;
}

export default function ShoppingList({ categories, onItemToggle, onExport }: ShoppingListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
    onItemToggle?.(itemId);
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checkedItems.size;

  return (
    <div className="space-y-3 sm:space-y-4" data-testid="shopping-list">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-sm sm:text-base">Lista de Compras</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {checkedCount} de {totalItems} itens
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onExport} data-testid="btn-export" className="flex-shrink-0 text-xs sm:text-sm">
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Exportar
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {categories.map((category) => (
          <Card key={category.name} className="p-3 sm:p-4">
            <h4 className="font-medium text-foreground mb-2 sm:mb-3 text-sm sm:text-base">{category.name}</h4>
            <div className="space-y-1.5 sm:space-y-2">
              {category.items.map((item) => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    data-testid={`item-${item.id}`}
                  >
                    <div
                      className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      <AnimatePresence>
                        {isChecked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <span
                      className={`flex-1 text-xs sm:text-sm ${
                        isChecked
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground flex-shrink-0">
                      {item.quantity}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
