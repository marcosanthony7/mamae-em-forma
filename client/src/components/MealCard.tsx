import { Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MealCardProps {
  id: string;
  title: string;
  prepTime: string;
  tags: string[];
  imageUrl?: string;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function MealCard({
  id,
  title,
  prepTime,
  tags,
  imageUrl,
  isFavorite = false,
  onFavorite,
  onClick,
}: MealCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative rounded-lg sm:rounded-xl bg-card border border-card-border overflow-hidden hover-elevate active-elevate-2"
      data-testid={`meal-card-${id}`}
    >
      <button
        onClick={() => onClick?.(id)}
        className="w-full text-left"
      >
        <div className="aspect-square relative bg-gradient-to-br from-accent/30 to-primary/10">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl text-muted-foreground/30">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 sm:p-3">
          <h4 className="font-medium text-foreground text-xs sm:text-sm line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-muted-foreground">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{prepTime}</span>
          </div>
          <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px] sm:text-xs px-1.5 sm:px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite?.(id);
        }}
        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
        data-testid={`favorite-${id}`}
      >
        <Heart
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }`}
        />
      </button>
    </motion.div>
  );
}
